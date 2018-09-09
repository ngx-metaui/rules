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
import { AfterContentInit, TemplateRef } from '@angular/core';
import { AWDataTable } from '../aw-datatable';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
import { DomHandler } from 'primeng/primeng';
export declare type DTHAlignment = 'left' | 'center' | 'right';
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
export declare class DTColumn2Component extends BaseComponent implements AfterContentInit {
    env: Environment;
    domHandler: DomHandler;
    /**
     * Column header label.
     *
     * Or you can use headerTemplate to define your own template
     */
    label: string;
    /**
     * What field name to read from the given object
     */
    key: string;
    /**
     *
     * Cell alignment. It inserts regular align attribute to the table cell
     *
     */
    align: DTHAlignment;
    /**
     * Retrieves dynamic class based on data and then its added to the table cell TD
     */
    bodyClassFn: (column: DTColumn2Component, item: any) => string;
    /**
     *
     * If false applies dt-is-hidden style that hides the column
     *
     */
    isVisible: boolean;
    /**
     * Marks column as sortable which means sorting icon is added to the header with special
     * sorting handling
     */
    sortable: any;
    /**
     * Sorting direction
     *
     */
    sortOrdering: string;
    /**
     * Tells the template if whether to render a label
     *
     */
    showColumnLabel: boolean;
    /**
     *
     * See AWDataTable
     *
     */
    showSubHeader: boolean;
    /**
     * Default static class that is added to the TH into the header. It does not rely on data
     *
     */
    headerStyleClass: string;
    /**
     * Default static class that is added to the td into the body. It does not rely on data
     *
     */
    bodyStyleClass: string;
    /**
     *
     * Used together with cell selectionMode to tell which column is selectable
     *
     */
    selectable: boolean;
    /**
     * Use globally defined HEADER template for current column
     *
     */
    useGlobalHeader: boolean;
    /**
     * Use globally defined SubHeader template for current column
     *
     */
    useGlobalSubHeader: boolean;
    /**
     * Use globally defined body template
     *
     */
    useGlobalBody: boolean;
    /**
     * Tells if the column is data column  - if it is rendering data or just a label or some
     * control
     *
     * This is important when calculating a column span and we need to know which columns are or
     * will be just for selection controls and which holds data
     */
    isDataColumn: boolean;
    /**
     * Identifies column that will not scroll horizontally with other columns. Column is
     * frozen.
     *
     * For such columns that are marked as frozen binding [width] is required.
     *
     */
    frozen: boolean;
    /**
     * Sets the Max Width for the TD. Even TD does not support we calculate the content width
     * for each cell and then decide if we need to enlarge the column.
     *
     * @Experimantal binding that is currently working if the content of the cell is inline
     * element where we can control whitespace wrapping in order to find out the real width
     */
    maxWidth: string;
    /**
     * Sets the minWidth on the cell. Again just like maxWidth css properly is not supported on
     * the table so there is a workaround where we create additional row that sets padding right
     * and this will prevent the column to collapse under specified width
     *
     * todo: still TBD
     */
    minWidth: string;
    /**
     * Main rendering template used by datatable to render each column.
     */
    rendererTemplate: TemplateRef<any>;
    /**
     * Custom header template. It will override provided label
     */
    headerTemplate: TemplateRef<any>;
    /**
     * Custom subHeader template.
     */
    subHeaderTemplate: TemplateRef<any>;
    /**
     * Custom body template that will override read value from the [key] binding
     */
    bodyTemplate: TemplateRef<any>;
    /**
     * Internal...
     */
    sortOrder: number;
    maxWidthPx: number;
    minWidthPx: number;
    widthPx: number;
    widestCell: number;
    /**
     * Reference to Datatable Implementations
     */
    dt: AWDataTable;
    constructor(env: Environment, domHandler: DomHandler);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     */
    handleHeaderClick(event: any, element: any): void;
    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     */
    sort(event: any): void;
    /**
     * Calculated style class based on data
     *
     *
     */
    dynamicBodyClass(item: any): boolean;
    isRowSelectable(item: any): boolean;
    isCellSelectable(item: any): boolean;
    isHeaderSelectable(): boolean;
    getSortOrder(): number;
    isSorted(): boolean;
    initialize(table: AWDataTable): void;
    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     */
    postInitialize(myIndex: number): void;
    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     */
    isValueColumn(): boolean;
    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     */
    indentForControl(cell: any, level: number): any;
    /**
     *
     * Internal
     */
    private widthToPx(width);
}
