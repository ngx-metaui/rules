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
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AWDataTable} from '../aw-datatable';
import {Datatable2Component} from '../datatable2.component';
import {BooleanWrapper, Environment, isBlank, isPresent} from '@aribaui/core';
import {BaseComponent} from '../../../core/base.component';
import {DomHandler} from 'primeng/primeng';


export type DTHAlignment = 'left' | 'center' | 'right';


/**
 * DTColumn represent single column including header and its body. Each column has its own
 * rendererTemplate which a entry to this component.
 *
 * Keeping this separate from the datatable where DT is not really aware what it is rendering,
 * it allows us more flexibility in terms of different type of column inheriting from this
 * one.. Such as:
 *  DTRowDetail  column
 *  DTSingleSelection column
 *  DTMultiSelection column
 *
 * This way we don't do IF/THEN/ELSE inside the datatable and trying to create different cases.
 *
 *  Then later on this will let us create additional logic for the pivotal layout. Because DT
 *  does know anything about the type of the column so whatever is added to the DT.columns it
 *  will be rendered.
 *
 *
 *  Columns can be also frozen meaning if the content overflows they dont scroll. To make the
 *  column frozen we need to use [frozen] binding and se it to TRUE plus it requires a [width]
 *  binding to be set (in px).
 *  We need this to be able to properly position the second table which is changed to absolute
 *  positioning.
 *
 *
 *
 */
@Component({
    selector: 'aw-dt-column2',
    templateUrl: 'dt-column.component.html',
    styleUrls: ['dt-column.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DomHandler]

})
export class DTColumn2Component extends BaseComponent implements AfterContentInit {
    /**
     * Column header label.
     *
     * Or you can use headerTemplate to define your own template
     */
    @Input()
    label: string;

    /**
     * What field name to read from the given object
     */
    @Input()
    key: string;

    /**
     *
     * Cell alignment. It inserts regular align attribute to the table cell
     *
     */
    @Input()
    align: DTHAlignment = 'left';


    /**
     * Retrieves dynamic class based on data and then its added to the table cell TD
     */
    @Input()
    bodyClassFn: (column: DTColumn2Component, item: any) => string;

    /**
     *
     * If false applies dt-is-hidden style that hides the column
     *
     */
    @Input()
    isVisible: boolean = true;

    /**
     * Marks column as sortable which means sorting icon is added to the header with special
     * sorting handling
     */
    @Input()
    sortable: any;

    /**
     * Sorting direction
     *
     */
    @Input()
    sortOrdering: string = 'descending';

    /**
     * Tells the template if whether to render a label
     *
     */
    @Input()
    showColumnLabel: boolean = true;

    /**
     *
     * See AWDataTable
     *
     */
    @Input()
    showSubHeader: boolean = false;


    /**
     * Default static class that is added to the TH into the header. It does not rely on data
     *
     */
    @Input()
    headerStyleClass: string;

    /**
     * Default static class that is added to the td into the body. It does not rely on data
     *
     */
    @Input()
    bodyStyleClass: string;

    /**
     *
     * Used together with cell selectionMode to tell which column is selectable
     *
     */
    @Input()
    selectable: boolean = false;

    /**
     * Use globally defined HEADER template for current column
     *
     */
    @Input()
    useGlobalHeader: boolean = true;

    /**
     * Use globally defined SubHeader template for current column
     *
     */
    @Input()
    useGlobalSubHeader: boolean = true;

    /**
     * Use globally defined body template
     *
     */
    @Input()
    useGlobalBody: boolean = true;


    /**
     * Tells if the column is data column  - if it is rendering data or just a label or some
     * control
     *
     * This is important when calculating a column span and we need to know which columns are or
     * will be just for selection controls and which holds data
     */
    @Input()
    isDataColumn: boolean = true;

    /**
     * Identifies column that will not scroll horizontally with other columns. Column is
     * frozen.
     *
     * For such columns that are marked as frozen binding [width] is required.
     *
     */
    @Input()
    frozen: boolean = false;

    /**
     * Sets the Max Width for the TD. Even TD does not support we calculate the content width
     * for each cell and then decide if we need to enlarge the column.
     *
     * @Experimantal binding that is currently working if the content of the cell is inline
     * element where we can control whitespace wrapping in order to find out the real width
     */
    @Input()
    maxWidth: string;


    /**
     * Sets the minWidth on the cell. Again just like maxWidth css properly is not supported on
     * the table so there is a workaround where we create additional row that sets padding right
     * and this will prevent the column to collapse under specified width
     *
     * todo: still TBD
     */
    @Input()
    minWidth: string;

    /**
     * Main rendering template used by datatable to render each column.
     */
    @ViewChild('renderingTemplate')
    rendererTemplate: TemplateRef<any>;

    /**
     * Custom header template. It will override provided label
     */
    @ContentChild('header')
    headerTemplate: TemplateRef<any>;

    /**
     * Custom subHeader template.
     */
    @ContentChild('subHeader')
    subHeaderTemplate: TemplateRef<any>;

    /**
     * Custom body template that will override read value from the [key] binding
     */
    @ContentChild('body')
    bodyTemplate: TemplateRef<any>;


    /**
     * Internal...
     */
    sortOrder: number;
    maxWidthPx: number = 0;
    minWidthPx: number = 0;
    widthPx: number = 0;
    widestCell: number = 0;

    /**
     * Reference to Datatable Implementations
     */
    dt: AWDataTable;


    constructor(public env: Environment,
                public domHandler: DomHandler) {
        super(env);
    }


    ngOnInit(): void {
        super.ngOnInit();
        this.sortOrder = this.dt.sortOrderingForString(this.sortOrdering);

        if (isBlank(this.bodyTemplate) && this.useGlobalBody) {
            this.bodyTemplate = this.dt.bodyTemplate;
        }

        if (isBlank(this.headerTemplate) && this.useGlobalHeader) {
            this.headerTemplate = this.dt.headerTemplate;
        }

        if (isBlank(this.subHeaderTemplate) && this.useGlobalSubHeader) {
            this.subHeaderTemplate = this.dt.subHeaderTemplate;
        }

        if (isBlank(this.bodyClassFn)) {
            this.bodyClassFn = this.dt.bodyClassFn;
        }

        if (isBlank(this.key) && isBlank(this.label)) {
            throw new Error('Missing required binding: ' +
                '[key] or [label] bindings must be used at minimum');
        }

        // To be able to position second DT we require [width] to be set as well
        if (this.frozen && isBlank(this.width)) {
            throw new Error('Missing required binding [width]: ' +
                'when [frozen]=true then [width] binding needs to be specified.');
        }

    }


    ngAfterContentInit(): void {

    }

    ngAfterViewInit(): void {
        // need to deffer this and trigger change detection otherwise I get
        // value was changed after it was checked error
        setTimeout(() => {
            this.maxWidthPx = this.widthToPx(this.maxWidth);
            this.minWidthPx = this.widthToPx(this.minWidth);
            this.widthPx = this.widthToPx(this.width);
        });
    }

    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     */
    handleHeaderClick(event: any, element: any): void {
        if (this.isHeaderSelectable()) {
            this.dt.onHeaderSelectionChange(element, this);

        } else if (this.sortable) {
            this.sort(event);
        }
        event.preventDefault();
    }

    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     */
    sort(event: any) {
        if (!this.sortable) {
            return;
        }
        let targetNode = event.target;
        if (this.domHandler.hasClass(targetNode, 'dt-u-sortable') ||
            this.domHandler.hasClass(targetNode, 'dt-col-title') ||
            this.domHandler.hasClass(targetNode, 'dt-col-sortable-icon')) {

            if (isPresent(this.dt.sortColumn) && this.dt.sortColumn.key === this.key) {
                this.sortOrder = this.sortOrder * -1;
                this.sortOrdering = this.dt.sortOrderingForNumber(this.sortOrder);

            } else {
                this.dt.sortColumn = this;

            }
            this.dt.dataSource.state.sortKey = this.key;
            this.dt.dataSource.state.sortOrder = this.dt.sortOrderingForString(this.sortOrdering);

            this.dt.sortSingle();
        }
        this.dt.updateDataToRender();
    }

    /**
     * Calculated style class based on data
     *
     *
     */
    dynamicBodyClass(item: any): boolean {
        let dynClass = isPresent(this.bodyClassFn)
            ? this.bodyClassFn.apply(this.dt.context, [this, item]) : '';

        if (isPresent(this.bodyStyleClass)) {
            dynClass += ' ' + this.bodyStyleClass;

        } else if (isPresent(this.styleClass)) {
            dynClass += ' ' + this.styleClass;
        }

        return dynClass;
    }


    isRowSelectable(item: any): boolean {
        if (isPresent(this.dt.isRowSelectable)) {
            return this.dt.isRowSelectable(item);
        }

        return false;
    }

    isCellSelectable(item: any): boolean {
        return this.dt.selectionMode === 'cell' && this.isRowSelectable(item) && this.selectable;

    }


    isHeaderSelectable(): boolean {
        return this.dt.selectionMode === 'cell' && this.selectable;

    }


    getSortOrder() {
        let order = 0;

        if (isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key) {
            order = this.dt.sortColumn.sortOrder;
        }
        return order;
    }

    isSorted() {
        if (!this.sortable) {
            return false;
        }
        return isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key;
    }

    initialize(table: AWDataTable): void {
        this.dt = table;

        if (isPresent(this.dt.initialSortKey) && this.dt.initialSortKey === this.key) {
            this.sortable = true;
            this.sortOrder = this.dt.sortOrderingForString(this.dt.initialSortOrder);
            this.dt.sortColumn = this;
        }
    }

    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     */
    postInitialize(myIndex: number): void {
        const colIndex = myIndex + 1;
        let table;

        if (this.dt.hasFrozenColumns()) {
            table = (<Datatable2Component>this.dt).el
                .nativeElement.querySelector('.dt-body-frozen table');
        } else {
            table = (<Datatable2Component>this.dt).el.nativeElement.querySelector('table');
        }


        if (this.widestCell > 0) {
            let all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
                'tr td:nth-child(' + colIndex + ')').forEach((node: any) => {
                node.style.width = this.widestCell + 'px';
            });
        }
    }


    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     */
    isValueColumn(): boolean {
        return (isPresent(this.isDataColumn) && BooleanWrapper.isTrue(this.isDataColumn)) ||
            isPresent(this.key);
    }

    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     */
    indentForControl(cell: any, level: number): any {
        if (this.dt.isOutline() && level > 0 && cell.offsetWidth > 0
            && isPresent(cell.nextElementSibling)) {

            let outlineNodePadding =
                parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;

            // 1st level is pushed as root
            if (this.dt.pushRootSectionOnNewLine) {
                return (level === 1) ? null : (this.dt.indentationPerLevel * level)
                    - outlineNodePadding;
            } else {
                return (this.dt.indentationPerLevel * level) + outlineNodePadding;
            }
        }
        return null;
    }


    /**
     *
     * Internal
     */
    private widthToPx(width: string): number {
        let px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                const nonPc = parseFloat(width) / 100;
                px = nonPc * (<Datatable2Component>this.dt).el.nativeElement.offsetWidth;
            } else {
                px = parseFloat(width);
            }
        }

        return px;
    }
}

