/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BooleanWrapper, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
import { DomHandler } from 'primeng/primeng';
/** @typedef {?} */
var DTHAlignment;
export { DTHAlignment };
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
        /** @type {?} */
        let targetNode = event.target;
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
        /** @type {?} */
        let dynClass = isPresent(this.bodyClassFn)
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
        /** @type {?} */
        let order = 0;
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
        /** @type {?} */
        const colIndex = myIndex + 1;
        /** @type {?} */
        let table;
        if (this.dt.hasFrozenColumns()) {
            table = (/** @type {?} */ (this.dt)).el
                .nativeElement.querySelector('.dt-body-frozen table');
        }
        else {
            table = (/** @type {?} */ (this.dt)).el.nativeElement.querySelector('table');
        }
        if (this.widestCell > 0) {
            /** @type {?} */
            let all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
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
            /** @type {?} */
            let outlineNodePadding = parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;
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
        /** @type {?} */
        let px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                /** @type {?} */
                const nonPc = parseFloat(width) / 100;
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
                template: "<!--\n    To make it more readable Each Column type has its own rendering template instead of putting\n    all this into datatable as this is more responsibility of the column. And the main goal\n    was try to be modular as possible. When There will be different types of columns\n\n    - Regular DTColumn (current implementation),\n    - SelectionColumn (Single/Multi select) - todo,\n    - DetailRow column, then pivotal collumn to render row/column/detail attributes - todo.\n\n    When implementing new column type you just inherit this DTColumnComponent and provide your\n    own rendering template and DT take care of the rest.\n\n    todo: We have SingleSelect, Multiselect rendering template that is Added programatically\n    todo: We have pivotal rendering template\n\n\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\"\n             let-columnIndex=\"columnIndex\"\n             let-rowIndex=\"rowIndex\">\n\n    <ng-template *ngIf=\"isHeader\" [ngTemplateOutlet]=\"colHeader\"\n                 [ngTemplateOutletContext]=\"{$implicit: isSubHeader, columnIndex:columnIndex, data: dataToRender,\n                 rowIndex:rowIndex}\">\n    </ng-template>\n\n    <ng-template *ngIf=\"!isHeader\" [ngTemplateOutlet]=\"colBody\"\n                 [ngTemplateOutletContext]=\"{$implicit: column, data:dataToRender,rowIndex:rowIndex}\">\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Templates for header columns. Here we are rendering two types. Header and Subheader that we\n    usually use here as some kind of summary columns. Not really having summary at the bottom like other\n    DT.\n\n    TH column and their text are usually unselectable and most of these were inherited from\n    original PrimeNg DT even not many things got left after we refactor this but the idea is the\n    same.\n\n    Each cell has its dt-cell-def class that sets default styling like font, background, alignment\n    padding, etcs..\n\n\n-->\n<ng-template #colHeader let-isSubHeader let-columnIndex=\"columnIndex\" let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <th #headerCell1 [class]=\"headerStyleClass||styleClass\" *ngIf=\"!isSubHeader\"\n        (click)=\"handleHeaderClick($event, headerCell1)\"\n        [ngClass]=\"{'dt-is-default dt-u-unselectable-text' :true,\n                    'dt-cell-def': dt.selectionMode !== 'cell' || (!dt.isOutline() || !dt.pivotalLayout),\n                    'dt-u-sortable': sortable,\n                    'dt-is-active': isSorted(),\n                    'dt-is-hidden': !isVisible}\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [attr.tabindex]=\"sortable ? 1 : null\"\n        [dtMaxWidth]=\"maxWidthPx\"\n    >\n\n        <ng-template [ngIf]=\"dt.headerFilterTemplate && columnIndex === 0 \">\n            <ng-container *ngTemplateOutlet=\"dt.headerFilterTemplate\">\n            </ng-container>\n        </ng-template>\n        <!--\n            when cell are selectable we need two version where one wrap the cell content in div\n        -->\n        <ng-template [ngIf]=\"isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"selectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n    </th>\n\n    <th #headerCell2 [class]=\"headerStyleClass||styleClass\" *ngIf=\"isSubHeader\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{'dt-is-default dt-cell-def dt-sub-header dt-u-unselectable-text':true}\"\n        [dtMaxWidth]=\"maxWidthPx\">\n\n        <span class=\"dt-col-title\" *ngIf=\"dt.showSubHeader && subHeaderTemplate\">\n            <ng-container *ngTemplateOutlet=\"subHeaderTemplate;\n                    context: {$implicit: this, rowData: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </span>\n    </th>\n</ng-template>\n\n\n<!--\n    Template for the body = the TD. For the body and we might want to do the same for header we\n    allow to have calculated body class that comes from the application. So based on the data types\n    you might want to apply different class in order to apply custom styling.\n-->\n<ng-template #colBody let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <td #cell [class]=\"dynamicBodyClass(data)\"\n        (click)=\"dt.onCellSelectionChange(cell, this, data)\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{ 'dt-is-default': true,\n        'dt-cell-def': !isCellSelectable(data),\n        'dt-is-hidden': !isVisible}\"\n        [dtMaxWidth]=\"maxWidthPx\"\n        >\n\n        <!--\n            Since we need to support cell selection when we need to draw border around it\n            We are wrapping such sells with div which gives us better flexibility\n        -->\n        <ng-template [ngIf]=\"isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"selectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex }\">\n            </ng-container>\n\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </ng-template>\n\n    </td>\n</ng-template>\n\n<!--\n    Todo: create better solution instead of using different template create directive that wraps\n    it with the div conditionally\n-->\n<ng-template #selectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isHeaderSelected(this)}\">\n        <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #headerCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && !headerTemplate\">\n                {{label}}\n    </span>\n\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate;\n                        context: {$implicit: this, rowData: data, rowIndex: rowIndex }\">\n                    </ng-container>\n    </span>\n\n    <span class=\"dt-col-sortable-icon sap-icon icon-sort\" *ngIf=\"sortable\"\n          [ngClass]=\"{'icon-sort-descending': (getSortOrder() == -1),\n                           'icon-sort-ascending': (getSortOrder() == 1)}\">\n    </span>\n</ng-template>\n\n\n<ng-template #selectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isBodyCellSelected(this, data)}\">\n        <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #bodyCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <!--\n           when no template is used use our FieldPath to access the object value based on the\n           key binding\n        -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"!bodyTemplate\">\n            {{dt.getValue(data, key)}}\n        </span>\n\n\n    <!--\n        In case application wants to provide their own cell component they use\n        #body ng-template to do so.\n    -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"bodyTemplate\">\n            <ng-container *ngTemplateOutlet=\"bodyTemplate;\n            context: {$implicit: this, rowData: data, rowIndex: rowIndex}\"></ng-container>\n        </span>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler],
                styles: [".dt-sortable-col{cursor:pointer}.dt-col-sortable-icon{display:inline-block;margin-left:.125em}th.dt-cell-def{font-weight:400;color:#4a4a4a}th.dt-is-default{background-color:#f2f2f2;white-space:nowrap}th.dt-is-default.dt-cell-def:not(.dt-sub-header){border-bottom-color:#f2f2f2}th.dt-sub-header{background-color:#fff}th .dt-cell-selected{border-color:#58b957}td .dt-cell-selected{border-left-color:#4f9fcf}.dt-root-section .dt-selection-column,.dt-selection-column{width:46px;padding:0 12px}.dt-pivot-layout td.dt-selection-column,th.dt-selection-column{border-right-color:transparent}thead tr:first-child th{border-top-color:transparent}tbody tr:last-child:not(.dt-drag-row-bottom) td{border-bottom-color:transparent}td:first-child,th:first-child{border-left-color:transparent}td:last-child,th:last-child{border-right-color:transparent}tbody .dt-drag-row-top>td{background:linear-gradient(0deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-bottom>td{background:linear-gradient(180deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-both>td{background:linear-gradient(0deg,#0271d2 0,#fff 3%,#fff 97%,#0271d2 100%)}tbody .dt-row-dragging>td{background-color:#ececec;color:#b9b9b9}tbody .dt-row-dragging .ui-state-active{opacity:.5;cursor:not-allowed}"]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBRUgsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUMzQyxNQUFNLHlCQUEwQixTQUFRLGFBQWE7Ozs7O0lBa01qRCxZQUFtQixHQUFnQixFQUNoQjtRQUVmLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUhJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZUFBVSxHQUFWLFVBQVU7Ozs7OztxQkE3S1AsTUFBTTs7Ozs7O3lCQWVQLElBQUk7Ozs7OzRCQWNGLFlBQVk7Ozs7OytCQU9SLElBQUk7Ozs7Ozs2QkFRTixLQUFLOzs7Ozs7MEJBdUJSLEtBQUs7Ozs7OytCQU9BLElBQUk7Ozs7O2tDQU9ELElBQUk7Ozs7OzZCQU9ULElBQUk7Ozs7Ozs7OzRCQVdMLElBQUk7Ozs7Ozs7O3NCQVVWLEtBQUs7MEJBb0RGLENBQUM7MEJBQ0QsQ0FBQzt1QkFDSixDQUFDOzBCQUNFLENBQUM7S0FZckI7Ozs7SUFHRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENB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LEtBQUs7b0JBUUwsS0FBSzswQkFPTCxLQUFLO3dCQVFMLEtBQUs7dUJBT0wsS0FBSzsyQkFPTCxLQUFLOzhCQU9MLEtBQUs7NEJBUUwsS0FBSzsrQkFRTCxLQUFLOzZCQU9MLEtBQUs7eUJBUUwsS0FBSzs4QkFPTCxLQUFLO2lDQU9MLEtBQUs7NEJBT0wsS0FBSzsyQkFXTCxLQUFLO3FCQVVMLEtBQUs7dUJBVUwsS0FBSzt1QkFXTCxLQUFLOytCQU1MLFNBQVMsU0FBQyxtQkFBbUI7NkJBTTdCLFlBQVksU0FBQyxRQUFRO2dDQU1yQixZQUFZLFNBQUMsV0FBVzsyQkFNeEIsWUFBWSxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uL2F3LWRhdGF0YWJsZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuXG5leHBvcnQgdHlwZSBEVEhBbGlnbm1lbnQgPSAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCc7XG5cblxuLyoqXG4gKiBEVENvbHVtbiByZXByZXNlbnQgc2luZ2xlIGNvbHVtbiBpbmNsdWRpbmcgaGVhZGVyIGFuZCBpdHMgYm9keS4gRWFjaCBjb2x1bW4gaGFzIGl0cyBvd25cbiAqIHJlbmRlcmVyVGVtcGxhdGUgd2hpY2ggYSBlbnRyeSB0byB0aGlzIGNvbXBvbmVudC5cbiAqXG4gKiBLZWVwaW5nIHRoaXMgc2VwYXJhdGUgZnJvbSB0aGUgZGF0YXRhYmxlIHdoZXJlIERUIGlzIG5vdCByZWFsbHkgYXdhcmUgd2hhdCBpdCBpcyByZW5kZXJpbmcsXG4gKiBpdCBhbGxvd3MgdXMgbW9yZSBmbGV4aWJpbGl0eSBpbiB0ZXJtcyBvZiBkaWZmZXJlbnQgdHlwZSBvZiBjb2x1bW4gaW5oZXJpdGluZyBmcm9tIHRoaXNcbiAqIG9uZS4uIFN1Y2ggYXM6XG4gKiAgRFRSb3dEZXRhaWwgIGNvbHVtblxuICogIERUU2luZ2xlU2VsZWN0aW9uIGNvbHVtblxuICogIERUTXVsdGlTZWxlY3Rpb24gY29sdW1uXG4gKlxuICogVGhpcyB3YXkgd2UgZG9uJ3QgZG8gSUYvVEhFTi9FTFNFIGluc2lkZSB0aGUgZGF0YXRhYmxlIGFuZCB0cnlpbmcgdG8gY3JlYXRlIGRpZmZlcmVudCBjYXNlcy5cbiAqXG4gKiAgVGhlbiBsYXRlciBvbiB0aGlzIHdpbGwgbGV0IHVzIGNyZWF0ZSBhZGRpdGlvbmFsIGxvZ2ljIGZvciB0aGUgcGl2b3RhbCBsYXlvdXQuIEJlY2F1c2UgRFRcbiAqICBkb2VzIGtub3cgYW55dGhpbmcgYWJvdXQgdGhlIHR5cGUgb2YgdGhlIGNvbHVtbiBzbyB3aGF0ZXZlciBpcyBhZGRlZCB0byB0aGUgRFQuY29sdW1ucyBpdFxuICogIHdpbGwgYmUgcmVuZGVyZWQuXG4gKlxuICpcbiAqICBDb2x1bW5zIGNhbiBiZSBhbHNvIGZyb3plbiBtZWFuaW5nIGlmIHRoZSBjb250ZW50IG92ZXJmbG93cyB0aGV5IGRvbnQgc2Nyb2xsLiBUbyBtYWtlIHRoZVxuICogIGNvbHVtbiBmcm96ZW4gd2UgbmVlZCB0byB1c2UgW2Zyb3plbl0gYmluZGluZyBhbmQgc2UgaXQgdG8gVFJVRSBwbHVzIGl0IHJlcXVpcmVzIGEgW3dpZHRoXVxuICogIGJpbmRpbmcgdG8gYmUgc2V0IChpbiBweCkuXG4gKiAgV2UgbmVlZCB0aGlzIHRvIGJlIGFibGUgdG8gcHJvcGVybHkgcG9zaXRpb24gdGhlIHNlY29uZCB0YWJsZSB3aGljaCBpcyBjaGFuZ2VkIHRvIGFic29sdXRlXG4gKiAgcG9zaXRpb25pbmcuXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtY29sdW1uMicsXG4gICAgdGVtcGxhdGVVcmw6ICdkdC1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkdC1jb2x1bW4uY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRDb2x1bW4yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcbiAgICAvKipcbiAgICAgKiBDb2x1bW4gaGVhZGVyIGxhYmVsLlxuICAgICAqXG4gICAgICogT3IgeW91IGNhbiB1c2UgaGVhZGVyVGVtcGxhdGUgdG8gZGVmaW5lIHlvdXIgb3duIHRlbXBsYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCBmaWVsZCBuYW1lIHRvIHJlYWQgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBrZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2VsbCBhbGlnbm1lbnQuIEl0IGluc2VydHMgcmVndWxhciBhbGlnbiBhdHRyaWJ1dGUgdG8gdGhlIHRhYmxlIGNlbGxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxpZ246IERUSEFsaWdubWVudCA9ICdsZWZ0JztcblxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGR5bmFtaWMgY2xhc3MgYmFzZWQgb24gZGF0YSBhbmQgdGhlbiBpdHMgYWRkZWQgdG8gdGhlIHRhYmxlIGNlbGwgVERcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlDbGFzc0ZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiBmYWxzZSBhcHBsaWVzIGR0LWlzLWhpZGRlbiBzdHlsZSB0aGF0IGhpZGVzIHRoZSBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIE1hcmtzIGNvbHVtbiBhcyBzb3J0YWJsZSB3aGljaCBtZWFucyBzb3J0aW5nIGljb24gaXMgYWRkZWQgdG8gdGhlIGhlYWRlciB3aXRoIHNwZWNpYWxcbiAgICAgKiBzb3J0aW5nIGhhbmRsaW5nXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzb3J0YWJsZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogU29ydGluZyBkaXJlY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc29ydE9yZGVyaW5nOiBzdHJpbmcgPSAnZGVzY2VuZGluZyc7XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB0aGUgdGVtcGxhdGUgaWYgd2hldGhlciB0byByZW5kZXIgYSBsYWJlbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Q29sdW1uTGFiZWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1N1YkhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0YXRpYyBjbGFzcyB0aGF0IGlzIGFkZGVkIHRvIHRoZSBUSCBpbnRvIHRoZSBoZWFkZXIuIEl0IGRvZXMgbm90IHJlbHkgb24gZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0YXRpYyBjbGFzcyB0aGF0IGlzIGFkZGVkIHRvIHRoZSB0ZCBpbnRvIHRoZSBib2R5LiBJdCBkb2VzIG5vdCByZWx5IG9uIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keVN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCB0b2dldGhlciB3aXRoIGNlbGwgc2VsZWN0aW9uTW9kZSB0byB0ZWxsIHdoaWNoIGNvbHVtbiBpcyBzZWxlY3RhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIEhFQURFUiB0ZW1wbGF0ZSBmb3IgY3VycmVudCBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIFN1YkhlYWRlciB0ZW1wbGF0ZSBmb3IgY3VycmVudCBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsU3ViSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIGJvZHkgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsQm9keTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSBjb2x1bW4gaXMgZGF0YSBjb2x1bW4gIC0gaWYgaXQgaXMgcmVuZGVyaW5nIGRhdGEgb3IganVzdCBhIGxhYmVsIG9yIHNvbWVcbiAgICAgKiBjb250cm9sXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGltcG9ydGFudCB3aGVuIGNhbGN1bGF0aW5nIGEgY29sdW1uIHNwYW4gYW5kIHdlIG5lZWQgdG8ga25vdyB3aGljaCBjb2x1bW5zIGFyZSBvclxuICAgICAqIHdpbGwgYmUganVzdCBmb3Igc2VsZWN0aW9uIGNvbnRyb2xzIGFuZCB3aGljaCBob2xkcyBkYXRhXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc0RhdGFDb2x1bW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBjb2x1bW4gdGhhdCB3aWxsIG5vdCBzY3JvbGwgaG9yaXpvbnRhbGx5IHdpdGggb3RoZXIgY29sdW1ucy4gQ29sdW1uIGlzXG4gICAgICogZnJvemVuLlxuICAgICAqXG4gICAgICogRm9yIHN1Y2ggY29sdW1ucyB0aGF0IGFyZSBtYXJrZWQgYXMgZnJvemVuIGJpbmRpbmcgW3dpZHRoXSBpcyByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZnJvemVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBNYXggV2lkdGggZm9yIHRoZSBURC4gRXZlbiBURCBkb2VzIG5vdCBzdXBwb3J0IHdlIGNhbGN1bGF0ZSB0aGUgY29udGVudCB3aWR0aFxuICAgICAqIGZvciBlYWNoIGNlbGwgYW5kIHRoZW4gZGVjaWRlIGlmIHdlIG5lZWQgdG8gZW5sYXJnZSB0aGUgY29sdW1uLlxuICAgICAqXG4gICAgICogQEV4cGVyaW1hbnRhbCBiaW5kaW5nIHRoYXQgaXMgY3VycmVudGx5IHdvcmtpbmcgaWYgdGhlIGNvbnRlbnQgb2YgdGhlIGNlbGwgaXMgaW5saW5lXG4gICAgICogZWxlbWVudCB3aGVyZSB3ZSBjYW4gY29udHJvbCB3aGl0ZXNwYWNlIHdyYXBwaW5nIGluIG9yZGVyIHRvIGZpbmQgb3V0IHRoZSByZWFsIHdpZHRoXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtYXhXaWR0aDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtaW5XaWR0aCBvbiB0aGUgY2VsbC4gQWdhaW4ganVzdCBsaWtlIG1heFdpZHRoIGNzcyBwcm9wZXJseSBpcyBub3Qgc3VwcG9ydGVkIG9uXG4gICAgICogdGhlIHRhYmxlIHNvIHRoZXJlIGlzIGEgd29ya2Fyb3VuZCB3aGVyZSB3ZSBjcmVhdGUgYWRkaXRpb25hbCByb3cgdGhhdCBzZXRzIHBhZGRpbmcgcmlnaHRcbiAgICAgKiBhbmQgdGhpcyB3aWxsIHByZXZlbnQgdGhlIGNvbHVtbiB0byBjb2xsYXBzZSB1bmRlciBzcGVjaWZpZWQgd2lkdGhcbiAgICAgKlxuICAgICAqIHRvZG86IHN0aWxsIFRCRFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWluV2lkdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE1haW4gcmVuZGVyaW5nIHRlbXBsYXRlIHVzZWQgYnkgZGF0YXRhYmxlIHRvIHJlbmRlciBlYWNoIGNvbHVtbi5cbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdyZW5kZXJpbmdUZW1wbGF0ZScpXG4gICAgcmVuZGVyZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBoZWFkZXIgdGVtcGxhdGUuIEl0IHdpbGwgb3ZlcnJpZGUgcHJvdmlkZWQgbGFiZWxcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXInKVxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIHN1YkhlYWRlciB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdzdWJIZWFkZXInKVxuICAgIHN1YkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGJvZHkgdGVtcGxhdGUgdGhhdCB3aWxsIG92ZXJyaWRlIHJlYWQgdmFsdWUgZnJvbSB0aGUgW2tleV0gYmluZGluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JvZHknKVxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuLi5cbiAgICAgKi9cbiAgICBzb3J0T3JkZXI6IG51bWJlcjtcbiAgICBtYXhXaWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIG1pbldpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgd2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICB3aWRlc3RDZWxsOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIERhdGF0YWJsZSBJbXBsZW1lbnRhdGlvbnNcbiAgICAgKi9cbiAgICBkdDogQVdEYXRhVGFibGU7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5rZXkpICYmIGlzQmxhbmsodGhpcy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBiaW5kaW5nOiAnICtcbiAgICAgICAgICAgICAgICAnW2tleV0gb3IgW2xhYmVsXSBiaW5kaW5ncyBtdXN0IGJlIHVzZWQgYXQgbWluaW11bScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG8gYmUgYWJsZSB0byBwb3NpdGlvbiBzZWNvbmQgRFQgd2UgcmVxdWlyZSBbd2lkdGhdIHRvIGJlIHNldCBhcyB3ZWxsXG4gICAgICAgIGlmICh0aGlzLmZyb3plbiAmJiBpc0JsYW5rKHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYmluZGluZyBbd2lkdGhdOiAnICtcbiAgICAgICAgICAgICAgICAnd2hlbiBbZnJvemVuXT10cnVlIHRoZW4gW3dpZHRoXSBiaW5kaW5nIG5lZWRzIHRvIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gbmVlZCB0byBkZWZmZXIgdGhpcyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG90aGVyd2lzZSBJIGdldFxuICAgICAgICAvLyB2YWx1ZSB3YXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZCBlcnJvclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIC8vIHtcblxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gY2VsbCBzZWxlY3Rpb25Nb2RlIGlzIGVuYWJsZWQgdGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gd2UgY2xpY2sgb24gaGVhZGVyLlxuICAgICAqIEl0IGRlbGVnYXRlcyB0aGUgY2FsbCB0byB0aGUgRFQgd2hlcmUgaXQgdG9nZ2xlcyBjdXJyZW50bHkgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhbmRsZUhlYWRlckNsaWNrKGV2ZW50OiBhbnksIGVsZW1lbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzSGVhZGVyU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVG9kbzogSW1wbGVtZW50IG91ciBvd24gc29ydGluZyBtZWNoYW5pc20gb25jZSB3ZSBleHRyYWN0IHRoZSBzb3J0aW5nIGxvZ2ljIHRvIGl0cyBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnQoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHRhcmdldE5vZGUsICdkdC11LXNvcnRhYmxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXRpdGxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXNvcnRhYmxlLWljb24nKSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5kdC5zb3J0Q29sdW1uLmtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXJpbmcgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0Zvck51bWJlcih0aGlzLnNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5zb3J0Q29sdW1uID0gdGhpcztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLnNvcnRLZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLnNvcnRPcmRlcmluZyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHQuc29ydFNpbmdsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHQudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBzdHlsZSBjbGFzcyBiYXNlZCBvbiBkYXRhXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGR5bmFtaWNCb2R5Q2xhc3MoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGR5bkNsYXNzID0gaXNQcmVzZW50KHRoaXMuYm9keUNsYXNzRm4pXG4gICAgICAgICAgICA/IHRoaXMuYm9keUNsYXNzRm4uYXBwbHkodGhpcy5kdC5jb250ZXh0LCBbdGhpcywgaXRlbV0pIDogJyc7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmJvZHlTdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgZHluQ2xhc3MgKz0gJyAnICsgdGhpcy5ib2R5U3R5bGVDbGFzcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLnN0eWxlQ2xhc3MpKSB7XG4gICAgICAgICAgICBkeW5DbGFzcyArPSAnICcgKyB0aGlzLnN0eWxlQ2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHluQ2xhc3M7XG4gICAgfVxuXG5cbiAgICBpc1Jvd1NlbGVjdGFibGUoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LmlzUm93U2VsZWN0YWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmR0LmlzUm93U2VsZWN0YWJsZShpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0NlbGxTZWxlY3RhYmxlKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdjZWxsJyAmJiB0aGlzLmlzUm93U2VsZWN0YWJsZShpdGVtKSAmJiB0aGlzLnNlbGVjdGFibGU7XG5cbiAgICB9XG5cblxuICAgIGlzSGVhZGVyU2VsZWN0YWJsZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnY2VsbCcgJiYgdGhpcy5zZWxlY3RhYmxlO1xuXG4gICAgfVxuXG5cbiAgICBnZXRTb3J0T3JkZXIoKVxuICAgIHtcbiAgICAgICAgbGV0IG9yZGVyID0gMDtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5rZXkgPT09IHRoaXMuZHQuc29ydENvbHVtbi5rZXkpIHtcbiAgICAgICAgICAgIG9yZGVyID0gdGhpcy5kdC5zb3J0Q29sdW1uLnNvcnRPcmRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMua2V5ID09PSB0aGlzLmR0LnNvcnRDb2x1bW4ua2V5O1xuICAgIH1cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kdCA9IHRhYmxlO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5pbml0aWFsU29ydEtleSkgJiYgdGhpcy5kdC5pbml0aWFsU29ydEtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmR0LmluaXRpYWxTb3J0T3JkZXIpO1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0Q29sdW1uID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuYm9keVRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVRlbXBsYXRlID0gdGhpcy5kdC5ib2R5VGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuaGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN1YkhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbFN1YkhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5zdWJIZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuc3ViSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmJvZHlDbGFzc0ZuKSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3NGbiA9IHRoaXMuZHQuYm9keUNsYXNzRm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1heFdpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLm1heFdpZHRoKTtcbiAgICAgICAgdGhpcy5taW5XaWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy5taW5XaWR0aCk7XG4gICAgICAgIHRoaXMud2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMud2lkdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoZSB2aWV3IGluaXQgY3ljbGUgZnJvbSB0aGUgZHQubmdBZnRlclZpZXdDaGVja2VkLlxuICAgICAqXG4gICAgICogSW4gY2FzZSB3ZSB1c2UgTWF4V2lkdGggZGlyZWN0aXZlIHdlIHNldCBuZXcgd2lkdGggb25jZSBmb3IgYWxsIGNvbHVtc25cbiAgICAgKi9cbiAgICBwb3N0SW5pdGlhbGl6ZShteUluZGV4OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IG15SW5kZXggKyAxO1xuICAgICAgICBsZXQgdGFibGU7XG5cbiAgICAgICAgaWYgKHRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICB0YWJsZSA9ICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbFxuICAgICAgICAgICAgICAgIC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LWZyb3plbiB0YWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFibGUgPSAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy53aWRlc3RDZWxsID4gMCkge1xuICAgICAgICAgICAgbGV0IGFsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyIHRoOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKSwgJyArXG4gICAgICAgICAgICAgICAgJ3RyIHRkOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKScpLmZvckVhY2goKG5vZGU6IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gdGhpcy53aWRlc3RDZWxsICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBZb3UgZWl0aGVyIHVzZSB0aGlzIGJpbmRpbmcgZGlyZWN0bHkgYW5kIHNheSBpdHMgZGF0YWNvbHVtbiBvciB3aGVuIHRoZXJlIGlzIGEgW2tleV1cbiAgICAgKiBiaWRpbmcgd2Uga25vdyBpdCByZWZlcnMgdG8gc29tZSBmaWVsZC5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzVmFsdWVDb2x1bW4oKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5pc0RhdGFDb2x1bW4pICYmIEJvb2xlYW5XcmFwcGVyLmlzVHJ1ZSh0aGlzLmlzRGF0YUNvbHVtbikpIHx8XG4gICAgICAgICAgICBpc1ByZXNlbnQodGhpcy5rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIGluIG91dGxpbmUgbW9kZSAgd2UgbmVlZCB0byBhbHNvIGluZGVuZCBlYWNoIHNlbGVjdGlvbiBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgICAqXG4gICAgICogaW5kZW50IC0gMSA+IG9ubHkgb2Zmc2V0IHdpdGhcbiAgICAgKiBpbmRlbnRcbiAgICAgKi9cbiAgICBpbmRlbnRGb3JDb250cm9sKGNlbGw6IGFueSwgbGV2ZWw6IG51bWJlcik6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuaXNPdXRsaW5lKCkgJiYgbGV2ZWwgPiAwICYmIGNlbGwub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGxldCBvdXRsaW5lTm9kZVBhZGRpbmcgPVxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpLnBhZGRpbmdMZWZ0KSB8fCAwO1xuXG4gICAgICAgICAgICAvLyAxc3QgbGV2ZWwgaXMgcHVzaGVkIGFzIHJvb3RcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobGV2ZWwgPT09IDEpID8gbnVsbCA6ICh0aGlzLmR0LmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbClcbiAgICAgICAgICAgICAgICAgICAgLSBvdXRsaW5lTm9kZVBhZGRpbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5kdC5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpICsgb3V0bGluZU5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbnRlcm5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgd2lkdGhUb1B4KHdpZHRoOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBweDtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aWR0aCkpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC5pbmRleE9mKCclJykgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9uUGMgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgICAgICBweCA9IG5vblBjICogKDxEYXRhdGFibGUyQ29tcG9uZW50PnRoaXMuZHQpLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHB4ID0gcGFyc2VGbG9hdCh3aWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHg7XG4gICAgfVxufVxuXG4iXX0=