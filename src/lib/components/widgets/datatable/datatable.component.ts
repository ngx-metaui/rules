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
import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    SkipSelf,
    ViewChild
} from '@angular/core';
import {assert, Environment, equals, isArray, isBlank, isPresent} from '@aribaui/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {DataTable, FilterMetadata, SortMeta} from 'primeng/primeng';
import {DTHeaderColumnGroupComponent} from './column/column-group.component';
import {DTColumnComponent} from './column/column.component';
import {DTHeaderComponent} from './header/header.component';
import {DTFooterComponent} from './footer/footer.component';
import {DATA_SOURCE} from '../../core/data/data-source';
import {DataProviders} from '../../core/data/data-providers';
import {DataFinders, QueryType} from '../../core/data/data-finders';
import {DatatableState, DTDataSource} from './datatable-data-source';
import {BaseFormComponent} from '../../core/base-form.component';
import {Subscription} from 'rxjs/Subscription';


/**
 * Datatable component that implements the data grid that shows tabular data.
 *
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *          // Basic Datatable usage.
 *           <aw-datatable [list]="items">
 *               <aw-dt-column label="item" field="item"></aw-dt-column>
 *               <aw-dt-column label="quantity" field="quantity"></aw-dt-column>
 *               <aw-dt-column label="cost"  field="cost"></aw-dt-column>
 *               <aw-dt-column label="tax" field="tax"></aw-dt-column>
 *               <aw-dt-column label="discount" field="discount"></aw-dt-column>
 *               <aw-dt-column label="total" field="total"></aw-dt-column>
 *           </aw-datatable>
 *
 *
 *           // Datatable with template support
 *           <aw-datatable [list]="items">
 *               <aw-dt-column label="Item" field="item"></aw-dt-column>
 *               <aw-dt-column field="quantity" label="Quantity">
 *                  <ng-template let-col let-item="rowData" pTemplate="body">
 *                       <span [style.color]="'red'" [style.fontWeight]="'bold'">
 *                           {{item[col.field]}}
 *                       </span>
 *                   </ng-template>
 *               </aw-dt-column>
 *               <aw-dt-column label="cost"  field="cost"></aw-dt-column>
 *               <aw-dt-column label="tax" field="tax"></aw-dt-column>
 *               <aw-dt-column field="total">
 *                   <ng-template pTemplate="header">
 *                       <h3>Total</h3>
 *                   </ng-template>
 *                   <ng-template let-col let-item="rowData" pTemplate="body">
 *                       $ {{item[col.field]}}
 *                   </ng-template>
 *               </aw-dt-column>
 *           </aw-datatable>
 *
 *
 *           // Datatable with global search and column filter support.
 *           <aw-datatable [list]="cars" [rows]="10" [totalRecords]="cars.length"
 *                          [paginator]="true" hasGlobalFilter="true" #dt1>
 *               <aw-dt-header>List of Cars</aw-dt-header>
 *               <aw-dt-column field="vin" header="Vin (startsWith)" [filter]="true"
 *                                              filterPlaceholder="Search"></aw-dt-column>
 *               <aw-dt-column field="year" header="Year">
 *               </aw-dt-column>
 *               <aw-dt-column field="brand" header="Brand (Custom)" [filter]="true"
 *                                                 filterMatchMode="equals">
 *                   <ng-template pTemplate="filter" let-col>
 *
 *                       <aw-dropdown [list]="brands"
 *                               [noSelectionString]="'All Brands'"
 *                               (onSelection)="dt1.filter($event,col.field,col.filterMatchMode)"
 *                               styleClass="ui-column-filter">
 *                           <ng-template #itemTemplate let-item>
 *                               {{item.label}}
 *                           </ng-template>
 *                       </aw-dropdown>
 *                   </ng-template>
 *               </aw-dt-column>
 *               <aw-dt-column field="color" header="Color (Custom)" [filter]="true"
 *                             filterMatchMode="in">
 *                   <ng-template pTemplate="filter" let-col>
 *                       <aw-dropdown [list]="colors"
 *                               [noSelectionString]="'All Colors'"
 *                               (onSelection)="dt1.filter($event,col.field,col.filterMatchMode)"
 *                               styleClass="ui-column-filter">
 *                           <ng-template #itemTemplate let-item>
 *                               {{item.label}}
 *                           </ng-template>
 *                       </aw-dropdown>
 *                   </ng-template>
 *               </aw-dt-column>
 *           </aw-datatable>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        items: any[];
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 *
 *   @deprecated please use datatable2 instead - it this will removed soon
 *
 */

export const DT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatatableComponent),
    multi: true
};


@Component({
    selector: 'aw-datatable',
    templateUrl: 'datatable.component.html',
    styleUrls: ['datatable.component.scss'],
    providers: [
        {provide: DATA_SOURCE, useClass: DTDataSource, deps: [DataProviders, DataFinders]},
        DT_CONTROL_VALUE_ACCESSOR,
        {provide: BaseFormComponent, useExisting: forwardRef(() => DatatableComponent)}
    ]
})
export class DatatableComponent extends BaseFormComponent implements AfterContentInit {
    /**
     *  List of items to show in the datatable.
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
     * Global filter is a search box where users can enter the data they want to filter on.
     *
     * @type {boolean}
     */
    @Input()
    hasGlobalFilter: boolean = false;

    /**
     * !!! NOT IMPLEMENTED !!!
     *
     * Table customization. User can customize which columns are displayed. -->
     * @type {boolean}
     */
    @Input()
    isTableCustomizable: boolean = false;

    /**
     * !!! NOT IMPLEMENTED !!!
     *
     * Configuration. user can select which columns to pin, whether expand or collapse all,
     * and how many rows to display, etc.
     * @type {boolean}
     */
    @Input()
    isTableConfigurable: boolean = false;

    /**
     * Whether the table cells are editable or not. It has two modes:
     * 1. inline - table cells are editable when user clicks into the cell.
     * 2. wholeTable - The whole table becomes editable. Columns with editable=true.
     */
    @Input()
    editMode: EditMode;


    /**
     * whether the table is selectabled. It could be single or multi select. Default is null;
     * values = ['single', 'multiple']
     */
    @Input()
    multiselect: boolean;

    /**
     * Allows you to pass your own datasource to override default one. Also when dataSource is
     * used the destinationClass or list are ignored
     */
    @Input()
    dataSource: DTDataSource;

    /**
     * The number of selected rows in the datatable.
     * Buttons in the footer performance actions on the selectedRows.
     */
    selectedRows: any[] = [];

    /**
     * Event fired when user select a row
     * @type {EventEmitter}
     */
    @Output()
    onRowSelected: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when user select a row is unselected
     * @type {EventEmitter}
     */
    @Output()
    onRowUnselected: EventEmitter<any> = new EventEmitter();

    /**
     * The header column groups can be used to configure how the columns header appear.
     * Multiple columns can be grouped into a single column.
     *
     */

    @ContentChildren(DTHeaderColumnGroupComponent)
    headerColumnGroupComponents: QueryList<DTHeaderColumnGroupComponent>;


    /**
     * A list of all the cols inside this datatable.
     */
    @ContentChildren(DTColumnComponent)
    cols: QueryList<DTColumnComponent>;


    /**
     * The internal primeNg datatable.
     */
    @ViewChild(DataTable)
    dataTable: DataTable;

    /**
     * Datatable header.
     */
    @ContentChild(DTHeaderComponent)
    header: DTHeaderComponent;

    /**
     * Datatable footer. Usually contains footer buttons or table data.
     */
    @ContentChild(DTFooterComponent)
    footer: DTFooterComponent;

    /**
     * PrimeNg Variables
     * This Datatable is backed by primeNg's datatable. The following variables
     * are from primeNg and can be set by the caller to modify behavior.
     *
     * The end goal is to slowly remove them and replace them with internal functionality based
     * on what we want to support
     */
    @Input() paginator: boolean;
    @Input() rows: number;
    @Input() totalRecords: number;
    @Input() pageLinks: number = 5;
    @Input() responsive: boolean;
    @Input() stacked: boolean;
    @Input() filterDelay: number = 300;
    @Input() lazy: boolean = false;
    @Input() resizableColumns: boolean;
    @Input() columnResizeMode: string = 'fit';
    @Input() reorderableColumns: boolean;
    @Input() scrollable: boolean;
    @Input() virtualScroll: boolean;
    @Input() scrollHeight: any;
    @Input() scrollWidth: any;
    @Input() frozenWidth: any;
    @Input() unfrozenWidth: any;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() tableStyle: any;
    @Input() tableStyleClass: string;
    @Input() sortMode: string = 'single';
    @Input() sortField: string;
    @Input() sortOrder: number = 1;
    @Input() groupField: string;
    @Input() multiSortMeta: SortMeta[];
    @Input() contextMenu: any;
    @Input() paginatorPosition: string = 'bottom';
    @Input() metaKeySelection: boolean = true;
    @Input() expandableRows: boolean;
    @Input() expandedRows: any[];
    @Input() expandableRowGroups: boolean;
    @Input() rowExpandMode: string = 'multiple';
    @Input() expandedRowsGroups: any[];
    @Input() tabindex: number = 1;
    @Input() rowStyleClass: Function;
    @Input() rowGroupMode: string;
    @Input() sortableRowGroup: boolean = true;
    @Input() sortFile: string;
    @Input() rowHover: boolean;
    @Input() first: number = 0;
    @Input() public filters: { [s: string]: FilterMetadata } = {};
    @Input() dataKey: string;
    @Input() loading: boolean;
    /**
     *  End of PrimeNg Variables.
     */


    /**
     * flag to indicate content has been initialized.
     * @type {boolean}
     */
    contentInitialized: boolean = false;
    lazyLoaded: boolean = false;


    /**
     * Please see {@link multiselect}
     */
    selectionMode: string;


    /**
     * Just to clean up subscriber when component is destroyed
     */
    private dsSubscriber: Subscription;

    constructor(public env: Environment,
                protected element: ElementRef,
                @Inject(DATA_SOURCE) private _defaultDS: DTDataSource,
                @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                protected parentContainer: BaseFormComponent) {
        super(env, parentContainer);
    }

    ngOnInit() {

        super.ngOnInit();

        if (isPresent(this.list) && isPresent(this.destinationClass)) {
            throw new Error('You cannot use both bindings [list] and [destinationClass]!');
        }
        this.updateSelectionMode();
        super.registerFormControl(this.list);

        /**
         * editMode is a feature of this datatable that's not in primeNg. primeNg only supports
         * inline editing. For all other types of editMode, we pass false and handle it ourself.
         */
        this.editable = this.editMode === 'inline';

        if (isBlank(this.dataSource) &&
            (isPresent(this.destinationClass) || isPresent(this.list))) {

            this.initDatasource();
        } else if (isPresent(this.formControl) && isPresent(this.formControl.value)) {
            this.list = this.formControl.value;
            this.initDatasource();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (!this.contentInitialized) {
            return;
        }
        if (isPresent(changes['editMode'])) {
            this.updateEditMode();
        }
        if (isPresent(changes['sortMode'])) {
            this.sortMode = changes['sortMode'].currentValue;
        }

        if (isPresent(changes['list']) && isBlank(this.dataSource)) {
            this.initDatasource();
        } else {
            this.dataSource.dataProvider.dataChanges.next(this.list);
        }

    }


    ngAfterContentInit() {
        // Assign what's in our headerColumnGroupComponent to primeng's header column.
        this.dataTable.headerColumnGroups = this.headerColumnGroupComponents;
        this.contentInitialized = true;
    }

    onRowSelect(event: any) {
        this.onRowSelected.emit(event.data);
    }

    onRowUnselect(event: any) {
        this.onRowUnselected.emit(event.data);
    }

    /**
     * Since Angular is pretty strict about updating view after it has been created. If we try to
     * change a value (this.list) after view initialized we most likely get unexpected  behavior
     * changed value will not be reflected inside PrimeNg Component.
     *
     * When using our datasource to fetch value it could have some delay that could lead
     * changing a value after view is checked and for this Angular will throw an ERROR.
     *
     * Please see: "Unidirectional data flow" => after parent changes is processed no child
     * component is allowed to change its properties
     *
     * Solution:
     *
     * OnLazyLoad is triggered afterContentInit and change value directly here is wrong as it
     * will not be reflected inside component.
     *
     * - Fetching value using our dataSource which will get back our list inside subscribed
     * listener (dataSource.open) will trigger Above Error as it will change value after View is
     * checked.
     *
     *
     * EventEmitter PrimeNG is not any async. So we can either execute the load inside the
     * setTimeout or call detectChanges. We just need to re-execute once more Angular's
     * verification loop.
     *
     * Why: Any of these action will automatically re-trigger DoCheck to verify for any changes.
     *
     *
     *
     */
    onLazyLoad(event: any) {
        if (!this.lazy) {
            return;
        }

        this.lazyLoaded = true;
        if (isBlank(event.rows)) {
            this.dataSource.fetch();
        } else {
            this.dataSource.fetch(DatatableState.create(event.first, event.rows, event.sortField,
                event.sortOrder));
        }
    }


    filter(value: any, field: any, matchMode: any) {
        this.dataTable.filter(value, field, matchMode);
    }

    hasHeader(): boolean {
        return isPresent(this.header);
    }

    hasFooter(): boolean {
        return isPresent(this.footer);
    }

    /**
     * Updates current immutable list and trigger change detection
     *
     */
    private updateList(newList: any[]): void {

        setTimeout(() => {
            this.list = newList;
            this.onModelChanged(this.list);
            this.formControl.setValue(this.list);
        });
    }

    private updateSelectionMode(): void {
        if (isPresent(this.multiselect)) {
            this.selectionMode = this.multiselect ? 'multiple' : 'single';
        }
    }

    /**
     *
     * If there's a change in editMode, it requires special handling for the datatable. PrimeNg
     * initializes its columns after contentInit. However, when editMode changes, columns needs
     * to be updated. So we manually do it here to update primeNg's columns.
     *
     */
    private updateEditMode() {
        let i = 0, awCols = this.cols.toArray();
        if (this.dataTable && this.dataTable.cols) {

            let hasSelectionCol = (this.cols.length !== this.dataTable.cols.length) &&
                isPresent(this.selectionMode);

            this.dataTable.cols.forEach((dtCol, index) => {
                if ((index !== 0 && hasSelectionCol) || !hasSelectionCol) {

                    if (this.editMode === 'inline') {
                        this.editable = true;
                        dtCol.bodyTemplate = awCols[i].bodyTemplate;
                        dtCol.editorTemplate = awCols[i].editorTemplate;

                    } else if (this.editMode === 'wholeTable') {

                        this.editable = false;
                        dtCol.bodyTemplate = awCols[i].editorTemplate;
                    }
                    i++;
                }
            });
        }
    }


    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but for situation where we use [(ngModel)]="items" we need to deffer
     * this once we receive a value inside  ControlValueAccessor.writeValue
     *
     */
    initDatasource(): void {
        this.dataSource = this._defaultDS;

        assert((isPresent(this.destinationClass) || isPresent(this.list)),
            'To use default DataSource you need to provide either [destinationClass] or' +
            ' [list]');

        this.dataSource.init({
            obj: isPresent(this.destinationClass) ? this.destinationClass : this.list,
            queryType: QueryType.FullText,
            state: null,
            multiselect: this.multiselect
        });
        // reset list to make sure it comes from DataProvider, we use list  to initialize
        this.list = null;

        // listen for changes
        this.dataSource.open().subscribe((data: any[]) => {
            if ((this.lazyLoaded && this.lazy) || !this.lazy) {
                this.updateList(data);
            }
        });
    }

    /**
     * Updates value to this model. We bind a value indirectly through the DataProvider as
     * we want to have all the changes to come to the DataProvider.open()
     *
     */
    writeValue(value: any) {
        if (isPresent(value) && isArray(value) && !equals(value, this.list)) {

            if (isPresent(this.dataSource)) {
                this.dataSource.dataProvider.dataChanges.next(value);

            } else {
                this.list = value;
                this.initDatasource();
            }

        }
    }


    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isPresent(this.dsSubscriber)) {
            this.dsSubscriber.unsubscribe();
        }
    }
}


export type EditMode = 'inline' | 'wholeTable';
