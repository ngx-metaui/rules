/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ElementRef, forwardRef, Inject, Input, PLATFORM_ID, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { assert, Environment, isPresent } from '@aribaui/core';
import { Datatable2Component } from '../datatable2.component';
import { BaseComponent } from '../../../core/base.component';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { InfiniteScrollComponent } from '../../../core/infite-scroll/infite-scroll.component';
import { DomUtilsService } from '../../../core/dom-utils.service';
/**
 * Please see datatable for more detail description. But the main goal of this wrapper to remove
 * all the common surrounding parts around the datatable and make sure DT can focus only actual
 * header and body structure
 *
 * It is expected that wrapper also provides some code for the sliding up panel containing
 * buttons and other actions that will be used during editing
 *
 *
 * Todo: Extract the expand logic out into some directive or component or just a class
 *
 */
var DTWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(DTWrapper, _super);
    function DTWrapper(env, render, thisElement, domUtils, platformId, dt) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.render = render;
        _this.thisElement = thisElement;
        _this.domUtils = domUtils;
        _this.platformId = platformId;
        _this.dt = dt;
        /**
         * Color that is used by full screen div overlay to create expanding effect which needs to have
         * little tent;
         *
         */
        _this.expandColorFrom = '#f3f3f3';
        /**
         * Color that is used to set after we are in the full screen so our overlay div hide everything
         * on the page
         *
         */
        _this.expandColorTo = '#FFFFFF';
        /**
         * In order to debounce the typing we need to use subject
         *
         */
        _this.searchTerms = new Subject();
        /**
         *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
         *
         */
        _this.isFullScreenMode = false;
        /**
         * Tells if we can support full screen mode - only available for the browser
         *
         */
        _this.supportFullScreen = true;
        return _this;
    }
    /**
     * @return {?}
     */
    DTWrapper.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.querySubscription = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), switchMap(function (term) { return of(term); })).subscribe(function (term) {
            if (term) {
                _this.dt.dataSource.find(term);
            }
        });
        this.loadingSub = this.dt.valueChange
            .subscribe(function (data) { return _this.loadingFinished(); });
    };
    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     */
    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     * @return {?}
     */
    DTWrapper.prototype.calculateFrozenWidth = /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     * @return {?}
     */
    function () {
        if (!this.dt.hasFrozenColumns()) {
            return null;
        }
        var /** @type {?} */ fWidth = 0;
        this.dt.frozenColumns.forEach(function (col) {
            if (col.maxWidthPx > 0) {
                fWidth += col.widestCell;
            }
            else {
                fWidth += parseInt(col.width);
            }
        });
        return fWidth;
    };
    /**
     * When having two separate tables we need to make sure that rows of the tables are aligned.
     *
     * Therefore this method takes first column from each table read the height of the rows and set
     * the max height to both rows.
     *
     *
     */
    /**
     * When having two separate tables we need to make sure that rows of the tables are aligned.
     *
     * Therefore this method takes first column from each table read the height of the rows and set
     * the max height to both rows.
     *
     *
     * @param {?} frozenView
     * @param {?} unFrozenView
     * @return {?}
     */
    DTWrapper.prototype.alignTablesHeights = /**
     * When having two separate tables we need to make sure that rows of the tables are aligned.
     *
     * Therefore this method takes first column from each table read the height of the rows and set
     * the max height to both rows.
     *
     *
     * @param {?} frozenView
     * @param {?} unFrozenView
     * @return {?}
     */
    function (frozenView, unFrozenView) {
        assert(isPresent(frozenView) && isPresent(frozenView), 'Cant align table views as one of the view is undefined');
        var /** @type {?} */ frozenRows = frozenView.querySelectorAll('table tr');
        var /** @type {?} */ unFrozenRows = unFrozenView.querySelectorAll('table tr');
        assert(frozenRows.length === unFrozenRows.length, 'Frozen Column: Two tables does not much!');
        Array.from(frozenRows).forEach(function (frozen, index) {
            var /** @type {?} */ h = Math.max(frozen.offsetHeight, unFrozenRows[index].offsetHeight);
            frozen.style.height = h + 'px';
            unFrozenRows[index].style.height = h + 'px';
        });
    };
    /**
     * @return {?}
     */
    DTWrapper.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initFullScreen();
    };
    /**
     * @return {?}
     */
    DTWrapper.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.dt.hasFrozenColumns()) {
            var /** @type {?} */ frozenView = this.thisElement.nativeElement.querySelector('.dt-body-frozen');
            var /** @type {?} */ unFrozenView = this.thisElement.nativeElement.querySelector('.dt-body-unfrozen');
            var /** @type {?} */ frozenWidth = this.calculateFrozenWidth();
            frozenView.style.width = frozenWidth + 'px';
            if (isPresent(unFrozenView)) {
                // include border and create indent effect by having 1px white space
                unFrozenView.style.left = (frozenWidth + 2) + 'px';
                unFrozenView.style.width = unFrozenView.parentElement.offsetWidth
                    - frozenView.offsetWidth + 'px';
                this.alignTablesHeights(frozenView, unFrozenView);
            }
        }
    };
    /**
     * @return {?}
     */
    DTWrapper.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        if (isPresent(this.querySubscription)) {
            this.querySubscription.unsubscribe();
        }
        if (isPresent(this.loadingSub)) {
            this.loadingSub.unsubscribe();
        }
    };
    /**
     * FULL SCREEN MODE methods
     */
    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     */
    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     * @param {?} event
     * @return {?}
     */
    DTWrapper.prototype.toggleFullScreen = /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isFullScreenMode) {
            this.closeFullScreen(event);
        }
        else {
            this.openFullScreen(event);
        }
    };
    /**
     * To push this component to full screen mode or maybe full page mode we need run following:
     *
     *  - Execute expand transformation, where we have additional overlay div that we slowly expand
     *  and this creates impression the DT is expanding
     *
     *  - apply full-screen class on top host element  - in this case its DataTable to switch
     *  to absolute positioning
     *
     *  - make sure we are scrolled all the way up
     *
     *  - hide all the elements on the page so their dimension don't interfere with this table.
     *
     *
     */
    /**
     * To push this component to full screen mode or maybe full page mode we need run following:
     *
     *  - Execute expand transformation, where we have additional overlay div that we slowly expand
     *  and this creates impression the DT is expanding
     *
     *  - apply full-screen class on top host element  - in this case its DataTable to switch
     *  to absolute positioning
     *
     *  - make sure we are scrolled all the way up
     *
     *  - hide all the elements on the page so their dimension don't interfere with this table.
     *
     *
     * @param {?} event
     * @return {?}
     */
    DTWrapper.prototype.openFullScreen = /**
     * To push this component to full screen mode or maybe full page mode we need run following:
     *
     *  - Execute expand transformation, where we have additional overlay div that we slowly expand
     *  and this creates impression the DT is expanding
     *
     *  - apply full-screen class on top host element  - in this case its DataTable to switch
     *  to absolute positioning
     *
     *  - make sure we are scrolled all the way up
     *
     *  - hide all the elements on the page so their dimension don't interfere with this table.
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isFullScreenMode = true;
        this.runExpandEffect();
        this.originalScrollPosition = window.pageYOffset;
        window.scroll(0, 0);
        this.toggleFullScreenOnDT(true);
        // mark my element in the path that needs to stay
        var /** @type {?} */ parentNode = this.thisElement.nativeElement.parentNode;
        while (isPresent(parentNode) && parentNode.tagName !== 'BODY') {
            parentNode.classList.add('u-full-screen-element');
            parentNode = parentNode.parentNode;
        }
        this.hideNonFullScreenElement(document.body);
        this.dt.state.limit = Math.round(this.calculateLimit());
        this.dt.dataSource.fetch(this.dt.state);
        // once loaded set back correct page size we use when loading data
        this.dt.state.limit = this.dt.pageSize;
    };
    /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     */
    /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     * @param {?} event
     * @return {?}
     */
    DTWrapper.prototype.closeFullScreen = /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.isFullScreenMode = false;
        this.showNonFullScreenElement();
        this.runCollapseEffect();
        this.toggleFullScreenOnDT(false);
        this.dt.dataSource.state.limit = this.dt.dataSource.state.displayLimit;
        this.dt.dataSource.state.offset = 0;
        this.dt.dataSource.fetch(this.dt.dataSource.state);
        setTimeout(function () {
            window.scroll(0, _this.originalScrollPosition);
        }, 300);
    };
    /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     * @return {?}
     */
    DTWrapper.prototype.runExpandEffect = /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     * @return {?}
     */
    function () {
        var _this = this;
        this.dtBoundingClientRect = this.thisElement.nativeElement.getBoundingClientRect();
        this.updateElement();
        this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorFrom;
        this.dtFullScreenOverlay.nativeElement.style.opacity = 1;
        this.applyTransformation(true);
        setTimeout(function () {
            _this.dtFullScreenOverlay.nativeElement.style.backgroundColor = _this.expandColorTo;
        }, 300);
    };
    /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     * @return {?}
     */
    DTWrapper.prototype.runCollapseEffect = /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateElement();
        this.applyTransformation(false);
        setTimeout(function () {
            _this.updateElement();
            _this.dtFullScreenOverlay.nativeElement.style.opacity = 0;
        }, 200);
        setTimeout(function () {
            _this.updateElement(_this.dtBoundingClientRect.left, _this.dtBoundingClientRect.top, 0, 0);
        }, 400);
    };
    /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     * @param {?} parentElement
     * @return {?}
     */
    DTWrapper.prototype.hideNonFullScreenElement = /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     * @param {?} parentElement
     * @return {?}
     */
    function (parentElement) {
        if (this.thisElement.nativeElement.parentNode === parentElement) {
            return;
        }
        for (var /** @type {?} */ i = 0; i < parentElement.children.length; i++) {
            var /** @type {?} */ element = parentElement.children[i];
            if (this.needTraverseDown(element)) {
                this.hideNonFullScreenElement(element);
            }
            else if (!element.classList.contains('dt-full-screen')) {
                element.classList.add('u-fs-element-out');
            }
        }
    };
    /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     * @return {?}
     */
    DTWrapper.prototype.showNonFullScreenElement = /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     * @return {?}
     */
    function () {
        Array.from(document.querySelectorAll('.u-fs-element-out'))
            .forEach(function (elem) { return elem.classList.remove('u-fs-element-out'); });
    };
    /**
     * \@Internal
     *
     * @param {?} element
     * @return {?}
     */
    DTWrapper.prototype.needTraverseDown = /**
     * \@Internal
     *
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return isPresent(element) && element.tagName !== 'SCRIPT' &&
            element.classList.contains('u-full-screen-element') &&
            !element.classList.contains('dt-full-screen');
    };
    /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     * @return {?}
     */
    DTWrapper.prototype.calculateLimit = /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ browserH = this.domUtils.browserDimentions().height;
        var /** @type {?} */ rowH = this.dt.el.nativeElement.querySelector('tbody tr:first-child').offsetHeight;
        return (isPresent(rowH) && rowH > 0) ? (browserH / rowH) + 20 : 50;
    };
    /**
     * \@Internal
     *
     * @param {?=} l
     * @param {?=} t
     * @param {?=} w
     * @param {?=} h
     * @return {?}
     */
    DTWrapper.prototype.updateElement = /**
     * \@Internal
     *
     * @param {?=} l
     * @param {?=} t
     * @param {?=} w
     * @param {?=} h
     * @return {?}
     */
    function (l, t, w, h) {
        if (l === void 0) { l = this.dtBoundingClientRect.left; }
        if (t === void 0) { t = this.dtBoundingClientRect.top; }
        if (w === void 0) { w = this.dtBoundingClientRect.width; }
        if (h === void 0) { h = this.dtBoundingClientRect.height; }
        this.dtFullScreenOverlay.nativeElement.style.left = l + 'px';
        this.dtFullScreenOverlay.nativeElement.style.top = t + 'px';
        this.dtFullScreenOverlay.nativeElement.style.width = w + 'px';
        this.dtFullScreenOverlay.nativeElement.style.height = h + 'px';
    };
    /**
     * \@Internal
     *
     * @param {?} expand
     * @return {?}
     */
    DTWrapper.prototype.applyTransformation = /**
     * \@Internal
     *
     * @param {?} expand
     * @return {?}
     */
    function (expand) {
        var /** @type {?} */ x, /** @type {?} */ y, /** @type {?} */ tx, /** @type {?} */ ty;
        if (expand) {
            x = window.innerWidth / this.dtBoundingClientRect.width;
            y = window.innerHeight / this.dtBoundingClientRect.height;
            tx = (window.innerWidth / 2 - this.dtBoundingClientRect.width / 2
                - this.dtBoundingClientRect.left) / x;
            ty = (window.innerHeight / 2 - this.dtBoundingClientRect.height / 2
                - this.dtBoundingClientRect.top) / y;
        }
        else {
            x = 1;
            y = 1;
            tx = this.dtBoundingClientRect.left;
            ty = this.dtBoundingClientRect.top;
        }
        this.dtFullScreenOverlay.nativeElement.style.transform =
            'scaleX(' + x + ') scaleY(' + y + ') translate3d(' + (tx) + 'px, ' + (ty) + 'px, 0px)';
    };
    /**
     * @return {?}
     */
    DTWrapper.prototype.initFullScreen = /**
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            this.supportFullScreen = false;
            return;
        }
        this.render.appendChild(document.body, this.dtFullScreenOverlay.nativeElement);
    };
    /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     */
    /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     * @param {?} fullScreen
     * @return {?}
     */
    DTWrapper.prototype.toggleFullScreenOnDT = /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     * @param {?} fullScreen
     * @return {?}
     */
    function (fullScreen) {
        var _this = this;
        this.dt.el.nativeElement.style.opacity = 0;
        setTimeout(function () {
            if (fullScreen) {
                _this.dt.classList += 'dt-full-screen';
                _this.dt.el.nativeElement.style.opacity = 1;
            }
            else {
                _this.dt.classList = _this.dt.classList.replace('dt-full-screen', '');
                _this.dt.el.nativeElement.style.opacity = 1;
            }
        }, 200);
    };
    /**
     * INFINITE SCROLLING METHODS
     */
    /**
     * Listen for infinite scroll event and request new data from data source
     *
     */
    /**
     * Listen for infinite scroll event and request new data from data source
     *
     * @param {?} event
     * @return {?}
     */
    DTWrapper.prototype.onLazyLoad = /**
     * Listen for infinite scroll event and request new data from data source
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.isLoad) {
            this.dt.state.offset = event.offset;
            this.dt.dataSource.fetch(this.dt.state);
        }
        else {
            var /** @type {?} */ dataProvider = this.dt.dataSource.dataProvider;
            var /** @type {?} */ data = dataProvider.dataChanges.getValue();
            dataProvider.dataChanges.next(data.slice(0, event.offset));
        }
    };
    /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     * @return {?}
     */
    DTWrapper.prototype.loadingFinished = /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPresent(this.infiniteScroll)) {
            setTimeout(function () { return _this.infiniteScroll.complete(); }, 200);
        }
    };
    DTWrapper.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-wrapper',
                    template: "<div [ngClass]=\"dt.styleClass\" [class.dt-full-screen-mode]=\"isFullScreenMode\"\n     [style.width]=\"dt.width\"\n>\n    <div class=\"dt-loading-overlay\" *ngIf=\"dt.loading\"></div>\n    <div class=\"dt-loading-content\" *ngIf=\"dt.loading\">\n        <i [class]=\"'sap-icon u-dt-spin-icon ' + dt.loadingIcon\"></i>\n    </div>\n\n    <div class=\"dt-header\" *ngIf=\"dt.showTableHeader\">\n        <ng-template *ngIf=\"dt.header; then appDefinedHeader else defaultHeader\"></ng-template>\n    </div>\n\n    <!-- DT BODY with table headers and values -->\n    <div class=\"dt-body-wrapper-view\">\n        <ng-template\n            *ngIf=\"dt.hasFrozenColumns(); then dtBodyWithFrozenColumns else dtBodyNoFrozenColumns\">\n        </ng-template>\n    </div>\n\n    <!--<div class=\"dt-footer\" *ngIf=\"footer\">-->\n    <!--&lt;!&ndash; footerArea&ndash;&gt;-->\n    <!--<ng-content select=\"aw-dt-footer\"></ng-content>-->\n    <!--</div>-->\n</div>\n\n<!-- todo: dont activate this if we reached the end of list - -->\n<aw-infinite-scroll #infiniteScroll *ngIf=\"isFullScreenMode\"\n                    [distance]=\"'10%'\"\n                    [fetchSize]=\"dt.state.limit\"\n                    (onLoad)=\"onLazyLoad($event)\">\n</aw-infinite-scroll>\n\n\n<ng-template #appDefinedHeader>\n    <ng-container *ngTemplateOutlet=\"heading;\"></ng-container>\n</ng-template>\n\n<ng-template #defaultHeader>\n    <div class=\"dt-global-filter\">\n        <span class=\"sap-icon icon-filter\"></span>\n    </div>\n\n    <div class=\"dt-global-actions\">\n        <div class=\"dt-action-combo\">\n            <span *ngIf=\"supportFullScreen\" class=\"sap-icon icon-resize\"\n                  (click)=\"toggleFullScreen($event)\"></span>\n\n            <aw-input-field *ngIf=\"dt.showGlobalSearch\" styleClass=\"dt-table-search\"\n                            [(ngModel)]=\"dt.state.currentSearchQuery\"\n                            placeHolder=\"search\"\n                            icon=\"icon-search\"\n                            (ngModelChange)=\"searchTerms.next($event)\">\n            </aw-input-field>\n            <span class=\"ariba-icon icon-more\"></span>\n        </div>\n    </div>\n</ng-template>\n\n\n<ng-template #dtBodyNoFrozenColumns>\n    <!--\n        For non-frozen case we also need to set TRUE as the view is actually frozen and does not\n        scroll.\n        We use this frozenColumns flag inside DT to properly set column index on the header level\n        columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))\n\n        therefore we need to set true even in this case to return real columnIndex since we dont\n        have the second table.\n    -->\n    <ng-container *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.columns, frozenColumns: true }\">\n    </ng-container>\n</ng-template>\n\n<ng-template #dtBodyWithFrozenColumns>\n    <ng-container\n        *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.frozenColumns, frozenColumns: true }\">\n    </ng-container>\n    <ng-container\n        *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.columns, frozenColumns: false }\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #dtBody let-columns let-frozenColumns=\"frozenColumns\">\n\n    <div #dtContainer class=\"dt-body-wrapper\"\n         [style.width.px]=\"this.calculateFrozenWidth()\"\n         [class.dt-body-unfrozen]=\"dt.hasFrozenColumns() && !frozenColumns\"\n         [class.dt-body-frozen]=\"dt.hasFrozenColumns() && frozenColumns\"\n    >\n\n        <table [ngClass]=\"dt.tableStyleClass\"\n               [style.width]=\"frozenColumns ? null : dt.scrollWidth\"\n               [class.dt-pivot-layout]=\"dt.pivotalLayout\"\n               [class.dt-plain-layout]=\"!dt.pivotalLayout && !dt.isOutline()\">\n\n            <!-- Render TH header rows-->\n            <thead class=\"dt-thead\">\n                <ng-container *ngTemplateOutlet=\"headerRows; context:{$implicit: columns,frozenColumns:frozenColumns }\">\n                </ng-container>\n            </thead>\n\n            <!--\n                Render data rows. For data rows we need to keep tbody tag inside DT table\n                due to Outline\n             -->\n            <ng-container *ngTemplateOutlet=\"bodyRows; context:{$implicit: columns,  frozenColumns:frozenColumns }\">\n            </ng-container>\n        </table>\n    </div>\n</ng-template>\n\n\n<div #dtFullScreenOverlay class=\"dt-full-screen-overlay u-full-screen-element\"></div>\n",
                    styles: [".dt-footer,.dt-header{text-align:center;padding:.5em .75em;box-sizing:border-box}.dt-footer{border-top:0}.dt-thead tr{border-width:0}.dt-body-wrapper-view{position:relative}.dt-body-wrapper{overflow:hidden;border:1px solid #d7d7d7}.dt-body-wrapper.dt-body-unfrozen{border-left-color:transparent;position:absolute;top:0;overflow-x:auto}.dt-loading-overlay{position:absolute;background-color:#9b9b9b;width:100%;height:100%;opacity:.1;z-index:1}.dt-loading-content{position:absolute;left:50%;top:25%;z-index:2}.dt-header{width:100%;display:flex;flex-flow:row nowrap;justify-content:space-between;color:#363636;border-bottom:1px solid #f1f1f1;margin-bottom:30px}.dt-header .dt-global-filter{flex:0 0;align-items:flex-start;font-size:18px}.dt-header .dt-global-actions{flex:0 0;align-items:flex-end}.dt-header .dt-action-combo{display:flex;flex-flow:row nowrap;color:#7d7d7d}.dt-header .dt-action-combo .ariba-icon,.dt-header .dt-action-combo .sap-icon{margin-left:15px;font-size:20px;align-self:center;cursor:pointer}.dt-header .dt-action-combo .dt-table-search{border-top-color:transparent;border-left-color:transparent;border-right-color:transparent}.dt-header .dt-action-combo .icon-resize{color:#4a4a4a;font-size:16px;line-height:18px;margin-right:15px}.u-dt-spin-icon{display:inline-block;-webkit-animation:2s linear infinite doSpin;animation:2s linear infinite doSpin}@-webkit-keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.dt-full-screen-overlay{position:fixed;z-index:100;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:all .4s ease-in-out}.dt-full-screen{width:98vw;z-index:120;position:absolute;top:15px;pointer-events:all;transition:opacity .5s ease-in-out}.u-fs-element-out{display:none}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    DTWrapper.ctorParameters = function () { return [
        { type: Environment },
        { type: Renderer2 },
        { type: ElementRef },
        { type: DomUtilsService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(function () { return Datatable2Component; }),] }] }
    ]; };
    DTWrapper.propDecorators = {
        expandColorFrom: [{ type: Input }],
        expandColorTo: [{ type: Input }],
        heading: [{ type: ContentChild, args: ['headingArea',] }],
        headerRows: [{ type: ContentChild, args: ['headerRows',] }],
        bodyRows: [{ type: ContentChild, args: ['bodyRows',] }],
        footer: [{ type: ContentChild, args: ['footerArea',] }],
        dtFullScreenOverlay: [{ type: ViewChild, args: ['dtFullScreenOverlay',] }],
        infiniteScroll: [{ type: ViewChild, args: ['infiniteScroll',] }]
    };
    return DTWrapper;
}(BaseComponent));
export { DTWrapper };
function DTWrapper_tsickle_Closure_declarations() {
    /**
     * Color that is used by full screen div overlay to create expanding effect which needs to have
     * little tent;
     *
     * @type {?}
     */
    DTWrapper.prototype.expandColorFrom;
    /**
     * Color that is used to set after we are in the full screen so our overlay div hide everything
     * on the page
     *
     * @type {?}
     */
    DTWrapper.prototype.expandColorTo;
    /**
     *
     * Table heading area offers developer to completely override the top bar where we have filters
     * and others actions.
     *
     * @type {?}
     */
    DTWrapper.prototype.heading;
    /**
     * Renders table headers and wraps them within thead tag
     * @type {?}
     */
    DTWrapper.prototype.headerRows;
    /**
     * Renders table body
     * @type {?}
     */
    DTWrapper.prototype.bodyRows;
    /**
     * The same as heading template. We need to remove this dependency on primeNG so far it is using
     * p-footer
     * @type {?}
     */
    DTWrapper.prototype.footer;
    /**
     * Div used to make the full screen expansion effect
     * @type {?}
     */
    DTWrapper.prototype.dtFullScreenOverlay;
    /**
     * Reference to infite scroll. We are using this to trigger loading finish event so we can
     * hide loading animation
     * @type {?}
     */
    DTWrapper.prototype.infiniteScroll;
    /**
     * In order to debounce the typing we need to use subject
     *
     * @type {?}
     */
    DTWrapper.prototype.searchTerms;
    /**
     *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
     *
     * @type {?}
     */
    DTWrapper.prototype.isFullScreenMode;
    /**
     * Tells if we can support full screen mode - only available for the browser
     *
     * @type {?}
     */
    DTWrapper.prototype.supportFullScreen;
    /**
     *  Saves original bounding rect coordinates before we expand the DT to full screen
     *
     * @type {?}
     */
    DTWrapper.prototype.dtBoundingClientRect;
    /**
     * Remembers original scroll position before we switch to full screen mode
     * @type {?}
     */
    DTWrapper.prototype.originalScrollPosition;
    /** @type {?} */
    DTWrapper.prototype.querySubscription;
    /** @type {?} */
    DTWrapper.prototype.loadingSub;
    /** @type {?} */
    DTWrapper.prototype.env;
    /** @type {?} */
    DTWrapper.prototype.render;
    /** @type {?} */
    DTWrapper.prototype.thisElement;
    /** @type {?} */
    DTWrapper.prototype.domUtils;
    /** @type {?} */
    DTWrapper.prototype.platformId;
    /** @type {?} */
    DTWrapper.prototype.dt;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL3RhYmxlLXdyYXBwZXIvdGFibGUtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUdILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUE0QixFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBeUlqQyxxQ0FBYTtJQXVHeEMsbUJBQW9CLEdBQWdCLEVBQ2YsUUFDQSxhQUNBLFVBQ3FCLFVBQWtCLEVBRXhDLEVBQXVCO1FBTjNDLFlBUUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFUbUIsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUNmLFlBQU0sR0FBTixNQUFNO1FB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bUIsRUFBbkIsQ0FBbUIsQ0FBQzs7O2tDQXBHekQsS0FBSztnQ0FTTCxLQUFLOzBCQVVMLFlBQVksU0FBQyxhQUFhOzZCQU8xQixZQUFZLFNBQUMsWUFBWTsyQkFPekIsWUFBWSxTQUFDLFVBQVU7eUJBUXZCLFlBQVksU0FBQyxZQUFZO3NDQU96QixTQUFTLFNBQUMscUJBQXFCO2lDQVEvQixTQUFTLFNBQUMsZ0JBQWdCOztvQkFuUC9CO0VBbUwrQixhQUFhO1NBQS9CLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmZpbml0ZVNjcm9sbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50JztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBQbGVhc2Ugc2VlIGRhdGF0YWJsZSBmb3IgbW9yZSBkZXRhaWwgZGVzY3JpcHRpb24uIEJ1dCB0aGUgbWFpbiBnb2FsIG9mIHRoaXMgd3JhcHBlciB0byByZW1vdmVcbiAqIGFsbCB0aGUgY29tbW9uIHN1cnJvdW5kaW5nIHBhcnRzIGFyb3VuZCB0aGUgZGF0YXRhYmxlIGFuZCBtYWtlIHN1cmUgRFQgY2FuIGZvY3VzIG9ubHkgYWN0dWFsXG4gKiBoZWFkZXIgYW5kIGJvZHkgc3RydWN0dXJlXG4gKlxuICogSXQgaXMgZXhwZWN0ZWQgdGhhdCB3cmFwcGVyIGFsc28gcHJvdmlkZXMgc29tZSBjb2RlIGZvciB0aGUgc2xpZGluZyB1cCBwYW5lbCBjb250YWluaW5nXG4gKiBidXR0b25zIGFuZCBvdGhlciBhY3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGR1cmluZyBlZGl0aW5nXG4gKlxuICpcbiAqIFRvZG86IEV4dHJhY3QgdGhlIGV4cGFuZCBsb2dpYyBvdXQgaW50byBzb21lIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgb3IganVzdCBhIGNsYXNzXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LXdyYXBwZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJkdC5zdHlsZUNsYXNzXCIgW2NsYXNzLmR0LWZ1bGwtc2NyZWVuLW1vZGVdPVwiaXNGdWxsU2NyZWVuTW9kZVwiXG4gICAgIFtzdHlsZS53aWR0aF09XCJkdC53aWR0aFwiXG4+XG4gICAgPGRpdiBjbGFzcz1cImR0LWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwiZHQubG9hZGluZ1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkdC1sb2FkaW5nLWNvbnRlbnRcIiAqbmdJZj1cImR0LmxvYWRpbmdcIj5cbiAgICAgICAgPGkgW2NsYXNzXT1cIidzYXAtaWNvbiB1LWR0LXNwaW4taWNvbiAnICsgZHQubG9hZGluZ0ljb25cIj48L2k+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtaGVhZGVyXCIgKm5nSWY9XCJkdC5zaG93VGFibGVIZWFkZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiZHQuaGVhZGVyOyB0aGVuIGFwcERlZmluZWRIZWFkZXIgZWxzZSBkZWZhdWx0SGVhZGVyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRFQgQk9EWSB3aXRoIHRhYmxlIGhlYWRlcnMgYW5kIHZhbHVlcyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtYm9keS13cmFwcGVyLXZpZXdcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAqbmdJZj1cImR0Lmhhc0Zyb3plbkNvbHVtbnMoKTsgdGhlbiBkdEJvZHlXaXRoRnJvemVuQ29sdW1ucyBlbHNlIGR0Qm9keU5vRnJvemVuQ29sdW1uc1wiPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLTxkaXYgY2xhc3M9XCJkdC1mb290ZXJcIiAqbmdJZj1cImZvb3RlclwiPi0tPlxuICAgIDwhLS0mbHQ7ISZuZGFzaDsgZm9vdGVyQXJlYSZuZGFzaDsmZ3Q7LS0+XG4gICAgPCEtLTxuZy1jb250ZW50IHNlbGVjdD1cImF3LWR0LWZvb3RlclwiPjwvbmctY29udGVudD4tLT5cbiAgICA8IS0tPC9kaXY+LS0+XG48L2Rpdj5cblxuPCEtLSB0b2RvOiBkb250IGFjdGl2YXRlIHRoaXMgaWYgd2UgcmVhY2hlZCB0aGUgZW5kIG9mIGxpc3QgLSAtLT5cbjxhdy1pbmZpbml0ZS1zY3JvbGwgI2luZmluaXRlU2Nyb2xsICpuZ0lmPVwiaXNGdWxsU2NyZWVuTW9kZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXN0YW5jZV09XCInMTAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtmZXRjaFNpemVdPVwiZHQuc3RhdGUubGltaXRcIlxuICAgICAgICAgICAgICAgICAgICAob25Mb2FkKT1cIm9uTGF6eUxvYWQoJGV2ZW50KVwiPlxuPC9hdy1pbmZpbml0ZS1zY3JvbGw+XG5cblxuPG5nLXRlbXBsYXRlICNhcHBEZWZpbmVkSGVhZGVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkaW5nO1wiPjwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJkdC1nbG9iYWwtZmlsdGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2FwLWljb24gaWNvbi1maWx0ZXJcIj48L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtZ2xvYmFsLWFjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImR0LWFjdGlvbi1jb21ib1wiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzdXBwb3J0RnVsbFNjcmVlblwiIGNsYXNzPVwic2FwLWljb24gaWNvbi1yZXNpemVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUZ1bGxTY3JlZW4oJGV2ZW50KVwiPjwvc3Bhbj5cblxuICAgICAgICAgICAgPGF3LWlucHV0LWZpZWxkICpuZ0lmPVwiZHQuc2hvd0dsb2JhbFNlYXJjaFwiIHN0eWxlQ2xhc3M9XCJkdC10YWJsZS1zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZHQuc3RhdGUuY3VycmVudFNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUhvbGRlcj1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImljb24tc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWFyY2hUZXJtcy5uZXh0KCRldmVudClcIj5cbiAgICAgICAgICAgIDwvYXctaW5wdXQtZmllbGQ+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFyaWJhLWljb24gaWNvbi1tb3JlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNkdEJvZHlOb0Zyb3plbkNvbHVtbnM+XG4gICAgPCEtLVxuICAgICAgICBGb3Igbm9uLWZyb3plbiBjYXNlIHdlIGFsc28gbmVlZCB0byBzZXQgVFJVRSBhcyB0aGUgdmlldyBpcyBhY3R1YWxseSBmcm96ZW4gYW5kIGRvZXMgbm90XG4gICAgICAgIHNjcm9sbC5cbiAgICAgICAgV2UgdXNlIHRoaXMgZnJvemVuQ29sdW1ucyBmbGFnIGluc2lkZSBEVCB0byBwcm9wZXJseSBzZXQgY29sdW1uIGluZGV4IG9uIHRoZSBoZWFkZXIgbGV2ZWxcbiAgICAgICAgY29sdW1uSW5kZXg6KGZyb3plbiA/IGNvbHVtbkluZGV4OiAoY29sdW1ucy5sZW5ndGggKyBjb2x1bW5JbmRleCkpXG5cbiAgICAgICAgdGhlcmVmb3JlIHdlIG5lZWQgdG8gc2V0IHRydWUgZXZlbiBpbiB0aGlzIGNhc2UgdG8gcmV0dXJuIHJlYWwgY29sdW1uSW5kZXggc2luY2Ugd2UgZG9udFxuICAgICAgICBoYXZlIHRoZSBzZWNvbmQgdGFibGUuXG4gICAgLS0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0Qm9keTsgY29udGV4dDp7JGltcGxpY2l0OiBkdC5jb2x1bW5zLCBmcm96ZW5Db2x1bW5zOiB0cnVlIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZHRCb2R5V2l0aEZyb3plbkNvbHVtbnM+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImR0Qm9keTsgY29udGV4dDp7JGltcGxpY2l0OiBkdC5mcm96ZW5Db2x1bW5zLCBmcm96ZW5Db2x1bW5zOiB0cnVlIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHRCb2R5OyBjb250ZXh0OnskaW1wbGljaXQ6IGR0LmNvbHVtbnMsIGZyb3plbkNvbHVtbnM6IGZhbHNlIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNkdEJvZHkgbGV0LWNvbHVtbnMgbGV0LWZyb3plbkNvbHVtbnM9XCJmcm96ZW5Db2x1bW5zXCI+XG5cbiAgICA8ZGl2ICNkdENvbnRhaW5lciBjbGFzcz1cImR0LWJvZHktd3JhcHBlclwiXG4gICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwidGhpcy5jYWxjdWxhdGVGcm96ZW5XaWR0aCgpXCJcbiAgICAgICAgIFtjbGFzcy5kdC1ib2R5LXVuZnJvemVuXT1cImR0Lmhhc0Zyb3plbkNvbHVtbnMoKSAmJiAhZnJvemVuQ29sdW1uc1wiXG4gICAgICAgICBbY2xhc3MuZHQtYm9keS1mcm96ZW5dPVwiZHQuaGFzRnJvemVuQ29sdW1ucygpICYmIGZyb3plbkNvbHVtbnNcIlxuICAgID5cblxuICAgICAgICA8dGFibGUgW25nQ2xhc3NdPVwiZHQudGFibGVTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCJmcm96ZW5Db2x1bW5zID8gbnVsbCA6IGR0LnNjcm9sbFdpZHRoXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5kdC1waXZvdC1sYXlvdXRdPVwiZHQucGl2b3RhbExheW91dFwiXG4gICAgICAgICAgICAgICBbY2xhc3MuZHQtcGxhaW4tbGF5b3V0XT1cIiFkdC5waXZvdGFsTGF5b3V0ICYmICFkdC5pc091dGxpbmUoKVwiPlxuXG4gICAgICAgICAgICA8IS0tIFJlbmRlciBUSCBoZWFkZXIgcm93cy0tPlxuICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZHQtdGhlYWRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyUm93czsgY29udGV4dDp7JGltcGxpY2l0OiBjb2x1bW5zLGZyb3plbkNvbHVtbnM6ZnJvemVuQ29sdW1ucyB9XCI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuXG4gICAgICAgICAgICA8IS0tXG4gICAgICAgICAgICAgICAgUmVuZGVyIGRhdGEgcm93cy4gRm9yIGRhdGEgcm93cyB3ZSBuZWVkIHRvIGtlZXAgdGJvZHkgdGFnIGluc2lkZSBEVCB0YWJsZVxuICAgICAgICAgICAgICAgIGR1ZSB0byBPdXRsaW5lXG4gICAgICAgICAgICAgLS0+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVJvd3M7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sdW1ucywgIGZyb3plbkNvbHVtbnM6ZnJvemVuQ29sdW1ucyB9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPGRpdiAjZHRGdWxsU2NyZWVuT3ZlcmxheSBjbGFzcz1cImR0LWZ1bGwtc2NyZWVuLW92ZXJsYXkgdS1mdWxsLXNjcmVlbi1lbGVtZW50XCI+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AuZHQtZm9vdGVyLC5kdC1oZWFkZXJ7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzouNWVtIC43NWVtO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZHQtZm9vdGVye2JvcmRlci10b3A6MH0uZHQtdGhlYWQgdHJ7Ym9yZGVyLXdpZHRoOjB9LmR0LWJvZHktd3JhcHBlci12aWV3e3Bvc2l0aW9uOnJlbGF0aXZlfS5kdC1ib2R5LXdyYXBwZXJ7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlcjoxcHggc29saWQgI2Q3ZDdkN30uZHQtYm9keS13cmFwcGVyLmR0LWJvZHktdW5mcm96ZW57Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7b3ZlcmZsb3cteDphdXRvfS5kdC1sb2FkaW5nLW92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojOWI5YjliO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3BhY2l0eTouMTt6LWluZGV4OjF9LmR0LWxvYWRpbmctY29udGVudHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTt0b3A6MjUlO3otaW5kZXg6Mn0uZHQtaGVhZGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm93cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2NvbG9yOiMzNjM2MzY7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2YxZjFmMTttYXJnaW4tYm90dG9tOjMwcHh9LmR0LWhlYWRlciAuZHQtZ2xvYmFsLWZpbHRlcntmbGV4OjAgMDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2ZvbnQtc2l6ZToxOHB4fS5kdC1oZWFkZXIgLmR0LWdsb2JhbC1hY3Rpb25ze2ZsZXg6MCAwO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5kdC1oZWFkZXIgLmR0LWFjdGlvbi1jb21ib3tkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBub3dyYXA7Y29sb3I6IzdkN2Q3ZH0uZHQtaGVhZGVyIC5kdC1hY3Rpb24tY29tYm8gLmFyaWJhLWljb24sLmR0LWhlYWRlciAuZHQtYWN0aW9uLWNvbWJvIC5zYXAtaWNvbnttYXJnaW4tbGVmdDoxNXB4O2ZvbnQtc2l6ZToyMHB4O2FsaWduLXNlbGY6Y2VudGVyO2N1cnNvcjpwb2ludGVyfS5kdC1oZWFkZXIgLmR0LWFjdGlvbi1jb21ibyAuZHQtdGFibGUtc2VhcmNoe2JvcmRlci10b3AtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS5kdC1oZWFkZXIgLmR0LWFjdGlvbi1jb21ibyAuaWNvbi1yZXNpemV7Y29sb3I6IzRhNGE0YTtmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoxOHB4O21hcmdpbi1yaWdodDoxNXB4fS51LWR0LXNwaW4taWNvbntkaXNwbGF5OmlubGluZS1ibG9jazstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZG9TcGluO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZG9TcGlufUAtd2Via2l0LWtleWZyYW1lcyBkb1NwaW57MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgZG9TcGluezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX0uZHQtZnVsbC1zY3JlZW4tb3ZlcmxheXtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlIDUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCU7dHJhbnNpdGlvbjphbGwgLjRzIGVhc2UtaW4tb3V0fS5kdC1mdWxsLXNjcmVlbnt3aWR0aDo5OHZ3O3otaW5kZXg6MTIwO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxNXB4O3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOm9wYWNpdHkgLjVzIGVhc2UtaW4tb3V0fS51LWZzLWVsZW1lbnQtb3V0e2Rpc3BsYXk6bm9uZX1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRXcmFwcGVyIGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWRcbntcblxuICAgIC8qKlxuICAgICAqIENvbG9yIHRoYXQgaXMgdXNlZCBieSBmdWxsIHNjcmVlbiBkaXYgb3ZlcmxheSB0byBjcmVhdGUgZXhwYW5kaW5nIGVmZmVjdCB3aGljaCBuZWVkcyB0byBoYXZlXG4gICAgICogbGl0dGxlIHRlbnQ7XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZENvbG9yRnJvbTogc3RyaW5nID0gJyNmM2YzZjMnO1xuXG5cbiAgICAvKipcbiAgICAgKiBDb2xvciB0aGF0IGlzIHVzZWQgdG8gc2V0IGFmdGVyIHdlIGFyZSBpbiB0aGUgZnVsbCBzY3JlZW4gc28gb3VyIG92ZXJsYXkgZGl2IGhpZGUgZXZlcnl0aGluZ1xuICAgICAqIG9uIHRoZSBwYWdlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZENvbG9yVG86IHN0cmluZyA9ICcjRkZGRkZGJztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUYWJsZSBoZWFkaW5nIGFyZWEgb2ZmZXJzIGRldmVsb3BlciB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB0b3AgYmFyIHdoZXJlIHdlIGhhdmUgZmlsdGVyc1xuICAgICAqIGFuZCBvdGhlcnMgYWN0aW9ucy5cbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRpbmdBcmVhJylcbiAgICBoZWFkaW5nOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRhYmxlIGhlYWRlcnMgYW5kIHdyYXBzIHRoZW0gd2l0aGluIHRoZWFkIHRhZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclJvd3MnKVxuICAgIGhlYWRlclJvd3M6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgdGFibGUgYm9keVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JvZHlSb3dzJylcbiAgICBib2R5Um93czogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgaGVhZGluZyB0ZW1wbGF0ZS4gV2UgbmVlZCB0byByZW1vdmUgdGhpcyBkZXBlbmRlbmN5IG9uIHByaW1lTkcgc28gZmFyIGl0IGlzIHVzaW5nXG4gICAgICogcC1mb290ZXJcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJBcmVhJylcbiAgICBmb290ZXI6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIERpdiB1c2VkIHRvIG1ha2UgdGhlIGZ1bGwgc2NyZWVuIGV4cGFuc2lvbiBlZmZlY3RcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdkdEZ1bGxTY3JlZW5PdmVybGF5JylcbiAgICBkdEZ1bGxTY3JlZW5PdmVybGF5OiBFbGVtZW50UmVmO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gaW5maXRlIHNjcm9sbC4gV2UgYXJlIHVzaW5nIHRoaXMgdG8gdHJpZ2dlciBsb2FkaW5nIGZpbmlzaCBldmVudCBzbyB3ZSBjYW5cbiAgICAgKiBoaWRlIGxvYWRpbmcgYW5pbWF0aW9uXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnaW5maW5pdGVTY3JvbGwnKVxuICAgIGluZmluaXRlU2Nyb2xsOiBJbmZpbml0ZVNjcm9sbENvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICogSW4gb3JkZXIgdG8gZGVib3VuY2UgdGhlIHR5cGluZyB3ZSBuZWVkIHRvIHVzZSBzdWJqZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBzZWFyY2hUZXJtcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuXG4gICAgLyoqXG4gICAgICogIFNwZWNpZmllcyBpZiB3ZSBhcmUgaW4gdmlld2luZy9lZGl0aW5nIG1vZGUgdGhhdCBjYW4gYnJvd3NlIHdob2xlIGRhdGFzZXQgbGF6aWx5XG4gICAgICpcbiAgICAgKi9cbiAgICBpc0Z1bGxTY3JlZW5Nb2RlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB3ZSBjYW4gc3VwcG9ydCBmdWxsIHNjcmVlbiBtb2RlIC0gb25seSBhdmFpbGFibGUgZm9yIHRoZSBicm93c2VyXG4gICAgICpcbiAgICAgKi9cbiAgICBzdXBwb3J0RnVsbFNjcmVlbjogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqICBTYXZlcyBvcmlnaW5hbCBib3VuZGluZyByZWN0IGNvb3JkaW5hdGVzIGJlZm9yZSB3ZSBleHBhbmQgdGhlIERUIHRvIGZ1bGwgc2NyZWVuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGR0Qm91bmRpbmdDbGllbnRSZWN0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlcnMgb3JpZ2luYWwgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSB3ZSBzd2l0Y2ggdG8gZnVsbCBzY3JlZW4gbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgb3JpZ2luYWxTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcXVlcnlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBsb2FkaW5nU3ViOiBTdWJzY3JpcHRpb247XG5cblxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzRWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBkb21VdGlsczogRG9tVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAgICAgICAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERhdGF0YWJsZTJDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgICBwdWJsaWMgZHQ6IERhdGF0YWJsZTJDb21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5xdWVyeVN1YnNjcmlwdGlvbiA9IHRoaXMuc2VhcmNoVGVybXMucGlwZShcbiAgICAgICAgICAgIC8vIHdhaXQgMzAwbXMgYWZ0ZXIgZWFjaCBrZXlzdHJva2UgYmVmb3JlIGNvbnNpZGVyaW5nIHRoZSB0ZXJtXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcblxuICAgICAgICAgICAgLy8gaWdub3JlIG5ldyB0ZXJtIGlmIHNhbWUgYXMgcHJldmlvdXMgdGVybVxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcblxuICAgICAgICAgICAgc3dpdGNoTWFwKCh0ZXJtOiBzdHJpbmcpID0+IG9mKHRlcm0pKVxuICAgICAgICApLnN1YnNjcmliZSgodGVybTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5maW5kKHRlcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvYWRpbmdTdWIgPSB0aGlzLmR0LnZhbHVlQ2hhbmdlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHRoaXMubG9hZGluZ0ZpbmlzaGVkKCkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBhbGwgY29sdW1ucyBtYXJrZWQgYXMgZnJvemVuIGFuZCByZXRyaWV2ZSBhIHdpZHRoIHNvIHdlIGNhbiB1cGRhdGVcbiAgICAgKiBwYXJlbnQgZGl2XG4gICAgICpcbiAgICAgKi9cbiAgICBjYWxjdWxhdGVGcm96ZW5XaWR0aCAoKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmR0LmZyb3plbkNvbHVtbnMuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2wubWF4V2lkdGhQeCA+IDApIHtcbiAgICAgICAgICAgICAgICBmV2lkdGggKz0gY29sLndpZGVzdENlbGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZXaWR0aCArPSBwYXJzZUludChjb2wud2lkdGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZldpZHRoO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBoYXZpbmcgdHdvIHNlcGFyYXRlIHRhYmxlcyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHJvd3Mgb2YgdGhlIHRhYmxlcyBhcmUgYWxpZ25lZC5cbiAgICAgKlxuICAgICAqIFRoZXJlZm9yZSB0aGlzIG1ldGhvZCB0YWtlcyBmaXJzdCBjb2x1bW4gZnJvbSBlYWNoIHRhYmxlIHJlYWQgdGhlIGhlaWdodCBvZiB0aGUgcm93cyBhbmQgc2V0XG4gICAgICogdGhlIG1heCBoZWlnaHQgdG8gYm90aCByb3dzLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBhbGlnblRhYmxlc0hlaWdodHMgKGZyb3plblZpZXc6IGFueSwgdW5Gcm96ZW5WaWV3OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KGZyb3plblZpZXcpICYmIGlzUHJlc2VudChmcm96ZW5WaWV3KSxcbiAgICAgICAgICAgICdDYW50IGFsaWduIHRhYmxlIHZpZXdzIGFzIG9uZSBvZiB0aGUgdmlldyBpcyB1bmRlZmluZWQnKTtcblxuICAgICAgICBsZXQgZnJvemVuUm93czogYW55W10gPSBmcm96ZW5WaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJyk7XG4gICAgICAgIGxldCB1bkZyb3plblJvd3M6IGFueVtdID0gdW5Gcm96ZW5WaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJyk7XG5cbiAgICAgICAgYXNzZXJ0KGZyb3plblJvd3MubGVuZ3RoID09PSB1bkZyb3plblJvd3MubGVuZ3RoLFxuICAgICAgICAgICAgJ0Zyb3plbiBDb2x1bW46IFR3byB0YWJsZXMgZG9lcyBub3QgbXVjaCEnKTtcblxuICAgICAgICBBcnJheS5mcm9tKGZyb3plblJvd3MpLmZvckVhY2goKGZyb3plbjogYW55LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaCA9IE1hdGgubWF4KGZyb3plbi5vZmZzZXRIZWlnaHQsIHVuRnJvemVuUm93c1tpbmRleF0ub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgIGZyb3plbi5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgICAgIHVuRnJvemVuUm93c1tpbmRleF0uc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0RnVsbFNjcmVlbigpO1xuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kdC5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIGxldCBmcm96ZW5WaWV3ID0gdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LWZyb3plbicpO1xuICAgICAgICAgICAgbGV0IHVuRnJvemVuVmlldyA9IHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtYm9keS11bmZyb3plbicpO1xuXG4gICAgICAgICAgICBsZXQgZnJvemVuV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUZyb3plbldpZHRoKCk7XG4gICAgICAgICAgICBmcm96ZW5WaWV3LnN0eWxlLndpZHRoID0gZnJvemVuV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1bkZyb3plblZpZXcpKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBib3JkZXIgYW5kIGNyZWF0ZSBpbmRlbnQgZWZmZWN0IGJ5IGhhdmluZyAxcHggd2hpdGUgc3BhY2VcbiAgICAgICAgICAgICAgICB1bkZyb3plblZpZXcuc3R5bGUubGVmdCA9IChmcm96ZW5XaWR0aCArIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB1bkZyb3plblZpZXcuc3R5bGUud2lkdGggPSB1bkZyb3plblZpZXcucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAtIGZyb3plblZpZXcub2Zmc2V0V2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnblRhYmxlc0hlaWdodHMoZnJvemVuVmlldywgdW5Gcm96ZW5WaWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeVN1YnNjcmlwdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5sb2FkaW5nU3ViKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZVTEwgU0NSRUVOIE1PREUgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGZ1bGxzY3JlZW4gZnVuY3Rpb25hbGl0eSBpcyBlbmFibGVkIHRoaXMgbWV0aG9kIHN3aXRjaGVzIGJldHdlZW4gbm9ybWwgYW5kIGZ1bGwgc2NyZWVuXG4gICAgICogbW9kZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbFNjcmVlbiAoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbk1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGdWxsU2NyZWVuKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxTY3JlZW4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG8gcHVzaCB0aGlzIGNvbXBvbmVudCB0byBmdWxsIHNjcmVlbiBtb2RlIG9yIG1heWJlIGZ1bGwgcGFnZSBtb2RlIHdlIG5lZWQgcnVuIGZvbGxvd2luZzpcbiAgICAgKlxuICAgICAqICAtIEV4ZWN1dGUgZXhwYW5kIHRyYW5zZm9ybWF0aW9uLCB3aGVyZSB3ZSBoYXZlIGFkZGl0aW9uYWwgb3ZlcmxheSBkaXYgdGhhdCB3ZSBzbG93bHkgZXhwYW5kXG4gICAgICogIGFuZCB0aGlzIGNyZWF0ZXMgaW1wcmVzc2lvbiB0aGUgRFQgaXMgZXhwYW5kaW5nXG4gICAgICpcbiAgICAgKiAgLSBhcHBseSBmdWxsLXNjcmVlbiBjbGFzcyBvbiB0b3AgaG9zdCBlbGVtZW50ICAtIGluIHRoaXMgY2FzZSBpdHMgRGF0YVRhYmxlIHRvIHN3aXRjaFxuICAgICAqICB0byBhYnNvbHV0ZSBwb3NpdGlvbmluZ1xuICAgICAqXG4gICAgICogIC0gbWFrZSBzdXJlIHdlIGFyZSBzY3JvbGxlZCBhbGwgdGhlIHdheSB1cFxuICAgICAqXG4gICAgICogIC0gaGlkZSBhbGwgdGhlIGVsZW1lbnRzIG9uIHRoZSBwYWdlIHNvIHRoZWlyIGRpbWVuc2lvbiBkb24ndCBpbnRlcmZlcmUgd2l0aCB0aGlzIHRhYmxlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuRnVsbFNjcmVlbiAoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuTW9kZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ydW5FeHBhbmRFZmZlY3QoKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIDApO1xuICAgICAgICB0aGlzLnRvZ2dsZUZ1bGxTY3JlZW5PbkRUKHRydWUpO1xuXG5cbiAgICAgICAgLy8gbWFyayBteSBlbGVtZW50IGluIHRoZSBwYXRoIHRoYXQgbmVlZHMgdG8gc3RheVxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB3aGlsZSAoaXNQcmVzZW50KHBhcmVudE5vZGUpICYmIHBhcmVudE5vZGUudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3UtZnVsbC1zY3JlZW4tZWxlbWVudCcpO1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVOb25GdWxsU2NyZWVuRWxlbWVudChkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICB0aGlzLmR0LnN0YXRlLmxpbWl0ID0gTWF0aC5yb3VuZCh0aGlzLmNhbGN1bGF0ZUxpbWl0KCkpO1xuICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmV0Y2godGhpcy5kdC5zdGF0ZSk7XG5cbiAgICAgICAgLy8gb25jZSBsb2FkZWQgc2V0IGJhY2sgY29ycmVjdCBwYWdlIHNpemUgd2UgdXNlIHdoZW4gbG9hZGluZyBkYXRhXG4gICAgICAgIHRoaXMuZHQuc3RhdGUubGltaXQgPSB0aGlzLmR0LnBhZ2VTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhlIHNhbWUgbGlrZSBhYm92ZSBtZXRob2QgKG9wZW5GdWxsU2NyZWVuKSBidXQgaW4gcmV2ZXJzZSBvcmRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIGNsb3NlRnVsbFNjcmVlbiAoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuTW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2hvd05vbkZ1bGxTY3JlZW5FbGVtZW50KCk7XG4gICAgICAgIHRoaXMucnVuQ29sbGFwc2VFZmZlY3QoKTtcbiAgICAgICAgdGhpcy50b2dnbGVGdWxsU2NyZWVuT25EVChmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLmxpbWl0ID0gdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLmRpc3BsYXlMaW1pdDtcbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLm9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5mZXRjaCh0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCB0aGlzLm9yaWdpbmFsU2Nyb2xsUG9zaXRpb24pO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmltYXRpb24gZWZmZWN0IHRvIG1ha2UgaXQgZmVlbCBsaWtlIHRoZSBlbGVtZW50IChpbiB0aGlzIGNhc2UgRFQpIGlzIGV4cGFuZGluZ1xuICAgICAqIGZyb20gdGhlIG1pZGRsZSB0byB0aGUgZnVsbCBwYWdlIG1vZGUuXG4gICAgICpcbiAgICAgKiBXZSB0YWtlIHRoZSBkaW1lbnNpb24gb2YgdGhlIHRhYmxlIHRoZW4gaXQgaXMgc2NhbGVkIHNsb3dseSB0byB0aGUgZnVsbCBwYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBydW5FeHBhbmRFZmZlY3QgKClcbiAgICB7XG4gICAgICAgIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuZXhwYW5kQ29sb3JGcm9tO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybWF0aW9uKHRydWUpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5leHBhbmRDb2xvclRvO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgdHJhbnNmb3JtYXRpb24gYW5kIHNjYWxlIHRoZSBoZWxwZXIgZGl2IChvdmVybGF5KSBkb3duIHRvIG1ha2UgaXQgbG9vayBsaWtlXG4gICAgICogaXQgY29sbGFwc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBydW5Db2xsYXBzZUVmZmVjdCAoKVxuICAgIHtcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm1hdGlvbihmYWxzZSk7XG5cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCh0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmxlZnQsIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QudG9wLCAwLFxuICAgICAgICAgICAgICAgIDApO1xuICAgICAgICB9LCA0MDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERGUyAgLSB0byBnbyB0aHJ1IGFsbCB0aGUgZWxlbWVudCB1bmRlciBCT0RZIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBwYWdlLlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQgKHBhcmVudEVsZW1lbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gcGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnRFbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAodGhpcy5uZWVkVHJhdmVyc2VEb3duKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkdC1mdWxsLXNjcmVlbicpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1LWZzLWVsZW1lbnQtb3V0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdXQgYWxsIHRoZSBlbGVtZW50IHRoYXQgd2VyZSBwcmV2aW91c2x5IHJlbW92ZWQgYnkgaGlkZU5vbkZ1bGxTY3JlZW5FbGVtZW50KCkgYmFja1xuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd05vbkZ1bGxTY3JlZW5FbGVtZW50ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51LWZzLWVsZW1lbnQtb3V0JykpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbTogYW55KSA9PiBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3UtZnMtZWxlbWVudC1vdXQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG5lZWRUcmF2ZXJzZURvd24gKGVsZW1lbnQ6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoZWxlbWVudCkgJiYgZWxlbWVudC50YWdOYW1lICE9PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3UtZnVsbC1zY3JlZW4tZWxlbWVudCcpICYmXG4gICAgICAgICAgICAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2R0LWZ1bGwtc2NyZWVuJyk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZW50ZXIgZnVsbCBzY3JlZW4gL3BhZ2UgbW9kZSB3aGVuIG5lZWQgdG8gY2FsY3VsYXRlIGhvdyBtYW55IHJvd3MgdG8gbG9hZCBpbml0aWFsbHlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlTGltaXQgKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IGJyb3dzZXJIID0gdGhpcy5kb21VdGlscy5icm93c2VyRGltZW50aW9ucygpLmhlaWdodDtcbiAgICAgICAgbGV0IHJvd0ggPSB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGJvZHkgdHI6Zmlyc3QtY2hpbGQnKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQocm93SCkgJiYgcm93SCA+IDApID8gKGJyb3dzZXJIIC8gcm93SCkgKyAyMCA6IDUwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUVsZW1lbnQgKGw6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHQ6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdzogbnVtYmVyID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGg6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGwgKyAncHgnO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGFwcGx5VHJhbnNmb3JtYXRpb24gKGV4cGFuZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB4LCB5LCB0eCwgdHk7XG4gICAgICAgIGlmIChleHBhbmQpIHtcbiAgICAgICAgICAgIHggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICB5ID0gd2luZG93LmlubmVySGVpZ2h0IC8gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB0eCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LndpZHRoIC8gMlxuICAgICAgICAgICAgICAgIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0KSAvIHg7XG4gICAgICAgICAgICB0eSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyAyXG4gICAgICAgICAgICAgICAgLSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcCkgLyB5O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID0gMTtcbiAgICAgICAgICAgIHkgPSAxO1xuICAgICAgICAgICAgdHggPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7XG4gICAgICAgICAgICB0eSA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgICdzY2FsZVgoJyArIHggKyAnKSBzY2FsZVkoJyArIHkgKyAnKSB0cmFuc2xhdGUzZCgnICsgKHR4KSArICdweCwgJyArICh0eSkgKyAncHgsIDBweCknO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEZ1bGxTY3JlZW4gKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5zdXBwb3J0RnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgc2V0IG9mIHNldCBvZiBjc3MgcHJvcGVydGllcyB0byBtYWtlIHRoZSBEVCBtYWluIGNvbXBvbmVudCBvbiB0aGUgcGFnZSBleHBhbmQgdG9cbiAgICAgKiBmdWxsIHBhZ2UgbW9kZSBhbmQgYmFja1xuICAgICAqXG4gICAgICogV2Ugd2FudCB0byBtYWtlIGl0IHdpdGggbGl0dGxlIGRlbGF5IHRvIGxldCBvdGhlciBhbmltYXRpb24gZmluaXNoXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbFNjcmVlbk9uRFQgKGZ1bGxTY3JlZW46IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmNsYXNzTGlzdCArPSAnZHQtZnVsbC1zY3JlZW4nO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmNsYXNzTGlzdCA9IHRoaXMuZHQuY2xhc3NMaXN0LnJlcGxhY2UoJ2R0LWZ1bGwtc2NyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSU5GSU5JVEUgU0NST0xMSU5HIE1FVEhPRFNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgaW5maW5pdGUgc2Nyb2xsIGV2ZW50IGFuZCByZXF1ZXN0IG5ldyBkYXRhIGZyb20gZGF0YSBzb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIG9uTGF6eUxvYWQgKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoZXZlbnQuaXNMb2FkKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnN0YXRlLm9mZnNldCA9IGV2ZW50Lm9mZnNldDtcbiAgICAgICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5mZXRjaCh0aGlzLmR0LnN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBkYXRhUHJvdmlkZXIgPSB0aGlzLmR0LmRhdGFTb3VyY2UuZGF0YVByb3ZpZGVyO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KGRhdGEuc2xpY2UoMCwgZXZlbnQub2Zmc2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gbG9hZGluZyBpcyBmaW5pc2hlZCBtYXJrIGxvYWRpbmcgaWNvbiBpcyBkb25lIHNvIHdlIGNhbiBoaWRlIGl0LiBJIGFtIHVzaW5nIGxpdHRsZVxuICAgICAqIGRlbGF5IHRvIG1ha2UgdGhlIGFuaW1hdGlvbiB2aXNpYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBsb2FkaW5nRmluaXNoZWQgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5pbmZpbml0ZVNjcm9sbCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbmZpbml0ZVNjcm9sbC5jb21wbGV0ZSgpLCAyMDApO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=