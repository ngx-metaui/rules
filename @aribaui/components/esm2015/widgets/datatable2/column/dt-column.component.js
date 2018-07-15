/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BooleanWrapper, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
import { DomHandler } from 'primeng/primeng';
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
export class DTColumn2Component extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env);
        this.env = env;
        this.domHandler = domHandler;
        /**
         *
         * Cell alignment. It inserts regular align attribute to the table cell
         *
         */
        this.align = 'left';
        /**
         *
         * If false applies dt-is-hidden style that hides the column
         *
         */
        this.isVisible = true;
        /**
         * Sorting direction
         *
         */
        this.sortOrdering = 'descending';
        /**
         * Tells the template if whether to render a label
         *
         */
        this.showColumnLabel = true;
        /**
         *
         * See AWDataTable
         *
         */
        this.showSubHeader = false;
        /**
         *
         * Used together with cell selectionMode to tell which column is selectable
         *
         */
        this.selectable = false;
        /**
         * Use globally defined HEADER template for current column
         *
         */
        this.useGlobalHeader = true;
        /**
         * Use globally defined SubHeader template for current column
         *
         */
        this.useGlobalSubHeader = true;
        /**
         * Use globally defined body template
         *
         */
        this.useGlobalBody = true;
        /**
         * Tells if the column is data column  - if it is rendering data or just a label or some
         * control
         *
         * This is important when calculating a column span and we need to know which columns are or
         * will be just for selection controls and which holds data
         */
        this.isDataColumn = true;
        /**
         * Identifies column that will not scroll horizontally with other columns. Column is
         * frozen.
         *
         * For such columns that are marked as frozen binding [width] is required.
         *
         */
        this.frozen = false;
        this.maxWidthPx = 0;
        this.minWidthPx = 0;
        this.widthPx = 0;
        this.widestCell = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
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
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // need to deffer this and trigger change detection otherwise I get
        // value was changed after it was checked error
        // setTimeout(() =>
        // {
        // });
    }
    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    handleHeaderClick(event, element) {
        if (this.isHeaderSelectable()) {
            this.dt.onHeaderSelectionChange(element, this);
        }
        else if (this.sortable) {
            this.sort(event);
        }
        event.preventDefault();
    }
    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     * @param {?} event
     * @return {?}
     */
    sort(event) {
        if (!this.sortable) {
            return;
        }
        let /** @type {?} */ targetNode = event.target;
        if (this.domHandler.hasClass(targetNode, 'dt-u-sortable') ||
            this.domHandler.hasClass(targetNode, 'dt-col-title') ||
            this.domHandler.hasClass(targetNode, 'dt-col-sortable-icon')) {
            if (isPresent(this.dt.sortColumn) && this.dt.sortColumn.key === this.key) {
                this.sortOrder = this.sortOrder * -1;
                this.sortOrdering = this.dt.sortOrderingForNumber(this.sortOrder);
            }
            else {
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
     * @param {?} item
     * @return {?}
     */
    dynamicBodyClass(item) {
        let /** @type {?} */ dynClass = isPresent(this.bodyClassFn)
            ? this.bodyClassFn.apply(this.dt.context, [this, item]) : '';
        if (isPresent(this.bodyStyleClass)) {
            dynClass += ' ' + this.bodyStyleClass;
        }
        else if (isPresent(this.styleClass)) {
            dynClass += ' ' + this.styleClass;
        }
        return dynClass;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isRowSelectable(item) {
        if (isPresent(this.dt.isRowSelectable)) {
            return this.dt.isRowSelectable(item);
        }
        return false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isCellSelectable(item) {
        return this.dt.selectionMode === 'cell' && this.isRowSelectable(item) && this.selectable;
    }
    /**
     * @return {?}
     */
    isHeaderSelectable() {
        return this.dt.selectionMode === 'cell' && this.selectable;
    }
    /**
     * @return {?}
     */
    getSortOrder() {
        let /** @type {?} */ order = 0;
        if (isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key) {
            order = this.dt.sortColumn.sortOrder;
        }
        return order;
    }
    /**
     * @return {?}
     */
    isSorted() {
        if (!this.sortable) {
            return false;
        }
        return isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key;
    }
    /**
     * @param {?} table
     * @return {?}
     */
    initialize(table) {
        this.dt = table;
        if (isPresent(this.dt.initialSortKey) && this.dt.initialSortKey === this.key) {
            this.sortable = true;
            this.sortOrder = this.dt.sortOrderingForString(this.dt.initialSortOrder);
            this.dt.sortColumn = this;
        }
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
        this.maxWidthPx = this.widthToPx(this.maxWidth);
        this.minWidthPx = this.widthToPx(this.minWidth);
        this.widthPx = this.widthToPx(this.width);
    }
    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     * @param {?} myIndex
     * @return {?}
     */
    postInitialize(myIndex) {
        const /** @type {?} */ colIndex = myIndex + 1;
        let /** @type {?} */ table;
        if (this.dt.hasFrozenColumns()) {
            table = (/** @type {?} */ (this.dt)).el
                .nativeElement.querySelector('.dt-body-frozen table');
        }
        else {
            table = (/** @type {?} */ (this.dt)).el.nativeElement.querySelector('table');
        }
        if (this.widestCell > 0) {
            let /** @type {?} */ all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
                'tr td:nth-child(' + colIndex + ')').forEach((node) => {
                node.style.width = this.widestCell + 'px';
            });
        }
    }
    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     * @return {?}
     */
    isValueColumn() {
        return (isPresent(this.isDataColumn) && BooleanWrapper.isTrue(this.isDataColumn)) ||
            isPresent(this.key);
    }
    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     * @param {?} cell
     * @param {?} level
     * @return {?}
     */
    indentForControl(cell, level) {
        if (this.dt.isOutline() && level > 0 && cell.offsetWidth > 0
            && isPresent(cell.nextElementSibling)) {
            let /** @type {?} */ outlineNodePadding = parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;
            // 1st level is pushed as root
            if (this.dt.pushRootSectionOnNewLine) {
                return (level === 1) ? null : (this.dt.indentationPerLevel * level)
                    - outlineNodePadding;
            }
            else {
                return (this.dt.indentationPerLevel * level) + outlineNodePadding;
            }
        }
        return null;
    }
    /**
     *
     * Internal
     * @param {?} width
     * @return {?}
     */
    widthToPx(width) {
        let /** @type {?} */ px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                const /** @type {?} */ nonPc = parseFloat(width) / 100;
                px = nonPc * (/** @type {?} */ (this.dt)).el.nativeElement.offsetWidth;
            }
            else {
                px = parseFloat(width);
            }
        }
        return px;
    }
}
DTColumn2Component.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-column2',
                template: `<!--
    To make it more readable Each Column type has its own rendering template instead of putting
    all this into datatable as this is more responsibility of the column. And the main goal
    was try to be modular as possible. When There will be different types of columns

    - Regular DTColumn (current implementation),
    - SelectionColumn (Single/Multi select) - todo,
    - DetailRow column, then pivotal collumn to render row/column/detail attributes - todo.

    When implementing new column type you just inherit this DTColumnComponent and provide your
    own rendering template and DT take care of the rest.

    todo: We have SingleSelect, Multiselect rendering template that is Added programatically
    todo: We have pivotal rendering template


-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data"
             let-columnIndex="columnIndex"
             let-rowIndex="rowIndex">

    <ng-template *ngIf="isHeader" [ngTemplateOutlet]="colHeader"
                 [ngTemplateOutletContext]="{$implicit: isSubHeader, columnIndex:columnIndex, data: dataToRender,
                 rowIndex:rowIndex}">
    </ng-template>

    <ng-template *ngIf="!isHeader" [ngTemplateOutlet]="colBody"
                 [ngTemplateOutletContext]="{$implicit: column, data:dataToRender,rowIndex:rowIndex}">
    </ng-template>
</ng-template>


<!--
    Templates for header columns. Here we are rendering two types. Header and Subheader that we
    usually use here as some kind of summary columns. Not really having summary at the bottom like other
    DT.

    TH column and their text are usually unselectable and most of these were inherited from
    original PrimeNg DT even not many things got left after we refactor this but the idea is the
    same.

    Each cell has its dt-cell-def class that sets default styling like font, background, alignment
    padding, etcs..


-->
<ng-template #colHeader let-isSubHeader let-columnIndex="columnIndex" let-data="data" let-rowIndex="rowIndex">

    <th #headerCell1 [class]="headerStyleClass||styleClass" *ngIf="!isSubHeader"
        (click)="handleHeaderClick($event, headerCell1)"
        [ngClass]="{'dt-is-default dt-u-unselectable-text' :true,
                    'dt-cell-def': dt.selectionMode !== 'cell' || (!dt.isOutline() || !dt.pivotalLayout),
                    'dt-u-sortable': sortable,
                    'dt-is-active': isSorted(),
                    'dt-is-hidden': !isVisible}"
        [attr.width]="width"
        [attr.align]="align"
        [attr.tabindex]="sortable ? 1 : null"
        [dtMaxWidth]="maxWidthPx"
    >

        <ng-template [ngIf]="dt.headerFilterTemplate && columnIndex === 0 ">
            <ng-container *ngTemplateOutlet="dt.headerFilterTemplate">
            </ng-container>
        </ng-template>
        <!--
            when cell are selectable we need two version where one wrap the cell content in div
        -->
        <ng-template [ngIf]="isHeaderSelectable()">
            <ng-container *ngTemplateOutlet="selectableHeaderCell; context: {$implicit: this}">
            </ng-container>
        </ng-template>


        <ng-template [ngIf]="!isHeaderSelectable()">
            <ng-container *ngTemplateOutlet="nonSelectableHeaderCell; context: {$implicit: this}">
            </ng-container>
        </ng-template>
    </th>

    <th #headerCell2 [class]="headerStyleClass||styleClass" *ngIf="isSubHeader"
        [attr.width]="width"
        [attr.align]="align"
        [ngClass]="{'dt-is-default dt-cell-def dt-sub-header dt-u-unselectable-text':true}"
        [dtMaxWidth]="maxWidthPx">

        <span class="dt-col-title" *ngIf="dt.showSubHeader && subHeaderTemplate">
            <ng-container *ngTemplateOutlet="subHeaderTemplate;
                    context: {$implicit: this, rowData: data, rowIndex: rowIndex}">
            </ng-container>
        </span>
    </th>
</ng-template>


<!--
    Template for the body = the TD. For the body and we might want to do the same for header we
    allow to have calculated body class that comes from the application. So based on the data types
    you might want to apply different class in order to apply custom styling.
-->
<ng-template #colBody let-data="data" let-rowIndex="rowIndex">

    <td #cell [class]="dynamicBodyClass(data)"
        (click)="dt.onCellSelectionChange(cell, this, data)"
        [attr.width]="width"
        [attr.align]="align"
        [ngClass]="{ 'dt-is-default': true,
        'dt-cell-def': !isCellSelectable(data),
        'dt-is-hidden': !isVisible}"
        [dtMaxWidth]="maxWidthPx"
        >

        <!--
            Since we need to support cell selection when we need to draw border around it
            We are wrapping such sells with div which gives us better flexibility
        -->
        <ng-template [ngIf]="isCellSelectable(data)">
            <ng-container *ngTemplateOutlet="selectableBodyCell;
                        context: {$implicit: this, data: data, rowIndex: rowIndex }">
            </ng-container>

        </ng-template>


        <ng-template [ngIf]="!isCellSelectable(data)">
            <ng-container *ngTemplateOutlet="nonSelectableBodyCell;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
            </ng-container>
        </ng-template>

    </td>
</ng-template>

<!--
    Todo: create better solution instead of using different template create directive that wraps
    it with the div conditionally
-->
<ng-template #selectableHeaderCell let-data="data" let-rowIndex="rowIndex">

    <div class="dt-cell-def-selectable"
         [ngClass]="{'dt-cell-selected': dt.isHeaderSelected(this)}">
        <ng-container *ngTemplateOutlet="headerCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
        </ng-container>
    </div>
</ng-template>


<ng-template #nonSelectableHeaderCell let-data="data" let-rowIndex="rowIndex">
    <ng-container *ngTemplateOutlet="headerCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
    </ng-container>
</ng-template>


<ng-template #headerCellContent let-data="data" let-rowIndex="rowIndex">
    <span class="dt-col-title" *ngIf="showColumnLabel && !headerTemplate">
                {{label}}
    </span>

    <span class="dt-col-title" *ngIf="showColumnLabel && headerTemplate">
                    <ng-container *ngTemplateOutlet="headerTemplate;
                        context: {$implicit: this, rowData: data, rowIndex: rowIndex }">
                    </ng-container>
    </span>

    <span class="dt-col-sortable-icon sap-icon icon-sort" *ngIf="sortable"
          [ngClass]="{'icon-sort-descending': (getSortOrder() == -1),
                           'icon-sort-ascending': (getSortOrder() == 1)}">
    </span>
</ng-template>


<ng-template #selectableBodyCell let-data="data" let-rowIndex="rowIndex">
    <div class="dt-cell-def-selectable"
         [ngClass]="{'dt-cell-selected': dt.isBodyCellSelected(this, data)}">
        <ng-container *ngTemplateOutlet="bodyCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
        </ng-container>
    </div>
</ng-template>


<ng-template #nonSelectableBodyCell let-data="data" let-rowIndex="rowIndex">
    <ng-container *ngTemplateOutlet="bodyCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
    </ng-container>
</ng-template>


<ng-template #bodyCellContent let-data="data" let-rowIndex="rowIndex">
    <!--
           when no template is used use our FieldPath to access the object value based on the
           key binding
        -->
    <span class="dt-col-cell-data" *ngIf="!bodyTemplate">
            {{dt.getValue(data, key)}}
        </span>


    <!--
        In case application wants to provide their own cell component they use
        #body ng-template to do so.
    -->
    <span class="dt-col-cell-data" *ngIf="bodyTemplate">
            <ng-container *ngTemplateOutlet="bodyTemplate;
            context: {$implicit: this, rowData: data, rowIndex: rowIndex}"></ng-container>
        </span>
</ng-template>
`,
                styles: [`.dt-sortable-col{cursor:pointer}.dt-col-sortable-icon{display:inline-block;margin-left:.125em}th.dt-cell-def{font-weight:400;color:#4a4a4a}th.dt-is-default{background-color:#f2f2f2;white-space:nowrap}th.dt-is-default.dt-cell-def:not(.dt-sub-header){border-bottom-color:#f2f2f2}th.dt-sub-header{background-color:#fff}th .dt-cell-selected{border-color:#58b957}td .dt-cell-selected{border-left-color:#4f9fcf}.dt-root-section .dt-selection-column,.dt-selection-column{width:46px;padding:0 12px}.dt-pivot-layout td.dt-selection-column,th.dt-selection-column{border-right-color:transparent}thead tr:first-child th{border-top-color:transparent}tbody tr:last-child:not(.dt-drag-row-bottom) td{border-bottom-color:transparent}td:first-child,th:first-child{border-left-color:transparent}td:last-child,th:last-child{border-right-color:transparent}tbody .dt-drag-row-top>td{background:linear-gradient(0deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-bottom>td{background:linear-gradient(180deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-both>td{background:linear-gradient(0deg,#0271d2 0,#fff 3%,#fff 97%,#0271d2 100%)}tbody .dt-row-dragging>td{background-color:#ececec;color:#b9b9b9}tbody .dt-row-dragging .ui-state-active{opacity:.5;cursor:not-allowed}`],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTColumn2Component.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
DTColumn2Component.propDecorators = {
    label: [{ type: Input }],
    key: [{ type: Input }],
    align: [{ type: Input }],
    bodyClassFn: [{ type: Input }],
    isVisible: [{ type: Input }],
    sortable: [{ type: Input }],
    sortOrdering: [{ type: Input }],
    showColumnLabel: [{ type: Input }],
    showSubHeader: [{ type: Input }],
    headerStyleClass: [{ type: Input }],
    bodyStyleClass: [{ type: Input }],
    selectable: [{ type: Input }],
    useGlobalHeader: [{ type: Input }],
    useGlobalSubHeader: [{ type: Input }],
    useGlobalBody: [{ type: Input }],
    isDataColumn: [{ type: Input }],
    frozen: [{ type: Input }],
    maxWidth: [{ type: Input }],
    minWidth: [{ type: Input }],
    rendererTemplate: [{ type: ViewChild, args: ['renderingTemplate',] }],
    headerTemplate: [{ type: ContentChild, args: ['header',] }],
    subHeaderTemplate: [{ type: ContentChild, args: ['subHeader',] }],
    bodyTemplate: [{ type: ContentChild, args: ['body',] }]
};
function DTColumn2Component_tsickle_Closure_declarations() {
    /**
     * Column header label.
     *
     * Or you can use headerTemplate to define your own template
     * @type {?}
     */
    DTColumn2Component.prototype.label;
    /**
     * What field name to read from the given object
     * @type {?}
     */
    DTColumn2Component.prototype.key;
    /**
     *
     * Cell alignment. It inserts regular align attribute to the table cell
     *
     * @type {?}
     */
    DTColumn2Component.prototype.align;
    /**
     * Retrieves dynamic class based on data and then its added to the table cell TD
     * @type {?}
     */
    DTColumn2Component.prototype.bodyClassFn;
    /**
     *
     * If false applies dt-is-hidden style that hides the column
     *
     * @type {?}
     */
    DTColumn2Component.prototype.isVisible;
    /**
     * Marks column as sortable which means sorting icon is added to the header with special
     * sorting handling
     * @type {?}
     */
    DTColumn2Component.prototype.sortable;
    /**
     * Sorting direction
     *
     * @type {?}
     */
    DTColumn2Component.prototype.sortOrdering;
    /**
     * Tells the template if whether to render a label
     *
     * @type {?}
     */
    DTColumn2Component.prototype.showColumnLabel;
    /**
     *
     * See AWDataTable
     *
     * @type {?}
     */
    DTColumn2Component.prototype.showSubHeader;
    /**
     * Default static class that is added to the TH into the header. It does not rely on data
     *
     * @type {?}
     */
    DTColumn2Component.prototype.headerStyleClass;
    /**
     * Default static class that is added to the td into the body. It does not rely on data
     *
     * @type {?}
     */
    DTColumn2Component.prototype.bodyStyleClass;
    /**
     *
     * Used together with cell selectionMode to tell which column is selectable
     *
     * @type {?}
     */
    DTColumn2Component.prototype.selectable;
    /**
     * Use globally defined HEADER template for current column
     *
     * @type {?}
     */
    DTColumn2Component.prototype.useGlobalHeader;
    /**
     * Use globally defined SubHeader template for current column
     *
     * @type {?}
     */
    DTColumn2Component.prototype.useGlobalSubHeader;
    /**
     * Use globally defined body template
     *
     * @type {?}
     */
    DTColumn2Component.prototype.useGlobalBody;
    /**
     * Tells if the column is data column  - if it is rendering data or just a label or some
     * control
     *
     * This is important when calculating a column span and we need to know which columns are or
     * will be just for selection controls and which holds data
     * @type {?}
     */
    DTColumn2Component.prototype.isDataColumn;
    /**
     * Identifies column that will not scroll horizontally with other columns. Column is
     * frozen.
     *
     * For such columns that are marked as frozen binding [width] is required.
     *
     * @type {?}
     */
    DTColumn2Component.prototype.frozen;
    /**
     * Sets the Max Width for the TD. Even TD does not support we calculate the content width
     * for each cell and then decide if we need to enlarge the column.
     *
     * \@Experimantal binding that is currently working if the content of the cell is inline
     * element where we can control whitespace wrapping in order to find out the real width
     * @type {?}
     */
    DTColumn2Component.prototype.maxWidth;
    /**
     * Sets the minWidth on the cell. Again just like maxWidth css properly is not supported on
     * the table so there is a workaround where we create additional row that sets padding right
     * and this will prevent the column to collapse under specified width
     *
     * todo: still TBD
     * @type {?}
     */
    DTColumn2Component.prototype.minWidth;
    /**
     * Main rendering template used by datatable to render each column.
     * @type {?}
     */
    DTColumn2Component.prototype.rendererTemplate;
    /**
     * Custom header template. It will override provided label
     * @type {?}
     */
    DTColumn2Component.prototype.headerTemplate;
    /**
     * Custom subHeader template.
     * @type {?}
     */
    DTColumn2Component.prototype.subHeaderTemplate;
    /**
     * Custom body template that will override read value from the [key] binding
     * @type {?}
     */
    DTColumn2Component.prototype.bodyTemplate;
    /**
     * Internal...
     * @type {?}
     */
    DTColumn2Component.prototype.sortOrder;
    /** @type {?} */
    DTColumn2Component.prototype.maxWidthPx;
    /** @type {?} */
    DTColumn2Component.prototype.minWidthPx;
    /** @type {?} */
    DTColumn2Component.prototype.widthPx;
    /** @type {?} */
    DTColumn2Component.prototype.widestCell;
    /**
     * Reference to Datatable Implementations
     * @type {?}
     */
    DTColumn2Component.prototype.dt;
    /** @type {?} */
    DTColumn2Component.prototype.env;
    /** @type {?} */
    DTColumn2Component.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBRUgsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMlAzQyxNQUFNLHlCQUEwQixTQUFRLGFBQWE7Ozs7O0lBa01qRCxZQUFtQixHQUFnQixFQUNoQjtRQUVmLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUhJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZUFBVSxHQUFWLFVBQVU7Ozs7OztxQkE3S1AsTUFBTTs7Ozs7O3lCQWVQLElBQUk7Ozs7OzRCQWNGLFlBQVk7Ozs7OytCQU9SLElBQUk7Ozs7Ozs2QkFRTixLQUFLOzs7Ozs7MEJBdUJSLEtBQUs7Ozs7OytCQU9BLElBQUk7Ozs7O2tDQU9ELElBQUk7Ozs7OzZCQU9ULElBQUk7Ozs7Ozs7OzRCQVdMLElBQUk7Ozs7Ozs7O3NCQVVWLEtBQUs7MEJBb0RGLENBQUM7MEJBQ0QsQ0FBQzt1QkFDSixDQUFDOzBCQUNFLENBQUM7S0FZckI7Ozs7SUFHRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa05iO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHN1Q0FBc3VDLENBQUM7Z0JBQ2h2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO2FBRTFCOzs7O1lBNVB1QixXQUFXO1lBRTNCLFVBQVU7OztvQkFrUWIsS0FBSztrQkFNTCxLQUFLO29CQVFMLEtBQUs7MEJBT0wsS0FBSzt3QkFRTCxLQUFLO3VCQU9MLEtBQUs7MkJBT0wsS0FBSzs4QkFPTCxLQUFLOzRCQVFMLEtBQUs7K0JBUUwsS0FBSzs2QkFPTCxLQUFLO3lCQVFMLEtBQUs7OEJBT0wsS0FBSztpQ0FPTCxLQUFLOzRCQU9MLEtBQUs7MkJBV0wsS0FBSztxQkFVTCxLQUFLO3VCQVVMLEtBQUs7dUJBV0wsS0FBSzsrQkFNTCxTQUFTLFNBQUMsbUJBQW1COzZCQU03QixZQUFZLFNBQUMsUUFBUTtnQ0FNckIsWUFBWSxTQUFDLFdBQVc7MkJBTXhCLFlBQVksU0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FXRGF0YVRhYmxlfSBmcm9tICcuLi9hdy1kYXRhdGFibGUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jvb2xlYW5XcmFwcGVyLCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cblxuZXhwb3J0IHR5cGUgRFRIQWxpZ25tZW50ID0gJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnO1xuXG5cbi8qKlxuICogRFRDb2x1bW4gcmVwcmVzZW50IHNpbmdsZSBjb2x1bW4gaW5jbHVkaW5nIGhlYWRlciBhbmQgaXRzIGJvZHkuIEVhY2ggY29sdW1uIGhhcyBpdHMgb3duXG4gKiByZW5kZXJlclRlbXBsYXRlIHdoaWNoIGEgZW50cnkgdG8gdGhpcyBjb21wb25lbnQuXG4gKlxuICogS2VlcGluZyB0aGlzIHNlcGFyYXRlIGZyb20gdGhlIGRhdGF0YWJsZSB3aGVyZSBEVCBpcyBub3QgcmVhbGx5IGF3YXJlIHdoYXQgaXQgaXMgcmVuZGVyaW5nLFxuICogaXQgYWxsb3dzIHVzIG1vcmUgZmxleGliaWxpdHkgaW4gdGVybXMgb2YgZGlmZmVyZW50IHR5cGUgb2YgY29sdW1uIGluaGVyaXRpbmcgZnJvbSB0aGlzXG4gKiBvbmUuLiBTdWNoIGFzOlxuICogIERUUm93RGV0YWlsICBjb2x1bW5cbiAqICBEVFNpbmdsZVNlbGVjdGlvbiBjb2x1bW5cbiAqICBEVE11bHRpU2VsZWN0aW9uIGNvbHVtblxuICpcbiAqIFRoaXMgd2F5IHdlIGRvbid0IGRvIElGL1RIRU4vRUxTRSBpbnNpZGUgdGhlIGRhdGF0YWJsZSBhbmQgdHJ5aW5nIHRvIGNyZWF0ZSBkaWZmZXJlbnQgY2FzZXMuXG4gKlxuICogIFRoZW4gbGF0ZXIgb24gdGhpcyB3aWxsIGxldCB1cyBjcmVhdGUgYWRkaXRpb25hbCBsb2dpYyBmb3IgdGhlIHBpdm90YWwgbGF5b3V0LiBCZWNhdXNlIERUXG4gKiAgZG9lcyBrbm93IGFueXRoaW5nIGFib3V0IHRoZSB0eXBlIG9mIHRoZSBjb2x1bW4gc28gd2hhdGV2ZXIgaXMgYWRkZWQgdG8gdGhlIERULmNvbHVtbnMgaXRcbiAqICB3aWxsIGJlIHJlbmRlcmVkLlxuICpcbiAqXG4gKiAgQ29sdW1ucyBjYW4gYmUgYWxzbyBmcm96ZW4gbWVhbmluZyBpZiB0aGUgY29udGVudCBvdmVyZmxvd3MgdGhleSBkb250IHNjcm9sbC4gVG8gbWFrZSB0aGVcbiAqICBjb2x1bW4gZnJvemVuIHdlIG5lZWQgdG8gdXNlIFtmcm96ZW5dIGJpbmRpbmcgYW5kIHNlIGl0IHRvIFRSVUUgcGx1cyBpdCByZXF1aXJlcyBhIFt3aWR0aF1cbiAqICBiaW5kaW5nIHRvIGJlIHNldCAoaW4gcHgpLlxuICogIFdlIG5lZWQgdGhpcyB0byBiZSBhYmxlIHRvIHByb3Blcmx5IHBvc2l0aW9uIHRoZSBzZWNvbmQgdGFibGUgd2hpY2ggaXMgY2hhbmdlZCB0byBhYnNvbHV0ZVxuICogIHBvc2l0aW9uaW5nLlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LWNvbHVtbjInLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFRvIG1ha2UgaXQgbW9yZSByZWFkYWJsZSBFYWNoIENvbHVtbiB0eXBlIGhhcyBpdHMgb3duIHJlbmRlcmluZyB0ZW1wbGF0ZSBpbnN0ZWFkIG9mIHB1dHRpbmdcbiAgICBhbGwgdGhpcyBpbnRvIGRhdGF0YWJsZSBhcyB0aGlzIGlzIG1vcmUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGNvbHVtbi4gQW5kIHRoZSBtYWluIGdvYWxcbiAgICB3YXMgdHJ5IHRvIGJlIG1vZHVsYXIgYXMgcG9zc2libGUuIFdoZW4gVGhlcmUgd2lsbCBiZSBkaWZmZXJlbnQgdHlwZXMgb2YgY29sdW1uc1xuXG4gICAgLSBSZWd1bGFyIERUQ29sdW1uIChjdXJyZW50IGltcGxlbWVudGF0aW9uKSxcbiAgICAtIFNlbGVjdGlvbkNvbHVtbiAoU2luZ2xlL011bHRpIHNlbGVjdCkgLSB0b2RvLFxuICAgIC0gRGV0YWlsUm93IGNvbHVtbiwgdGhlbiBwaXZvdGFsIGNvbGx1bW4gdG8gcmVuZGVyIHJvdy9jb2x1bW4vZGV0YWlsIGF0dHJpYnV0ZXMgLSB0b2RvLlxuXG4gICAgV2hlbiBpbXBsZW1lbnRpbmcgbmV3IGNvbHVtbiB0eXBlIHlvdSBqdXN0IGluaGVyaXQgdGhpcyBEVENvbHVtbkNvbXBvbmVudCBhbmQgcHJvdmlkZSB5b3VyXG4gICAgb3duIHJlbmRlcmluZyB0ZW1wbGF0ZSBhbmQgRFQgdGFrZSBjYXJlIG9mIHRoZSByZXN0LlxuXG4gICAgdG9kbzogV2UgaGF2ZSBTaW5nbGVTZWxlY3QsIE11bHRpc2VsZWN0IHJlbmRlcmluZyB0ZW1wbGF0ZSB0aGF0IGlzIEFkZGVkIHByb2dyYW1hdGljYWxseVxuICAgIHRvZG86IFdlIGhhdmUgcGl2b3RhbCByZW5kZXJpbmcgdGVtcGxhdGVcblxuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjcmVuZGVyaW5nVGVtcGxhdGUgbGV0LWlzSGVhZGVyIGxldC1pc1N1YkhlYWRlcj1cImlzU3ViSGVhZGVyXCIgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICAgICAgICAgbGV0LWRhdGFUb1JlbmRlcj1cImRhdGFcIlxuICAgICAgICAgICAgIGxldC1jb2x1bW5JbmRleD1cImNvbHVtbkluZGV4XCJcbiAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xIZWFkZXJcIlxuICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogaXNTdWJIZWFkZXIsIGNvbHVtbkluZGV4OmNvbHVtbkluZGV4LCBkYXRhOiBkYXRhVG9SZW5kZXIsXG4gICAgICAgICAgICAgICAgIHJvd0luZGV4OnJvd0luZGV4fVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCIhaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xCb2R5XCJcbiAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGNvbHVtbiwgZGF0YTpkYXRhVG9SZW5kZXIscm93SW5kZXg6cm93SW5kZXh9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFRlbXBsYXRlcyBmb3IgaGVhZGVyIGNvbHVtbnMuIEhlcmUgd2UgYXJlIHJlbmRlcmluZyB0d28gdHlwZXMuIEhlYWRlciBhbmQgU3ViaGVhZGVyIHRoYXQgd2VcbiAgICB1c3VhbGx5IHVzZSBoZXJlIGFzIHNvbWUga2luZCBvZiBzdW1tYXJ5IGNvbHVtbnMuIE5vdCByZWFsbHkgaGF2aW5nIHN1bW1hcnkgYXQgdGhlIGJvdHRvbSBsaWtlIG90aGVyXG4gICAgRFQuXG5cbiAgICBUSCBjb2x1bW4gYW5kIHRoZWlyIHRleHQgYXJlIHVzdWFsbHkgdW5zZWxlY3RhYmxlIGFuZCBtb3N0IG9mIHRoZXNlIHdlcmUgaW5oZXJpdGVkIGZyb21cbiAgICBvcmlnaW5hbCBQcmltZU5nIERUIGV2ZW4gbm90IG1hbnkgdGhpbmdzIGdvdCBsZWZ0IGFmdGVyIHdlIHJlZmFjdG9yIHRoaXMgYnV0IHRoZSBpZGVhIGlzIHRoZVxuICAgIHNhbWUuXG5cbiAgICBFYWNoIGNlbGwgaGFzIGl0cyBkdC1jZWxsLWRlZiBjbGFzcyB0aGF0IHNldHMgZGVmYXVsdCBzdHlsaW5nIGxpa2UgZm9udCwgYmFja2dyb3VuZCwgYWxpZ25tZW50XG4gICAgcGFkZGluZywgZXRjcy4uXG5cblxuLS0+XG48bmctdGVtcGxhdGUgI2NvbEhlYWRlciBsZXQtaXNTdWJIZWFkZXIgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIiBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPHRoICNoZWFkZXJDZWxsMSBbY2xhc3NdPVwiaGVhZGVyU3R5bGVDbGFzc3x8c3R5bGVDbGFzc1wiICpuZ0lmPVwiIWlzU3ViSGVhZGVyXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUhlYWRlckNsaWNrKCRldmVudCwgaGVhZGVyQ2VsbDEpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydkdC1pcy1kZWZhdWx0IGR0LXUtdW5zZWxlY3RhYmxlLXRleHQnIDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnZHQtY2VsbC1kZWYnOiBkdC5zZWxlY3Rpb25Nb2RlICE9PSAnY2VsbCcgfHwgKCFkdC5pc091dGxpbmUoKSB8fCAhZHQucGl2b3RhbExheW91dCksXG4gICAgICAgICAgICAgICAgICAgICdkdC11LXNvcnRhYmxlJzogc29ydGFibGUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1pcy1hY3RpdmUnOiBpc1NvcnRlZCgpLFxuICAgICAgICAgICAgICAgICAgICAnZHQtaXMtaGlkZGVuJzogIWlzVmlzaWJsZX1cIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmFsaWduXT1cImFsaWduXCJcbiAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwic29ydGFibGUgPyAxIDogbnVsbFwiXG4gICAgICAgIFtkdE1heFdpZHRoXT1cIm1heFdpZHRoUHhcIlxuICAgID5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZHQuaGVhZGVyRmlsdGVyVGVtcGxhdGUgJiYgY29sdW1uSW5kZXggPT09IDAgXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuaGVhZGVyRmlsdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8IS0tXG4gICAgICAgICAgICB3aGVuIGNlbGwgYXJlIHNlbGVjdGFibGUgd2UgbmVlZCB0d28gdmVyc2lvbiB3aGVyZSBvbmUgd3JhcCB0aGUgY2VsbCBjb250ZW50IGluIGRpdlxuICAgICAgICAtLT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzSGVhZGVyU2VsZWN0YWJsZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0YWJsZUhlYWRlckNlbGw7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXN9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaXNIZWFkZXJTZWxlY3RhYmxlKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub25TZWxlY3RhYmxlSGVhZGVyQ2VsbDsgY29udGV4dDogeyRpbXBsaWNpdDogdGhpc31cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvdGg+XG5cbiAgICA8dGggI2hlYWRlckNlbGwyIFtjbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzfHxzdHlsZUNsYXNzXCIgKm5nSWY9XCJpc1N1YkhlYWRlclwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgW2F0dHIuYWxpZ25dPVwiYWxpZ25cIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtY2VsbC1kZWYgZHQtc3ViLWhlYWRlciBkdC11LXVuc2VsZWN0YWJsZS10ZXh0Jzp0cnVlfVwiXG4gICAgICAgIFtkdE1heFdpZHRoXT1cIm1heFdpZHRoUHhcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC10aXRsZVwiICpuZ0lmPVwiZHQuc2hvd1N1YkhlYWRlciAmJiBzdWJIZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInN1YkhlYWRlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCByb3dEYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvdGg+XG48L25nLXRlbXBsYXRlPlxuXG5cbjwhLS1cbiAgICBUZW1wbGF0ZSBmb3IgdGhlIGJvZHkgPSB0aGUgVEQuIEZvciB0aGUgYm9keSBhbmQgd2UgbWlnaHQgd2FudCB0byBkbyB0aGUgc2FtZSBmb3IgaGVhZGVyIHdlXG4gICAgYWxsb3cgdG8gaGF2ZSBjYWxjdWxhdGVkIGJvZHkgY2xhc3MgdGhhdCBjb21lcyBmcm9tIHRoZSBhcHBsaWNhdGlvbi4gU28gYmFzZWQgb24gdGhlIGRhdGEgdHlwZXNcbiAgICB5b3UgbWlnaHQgd2FudCB0byBhcHBseSBkaWZmZXJlbnQgY2xhc3MgaW4gb3JkZXIgdG8gYXBwbHkgY3VzdG9tIHN0eWxpbmcuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjY29sQm9keSBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPHRkICNjZWxsIFtjbGFzc109XCJkeW5hbWljQm9keUNsYXNzKGRhdGEpXCJcbiAgICAgICAgKGNsaWNrKT1cImR0Lm9uQ2VsbFNlbGVjdGlvbkNoYW5nZShjZWxsLCB0aGlzLCBkYXRhKVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgW2F0dHIuYWxpZ25dPVwiYWxpZ25cIlxuICAgICAgICBbbmdDbGFzc109XCJ7ICdkdC1pcy1kZWZhdWx0JzogdHJ1ZSxcbiAgICAgICAgJ2R0LWNlbGwtZGVmJzogIWlzQ2VsbFNlbGVjdGFibGUoZGF0YSksXG4gICAgICAgICdkdC1pcy1oaWRkZW4nOiAhaXNWaXNpYmxlfVwiXG4gICAgICAgIFtkdE1heFdpZHRoXT1cIm1heFdpZHRoUHhcIlxuICAgICAgICA+XG5cbiAgICAgICAgPCEtLVxuICAgICAgICAgICAgU2luY2Ugd2UgbmVlZCB0byBzdXBwb3J0IGNlbGwgc2VsZWN0aW9uIHdoZW4gd2UgbmVlZCB0byBkcmF3IGJvcmRlciBhcm91bmQgaXRcbiAgICAgICAgICAgIFdlIGFyZSB3cmFwcGluZyBzdWNoIHNlbGxzIHdpdGggZGl2IHdoaWNoIGdpdmVzIHVzIGJldHRlciBmbGV4aWJpbGl0eVxuICAgICAgICAtLT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzQ2VsbFNlbGVjdGFibGUoZGF0YSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RhYmxlQm9keUNlbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXggfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaXNDZWxsU2VsZWN0YWJsZShkYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vblNlbGVjdGFibGVCb2R5Q2VsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPC90ZD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBUb2RvOiBjcmVhdGUgYmV0dGVyIHNvbHV0aW9uIGluc3RlYWQgb2YgdXNpbmcgZGlmZmVyZW50IHRlbXBsYXRlIGNyZWF0ZSBkaXJlY3RpdmUgdGhhdCB3cmFwc1xuICAgIGl0IHdpdGggdGhlIGRpdiBjb25kaXRpb25hbGx5XG4tLT5cbjxuZy10ZW1wbGF0ZSAjc2VsZWN0YWJsZUhlYWRlckNlbGwgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJkdC1jZWxsLWRlZi1zZWxlY3RhYmxlXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsnZHQtY2VsbC1zZWxlY3RlZCc6IGR0LmlzSGVhZGVyU2VsZWN0ZWQodGhpcyl9XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjbm9uU2VsZWN0YWJsZUhlYWRlckNlbGwgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyQ2VsbENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjaGVhZGVyQ2VsbENvbnRlbnQgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC10aXRsZVwiICpuZ0lmPVwic2hvd0NvbHVtbkxhYmVsICYmICFoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt7bGFiZWx9fVxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXRpdGxlXCIgKm5nSWY9XCJzaG93Q29sdW1uTGFiZWwgJiYgaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgcm93RGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4IH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtc29ydGFibGUtaWNvbiBzYXAtaWNvbiBpY29uLXNvcnRcIiAqbmdJZj1cInNvcnRhYmxlXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J2ljb24tc29ydC1kZXNjZW5kaW5nJzogKGdldFNvcnRPcmRlcigpID09IC0xKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdpY29uLXNvcnQtYXNjZW5kaW5nJzogKGdldFNvcnRPcmRlcigpID09IDEpfVwiPlxuICAgIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNzZWxlY3RhYmxlQm9keUNlbGwgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtY2VsbC1kZWYtc2VsZWN0YWJsZVwiXG4gICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWNlbGwtc2VsZWN0ZWQnOiBkdC5pc0JvZHlDZWxsU2VsZWN0ZWQodGhpcywgZGF0YSl9XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5Q2VsbENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI25vblNlbGVjdGFibGVCb2R5Q2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5Q2VsbENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjYm9keUNlbGxDb250ZW50IGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPCEtLVxuICAgICAgICAgICB3aGVuIG5vIHRlbXBsYXRlIGlzIHVzZWQgdXNlIG91ciBGaWVsZFBhdGggdG8gYWNjZXNzIHRoZSBvYmplY3QgdmFsdWUgYmFzZWQgb24gdGhlXG4gICAgICAgICAgIGtleSBiaW5kaW5nXG4gICAgICAgIC0tPlxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLWNlbGwtZGF0YVwiICpuZ0lmPVwiIWJvZHlUZW1wbGF0ZVwiPlxuICAgICAgICAgICAge3tkdC5nZXRWYWx1ZShkYXRhLCBrZXkpfX1cbiAgICAgICAgPC9zcGFuPlxuXG5cbiAgICA8IS0tXG4gICAgICAgIEluIGNhc2UgYXBwbGljYXRpb24gd2FudHMgdG8gcHJvdmlkZSB0aGVpciBvd24gY2VsbCBjb21wb25lbnQgdGhleSB1c2VcbiAgICAgICAgI2JvZHkgbmctdGVtcGxhdGUgdG8gZG8gc28uXG4gICAgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtY2VsbC1kYXRhXCIgKm5nSWY9XCJib2R5VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5VGVtcGxhdGU7XG4gICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCByb3dEYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICAgIHN0eWxlczogW2AuZHQtc29ydGFibGUtY29se2N1cnNvcjpwb2ludGVyfS5kdC1jb2wtc29ydGFibGUtaWNvbntkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tbGVmdDouMTI1ZW19dGguZHQtY2VsbC1kZWZ7Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOiM0YTRhNGF9dGguZHQtaXMtZGVmYXVsdHtiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjI7d2hpdGUtc3BhY2U6bm93cmFwfXRoLmR0LWlzLWRlZmF1bHQuZHQtY2VsbC1kZWY6bm90KC5kdC1zdWItaGVhZGVyKXtib3JkZXItYm90dG9tLWNvbG9yOiNmMmYyZjJ9dGguZHQtc3ViLWhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9dGggLmR0LWNlbGwtc2VsZWN0ZWR7Ym9yZGVyLWNvbG9yOiM1OGI5NTd9dGQgLmR0LWNlbGwtc2VsZWN0ZWR7Ym9yZGVyLWxlZnQtY29sb3I6IzRmOWZjZn0uZHQtcm9vdC1zZWN0aW9uIC5kdC1zZWxlY3Rpb24tY29sdW1uLC5kdC1zZWxlY3Rpb24tY29sdW1ue3dpZHRoOjQ2cHg7cGFkZGluZzowIDEycHh9LmR0LXBpdm90LWxheW91dCB0ZC5kdC1zZWxlY3Rpb24tY29sdW1uLHRoLmR0LXNlbGVjdGlvbi1jb2x1bW57Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fXRoZWFkIHRyOmZpcnN0LWNoaWxkIHRoe2JvcmRlci10b3AtY29sb3I6dHJhbnNwYXJlbnR9dGJvZHkgdHI6bGFzdC1jaGlsZDpub3QoLmR0LWRyYWctcm93LWJvdHRvbSkgdGR7Ym9yZGVyLWJvdHRvbS1jb2xvcjp0cmFuc3BhcmVudH10ZDpmaXJzdC1jaGlsZCx0aDpmaXJzdC1jaGlsZHtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudH10ZDpsYXN0LWNoaWxkLHRoOmxhc3QtY2hpbGR7Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fXRib2R5IC5kdC1kcmFnLXJvdy10b3A+dGR7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMGRlZywjZmZmIDAsI2ZmZiA5NyUsIzAyNzFkMiAxMDAlKX10Ym9keSAuZHQtZHJhZy1yb3ctYm90dG9tPnRke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywjZmZmIDAsI2ZmZiA5NyUsIzAyNzFkMiAxMDAlKX10Ym9keSAuZHQtZHJhZy1yb3ctYm90aD50ZHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgwZGVnLCMwMjcxZDIgMCwjZmZmIDMlLCNmZmYgOTclLCMwMjcxZDIgMTAwJSl9dGJvZHkgLmR0LXJvdy1kcmFnZ2luZz50ZHtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWM7Y29sb3I6I2I5YjliOX10Ym9keSAuZHQtcm93LWRyYWdnaW5nIC51aS1zdGF0ZS1hY3RpdmV7b3BhY2l0eTouNTtjdXJzb3I6bm90LWFsbG93ZWR9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxuXG59KVxuZXhwb3J0IGNsYXNzIERUQ29sdW1uMkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0XG57XG4gICAgLyoqXG4gICAgICogQ29sdW1uIGhlYWRlciBsYWJlbC5cbiAgICAgKlxuICAgICAqIE9yIHlvdSBjYW4gdXNlIGhlYWRlclRlbXBsYXRlIHRvIGRlZmluZSB5b3VyIG93biB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoYXQgZmllbGQgbmFtZSB0byByZWFkIGZyb20gdGhlIGdpdmVuIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAga2V5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENlbGwgYWxpZ25tZW50LiBJdCBpbnNlcnRzIHJlZ3VsYXIgYWxpZ24gYXR0cmlidXRlIHRvIHRoZSB0YWJsZSBjZWxsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFsaWduOiBEVEhBbGlnbm1lbnQgPSAnbGVmdCc7XG5cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBkeW5hbWljIGNsYXNzIGJhc2VkIG9uIGRhdGEgYW5kIHRoZW4gaXRzIGFkZGVkIHRvIHRoZSB0YWJsZSBjZWxsIFREXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5Q2xhc3NGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWYgZmFsc2UgYXBwbGllcyBkdC1pcy1oaWRkZW4gc3R5bGUgdGhhdCBoaWRlcyB0aGUgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyBjb2x1bW4gYXMgc29ydGFibGUgd2hpY2ggbWVhbnMgc29ydGluZyBpY29uIGlzIGFkZGVkIHRvIHRoZSBoZWFkZXIgd2l0aCBzcGVjaWFsXG4gICAgICogc29ydGluZyBoYW5kbGluZ1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc29ydGFibGU6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFNvcnRpbmcgZGlyZWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNvcnRPcmRlcmluZzogc3RyaW5nID0gJ2Rlc2NlbmRpbmcnO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIHRlbXBsYXRlIGlmIHdoZXRoZXIgdG8gcmVuZGVyIGEgbGFiZWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0NvbHVtbkxhYmVsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTdWJIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdGF0aWMgY2xhc3MgdGhhdCBpcyBhZGRlZCB0byB0aGUgVEggaW50byB0aGUgaGVhZGVyLiBJdCBkb2VzIG5vdCByZWx5IG9uIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdGF0aWMgY2xhc3MgdGhhdCBpcyBhZGRlZCB0byB0aGUgdGQgaW50byB0aGUgYm9keS4gSXQgZG9lcyBub3QgcmVseSBvbiBkYXRhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgdG9nZXRoZXIgd2l0aCBjZWxsIHNlbGVjdGlvbk1vZGUgdG8gdGVsbCB3aGljaCBjb2x1bW4gaXMgc2VsZWN0YWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBIRUFERVIgdGVtcGxhdGUgZm9yIGN1cnJlbnQgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbEhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBTdWJIZWFkZXIgdGVtcGxhdGUgZm9yIGN1cnJlbnQgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbFN1YkhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBib2R5IHRlbXBsYXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbEJvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGUgY29sdW1uIGlzIGRhdGEgY29sdW1uICAtIGlmIGl0IGlzIHJlbmRlcmluZyBkYXRhIG9yIGp1c3QgYSBsYWJlbCBvciBzb21lXG4gICAgICogY29udHJvbFxuICAgICAqXG4gICAgICogVGhpcyBpcyBpbXBvcnRhbnQgd2hlbiBjYWxjdWxhdGluZyBhIGNvbHVtbiBzcGFuIGFuZCB3ZSBuZWVkIHRvIGtub3cgd2hpY2ggY29sdW1ucyBhcmUgb3JcbiAgICAgKiB3aWxsIGJlIGp1c3QgZm9yIHNlbGVjdGlvbiBjb250cm9scyBhbmQgd2hpY2ggaG9sZHMgZGF0YVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNEYXRhQ29sdW1uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgY29sdW1uIHRoYXQgd2lsbCBub3Qgc2Nyb2xsIGhvcml6b250YWxseSB3aXRoIG90aGVyIGNvbHVtbnMuIENvbHVtbiBpc1xuICAgICAqIGZyb3plbi5cbiAgICAgKlxuICAgICAqIEZvciBzdWNoIGNvbHVtbnMgdGhhdCBhcmUgbWFya2VkIGFzIGZyb3plbiBiaW5kaW5nIFt3aWR0aF0gaXMgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZyb3plbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgTWF4IFdpZHRoIGZvciB0aGUgVEQuIEV2ZW4gVEQgZG9lcyBub3Qgc3VwcG9ydCB3ZSBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgd2lkdGhcbiAgICAgKiBmb3IgZWFjaCBjZWxsIGFuZCB0aGVuIGRlY2lkZSBpZiB3ZSBuZWVkIHRvIGVubGFyZ2UgdGhlIGNvbHVtbi5cbiAgICAgKlxuICAgICAqIEBFeHBlcmltYW50YWwgYmluZGluZyB0aGF0IGlzIGN1cnJlbnRseSB3b3JraW5nIGlmIHRoZSBjb250ZW50IG9mIHRoZSBjZWxsIGlzIGlubGluZVxuICAgICAqIGVsZW1lbnQgd2hlcmUgd2UgY2FuIGNvbnRyb2wgd2hpdGVzcGFjZSB3cmFwcGluZyBpbiBvcmRlciB0byBmaW5kIG91dCB0aGUgcmVhbCB3aWR0aFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4V2lkdGg6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWluV2lkdGggb24gdGhlIGNlbGwuIEFnYWluIGp1c3QgbGlrZSBtYXhXaWR0aCBjc3MgcHJvcGVybHkgaXMgbm90IHN1cHBvcnRlZCBvblxuICAgICAqIHRoZSB0YWJsZSBzbyB0aGVyZSBpcyBhIHdvcmthcm91bmQgd2hlcmUgd2UgY3JlYXRlIGFkZGl0aW9uYWwgcm93IHRoYXQgc2V0cyBwYWRkaW5nIHJpZ2h0XG4gICAgICogYW5kIHRoaXMgd2lsbCBwcmV2ZW50IHRoZSBjb2x1bW4gdG8gY29sbGFwc2UgdW5kZXIgc3BlY2lmaWVkIHdpZHRoXG4gICAgICpcbiAgICAgKiB0b2RvOiBzdGlsbCBUQkRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1pbldpZHRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBNYWluIHJlbmRlcmluZyB0ZW1wbGF0ZSB1c2VkIGJ5IGRhdGF0YWJsZSB0byByZW5kZXIgZWFjaCBjb2x1bW4uXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgncmVuZGVyaW5nVGVtcGxhdGUnKVxuICAgIHJlbmRlcmVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gaGVhZGVyIHRlbXBsYXRlLiBJdCB3aWxsIG92ZXJyaWRlIHByb3ZpZGVkIGxhYmVsXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyJylcbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBzdWJIZWFkZXIgdGVtcGxhdGUuXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnc3ViSGVhZGVyJylcbiAgICBzdWJIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBib2R5IHRlbXBsYXRlIHRoYXQgd2lsbCBvdmVycmlkZSByZWFkIHZhbHVlIGZyb20gdGhlIFtrZXldIGJpbmRpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdib2R5JylcbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLi4uXG4gICAgICovXG4gICAgc29ydE9yZGVyOiBudW1iZXI7XG4gICAgbWF4V2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICBtaW5XaWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIHdpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgd2lkZXN0Q2VsbDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBEYXRhdGFibGUgSW1wbGVtZW50YXRpb25zXG4gICAgICovXG4gICAgZHQ6IEFXRGF0YVRhYmxlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMua2V5KSAmJiBpc0JsYW5rKHRoaXMubGFiZWwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYmluZGluZzogJyArXG4gICAgICAgICAgICAgICAgJ1trZXldIG9yIFtsYWJlbF0gYmluZGluZ3MgbXVzdCBiZSB1c2VkIGF0IG1pbmltdW0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRvIGJlIGFibGUgdG8gcG9zaXRpb24gc2Vjb25kIERUIHdlIHJlcXVpcmUgW3dpZHRoXSB0byBiZSBzZXQgYXMgd2VsbFxuICAgICAgICBpZiAodGhpcy5mcm96ZW4gJiYgaXNCbGFuayh0aGlzLndpZHRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGJpbmRpbmcgW3dpZHRoXTogJyArXG4gICAgICAgICAgICAgICAgJ3doZW4gW2Zyb3plbl09dHJ1ZSB0aGVuIFt3aWR0aF0gYmluZGluZyBuZWVkcyB0byBiZSBzcGVjaWZpZWQuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkXG4gICAge1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIG5lZWQgdG8gZGVmZmVyIHRoaXMgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBvdGhlcndpc2UgSSBnZXRcbiAgICAgICAgLy8gdmFsdWUgd2FzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQgZXJyb3JcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PlxuICAgICAgICAvLyB7XG5cbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGNlbGwgc2VsZWN0aW9uTW9kZSBpcyBlbmFibGVkIHRoaXMgbWV0aG9kIGlzIHRyaWdnZXJlZCB3aGVuIHdlIGNsaWNrIG9uIGhlYWRlci5cbiAgICAgKiBJdCBkZWxlZ2F0ZXMgdGhlIGNhbGwgdG8gdGhlIERUIHdoZXJlIGl0IHRvZ2dsZXMgY3VycmVudGx5IHNlbGVjdGVkIHZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYW5kbGVIZWFkZXJDbGljayhldmVudDogYW55LCBlbGVtZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc0hlYWRlclNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5vbkhlYWRlclNlbGVjdGlvbkNoYW5nZShlbGVtZW50LCB0aGlzKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc29ydGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRvZG86IEltcGxlbWVudCBvdXIgb3duIHNvcnRpbmcgbWVjaGFuaXNtIG9uY2Ugd2UgZXh0cmFjdCB0aGUgc29ydGluZyBsb2dpYyB0byBpdHMgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0KGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtdS1zb3J0YWJsZScpIHx8XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3ModGFyZ2V0Tm9kZSwgJ2R0LWNvbC10aXRsZScpIHx8XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3ModGFyZ2V0Tm9kZSwgJ2R0LWNvbC1zb3J0YWJsZS1pY29uJykpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMuZHQuc29ydENvbHVtbi5rZXkgPT09IHRoaXMua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLnNvcnRPcmRlciAqIC0xO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyaW5nID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JOdW1iZXIodGhpcy5zb3J0T3JkZXIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuc29ydENvbHVtbiA9IHRoaXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5zb3J0S2V5ID0gdGhpcy5rZXk7XG4gICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUuc29ydE9yZGVyID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5zb3J0T3JkZXJpbmcpO1xuXG4gICAgICAgICAgICB0aGlzLmR0LnNvcnRTaW5nbGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmR0LnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZWQgc3R5bGUgY2xhc3MgYmFzZWQgb24gZGF0YVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBkeW5hbWljQm9keUNsYXNzKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBkeW5DbGFzcyA9IGlzUHJlc2VudCh0aGlzLmJvZHlDbGFzc0ZuKVxuICAgICAgICAgICAgPyB0aGlzLmJvZHlDbGFzc0ZuLmFwcGx5KHRoaXMuZHQuY29udGV4dCwgW3RoaXMsIGl0ZW1dKSA6ICcnO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ib2R5U3R5bGVDbGFzcykpIHtcbiAgICAgICAgICAgIGR5bkNsYXNzICs9ICcgJyArIHRoaXMuYm9keVN0eWxlQ2xhc3M7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5zdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgZHluQ2xhc3MgKz0gJyAnICsgdGhpcy5zdHlsZUNsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR5bkNsYXNzO1xuICAgIH1cblxuXG4gICAgaXNSb3dTZWxlY3RhYmxlKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5pc1Jvd1NlbGVjdGFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kdC5pc1Jvd1NlbGVjdGFibGUoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNDZWxsU2VsZWN0YWJsZShpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnY2VsbCcgJiYgdGhpcy5pc1Jvd1NlbGVjdGFibGUoaXRlbSkgJiYgdGhpcy5zZWxlY3RhYmxlO1xuXG4gICAgfVxuXG5cbiAgICBpc0hlYWRlclNlbGVjdGFibGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ2NlbGwnICYmIHRoaXMuc2VsZWN0YWJsZTtcblxuICAgIH1cblxuXG4gICAgZ2V0U29ydE9yZGVyKClcbiAgICB7XG4gICAgICAgIGxldCBvcmRlciA9IDA7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMua2V5ID09PSB0aGlzLmR0LnNvcnRDb2x1bW4ua2V5KSB7XG4gICAgICAgICAgICBvcmRlciA9IHRoaXMuZHQuc29ydENvbHVtbi5zb3J0T3JkZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIGlzU29ydGVkKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5kdC5zb3J0Q29sdW1uKSAmJiB0aGlzLmtleSA9PT0gdGhpcy5kdC5zb3J0Q29sdW1uLmtleTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKHRhYmxlOiBBV0RhdGFUYWJsZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZHQgPSB0YWJsZTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuaW5pdGlhbFNvcnRLZXkpICYmIHRoaXMuZHQuaW5pdGlhbFNvcnRLZXkgPT09IHRoaXMua2V5KSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5kdC5pbml0aWFsU29ydE9yZGVyKTtcbiAgICAgICAgICAgIHRoaXMuZHQuc29ydENvbHVtbiA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmJvZHlUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlUZW1wbGF0ZSA9IHRoaXMuZHQuYm9keVRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5oZWFkZXJUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSB0aGlzLmR0LmhlYWRlclRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdWJIZWFkZXJUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxTdWJIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViSGVhZGVyVGVtcGxhdGUgPSB0aGlzLmR0LnN1YkhlYWRlclRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5ib2R5Q2xhc3NGbikpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzRm4gPSB0aGlzLmR0LmJvZHlDbGFzc0ZuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXhXaWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy5tYXhXaWR0aCk7XG4gICAgICAgIHRoaXMubWluV2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMubWluV2lkdGgpO1xuICAgICAgICB0aGlzLndpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLndpZHRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGUgdmlldyBpbml0IGN5Y2xlIGZyb20gdGhlIGR0Lm5nQWZ0ZXJWaWV3Q2hlY2tlZC5cbiAgICAgKlxuICAgICAqIEluIGNhc2Ugd2UgdXNlIE1heFdpZHRoIGRpcmVjdGl2ZSB3ZSBzZXQgbmV3IHdpZHRoIG9uY2UgZm9yIGFsbCBjb2x1bXNuXG4gICAgICovXG4gICAgcG9zdEluaXRpYWxpemUobXlJbmRleDogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBteUluZGV4ICsgMTtcbiAgICAgICAgbGV0IHRhYmxlO1xuXG4gICAgICAgIGlmICh0aGlzLmR0Lmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgdGFibGUgPSAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWxcbiAgICAgICAgICAgICAgICAubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtYm9keS1mcm96ZW4gdGFibGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhYmxlID0gKDxEYXRhdGFibGUyQ29tcG9uZW50PnRoaXMuZHQpLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMud2lkZXN0Q2VsbCA+IDApIHtcbiAgICAgICAgICAgIGxldCBhbGwgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0ciB0aDpudGgtY2hpbGQoJyArIGNvbEluZGV4ICsgJyksICcgK1xuICAgICAgICAgICAgICAgICd0ciB0ZDpudGgtY2hpbGQoJyArIGNvbEluZGV4ICsgJyknKS5mb3JFYWNoKChub2RlOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHRoaXMud2lkZXN0Q2VsbCArICdweCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogWW91IGVpdGhlciB1c2UgdGhpcyBiaW5kaW5nIGRpcmVjdGx5IGFuZCBzYXkgaXRzIGRhdGFjb2x1bW4gb3Igd2hlbiB0aGVyZSBpcyBhIFtrZXldXG4gICAgICogYmlkaW5nIHdlIGtub3cgaXQgcmVmZXJzIHRvIHNvbWUgZmllbGQuXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1ZhbHVlQ29sdW1uKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuaXNEYXRhQ29sdW1uKSAmJiBCb29sZWFuV3JhcHBlci5pc1RydWUodGhpcy5pc0RhdGFDb2x1bW4pKSB8fFxuICAgICAgICAgICAgaXNQcmVzZW50KHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGFyZSBpbiBvdXRsaW5lIG1vZGUgIHdlIG5lZWQgdG8gYWxzbyBpbmRlbmQgZWFjaCBzZWxlY3Rpb24gY29udHJvbCBhY2NvcmRpbmdseS5cbiAgICAgKlxuICAgICAqIGluZGVudCAtIDEgPiBvbmx5IG9mZnNldCB3aXRoXG4gICAgICogaW5kZW50XG4gICAgICovXG4gICAgaW5kZW50Rm9yQ29udHJvbChjZWxsOiBhbnksIGxldmVsOiBudW1iZXIpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmR0LmlzT3V0bGluZSgpICYmIGxldmVsID4gMCAmJiBjZWxsLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgJiYgaXNQcmVzZW50KGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nKSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBsZXQgb3V0bGluZU5vZGVQYWRkaW5nID1cbiAgICAgICAgICAgICAgICBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nKS5wYWRkaW5nTGVmdCkgfHwgMDtcblxuICAgICAgICAgICAgLy8gMXN0IGxldmVsIGlzIHB1c2hlZCBhcyByb290XG4gICAgICAgICAgICBpZiAodGhpcy5kdC5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGxldmVsID09PSAxKSA/IG51bGwgOiAodGhpcy5kdC5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpXG4gICAgICAgICAgICAgICAgICAgIC0gb3V0bGluZU5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuZHQuaW5kZW50YXRpb25QZXJMZXZlbCAqIGxldmVsKSArIG91dGxpbmVOb2RlUGFkZGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW50ZXJuYWxcbiAgICAgKi9cbiAgICBwcml2YXRlIHdpZHRoVG9QeCh3aWR0aDogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgcHg7XG4gICAgICAgIGlmIChpc1ByZXNlbnQod2lkdGgpKSB7XG4gICAgICAgICAgICBpZiAod2lkdGguaW5kZXhPZignJScpID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vblBjID0gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgcHggPSBub25QYyAqICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBweCA9IHBhcnNlRmxvYXQod2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHB4O1xuICAgIH1cbn1cblxuIl19