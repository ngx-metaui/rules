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
        var _this = this;
        // need to deffer this and trigger change detection otherwise I get
        // value was changed after it was checked error
        setTimeout(function () {
            _this.maxWidthPx = _this.widthToPx(_this.maxWidth);
            _this.minWidthPx = _this.widthToPx(_this.minWidth);
            _this.widthPx = _this.widthToPx(_this.width);
        });
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
                    template: "<!--\n    To make it more readable Each Column type has its own rendering template instead of putting\n    all this into datatable as this is more responsibility of the column. And the main goal\n    was try to be modular as possible. When There will be different types of columns\n\n    - Regular DTColumn (current implementation),\n    - SelectionColumn (Single/Multi select) - todo,\n    - DetailRow column, then pivotal collumn to render row/column/detail attributes - todo.\n\n    When implementing new column type you just inherit this DTColumnComponent and provide your\n    own rendering template and DT take care of the rest.\n\n    todo: We have SingleSelect, Multiselect rendering template that is Added programatically\n    todo: We have pivotal rendering template\n\n\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\"\n             let-columnIndex=\"columnIndex\"\n             let-rowIndex=\"rowIndex\">\n\n    <ng-template *ngIf=\"isHeader\" [ngTemplateOutlet]=\"colHeader\"\n                 [ngTemplateOutletContext]=\"{$implicit: isSubHeader, columnIndex:columnIndex, data: dataToRender,\n                 rowIndex:rowIndex}\">\n    </ng-template>\n\n    <ng-template *ngIf=\"!isHeader\" [ngTemplateOutlet]=\"colBody\"\n                 [ngTemplateOutletContext]=\"{$implicit: column, data:dataToRender,rowIndex:rowIndex}\">\n    </ng-template>\n</ng-template>\n\n\n<!--\n    Templates for header columns. Here we are rendering two types. Header and Subheader that we\n    usually use here as some kind of summary columns. Not really having summary at the bottom like other\n    DT.\n\n    TH column and their text are usually unselectable and most of these were inherited from\n    original PrimeNg DT even not many things got left after we refactor this but the idea is the\n    same.\n\n    Each cell has its dt-cell-def class that sets default styling like font, background, alignment\n    padding, etcs..\n\n\n-->\n<ng-template #colHeader let-isSubHeader let-columnIndex=\"columnIndex\" let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <th #headerCell1 [class]=\"headerStyleClass||styleClass\" *ngIf=\"!isSubHeader\"\n        (click)=\"handleHeaderClick($event, headerCell1)\"\n        [ngClass]=\"{'dt-is-default dt-u-unselectable-text' :true,\n                    'dt-cell-def': dt.selectionMode !== 'cell' || (!dt.isOutline() || !dt.pivotalLayout),\n                    'dt-u-sortable': sortable,\n                    'dt-is-active': isSorted(),\n                    'dt-is-hidden': !isVisible}\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [attr.tabindex]=\"sortable ? 1 : null\"\n        [maxWidth]=\"maxWidthPx\"\n    >\n\n        <ng-template [ngIf]=\"dt.headerFilterTemplate && columnIndex === 0 \">\n            <ng-container *ngTemplateOutlet=\"dt.headerFilterTemplate\">\n            </ng-container>\n        </ng-template>\n        <!--\n            when cell are selectable we need two version where one wrap the cell content in div\n        -->\n        <ng-template [ngIf]=\"isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"selectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isHeaderSelectable()\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableHeaderCell; context: {$implicit: this}\">\n            </ng-container>\n        </ng-template>\n    </th>\n\n    <th #headerCell2 [class]=\"headerStyleClass||styleClass\" *ngIf=\"isSubHeader\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{'dt-is-default dt-cell-def dt-sub-header dt-u-unselectable-text':true}\"\n        [maxWidth]=\"maxWidthPx\">\n\n        <span class=\"dt-col-title\" *ngIf=\"dt.showSubHeader && subHeaderTemplate\">\n            <ng-container *ngTemplateOutlet=\"subHeaderTemplate;\n                    context: {$implicit: this, rowData: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </span>\n    </th>\n</ng-template>\n\n\n<!--\n    Template for the body = the TD. For the body and we might want to do the same for header we\n    allow to have calculated body class that comes from the application. So based on the data types\n    you might want to apply different class in order to apply custom styling.\n-->\n<ng-template #colBody let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <td #cell [class]=\"dynamicBodyClass(data)\"\n        (click)=\"dt.onCellSelectionChange(cell, this, data)\"\n        [attr.width]=\"width\"\n        [attr.align]=\"align\"\n        [ngClass]=\"{ 'dt-is-default': true,\n        'dt-cell-def': !isCellSelectable(data),\n        'dt-is-hidden': !isVisible}\"\n        [maxWidth]=\"maxWidthPx\">\n\n        <!--\n            Since we need to support cell selection when we need to draw border around it\n            We are wrapping such sells with div which gives us better flexibility\n        -->\n        <ng-template [ngIf]=\"isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"selectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex }\">\n            </ng-container>\n\n        </ng-template>\n\n\n        <ng-template [ngIf]=\"!isCellSelectable(data)\">\n            <ng-container *ngTemplateOutlet=\"nonSelectableBodyCell;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n            </ng-container>\n        </ng-template>\n\n    </td>\n</ng-template>\n\n<!--\n    Todo: create better solution instead of using different template create directive that wraps\n    it with the div conditionally\n-->\n<ng-template #selectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isHeaderSelected(this)}\">\n        <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableHeaderCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"headerCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #headerCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && !headerTemplate\">\n                {{label}}\n    </span>\n\n    <span class=\"dt-col-title\" *ngIf=\"showColumnLabel && headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate;\n                        context: {$implicit: this, rowData: data, rowIndex: rowIndex }\">\n                    </ng-container>\n    </span>\n\n    <span class=\"dt-col-sortable-icon sap-icon icon-sort\" *ngIf=\"sortable\"\n          [ngClass]=\"{'icon-sort-descending': (getSortOrder() == -1),\n                           'icon-sort-ascending': (getSortOrder() == 1)}\">\n    </span>\n</ng-template>\n\n\n<ng-template #selectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <div class=\"dt-cell-def-selectable\"\n         [ngClass]=\"{'dt-cell-selected': dt.isBodyCellSelected(this, data)}\">\n        <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n        </ng-container>\n    </div>\n</ng-template>\n\n\n<ng-template #nonSelectableBodyCell let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <ng-container *ngTemplateOutlet=\"bodyCellContent;\n                        context: {$implicit: this, data: data, rowIndex: rowIndex}\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #bodyCellContent let-data=\"data\" let-rowIndex=\"rowIndex\">\n    <!--\n           when no template is used use our FieldPath to access the object value based on the\n           key binding\n        -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"!bodyTemplate\">\n            {{dt.getValue(data, key)}}\n        </span>\n\n\n    <!--\n        In case application wants to provide their own cell component they use\n        #body ng-template to do so.\n    -->\n    <span class=\"dt-col-cell-data\" *ngIf=\"bodyTemplate\">\n            <ng-container *ngTemplateOutlet=\"bodyTemplate;\n            context: {$implicit: this, rowData: data, rowIndex: rowIndex}\"></ng-container>\n        </span>\n</ng-template>\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEwUEgsOENBQWE7SUFpTWpELDRCQUFtQixHQUFnQixFQUNoQjtRQURuQixZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsZ0JBQVUsR0FBVixVQUFVOzs7Ozs7c0JBN0tQLE1BQU07Ozs7OzswQkFlUCxJQUFJOzs7Ozs2QkFjRixZQUFZOzs7OztnQ0FPUixJQUFJOzs7Ozs7OEJBUU4sS0FBSzs7Ozs7OzJCQXVCUixLQUFLOzs7OztnQ0FPQSxJQUFJOzs7OzttQ0FPRCxJQUFJOzs7Ozs4QkFPVCxJQUFJOzs7Ozs7Ozs2QkFXTCxJQUFJOzs7Ozs7Ozt1QkFVVixLQUFLOzJCQW9ERixDQUFDOzJCQUNELENBQUM7d0JBQ0osQ0FBQzsyQkFDRSxDQUFDOztLQVdyQjs7OztJQUdELHFDQUFROzs7SUFBUjtRQUNJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFB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R0FBRyxtQkFBc0IsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO2FBQzVFO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7O2dCQTVvQmpCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHM1UUFpTmI7b0JBQ0csTUFBTSxFQUFFLENBQUMsc3VDQUFzdUMsQ0FBQztvQkFDaHZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBRTFCOzs7O2dCQTNQdUIsV0FBVztnQkFFM0IsVUFBVTs7O3dCQWdRYixLQUFLO3NCQU1MLEtBQUs7d0JBUUwsS0FBSzs4QkFPTCxLQUFLOzRCQVFMLEtBQUs7MkJBT0wsS0FBSzsrQkFPTCxLQUFLO2tDQU9MLEtBQUs7Z0NBUUwsS0FBSzttQ0FRTCxLQUFLO2lDQU9MLEtBQUs7NkJBUUwsS0FBSztrQ0FPTCxLQUFLO3FDQU9MLEtBQUs7Z0NBT0wsS0FBSzsrQkFXTCxLQUFLO3lCQVVMLEtBQUs7MkJBVUwsS0FBSzsyQkFXTCxLQUFLO21DQU1MLFNBQVMsU0FBQyxtQkFBbUI7aUNBTTdCLFlBQVksU0FBQyxRQUFRO29DQU1yQixZQUFZLFNBQUMsV0FBVzsrQkFNeEIsWUFBWSxTQUFDLE1BQU07OzZCQXpjeEI7RUEyUndDLGFBQWE7U0FBeEMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FXRGF0YVRhYmxlfSBmcm9tICcuLi9hdy1kYXRhdGFibGUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jvb2xlYW5XcmFwcGVyLCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cblxuZXhwb3J0IHR5cGUgRFRIQWxpZ25tZW50ID0gJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnO1xuXG5cbi8qKlxuICogRFRDb2x1bW4gcmVwcmVzZW50IHNpbmdsZSBjb2x1bW4gaW5jbHVkaW5nIGhlYWRlciBhbmQgaXRzIGJvZHkuIEVhY2ggY29sdW1uIGhhcyBpdHMgb3duXG4gKiByZW5kZXJlclRlbXBsYXRlIHdoaWNoIGEgZW50cnkgdG8gdGhpcyBjb21wb25lbnQuXG4gKlxuICogS2VlcGluZyB0aGlzIHNlcGFyYXRlIGZyb20gdGhlIGRhdGF0YWJsZSB3aGVyZSBEVCBpcyBub3QgcmVhbGx5IGF3YXJlIHdoYXQgaXQgaXMgcmVuZGVyaW5nLFxuICogaXQgYWxsb3dzIHVzIG1vcmUgZmxleGliaWxpdHkgaW4gdGVybXMgb2YgZGlmZmVyZW50IHR5cGUgb2YgY29sdW1uIGluaGVyaXRpbmcgZnJvbSB0aGlzXG4gKiBvbmUuLiBTdWNoIGFzOlxuICogIERUUm93RGV0YWlsICBjb2x1bW5cbiAqICBEVFNpbmdsZVNlbGVjdGlvbiBjb2x1bW5cbiAqICBEVE11bHRpU2VsZWN0aW9uIGNvbHVtblxuICpcbiAqIFRoaXMgd2F5IHdlIGRvbid0IGRvIElGL1RIRU4vRUxTRSBpbnNpZGUgdGhlIGRhdGF0YWJsZSBhbmQgdHJ5aW5nIHRvIGNyZWF0ZSBkaWZmZXJlbnQgY2FzZXMuXG4gKlxuICogIFRoZW4gbGF0ZXIgb24gdGhpcyB3aWxsIGxldCB1cyBjcmVhdGUgYWRkaXRpb25hbCBsb2dpYyBmb3IgdGhlIHBpdm90YWwgbGF5b3V0LiBCZWNhdXNlIERUXG4gKiAgZG9lcyBrbm93IGFueXRoaW5nIGFib3V0IHRoZSB0eXBlIG9mIHRoZSBjb2x1bW4gc28gd2hhdGV2ZXIgaXMgYWRkZWQgdG8gdGhlIERULmNvbHVtbnMgaXRcbiAqICB3aWxsIGJlIHJlbmRlcmVkLlxuICpcbiAqXG4gKiAgQ29sdW1ucyBjYW4gYmUgYWxzbyBmcm96ZW4gbWVhbmluZyBpZiB0aGUgY29udGVudCBvdmVyZmxvd3MgdGhleSBkb250IHNjcm9sbC4gVG8gbWFrZSB0aGVcbiAqICBjb2x1bW4gZnJvemVuIHdlIG5lZWQgdG8gdXNlIFtmcm96ZW5dIGJpbmRpbmcgYW5kIHNlIGl0IHRvIFRSVUUgcGx1cyBpdCByZXF1aXJlcyBhIFt3aWR0aF1cbiAqICBiaW5kaW5nIHRvIGJlIHNldCAoaW4gcHgpLlxuICogIFdlIG5lZWQgdGhpcyB0byBiZSBhYmxlIHRvIHByb3Blcmx5IHBvc2l0aW9uIHRoZSBzZWNvbmQgdGFibGUgd2hpY2ggaXMgY2hhbmdlZCB0byBhYnNvbHV0ZVxuICogIHBvc2l0aW9uaW5nLlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LWNvbHVtbjInLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFRvIG1ha2UgaXQgbW9yZSByZWFkYWJsZSBFYWNoIENvbHVtbiB0eXBlIGhhcyBpdHMgb3duIHJlbmRlcmluZyB0ZW1wbGF0ZSBpbnN0ZWFkIG9mIHB1dHRpbmdcbiAgICBhbGwgdGhpcyBpbnRvIGRhdGF0YWJsZSBhcyB0aGlzIGlzIG1vcmUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGNvbHVtbi4gQW5kIHRoZSBtYWluIGdvYWxcbiAgICB3YXMgdHJ5IHRvIGJlIG1vZHVsYXIgYXMgcG9zc2libGUuIFdoZW4gVGhlcmUgd2lsbCBiZSBkaWZmZXJlbnQgdHlwZXMgb2YgY29sdW1uc1xuXG4gICAgLSBSZWd1bGFyIERUQ29sdW1uIChjdXJyZW50IGltcGxlbWVudGF0aW9uKSxcbiAgICAtIFNlbGVjdGlvbkNvbHVtbiAoU2luZ2xlL011bHRpIHNlbGVjdCkgLSB0b2RvLFxuICAgIC0gRGV0YWlsUm93IGNvbHVtbiwgdGhlbiBwaXZvdGFsIGNvbGx1bW4gdG8gcmVuZGVyIHJvdy9jb2x1bW4vZGV0YWlsIGF0dHJpYnV0ZXMgLSB0b2RvLlxuXG4gICAgV2hlbiBpbXBsZW1lbnRpbmcgbmV3IGNvbHVtbiB0eXBlIHlvdSBqdXN0IGluaGVyaXQgdGhpcyBEVENvbHVtbkNvbXBvbmVudCBhbmQgcHJvdmlkZSB5b3VyXG4gICAgb3duIHJlbmRlcmluZyB0ZW1wbGF0ZSBhbmQgRFQgdGFrZSBjYXJlIG9mIHRoZSByZXN0LlxuXG4gICAgdG9kbzogV2UgaGF2ZSBTaW5nbGVTZWxlY3QsIE11bHRpc2VsZWN0IHJlbmRlcmluZyB0ZW1wbGF0ZSB0aGF0IGlzIEFkZGVkIHByb2dyYW1hdGljYWxseVxuICAgIHRvZG86IFdlIGhhdmUgcGl2b3RhbCByZW5kZXJpbmcgdGVtcGxhdGVcblxuXG4tLT5cbjxuZy10ZW1wbGF0ZSAjcmVuZGVyaW5nVGVtcGxhdGUgbGV0LWlzSGVhZGVyIGxldC1pc1N1YkhlYWRlcj1cImlzU3ViSGVhZGVyXCIgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICAgICAgICAgbGV0LWRhdGFUb1JlbmRlcj1cImRhdGFcIlxuICAgICAgICAgICAgIGxldC1jb2x1bW5JbmRleD1cImNvbHVtbkluZGV4XCJcbiAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xIZWFkZXJcIlxuICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogaXNTdWJIZWFkZXIsIGNvbHVtbkluZGV4OmNvbHVtbkluZGV4LCBkYXRhOiBkYXRhVG9SZW5kZXIsXG4gICAgICAgICAgICAgICAgIHJvd0luZGV4OnJvd0luZGV4fVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCIhaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xCb2R5XCJcbiAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGNvbHVtbiwgZGF0YTpkYXRhVG9SZW5kZXIscm93SW5kZXg6cm93SW5kZXh9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFRlbXBsYXRlcyBmb3IgaGVhZGVyIGNvbHVtbnMuIEhlcmUgd2UgYXJlIHJlbmRlcmluZyB0d28gdHlwZXMuIEhlYWRlciBhbmQgU3ViaGVhZGVyIHRoYXQgd2VcbiAgICB1c3VhbGx5IHVzZSBoZXJlIGFzIHNvbWUga2luZCBvZiBzdW1tYXJ5IGNvbHVtbnMuIE5vdCByZWFsbHkgaGF2aW5nIHN1bW1hcnkgYXQgdGhlIGJvdHRvbSBsaWtlIG90aGVyXG4gICAgRFQuXG5cbiAgICBUSCBjb2x1bW4gYW5kIHRoZWlyIHRleHQgYXJlIHVzdWFsbHkgdW5zZWxlY3RhYmxlIGFuZCBtb3N0IG9mIHRoZXNlIHdlcmUgaW5oZXJpdGVkIGZyb21cbiAgICBvcmlnaW5hbCBQcmltZU5nIERUIGV2ZW4gbm90IG1hbnkgdGhpbmdzIGdvdCBsZWZ0IGFmdGVyIHdlIHJlZmFjdG9yIHRoaXMgYnV0IHRoZSBpZGVhIGlzIHRoZVxuICAgIHNhbWUuXG5cbiAgICBFYWNoIGNlbGwgaGFzIGl0cyBkdC1jZWxsLWRlZiBjbGFzcyB0aGF0IHNldHMgZGVmYXVsdCBzdHlsaW5nIGxpa2UgZm9udCwgYmFja2dyb3VuZCwgYWxpZ25tZW50XG4gICAgcGFkZGluZywgZXRjcy4uXG5cblxuLS0+XG48bmctdGVtcGxhdGUgI2NvbEhlYWRlciBsZXQtaXNTdWJIZWFkZXIgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIiBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPHRoICNoZWFkZXJDZWxsMSBbY2xhc3NdPVwiaGVhZGVyU3R5bGVDbGFzc3x8c3R5bGVDbGFzc1wiICpuZ0lmPVwiIWlzU3ViSGVhZGVyXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUhlYWRlckNsaWNrKCRldmVudCwgaGVhZGVyQ2VsbDEpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydkdC1pcy1kZWZhdWx0IGR0LXUtdW5zZWxlY3RhYmxlLXRleHQnIDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnZHQtY2VsbC1kZWYnOiBkdC5zZWxlY3Rpb25Nb2RlICE9PSAnY2VsbCcgfHwgKCFkdC5pc091dGxpbmUoKSB8fCAhZHQucGl2b3RhbExheW91dCksXG4gICAgICAgICAgICAgICAgICAgICdkdC11LXNvcnRhYmxlJzogc29ydGFibGUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1pcy1hY3RpdmUnOiBpc1NvcnRlZCgpLFxuICAgICAgICAgICAgICAgICAgICAnZHQtaXMtaGlkZGVuJzogIWlzVmlzaWJsZX1cIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmFsaWduXT1cImFsaWduXCJcbiAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwic29ydGFibGUgPyAxIDogbnVsbFwiXG4gICAgICAgIFttYXhXaWR0aF09XCJtYXhXaWR0aFB4XCJcbiAgICA+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImR0LmhlYWRlckZpbHRlclRlbXBsYXRlICYmIGNvbHVtbkluZGV4ID09PSAwIFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmhlYWRlckZpbHRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPCEtLVxuICAgICAgICAgICAgd2hlbiBjZWxsIGFyZSBzZWxlY3RhYmxlIHdlIG5lZWQgdHdvIHZlcnNpb24gd2hlcmUgb25lIHdyYXAgdGhlIGNlbGwgY29udGVudCBpbiBkaXZcbiAgICAgICAgLS0+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc0hlYWRlclNlbGVjdGFibGUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGFibGVIZWFkZXJDZWxsOyBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlzSGVhZGVyU2VsZWN0YWJsZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9uU2VsZWN0YWJsZUhlYWRlckNlbGw7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXN9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RoPlxuXG4gICAgPHRoICNoZWFkZXJDZWxsMiBbY2xhc3NdPVwiaGVhZGVyU3R5bGVDbGFzc3x8c3R5bGVDbGFzc1wiICpuZ0lmPVwiaXNTdWJIZWFkZXJcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmFsaWduXT1cImFsaWduXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydkdC1pcy1kZWZhdWx0IGR0LWNlbGwtZGVmIGR0LXN1Yi1oZWFkZXIgZHQtdS11bnNlbGVjdGFibGUtdGV4dCc6dHJ1ZX1cIlxuICAgICAgICBbbWF4V2lkdGhdPVwibWF4V2lkdGhQeFwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXRpdGxlXCIgKm5nSWY9XCJkdC5zaG93U3ViSGVhZGVyICYmIHN1YkhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3ViSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC90aD5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLVxuICAgIFRlbXBsYXRlIGZvciB0aGUgYm9keSA9IHRoZSBURC4gRm9yIHRoZSBib2R5IGFuZCB3ZSBtaWdodCB3YW50IHRvIGRvIHRoZSBzYW1lIGZvciBoZWFkZXIgd2VcbiAgICBhbGxvdyB0byBoYXZlIGNhbGN1bGF0ZWQgYm9keSBjbGFzcyB0aGF0IGNvbWVzIGZyb20gdGhlIGFwcGxpY2F0aW9uLiBTbyBiYXNlZCBvbiB0aGUgZGF0YSB0eXBlc1xuICAgIHlvdSBtaWdodCB3YW50IHRvIGFwcGx5IGRpZmZlcmVudCBjbGFzcyBpbiBvcmRlciB0byBhcHBseSBjdXN0b20gc3R5bGluZy5cbi0tPlxuPG5nLXRlbXBsYXRlICNjb2xCb2R5IGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8dGQgI2NlbGwgW2NsYXNzXT1cImR5bmFtaWNCb2R5Q2xhc3MoZGF0YSlcIlxuICAgICAgICAoY2xpY2spPVwiZHQub25DZWxsU2VsZWN0aW9uQ2hhbmdlKGNlbGwsIHRoaXMsIGRhdGEpXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgICAgICBbYXR0ci5hbGlnbl09XCJhbGlnblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2R0LWlzLWRlZmF1bHQnOiB0cnVlLFxuICAgICAgICAnZHQtY2VsbC1kZWYnOiAhaXNDZWxsU2VsZWN0YWJsZShkYXRhKSxcbiAgICAgICAgJ2R0LWlzLWhpZGRlbic6ICFpc1Zpc2libGV9XCJcbiAgICAgICAgW21heFdpZHRoXT1cIm1heFdpZHRoUHhcIj5cblxuICAgICAgICA8IS0tXG4gICAgICAgICAgICBTaW5jZSB3ZSBuZWVkIHRvIHN1cHBvcnQgY2VsbCBzZWxlY3Rpb24gd2hlbiB3ZSBuZWVkIHRvIGRyYXcgYm9yZGVyIGFyb3VuZCBpdFxuICAgICAgICAgICAgV2UgYXJlIHdyYXBwaW5nIHN1Y2ggc2VsbHMgd2l0aCBkaXYgd2hpY2ggZ2l2ZXMgdXMgYmV0dGVyIGZsZXhpYmlsaXR5XG4gICAgICAgIC0tPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNDZWxsU2VsZWN0YWJsZShkYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGFibGVCb2R5Q2VsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleCB9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc0NlbGxTZWxlY3RhYmxlKGRhdGEpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9uU2VsZWN0YWJsZUJvZHlDZWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8L3RkPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLVxuICAgIFRvZG86IGNyZWF0ZSBiZXR0ZXIgc29sdXRpb24gaW5zdGVhZCBvZiB1c2luZyBkaWZmZXJlbnQgdGVtcGxhdGUgY3JlYXRlIGRpcmVjdGl2ZSB0aGF0IHdyYXBzXG4gICAgaXQgd2l0aCB0aGUgZGl2IGNvbmRpdGlvbmFsbHlcbi0tPlxuPG5nLXRlbXBsYXRlICNzZWxlY3RhYmxlSGVhZGVyQ2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImR0LWNlbGwtZGVmLXNlbGVjdGFibGVcIlxuICAgICAgICAgW25nQ2xhc3NdPVwieydkdC1jZWxsLXNlbGVjdGVkJzogZHQuaXNIZWFkZXJTZWxlY3RlZCh0aGlzKX1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlckNlbGxDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyRpbXBsaWNpdDogdGhpcywgZGF0YTogZGF0YSwgcm93SW5kZXg6IHJvd0luZGV4fVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNub25TZWxlY3RhYmxlSGVhZGVyQ2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNoZWFkZXJDZWxsQ29udGVudCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZHQtY29sLXRpdGxlXCIgKm5nSWY9XCJzaG93Q29sdW1uTGFiZWwgJiYgIWhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAge3tsYWJlbH19XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtdGl0bGVcIiAqbmdJZj1cInNob3dDb2x1bW5MYWJlbCAmJiBoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7JGltcGxpY2l0OiB0aGlzLCByb3dEYXRhOiBkYXRhLCByb3dJbmRleDogcm93SW5kZXggfVwiPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC1zb3J0YWJsZS1pY29uIHNhcC1pY29uIGljb24tc29ydFwiICpuZ0lmPVwic29ydGFibGVcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaWNvbi1zb3J0LWRlc2NlbmRpbmcnOiAoZ2V0U29ydE9yZGVyKCkgPT0gLTEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ljb24tc29ydC1hc2NlbmRpbmcnOiAoZ2V0U29ydE9yZGVyKCkgPT0gMSl9XCI+XG4gICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI3NlbGVjdGFibGVCb2R5Q2VsbCBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuICAgIDxkaXYgY2xhc3M9XCJkdC1jZWxsLWRlZi1zZWxlY3RhYmxlXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsnZHQtY2VsbC1zZWxlY3RlZCc6IGR0LmlzQm9keUNlbGxTZWxlY3RlZCh0aGlzLCBkYXRhKX1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjbm9uU2VsZWN0YWJsZUJvZHlDZWxsIGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlDZWxsQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNib2R5Q2VsbENvbnRlbnQgbGV0LWRhdGE9XCJkYXRhXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICA8IS0tXG4gICAgICAgICAgIHdoZW4gbm8gdGVtcGxhdGUgaXMgdXNlZCB1c2Ugb3VyIEZpZWxkUGF0aCB0byBhY2Nlc3MgdGhlIG9iamVjdCB2YWx1ZSBiYXNlZCBvbiB0aGVcbiAgICAgICAgICAga2V5IGJpbmRpbmdcbiAgICAgICAgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJkdC1jb2wtY2VsbC1kYXRhXCIgKm5nSWY9XCIhYm9keVRlbXBsYXRlXCI+XG4gICAgICAgICAgICB7e2R0LmdldFZhbHVlKGRhdGEsIGtleSl9fVxuICAgICAgICA8L3NwYW4+XG5cblxuICAgIDwhLS1cbiAgICAgICAgSW4gY2FzZSBhcHBsaWNhdGlvbiB3YW50cyB0byBwcm92aWRlIHRoZWlyIG93biBjZWxsIGNvbXBvbmVudCB0aGV5IHVzZVxuICAgICAgICAjYm9keSBuZy10ZW1wbGF0ZSB0byBkbyBzby5cbiAgICAtLT5cbiAgICA8c3BhbiBjbGFzcz1cImR0LWNvbC1jZWxsLWRhdGFcIiAqbmdJZj1cImJvZHlUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlUZW1wbGF0ZTtcbiAgICAgICAgICAgIGNvbnRleHQ6IHskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6IGRhdGEsIHJvd0luZGV4OiByb3dJbmRleH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC5kdC1zb3J0YWJsZS1jb2x7Y3Vyc29yOnBvaW50ZXJ9LmR0LWNvbC1zb3J0YWJsZS1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0Oi4xMjVlbX10aC5kdC1jZWxsLWRlZntmb250LXdlaWdodDo0MDA7Y29sb3I6IzRhNGE0YX10aC5kdC1pcy1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2YyZjJmMjt3aGl0ZS1zcGFjZTpub3dyYXB9dGguZHQtaXMtZGVmYXVsdC5kdC1jZWxsLWRlZjpub3QoLmR0LXN1Yi1oZWFkZXIpe2JvcmRlci1ib3R0b20tY29sb3I6I2YyZjJmMn10aC5kdC1zdWItaGVhZGVye2JhY2tncm91bmQtY29sb3I6I2ZmZn10aCAuZHQtY2VsbC1zZWxlY3RlZHtib3JkZXItY29sb3I6IzU4Yjk1N310ZCAuZHQtY2VsbC1zZWxlY3RlZHtib3JkZXItbGVmdC1jb2xvcjojNGY5ZmNmfS5kdC1yb290LXNlY3Rpb24gLmR0LXNlbGVjdGlvbi1jb2x1bW4sLmR0LXNlbGVjdGlvbi1jb2x1bW57d2lkdGg6NDZweDtwYWRkaW5nOjAgMTJweH0uZHQtcGl2b3QtbGF5b3V0IHRkLmR0LXNlbGVjdGlvbi1jb2x1bW4sdGguZHQtc2VsZWN0aW9uLWNvbHVtbntib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9dGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGh7Ym9yZGVyLXRvcC1jb2xvcjp0cmFuc3BhcmVudH10Ym9keSB0cjpsYXN0LWNoaWxkOm5vdCguZHQtZHJhZy1yb3ctYm90dG9tKSB0ZHtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50fXRkOmZpcnN0LWNoaWxkLHRoOmZpcnN0LWNoaWxke2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50fXRkOmxhc3QtY2hpbGQsdGg6bGFzdC1jaGlsZHtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9dGJvZHkgLmR0LWRyYWctcm93LXRvcD50ZHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgwZGVnLCNmZmYgMCwjZmZmIDk3JSwjMDI3MWQyIDEwMCUpfXRib2R5IC5kdC1kcmFnLXJvdy1ib3R0b20+dGR7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCNmZmYgMCwjZmZmIDk3JSwjMDI3MWQyIDEwMCUpfXRib2R5IC5kdC1kcmFnLXJvdy1ib3RoPnRke2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDBkZWcsIzAyNzFkMiAwLCNmZmYgMyUsI2ZmZiA5NyUsIzAyNzFkMiAxMDAlKX10Ym9keSAuZHQtcm93LWRyYWdnaW5nPnRke2JhY2tncm91bmQtY29sb3I6I2VjZWNlYztjb2xvcjojYjliOWI5fXRib2R5IC5kdC1yb3ctZHJhZ2dpbmcgLnVpLXN0YXRlLWFjdGl2ZXtvcGFjaXR5Oi41O2N1cnNvcjpub3QtYWxsb3dlZH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRDb2x1bW4yQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIENvbHVtbiBoZWFkZXIgbGFiZWwuXG4gICAgICpcbiAgICAgKiBPciB5b3UgY2FuIHVzZSBoZWFkZXJUZW1wbGF0ZSB0byBkZWZpbmUgeW91ciBvd24gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGZpZWxkIG5hbWUgdG8gcmVhZCBmcm9tIHRoZSBnaXZlbiBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDZWxsIGFsaWdubWVudC4gSXQgaW5zZXJ0cyByZWd1bGFyIGFsaWduIGF0dHJpYnV0ZSB0byB0aGUgdGFibGUgY2VsbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbjogRFRIQWxpZ25tZW50ID0gJ2xlZnQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgZHluYW1pYyBjbGFzcyBiYXNlZCBvbiBkYXRhIGFuZCB0aGVuIGl0cyBhZGRlZCB0byB0aGUgdGFibGUgY2VsbCBURFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keUNsYXNzRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElmIGZhbHNlIGFwcGxpZXMgZHQtaXMtaGlkZGVuIHN0eWxlIHRoYXQgaGlkZXMgdGhlIGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogTWFya3MgY29sdW1uIGFzIHNvcnRhYmxlIHdoaWNoIG1lYW5zIHNvcnRpbmcgaWNvbiBpcyBhZGRlZCB0byB0aGUgaGVhZGVyIHdpdGggc3BlY2lhbFxuICAgICAqIHNvcnRpbmcgaGFuZGxpbmdcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNvcnRhYmxlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTb3J0aW5nIGRpcmVjdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzb3J0T3JkZXJpbmc6IHN0cmluZyA9ICdkZXNjZW5kaW5nJztcblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSB0ZW1wbGF0ZSBpZiB3aGV0aGVyIHRvIHJlbmRlciBhIGxhYmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dDb2x1bW5MYWJlbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U3ViSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgc3RhdGljIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIFRIIGludG8gdGhlIGhlYWRlci4gSXQgZG9lcyBub3QgcmVseSBvbiBkYXRhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgc3RhdGljIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIHRkIGludG8gdGhlIGJvZHkuIEl0IGRvZXMgbm90IHJlbHkgb24gZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHRvZ2V0aGVyIHdpdGggY2VsbCBzZWxlY3Rpb25Nb2RlIHRvIHRlbGwgd2hpY2ggY29sdW1uIGlzIHNlbGVjdGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgSEVBREVSIHRlbXBsYXRlIGZvciBjdXJyZW50IGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgU3ViSGVhZGVyIHRlbXBsYXRlIGZvciBjdXJyZW50IGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxTdWJIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGdsb2JhbGx5IGRlZmluZWQgYm9keSB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB1c2VHbG9iYWxCb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgdGhlIGNvbHVtbiBpcyBkYXRhIGNvbHVtbiAgLSBpZiBpdCBpcyByZW5kZXJpbmcgZGF0YSBvciBqdXN0IGEgbGFiZWwgb3Igc29tZVxuICAgICAqIGNvbnRyb2xcbiAgICAgKlxuICAgICAqIFRoaXMgaXMgaW1wb3J0YW50IHdoZW4gY2FsY3VsYXRpbmcgYSBjb2x1bW4gc3BhbiBhbmQgd2UgbmVlZCB0byBrbm93IHdoaWNoIGNvbHVtbnMgYXJlIG9yXG4gICAgICogd2lsbCBiZSBqdXN0IGZvciBzZWxlY3Rpb24gY29udHJvbHMgYW5kIHdoaWNoIGhvbGRzIGRhdGFcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzRGF0YUNvbHVtbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGNvbHVtbiB0aGF0IHdpbGwgbm90IHNjcm9sbCBob3Jpem9udGFsbHkgd2l0aCBvdGhlciBjb2x1bW5zLiBDb2x1bW4gaXNcbiAgICAgKiBmcm96ZW4uXG4gICAgICpcbiAgICAgKiBGb3Igc3VjaCBjb2x1bW5zIHRoYXQgYXJlIG1hcmtlZCBhcyBmcm96ZW4gYmluZGluZyBbd2lkdGhdIGlzIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmcm96ZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIE1heCBXaWR0aCBmb3IgdGhlIFRELiBFdmVuIFREIGRvZXMgbm90IHN1cHBvcnQgd2UgY2FsY3VsYXRlIHRoZSBjb250ZW50IHdpZHRoXG4gICAgICogZm9yIGVhY2ggY2VsbCBhbmQgdGhlbiBkZWNpZGUgaWYgd2UgbmVlZCB0byBlbmxhcmdlIHRoZSBjb2x1bW4uXG4gICAgICpcbiAgICAgKiBARXhwZXJpbWFudGFsIGJpbmRpbmcgdGhhdCBpcyBjdXJyZW50bHkgd29ya2luZyBpZiB0aGUgY29udGVudCBvZiB0aGUgY2VsbCBpcyBpbmxpbmVcbiAgICAgKiBlbGVtZW50IHdoZXJlIHdlIGNhbiBjb250cm9sIHdoaXRlc3BhY2Ugd3JhcHBpbmcgaW4gb3JkZXIgdG8gZmluZCBvdXQgdGhlIHJlYWwgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1heFdpZHRoOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1pbldpZHRoIG9uIHRoZSBjZWxsLiBBZ2FpbiBqdXN0IGxpa2UgbWF4V2lkdGggY3NzIHByb3Blcmx5IGlzIG5vdCBzdXBwb3J0ZWQgb25cbiAgICAgKiB0aGUgdGFibGUgc28gdGhlcmUgaXMgYSB3b3JrYXJvdW5kIHdoZXJlIHdlIGNyZWF0ZSBhZGRpdGlvbmFsIHJvdyB0aGF0IHNldHMgcGFkZGluZyByaWdodFxuICAgICAqIGFuZCB0aGlzIHdpbGwgcHJldmVudCB0aGUgY29sdW1uIHRvIGNvbGxhcHNlIHVuZGVyIHNwZWNpZmllZCB3aWR0aFxuICAgICAqXG4gICAgICogdG9kbzogc3RpbGwgVEJEXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtaW5XaWR0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTWFpbiByZW5kZXJpbmcgdGVtcGxhdGUgdXNlZCBieSBkYXRhdGFibGUgdG8gcmVuZGVyIGVhY2ggY29sdW1uLlxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ3JlbmRlcmluZ1RlbXBsYXRlJylcbiAgICByZW5kZXJlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGhlYWRlciB0ZW1wbGF0ZS4gSXQgd2lsbCBvdmVycmlkZSBwcm92aWRlZCBsYWJlbFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlcicpXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gc3ViSGVhZGVyIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3N1YkhlYWRlcicpXG4gICAgc3ViSGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gYm9keSB0ZW1wbGF0ZSB0aGF0IHdpbGwgb3ZlcnJpZGUgcmVhZCB2YWx1ZSBmcm9tIHRoZSBba2V5XSBiaW5kaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYm9keScpXG4gICAgYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4uLlxuICAgICAqL1xuICAgIHNvcnRPcmRlcjogbnVtYmVyO1xuICAgIG1heFdpZHRoUHg6IG51bWJlciA9IDA7XG4gICAgbWluV2lkdGhQeDogbnVtYmVyID0gMDtcbiAgICB3aWR0aFB4OiBudW1iZXIgPSAwO1xuICAgIHdpZGVzdENlbGw6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gRGF0YXRhYmxlIEltcGxlbWVudGF0aW9uc1xuICAgICAqL1xuICAgIGR0OiBBV0RhdGFUYWJsZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuc29ydE9yZGVyaW5nKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmJvZHlUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlUZW1wbGF0ZSA9IHRoaXMuZHQuYm9keVRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5oZWFkZXJUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSB0aGlzLmR0LmhlYWRlclRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdWJIZWFkZXJUZW1wbGF0ZSkgJiYgdGhpcy51c2VHbG9iYWxTdWJIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViSGVhZGVyVGVtcGxhdGUgPSB0aGlzLmR0LnN1YkhlYWRlclRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5ib2R5Q2xhc3NGbikpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzRm4gPSB0aGlzLmR0LmJvZHlDbGFzc0ZuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5rZXkpICYmIGlzQmxhbmsodGhpcy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBiaW5kaW5nOiAnICtcbiAgICAgICAgICAgICAgICAnW2tleV0gb3IgW2xhYmVsXSBiaW5kaW5ncyBtdXN0IGJlIHVzZWQgYXQgbWluaW11bScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG8gYmUgYWJsZSB0byBwb3NpdGlvbiBzZWNvbmQgRFQgd2UgcmVxdWlyZSBbd2lkdGhdIHRvIGJlIHNldCBhcyB3ZWxsXG4gICAgICAgIGlmICh0aGlzLmZyb3plbiAmJiBpc0JsYW5rKHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYmluZGluZyBbd2lkdGhdOiAnICtcbiAgICAgICAgICAgICAgICAnd2hlbiBbZnJvemVuXT10cnVlIHRoZW4gW3dpZHRoXSBiaW5kaW5nIG5lZWRzIHRvIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIG5lZWQgdG8gZGVmZmVyIHRoaXMgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBvdGhlcndpc2UgSSBnZXRcbiAgICAgICAgLy8gdmFsdWUgd2FzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQgZXJyb3JcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1heFdpZHRoUHggPSB0aGlzLndpZHRoVG9QeCh0aGlzLm1heFdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMubWluV2lkdGhQeCA9IHRoaXMud2lkdGhUb1B4KHRoaXMubWluV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy53aWR0aFB4ID0gdGhpcy53aWR0aFRvUHgodGhpcy53aWR0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBjZWxsIHNlbGVjdGlvbk1vZGUgaXMgZW5hYmxlZCB0aGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiB3ZSBjbGljayBvbiBoZWFkZXIuXG4gICAgICogSXQgZGVsZWdhdGVzIHRoZSBjYWxsIHRvIHRoZSBEVCB3aGVyZSBpdCB0b2dnbGVzIGN1cnJlbnRseSBzZWxlY3RlZCB2YWx1ZVxuICAgICAqXG4gICAgICovXG4gICAgaGFuZGxlSGVhZGVyQ2xpY2soZXZlbnQ6IGFueSwgZWxlbWVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSGVhZGVyU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVG9kbzogSW1wbGVtZW50IG91ciBvd24gc29ydGluZyBtZWNoYW5pc20gb25jZSB3ZSBleHRyYWN0IHRoZSBzb3J0aW5nIGxvZ2ljIHRvIGl0cyBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnQoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHRoaXMuZG9tSGFuZGxlci5oYXNDbGFzcyh0YXJnZXROb2RlLCAnZHQtdS1zb3J0YWJsZScpIHx8XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3ModGFyZ2V0Tm9kZSwgJ2R0LWNvbC10aXRsZScpIHx8XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3ModGFyZ2V0Tm9kZSwgJ2R0LWNvbC1zb3J0YWJsZS1pY29uJykpIHtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LnNvcnRDb2x1bW4pICYmIHRoaXMuZHQuc29ydENvbHVtbi5rZXkgPT09IHRoaXMua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLnNvcnRPcmRlciAqIC0xO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyaW5nID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JOdW1iZXIodGhpcy5zb3J0T3JkZXIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuc29ydENvbHVtbiA9IHRoaXM7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5zb3J0S2V5ID0gdGhpcy5rZXk7XG4gICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUuc29ydE9yZGVyID0gdGhpcy5kdC5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5zb3J0T3JkZXJpbmcpO1xuXG4gICAgICAgICAgICB0aGlzLmR0LnNvcnRTaW5nbGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmR0LnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZWQgc3R5bGUgY2xhc3MgYmFzZWQgb24gZGF0YVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBkeW5hbWljQm9keUNsYXNzKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZHluQ2xhc3MgPSBpc1ByZXNlbnQodGhpcy5ib2R5Q2xhc3NGbilcbiAgICAgICAgICAgID8gdGhpcy5ib2R5Q2xhc3NGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSkgOiAnJztcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYm9keVN0eWxlQ2xhc3MpKSB7XG4gICAgICAgICAgICBkeW5DbGFzcyArPSAnICcgKyB0aGlzLmJvZHlTdHlsZUNsYXNzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuc3R5bGVDbGFzcykpIHtcbiAgICAgICAgICAgIGR5bkNsYXNzICs9ICcgJyArIHRoaXMuc3R5bGVDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkeW5DbGFzcztcbiAgICB9XG5cblxuICAgIGlzUm93U2VsZWN0YWJsZShpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LmlzUm93U2VsZWN0YWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmR0LmlzUm93U2VsZWN0YWJsZShpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0NlbGxTZWxlY3RhYmxlKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnY2VsbCcgJiYgdGhpcy5pc1Jvd1NlbGVjdGFibGUoaXRlbSkgJiYgdGhpcy5zZWxlY3RhYmxlO1xuXG4gICAgfVxuXG5cbiAgICBpc0hlYWRlclNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdjZWxsJyAmJiB0aGlzLnNlbGVjdGFibGU7XG5cbiAgICB9XG5cblxuICAgIGdldFNvcnRPcmRlcigpIHtcbiAgICAgICAgbGV0IG9yZGVyID0gMDtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHQuc29ydENvbHVtbikgJiYgdGhpcy5rZXkgPT09IHRoaXMuZHQuc29ydENvbHVtbi5rZXkpIHtcbiAgICAgICAgICAgIG9yZGVyID0gdGhpcy5kdC5zb3J0Q29sdW1uLnNvcnRPcmRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5kdC5zb3J0Q29sdW1uKSAmJiB0aGlzLmtleSA9PT0gdGhpcy5kdC5zb3J0Q29sdW1uLmtleTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKHRhYmxlOiBBV0RhdGFUYWJsZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmR0ID0gdGFibGU7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0LmluaXRpYWxTb3J0S2V5KSAmJiB0aGlzLmR0LmluaXRpYWxTb3J0S2V5ID09PSB0aGlzLmtleSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuZHQuaW5pdGlhbFNvcnRPcmRlcik7XG4gICAgICAgICAgICB0aGlzLmR0LnNvcnRDb2x1bW4gPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhlIHZpZXcgaW5pdCBjeWNsZSBmcm9tIHRoZSBkdC5uZ0FmdGVyVmlld0NoZWNrZWQuXG4gICAgICpcbiAgICAgKiBJbiBjYXNlIHdlIHVzZSBNYXhXaWR0aCBkaXJlY3RpdmUgd2Ugc2V0IG5ldyB3aWR0aCBvbmNlIGZvciBhbGwgY29sdW1zblxuICAgICAqL1xuICAgIHBvc3RJbml0aWFsaXplKG15SW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IG15SW5kZXggKyAxO1xuICAgICAgICBsZXQgdGFibGU7XG5cbiAgICAgICAgaWYgKHRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICB0YWJsZSA9ICg8RGF0YXRhYmxlMkNvbXBvbmVudD50aGlzLmR0KS5lbFxuICAgICAgICAgICAgICAgIC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LWZyb3plbiB0YWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFibGUgPSAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy53aWRlc3RDZWxsID4gMCkge1xuICAgICAgICAgICAgbGV0IGFsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyIHRoOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKSwgJyArXG4gICAgICAgICAgICAgICAgJ3RyIHRkOm50aC1jaGlsZCgnICsgY29sSW5kZXggKyAnKScpLmZvckVhY2goKG5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB0aGlzLndpZGVzdENlbGwgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFlvdSBlaXRoZXIgdXNlIHRoaXMgYmluZGluZyBkaXJlY3RseSBhbmQgc2F5IGl0cyBkYXRhY29sdW1uIG9yIHdoZW4gdGhlcmUgaXMgYSBba2V5XVxuICAgICAqIGJpZGluZyB3ZSBrbm93IGl0IHJlZmVycyB0byBzb21lIGZpZWxkLlxuICAgICAqXG4gICAgICovXG4gICAgaXNWYWx1ZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5pc0RhdGFDb2x1bW4pICYmIEJvb2xlYW5XcmFwcGVyLmlzVHJ1ZSh0aGlzLmlzRGF0YUNvbHVtbikpIHx8XG4gICAgICAgICAgICBpc1ByZXNlbnQodGhpcy5rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIGluIG91dGxpbmUgbW9kZSAgd2UgbmVlZCB0byBhbHNvIGluZGVuZCBlYWNoIHNlbGVjdGlvbiBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgICAqXG4gICAgICogaW5kZW50IC0gMSA+IG9ubHkgb2Zmc2V0IHdpdGhcbiAgICAgKiBpbmRlbnRcbiAgICAgKi9cbiAgICBpbmRlbnRGb3JDb250cm9sKGNlbGw6IGFueSwgbGV2ZWw6IG51bWJlcik6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLmR0LmlzT3V0bGluZSgpICYmIGxldmVsID4gMCAmJiBjZWxsLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgJiYgaXNQcmVzZW50KGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nKSkge1xuXG4gICAgICAgICAgICBsZXQgb3V0bGluZU5vZGVQYWRkaW5nID1cbiAgICAgICAgICAgICAgICBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nKS5wYWRkaW5nTGVmdCkgfHwgMDtcblxuICAgICAgICAgICAgLy8gMXN0IGxldmVsIGlzIHB1c2hlZCBhcyByb290XG4gICAgICAgICAgICBpZiAodGhpcy5kdC5wdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGxldmVsID09PSAxKSA/IG51bGwgOiAodGhpcy5kdC5pbmRlbnRhdGlvblBlckxldmVsICogbGV2ZWwpXG4gICAgICAgICAgICAgICAgICAgIC0gb3V0bGluZU5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuZHQuaW5kZW50YXRpb25QZXJMZXZlbCAqIGxldmVsKSArIG91dGxpbmVOb2RlUGFkZGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW50ZXJuYWxcbiAgICAgKi9cbiAgICBwcml2YXRlIHdpZHRoVG9QeCh3aWR0aDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHB4O1xuICAgICAgICBpZiAoaXNQcmVzZW50KHdpZHRoKSkge1xuICAgICAgICAgICAgaWYgKHdpZHRoLmluZGV4T2YoJyUnKSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub25QYyA9IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgICAgIHB4ID0gbm9uUGMgKiAoPERhdGF0YWJsZTJDb21wb25lbnQ+dGhpcy5kdCkuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHggPSBwYXJzZUZsb2F0KHdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBweDtcbiAgICB9XG59XG5cbiJdfQ==