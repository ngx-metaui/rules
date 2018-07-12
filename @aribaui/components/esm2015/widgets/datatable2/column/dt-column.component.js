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
        [maxWidth]="maxWidthPx"
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
        [maxWidth]="maxWidthPx">

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
        [maxWidth]="maxWidthPx">

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBRUgsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMFAzQyxNQUFNLHlCQUEwQixTQUFRLGFBQWE7Ozs7O0lBaU1qRCxZQUFtQixHQUFnQixFQUNoQjtRQUNmLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZUFBVSxHQUFWLFVBQVU7Ozs7OztxQkE3S1AsTUFBTTs7Ozs7O3lCQWVQLElBQUk7Ozs7OzRCQWNGLFlBQVk7Ozs7OytCQU9SLElBQUk7Ozs7Ozs2QkFRTixLQUFLOzs7Ozs7MEJBdUJSLEtBQUs7Ozs7OytCQU9BLElBQUk7Ozs7O2tDQU9ELElBQUk7Ozs7OzZCQU9ULElBQUk7Ozs7Ozs7OzRCQVdMLElBQUk7Ozs7Ozs7O3NCQVVWLEtBQUs7MEJBb0RGLENBQUM7MEJBQ0QsQ0FBQzt1QkFDSixDQUFDOzBCQUNFLENBQUM7S0FXckI7Ozs7SUFHRCxRQUFRO1FBQ0osS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUs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RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpTmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsc3VDQUFzdUMsQ0FBQztnQkFDaHZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFFMUI7Ozs7WUEzUHVCLFdBQVc7WUFFM0IsVUFBVTs7O29CQWdRYixLQUFLO2tCQU1MLEtBQUs7b0JBUUwsS0FBSzswQkFPTCxLQUFLO3dCQVFMLEtBQUs7dUJBT0wsS0FBSzsyQkFPTCxLQUFLOzhCQU9MLEtBQUs7NEJBUUwsS0FBSzsrQkFRTCxLQUFLOzZCQU9MLEtBQUs7eUJBUUwsS0FBSzs4QkFPTCxLQUFLO2lDQU9MLEtBQUs7NEJBT0wsS0FBSzsyQkFXTCxLQUFLO3FCQVVMLEtBQUs7dUJBVUwsS0FBSzt1QkFXTCxLQUFLOytCQU1MLFNBQVMsU0FBQyxtQkFBbUI7NkJBTTdCLFlBQVksU0FBQyxRQUFRO2dDQU1yQixZQUFZLFNBQUMsV0FBVzsyQkFNeEIsWUFBWSxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uL2F3LWRhdGF0YWJsZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuXG5leHBvcnQgdHlwZSBEVEhBbGlnbm1lbnQgPSAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCc7XG5cblxuLyoqXG4gKiBEVENvbHVtbiByZXByZXNlbnQgc2luZ2xlIGNvbHVtbiBpbmNsdWRpbmcgaGVhZGVyIGFuZCBpdHMgYm9keS4gRWFjaCBjb2x1bW4gaGFzIGl0cyBvd25cbiAqIHJlbmRlcmVyVGVtcGxhdGUgd2hpY2ggYSBlbnRyeSB0byB0aGlzIGNvbXBvbmVudC5cbiAqXG4gKiBLZWVwaW5nIHRoaXMgc2VwYXJhdGUgZnJvbSB0aGUgZGF0YXRhYmxlIHdoZXJlIERUIGlzIG5vdCByZWFsbHkgYXdhcmUgd2hhdCBpdCBpcyByZW5kZXJpbmcsXG4gKiBpdCBhbGxvd3MgdXMgbW9yZSBmbGV4aWJpbGl0eSBpbiB0ZXJtcyBvZiBkaWZmZXJlbnQgdHlwZSBvZiBjb2x1bW4gaW5oZXJpdGluZyBmcm9tIHRoaXNcbiAqIG9uZS4uIFN1Y2ggYXM6XG4gKiAgRFRSb3dEZXRhaWwgIGNvbHVtblxuICogIERUU2luZ2xlU2VsZWN0aW9uIGNvbHVtblxuICogIERUTXVsdGlTZWxlY3Rpb24gY29sdW1uXG4gKlxuICogVGhpcyB3YXkgd2UgZG9uJ3QgZG8gSUYvVEhFTi9FTFNFIGluc2lkZSB0aGUgZGF0YXRhYmxlIGFuZCB0cnlpbmcgdG8gY3JlYXRlIGRpZmZlcmVudCBjYXNlcy5cbiAqXG4gKiAgVGhlbiBsYXRlciBvbiB0aGlzIHdpbGwgbGV0IHVzIGNyZWF0ZSBhZGRpdGlvbmFsIGxvZ2ljIGZvciB0aGUgcGl2b3RhbCBsYXlvdXQuIEJlY2F1c2UgRFRcbiAqICBkb2VzIGtub3cgYW55dGhpbmcgYWJvdXQgdGhlIHR5cGUgb2YgdGhlIGNvbHVtbiBzbyB3aGF0ZXZlciBpcyBhZGRlZCB0byB0aGUgRFQuY29sdW1ucyBpdFxuICogIHdpbGwgYmUgcmVuZGVyZWQuXG4gKlxuICpcbiAqICBDb2x1bW5zIGNhbiBiZSBhbHNvIGZyb3plbiBtZWFuaW5nIGlmIHRoZSBjb250ZW50IG92ZXJmbG93cyB0aGV5IGRvbnQgc2Nyb2xsLiBUbyBtYWtlIHRoZVxuICogIGNvbHVtbiBmcm96ZW4gd2UgbmVlZCB0byB1c2UgW2Zyb3plbl0gYmluZGluZyBhbmQgc2UgaXQgdG8gVFJVRSBwbHVzIGl0IHJlcXVpcmVzIGEgW3dpZHRoXVxuICogIGJpbmRpbmcgdG8gYmUgc2V0IChpbiBweCkuXG4gKiAgV2UgbmVlZCB0aGlzIHRvIGJlIGFibGUgdG8gcHJvcGVybHkgcG9zaXRpb24gdGhlIHNlY29uZCB0YWJsZSB3aGljaCBpcyBjaGFuZ2VkIHRvIGFic29sdXRlXG4gKiAgcG9zaXRpb25pbmcuXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtY29sdW1uMicsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgVG8gbWFrZSBpdCBtb3JlIHJlYWRhYmxlIEVhY2ggQ29sdW1uIHR5cGUgaGFzIGl0cyBvd24gcmVuZGVyaW5nIHRlbXBsYXRlIGluc3RlYWQgb2YgcHV0dGluZ1xuICAgIGFsbCB0aGlzIGludG8gZGF0YXRhYmxlIGFzIHRoaXMgaXMgbW9yZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY29sdW1uLiBBbmQgdGhlIG1haW4gZ29hbFxuICAgIHdhcyB0cnkgdG8gYmUgbW9kdWxhciBhcyBwb3NzaWJsZS4gV2hlbiBUaGVyZSB3aWxsIGJlIGRpZmZlcmVudCB0eXBlcyBvZiBjb2x1bW5zXG5cbiAgICAtIFJlZ3VsYXIgRFRDb2x1bW4gKGN1cnJlbnQgaW1wbGVtZW50YXRpb24pLFxuICAgIC0gU2VsZWN0aW9uQ29sdW1uIChTaW5nbGUvTXVsdGkgc2VsZWN0KSAtIHRvZG8sXG4gICAgLSBEZXRhaWxSb3cgY29sdW1uLCB0aGVuIHBpdm90YWwgY29sbHVtbiB0byByZW5kZXIgcm93L2NvbHVtbi9kZXRhaWwgYXR0cmlidXRlcyAtIHRvZG8uXG5cbiAgICBXaGVuIGltcGxlbWVudGluZyBuZXcgY29sdW1uIHR5cGUgeW91IGp1c3QgaW5oZXJpdCB0aGlzIERUQ29sdW1uQ29tcG9uZW50IGFuZCBwcm92aWRlIHlvdXJcbiAgICBvd24gcmVuZGVyaW5nIHRlbXBsYXRlIGFuZCBEVCB0YWtlIGNhcmUgb2YgdGhlIHJlc3QuXG5cbiAgICB0b2RvOiBXZSBoYXZlIFNpbmdsZVNlbGVjdCwgTXVsdGlzZWxlY3QgcmVuZGVyaW5nIHRlbXBsYXRlIHRoYXQgaXMgQWRkZWQgcHJvZ3JhbWF0aWNhbGx5XG4gICAgdG9kbzogV2UgaGF2ZSBwaXZvdGFsIHJlbmRlcmluZyB0ZW1wbGF0ZVxuXG5cbi0tPlxuPG5nLXRlbXBsYXRlICNyZW5kZXJpbmdUZW1wbGF0ZSBsZXQtaXNIZWFkZXIgbGV0LWlzU3ViSGVhZGVyPVwiaXNTdWJIZWFkZXJcIiBsZXQtY29sdW1uPVwiY29sdW1uXCJcbiAgICAgICAgICAgICBsZXQtZGF0YVRvUmVuZGVyPVwiZGF0YVwiXG4gICAgICAgICAgICAgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIlxuICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJpc0hlYWRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbEhlYWRlclwiXG4gICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBpc1N1YkhlYWRlciwgY29sdW1uSW5kZXg6Y29sdW1uSW5kZXgsIGRhdGE6IGRhdGFUb1JlbmRlcixcbiAgICAgICAgICAgICAgICAgcm93SW5kZXg6cm93SW5kZXh9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIiFpc0hlYWRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbEJvZHlcIlxuICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogY29sdW1uLCBkYXRhOmRhdGFUb1JlbmRlcixyb3dJbmRleDpyb3dJbmRleH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48IS0tXG4gICAgVGVtcGxhdGVzIGZvciBoZWFkZXIgY29sdW1ucy4gSGVyZSB3ZSBhcmUgcmVuZGVyaW5nIHR3byB0eXBlcy4gSGVhZGVyIGFuZCBTdWJoZWFkZXIgdGhhdCB3ZVxuICAgIHVzdWFsbHkgdXNlIGhlcmUgYXMgc29tZSBraW5kIG9mIHN1bW1hcnkgY29sdW1ucy4gTm90IHJlYWxseSBoYXZpbmcgc3VtbWFyeSBhdCB0aGUgYm90dG9tIGxpa2Ugb3RoZXJcbiAgICBEVC5cblxuICAgIFRIIGNvbHVtbiBhbmQgdGhlaXIgdGV4dCBhcmUgdXN1YWxseSB1bnNlbGVjdGFibGUgYW5kIG1vc3Qgb2YgdGhlc2Ugd2VyZSBpbmhlcml0ZWQgZnJvbVxuICAgIG9yaWdpbmFsIFByaW1lTmcgRFQgZXZlbiBub3QgbWFueSB0aGluZ3MgZ290IGxlZnQgYWZ0ZXIgd2UgcmVmYWN0b3IgdGhpcyBidXQgdGhlIGlkZWEgaXMgdGhlXG4gICAgc2FtZS5cblxuICAgIEVhY2ggY2VsbCBoYXMgaXRzIGR0LWNlbGwtZGVmIGNsYXNzIHRoYXQgc2V0cyBkZWZhdWx0IHN0eWxpbmcgbGlrZSBmb250LCBiYWNrZ3JvdW5kLCBhbGlnbm1lbnRcbiAgICBwYWRkaW5nLCBldGNzLi5cblxuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjY29sSGVhZGVyIGxldC1pc1N1YkhlYWRlciBsZXQtY29sdW1uSW5kZXg9XCJjb2x1bW5JbmRleFwiIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8dGggI2hlYWRlckNlbGwxIFtjbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzfHxzdHlsZUNsYXNzXCIgKm5nSWY9XCIhaXNTdWJIZWFkZXJcIlxuICAgICAgICAoY2xpY2spPVwiaGFuZGxlSGVhZGVyQ2xpY2soJGV2ZW50LCBoZWFkZXJDZWxsMSlcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtdS11bnNlbGVjdGFibGUtdGV4dCcgOnRydWUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1jZWxsLWRlZic6IGR0LnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJyB8fCAoIWR0LmlzT3V0bGluZSgpIHx8ICFkdC5waXZvdGFsTGF5b3V0KSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LXUtc29ydGFibGUnOiBzb3J0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWlzLWFjdGl2ZSc6IGlzU29ydGVkKCksXG4gICAgICAgICAgICAgICAgICAgICdkdC1pcy1oaWRkZW4nOiAhaXNWaXNpYmxlfVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgW2F0dHIuYWxpZ25dPVwiYWxpZ25cIlxuICAgICAgICBbYXR0ci50YWJpbmRleF09XCJzb3J0YWJsZSA/IDEgOiBudWxsXCJcbiAgICAgICAgW21heFdpZHRoXT1cIm1heFdpZHRoUHhcIlxuICAgID5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZHQuaGVhZGVyRmlsdGVyVGVtcGxhdGUgJiYgY29sdW1uSW5kZXggPT09IDAgXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuaGVhZGVyRmlsdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8IS0tXG4gICAgICAgICAgICB3aGVuIGNlbGwgYXJlIHNlbGVjdGFibGUgd2UgbmVlZCB0d28gdmVyc2lvbiB3aGVyZSBvbmUgd3JhcCB0aGUgY2VsbCBjb250ZW50IGluIGRpdlxuICAgICAgICAtLT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzSGVhZGVyU2VsZWN0YWJsZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0YWJsZUhlYWRlckNlbGw7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXN9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaXNIZWFkZXJTZWxlY3RhYmxlKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub25TZWxlY3RhYmxlSGVhZGVyQ2VsbDsgY29udGV4dDogeyRpbXBsaWNpdDogdGhpc31cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvdGg+XG5cbiAgICA8dGggI2hlYWRlckNlbGwyIFtjbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzfHxzdHlsZUNsYXNzXCIgKm5nSWY9XCJpc1N1YkhlYWRlclwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgW2F0dHIuYWxpZ25dPVwiYWxpZ25cIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtY2VsbC1kZWYgZHQtc3ViLWhlYWRlciBkdC11LXVuc2VsZWN0YWJsZS10ZXh0Jzp0cnVlfVwiXG4gICAgICAgIFttYXhXaWR0aF09XCJtYXhXaWR0aFB4XCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtdGl0bGVcIiAqbmdJZj1cImR0LnNob3dTdWJIZWFkZXIgJiYgc3ViSGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdWJIZWFkZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgcm93RGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L3RoPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48IS0tXG4gICAgVGVtcGxhdGUgZm9yIHRoZSBib2R5ID0gdGhlIFRELiBGb3IgdGhlIGJvZHkgYW5kIHdlIG1pZ2h0IHdhbnQgdG8gZG8gdGhlIHNhbWUgZm9yIGhlYWRlciB3ZVxuICAgIGFsbG93IHRvIGhhdmUgY2FsY3VsYXRlZCBib2R5IGNsYXNzIHRoYXQgY29tZXMgZnJvbSB0aGUgYXBwbGljYXRpb24uIFNvIGJhc2VkIG9uIHRoZSBkYXRhIHR5cGVzXG4gICAgeW91IG1pZ2h0IHdhbnQgdG8gYXBwbHkgZGlmZmVyZW50IGNsYXNzIGluIG9yZGVyIHRvIGFwcGx5IGN1c3RvbSBzdHlsaW5nLlxuLS0+XG48bmctdGVtcGxhdGUgI2NvbEJvZHkgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cblxuICAgIDx0ZCAjY2VsbCBbY2xhc3NdPVwiZHluYW1pY0JvZHlDbGFzcyhkYXRhKVwiXG4gICAgICAgIChjbGljayk9XCJkdC5vbkNlbGxTZWxlY3Rpb25DaGFuZ2UoY2VsbCwgdGhpcywgZGF0YSlcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmFsaWduXT1cImFsaWduXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnZHQtaXMtZGVmYXVsdCc6IHRydWUsXG4gICAgICAgICdkdC1jZWxsLWRlZic6ICFpc0NlbGxTZWxlY3RhYmxlKGRhdGEpLFxuICAgICAgICAnZHQtaXMtaGlkZGVuJzogIWlzVmlzaWJsZX1cIlxuICAgICAgICBbbWF4V2lkdGhdPVwibWF4V2lkdGhQeFwiPlxuXG4gICAgICAgIDwhLS1cbiAgICAgICAgICAgIFNpbmNlIHdlIG5lZWQgdG8gc3VwcG9ydCBjZWxsIHNlbGVjdGlvbiB3aGVuIHdlIG5lZWQgdG8gZHJhdyBib3JkZXIgYXJvdW5kIGl0XG4gICAgICAgICAgICBXZSBhcmUgd3JhcHBpbmcgc3VjaCBzZWxscyB3aXRoIGRpdiB3aGljaCBnaXZlcyB1cyBiZXR0ZXIgZmxleGliaWxpdHlcbiAgICAgICAgLS0+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc0NlbGxTZWxlY3RhYmxlKGRhdGEpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0YWJsZUJvZHlDZWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4IH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlzQ2VsbFNlbGVjdGFibGUoZGF0YSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub25TZWxlY3RhYmxlQm9keUNlbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwvdGQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tXG4gICAgVG9kbzogY3JlYXRlIGJldHRlciBzb2x1dGlvbiBpbnN0ZWFkIG9mIHVzaW5nIGRpZmZlcmVudCB0ZW1wbGF0ZSBjcmVhdGUgZGlyZWN0aXZlIHRoYXQgd3JhcHNcbiAgICBpdCB3aXRoIHRoZSBkaXYgY29uZGl0aW9uYWxseVxuLS0+XG48bmctdGVtcGxhdGUgI3NlbGVjdGFibGVIZWFkZXJDZWxsIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtY2VsbC1kZWYtc2VsZWN0YWJsZVwiXG4gICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWNlbGwtc2VsZWN0ZWQnOiBkdC5pc0hlYWRlclNlbGVjdGVkKHRoaXMpfVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyQ2VsbENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCBkYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI25vblNlbGVjdGFibGVIZWFkZXJDZWxsIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlckNlbGxDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2hlYWRlckNlbGxDb250ZW50IGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtdGl0bGVcIiAqbmdJZj1cInNob3dDb2x1bW5MYWJlbCAmJiAhaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICB7e2xhYmVsfX1cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC10aXRsZVwiICpuZ0lmPVwic2hvd0NvbHVtbkxhYmVsICYmIGhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleCB9XCI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXNvcnRhYmxlLWljb24gc2FwLWljb24gaWNvbi1zb3J0XCIgKm5nSWY9XCJzb3J0YWJsZVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydpY29uLXNvcnQtZGVzY2VuZGluZyc6IChnZXRTb3J0T3JkZXIoKSA9PSAtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaWNvbi1zb3J0LWFzY2VuZGluZyc6IChnZXRTb3J0T3JkZXIoKSA9PSAxKX1cIj5cbiAgICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjc2VsZWN0YWJsZUJvZHlDZWxsIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPGRpdiBjbGFzcz1cImR0LWNlbGwtZGVmLXNlbGVjdGFibGVcIlxuICAgICAgICAgW25nQ2xhc3NdPVwieydkdC1jZWxsLXNlbGVjdGVkJzogZHQuaXNCb2R5Q2VsbFNlbGVjdGVkKHRoaXMsIGRhdGEpfVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keUNlbGxDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNub25TZWxlY3RhYmxlQm9keUNlbGwgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keUNlbGxDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2JvZHlDZWxsQ29udGVudCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDwhLS1cbiAgICAgICAgICAgd2hlbiBubyB0ZW1wbGF0ZSBpcyB1c2VkIHVzZSBvdXIgRmllbGRQYXRoIHRvIGFjY2VzcyB0aGUgb2JqZWN0IHZhbHVlIGJhc2VkIG9uIHRoZVxuICAgICAgICAgICBrZXkgYmluZGluZ1xuICAgICAgICAtLT5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC1jZWxsLWRhdGFcIiAqbmdJZj1cIiFib2R5VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIHt7ZHQuZ2V0VmFsdWUoZGF0YSwga2V5KX19XG4gICAgICAgIDwvc3Bhbj5cblxuXG4gICAgPCEtLVxuICAgICAgICBJbiBjYXNlIGFwcGxpY2F0aW9uIHdhbnRzIHRvIHByb3ZpZGUgdGhlaXIgb3duIGNlbGwgY29tcG9uZW50IHRoZXkgdXNlXG4gICAgICAgICNib2R5IG5nLXRlbXBsYXRlIHRvIGRvIHNvLlxuICAgIC0tPlxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLWNlbGwtZGF0YVwiICpuZ0lmPVwiYm9keVRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVRlbXBsYXRlO1xuICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgcm93RGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgLmR0LXNvcnRhYmxlLWNvbHtjdXJzb3I6cG9pbnRlcn0uZHQtY29sLXNvcnRhYmxlLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLWxlZnQ6LjEyNWVtfXRoLmR0LWNlbGwtZGVme2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjojNGE0YTRhfXRoLmR0LWlzLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjJmMmYyO3doaXRlLXNwYWNlOm5vd3JhcH10aC5kdC1pcy1kZWZhdWx0LmR0LWNlbGwtZGVmOm5vdCguZHQtc3ViLWhlYWRlcil7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZjJmMmYyfXRoLmR0LXN1Yi1oZWFkZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmfXRoIC5kdC1jZWxsLXNlbGVjdGVke2JvcmRlci1jb2xvcjojNThiOTU3fXRkIC5kdC1jZWxsLXNlbGVjdGVke2JvcmRlci1sZWZ0LWNvbG9yOiM0ZjlmY2Z9LmR0LXJvb3Qtc2VjdGlvbiAuZHQtc2VsZWN0aW9uLWNvbHVtbiwuZHQtc2VsZWN0aW9uLWNvbHVtbnt3aWR0aDo0NnB4O3BhZGRpbmc6MCAxMnB4fS5kdC1waXZvdC1sYXlvdXQgdGQuZHQtc2VsZWN0aW9uLWNvbHVtbix0aC5kdC1zZWxlY3Rpb24tY29sdW1ue2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH10aGVhZCB0cjpmaXJzdC1jaGlsZCB0aHtib3JkZXItdG9wLWNvbG9yOnRyYW5zcGFyZW50fXRib2R5IHRyOmxhc3QtY2hpbGQ6bm90KC5kdC1kcmFnLXJvdy1ib3R0b20pIHRke2JvcmRlci1ib3R0b20tY29sb3I6dHJhbnNwYXJlbnR9dGQ6Zmlyc3QtY2hpbGQsdGg6Zmlyc3QtY2hpbGR7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnR9dGQ6bGFzdC1jaGlsZCx0aDpsYXN0LWNoaWxke2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH10Ym9keSAuZHQtZHJhZy1yb3ctdG9wPnRke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDBkZWcsI2ZmZiAwLCNmZmYgOTclLCMwMjcxZDIgMTAwJSl9dGJvZHkgLmR0LWRyYWctcm93LWJvdHRvbT50ZHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsI2ZmZiAwLCNmZmYgOTclLCMwMjcxZDIgMTAwJSl9dGJvZHkgLmR0LWRyYWctcm93LWJvdGg+dGR7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDI3MWQyIDAsI2ZmZiAzJSwjZmZmIDk3JSwjMDI3MWQyIDEwMCUpfXRib2R5IC5kdC1yb3ctZHJhZ2dpbmc+dGR7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjO2NvbG9yOiNiOWI5Yjl9dGJvZHkgLmR0LXJvdy1kcmFnZ2luZyAudWktc3RhdGUtYWN0aXZle29wYWNpdHk6LjU7Y3Vyc29yOm5vdC1hbGxvd2VkfWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVENvbHVtbjJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogQ29sdW1uIGhlYWRlciBsYWJlbC5cbiAgICAgKlxuICAgICAqIE9yIHlvdSBjYW4gdXNlIGhlYWRlclRlbXBsYXRlIHRvIGRlZmluZSB5b3VyIG93biB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoYXQgZmllbGQgbmFtZSB0byByZWFkIGZyb20gdGhlIGdpdmVuIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAga2V5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENlbGwgYWxpZ25tZW50LiBJdCBpbnNlcnRzIHJlZ3VsYXIgYWxpZ24gYXR0cmlidXRlIHRvIHRoZSB0YWJsZSBjZWxsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFsaWduOiBEVEhBbGlnbm1lbnQgPSAnbGVmdCc7XG5cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBkeW5hbWljIGNsYXNzIGJhc2VkIG9uIGRhdGEgYW5kIHRoZW4gaXRzIGFkZGVkIHRvIHRoZSB0YWJsZSBjZWxsIFREXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5Q2xhc3NGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWYgZmFsc2UgYXBwbGllcyBkdC1pcy1oaWRkZW4gc3R5bGUgdGhhdCBoaWRlcyB0aGUgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyBjb2x1bW4gYXMgc29ydGFibGUgd2hpY2ggbWVhbnMgc29ydGluZyBpY29uIGlzIGFkZGVkIHRvIHRoZSBoZWFkZXIgd2l0aCBzcGVjaWFsXG4gICAgICogc29ydGluZyBoYW5kbGluZ1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc29ydGFibGU6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFNvcnRpbmcgZGlyZWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNvcnRPcmRlcmluZzogc3RyaW5nID0gJ2Rlc2NlbmRpbmcnO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIHRlbXBsYXRlIGlmIHdoZXRoZXIgdG8gcmVuZGVyIGEgbGFiZWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0NvbHVtbkxhYmVsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTdWJIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdGF0aWMgY2xhc3MgdGhhdCBpcyBhZGRlZCB0byB0aGUgVEggaW50byB0aGUgaGVhZGVyLiBJdCBkb2VzIG5vdCByZWx5IG9uIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBzdGF0aWMgY2xhc3MgdGhhdCBpcyBhZGRlZCB0byB0aGUgdGQgaW50byB0aGUgYm9keS4gSXQgZG9lcyBub3QgcmVseSBvbiBkYXRhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgdG9nZXRoZXIgd2l0aCBjZWxsIHNlbGVjdGlvbk1vZGUgdG8gdGVsbCB3aGljaCBjb2x1bW4gaXMgc2VsZWN0YWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBIRUFERVIgdGVtcGxhdGUgZm9yIGN1cnJlbnQgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbEhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBTdWJIZWFkZXIgdGVtcGxhdGUgZm9yIGN1cnJlbnQgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbFN1YkhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZ2xvYmFsbHkgZGVmaW5lZCBib2R5IHRlbXBsYXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUdsb2JhbEJvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGUgY29sdW1uIGlzIGRhdGEgY29sdW1uICAtIGlmIGl0IGlzIHJlbmRlcmluZyBkYXRhIG9yIGp1c3QgYSBsYWJlbCBvciBzb21lXG4gICAgICogY29udHJvbFxuICAgICAqXG4gICAgICogVGhpcyBpcyBpbXBvcnRhbnQgd2hlbiBjYWxjdWxhdGluZyBhIGNvbHVtbiBzcGFuIGFuZCB3ZSBuZWVkIHRvIGtub3cgd2hpY2ggY29sdW1ucyBhcmUgb3JcbiAgICAgKiB3aWxsIGJlIGp1c3QgZm9yIHNlbGVjdGlvbiBjb250cm9scyBhbmQgd2hpY2ggaG9sZHMgZGF0YVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNEYXRhQ29sdW1uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgY29sdW1uIHRoYXQgd2lsbCBub3Qgc2Nyb2xsIGhvcml6b250YWxseSB3aXRoIG90aGVyIGNvbHVtbnMuIENvbHVtbiBpc1xuICAgICAqIGZyb3plbi5cbiAgICAgKlxuICAgICAqIEZvciBzdWNoIGNvbHVtbnMgdGhhdCBhcmUgbWFya2VkIGFzIGZyb3plbiBiaW5kaW5nIFt3aWR0aF0gaXMgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZyb3plbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgTWF4IFdpZHRoIGZvciB0aGUgVEQuIEV2ZW4gVEQgZG9lcyBub3Qgc3VwcG9ydCB3ZSBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgd2lkdGhcbiAgICAgKiBmb3IgZWFjaCBjZWxsIGFuZCB0aGVuIGRlY2lkZSBpZiB3ZSBuZWVkIHRvIGVubGFyZ2UgdGhlIGNvbHVtbi5cbiAgICAgKlxuICAgICAqIEBFeHBlcmltYW50YWwgYmluZGluZyB0aGF0IGlzIGN1cnJlbnRseSB3b3JraW5nIGlmIHRoZSBjb250ZW50IG9mIHRoZSBjZWxsIGlzIGlubGluZVxuICAgICAqIGVsZW1lbnQgd2hlcmUgd2UgY2FuIGNvbnRyb2wgd2hpdGVzcGFjZSB3cmFwcGluZyBpbiBvcmRlciB0byBmaW5kIG91dCB0aGUgcmVhbCB3aWR0aFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4V2lkdGg6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWluV2lkdGggb24gdGhlIGNlbGwuIEFnYWluIGp1c3QgbGlrZSBtYXhXaWR0aCBjc3MgcHJvcGVybHkgaXMgbm90IHN1cHBvcnRlZCBvblxuICAgICAqIHRoZSB0YWJsZSBzbyB0aGVyZSBpcyBhIHdvcmthcm91bmQgd2hlcmUgd2UgY3JlYXRlIGFkZGl0aW9uYWwgcm93IHRoYXQgc2V0cyBwYWRkaW5nIHJpZ2h0XG4gICAgICogYW5kIHRoaXMgd2lsbCBwcmV2ZW50IHRoZSBjb2x1bW4gdG8gY29sbGFwc2UgdW5kZXIgc3BlY2lmaWVkIHdpZHRoXG4gICAgICpcbiAgICAgKiB0b2RvOiBzdGlsbCBUQkRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1pbldpZHRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBNYWluIHJlbmRlcmluZyB0ZW1wbGF0ZSB1c2VkIGJ5IGRhdGF0YWJsZSB0byByZW5kZXIgZWFjaCBjb2x1bW4uXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgncmVuZGVyaW5nVGVtcGxhdGUnKVxuICAgIHJlbmRlcmVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gaGVhZGVyIHRlbXBsYXRlLiBJdCB3aWxsIG92ZXJyaWRlIHByb3ZpZGVkIGxhYmVsXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyJylcbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBzdWJIZWFkZXIgdGVtcGxhdGUuXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnc3ViSGVhZGVyJylcbiAgICBzdWJIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBib2R5IHRlbXBsYXRlIHRoYXQgd2lsbCBvdmVycmlkZSByZWFkIHZhbHVlIGZyb20gdGhlIFtrZXldIGJpbmRpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdib2R5JylcbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLi4uXG4gICAgICovXG4gICAgc29ydE9yZGVyOiBudW1iZXI7XG4gICAgbWF4V2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICBtaW5XaWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIHdpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgd2lkZXN0Q2VsbDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBEYXRhdGFibGUgSW1wbGVtZW50YXRpb25zXG4gICAgICovXG4gICAgZHQ6IEFXRGF0YVRhYmxlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5zb3J0T3JkZXJpbmcpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuYm9keVRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVRlbXBsYXRlID0gdGhpcy5kdC5ib2R5VGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuaGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN1YkhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbFN1YkhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5zdWJIZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuc3ViSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmJvZHlDbGFzc0ZuKSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3NGbiA9IHRoaXMuZHQuYm9keUNsYXNzRm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmtleSkgJiYgaXNCbGFuayh0aGlzLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGJpbmRpbmc6ICcgK1xuICAgICAgICAgICAgICAgICdba2V5XSBvciBbbGFiZWxdIGJpbmRpbmdzIG11c3QgYmUgdXNlZCBhdCBtaW5pbXVtJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUbyBiZSBhYmxlIHRvIHBvc2l0aW9uIHNlY29uZCBEVCB3ZSByZXF1aXJlIFt3aWR0aF0gdG8gYmUgc2V0IGFzIHdlbGxcbiAgICAgICAgaWYgKHRoaXMuZnJvemVuICYmIGlzQmxhbmsodGhpcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBiaW5kaW5nIFt3aWR0aF06ICcgK1xuICAgICAgICAgICAgICAgICd3aGVuIFtmcm96ZW5dPXRydWUgdGhlbiBbd2lkdGhdIGJpbmRpbmcgbmVlZHMgdG8gYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gbmVlZCB0byBkZWZmZXIgdGhpcyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG90aGVyd2lzZSBJIGdldFxuICAgICAgICAvLyB2YWx1ZSB3YXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZCBlcnJvclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWF4V2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMubWF4V2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5taW5XaWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy5taW5XaWR0aCk7XG4gICAgICAgICAgICB0aGlzLndpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLndpZHRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGNlbGwgc2VsZWN0aW9uTW9kZSBpcyBlbmFibGVkIHRoaXMgbWV0aG9kIGlzIHRyaWdnZXJlZCB3aGVuIHdlIGNsaWNrIG9uIGhlYWRlci5cbiAgICAgKiBJdCBkZWxlZ2F0ZXMgdGhlIGNhbGwgdG8gdGhlIERUIHdoZXJlIGl0IHRvZ2dsZXMgY3VycmVudGx5IHNlbGVjdGVkIHZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYW5kbGVIZWFkZXJDbGljayhldmVudDogYW55LCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIZWFkZXJTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25IZWFkZXJTZWxlY3Rpb25DaGFuZ2UoZWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUb2RvOiBJbXBsZW1lbnQgb3VyIG93biBzb3J0aW5nIG1lY2hhbmlzbSBvbmNlIHdlIGV4dHJhY3QgdGhlIHNvcnRpbmcgbG9naWMgdG8gaXRzIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgc29ydChldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHRhcmdldE5vZGUsICdkdC11LXNvcnRhYmxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXRpdGxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXNvcnRhYmxlLWljb24nKSkge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5kdC5zb3J0Q29sdW1uLmtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXJpbmcgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0Zvck51bWJlcih0aGlzLnNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5zb3J0Q29sdW1uID0gdGhpcztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLnNvcnRLZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLnNvcnRPcmRlcmluZyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHQuc29ydFNpbmdsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHQudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBzdHlsZSBjbGFzcyBiYXNlZCBvbiBkYXRhXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGR5bmFtaWNCb2R5Q2xhc3MoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkeW5DbGFzcyA9IGlzUHJlc2VudCh0aGlzLmJvZHlDbGFzc0ZuKVxuICAgICAgICAgICAgPyB0aGlzLmJvZHlDbGFzc0ZuLmFwcGx5KHRoaXMuZHQuY29udGV4dCwgW3RoaXMsIGl0ZW1dKSA6ICcnO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ib2R5U3R5bGVDbGFzcykpIHtcbiAgICAgICAgICAgIGR5bkNsYXNzICs9ICcgJyArIHRoaXMuYm9keVN0eWxlQ2xhc3M7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5zdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgZHluQ2xhc3MgKz0gJyAnICsgdGhpcy5zdHlsZUNsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR5bkNsYXNzO1xuICAgIH1cblxuXG4gICAgaXNSb3dTZWxlY3RhYmxlKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuaXNSb3dTZWxlY3RhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHQuaXNSb3dTZWxlY3RhYmxlKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ2VsbFNlbGVjdGFibGUoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdjZWxsJyAmJiB0aGlzLmlzUm93U2VsZWN0YWJsZShpdGVtKSAmJiB0aGlzLnNlbGVjdGFibGU7XG5cbiAgICB9XG5cblxuICAgIGlzSGVhZGVyU2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ2NlbGwnICYmIHRoaXMuc2VsZWN0YWJsZTtcblxuICAgIH1cblxuXG4gICAgZ2V0U29ydE9yZGVyKCkge1xuICAgICAgICBsZXQgb3JkZXIgPSAwO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5zb3J0Q29sdW1uKSAmJiB0aGlzLmtleSA9PT0gdGhpcy5kdC5zb3J0Q29sdW1uLmtleSkge1xuICAgICAgICAgICAgb3JkZXIgPSB0aGlzLmR0LnNvcnRDb2x1bW4uc29ydE9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9XG5cbiAgICBpc1NvcnRlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMua2V5ID09PSB0aGlzLmR0LnNvcnRDb2x1bW4ua2V5O1xuICAgIH1cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHQgPSB0YWJsZTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuaW5pdGlhbFNvcnRLZXkpICYmIHRoaXMuZHQuaW5pdGlhbFNvcnRLZXkgPT09IHRoaXMua2V5KSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5kdC5pbml0aWFsU29ydE9yZGVyKTtcbiAgICAgICAgICAgIHRoaXMuZHQuc29ydENvbHVtbiA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGUgdmlldyBpbml0IGN5Y2xlIGZyb20gdGhlIGR0Lm5nQWZ0ZXJWaWV3Q2hlY2tlZC5cbiAgICAgKlxuICAgICAqIEluIGNhc2Ugd2UgdXNlIE1heFdpZHRoIGRpcmVjdGl2ZSB3ZSBzZXQgbmV3IHdpZHRoIG9uY2UgZm9yIGFsbCBjb2x1bXNuXG4gICAgICovXG4gICAgcG9zdEluaXRpYWxpemUobXlJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4ID0gbXlJbmRleCArIDE7XG4gICAgICAgIGxldCB0YWJsZTtcblxuICAgICAgICBpZiAodGhpcy5kdC5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIHRhYmxlID0gKDxEYXRhdGFibGUyQ29tcG9uZW50PnRoaXMuZHQpLmVsXG4gICAgICAgICAgICAgICAgLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR0LWJvZHktZnJvemVuIHRhYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWJsZSA9ICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLndpZGVzdENlbGwgPiAwKSB7XG4gICAgICAgICAgICBsZXQgYWxsID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndHIgdGg6bnRoLWNoaWxkKCcgKyBjb2xJbmRleCArICcpLCAnICtcbiAgICAgICAgICAgICAgICAndHIgdGQ6bnRoLWNoaWxkKCcgKyBjb2xJbmRleCArICcpJykuZm9yRWFjaCgobm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHRoaXMud2lkZXN0Q2VsbCArICdweCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogWW91IGVpdGhlciB1c2UgdGhpcyBiaW5kaW5nIGRpcmVjdGx5IGFuZCBzYXkgaXRzIGRhdGFjb2x1bW4gb3Igd2hlbiB0aGVyZSBpcyBhIFtrZXldXG4gICAgICogYmlkaW5nIHdlIGtub3cgaXQgcmVmZXJzIHRvIHNvbWUgZmllbGQuXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1ZhbHVlQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLmlzRGF0YUNvbHVtbikgJiYgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHRoaXMuaXNEYXRhQ29sdW1uKSkgfHxcbiAgICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBhcmUgaW4gb3V0bGluZSBtb2RlICB3ZSBuZWVkIHRvIGFsc28gaW5kZW5kIGVhY2ggc2VsZWN0aW9uIGNvbnRyb2wgYWNjb3JkaW5nbHkuXG4gICAgICpcbiAgICAgKiBpbmRlbnQgLSAxID4gb25seSBvZmZzZXQgd2l0aFxuICAgICAqIGluZGVudFxuICAgICAqL1xuICAgIGluZGVudEZvckNvbnRyb2woY2VsbDogYW55LCBsZXZlbDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuZHQuaXNPdXRsaW5lKCkgJiYgbGV2ZWwgPiAwICYmIGNlbGwub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpKSB7XG5cbiAgICAgICAgICAgIGxldCBvdXRsaW5lTm9kZVBhZGRpbmcgPVxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpLnBhZGRpbmdMZWZ0KSB8fCAwO1xuXG4gICAgICAgICAgICAvLyAxc3QgbGV2ZWwgaXMgcHVzaGVkIGFzIHJvb3RcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobGV2ZWwgPT09IDEpID8gbnVsbCA6ICh0aGlzLmR0LmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbClcbiAgICAgICAgICAgICAgICAgICAgLSBvdXRsaW5lTm9kZVBhZGRpbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5kdC5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpICsgb3V0bGluZU5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbnRlcm5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgd2lkdGhUb1B4KHdpZHRoOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgcHg7XG4gICAgICAgIGlmIChpc1ByZXNlbnQod2lkdGgpKSB7XG4gICAgICAgICAgICBpZiAod2lkdGguaW5kZXhPZignJScpID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vblBjID0gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgcHggPSBub25QYyAqICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBweCA9IHBhcnNlRmxvYXQod2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHB4O1xuICAgIH1cbn1cblxuIl19