/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DTColumn2Component = /** @class */ (function (_super) {
    tslib_1.__extends(DTColumn2Component, _super);
    function DTColumn2Component(env, domHandler) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.domHandler = domHandler;
        /**
         *
         * Cell alignment. It inserts regular align attribute to the table cell
         *
         */
        _this.align = 'left';
        /**
         *
         * If false applies dt-is-hidden style that hides the column
         *
         */
        _this.isVisible = true;
        /**
         * Sorting direction
         *
         */
        _this.sortOrdering = 'descending';
        /**
         * Tells the template if whether to render a label
         *
         */
        _this.showColumnLabel = true;
        /**
         *
         * See AWDataTable
         *
         */
        _this.showSubHeader = false;
        /**
         *
         * Used together with cell selectionMode to tell which column is selectable
         *
         */
        _this.selectable = false;
        /**
         * Use globally defined HEADER template for current column
         *
         */
        _this.useGlobalHeader = true;
        /**
         * Use globally defined SubHeader template for current column
         *
         */
        _this.useGlobalSubHeader = true;
        /**
         * Use globally defined body template
         *
         */
        _this.useGlobalBody = true;
        /**
         * Tells if the column is data column  - if it is rendering data or just a label or some
         * control
         *
         * This is important when calculating a column span and we need to know which columns are or
         * will be just for selection controls and which holds data
         */
        _this.isDataColumn = true;
        /**
         * Identifies column that will not scroll horizontally with other columns. Column is
         * frozen.
         *
         * For such columns that are marked as frozen binding [width] is required.
         *
         */
        _this.frozen = false;
        _this.maxWidthPx = 0;
        _this.minWidthPx = 0;
        _this.widthPx = 0;
        _this.widestCell = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (isBlank(this.key) && isBlank(this.label)) {
            throw new Error('Missing required binding: ' +
                '[key] or [label] bindings must be used at minimum');
        }
        // To be able to position second DT we require [width] to be set as well
        if (this.frozen && isBlank(this.width)) {
            throw new Error('Missing required binding [width]: ' +
                'when [frozen]=true then [width] binding needs to be specified.');
        }
    };
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // need to deffer this and trigger change detection otherwise I get
        // value was changed after it was checked error
        // setTimeout(() =>
        // {
        // });
    };
    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     */
    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    DTColumn2Component.prototype.handleHeaderClick = /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    function (event, element) {
        if (this.isHeaderSelectable()) {
            this.dt.onHeaderSelectionChange(element, this);
        }
        else if (this.sortable) {
            this.sort(event);
        }
        event.preventDefault();
    };
    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     */
    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     * @param {?} event
     * @return {?}
     */
    DTColumn2Component.prototype.sort = /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.sortable) {
            return;
        }
        var /** @type {?} */ targetNode = event.target;
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
    };
    /**
     * Calculated style class based on data
     *
     *
     */
    /**
     * Calculated style class based on data
     *
     *
     * @param {?} item
     * @return {?}
     */
    DTColumn2Component.prototype.dynamicBodyClass = /**
     * Calculated style class based on data
     *
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ dynClass = isPresent(this.bodyClassFn)
            ? this.bodyClassFn.apply(this.dt.context, [this, item]) : '';
        if (isPresent(this.bodyStyleClass)) {
            dynClass += ' ' + this.bodyStyleClass;
        }
        else if (isPresent(this.styleClass)) {
            dynClass += ' ' + this.styleClass;
        }
        return dynClass;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DTColumn2Component.prototype.isRowSelectable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isPresent(this.dt.isRowSelectable)) {
            return this.dt.isRowSelectable(item);
        }
        return false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DTColumn2Component.prototype.isCellSelectable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.dt.selectionMode === 'cell' && this.isRowSelectable(item) && this.selectable;
    };
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.isHeaderSelectable = /**
     * @return {?}
     */
    function () {
        return this.dt.selectionMode === 'cell' && this.selectable;
    };
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.getSortOrder = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ order = 0;
        if (isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key) {
            order = this.dt.sortColumn.sortOrder;
        }
        return order;
    };
    /**
     * @return {?}
     */
    DTColumn2Component.prototype.isSorted = /**
     * @return {?}
     */
    function () {
        if (!this.sortable) {
            return false;
        }
        return isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key;
    };
    /**
     * @param {?} table
     * @return {?}
     */
    DTColumn2Component.prototype.initialize = /**
     * @param {?} table
     * @return {?}
     */
    function (table) {
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
    };
    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     */
    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     * @param {?} myIndex
     * @return {?}
     */
    DTColumn2Component.prototype.postInitialize = /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     * @param {?} myIndex
     * @return {?}
     */
    function (myIndex) {
        var _this = this;
        var /** @type {?} */ colIndex = myIndex + 1;
        var /** @type {?} */ table;
        if (this.dt.hasFrozenColumns()) {
            table = (/** @type {?} */ (this.dt)).el
                .nativeElement.querySelector('.dt-body-frozen table');
        }
        else {
            table = (/** @type {?} */ (this.dt)).el.nativeElement.querySelector('table');
        }
        if (this.widestCell > 0) {
            var /** @type {?} */ all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
                'tr td:nth-child(' + colIndex + ')').forEach(function (node) {
                node.style.width = _this.widestCell + 'px';
            });
        }
    };
    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     */
    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     * @return {?}
     */
    DTColumn2Component.prototype.isValueColumn = /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     * @return {?}
     */
    function () {
        return (isPresent(this.isDataColumn) && BooleanWrapper.isTrue(this.isDataColumn)) ||
            isPresent(this.key);
    };
    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     */
    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     * @param {?} cell
     * @param {?} level
     * @return {?}
     */
    DTColumn2Component.prototype.indentForControl = /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     * @param {?} cell
     * @param {?} level
     * @return {?}
     */
    function (cell, level) {
        if (this.dt.isOutline() && level > 0 && cell.offsetWidth > 0
            && isPresent(cell.nextElementSibling)) {
            var /** @type {?} */ outlineNodePadding = parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;
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
    };
    /**
     *
     * Internal
     * @param {?} width
     * @return {?}
     */
    DTColumn2Component.prototype.widthToPx = /**
     *
     * Internal
     * @param {?} width
     * @return {?}
     */
    function (width) {
        var /** @type {?} */ px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                var /** @type {?} */ nonPc = parseFloat(width) / 100;
                px = nonPc * (/** @type {?} */ (this.dt)).el.nativeElement.offsetWidth;
            }
            else {
                px = parseFloat(width);
            }
        }
        return px;
    };
    DTColumn2Component.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-column2',
                    template: "<!--\n    To make it more readable Each Column type has its own rendering template instead of putting\n    all this into datatable as this is more responsibility of the column. And the main goal\n    was try to be modular as possible. When There will be different types of columns\n\n    - Regular DTColumn (current implementation),\n    - SelectionColumn (Single/Multi select) - todo,\n    - DetailRow column, then pivotal collumn to render row/column/detail attributes - todo.\n\n    When implementing new column type you just inherit this DTColumnComponent and provide your\n    own rendering template and DT take care of the rest.\n\n    todo: We have SingleSelect, Multiselect rendering template that is Added programatically\n    todo: We have pivotal rendering template\n\n\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\"\n             let-columnIndex=\"columnIndex\"\n             let-rowIndex=\"rowIndex\">\n\n    <ng-template *ngIf=\"isHeader\" [ngTemplateOutlet]=\"colHeader\"\n                 [ngTemplateOutletContext]=\"{$implicit: isSubHeader, columnIndex:columnIndex, data: dataToRender,\n                 rowIndex:rowIndex}\">\n    </ng-template>\n\n    <ng-template *ngIf=\"!isHeader\" [ngTemplateOutlet]=\"colBody\"\n                 [ngTemplateOutletContext]=\"{$implicit: column, data:dataToRender,rowIndex:rowIndex}\">\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Templates for header columns. Here we are rendering two types. Header and Subheader that we\n    usually use here as some kind of summary columns. Not really having summary at the bottom like other\n    DT.\n\n    TH column and their text are usually unselectable and most of these were inherited from\n    original PrimeNg DT even not many things got left after we refactor this but the idea is the\n    same.\n\n    Each cell has its dt-cell-def class that sets default styling like font, background, alignment\n    padding, etcs..\n\n\n-->\n<ng-template #colHeader let-isSubHeader let-columnIndex=\"columnIndex\" let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <th #headerCell1 [class]=\"headerStyleClass||styleClass\" *ngIf=\"!isSubHeader\"\n        (click)=\"handleHeaderClick($event, headerCell1)\"\n        [ngClass]=\"{'dt-is-default dt-u-unselectable-text' :true,\n                    'dt-cell-def': dt.selectionMode !== 'cell' || (!dt.isOutline() || !dt.pivotalLayout),\n                    'dt-u-sortable': sortable,\n                    'dt-is-active': isSorted(),\n                    'dt-is-hidden': !isVisible}\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [attr.tabindex]=\"sortable ? 1 : null\"\n        [dtMaxWidth]=\"maxWidthPx\"\n    >\n\n        <ng-template [ngIf]=\"dt.headerFilterTemplate && columnIndex === 0 \">\n            <ng-container *ngTemplateOutlet=\"dt.headerFilterTemplate\">\n            </ng-container>\n        </ng-template>\n        <!--\n            when cell are selectable we need two version where one wrap the cell content in div\n        -->\n        <ng-template [ngIf]=\"isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"selectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n    </th>\n\n    <th #headerCell2 [class]=\"headerStyleClass||styleClass\" *ngIf=\"isSubHeader\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{'dt-is-default dt-cell-def dt-sub-header dt-u-unselectable-text':true}\"\n        [dtMaxWidth]=\"maxWidthPx\">\n\n        <span class=\"dt-col-title\" *ngIf=\"dt.showSubHeader && subHeaderTemplate\">\n            <ng-container *ngTemplateOutlet=\"subHeaderTemplate;\n                    context: {$implicit: this, rowData: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </span>\n    </th>\n</ng-template>\n\n\n<!--\n    Template for the body = the TD. For the body and we might want to do the same for header we\n    allow to have calculated body class that comes from the application. So based on the data types\n    you might want to apply different class in order to apply custom styling.\n-->\n<ng-template #colBody let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <td #cell [class]=\"dynamicBodyClass(data)\"\n        (click)=\"dt.onCellSelectionChange(cell, this, data)\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{ 'dt-is-default': true,\n        'dt-cell-def': !isCellSelectable(data),\n        'dt-is-hidden': !isVisible}\"\n        [dtMaxWidth]=\"maxWidthPx\"\n        >\n\n        <!--\n            Since we need to support cell selection when we need to draw border around it\n            We are wrapping such sells with div which gives us better flexibility\n        -->\n        <ng-template [ngIf]=\"isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"selectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex }\">\n            </ng-container>\n\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </ng-template>\n\n    </td>\n</ng-template>\n\n<!--\n    Todo: create better solution instead of using different template create directive that wraps\n    it with the div conditionally\n-->\n<ng-template #selectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isHeaderSelected(this)}\">\n        <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #headerCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && !headerTemplate\">\n                {{label}}\n    </span>\n\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate;\n                        context: {$implicit: this, rowData: data, rowIndex: rowIndex }\">\n                    </ng-container>\n    </span>\n\n    <span class=\"dt-col-sortable-icon sap-icon icon-sort\" *ngIf=\"sortable\"\n          [ngClass]=\"{'icon-sort-descending': (getSortOrder() == -1),\n                           'icon-sort-ascending': (getSortOrder() == 1)}\">\n    </span>\n</ng-template>\n\n\n<ng-template #selectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isBodyCellSelected(this, data)}\">\n        <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #bodyCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <!--\n           when no template is used use our FieldPath to access the object value based on the\n           key binding\n        -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"!bodyTemplate\">\n            {{dt.getValue(data, key)}}\n        </span>\n\n\n    <!--\n        In case application wants to provide their own cell component they use\n        #body ng-template to do so.\n    -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"bodyTemplate\">\n            <ng-container *ngTemplateOutlet=\"bodyTemplate;\n            context: {$implicit: this, rowData: data, rowIndex: rowIndex}\"></ng-container>\n        </span>\n</ng-template>\n",
                    styles: [".dt-sortable-col{cursor:pointer}.dt-col-sortable-icon{display:inline-block;margin-left:.125em}th.dt-cell-def{font-weight:400;color:#4a4a4a}th.dt-is-default{background-color:#f2f2f2;white-space:nowrap}th.dt-is-default.dt-cell-def:not(.dt-sub-header){border-bottom-color:#f2f2f2}th.dt-sub-header{background-color:#fff}th .dt-cell-selected{border-color:#58b957}td .dt-cell-selected{border-left-color:#4f9fcf}.dt-root-section .dt-selection-column,.dt-selection-column{width:46px;padding:0 12px}.dt-pivot-layout td.dt-selection-column,th.dt-selection-column{border-right-color:transparent}thead tr:first-child th{border-top-color:transparent}tbody tr:last-child:not(.dt-drag-row-bottom) td{border-bottom-color:transparent}td:first-child,th:first-child{border-left-color:transparent}td:last-child,th:last-child{border-right-color:transparent}tbody .dt-drag-row-top>td{background:linear-gradient(0deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-bottom>td{background:linear-gradient(180deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-both>td{background:linear-gradient(0deg,#0271d2 0,#fff 3%,#fff 97%,#0271d2 100%)}tbody .dt-row-dragging>td{background-color:#ececec;color:#b9b9b9}tbody .dt-row-dragging .ui-state-active{opacity:.5;cursor:not-allowed}"],
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler]
                },] },
    ];
    /** @nocollapse */
    DTColumn2Component.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
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
    return DTColumn2Component;
}(BaseComponent));
export { DTColumn2Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyUEgsOENBQWE7SUFrTWpELDRCQUFtQixHQUFnQixFQUNoQjtRQURuQixZQUdJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZ0JBQVUsR0FBVixVQUFVOzs7Ozs7c0JBN0tQLE1BQU07Ozs7OzswQkFlUCxJQUFJOzs7Ozs2QkFjRixZQUFZOzs7OztnQ0FPUixJQUFJOzs7Ozs7OEJBUU4sS0FBSzs7Ozs7OzJCQXVCUixLQUFLOzs7OztnQ0FPQSxJQUFJOzs7OzttQ0FPRCxJQUFJOzs7Ozs4QkFPVCxJQUFJOzs7Ozs7Ozs2QkFXTCxJQUFJOzs7Ozs7Ozt1QkFVVixLQUFLOzJCQW9ERixDQUFDOzJCQUNELENBQUM7d0JBQ0osQ0FBQzsyQkFDRSxDQUFDOztLQVlyQjs7OztJQUdELHFDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFD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QUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDOzs7Z0JBbnFCakIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsczZRQWtOYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxzdUNBQXN1QyxDQUFDO29CQUNodkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFFMUI7Ozs7Z0JBNVB1QixXQUFXO2dCQUUzQixVQUFVOzs7d0JBa1FiLEtBQUs7c0JBTUwsS0FBSzt3QkFRTCxLQUFLOzhCQU9MLEtBQUs7NEJBUUwsS0FBSzsyQkFPTCxLQUFLOytCQU9MLEtBQUs7a0NBT0wsS0FBSztnQ0FRTCxLQUFLO21DQVFMLEtBQUs7aUNBT0wsS0FBSzs2QkFRTCxLQUFLO2tDQU9MLEtBQUs7cUNBT0wsS0FBSztnQ0FPTCxLQUFLOytCQVdMLEtBQUs7eUJBVUwsS0FBSzsyQkFVTCxLQUFLOzJCQVdMLEtBQUs7bUNBTUwsU0FBUyxTQUFDLG1CQUFtQjtpQ0FNN0IsWUFBWSxTQUFDLFFBQVE7b0NBTXJCLFlBQVksU0FBQyxXQUFXOytCQU14QixZQUFZLFNBQUMsTUFBTTs7NkJBM2N4QjtFQTRSd0MsYUFBYTtTQUF4QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uL2F3LWRhdGF0YWJsZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuXG5leHBvcnQgdHlwZSBEVEhBbGlnbm1lbnQgPSAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCc7XG5cblxuLyoqXG4gKiBEVENvbHVtbiByZXByZXNlbnQgc2luZ2xlIGNvbHVtbiBpbmNsdWRpbmcgaGVhZGVyIGFuZCBpdHMgYm9keS4gRWFjaCBjb2x1bW4gaGFzIGl0cyBvd25cbiAqIHJlbmRlcmVyVGVtcGxhdGUgd2hpY2ggYSBlbnRyeSB0byB0aGlzIGNvbXBvbmVudC5cbiAqXG4gKiBLZWVwaW5nIHRoaXMgc2VwYXJhdGUgZnJvbSB0aGUgZGF0YXRhYmxlIHdoZXJlIERUIGlzIG5vdCByZWFsbHkgYXdhcmUgd2hhdCBpdCBpcyByZW5kZXJpbmcsXG4gKiBpdCBhbGxvd3MgdXMgbW9yZSBmbGV4aWJpbGl0eSBpbiB0ZXJtcyBvZiBkaWZmZXJlbnQgdHlwZSBvZiBjb2x1bW4gaW5oZXJpdGluZyBmcm9tIHRoaXNcbiAqIG9uZS4uIFN1Y2ggYXM6XG4gKiAgRFRSb3dEZXRhaWwgIGNvbHVtblxuICogIERUU2luZ2xlU2VsZWN0aW9uIGNvbHVtblxuICogIERUTXVsdGlTZWxlY3Rpb24gY29sdW1uXG4gKlxuICogVGhpcyB3YXkgd2UgZG9uJ3QgZG8gSUYvVEhFTi9FTFNFIGluc2lkZSB0aGUgZGF0YXRhYmxlIGFuZCB0cnlpbmcgdG8gY3JlYXRlIGRpZmZlcmVudCBjYXNlcy5cbiAqXG4gKiAgVGhlbiBsYXRlciBvbiB0aGlzIHdpbGwgbGV0IHVzIGNyZWF0ZSBhZGRpdGlvbmFsIGxvZ2ljIGZvciB0aGUgcGl2b3RhbCBsYXlvdXQuIEJlY2F1c2UgRFRcbiAqICBkb2VzIGtub3cgYW55dGhpbmcgYWJvdXQgdGhlIHR5cGUgb2YgdGhlIGNvbHVtbiBzbyB3aGF0ZXZlciBpcyBhZGRlZCB0byB0aGUgRFQuY29sdW1ucyBpdFxuICogIHdpbGwgYmUgcmVuZGVyZWQuXG4gKlxuICpcbiAqICBDb2x1bW5zIGNhbiBiZSBhbHNvIGZyb3plbiBtZWFuaW5nIGlmIHRoZSBjb250ZW50IG92ZXJmbG93cyB0aGV5IGRvbnQgc2Nyb2xsLiBUbyBtYWtlIHRoZVxuICogIGNvbHVtbiBmcm96ZW4gd2UgbmVlZCB0byB1c2UgW2Zyb3plbl0gYmluZGluZyBhbmQgc2UgaXQgdG8gVFJVRSBwbHVzIGl0IHJlcXVpcmVzIGEgW3dpZHRoXVxuICogIGJpbmRpbmcgdG8gYmUgc2V0IChpbiBweCkuXG4gKiAgV2UgbmVlZCB0aGlzIHRvIGJlIGFibGUgdG8gcHJvcGVybHkgcG9zaXRpb24gdGhlIHNlY29uZCB0YWJsZSB3aGljaCBpcyBjaGFuZ2VkIHRvIGFic29sdXRlXG4gKiAgcG9zaXRpb25pbmcuXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtY29sdW1uMicsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgVG8gbWFrZSBpdCBtb3JlIHJlYWRhYmxlIEVhY2ggQ29sdW1uIHR5cGUgaGFzIGl0cyBvd24gcmVuZGVyaW5nIHRlbXBsYXRlIGluc3RlYWQgb2YgcHV0dGluZ1xuICAgIGFsbCB0aGlzIGludG8gZGF0YXRhYmxlIGFzIHRoaXMgaXMgbW9yZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY29sdW1uLiBBbmQgdGhlIG1haW4gZ29hbFxuICAgIHdhcyB0cnkgdG8gYmUgbW9kdWxhciBhcyBwb3NzaWJsZS4gV2hlbiBUaGVyZSB3aWxsIGJlIGRpZmZlcmVudCB0eXBlcyBvZiBjb2x1bW5zXG5cbiAgICAtIFJlZ3VsYXIgRFRDb2x1bW4gKGN1cnJlbnQgaW1wbGVtZW50YXRpb24pLFxuICAgIC0gU2VsZWN0aW9uQ29sdW1uIChTaW5nbGUvTXVsdGkgc2VsZWN0KSAtIHRvZG8sXG4gICAgLSBEZXRhaWxSb3cgY29sdW1uLCB0aGVuIHBpdm90YWwgY29sbHVtbiB0byByZW5kZXIgcm93L2NvbHVtbi9kZXRhaWwgYXR0cmlidXRlcyAtIHRvZG8uXG5cbiAgICBXaGVuIGltcGxlbWVudGluZyBuZXcgY29sdW1uIHR5cGUgeW91IGp1c3QgaW5oZXJpdCB0aGlzIERUQ29sdW1uQ29tcG9uZW50IGFuZCBwcm92aWRlIHlvdXJcbiAgICBvd24gcmVuZGVyaW5nIHRlbXBsYXRlIGFuZCBEVCB0YWtlIGNhcmUgb2YgdGhlIHJlc3QuXG5cbiAgICB0b2RvOiBXZSBoYXZlIFNpbmdsZVNlbGVjdCwgTXVsdGlzZWxlY3QgcmVuZGVyaW5nIHRlbXBsYXRlIHRoYXQgaXMgQWRkZWQgcHJvZ3JhbWF0aWNhbGx5XG4gICAgdG9kbzogV2UgaGF2ZSBwaXZvdGFsIHJlbmRlcmluZyB0ZW1wbGF0ZVxuXG5cbi0tPlxuPG5nLXRlbXBsYXRlICNyZW5kZXJpbmdUZW1wbGF0ZSBsZXQtaXNIZWFkZXIgbGV0LWlzU3ViSGVhZGVyPVwiaXNTdWJIZWFkZXJcIiBsZXQtY29sdW1uPVwiY29sdW1uXCJcbiAgICAgICAgICAgICBsZXQtZGF0YVRvUmVuZGVyPVwiZGF0YVwiXG4gICAgICAgICAgICAgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIlxuICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJpc0hlYWRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbEhlYWRlclwiXG4gICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBpc1N1YkhlYWRlciwgY29sdW1uSW5kZXg6Y29sdW1uSW5kZXgsIGRhdGE6IGRhdGFUb1JlbmRlcixcbiAgICAgICAgICAgICAgICAgcm93SW5kZXg6cm93SW5kZXh9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIiFpc0hlYWRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbEJvZHlcIlxuICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogY29sdW1uLCBkYXRhOmRhdGFUb1JlbmRlcixyb3dJbmRleDpyb3dJbmRleH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48IS0tXG4gICAgVGVtcGxhdGVzIGZvciBoZWFkZXIgY29sdW1ucy4gSGVyZSB3ZSBhcmUgcmVuZGVyaW5nIHR3byB0eXBlcy4gSGVhZGVyIGFuZCBTdWJoZWFkZXIgdGhhdCB3ZVxuICAgIHVzdWFsbHkgdXNlIGhlcmUgYXMgc29tZSBraW5kIG9mIHN1bW1hcnkgY29sdW1ucy4gTm90IHJlYWxseSBoYXZpbmcgc3VtbWFyeSBhdCB0aGUgYm90dG9tIGxpa2Ugb3RoZXJcbiAgICBEVC5cblxuICAgIFRIIGNvbHVtbiBhbmQgdGhlaXIgdGV4dCBhcmUgdXN1YWxseSB1bnNlbGVjdGFibGUgYW5kIG1vc3Qgb2YgdGhlc2Ugd2VyZSBpbmhlcml0ZWQgZnJvbVxuICAgIG9yaWdpbmFsIFByaW1lTmcgRFQgZXZlbiBub3QgbWFueSB0aGluZ3MgZ290IGxlZnQgYWZ0ZXIgd2UgcmVmYWN0b3IgdGhpcyBidXQgdGhlIGlkZWEgaXMgdGhlXG4gICAgc2FtZS5cblxuICAgIEVhY2ggY2VsbCBoYXMgaXRzIGR0LWNlbGwtZGVmIGNsYXNzIHRoYXQgc2V0cyBkZWZhdWx0IHN0eWxpbmcgbGlrZSBmb250LCBiYWNrZ3JvdW5kLCBhbGlnbm1lbnRcbiAgICBwYWRkaW5nLCBldGNzLi5cblxuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjY29sSGVhZGVyIGxldC1pc1N1YkhlYWRlciBsZXQtY29sdW1uSW5kZXg9XCJjb2x1bW5JbmRleFwiIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8dGggI2hlYWRlckNlbGwxIFtjbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzfHxzdHlsZUNsYXNzXCIgKm5nSWY9XCIhaXNTdWJIZWFkZXJcIlxuICAgICAgICAoY2xpY2spPVwiaGFuZGxlSGVhZGVyQ2xpY2soJGV2ZW50LCBoZWFkZXJDZWxsMSlcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtdS11bnNlbGVjdGFibGUtdGV4dCcgOnRydWUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1jZWxsLWRlZic6IGR0LnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJyB8fCAoIWR0LmlzT3V0bGluZSgpIHx8ICFkdC5waXZvdGFsTGF5b3V0KSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LXUtc29ydGFibGUnOiBzb3J0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWlzLWFjdGl2ZSc6IGlzU29ydGVkKCksXG4gICAgICAgICAgICAgICAgICAgICdkdC1pcy1oaWRkZW4nOiAhaXNWaXNpYmxlfVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgW2F0dHIuYWxpZ25dPVwiYWxpZ25cIlxuICAgICAgICBbYXR0ci50YWJpbmRleF09XCJzb3J0YWJsZSA/IDEgOiBudWxsXCJcbiAgICAgICAgW2R0TWF4V2lkdGhdPVwibWF4V2lkdGhQeFwiXG4gICAgPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJkdC5oZWFkZXJGaWx0ZXJUZW1wbGF0ZSAmJiBjb2x1bW5JbmRleCA9PT0gMCBcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5oZWFkZXJGaWx0ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwhLS1cbiAgICAgICAgICAgIHdoZW4gY2VsbCBhcmUgc2VsZWN0YWJsZSB3ZSBuZWVkIHR3byB2ZXJzaW9uIHdoZXJlIG9uZSB3cmFwIHRoZSBjZWxsIGNvbnRlbnQgaW4gZGl2XG4gICAgICAgIC0tPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNIZWFkZXJTZWxlY3RhYmxlKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RhYmxlSGVhZGVyQ2VsbDsgY29udGV4dDogeyRpbXBsaWNpdDogdGhpc31cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc0hlYWRlclNlbGVjdGFibGUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vblNlbGVjdGFibGVIZWFkZXJDZWxsOyBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90aD5cblxuICAgIDx0aCAjaGVhZGVyQ2VsbDIgW2NsYXNzXT1cImhlYWRlclN0eWxlQ2xhc3N8fHN0eWxlQ2xhc3NcIiAqbmdJZj1cImlzU3ViSGVhZGVyXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgICAgICBbYXR0ci5hbGlnbl09XCJhbGlnblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnZHQtaXMtZGVmYXVsdCBkdC1jZWxsLWRlZiBkdC1zdWItaGVhZGVyIGR0LXUtdW5zZWxlY3RhYmxlLXRleHQnOnRydWV9XCJcbiAgICAgICAgW2R0TWF4V2lkdGhdPVwibWF4V2lkdGhQeFwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXRpdGxlXCIgKm5nSWY9XCJkdC5zaG93U3ViSGVhZGVyICYmIHN1YkhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3ViSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC90aD5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFRlbXBsYXRlIGZvciB0aGUgYm9keSA9IHRoZSBURC4gRm9yIHRoZSBib2R5IGFuZCB3ZSBtaWdodCB3YW50IHRvIGRvIHRoZSBzYW1lIGZvciBoZWFkZXIgd2VcbiAgICBhbGxvdyB0byBoYXZlIGNhbGN1bGF0ZWQgYm9keSBjbGFzcyB0aGF0IGNvbWVzIGZyb20gdGhlIGFwcGxpY2F0aW9uLiBTbyBiYXNlZCBvbiB0aGUgZGF0YSB0eXBlc1xuICAgIHlvdSBtaWdodCB3YW50IHRvIGFwcGx5IGRpZmZlcmVudCBjbGFzcyBpbiBvcmRlciB0byBhcHBseSBjdXN0b20gc3R5bGluZy5cbi0tPlxuPG5nLXRlbXBsYXRlICNjb2xCb2R5IGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8dGQgI2NlbGwgW2NsYXNzXT1cImR5bmFtaWNCb2R5Q2xhc3MoZGF0YSlcIlxuICAgICAgICAoY2xpY2spPVwiZHQub25DZWxsU2VsZWN0aW9uQ2hhbmdlKGNlbGwsIHRoaXMsIGRhdGEpXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgICAgICBbYXR0ci5hbGlnbl09XCJhbGlnblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2R0LWlzLWRlZmF1bHQnOiB0cnVlLFxuICAgICAgICAnZHQtY2VsbC1kZWYnOiAhaXNDZWxsU2VsZWN0YWJsZShkYXRhKSxcbiAgICAgICAgJ2R0LWlzLWhpZGRlbic6ICFpc1Zpc2libGV9XCJcbiAgICAgICAgW2R0TWF4V2lkdGhdPVwibWF4V2lkdGhQeFwiXG4gICAgICAgID5cblxuICAgICAgICA8IS0tXG4gICAgICAgICAgICBTaW5jZSB3ZSBuZWVkIHRvIHN1cHBvcnQgY2VsbCBzZWxlY3Rpb24gd2hlbiB3ZSBuZWVkIHRvIGRyYXcgYm9yZGVyIGFyb3VuZCBpdFxuICAgICAgICAgICAgV2UgYXJlIHdyYXBwaW5nIHN1Y2ggc2VsbHMgd2l0aCBkaXYgd2hpY2ggZ2l2ZXMgdXMgYmV0dGVyIGZsZXhpYmlsaXR5XG4gICAgICAgIC0tPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNDZWxsU2VsZWN0YWJsZShkYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGFibGVCb2R5Q2VsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleCB9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc0NlbGxTZWxlY3RhYmxlKGRhdGEpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9uU2VsZWN0YWJsZUJvZHlDZWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8L3RkPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLVxuICAgIFRvZG86IGNyZWF0ZSBiZXR0ZXIgc29sdXRpb24gaW5zdGVhZCBvZiB1c2luZyBkaWZmZXJlbnQgdGVtcGxhdGUgY3JlYXRlIGRpcmVjdGl2ZSB0aGF0IHdyYXBzXG4gICAgaXQgd2l0aCB0aGUgZGl2IGNvbmRpdGlvbmFsbHlcbi0tPlxuPG5nLXRlbXBsYXRlICNzZWxlY3RhYmxlSGVhZGVyQ2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImR0LWNlbGwtZGVmLXNlbGVjdGFibGVcIlxuICAgICAgICAgW25nQ2xhc3NdPVwieydkdC1jZWxsLXNlbGVjdGVkJzogZHQuaXNIZWFkZXJTZWxlY3RlZCh0aGlzKX1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlckNlbGxDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNub25TZWxlY3RhYmxlSGVhZGVyQ2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNoZWFkZXJDZWxsQ29udGVudCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXRpdGxlXCIgKm5nSWY9XCJzaG93Q29sdW1uTGFiZWwgJiYgIWhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAge3tsYWJlbH19XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtdGl0bGVcIiAqbmdJZj1cInNob3dDb2x1bW5MYWJlbCAmJiBoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCByb3dEYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXggfVwiPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC1zb3J0YWJsZS1pY29uIHNhcC1pY29uIGljb24tc29ydFwiICpuZ0lmPVwic29ydGFibGVcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaWNvbi1zb3J0LWRlc2NlbmRpbmcnOiAoZ2V0U29ydE9yZGVyKCkgPT0gLTEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ljb24tc29ydC1hc2NlbmRpbmcnOiAoZ2V0U29ydE9yZGVyKCkgPT0gMSl9XCI+XG4gICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI3NlbGVjdGFibGVCb2R5Q2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxkaXYgY2xhc3M9XCJkdC1jZWxsLWRlZi1zZWxlY3RhYmxlXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsnZHQtY2VsbC1zZWxlY3RlZCc6IGR0LmlzQm9keUNlbGxTZWxlY3RlZCh0aGlzLCBkYXRhKX1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjbm9uU2VsZWN0YWJsZUJvZHlDZWxsIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNib2R5Q2VsbENvbnRlbnQgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8IS0tXG4gICAgICAgICAgIHdoZW4gbm8gdGVtcGxhdGUgaXMgdXNlZCB1c2Ugb3VyIEZpZWxkUGF0aCB0byBhY2Nlc3MgdGhlIG9iamVjdCB2YWx1ZSBiYXNlZCBvbiB0aGVcbiAgICAgICAgICAga2V5IGJpbmRpbmdcbiAgICAgICAgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtY2VsbC1kYXRhXCIgKm5nSWY9XCIhYm9keVRlbXBsYXRlXCI+XG4gICAgICAgICAgICB7e2R0LmdldFZhbHVlKGRhdGEsIGtleSl9fVxuICAgICAgICA8L3NwYW4+XG5cblxuICAgIDwhLS1cbiAgICAgICAgSW4gY2FzZSBhcHBsaWNhdGlvbiB3YW50cyB0byBwcm92aWRlIHRoZWlyIG93biBjZWxsIGNvbXBvbmVudCB0aGV5IHVzZVxuICAgICAgICAjYm9keSBuZy10ZW1wbGF0ZSB0byBkbyBzby5cbiAgICAtLT5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC1jZWxsLWRhdGFcIiAqbmdJZj1cImJvZHlUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlUZW1wbGF0ZTtcbiAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC5kdC1zb3J0YWJsZS1jb2x7Y3Vyc29yOnBvaW50ZXJ9LmR0LWNvbC1zb3J0YWJsZS1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0Oi4xMjVlbX10aC5kdC1jZWxsLWRlZntmb250LXdlaWdodDo0MDA7Y29sb3I6IzRhNGE0YX10aC5kdC1pcy1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2YyZjJmMjt3aGl0ZS1zcGFjZTpub3dyYXB9dGguZHQtaXMtZGVmYXVsdC5kdC1jZWxsLWRlZjpub3QoLmR0LXN1Yi1oZWFkZXIpe2JvcmRlci1ib3R0b20tY29sb3I6I2YyZjJmMn10aC5kdC1zdWItaGVhZGVye2JhY2tncm91bmQtY29sb3I6I2ZmZn10aCAuZHQtY2VsbC1zZWxlY3RlZHtib3JkZXItY29sb3I6IzU4Yjk1N310ZCAuZHQtY2VsbC1zZWxlY3RlZHtib3JkZXItbGVmdC1jb2xvcjojNGY5ZmNmfS5kdC1yb290LXNlY3Rpb24gLmR0LXNlbGVjdGlvbi1jb2x1bW4sLmR0LXNlbGVjdGlvbi1jb2x1bW57d2lkdGg6NDZweDtwYWRkaW5nOjAgMTJweH0uZHQtcGl2b3QtbGF5b3V0IHRkLmR0LXNlbGVjdGlvbi1jb2x1bW4sdGguZHQtc2VsZWN0aW9uLWNvbHVtbntib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9dGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGh7Ym9yZGVyLXRvcC1jb2xvcjp0cmFuc3BhcmVudH10Ym9keSB0cjpsYXN0LWNoaWxkOm5vdCguZHQtZHJhZy1yb3ctYm90dG9tKSB0ZHtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50fXRkOmZpcnN0LWNoaWxkLHRoOmZpcnN0LWNoaWxke2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50fXRkOmxhc3QtY2hpbGQsdGg6bGFzdC1jaGlsZHtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9dGJvZHkgLmR0LWRyYWctcm93LXRvcD50ZHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgwZGVnLCNmZmYgMCwjZmZmIDk3JSwjMDI3MWQyIDEwMCUpfXRib2R5IC5kdC1kcmFnLXJvdy1ib3R0b20+dGR7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCNmZmYgMCwjZmZmIDk3JSwjMDI3MWQyIDEwMCUpfXRib2R5IC5kdC1kcmFnLXJvdy1ib3RoPnRke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDBkZWcsIzAyNzFkMiAwLCNmZmYgMyUsI2ZmZiA5NyUsIzAyNzFkMiAxMDAlKX10Ym9keSAuZHQtcm93LWRyYWdnaW5nPnRke2JhY2tncm91bmQtY29sb3I6I2VjZWNlYztjb2xvcjojYjliOWI5fXRib2R5IC5kdC1yb3ctZHJhZ2dpbmcgLnVpLXN0YXRlLWFjdGl2ZXtvcGFjaXR5Oi41O2N1cnNvcjpub3QtYWxsb3dlZH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRDb2x1bW4yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcbiAgICAvKipcbiAgICAgKiBDb2x1bW4gaGVhZGVyIGxhYmVsLlxuICAgICAqXG4gICAgICogT3IgeW91IGNhbiB1c2UgaGVhZGVyVGVtcGxhdGUgdG8gZGVmaW5lIHlvdXIgb3duIHRlbXBsYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCBmaWVsZCBuYW1lIHRvIHJlYWQgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBrZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2VsbCBhbGlnbm1lbnQuIEl0IGluc2VydHMgcmVndWxhciBhbGlnbiBhdHRyaWJ1dGUgdG8gdGhlIHRhYmxlIGNlbGxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxpZ246IERUSEFsaWdubWVudCA9ICdsZWZ0JztcblxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGR5bmFtaWMgY2xhc3MgYmFzZWQgb24gZGF0YSBhbmQgdGhlbiBpdHMgYWRkZWQgdG8gdGhlIHRhYmxlIGNlbGwgVERcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlDbGFzc0ZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiBmYWxzZSBhcHBsaWVzIGR0LWlzLWhpZGRlbiBzdHlsZSB0aGF0IGhpZGVzIHRoZSBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIE1hcmtzIGNvbHVtbiBhcyBzb3J0YWJsZSB3aGljaCBtZWFucyBzb3J0aW5nIGljb24gaXMgYWRkZWQgdG8gdGhlIGhlYWRlciB3aXRoIHNwZWNpYWxcbiAgICAgKiBzb3J0aW5nIGhhbmRsaW5nXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzb3J0YWJsZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogU29ydGluZyBkaXJlY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc29ydE9yZGVyaW5nOiBzdHJpbmcgPSAnZGVzY2VuZGluZyc7XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB0aGUgdGVtcGxhdGUgaWYgd2hldGhlciB0byByZW5kZXIgYSBsYWJlbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Q29sdW1uTGFiZWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1N1YkhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0YXRpYyBjbGFzcyB0aGF0IGlzIGFkZGVkIHRvIHRoZSBUSCBpbnRvIHRoZSBoZWFkZXIuIEl0IGRvZXMgbm90IHJlbHkgb24gZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0YXRpYyBjbGFzcyB0aGF0IGlzIGFkZGVkIHRvIHRoZSB0ZCBpbnRvIHRoZSBib2R5LiBJdCBkb2VzIG5vdCByZWx5IG9uIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keVN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCB0b2dldGhlciB3aXRoIGNlbGwgc2VsZWN0aW9uTW9kZSB0byB0ZWxsIHdoaWNoIGNvbHVtbiBpcyBzZWxlY3RhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIEhFQURFUiB0ZW1wbGF0ZSBmb3IgY3VycmVudCBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIFN1YkhlYWRlciB0ZW1wbGF0ZSBmb3IgY3VycmVudCBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsU3ViSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBnbG9iYWxseSBkZWZpbmVkIGJvZHkgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlR2xvYmFsQm9keTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSBjb2x1bW4gaXMgZGF0YSBjb2x1bW4gIC0gaWYgaXQgaXMgcmVuZGVyaW5nIGRhdGEgb3IganVzdCBhIGxhYmVsIG9yIHNvbWVcbiAgICAgKiBjb250cm9sXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGltcG9ydGFudCB3aGVuIGNhbGN1bGF0aW5nIGEgY29sdW1uIHNwYW4gYW5kIHdlIG5lZWQgdG8ga25vdyB3aGljaCBjb2x1bW5zIGFyZSBvclxuICAgICAqIHdpbGwgYmUganVzdCBmb3Igc2VsZWN0aW9uIGNvbnRyb2xzIGFuZCB3aGljaCBob2xkcyBkYXRhXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc0RhdGFDb2x1bW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBjb2x1bW4gdGhhdCB3aWxsIG5vdCBzY3JvbGwgaG9yaXpvbnRhbGx5IHdpdGggb3RoZXIgY29sdW1ucy4gQ29sdW1uIGlzXG4gICAgICogZnJvemVuLlxuICAgICAqXG4gICAgICogRm9yIHN1Y2ggY29sdW1ucyB0aGF0IGFyZSBtYXJrZWQgYXMgZnJvemVuIGJpbmRpbmcgW3dpZHRoXSBpcyByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZnJvemVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBNYXggV2lkdGggZm9yIHRoZSBURC4gRXZlbiBURCBkb2VzIG5vdCBzdXBwb3J0IHdlIGNhbGN1bGF0ZSB0aGUgY29udGVudCB3aWR0aFxuICAgICAqIGZvciBlYWNoIGNlbGwgYW5kIHRoZW4gZGVjaWRlIGlmIHdlIG5lZWQgdG8gZW5sYXJnZSB0aGUgY29sdW1uLlxuICAgICAqXG4gICAgICogQEV4cGVyaW1hbnRhbCBiaW5kaW5nIHRoYXQgaXMgY3VycmVudGx5IHdvcmtpbmcgaWYgdGhlIGNvbnRlbnQgb2YgdGhlIGNlbGwgaXMgaW5saW5lXG4gICAgICogZWxlbWVudCB3aGVyZSB3ZSBjYW4gY29udHJvbCB3aGl0ZXNwYWNlIHdyYXBwaW5nIGluIG9yZGVyIHRvIGZpbmQgb3V0IHRoZSByZWFsIHdpZHRoXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtYXhXaWR0aDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtaW5XaWR0aCBvbiB0aGUgY2VsbC4gQWdhaW4ganVzdCBsaWtlIG1heFdpZHRoIGNzcyBwcm9wZXJseSBpcyBub3Qgc3VwcG9ydGVkIG9uXG4gICAgICogdGhlIHRhYmxlIHNvIHRoZXJlIGlzIGEgd29ya2Fyb3VuZCB3aGVyZSB3ZSBjcmVhdGUgYWRkaXRpb25hbCByb3cgdGhhdCBzZXRzIHBhZGRpbmcgcmlnaHRcbiAgICAgKiBhbmQgdGhpcyB3aWxsIHByZXZlbnQgdGhlIGNvbHVtbiB0byBjb2xsYXBzZSB1bmRlciBzcGVjaWZpZWQgd2lkdGhcbiAgICAgKlxuICAgICAqIHRvZG86IHN0aWxsIFRCRFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWluV2lkdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE1haW4gcmVuZGVyaW5nIHRlbXBsYXRlIHVzZWQgYnkgZGF0YXRhYmxlIHRvIHJlbmRlciBlYWNoIGNvbHVtbi5cbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdyZW5kZXJpbmdUZW1wbGF0ZScpXG4gICAgcmVuZGVyZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBoZWFkZXIgdGVtcGxhdGUuIEl0IHdpbGwgb3ZlcnJpZGUgcHJvdmlkZWQgbGFiZWxcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXInKVxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIHN1YkhlYWRlciB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdzdWJIZWFkZXInKVxuICAgIHN1YkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGJvZHkgdGVtcGxhdGUgdGhhdCB3aWxsIG92ZXJyaWRlIHJlYWQgdmFsdWUgZnJvbSB0aGUgW2tleV0gYmluZGluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JvZHknKVxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuLi5cbiAgICAgKi9cbiAgICBzb3J0T3JkZXI6IG51bWJlcjtcbiAgICBtYXhXaWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIG1pbldpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgd2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICB3aWRlc3RDZWxsOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIERhdGF0YWJsZSBJbXBsZW1lbnRhdGlvbnNcbiAgICAgKi9cbiAgICBkdDogQVdEYXRhVGFibGU7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5rZXkpICYmIGlzQmxhbmsodGhpcy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBiaW5kaW5nOiAnICtcbiAgICAgICAgICAgICAgICAnW2tleV0gb3IgW2xhYmVsXSBiaW5kaW5ncyBtdXN0IGJlIHVzZWQgYXQgbWluaW11bScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG8gYmUgYWJsZSB0byBwb3NpdGlvbiBzZWNvbmQgRFQgd2UgcmVxdWlyZSBbd2lkdGhdIHRvIGJlIHNldCBhcyB3ZWxsXG4gICAgICAgIGlmICh0aGlzLmZyb3plbiAmJiBpc0JsYW5rKHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYmluZGluZyBbd2lkdGhdOiAnICtcbiAgICAgICAgICAgICAgICAnd2hlbiBbZnJvemVuXT10cnVlIHRoZW4gW3dpZHRoXSBiaW5kaW5nIG5lZWRzIHRvIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gbmVlZCB0byBkZWZmZXIgdGhpcyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG90aGVyd2lzZSBJIGdldFxuICAgICAgICAvLyB2YWx1ZSB3YXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZCBlcnJvclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIC8vIHtcblxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gY2VsbCBzZWxlY3Rpb25Nb2RlIGlzIGVuYWJsZWQgdGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gd2UgY2xpY2sgb24gaGVhZGVyLlxuICAgICAqIEl0IGRlbGVnYXRlcyB0aGUgY2FsbCB0byB0aGUgRFQgd2hlcmUgaXQgdG9nZ2xlcyBjdXJyZW50bHkgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhbmRsZUhlYWRlckNsaWNrKGV2ZW50OiBhbnksIGVsZW1lbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzSGVhZGVyU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVG9kbzogSW1wbGVtZW50IG91ciBvd24gc29ydGluZyBtZWNoYW5pc20gb25jZSB3ZSBleHRyYWN0IHRoZSBzb3J0aW5nIGxvZ2ljIHRvIGl0cyBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnQoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHRhcmdldE5vZGUsICdkdC11LXNvcnRhYmxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXRpdGxlJykgfHxcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtY29sLXNvcnRhYmxlLWljb24nKSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5kdC5zb3J0Q29sdW1uLmtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXJpbmcgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0Zvck51bWJlcih0aGlzLnNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5zb3J0Q29sdW1uID0gdGhpcztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLnNvcnRLZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLnNvcnRPcmRlcmluZyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHQuc29ydFNpbmdsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHQudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlZCBzdHlsZSBjbGFzcyBiYXNlZCBvbiBkYXRhXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGR5bmFtaWNCb2R5Q2xhc3MoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGR5bkNsYXNzID0gaXNQcmVzZW50KHRoaXMuYm9keUNsYXNzRm4pXG4gICAgICAgICAgICA/IHRoaXMuYm9keUNsYXNzRm4uYXBwbHkodGhpcy5kdC5jb250ZXh0LCBbdGhpcywgaXRlbV0pIDogJyc7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmJvZHlTdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgZHluQ2xhc3MgKz0gJyAnICsgdGhpcy5ib2R5U3R5bGVDbGFzcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLnN0eWxlQ2xhc3MpKSB7XG4gICAgICAgICAgICBkeW5DbGFzcyArPSAnICcgKyB0aGlzLnN0eWxlQ2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHluQ2xhc3M7XG4gICAgfVxuXG5cbiAgICBpc1Jvd1NlbGVjdGFibGUoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LmlzUm93U2VsZWN0YWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmR0LmlzUm93U2VsZWN0YWJsZShpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0NlbGxTZWxlY3RhYmxlKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdjZWxsJyAmJiB0aGlzLmlzUm93U2VsZWN0YWJsZShpdGVtKSAmJiB0aGlzLnNlbGVjdGFibGU7XG5cbiAgICB9XG5cblxuICAgIGlzSGVhZGVyU2VsZWN0YWJsZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnY2VsbCcgJiYgdGhpcy5zZWxlY3RhYmxlO1xuXG4gICAgfVxuXG5cbiAgICBnZXRTb3J0T3JkZXIoKVxuICAgIHtcbiAgICAgICAgbGV0IG9yZGVyID0gMDtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5rZXkgPT09IHRoaXMuZHQuc29ydENvbHVtbi5rZXkpIHtcbiAgICAgICAgICAgIG9yZGVyID0gdGhpcy5kdC5zb3J0Q29sdW1uLnNvcnRPcmRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMua2V5ID09PSB0aGlzLmR0LnNvcnRDb2x1bW4ua2V5O1xuICAgIH1cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kdCA9IHRhYmxlO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5pbml0aWFsU29ydEtleSkgJiYgdGhpcy5kdC5pbml0aWFsU29ydEtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLmR0LnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmR0LmluaXRpYWxTb3J0T3JkZXIpO1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0Q29sdW1uID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuYm9keVRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVRlbXBsYXRlID0gdGhpcy5kdC5ib2R5VGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbEhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuaGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN1YkhlYWRlclRlbXBsYXRlKSAmJiB0aGlzLnVzZUdsb2JhbFN1YkhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5zdWJIZWFkZXJUZW1wbGF0ZSA9IHRoaXMuZHQuc3ViSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmJvZHlDbGFzc0ZuKSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3NGbiA9IHRoaXMuZHQuYm9keUNsYXNzRm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1heFdpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLm1heFdpZHRoKTtcbiAgICAgICAgdGhpcy5taW5XaWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy5taW5XaWR0aCk7XG4gICAgICAgIHRoaXMud2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMud2lkdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoZSB2aWV3IGluaXQgY3ljbGUgZnJvbSB0aGUgZHQubmdBZnRlclZpZXdDaGVja2VkLlxuICAgICAqXG4gICAgICogSW4gY2FzZSB3ZSB1c2UgTWF4V2lkdGggZGlyZWN0aXZlIHdlIHNldCBuZXcgd2lkdGggb25jZSBmb3IgYWxsIGNvbHVtc25cbiAgICAgKi9cbiAgICBwb3N0SW5pdGlhbGl6ZShteUluZGV4OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IG15SW5kZXggKyAxO1xuICAgICAgICBsZXQgdGFibGU7XG5cbiAgICAgICAgaWYgKHRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICB0YWJsZSA9ICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbFxuICAgICAgICAgICAgICAgIC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LWZyb3plbiB0YWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFibGUgPSAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy53aWRlc3RDZWxsID4gMCkge1xuICAgICAgICAgICAgbGV0IGFsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyIHRoOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKSwgJyArXG4gICAgICAgICAgICAgICAgJ3RyIHRkOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKScpLmZvckVhY2goKG5vZGU6IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gdGhpcy53aWRlc3RDZWxsICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBZb3UgZWl0aGVyIHVzZSB0aGlzIGJpbmRpbmcgZGlyZWN0bHkgYW5kIHNheSBpdHMgZGF0YWNvbHVtbiBvciB3aGVuIHRoZXJlIGlzIGEgW2tleV1cbiAgICAgKiBiaWRpbmcgd2Uga25vdyBpdCByZWZlcnMgdG8gc29tZSBmaWVsZC5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzVmFsdWVDb2x1bW4oKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5pc0RhdGFDb2x1bW4pICYmIEJvb2xlYW5XcmFwcGVyLmlzVHJ1ZSh0aGlzLmlzRGF0YUNvbHVtbikpIHx8XG4gICAgICAgICAgICBpc1ByZXNlbnQodGhpcy5rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIGluIG91dGxpbmUgbW9kZSAgd2UgbmVlZCB0byBhbHNvIGluZGVuZCBlYWNoIHNlbGVjdGlvbiBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgICAqXG4gICAgICogaW5kZW50IC0gMSA+IG9ubHkgb2Zmc2V0IHdpdGhcbiAgICAgKiBpbmRlbnRcbiAgICAgKi9cbiAgICBpbmRlbnRGb3JDb250cm9sKGNlbGw6IGFueSwgbGV2ZWw6IG51bWJlcik6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuaXNPdXRsaW5lKCkgJiYgbGV2ZWwgPiAwICYmIGNlbGwub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGxldCBvdXRsaW5lTm9kZVBhZGRpbmcgPVxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcpLnBhZGRpbmdMZWZ0KSB8fCAwO1xuXG4gICAgICAgICAgICAvLyAxc3QgbGV2ZWwgaXMgcHVzaGVkIGFzIHJvb3RcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnB1c2hSb290U2VjdGlvbk9uTmV3TGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobGV2ZWwgPT09IDEpID8gbnVsbCA6ICh0aGlzLmR0LmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbClcbiAgICAgICAgICAgICAgICAgICAgLSBvdXRsaW5lTm9kZVBhZGRpbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5kdC5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpICsgb3V0bGluZU5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbnRlcm5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgd2lkdGhUb1B4KHdpZHRoOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBweDtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aWR0aCkpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC5pbmRleE9mKCclJykgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9uUGMgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgICAgICBweCA9IG5vblBjICogKDxEYXRhdGFibGUyQ29tcG9uZW50PnRoaXMuZHQpLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHB4ID0gcGFyc2VGbG9hdCh3aWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHg7XG4gICAgfVxufVxuXG4iXX0=