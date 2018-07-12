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
 *  @original-license
 *  The MIT License (MIT)
 *  Copyright (c) 2016-2017 PrimeTek
 *
 *  Credit: Derived and extended from Prime-ng datable where we needed more modular solution.
 *  We reused the core structure and layout but had to refactor both code and template to match our
 *  needs. More in the description
 *
 *
 */
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, NgZone, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { OutlineState } from '../outline/index';
import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
import { AWDataTable, DropPosition } from './aw-datatable';
import { DTColumn2Component } from './column/dt-column.component';
import { DTHeaderComponent2 } from './header/header.component';
import { DTDetailRowComponent } from './column/detail-row/dt-detail-row.component';
import { DetailRowExpansionState, DT2DataSource } from './datatable2-data-source';
export declare type SelectionMode = 'multi' | 'single' | 'cell' | 'none';
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
export declare class Datatable2Component extends BaseComponent implements AWDataTable, AfterViewChecked, AfterViewInit, AfterContentInit {
    env: Environment;
    el: ElementRef;
    private _defaultDS;
    changeDetector: ChangeDetectorRef;
    factoryResolver: ComponentFactoryResolver;
    outlineState: OutlineState;
    zone: NgZone;
    private injector;
    /**
     *  List of items to show in the datatable.
     *
     *  todo: implement the same Datasource and lazy loading just like I did it for datatable
     */
    list: any[];
    /**
     * Name of the entity for which DataProvider will be loaded. You can either pass list of items
     * or use this destinationClass. Not both
     */
    destinationClass: string;
    /**
     * Used by TableWrapper to add user defined clas into the table tag
     *
     */
    tableStyleClass: string;
    /**
     * See headerTemplate for more details
     */
    bodyClassFn: (column: DTColumn2Component, item: any) => string;
    /**
     * See AWDataTable
     */
    isRowSelectable: (item: any) => boolean;
    /**
     *  Hides or shows table heading where we have filters and tools menus
     */
    showTableHeader: boolean;
    /**
     * See AWDataTable
     *
     */
    pivotalLayout: boolean;
    /**
     * See AWDataTable
     *
     */
    context: any;
    /**
     * See AWDataTable
     */
    initialSortOrder: string;
    /**
     * See AWDataTable
     */
    initialSortKey: string;
    /**
     * When DT is loaded in the page and we are not in the full screen (full page mode), this
     * is hte number of lines that DT will show
     *
     * todo: come up with better name
     */
    displayRowSize: number;
    /**
     * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
     *
     * todo: come up with better name !!!
     *
     */
    pageSize: number;
    /**
     * See AWDataTable
     */
    dataSource: DT2DataSource;
    /**
     * Default message when there are no data .
     *
     * todo: Use i18n value and create resource file
     */
    emptyMessage: string;
    /**
     * Developer can provide custom trackBy function that will be used to iterate over the
     * records
     */
    rowTrackBy: (index: number, item: any) => any;
    /**
     * When true adds custom hovering class to the tbody
     */
    rowHover: boolean;
    /**
     * Do we show loading indicator
     *
     * Todo: rename to showLoading
     */
    loading: boolean;
    /**
     *
     * See AWDataTable
     *
     */
    selectionMode: SelectionMode;
    /**
     *
     * Can provide custom icon. These icons are not animated divs, we used css
     * transformation to rotate them.
     *
     */
    loadingIcon: string;
    /**
     * Additional indent can be added when rendering detail row
     */
    indentDetailRow: boolean;
    /**
     * See AWDataTable
     *
     */
    indentationPerLevel: number;
    /**
     *
     *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
     *  the regular table header
     *
     */
    showSubHeader: boolean;
    /**
     * See OutlineFor - only used in the tree mode
     */
    children: (value: any) => any[];
    /**
     * We might have this conditional as this can be dynamic based on value, so the same
     * as children
     *
     * See OutlineFor - only used in the tree mode
     */
    showExpansionControl: boolean;
    /**
     * See OutlineFor - only used in the tree mode
     */
    expandAll: boolean;
    /**
     * See AWDataTable
     */
    pushRootSectionOnNewLine: boolean;
    /**
     * Render or hide expansion control for row detail columns. Expansion control makes sense for
     * simple table, when using this inside outline (tree table), its driven by outline control
     */
    showRowDetailExpansionControl: boolean;
    /**
     * See AWDataTable
     *
     */
    showSelectionColumn: boolean;
    /**
     * See AWDataTable
     *
     */
    showSelectAll: boolean;
    /**
     * Show or hide global search term input field in the header
     */
    showGlobalSearch: boolean;
    /**
     * In case frozen column are using we can specify on global level total width of the table the
     * overflowing content or width for each column.
     */
    scrollWidth: any;
    /**
     * Enables or disables row reordering
     *
     */
    dndRowEnabled: boolean;
    /**
     *
     * Fires event that sorting is enabled for column and we trigger sorting
     *
     */
    onSort: EventEmitter<any>;
    /**
     * Based on selection mode it triggers even
     *
     */
    onRowClick: EventEmitter<any>;
    /**
     *
     * When multi or single selection mode is enabled it will trigger event when checkbox or
     * radio buttons is selected
     *
     * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
     */
    onRowSelectionChange: EventEmitter<any>;
    /**
     * When cell body selection changes we fire event
     *
     */
    onCellChange: EventEmitter<any>;
    /**
     * When cell header selection changes we fire event
     *
     */
    onHeaderSelection: EventEmitter<any>;
    header: DTHeaderComponent2;
    /**
     * Defines custom template that can be implemented by application to show when there are
     * no data in the datable
     */
    emptyMessageTemplate: TemplateRef<any>;
    /**
     * See AWDataTable
     *
     */
    headerTemplate: TemplateRef<any>;
    /**
     * See AWDataTable
     */
    subHeaderTemplate: TemplateRef<any>;
    /**
     * See AWDataTable
     */
    bodyTemplate: TemplateRef<any>;
    /**
     * See AWDataTable
     */
    headerFilterTemplate: TemplateRef<any>;
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
     */
    colsQuery: QueryList<DTColumn2Component>;
    /**
     * See AWDataTable
     */
    rowDetailColumn: DTDetailRowComponent;
    /**
     *
     * Triggers when items in the list are updated
     *
     */
    valueChange: EventEmitter<any[]>;
    classList: string;
    /**
     * For internal use
     */
    /**
     * Current dataset that is being rendered. Set from the [list] binding or by lazy load from
     * datasource
     */
    dataToRender: any[];
    /**
     * We convert QueryList<DTColumn2Component> to this array for easier manipulation
     */
    columns: DTColumn2Component[];
    /**
     * This is secondary list of columns which is used in case we have have enabled
     * frozen columns. Columns that are marked as frozen needs to be placed into separate array
     * to be rendered way than regular columns which are stored in the columns array.
     */
    frozenColumns: DTColumn2Component[];
    /**
     *  Indicates that columns were initialed Also used when we hide and show column to trigger
     *  change.
     *
     */
    columnsChanged: boolean;
    /**
     *
     * See AWDataTable
     */
    sortColumn: DTColumn2Component;
    /**
     * Reference to colsQuery and its changes so we can later on release the subscription
     */
    columnsSubscription: Subscription;
    initialized: boolean;
    /**
     * See AWDataTable
     */
    detailRowExpansionState: DetailRowExpansionState;
    /**
     * See AWDataTable
     */
    numberOfColsBeforeData: number;
    /**
     * See AWDataTable
     */
    startOfFirstDataColumn: number;
    /**
     * Section for programmatically instantiated columns that are added to the list if additional
     * span or logic is needed.
     *
     * To programmatically insert a new column into columns array like expando column for detail
     * row, or SingleSelect, MultiSelect column when selection is enabled we need to use
     * ComponentFactoryResolver to instantiate a new component.
     *
     */
    private rowDetailExpandColumn;
    private multiSelectColumn;
    private singleSelectColumn;
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
    constructor(env: Environment, el: ElementRef, _defaultDS: DT2DataSource, changeDetector: ChangeDetectorRef, factoryResolver: ComponentFactoryResolver, outlineState: OutlineState, zone: NgZone, injector: Injector);
    ngOnInit(): void;
    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     */
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
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
    initColumns(): void;
    /**
     * Makes sure that we also include programmatic column if present. Move them to the correct
     * array
     *
     */
    private initFrozenColumns();
    /**
     * Check if current column is programmatically created
     *
     */
    isInternalColumn(col: DTColumn2Component): boolean;
    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     */
    initDatasource(initialize?: boolean): void;
    /**
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     */
    initDetailColumnExpansion(): void;
    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     */
    initColumnInfo(): void;
    /**
     * Pushes a state out to application. Can be use as two way bindings
     *
     * [(state)]=dtState(s)
     *
     */
    state: any;
    /**
     * See AWDataTable
     *
     */
    onCellSelectionChange(cell: any, column: DTColumn2Component, item: any): void;
    /**
     * See AWDataTable
     *
     */
    onHeaderSelectionChange(cell: any, column: DTColumn2Component): void;
    onHandleRowClicked(event: any, item: any): void;
    /**
     * See AWDataTable
     *
     */
    onRowToggle(event: any, item: any): void;
    /**
     * See AWDataTable
     *
     */
    onRowSelect(event: any, item: any): void;
    /**
     * See AWDataTable
     *
     */
    onHandleOutlineRowToggleToChildren(currentItem: any, isSelected: boolean): void;
    /**
     * See AWDataTable
     *
     */
    oHandleOutlineRowToggleToParent(currentItem: any, isSelected: boolean): void;
    /**
     * See AWDataTable
     *
     */
    onDnDRowDrop(origPos: number, newPos: number, dropPos: DropPosition): void;
    /**
     * See AWDataTable
     *
     */
    onOutlineExpandChange(event: any): void;
    /**
     * See AWDataTable
     *
     *
     */
    sortSingle(): void;
    /**
     * See AWDataTable
     *
     */
    handleDataChange(): void;
    updateDataToRender(datasource?: any): void;
    /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     */
    private updateList(newList);
    reset(): void;
    /**
     * See AWDataTable
     */
    isHeaderSelected(item: DTColumn2Component): boolean;
    /**
     *
     * See AWDataTable
     *
     */
    isBodyCellSelected(column: DTColumn2Component, item: any): boolean;
    /**
     *  See AWDataTable
     *
     */
    isRowSelected(item: any): boolean;
    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     */
    isEmpty(): boolean;
    hasFrozenColumns(): boolean;
    /**
     * See AWDataTable
     */
    hasInvisibleSelectionColumn(): boolean;
    /**
     *
     * See AWDataTable
     *
     */
    hasLeadingSelectColumn(): boolean;
    visibleColumns(): DTColumn2Component[];
    /**
     * See AWDataTable
     *
     */
    sortOrderingForString(direction: string): number;
    sortOrderingForNumber(direction: number): string;
    /**
     * See AWDataTable
     *
     */
    toggleAllColumns(event: any): void;
    /**
     *
     * See AWDataTable
     *
     */
    isToggleAllColumnSelected(): boolean;
    isToggleAllColumnDisabled(): boolean;
    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     */
    showDetailColumn(item: any): boolean;
    private canUseForDetailRow(item);
    /**
     *
     * See AWDataTable
     *
     */
    isOutline(): boolean;
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
    skipOutlineItem(item: any): boolean;
    /**
     *
     * See AWDaTable
     *
     */
    getValue(data: any, field: string): any;
    ngOnDestroy(): void;
}
