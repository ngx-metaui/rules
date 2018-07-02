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
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Injector,
    Input,
    NgZone,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {Subscription} from 'rxjs';
import {OutlineState} from '../outline/index';
import {BaseComponent} from '../../core/base.component';
import {
    assert,
    BooleanWrapper,
    Entity,
    Environment,
    equals,
    FieldPath,
    isBlank,
    isEntity,
    isPresent,
    ListWrapper
} from '@aribaui/core';
import {DTColumn2Component} from './column/dt-column.component';
import {DTHeaderComponent2} from './header/header.component';
import {DTDetailRowComponent} from './column/detail-row/dt-detail-row.component';
import {
    DTDetailRowExpanderComponent
} from './column/detail-row-expander/dt-detail-row-expander.component';
import {DATA_SOURCE} from '../../core/data/data-source';
import {DataProviders} from '../../core/data/data-providers';
import {DataFinders, QueryType} from '../../core/data/data-finders';
import {Datatable2State, DT2DataSource} from './datatable2-data-source';
import {DTWrapper} from './table-wrapper/table-wrapper.component';
import {DTMultiSelectColumnComponent} from './column/multi-select/dt-multi-select-column.component';
import {
    DTSingleSelectColumnComponent
} from './column/single-select/dt-single-select-column.component';
import {DropPosition} from './directives/dt-draggable-row.directive';


export type SelectionMode = 'multi' | 'single' | 'cell' | 'none';

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
@Component({
    selector: 'aw-datatable2',
    templateUrl: 'datatable2.component.html',
    styleUrls: ['datatable2.component.scss'],
    providers: [
        ObjectUtils,
        OutlineState,
        {provide: DATA_SOURCE, useClass: DT2DataSource, deps: [DataProviders, DataFinders]},
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class Datatable2Component extends BaseComponent implements AfterViewChecked,
    AfterViewInit,
    AfterContentInit
{

    /**
     *  List of items to show in the datatable.
     *
     *  todo: implement the same Datasource and lazy loading just like I did it for datatable
     */
    @Input()
    list: any[];

    /**
     * Name of the entity for which DataProvider will be loaded. You can either pass list of items
     * or use this destinationClass. Not both
     */
    @Input()
    destinationClass: string;


    /**
     * Used by TableWrapper to add user defined clas into the table tag
     *
     */
    @Input()
    tableStyleClass: string;


    /**
     * This is global style function that can be bound to table and read by each column.
     * The same you can see on the DTColumn
     */
    @Input()
    bodyClassFn: (column: DTColumn2Component, item: any) => string;


    /**
     * Identify if row or cell is selectable based on data
     */
    @Input()
    rowSelectable: (item: any) => boolean;


    /**
     *  Hides or shows table heading where we have filters and tools menus
     */
    @Input()
    showTableHeader: boolean = true;


    /**
     * When active applies special styles to the DT. Later on once pivot is implemented this will
     * also add additional behavior to the DT
     *
     */
    @Input()
    pivotalLayout: boolean = false;

    /**
     * Context is important when we execute any function that is passed in as input. We need to
     * give option to be executed within the context (this) of the code using this component.
     *
     */
    @Input()
    context: any;

    /**
     * Allow to change sorting direction
     */
    @Input()
    initialSortOrder: string = 'descending';

    /**
     * What column is used as first for sorting
     */
    @Input()
    initialSortKey: string;


    /**
     * When DT is loaded in the page and we are not in the full screen (full page mode), this
     * is hte number of lines that DT will show
     *
     * todo: come up with better name
     */
    @Input()
    displayRowSize: number = 10;


    /**
     * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
     *
     * todo: come up with better name !!!
     *
     */
    @Input()
    pageSize: number = 15;


    /**
     * Allows you to pass your own datasource to override default one. Also when dataSource is
     * used the destinationClass or list are ignored
     */
    @Input()
    dataSource: DT2DataSource;

    /**
     * Default message when there are no data .
     *
     * todo: Use i18n value and create resource file
     */
    @Input()
    emptyMessage: string = 'No records found';


    /**
     * Developer can provide custom trackBy function that will be used to iterate over the
     * records
     */
    @Input()
    rowTrackBy: (index: number, item: any) => any;

    /**
     * When true adds custom hovering class to the tbody
     */
    @Input()
    rowHover: boolean;

    /**
     * Do we show loading indicator
     *
     * Todo: rename to showLoading
     */
    @Input()
    loading: boolean;


    /**
     *
     * Tells DT if we support cell selection or row based selection which is regular DT.
     *
     */
    @Input()
    selectionMode: SelectionMode = 'none';

    /**
     *
     * Can provide custom icon. These icons are not animated divs, we used css
     * transformation to rotate them.
     *
     */
    @Input()
    loadingIcon: string = 'icon-synchronize';


    /**
     * Additional indent can be added when rendering detail row
     */
    @Input()
    indentDetailRow: boolean = false;

    /**
     * You can change default indentation for the outline nodes
     *
     */
    @Input()
    indentationPerLevel: number = 25;

    /**
     *
     *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
     *  the regular table header
     *
     */
    @Input()
    showSubHeader: boolean = false;

    /**
     * See OutlineFor - only used in the tree mode
     */
    @Input()
    children: (value: any) => any[];


    /**
     * We might have this conditional as this can be dynamic based on value, so the same
     * as children
     *
     * See OutlineFor - only used in the tree mode
     */
    @Input()
    showExpansionControl: boolean;

    /**
     * See OutlineFor - only used in the tree mode
     */
    @Input()
    expandAll: boolean = false;

    /**
     * Pushes outlineFor section on the new line and 2nd level child make it root for this
     * section
     */
    @Input()
    pushRootSectionOnNewLine: boolean = true;


    /**
     * Render or hide expansion control for row detail columns. Expansion control makes sense for
     * simple table, when using this inside outline (tree table), its driven by outline control
     */
    @Input()
    showRowDetailExpansionControl: boolean = true;

    /**
     * In case of single or multiselection show controls
     *
     */
    @Input()
    showSelectionColumn: boolean = true;


    /**
     * Tells if we want to render one selection control in the header to select all the
     * rows. Applicable for multiselection
     *
     */
    @Input()
    showSelectAll: boolean = true;


    /**
     * Show or hide global search term input field in the header
     */
    @Input()
    showGlobalSearch: boolean = true;


    /**
     * In case frozen column are using we can specify on global level total width of the table the
     * overflowing content or width for each column.
     */
    @Input()
    scrollWidth: any;


    /**
     * Enables or disables row reordering
     *
     */
    @Input()
    dndRowEnabled: boolean = false;

    /**
     *
     * Fires event that sorting is enabled for column and we trigger sorting
     *
     */
    @Output()
    onSort: EventEmitter<any> = new EventEmitter();


    /**
     * Based on selection mode it triggers even
     *
     */
    @Output()
    onRowClick: EventEmitter<any> = new EventEmitter();

    /**
     *
     * When multi or single selection mode is enabled it will trigger event when checkbox or
     * radio buttons is selected
     *
     * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
     */
    @Output()
    onRowSelectionChange: EventEmitter<any> = new EventEmitter();


    /**
     * When cell body selection changes we fire event
     *
     */
    @Output()
    onCellChange: EventEmitter<any> = new EventEmitter();

    /**
     * When cell header selection changes we fire event
     *
     */
    @Output()
    onHeaderSelection: EventEmitter<any> = new EventEmitter();


    @ContentChild(DTHeaderComponent2)
    header: DTHeaderComponent2;


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
    @ContentChild('dtHeader')
    headerTemplate: TemplateRef<any>;

    /**
     * See headerTemplate for more details
     */
    @ContentChild('dtSubHeader')
    subHeaderTemplate: TemplateRef<any>;

    /**
     * See headerTemplate for more details
     */
    @ContentChild('dtBody')
    bodyTemplate: TemplateRef<any>;


    /**
     * See headerTemplate for more details
     */
    @ContentChild('headerFilter')
    headerFilterTemplate: TemplateRef<any>;


    @ViewChild('dtWrapper')
    dtWrapper: DTWrapper;


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
    @ContentChildren(DTColumn2Component)
    colsQuery: QueryList<DTColumn2Component>;


    /**
     * Reference to aw-dt-detail-column if present detail row is rendered for specified
     * items
     */
    @ContentChild(DTDetailRowComponent)
    rowDetailColumn: DTDetailRowComponent;


    /**
     *
     * Triggers when items in the list are updated
     *
     */
    @Output()
    valueChange: EventEmitter<any[]> = new EventEmitter<any[]>();


    @HostBinding('class')
    classList: string = 'w-datatable ';


    /**
     * For internal use
     */

    /**
     * Current dataset that is being rendered. Set from the [list] binding or by lazy load from
     * datasource
     */
    public dataToRender: any[];

    /**
     * We convert QueryList<DTColumn2Component> to this array for easier manipulation
     */
    public columns: DTColumn2Component[];


    /**
     * This is secondary list of columns which is used in case we have have enabled
     * frozen columns. Columns that are marked as frozen needs to be placed into separate array
     * to be rendered way than regular columns which are stored in the columns array.
     */
    public frozenColumns: DTColumn2Component[];


    /**
     *  Indicates that columns were initialed Also used when we hide and show column to trigger
     *  change.
     *
     */
    public columnsChanged: boolean = false;

    /**
     * When sorting is enabled this is current active column being sorted.
     *
     *  - we dont support multiple column sorting
     */
    public sortColumn: DTColumn2Component;


    /**
     * Reference to colsQuery and its changes so we can later on release the subscription
     */
    columnsSubscription: Subscription;
    initialized: boolean;


    /**
     * In case we have detail row remmber its expansion state
     */
    detailRowExpansionState: DetailRowExpansionState;


    /**
     * Used for spaning calculation or for the detail row to identify correct number of columns
     * to span, when they are some non-data column (expansion control, single/multi selection)
     */
    numberOfColsBeforeData: number = 0;


    /**
     *  what is the index of first data columns
     */
    startOfFirstDataColumn: number = 0;


    /**
     * Section for programmatically instantiated columns that are added to the list if additional
     * span or logic is needed.
     *
     * To programmatically insert a new column into columns array like expando column for detail
     * row, or SingleSelect, MultiSelect column when selection is enabled we need to use
     * ComponentFactoryResolver to instantiate a new component.
     *
     */
    private rowDetailExpandColumn: DTDetailRowExpanderComponent;
    private multiSelectColumn: DTMultiSelectColumnComponent;
    private singleSelectColumn: DTSingleSelectColumnComponent;


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
    constructor (public env: Environment, public el: ElementRef,
                 @Inject(DATA_SOURCE) private _defaultDS: DT2DataSource,
                 public changeDetector: ChangeDetectorRef,
                 public factoryResolver: ComponentFactoryResolver,
                 public outlineState: OutlineState,
                 public zone: NgZone,
                 private injector: Injector)
    {
        super(env);

        this.dataSource = this._defaultDS;
    }

    ngOnInit ()
    {

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

        } else if (this.dataSource.initialized) {
            this.initDatasource(false);
        }

        // since we work with references let's pass created map inside our state
        this.outlineState.expansionStates = this.state.outlineState;
    }


    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     */
    ngOnChanges (changes: SimpleChanges): void
    {
        super.ngOnChanges(changes);

        if (changes['list'] && isPresent(changes['list'].currentValue)
            && !this.dataSource.initialized) {

            this.initDatasource();

        } else if (this.dataSource.initialized) {
            this.dataSource.dataProvider.dataChanges.next(this.list);
        }

    }

    ngAfterContentInit ()
    {

        // make sure we init a state when detail column is present
        // todo: move this initialization to datasource
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn);

        this.initColumns();
        this.columnsSubscription = this.colsQuery.changes.subscribe(_ =>
        {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }

    ngAfterViewInit ()
    {
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

    ngAfterViewChecked ()
    {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            this.columnsChanged = false;
        }

        if (this.hasFrozenColumns()) {
            this.frozenColumns.forEach((col: DTColumn2Component, index: number) =>
                col.postInitialize(index));
        } else {
            this.columns.forEach((col: DTColumn2Component, index: number) =>
                col.postInitialize(index));
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
     */
    initColumns (): void
    {
        this.columns = [];
        this.frozenColumns = [];

        if (this.detailRowExpansionState.detailExpansionEnabled) {
            this.initDetailColumnExpansion();
        }
        if (this.hasLeadingSelectColumn() && this.selectionMode === 'multi') {
            this.columns.push(this.multiSelectColumn);
        } else if (this.hasLeadingSelectColumn() && this.selectionMode === 'single') {
            this.columns.push(this.singleSelectColumn);
        }

        /**
         * Add expansion column when detail row is enabled
         */
        if (this.detailRowExpansionState.detailExpansionEnabled && !this.isOutline()) {
            this.columns.push(this.rowDetailExpandColumn);
        }

        this.colsQuery
            .filter((col1: DTColumn2Component) => !col1.frozen)
            .forEach((col: DTColumn2Component) =>
            {
                col.initialize();
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
     */
    private initFrozenColumns (): void
    {
        this.colsQuery
            .filter((col1: DTColumn2Component) => col1.frozen)
            .forEach((col: DTColumn2Component) =>
            {
                col.initialize();
                this.frozenColumns.push(col);

            });

        if (this.frozenColumns.length > 0) {
            // find last index of column that is internal / programmatic

            let lastInx = this.columns.slice()
                .reverse()
                .findIndex((col: DTColumn2Component) => this.isInternalColumn(col));

            if (lastInx !== -1) {
                let idx = this.columns.length - 1 - lastInx;
                let internalCols = this.columns.splice(0, idx + 1);
                this.frozenColumns = [...internalCols, ...this.frozenColumns];

            }

            let hasValidCols = this.columns
                .findIndex((col: DTColumn2Component) => isBlank(col.width)) === -1;

            assert(hasValidCols || isPresent(this.scrollWidth),
                'When using [frozen] binding you need specify [width] for each ' +
                'column or [scrollWidth] on datatable!');


            assert(isBlank(this.rowDetailColumn),
                'You cannot combine aw-dt-detail-column with frozen columns!');

        }
    }

    /**
     * Check if current column is programatically created
     *
     */
    isInternalColumn (col: DTColumn2Component): boolean
    {
        return col instanceof DTSingleSelectColumnComponent ||
            col instanceof DTMultiSelectColumnComponent ||
            col instanceof DTDetailRowExpanderComponent;

    }

    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     */
    initDatasource (initialize: boolean = true): void
    {
        if (isBlank(this.state)) {
            this.state = Datatable2State.create(0, this.pageSize, this.displayRowSize,
                this.initialSortKey, this.sortOrderingForString(this.initialSortOrder));
        } else {
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
        this.dataSource.open().subscribe((data: any[]) =>
        {
            this.updateList(data);
        });
    }


    /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     */
    private updateList (newList: any[]): void
    {
        setTimeout(() =>
        {
            this.list = newList;
            this.handleDataChange();
        });
    }

    /**
     * Pushes a state out to application. Can be use as two way bindings
     *
     * [(state)]=dtState(s)
     *
     */
    @Input()
    get state (): any
    {
        return this.dataSource.state;
    }

    set state (val: any)
    {
        this.dataSource.state = val;
    }

    /**
     * When data changes, either they are lazily fetched or @Input LIST is updated we need
     * resort out data based on current state and update internal list dataToRender so new
     * data can re-rendered + triggers event valueChange
     *
     */
    handleDataChange ()
    {
        if (this.state.sortKey || this.sortColumn) {
            if (!this.sortColumn && this.columns) {
                this.sortColumn = this.columns.find(
                    col => col.key === this.state.sortKey);
            }
        }

        this.updateDataToRender();
        this.valueChange.emit(this.list);
    }


    /**
     *
     * Uses are field path utility class to retrieve data from object
     *
     */
    getFieldValue (data: any, field: string): any
    {
        return FieldPath.getFieldValue(data, field);
    }

    updateDataToRender (datasource?: any)
    {
        this.dataToRender = datasource || this.list;
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }


    /**
     * Support for single column sorting
     *
     *
     */
    sortSingle (): void
    {
        if (isPresent(this.list) && isPresent(this.sortColumn)) {

            assert(isPresent(this.sortColumn.key), 'Invalid column to sort');
            this.dataSource.sort(this.sortColumn.key, this.sortColumn.sortOrder);
        }
    }


    /**
     * Triggered when in cell selection mode
     *
     */
    cellSelectionChange (cell: any, column: DTColumn2Component, item: any)
    {
        if (this.selectionMode !== 'cell') {
            return;
        }
        let lookupKey = {
            col: column.key || column.label,
            item: item
        };
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {

            let foundIndex = ListWrapper.findIndexComplex(this.state.selection, lookupKey);
            let isSelected = foundIndex !== -1;

            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val: any, index: number) => index !== foundIndex);
            } else {
                this.state.selection = [...this.state.selection, lookupKey];
            }
        } else {
            this.state.selection = [lookupKey];
        }
        this.onCellChange.emit(this.state.selection);
    }


    /**
     * Triggered by column whe header is selected. Current we assume the only one header can be
     * selected at the time.
     *
     */
    headerSelectionChange (cell: any, column: DTColumn2Component)
    {
        if (isPresent(this.state.headerSelection)) {
            if (this.isHeaderSelected(column)) {
                this.state.headerSelection = null;
            } else {
                this.state.headerSelection = column;
            }
        } else {
            this.state.headerSelection = column;
        }
        this.onHeaderSelection.emit(this.state.headerSelection);
    }

    /**
     * To compare the data if we use deep object equality and this is used within this class as
     * well as from the DTColumn to conditionally add class which select the cell
     *
     * We might want to change to check only a key of the object some unique identifier.
     */
    isHeaderSelected (item: DTColumn2Component): boolean
    {
        if (isBlank(this.state.headerSelection)) {
            return false;
        }

        let colMatched = item.key || item.label;
        let currentCol = this.state.headerSelection.key || this.state.headerSelection.label;
        return colMatched === currentCol;
    }

    /**
     *
     * Check if the specific cell is selected. We need two points to identify if cell is selected
     * the actual Item that could represent whole row and Column
     *
     */
    isBodyCellSelected (column: DTColumn2Component, item: any): boolean
    {
        let lookupKey = {
            col: column.key || column.label,
            item: item
        };
        return isPresent(this.state.selection) &&
            ListWrapper.findIndexComplex(this.state.selection, lookupKey) !== -1;
    }


    /**
     *  Check if the given item is among the selected ones
     *
     */
    isRowSelected (item: any): boolean
    {
        if (this.hasLeadingSelectColumn() && isPresent(this.state.selection)) {

            if (this.selectionMode === 'multi') {
                return ListWrapper.findIndexComplex(this.state.selection, item) !== -1;

            } else if (this.selectionMode === 'single') {
                return equals(this.state.selection, item);
            }
        }
        return false;
    }


    /**
     *
     * Handles row selection logic where if the item is found inside the selected items, then
     * its removed otherwise its added.
     *
     * Todo: Sync & refactor this with dt.cellSelectionChange - pretty similar code
     *
     * We want to have rowToggle as well as we will have rowSelect or somethign similar to
     * identify we are dealing with multiselect and single selection
     */
    onRowToggle (event: any, item: any): void
    {
        let rowSelected = true;
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            let foundIndex = ListWrapper.findIndexComplex(this.state.selection, item);
            let isSelected = foundIndex !== -1;

            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val: any, index: number) => index !== foundIndex);

                rowSelected = false;
            } else {
                this.state.selection = [...this.state.selection, item];
            }

            // for the outline go up and down the sync with treeitems
            if (this.isOutline()) {
                this.handleOutlineRowToggleToChildren(item, isSelected);
                this.handleOutlineRowToggleToParent(item, isSelected);
            }
        } else {
            this.state.selection = [item];

            if (this.isOutline()) {
                this.handleOutlineRowToggleToChildren(item, false);
                this.handleOutlineRowToggleToParent(item, false);
            }
        }

        this.onRowSelectionChange.emit({
            isSelected: rowSelected,
            item: this.state.selection
        });

        event.stopPropagation();
    }

    /**
     *
     * Handles row signle selection
     *
     */
    onRowSelect (event: any, item: any): void
    {
        this.state.selection = item;
        event.stopPropagation();

        this.onRowSelectionChange.emit(item);
    }


    /**
     * When dealing with outline (tree) we need to make sure when we select some root item it
     * will automatically also select all its children
     *
     */
    handleOutlineRowToggleToChildren (currentItem: any, isSelected: boolean): void
    {
        let childrenForNode = this.children.apply(this.context, [currentItem]) || [];

        if (childrenForNode.length > 0) {
            // If is selected currently then toggle to other state
            if (!isSelected) {
                // when checking all from root, deselect children and add all
                this.handleOutlineRowToggleToChildren(currentItem, true);
                this.state.selection = [...this.state.selection, ...childrenForNode];

            } else {
                // remove each child
                for (let child of childrenForNode) {
                    let foundIndex = ListWrapper.findIndexComplex(this.state.selection, child);
                    this.state.selection = this.state.selection
                        .filter((val: any, index: number) => index !== foundIndex);
                }
            }

            // apply the same for children of children
            for (let child of childrenForNode) {
                this.handleOutlineRowToggleToChildren(child, isSelected);
            }
        }
    }


    /**
     *
     * Just like for handleOutlineRowToggleToChildren the same behavior needs to be applied for
     * towards up.
     *
     *
     */
    handleOutlineRowToggleToParent (currentItem: any, isSelected: boolean): void
    {
        let parent = currentItem.$$parentItem;
        if (isPresent(parent)) {
            let childrenForNode = this.children.apply(this.context, [parent]) || [];

            let allSelected = true;
            for (let child of childrenForNode) {
                allSelected = ListWrapper.findIndexComplex(this.state.selection, child) !== -1
                    && allSelected;
            }

            if (!isSelected) {
                if (allSelected) {
                    this.state.selection.push(parent);
                }

            } else {
                if (!allSelected) {
                    let parentIndex = ListWrapper.findIndexComplex(this.state.selection,
                        parent);
                    this.state.selection = this.state.selection
                        .filter((val: any, index: number) => index !== parentIndex);
                }
            }
            this.handleOutlineRowToggleToParent(currentItem.$$parentItem, isSelected);
        }
    }

    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     */
    isEmpty ()
    {
        return isBlank(this.dataToRender) || (this.dataToRender.length === 0);
    }


    hasFrozenColumns (): boolean
    {
        return isPresent(this.frozenColumns) && this.frozenColumns.length > 0;
    }

    reset ()
    {
        this.sortColumn = null;
        this.updateDataToRender();
    }


    visibleColumns ()
    {
        return this.columns ? this.columns.filter(c => c.isVisible) : [];
    }


    /**
     * More like utility methods to translate string<-->number value for sorting
     *
     * Currently used only by DTColumn. We might want to move this
     *
     * Todo: move this out into its component.
     *
     */
    sortOrderingForString (direction: string): number
    {
        if (isBlank(direction) || direction === 'ascending') {
            return 1;
        }

        if (isBlank(direction) || direction === 'descending') {
            return -1;
        }
        // todo: log bad key
        return 1;
    }


    sortOrderingForNumber (direction: number): string
    {
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
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     */
    initDetailColumnExpansion (): void
    {
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn) &&
            BooleanWrapper.isTrue(this.showRowDetailExpansionControl);
    }


    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     */
    initColumnInfo (): void
    {
        this.numberOfColsBeforeData = 0;

        this.columns.forEach((col: DTColumn2Component) =>
        {
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
     * Placeholder functionality for the single/multiselect functionality where we need to track if
     * we support selection plus how many column it occupies and if the selection controls are
     * visible or hidden.
     */
    hasInvisibleSelectionColumn (): boolean
    {
        return this.hasLeadingSelectColumn() && !this.showSelectionColumn;
    }


    /**
     *
     * Placeholder to identify if they are non-value column
     *
     */
    hasLeadingSelectColumn (): boolean
    {
        return this.selectionMode !== 'none' && this.selectionMode !== 'cell';
    }


    /**
     * Select or unselect all rows. Used by header checkbox
     *
     */
    toggleAllColumns (event: any): void
    {
        let currentItems = this.dataToRender || [];
        let selectedObject = this.state.selection || [];
        if (selectedObject.length >= currentItems.length) {
            this.state.selection = [];
        } else {
            this.state.selection = [];
            this.state.selection = [...currentItems];
        }
    }

    /**
     *
     * Defaults the checkbox to either selected and not selected depended on internal state
     *
     */
    isToggleAllColumnSelected (): boolean
    {
        let currentItems = this.dataToRender || [];
        let selectedObject = this.state.selection || [];

        return currentItems.length > 0 && selectedObject.length >= currentItems.length;
    }

    isToggleAllColumnDisabled (): boolean
    {
        let currentItems = this.dataToRender || [];

        return currentItems.length === 0;
    }

    handleRowClicked (event: any, item: any): void
    {
        // special alt key modifier. When used with rows it indicates there is a D&D enabled
        if (event.altKey) {
            return;
        }

        if (this.selectionMode === 'multi') {
            this.onRowToggle(event, item);

        } else if (this.selectionMode === 'single') {
            this.onRowSelect(event, item);
        }

    }

    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     */
    showDetailColumn (item: any): boolean
    {
        if (this.canUseForDetailRow(item) && this.detailRowExpansionState.isExpanded(item)) {
            return true;
        }
        return false;
    }

    private canUseForDetailRow (item: any): boolean
    {
        return isPresent(this.rowDetailColumn) &&
            (<DTDetailRowComponent>this.rowDetailColumn).showDetailRow(item);
    }

    /**
     *
     * When [children] binding is present then it means we need to render it as a tree
     *
     */
    isOutline (): boolean
    {
        return isPresent(this.children);
    }


    /**
     *
     * Called by D&D row directive to update this TD that row reordering needs to happen. We
     * receive an INDEX of row we are dragging and new drop position, plus information if it
     * needs to be dropped before new row position or after.
     *
     */
    onDnDRowDrop (origPos: number, newPos: number, dropPos: DropPosition): void
    {
        if (isPresent(this.dataSource)) {
            console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
            this.dataSource.reorderRows(origPos, newPos, dropPos);
        }
    }


    /**
     *
     * When detail row is combined with outline control we need make sure that we maintain the
     * correct state for items that are eligible for detail row
     *
     * In this specific case the detail row does not have its own expander but utilizing the
     * outlineControl
     */
    onOutlineExpandChange (event: any): void
    {
        let item = event.item;

        // We dont really need to store a state form outline locally as we are using the same object
        // reference
        // this.state.outlineState = this.outlineState.expansionStates;

        if (this.canUseForDetailRow(item)) {
            this.detailRowExpansionState.toggle(item);
        }
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
     */
    skipOutlineItem (item: any): boolean
    {
        return this.canUseForDetailRow(item);
    }

    ngOnDestroy ()
    {
        super.ngOnDestroy();
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    }
}


/**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
export class DetailRowExpansionState
{

    expansionStates: Map<any, boolean>;


    constructor (private dt: Datatable2Component)
    {
    }

    private itemToKey (item: any): string
    {
        return isEntity(item) ? (<Entity>item).identity() : item;
    }

    get detailExpansionEnabled (): boolean
    {
        return isPresent(this.expansionStates);
    }

    set detailExpansionEnabled (value: boolean)
    {

        if (value) {
            this.expansionStates = new Map<any, boolean>();
        } else {
            this.expansionStates = null;
        }
    }

    toggle (item: any): void
    {
        let key = this.itemToKey(item);
        if (!this.isExpanded(item)) {
            this.expansionStates.set(key, true);
        } else {
            this.expansionStates.delete(key);
        }

        this.dt.state.detailRowExpandState = this.expansionStates;
    }

    isExpanded (item: any): boolean
    {
        let key = this.itemToKey(item);
        // handle special case where we collapse parent of parent while detail row is expanded
        if (this.dt.isOutline() && !this.dt.outlineState.isExpanded(key)) {
            this.expansionStates.delete(key);
            return false;
        }

        let isOutlineExpanded = this.dt.isOutline() ? this.dt.outlineState.isExpanded(key) : true;
        return isPresent(key) && this.expansionStates.has(key);
    }
}
