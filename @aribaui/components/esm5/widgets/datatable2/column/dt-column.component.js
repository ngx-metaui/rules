/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        /** @type {?} */
        var targetNode = event.target;
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
        /** @type {?} */
        var dynClass = isPresent(this.bodyClassFn)
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
        /** @type {?} */
        var order = 0;
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
        /** @type {?} */
        var colIndex = myIndex + 1;
        /** @type {?} */
        var table;
        if (this.dt.hasFrozenColumns()) {
            table = (/** @type {?} */ (this.dt)).el
                .nativeElement.querySelector('.dt-body-frozen table');
        }
        else {
            table = (/** @type {?} */ (this.dt)).el.nativeElement.querySelector('table');
        }
        if (this.widestCell > 0) {
            /** @type {?} */
            var all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
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
            /** @type {?} */
            var outlineNodePadding = parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;
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
        /** @type {?} */
        var px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                /** @type {?} */
                var nonPc = parseFloat(width) / 100;
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
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler],
                    styles: [".dt-sortable-col{cursor:pointer}.dt-col-sortable-icon{display:inline-block;margin-left:.125em}th.dt-cell-def{font-weight:400;color:#4a4a4a}th.dt-is-default{background-color:#f2f2f2;white-space:nowrap}th.dt-is-default.dt-cell-def:not(.dt-sub-header){border-bottom-color:#f2f2f2}th.dt-sub-header{background-color:#fff}th .dt-cell-selected{border-color:#58b957}td .dt-cell-selected{border-left-color:#4f9fcf}.dt-root-section .dt-selection-column,.dt-selection-column{width:46px;padding:0 12px}.dt-pivot-layout td.dt-selection-column,th.dt-selection-column{border-right-color:transparent}thead tr:first-child th{border-top-color:transparent}tbody tr:last-child:not(.dt-drag-row-bottom) td{border-bottom-color:transparent}td:first-child,th:first-child{border-left-color:transparent}td:last-child,th:last-child{border-right-color:transparent}tbody .dt-drag-row-top>td{background:linear-gradient(0deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-bottom>td{background:linear-gradient(180deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-both>td{background:linear-gradient(0deg,#0271d2 0,#fff 3%,#fff 97%,#0271d2 100%)}tbody .dt-row-dragging>td{background-color:#ececec;color:#b9b9b9}tbody .dt-row-dragging .ui-state-active{opacity:.5;cursor:not-allowed}"]
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5Q0gsOENBQWE7SUFrTWpELDRCQUFtQixHQUFnQixFQUNoQjtRQURuQixZQUdJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZ0JBQVUsR0FBVixVQUFVOzs7Ozs7c0JBN0tQLE1BQU07Ozs7OzswQkFlUCxJQUFJOzs7Ozs2QkFjRixZQUFZOzs7OztnQ0FPUixJQUFJOzs7Ozs7OEJBUU4sS0FBSzs7Ozs7OzJCQXVCUixLQUFLOzs7OztnQ0FPQSxJQUFJOzs7OzttQ0FPRCxJQUFJOzs7Ozs4QkFPVCxJQUFJOzs7Ozs7Ozs2QkFXTCxJQUFJOzs7Ozs7Ozt1QkFVVixLQUFLOzJCQW9ERixDQUFDOzJCQUNELENBQUM7d0JBQ0osQ0FBQzsyQkFDRSxDQUFDOztLQVlyQjs7OztJQUdELHFDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxD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LEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDOzs7Z0JBamRqQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLGc3UUFBdUM7b0JBRXZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7O2lCQUUxQjs7OztnQkExQ3VCLFdBQVc7Z0JBRTNCLFVBQVU7Ozt3QkFnRGIsS0FBSztzQkFNTCxLQUFLO3dCQVFMLEtBQUs7OEJBT0wsS0FBSzs0QkFRTCxLQUFLOzJCQU9MLEtBQUs7K0JBT0wsS0FBSztrQ0FPTCxLQUFLO2dDQVFMLEtBQUs7bUNBUUwsS0FBSztpQ0FPTCxLQUFLOzZCQVFMLEtBQUs7a0NBT0wsS0FBSztxQ0FPTCxLQUFLO2dDQU9MLEtBQUs7K0JBV0wsS0FBSzt5QkFVTCxLQUFLOzJCQVVMLEtBQUs7MkJBV0wsS0FBSzttQ0FNTCxTQUFTLFNBQUMsbUJBQW1CO2lDQU03QixZQUFZLFNBQUMsUUFBUTtvQ0FNckIsWUFBWSxTQUFDLFdBQVc7K0JBTXhCLFlBQVksU0FBQyxNQUFNOzs2QkF6UHhCO0VBMEV3QyxhQUFhO1NBQXhDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgSW5wdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBV0RhdGFUYWJsZX0gZnJvbSAnLi4vYXctZGF0YXRhYmxlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtCb29sZWFuV3JhcHBlciwgRW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuXG5cbmV4cG9ydCB0eXBlIERUSEFsaWdubWVudCA9ICdsZWZ0JyB8ICdjZW50ZXInIHwgJ3JpZ2h0JztcblxuXG4vKipcbiAqIERUQ29sdW1uIHJlcHJlc2VudCBzaW5nbGUgY29sdW1uIGluY2x1ZGluZyBoZWFkZXIgYW5kIGl0cyBib2R5LiBFYWNoIGNvbHVtbiBoYXMgaXRzIG93blxuICogcmVuZGVyZXJUZW1wbGF0ZSB3aGljaCBhIGVudHJ5IHRvIHRoaXMgY29tcG9uZW50LlxuICpcbiAqIEtlZXBpbmcgdGhpcyBzZXBhcmF0ZSBmcm9tIHRoZSBkYXRhdGFibGUgd2hlcmUgRFQgaXMgbm90IHJlYWxseSBhd2FyZSB3aGF0IGl0IGlzIHJlbmRlcmluZyxcbiAqIGl0IGFsbG93cyB1cyBtb3JlIGZsZXhpYmlsaXR5IGluIHRlcm1zIG9mIGRpZmZlcmVudCB0eXBlIG9mIGNvbHVtbiBpbmhlcml0aW5nIGZyb20gdGhpc1xuICogb25lLi4gU3VjaCBhczpcbiAqICBEVFJvd0RldGFpbCAgY29sdW1uXG4gKiAgRFRTaW5nbGVTZWxlY3Rpb24gY29sdW1uXG4gKiAgRFRNdWx0aVNlbGVjdGlvbiBjb2x1bW5cbiAqXG4gKiBUaGlzIHdheSB3ZSBkb24ndCBkbyBJRi9USEVOL0VMU0UgaW5zaWRlIHRoZSBkYXRhdGFibGUgYW5kIHRyeWluZyB0byBjcmVhdGUgZGlmZmVyZW50IGNhc2VzLlxuICpcbiAqICBUaGVuIGxhdGVyIG9uIHRoaXMgd2lsbCBsZXQgdXMgY3JlYXRlIGFkZGl0aW9uYWwgbG9naWMgZm9yIHRoZSBwaXZvdGFsIGxheW91dC4gQmVjYXVzZSBEVFxuICogIGRvZXMga25vdyBhbnl0aGluZyBhYm91dCB0aGUgdHlwZSBvZiB0aGUgY29sdW1uIHNvIHdoYXRldmVyIGlzIGFkZGVkIHRvIHRoZSBEVC5jb2x1bW5zIGl0XG4gKiAgd2lsbCBiZSByZW5kZXJlZC5cbiAqXG4gKlxuICogIENvbHVtbnMgY2FuIGJlIGFsc28gZnJvemVuIG1lYW5pbmcgaWYgdGhlIGNvbnRlbnQgb3ZlcmZsb3dzIHRoZXkgZG9udCBzY3JvbGwuIFRvIG1ha2UgdGhlXG4gKiAgY29sdW1uIGZyb3plbiB3ZSBuZWVkIHRvIHVzZSBbZnJvemVuXSBiaW5kaW5nIGFuZCBzZSBpdCB0byBUUlVFIHBsdXMgaXQgcmVxdWlyZXMgYSBbd2lkdGhdXG4gKiAgYmluZGluZyB0byBiZSBzZXQgKGluIHB4KS5cbiAqICBXZSBuZWVkIHRoaXMgdG8gYmUgYWJsZSB0byBwcm9wZXJseSBwb3NpdGlvbiB0aGUgc2Vjb25kIHRhYmxlIHdoaWNoIGlzIGNoYW5nZWQgdG8gYWJzb2x1dGVcbiAqICBwb3NpdGlvbmluZy5cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kdC1jb2x1bW4yJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2R0LWNvbHVtbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2R0LWNvbHVtbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVENvbHVtbjJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdFxue1xuICAgIC8qKlxuICAgICAqIENvbHVtbiBoZWFkZXIgbGFiZWwuXG4gICAgICpcbiAgICAgKiBPciB5b3UgY2FuIHVzZSBoZWFkZXJUZW1wbGF0ZSB0byBkZWZpbmUgeW91ciBvd24gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGZpZWxkIG5hbWUgdG8gcmVhZCBmcm9tIHRoZSBnaXZlbiBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDZWxsIGFsaWdubWVudC4gSXQgaW5zZXJ0cyByZWd1bGFyIGFsaWduIGF0dHJpYnV0ZSB0byB0aGUgdGFibGUgY2VsbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbjogRFRIQWxpZ25tZW50ID0gJ2xlZnQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgZHluYW1pYyBjbGFzcyBiYXNlZCBvbiBkYXRhIGFuZCB0aGVuIGl0cyBhZGRlZCB0byB0aGUgdGFibGUgY2VsbCBURFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keUNsYXNzRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElmIGZhbHNlIGFwcGxpZXMgZHQtaXMtaGlkZGVuIHN0eWxlIHRoYXQgaGlkZXMgdGhlIGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogTWFya3MgY29sdW1uIGFzIHNvcnRhYmxlIHdoaWNoIG1lYW5zIHNvcnRpbmcgaWNvbiBpcyBhZGRlZCB0byB0aGUgaGVhZGVyIHdpdGggc3BlY2lhbFxuICAgICAqIHNvcnRpbmcgaGFuZGxpbmdcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNvcnRhYmxlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTb3J0aW5nIGRpcmVjdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzb3J0T3JkZXJpbmc6IHN0cmluZyA9ICdkZXNjZW5kaW5nJztcblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSB0ZW1wbGF0ZSBpZiB3aGV0aGVyIHRvIHJlbmRlciBhIGxhYmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dDb2x1bW5MYWJlbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U3ViSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgc3RhdGljIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIFRIIGludG8gdGhlIGhlYWRlci4gSXQgZG9lcyBub3QgcmVseSBvbiBkYXRhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgc3RhdGljIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIHRkIGludG8gdGhlIGJvZHkuIEl0IGRvZXMgbm90IHJlbHkgb24gZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHRvZ2V0aGVyIHdpdGggY2VsbCBzZWxlY3Rpb25Nb2RlIHRvIHRlbGwgd2hpY2ggY29sdW1uIGlzIHNlbGVjdGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgSEVBREVSIHRlbXBsYXRlIGZvciBjdXJyZW50IGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgU3ViSGVhZGVyIHRlbXBsYXRlIGZvciBjdXJyZW50IGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxTdWJIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgYm9keSB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxCb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgdGhlIGNvbHVtbiBpcyBkYXRhIGNvbHVtbiAgLSBpZiBpdCBpcyByZW5kZXJpbmcgZGF0YSBvciBqdXN0IGEgbGFiZWwgb3Igc29tZVxuICAgICAqIGNvbnRyb2xcbiAgICAgKlxuICAgICAqIFRoaXMgaXMgaW1wb3J0YW50IHdoZW4gY2FsY3VsYXRpbmcgYSBjb2x1bW4gc3BhbiBhbmQgd2UgbmVlZCB0byBrbm93IHdoaWNoIGNvbHVtbnMgYXJlIG9yXG4gICAgICogd2lsbCBiZSBqdXN0IGZvciBzZWxlY3Rpb24gY29udHJvbHMgYW5kIHdoaWNoIGhvbGRzIGRhdGFcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzRGF0YUNvbHVtbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGNvbHVtbiB0aGF0IHdpbGwgbm90IHNjcm9sbCBob3Jpem9udGFsbHkgd2l0aCBvdGhlciBjb2x1bW5zLiBDb2x1bW4gaXNcbiAgICAgKiBmcm96ZW4uXG4gICAgICpcbiAgICAgKiBGb3Igc3VjaCBjb2x1bW5zIHRoYXQgYXJlIG1hcmtlZCBhcyBmcm96ZW4gYmluZGluZyBbd2lkdGhdIGlzIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmcm96ZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIE1heCBXaWR0aCBmb3IgdGhlIFRELiBFdmVuIFREIGRvZXMgbm90IHN1cHBvcnQgd2UgY2FsY3VsYXRlIHRoZSBjb250ZW50IHdpZHRoXG4gICAgICogZm9yIGVhY2ggY2VsbCBhbmQgdGhlbiBkZWNpZGUgaWYgd2UgbmVlZCB0byBlbmxhcmdlIHRoZSBjb2x1bW4uXG4gICAgICpcbiAgICAgKiBARXhwZXJpbWFudGFsIGJpbmRpbmcgdGhhdCBpcyBjdXJyZW50bHkgd29ya2luZyBpZiB0aGUgY29udGVudCBvZiB0aGUgY2VsbCBpcyBpbmxpbmVcbiAgICAgKiBlbGVtZW50IHdoZXJlIHdlIGNhbiBjb250cm9sIHdoaXRlc3BhY2Ugd3JhcHBpbmcgaW4gb3JkZXIgdG8gZmluZCBvdXQgdGhlIHJlYWwgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1heFdpZHRoOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1pbldpZHRoIG9uIHRoZSBjZWxsLiBBZ2FpbiBqdXN0IGxpa2UgbWF4V2lkdGggY3NzIHByb3Blcmx5IGlzIG5vdCBzdXBwb3J0ZWQgb25cbiAgICAgKiB0aGUgdGFibGUgc28gdGhlcmUgaXMgYSB3b3JrYXJvdW5kIHdoZXJlIHdlIGNyZWF0ZSBhZGRpdGlvbmFsIHJvdyB0aGF0IHNldHMgcGFkZGluZyByaWdodFxuICAgICAqIGFuZCB0aGlzIHdpbGwgcHJldmVudCB0aGUgY29sdW1uIHRvIGNvbGxhcHNlIHVuZGVyIHNwZWNpZmllZCB3aWR0aFxuICAgICAqXG4gICAgICogdG9kbzogc3RpbGwgVEJEXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtaW5XaWR0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTWFpbiByZW5kZXJpbmcgdGVtcGxhdGUgdXNlZCBieSBkYXRhdGFibGUgdG8gcmVuZGVyIGVhY2ggY29sdW1uLlxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ3JlbmRlcmluZ1RlbXBsYXRlJylcbiAgICByZW5kZXJlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGhlYWRlciB0ZW1wbGF0ZS4gSXQgd2lsbCBvdmVycmlkZSBwcm92aWRlZCBsYWJlbFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlcicpXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gc3ViSGVhZGVyIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3N1YkhlYWRlcicpXG4gICAgc3ViSGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gYm9keSB0ZW1wbGF0ZSB0aGF0IHdpbGwgb3ZlcnJpZGUgcmVhZCB2YWx1ZSBmcm9tIHRoZSBba2V5XSBiaW5kaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYm9keScpXG4gICAgYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4uLlxuICAgICAqL1xuICAgIHNvcnRPcmRlcjogbnVtYmVyO1xuICAgIG1heFdpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgbWluV2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICB3aWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIHdpZGVzdENlbGw6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gRGF0YXRhYmxlIEltcGxlbWVudGF0aW9uc1xuICAgICAqL1xuICAgIGR0OiBBV0RhdGFUYWJsZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmtleSkgJiYgaXNCbGFuayh0aGlzLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGJpbmRpbmc6ICcgK1xuICAgICAgICAgICAgICAgICdba2V5XSBvciBbbGFiZWxdIGJpbmRpbmdzIG11c3QgYmUgdXNlZCBhdCBtaW5pbXVtJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUbyBiZSBhYmxlIHRvIHBvc2l0aW9uIHNlY29uZCBEVCB3ZSByZXF1aXJlIFt3aWR0aF0gdG8gYmUgc2V0IGFzIHdlbGxcbiAgICAgICAgaWYgKHRoaXMuZnJvemVuICYmIGlzQmxhbmsodGhpcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBiaW5kaW5nIFt3aWR0aF06ICcgK1xuICAgICAgICAgICAgICAgICd3aGVuIFtmcm96ZW5dPXRydWUgdGhlbiBbd2lkdGhdIGJpbmRpbmcgbmVlZHMgdG8gYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBuZWVkIHRvIGRlZmZlciB0aGlzIGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gb3RoZXJ3aXNlIEkgZ2V0XG4gICAgICAgIC8vIHZhbHVlIHdhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkIGVycm9yXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAgLy8ge1xuXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBjZWxsIHNlbGVjdGlvbk1vZGUgaXMgZW5hYmxlZCB0aGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiB3ZSBjbGljayBvbiBoZWFkZXIuXG4gICAgICogSXQgZGVsZWdhdGVzIHRoZSBjYWxsIHRvIHRoZSBEVCB3aGVyZSBpdCB0b2dnbGVzIGN1cnJlbnRseSBzZWxlY3RlZCB2YWx1ZVxuICAgICAqXG4gICAgICovXG4gICAgaGFuZGxlSGVhZGVyQ2xpY2soZXZlbnQ6IGFueSwgZWxlbWVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIZWFkZXJTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25IZWFkZXJTZWxlY3Rpb25DaGFuZ2UoZWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUb2RvOiBJbXBsZW1lbnQgb3VyIG93biBzb3J0aW5nIG1lY2hhbmlzbSBvbmNlIHdlIGV4dHJhY3QgdGhlIHNvcnRpbmcgbG9naWMgdG8gaXRzIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgc29ydChldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhcmdldE5vZGUgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmICh0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3ModGFyZ2V0Tm9kZSwgJ2R0LXUtc29ydGFibGUnKSB8fFxuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHRhcmdldE5vZGUsICdkdC1jb2wtdGl0bGUnKSB8fFxuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHRhcmdldE5vZGUsICdkdC1jb2wtc29ydGFibGUtaWNvbicpKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5zb3J0Q29sdW1uKSAmJiB0aGlzLmR0LnNvcnRDb2x1bW4ua2V5ID09PSB0aGlzLmtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5zb3J0T3JkZXIgKiAtMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRPcmRlcmluZyA9IHRoaXMuZHQuc29ydE9yZGVyaW5nRm9yTnVtYmVyKHRoaXMuc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LnNvcnRDb2x1bW4gPSB0aGlzO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUuc29ydEtleSA9IHRoaXMua2V5O1xuICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLnNvcnRPcmRlciA9IHRoaXMuZHQuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuc29ydE9yZGVyaW5nKTtcblxuICAgICAgICAgICAgdGhpcy5kdC5zb3J0U2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kdC51cGRhdGVEYXRhVG9SZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVkIHN0eWxlIGNsYXNzIGJhc2VkIG9uIGRhdGFcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgZHluYW1pY0JvZHlDbGFzcyhpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgZHluQ2xhc3MgPSBpc1ByZXNlbnQodGhpcy5ib2R5Q2xhc3NGbilcbiAgICAgICAgICAgID8gdGhpcy5ib2R5Q2xhc3NGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSkgOiAnJztcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYm9keVN0eWxlQ2xhc3MpKSB7XG4gICAgICAgICAgICBkeW5DbGFzcyArPSAnICcgKyB0aGlzLmJvZHlTdHlsZUNsYXNzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuc3R5bGVDbGFzcykpIHtcbiAgICAgICAgICAgIGR5bkNsYXNzICs9ICcgJyArIHRoaXMuc3R5bGVDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkeW5DbGFzcztcbiAgICB9XG5cblxuICAgIGlzUm93U2VsZWN0YWJsZShpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuaXNSb3dTZWxlY3RhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHQuaXNSb3dTZWxlY3RhYmxlKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ2VsbFNlbGVjdGFibGUoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ2NlbGwnICYmIHRoaXMuaXNSb3dTZWxlY3RhYmxlKGl0ZW0pICYmIHRoaXMuc2VsZWN0YWJsZTtcblxuICAgIH1cblxuXG4gICAgaXNIZWFkZXJTZWxlY3RhYmxlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdjZWxsJyAmJiB0aGlzLnNlbGVjdGFibGU7XG5cbiAgICB9XG5cblxuICAgIGdldFNvcnRPcmRlcigpXG4gICAge1xuICAgICAgICBsZXQgb3JkZXIgPSAwO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kdC5zb3J0Q29sdW1uKSAmJiB0aGlzLmtleSA9PT0gdGhpcy5kdC5zb3J0Q29sdW1uLmtleSkge1xuICAgICAgICAgICAgb3JkZXIgPSB0aGlzLmR0LnNvcnRDb2x1bW4uc29ydE9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9XG5cbiAgICBpc1NvcnRlZCgpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5rZXkgPT09IHRoaXMuZHQuc29ydENvbHVtbi5rZXk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSh0YWJsZTogQVdEYXRhVGFibGUpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR0ID0gdGFibGU7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LmluaXRpYWxTb3J0S2V5KSAmJiB0aGlzLmR0LmluaXRpYWxTb3J0S2V5ID09PSB0aGlzLmtleSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuZHQuaW5pdGlhbFNvcnRPcmRlcik7XG4gICAgICAgICAgICB0aGlzLmR0LnNvcnRDb2x1bW4gPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5ib2R5VGVtcGxhdGUpICYmIHRoaXMudXNlR2xvYmFsQm9keSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5VGVtcGxhdGUgPSB0aGlzLmR0LmJvZHlUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuaGVhZGVyVGVtcGxhdGUpICYmIHRoaXMudXNlR2xvYmFsSGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gdGhpcy5kdC5oZWFkZXJUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc3ViSGVhZGVyVGVtcGxhdGUpICYmIHRoaXMudXNlR2xvYmFsU3ViSGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnN1YkhlYWRlclRlbXBsYXRlID0gdGhpcy5kdC5zdWJIZWFkZXJUZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuYm9keUNsYXNzRm4pKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlDbGFzc0ZuID0gdGhpcy5kdC5ib2R5Q2xhc3NGbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWF4V2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMubWF4V2lkdGgpO1xuICAgICAgICB0aGlzLm1pbldpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLm1pbldpZHRoKTtcbiAgICAgICAgdGhpcy53aWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy53aWR0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhlIHZpZXcgaW5pdCBjeWNsZSBmcm9tIHRoZSBkdC5uZ0FmdGVyVmlld0NoZWNrZWQuXG4gICAgICpcbiAgICAgKiBJbiBjYXNlIHdlIHVzZSBNYXhXaWR0aCBkaXJlY3RpdmUgd2Ugc2V0IG5ldyB3aWR0aCBvbmNlIGZvciBhbGwgY29sdW1zblxuICAgICAqL1xuICAgIHBvc3RJbml0aWFsaXplKG15SW5kZXg6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4ID0gbXlJbmRleCArIDE7XG4gICAgICAgIGxldCB0YWJsZTtcblxuICAgICAgICBpZiAodGhpcy5kdC5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIHRhYmxlID0gKDxEYXRhdGFibGUyQ29tcG9uZW50PnRoaXMuZHQpLmVsXG4gICAgICAgICAgICAgICAgLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR0LWJvZHktZnJvemVuIHRhYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWJsZSA9ICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLndpZGVzdENlbGwgPiAwKSB7XG4gICAgICAgICAgICBsZXQgYWxsID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndHIgdGg6bnRoLWNoaWxkKCcgKyBjb2xJbmRleCArICcpLCAnICtcbiAgICAgICAgICAgICAgICAndHIgdGQ6bnRoLWNoaWxkKCcgKyBjb2xJbmRleCArICcpJykuZm9yRWFjaCgobm9kZTogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB0aGlzLndpZGVzdENlbGwgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFlvdSBlaXRoZXIgdXNlIHRoaXMgYmluZGluZyBkaXJlY3RseSBhbmQgc2F5IGl0cyBkYXRhY29sdW1uIG9yIHdoZW4gdGhlcmUgaXMgYSBba2V5XVxuICAgICAqIGJpZGluZyB3ZSBrbm93IGl0IHJlZmVycyB0byBzb21lIGZpZWxkLlxuICAgICAqXG4gICAgICovXG4gICAgaXNWYWx1ZUNvbHVtbigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLmlzRGF0YUNvbHVtbikgJiYgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHRoaXMuaXNEYXRhQ29sdW1uKSkgfHxcbiAgICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBhcmUgaW4gb3V0bGluZSBtb2RlICB3ZSBuZWVkIHRvIGFsc28gaW5kZW5kIGVhY2ggc2VsZWN0aW9uIGNvbnRyb2wgYWNjb3JkaW5nbHkuXG4gICAgICpcbiAgICAgKiBpbmRlbnQgLSAxID4gb25seSBvZmZzZXQgd2l0aFxuICAgICAqIGluZGVudFxuICAgICAqL1xuICAgIGluZGVudEZvckNvbnRyb2woY2VsbDogYW55LCBsZXZlbDogbnVtYmVyKTogYW55XG4gICAge1xuICAgICAgICBpZiAodGhpcy5kdC5pc091dGxpbmUoKSAmJiBsZXZlbCA+IDAgJiYgY2VsbC5vZmZzZXRXaWR0aCA+IDBcbiAgICAgICAgICAgICYmIGlzUHJlc2VudChjZWxsLm5leHRFbGVtZW50U2libGluZykpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbGV0IG91dGxpbmVOb2RlUGFkZGluZyA9XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShjZWxsLm5leHRFbGVtZW50U2libGluZykucGFkZGluZ0xlZnQpIHx8IDA7XG5cbiAgICAgICAgICAgIC8vIDFzdCBsZXZlbCBpcyBwdXNoZWQgYXMgcm9vdFxuICAgICAgICAgICAgaWYgKHRoaXMuZHQucHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChsZXZlbCA9PT0gMSkgPyBudWxsIDogKHRoaXMuZHQuaW5kZW50YXRpb25QZXJMZXZlbCAqIGxldmVsKVxuICAgICAgICAgICAgICAgICAgICAtIG91dGxpbmVOb2RlUGFkZGluZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmR0LmluZGVudGF0aW9uUGVyTGV2ZWwgKiBsZXZlbCkgKyBvdXRsaW5lTm9kZVBhZGRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEludGVybmFsXG4gICAgICovXG4gICAgcHJpdmF0ZSB3aWR0aFRvUHgod2lkdGg6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHB4O1xuICAgICAgICBpZiAoaXNQcmVzZW50KHdpZHRoKSkge1xuICAgICAgICAgICAgaWYgKHdpZHRoLmluZGV4T2YoJyUnKSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub25QYyA9IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgICAgIHB4ID0gbm9uUGMgKiAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHggPSBwYXJzZUZsb2F0KHdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBweDtcbiAgICB9XG59XG5cbiJdfQ==