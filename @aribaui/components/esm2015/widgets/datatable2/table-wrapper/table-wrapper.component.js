/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, forwardRef, Inject, Input, PLATFORM_ID, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { assert, Environment, isPresent } from '@aribaui/core';
import { Datatable2Component } from '../datatable2.component';
import { BaseComponent } from '../../../core/base.component';
import { of, Subject } from 'rxjs';
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
export class DTWrapper extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} render
     * @param {?} thisElement
     * @param {?} domUtils
     * @param {?} platformId
     * @param {?} dt
     */
    constructor(env, render, thisElement, domUtils, platformId, dt) {
        super(env);
        this.env = env;
        this.render = render;
        this.thisElement = thisElement;
        this.domUtils = domUtils;
        this.platformId = platformId;
        this.dt = dt;
        /**
         * Color that is used by full screen div overlay to create expanding effect which needs to have
         * little tent;
         *
         */
        this.expandColorFrom = '#f3f3f3';
        /**
         * Color that is used to set after we are in the full screen so our overlay div hide everything
         * on the page
         *
         */
        this.expandColorTo = '#FFFFFF';
        /**
         * In order to debounce the typing we need to use subject
         *
         */
        this.searchTerms = new Subject();
        /**
         *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
         *
         */
        this.isFullScreenMode = false;
        /**
         * Tells if we can support full screen mode - only available for the browser
         *
         */
        this.supportFullScreen = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.querySubscription = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), switchMap((term) => of(term))).subscribe((term) => {
            if (isPresent(term)) {
                this.dt.dataSource.find(term);
            }
        });
        this.loadingSub = this.dt.valueChange
            .subscribe((data) => this.loadingFinished());
    }
    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     * @return {?}
     */
    calculateFrozenWidth() {
        if (!this.dt.hasFrozenColumns()) {
            return null;
        }
        /** @type {?} */
        let fWidth = 0;
        this.dt.frozenColumns.forEach((col) => {
            if (col.maxWidthPx > 0) {
                fWidth += col.widestCell;
            }
            else {
                fWidth += parseInt(col.width);
            }
        });
        return fWidth;
    }
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
    alignTablesHeights(frozenView, unFrozenView) {
        assert(isPresent(frozenView) && isPresent(frozenView), 'Cant align table views as one of the view is undefined');
        /** @type {?} */
        let frozenRows = frozenView.querySelectorAll('table tr');
        /** @type {?} */
        let unFrozenRows = unFrozenView.querySelectorAll('table tr');
        assert(frozenRows.length === unFrozenRows.length, 'Frozen Column: Two tables does not much!');
        Array.from(frozenRows).forEach((frozen, index) => {
            /** @type {?} */
            let h = Math.max(frozen.offsetHeight, unFrozenRows[index].offsetHeight);
            frozen.style.height = h + 'px';
            unFrozenRows[index].style.height = h + 'px';
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initFullScreen();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.dt.hasFrozenColumns()) {
            /** @type {?} */
            let frozenView = this.thisElement.nativeElement.querySelector('.dt-body-frozen');
            /** @type {?} */
            let unFrozenView = this.thisElement.nativeElement.querySelector('.dt-body-unfrozen');
            /** @type {?} */
            let frozenWidth = this.calculateFrozenWidth();
            frozenView.style.width = frozenWidth + 'px';
            if (isPresent(unFrozenView)) {
                // include border and create indent effect by having 1px white space
                unFrozenView.style.left = (frozenWidth + 2) + 'px';
                unFrozenView.style.width = unFrozenView.parentElement.offsetWidth
                    - frozenView.offsetWidth + 'px';
                this.alignTablesHeights(frozenView, unFrozenView);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (isPresent(this.querySubscription)) {
            this.querySubscription.unsubscribe();
        }
        if (isPresent(this.loadingSub)) {
            this.loadingSub.unsubscribe();
        }
    }
    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     * @param {?} event
     * @return {?}
     */
    toggleFullScreen(event) {
        if (this.isFullScreenMode) {
            this.closeFullScreen(event);
        }
        else {
            this.openFullScreen(event);
        }
    }
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
    openFullScreen(event) {
        this.isFullScreenMode = true;
        this.runExpandEffect();
        this.originalScrollPosition = window.pageYOffset;
        window.scroll(0, 0);
        this.toggleFullScreenOnDT(true);
        /** @type {?} */
        let parentNode = this.thisElement.nativeElement.parentNode;
        while (isPresent(parentNode) && parentNode.tagName !== 'BODY') {
            parentNode.classList.add('u-full-screen-element');
            parentNode = parentNode.parentNode;
        }
        this.hideNonFullScreenElement(document.body);
        this.dt.state.limit = Math.round(this.calculateLimit());
        this.dt.dataSource.fetch(this.dt.state);
        // once loaded set back correct page size we use when loading data
        this.dt.state.limit = this.dt.pageSize;
    }
    /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     * @param {?} event
     * @return {?}
     */
    closeFullScreen(event) {
        this.isFullScreenMode = false;
        this.showNonFullScreenElement();
        this.runCollapseEffect();
        this.toggleFullScreenOnDT(false);
        this.dt.dataSource.state.limit = this.dt.dataSource.state.displayLimit;
        this.dt.dataSource.state.offset = 0;
        this.dt.dataSource.fetch(this.dt.dataSource.state);
        setTimeout(() => {
            window.scroll(0, this.originalScrollPosition);
        }, 300);
    }
    /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     * @param {?} fullScreen
     * @return {?}
     */
    toggleFullScreenOnDT(fullScreen) {
        this.dt.el.nativeElement.style.opacity = 0;
        setTimeout(() => {
            if (fullScreen) {
                this.dt.classList += 'dt-full-screen';
                this.dt.el.nativeElement.style.opacity = 1;
            }
            else {
                this.dt.classList = this.dt.classList.replace('dt-full-screen', '');
                this.dt.el.nativeElement.style.opacity = 1;
            }
        }, 200);
    }
    /**
     * Listen for infinite scroll event and request new data from data source
     *
     * @param {?} event
     * @return {?}
     */
    onLazyLoad(event) {
        if (event.isLoad) {
            this.dt.state.offset = event.offset;
            this.dt.dataSource.fetch(this.dt.state);
        }
        else {
            /** @type {?} */
            let dataProvider = this.dt.dataSource.dataProvider;
            /** @type {?} */
            let data = dataProvider.dataChanges.getValue();
            dataProvider.dataChanges.next(data.slice(0, event.offset));
        }
    }
    /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     * @return {?}
     */
    runExpandEffect() {
        this.dtBoundingClientRect = this.thisElement.nativeElement.getBoundingClientRect();
        this.updateElement();
        this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorFrom;
        this.dtFullScreenOverlay.nativeElement.style.opacity = 1;
        this.applyTransformation(true);
        setTimeout(() => {
            this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorTo;
        }, 300);
    }
    /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     * @return {?}
     */
    runCollapseEffect() {
        this.updateElement();
        this.applyTransformation(false);
        setTimeout(() => {
            this.updateElement();
            this.dtFullScreenOverlay.nativeElement.style.opacity = 0;
        }, 200);
        setTimeout(() => {
            this.updateElement(this.dtBoundingClientRect.left, this.dtBoundingClientRect.top, 0, 0);
        }, 400);
    }
    /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     * @param {?} parentElement
     * @return {?}
     */
    hideNonFullScreenElement(parentElement) {
        if (this.thisElement.nativeElement.parentNode === parentElement) {
            return;
        }
        for (let i = 0; i < parentElement.children.length; i++) {
            /** @type {?} */
            let element = parentElement.children[i];
            if (this.needTraverseDown(element)) {
                this.hideNonFullScreenElement(element);
            }
            else if (!element.classList.contains('dt-full-screen')) {
                element.classList.add('u-fs-element-out');
            }
        }
    }
    /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     * @return {?}
     */
    showNonFullScreenElement() {
        Array.from(document.querySelectorAll('.u-fs-element-out'))
            .forEach((elem) => elem.classList.remove('u-fs-element-out'));
    }
    /**
     * \@Internal
     *
     * @param {?} element
     * @return {?}
     */
    needTraverseDown(element) {
        return isPresent(element) && element.tagName !== 'SCRIPT' &&
            element.classList.contains('u-full-screen-element') &&
            !element.classList.contains('dt-full-screen');
    }
    /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     * @return {?}
     */
    calculateLimit() {
        /** @type {?} */
        let browserH = this.domUtils.browserDimentions().height;
        /** @type {?} */
        let rowH = this.dt.el.nativeElement.querySelector('tbody tr:first-child').offsetHeight;
        return (isPresent(rowH) && rowH > 0) ? (browserH / rowH) + 20 : 50;
    }
    /**
     * \@Internal
     *
     * @param {?=} l
     * @param {?=} t
     * @param {?=} w
     * @param {?=} h
     * @return {?}
     */
    updateElement(l = this.dtBoundingClientRect.left, t = this.dtBoundingClientRect.top, w = this.dtBoundingClientRect.width, h = this.dtBoundingClientRect.height) {
        this.dtFullScreenOverlay.nativeElement.style.left = l + 'px';
        this.dtFullScreenOverlay.nativeElement.style.top = t + 'px';
        this.dtFullScreenOverlay.nativeElement.style.width = w + 'px';
        this.dtFullScreenOverlay.nativeElement.style.height = h + 'px';
    }
    /**
     * \@Internal
     *
     * @param {?} expand
     * @return {?}
     */
    applyTransformation(expand) {
        /** @type {?} */
        let x;
        /** @type {?} */
        let y;
        /** @type {?} */
        let tx;
        /** @type {?} */
        let ty;
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
    }
    /**
     * INFINITE SCROLLING METHODS
     * @return {?}
     */
    initFullScreen() {
        if (!isPlatformBrowser(this.platformId)) {
            this.supportFullScreen = false;
            return;
        }
        this.render.appendChild(document.body, this.dtFullScreenOverlay.nativeElement);
    }
    /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     * @return {?}
     */
    loadingFinished() {
        if (isPresent(this.infiniteScroll)) {
            setTimeout(() => this.infiniteScroll.complete(), 200);
        }
    }
}
DTWrapper.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-wrapper',
                template: "<div [ngClass]=\"dt.styleClass\" [class.dt-full-screen-mode]=\"isFullScreenMode\"\n     [style.width]=\"dt.width\"\n>\n    <div class=\"dt-loading-overlay\" *ngIf=\"dt.loading\"></div>\n    <div class=\"dt-loading-content\" *ngIf=\"dt.loading\">\n        <i [class]=\"'sap-icon u-dt-spin-icon ' + dt.loadingIcon\"></i>\n    </div>\n\n    <div class=\"dt-header\" *ngIf=\"dt.showTableHeader\">\n        <ng-template *ngIf=\"dt.header; then appDefinedHeader else defaultHeader\"></ng-template>\n    </div>\n\n    <!-- DT BODY with table headers and values -->\n    <div class=\"dt-body-wrapper-view\">\n        <ng-template\n            *ngIf=\"dt.hasFrozenColumns(); then dtBodyWithFrozenColumns else dtBodyNoFrozenColumns\">\n        </ng-template>\n    </div>\n\n    <!--<div class=\"dt-footer\" *ngIf=\"footer\">-->\n    <!--&lt;!&ndash; footerArea&ndash;&gt;-->\n    <!--<ng-content select=\"aw-dt-footer\"></ng-content>-->\n    <!--</div>-->\n</div>\n\n<!-- todo: dont activate this if we reached the end of list - -->\n<aw-infinite-scroll #infiniteScroll *ngIf=\"isFullScreenMode\"\n                    [distance]=\"'10%'\"\n                    [fetchSize]=\"dt.state.limit\"\n                    (onLoad)=\"onLazyLoad($event)\">\n</aw-infinite-scroll>\n\n\n<ng-template #appDefinedHeader>\n    <ng-container *ngTemplateOutlet=\"heading;\"></ng-container>\n</ng-template>\n\n<ng-template #defaultHeader>\n    <div class=\"dt-global-filter\">\n        <span class=\"sap-icon icon-filter\"></span>\n    </div>\n\n    <div class=\"dt-global-actions\">\n        <div class=\"dt-action-combo\">\n            <span *ngIf=\"supportFullScreen\" class=\"sap-icon icon-resize\"\n                  (click)=\"toggleFullScreen($event)\"></span>\n\n            <aw-input-field *ngIf=\"dt.showGlobalSearch\" styleClass=\"dt-table-search\"\n                            [(ngModel)]=\"dt.state.currentSearchQuery\"\n                            placeHolder=\"search\"\n                            icon=\"icon-search\"\n                            (ngModelChange)=\"searchTerms.next($event)\">\n            </aw-input-field>\n            <span class=\"ariba-icon icon-more\"></span>\n        </div>\n    </div>\n</ng-template>\n\n<!--\n    Each section frozen/non-frozen is calculated inside table-wrapper in the ngAfterViewChecked, where we set\n    proper width for each frame as well as left coordinates for the right one\n-->\n<ng-template #dtBodyNoFrozenColumns>\n    <!--\n        For non-frozen case we also need to set TRUE as the view is actually frozen and does not\n        scroll.\n        We use this frozenColumns flag inside DT to properly set column index on the header level\n        columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))\n\n        therefore we need to set true even in this case to return real columnIndex since we dont\n        have the second table.\n    -->\n    <ng-container *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.columns, frozenColumns: true }\">\n    </ng-container>\n</ng-template>\n\n<ng-template #dtBodyWithFrozenColumns>\n    <ng-container\n        *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.frozenColumns, frozenColumns: true }\">\n    </ng-container>\n    <ng-container\n        *ngTemplateOutlet=\"dtBody; context:{$implicit: dt.columns, frozenColumns: false }\">\n    </ng-container>\n</ng-template>\n\n\n<ng-template #dtBody let-columns let-frozenColumns=\"frozenColumns\">\n\n    <div #dtContainer class=\"dt-body-wrapper\"\n         [style.width.px]=\"this.calculateFrozenWidth()\"\n         [class.dt-body-unfrozen]=\"dt.hasFrozenColumns() && !frozenColumns\"\n         [class.dt-body-frozen]=\"dt.hasFrozenColumns() && frozenColumns\"\n    >\n\n        <table [ngClass]=\"dt.tableStyleClass\"\n               [style.width]=\"frozenColumns ? null : dt.scrollWidth\"\n               [class.dt-pivot-layout]=\"dt.pivotalLayout\"\n               [class.dt-plain-layout]=\"!dt.pivotalLayout && !dt.isOutline()\">\n\n            <!-- Render TH header rows-->\n            <thead class=\"dt-thead\">\n            <ng-container *ngTemplateOutlet=\"headerRows; context:{$implicit: columns,frozenColumns:frozenColumns }\">\n            </ng-container>\n            </thead>\n\n            <!--\n                Render data rows. For data rows we need to keep tbody tag inside DT table\n                due to Outline\n             -->\n            <ng-container *ngTemplateOutlet=\"bodyRows; context:{$implicit: columns,  frozenColumns:frozenColumns }\">\n            </ng-container>\n        </table>\n    </div>\n</ng-template>\n\n\n<div #dtFullScreenOverlay class=\"dt-full-screen-overlay u-full-screen-element\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".dt-footer,.dt-header{text-align:center;padding:.5em .75em;box-sizing:border-box}.dt-footer{border-top:0}.dt-thead tr{border-width:0}.dt-body-wrapper-view{position:relative}.dt-body-wrapper{overflow:hidden;border:1px solid #d7d7d7}.dt-body-wrapper.dt-body-unfrozen{border-left-color:transparent;position:absolute;top:0;overflow-x:auto}.dt-loading-overlay{position:absolute;background-color:#9b9b9b;width:100%;height:100%;opacity:.1;z-index:1}.dt-loading-content{position:absolute;left:50%;top:25%;z-index:2}.dt-header{width:100%;display:flex;flex-flow:row nowrap;justify-content:space-between;color:#363636;border-bottom:1px solid #f1f1f1;margin-bottom:30px}.dt-header .dt-global-filter{flex:0 0;align-items:flex-start;font-size:18px}.dt-header .dt-global-actions{flex:0 0;align-items:flex-end}.dt-header .dt-action-combo{display:flex;flex-flow:row nowrap;color:#7d7d7d}.dt-header .dt-action-combo .ariba-icon,.dt-header .dt-action-combo .sap-icon{margin-left:15px;font-size:20px;-ms-grid-row-align:center;align-self:center;cursor:pointer}.dt-header .dt-action-combo .dt-table-search{border-top-color:transparent;border-left-color:transparent;border-right-color:transparent}.dt-header .dt-action-combo .icon-resize{color:#4a4a4a;font-size:16px;line-height:18px;margin-right:15px}.u-dt-spin-icon{display:inline-block;-webkit-animation:2s linear infinite doSpin;animation:2s linear infinite doSpin}@-webkit-keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.dt-full-screen-overlay{position:fixed;z-index:100;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:.4s ease-in-out}.dt-full-screen{width:98vw;z-index:120;position:absolute;top:15px;pointer-events:all;transition:opacity .5s ease-in-out}.u-fs-element-out{display:none}"]
            }] }
];
/** @nocollapse */
DTWrapper.ctorParameters = () => [
    { type: Environment },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DomUtilsService },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(() => Datatable2Component),] }] }
];
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
if (false) {
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
    /** @type {?} */
    DTWrapper.prototype.querySubscription;
    /** @type {?} */
    DTWrapper.prototype.loadingSub;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL3RhYmxlLXdyYXBwZXIvdGFibGUtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBR0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDNUYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBdUJoRSxNQUFNLGdCQUFpQixTQUFRLGFBQWE7Ozs7Ozs7OztJQWtHeEMsWUFBbUIsR0FBZ0IsRUFDZixRQUNBLGFBQ0EsVUFDcUIsVUFBa0IsRUFFeEMsRUFBdUI7UUFFdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBUkksUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUNm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S0FBSyxDQUFDO1lBQy9CLE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7SUFPM0UsZUFBZTtRQUVuQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUV6RDs7OztZQXhnQlIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QiwybEpBQTJDO2dCQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFFeEM7Ozs7WUE3QmUsV0FBVztZQUx2QixTQUFTO1lBTFQsVUFBVTtZQWlCTixlQUFlO1lBNkhrQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQW5JM0IsbUJBQW1CLHVCQW9JVixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDOzs7OEJBL0Z4RCxLQUFLOzRCQVNMLEtBQUs7c0JBVUwsWUFBWSxTQUFDLGFBQWE7eUJBTzFCLFlBQVksU0FBQyxZQUFZO3VCQU96QixZQUFZLFNBQUMsVUFBVTtxQkFRdkIsWUFBWSxTQUFDLFlBQVk7a0NBT3pCLFNBQVMsU0FBQyxxQkFBcUI7NkJBUS9CLFNBQVMsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmZpbml0ZVNjcm9sbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50JztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBQbGVhc2Ugc2VlIGRhdGF0YWJsZSBmb3IgbW9yZSBkZXRhaWwgZGVzY3JpcHRpb24uIEJ1dCB0aGUgbWFpbiBnb2FsIG9mIHRoaXMgd3JhcHBlciB0byByZW1vdmVcbiAqIGFsbCB0aGUgY29tbW9uIHN1cnJvdW5kaW5nIHBhcnRzIGFyb3VuZCB0aGUgZGF0YXRhYmxlIGFuZCBtYWtlIHN1cmUgRFQgY2FuIGZvY3VzIG9ubHkgYWN0dWFsXG4gKiBoZWFkZXIgYW5kIGJvZHkgc3RydWN0dXJlXG4gKlxuICogSXQgaXMgZXhwZWN0ZWQgdGhhdCB3cmFwcGVyIGFsc28gcHJvdmlkZXMgc29tZSBjb2RlIGZvciB0aGUgc2xpZGluZyB1cCBwYW5lbCBjb250YWluaW5nXG4gKiBidXR0b25zIGFuZCBvdGhlciBhY3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGR1cmluZyBlZGl0aW5nXG4gKlxuICpcbiAqIFRvZG86IEV4dHJhY3QgdGhlIGV4cGFuZCBsb2dpYyBvdXQgaW50byBzb21lIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgb3IganVzdCBhIGNsYXNzXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LXdyYXBwZXInLFxuICAgIHRlbXBsYXRlVXJsOiAndGFibGUtd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYmxlLXdyYXBwZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRXcmFwcGVyIGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWRcbntcblxuICAgIC8qKlxuICAgICAqIENvbG9yIHRoYXQgaXMgdXNlZCBieSBmdWxsIHNjcmVlbiBkaXYgb3ZlcmxheSB0byBjcmVhdGUgZXhwYW5kaW5nIGVmZmVjdCB3aGljaCBuZWVkcyB0byBoYXZlXG4gICAgICogbGl0dGxlIHRlbnQ7XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZENvbG9yRnJvbTogc3RyaW5nID0gJyNmM2YzZjMnO1xuXG5cbiAgICAvKipcbiAgICAgKiBDb2xvciB0aGF0IGlzIHVzZWQgdG8gc2V0IGFmdGVyIHdlIGFyZSBpbiB0aGUgZnVsbCBzY3JlZW4gc28gb3VyIG92ZXJsYXkgZGl2IGhpZGUgZXZlcnl0aGluZ1xuICAgICAqIG9uIHRoZSBwYWdlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZENvbG9yVG86IHN0cmluZyA9ICcjRkZGRkZGJztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUYWJsZSBoZWFkaW5nIGFyZWEgb2ZmZXJzIGRldmVsb3BlciB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB0b3AgYmFyIHdoZXJlIHdlIGhhdmUgZmlsdGVyc1xuICAgICAqIGFuZCBvdGhlcnMgYWN0aW9ucy5cbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRpbmdBcmVhJylcbiAgICBoZWFkaW5nOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRhYmxlIGhlYWRlcnMgYW5kIHdyYXBzIHRoZW0gd2l0aGluIHRoZWFkIHRhZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclJvd3MnKVxuICAgIGhlYWRlclJvd3M6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgdGFibGUgYm9keVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JvZHlSb3dzJylcbiAgICBib2R5Um93czogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgaGVhZGluZyB0ZW1wbGF0ZS4gV2UgbmVlZCB0byByZW1vdmUgdGhpcyBkZXBlbmRlbmN5IG9uIHByaW1lTkcgc28gZmFyIGl0IGlzIHVzaW5nXG4gICAgICogcC1mb290ZXJcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJBcmVhJylcbiAgICBmb290ZXI6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIERpdiB1c2VkIHRvIG1ha2UgdGhlIGZ1bGwgc2NyZWVuIGV4cGFuc2lvbiBlZmZlY3RcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdkdEZ1bGxTY3JlZW5PdmVybGF5JylcbiAgICBkdEZ1bGxTY3JlZW5PdmVybGF5OiBFbGVtZW50UmVmO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gaW5maXRlIHNjcm9sbC4gV2UgYXJlIHVzaW5nIHRoaXMgdG8gdHJpZ2dlciBsb2FkaW5nIGZpbmlzaCBldmVudCBzbyB3ZSBjYW5cbiAgICAgKiBoaWRlIGxvYWRpbmcgYW5pbWF0aW9uXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnaW5maW5pdGVTY3JvbGwnKVxuICAgIGluZmluaXRlU2Nyb2xsOiBJbmZpbml0ZVNjcm9sbENvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICogSW4gb3JkZXIgdG8gZGVib3VuY2UgdGhlIHR5cGluZyB3ZSBuZWVkIHRvIHVzZSBzdWJqZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBzZWFyY2hUZXJtcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuXG4gICAgLyoqXG4gICAgICogIFNwZWNpZmllcyBpZiB3ZSBhcmUgaW4gdmlld2luZy9lZGl0aW5nIG1vZGUgdGhhdCBjYW4gYnJvd3NlIHdob2xlIGRhdGFzZXQgbGF6aWx5XG4gICAgICpcbiAgICAgKi9cbiAgICBpc0Z1bGxTY3JlZW5Nb2RlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB3ZSBjYW4gc3VwcG9ydCBmdWxsIHNjcmVlbiBtb2RlIC0gb25seSBhdmFpbGFibGUgZm9yIHRoZSBicm93c2VyXG4gICAgICpcbiAgICAgKi9cbiAgICBzdXBwb3J0RnVsbFNjcmVlbjogYm9vbGVhbiA9IHRydWU7XG4gICAgcXVlcnlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBsb2FkaW5nU3ViOiBTdWJzY3JpcHRpb247XG4gICAgLyoqXG4gICAgICogIFNhdmVzIG9yaWdpbmFsIGJvdW5kaW5nIHJlY3QgY29vcmRpbmF0ZXMgYmVmb3JlIHdlIGV4cGFuZCB0aGUgRFQgdG8gZnVsbCBzY3JlZW5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZHRCb3VuZGluZ0NsaWVudFJlY3Q6IGFueTtcbiAgICAvKipcbiAgICAgKiBSZW1lbWJlcnMgb3JpZ2luYWwgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSB3ZSBzd2l0Y2ggdG8gZnVsbCBzY3JlZW4gbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgb3JpZ2luYWxTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRoaXNFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tVXRpbHM6IERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGF0YXRhYmxlMkNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHVibGljIGR0OiBEYXRhdGFibGUyQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5xdWVyeVN1YnNjcmlwdGlvbiA9IHRoaXMuc2VhcmNoVGVybXMucGlwZShcbiAgICAgICAgICAgIC8vIHdhaXQgMzAwbXMgYWZ0ZXIgZWFjaCBrZXlzdHJva2UgYmVmb3JlIGNvbnNpZGVyaW5nIHRoZSB0ZXJtXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcblxuICAgICAgICAgICAgLy8gaWdub3JlIG5ldyB0ZXJtIGlmIHNhbWUgYXMgcHJldmlvdXMgdGVybVxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcblxuICAgICAgICAgICAgc3dpdGNoTWFwKCh0ZXJtOiBzdHJpbmcpID0+IG9mKHRlcm0pKVxuICAgICAgICApLnN1YnNjcmliZSgodGVybTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRlcm0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLmZpbmQodGVybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZGluZ1N1YiA9IHRoaXMuZHQudmFsdWVDaGFuZ2VcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4gdGhpcy5sb2FkaW5nRmluaXNoZWQoKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyBvdmVyIGFsbCBjb2x1bW5zIG1hcmtlZCBhcyBmcm96ZW4gYW5kIHJldHJpZXZlIGEgd2lkdGggc28gd2UgY2FuIHVwZGF0ZVxuICAgICAqIHBhcmVudCBkaXZcbiAgICAgKlxuICAgICAqL1xuICAgIGNhbGN1bGF0ZUZyb3plbldpZHRoKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmR0Lmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZldpZHRoID0gMDtcbiAgICAgICAgdGhpcy5kdC5mcm96ZW5Db2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoY29sLm1heFdpZHRoUHggPiAwKSB7XG4gICAgICAgICAgICAgICAgZldpZHRoICs9IGNvbC53aWRlc3RDZWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmV2lkdGggKz0gcGFyc2VJbnQoY29sLndpZHRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZXaWR0aDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaGF2aW5nIHR3byBzZXBhcmF0ZSB0YWJsZXMgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhhdCByb3dzIG9mIHRoZSB0YWJsZXMgYXJlIGFsaWduZWQuXG4gICAgICpcbiAgICAgKiBUaGVyZWZvcmUgdGhpcyBtZXRob2QgdGFrZXMgZmlyc3QgY29sdW1uIGZyb20gZWFjaCB0YWJsZSByZWFkIHRoZSBoZWlnaHQgb2YgdGhlIHJvd3MgYW5kIHNldFxuICAgICAqIHRoZSBtYXggaGVpZ2h0IHRvIGJvdGggcm93cy5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgYWxpZ25UYWJsZXNIZWlnaHRzKGZyb3plblZpZXc6IGFueSwgdW5Gcm96ZW5WaWV3OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KGZyb3plblZpZXcpICYmIGlzUHJlc2VudChmcm96ZW5WaWV3KSxcbiAgICAgICAgICAgICdDYW50IGFsaWduIHRhYmxlIHZpZXdzIGFzIG9uZSBvZiB0aGUgdmlldyBpcyB1bmRlZmluZWQnKTtcblxuICAgICAgICBsZXQgZnJvemVuUm93czogYW55W10gPSBmcm96ZW5WaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJyk7XG4gICAgICAgIGxldCB1bkZyb3plblJvd3M6IGFueVtdID0gdW5Gcm96ZW5WaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJyk7XG5cbiAgICAgICAgYXNzZXJ0KGZyb3plblJvd3MubGVuZ3RoID09PSB1bkZyb3plblJvd3MubGVuZ3RoLFxuICAgICAgICAgICAgJ0Zyb3plbiBDb2x1bW46IFR3byB0YWJsZXMgZG9lcyBub3QgbXVjaCEnKTtcblxuICAgICAgICBBcnJheS5mcm9tKGZyb3plblJvd3MpLmZvckVhY2goKGZyb3plbjogYW55LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaCA9IE1hdGgubWF4KGZyb3plbi5vZmZzZXRIZWlnaHQsIHVuRnJvemVuUm93c1tpbmRleF0ub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgIGZyb3plbi5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgICAgIHVuRnJvemVuUm93c1tpbmRleF0uc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXRGdWxsU2NyZWVuKCk7XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy5kdC5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIGxldCBmcm96ZW5WaWV3ID0gdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LWZyb3plbicpO1xuICAgICAgICAgICAgbGV0IHVuRnJvemVuVmlldyA9IHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtYm9keS11bmZyb3plbicpO1xuXG4gICAgICAgICAgICBsZXQgZnJvemVuV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUZyb3plbldpZHRoKCk7XG5cbiAgICAgICAgICAgIGZyb3plblZpZXcuc3R5bGUud2lkdGggPSBmcm96ZW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHVuRnJvemVuVmlldykpIHtcbiAgICAgICAgICAgICAgICAvLyBpbmNsdWRlIGJvcmRlciBhbmQgY3JlYXRlIGluZGVudCBlZmZlY3QgYnkgaGF2aW5nIDFweCB3aGl0ZSBzcGFjZVxuICAgICAgICAgICAgICAgIHVuRnJvemVuVmlldy5zdHlsZS5sZWZ0ID0gKGZyb3plbldpZHRoICsgMikgKyAncHgnO1xuICAgICAgICAgICAgICAgIHVuRnJvemVuVmlldy5zdHlsZS53aWR0aCA9IHVuRnJvemVuVmlldy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIC0gZnJvemVuVmlldy5vZmZzZXRXaWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduVGFibGVzSGVpZ2h0cyhmcm96ZW5WaWV3LCB1bkZyb3plblZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnlTdWJzY3JpcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubG9hZGluZ1N1YikpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGVUxMIFNDUkVFTiBNT0RFIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBmdWxsc2NyZWVuIGZ1bmN0aW9uYWxpdHkgaXMgZW5hYmxlZCB0aGlzIG1ldGhvZCBzd2l0Y2hlcyBiZXR3ZWVuIG5vcm1sIGFuZCBmdWxsIHNjcmVlblxuICAgICAqIG1vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxTY3JlZW4oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbk1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGdWxsU2NyZWVuKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxTY3JlZW4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG8gcHVzaCB0aGlzIGNvbXBvbmVudCB0byBmdWxsIHNjcmVlbiBtb2RlIG9yIG1heWJlIGZ1bGwgcGFnZSBtb2RlIHdlIG5lZWQgcnVuIGZvbGxvd2luZzpcbiAgICAgKlxuICAgICAqICAtIEV4ZWN1dGUgZXhwYW5kIHRyYW5zZm9ybWF0aW9uLCB3aGVyZSB3ZSBoYXZlIGFkZGl0aW9uYWwgb3ZlcmxheSBkaXYgdGhhdCB3ZSBzbG93bHkgZXhwYW5kXG4gICAgICogIGFuZCB0aGlzIGNyZWF0ZXMgaW1wcmVzc2lvbiB0aGUgRFQgaXMgZXhwYW5kaW5nXG4gICAgICpcbiAgICAgKiAgLSBhcHBseSBmdWxsLXNjcmVlbiBjbGFzcyBvbiB0b3AgaG9zdCBlbGVtZW50ICAtIGluIHRoaXMgY2FzZSBpdHMgRGF0YVRhYmxlIHRvIHN3aXRjaFxuICAgICAqICB0byBhYnNvbHV0ZSBwb3NpdGlvbmluZ1xuICAgICAqXG4gICAgICogIC0gbWFrZSBzdXJlIHdlIGFyZSBzY3JvbGxlZCBhbGwgdGhlIHdheSB1cFxuICAgICAqXG4gICAgICogIC0gaGlkZSBhbGwgdGhlIGVsZW1lbnRzIG9uIHRoZSBwYWdlIHNvIHRoZWlyIGRpbWVuc2lvbiBkb24ndCBpbnRlcmZlcmUgd2l0aCB0aGlzIHRhYmxlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuRnVsbFNjcmVlbihldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxTY3JlZW5Nb2RlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnJ1bkV4cGFuZEVmZmVjdCgpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsU2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgMCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRnVsbFNjcmVlbk9uRFQodHJ1ZSk7XG5cblxuICAgICAgICAvLyBtYXJrIG15IGVsZW1lbnQgaW4gdGhlIHBhdGggdGhhdCBuZWVkcyB0byBzdGF5XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHdoaWxlIChpc1ByZXNlbnQocGFyZW50Tm9kZSkgJiYgcGFyZW50Tm9kZS50YWdOYW1lICE9PSAnQk9EWScpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndS1mdWxsLXNjcmVlbi1lbGVtZW50Jyk7XG4gICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZU5vbkZ1bGxTY3JlZW5FbGVtZW50KGRvY3VtZW50LmJvZHkpO1xuXG4gICAgICAgIHRoaXMuZHQuc3RhdGUubGltaXQgPSBNYXRoLnJvdW5kKHRoaXMuY2FsY3VsYXRlTGltaXQoKSk7XG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5mZXRjaCh0aGlzLmR0LnN0YXRlKTtcblxuICAgICAgICAvLyBvbmNlIGxvYWRlZCBzZXQgYmFjayBjb3JyZWN0IHBhZ2Ugc2l6ZSB3ZSB1c2Ugd2hlbiBsb2FkaW5nIGRhdGFcbiAgICAgICAgdGhpcy5kdC5zdGF0ZS5saW1pdCA9IHRoaXMuZHQucGFnZVNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGUgc2FtZSBsaWtlIGFib3ZlIG1ldGhvZCAob3BlbkZ1bGxTY3JlZW4pIGJ1dCBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAqXG4gICAgICovXG4gICAgY2xvc2VGdWxsU2NyZWVuKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbk1vZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNob3dOb25GdWxsU2NyZWVuRWxlbWVudCgpO1xuICAgICAgICB0aGlzLnJ1bkNvbGxhcHNlRWZmZWN0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRnVsbFNjcmVlbk9uRFQoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5saW1pdCA9IHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5kaXNwbGF5TGltaXQ7XG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5vZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmV0Y2godGhpcy5kdC5kYXRhU291cmNlLnN0YXRlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgdGhpcy5vcmlnaW5hbFNjcm9sbFBvc2l0aW9uKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHNldCBvZiBzZXQgb2YgY3NzIHByb3BlcnRpZXMgdG8gbWFrZSB0aGUgRFQgbWFpbiBjb21wb25lbnQgb24gdGhlIHBhZ2UgZXhwYW5kIHRvXG4gICAgICogZnVsbCBwYWdlIG1vZGUgYW5kIGJhY2tcbiAgICAgKlxuICAgICAqIFdlIHdhbnQgdG8gbWFrZSBpdCB3aXRoIGxpdHRsZSBkZWxheSB0byBsZXQgb3RoZXIgYW5pbWF0aW9uIGZpbmlzaFxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxTY3JlZW5PbkRUKGZ1bGxTY3JlZW46IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmNsYXNzTGlzdCArPSAnZHQtZnVsbC1zY3JlZW4nO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmNsYXNzTGlzdCA9IHRoaXMuZHQuY2xhc3NMaXN0LnJlcGxhY2UoJ2R0LWZ1bGwtc2NyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgaW5maW5pdGUgc2Nyb2xsIGV2ZW50IGFuZCByZXF1ZXN0IG5ldyBkYXRhIGZyb20gZGF0YSBzb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIG9uTGF6eUxvYWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChldmVudC5pc0xvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuc3RhdGUub2Zmc2V0ID0gZXZlbnQub2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLmZldGNoKHRoaXMuZHQuc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRhdGFQcm92aWRlciA9IHRoaXMuZHQuZGF0YVNvdXJjZS5kYXRhUHJvdmlkZXI7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQoZGF0YS5zbGljZSgwLCBldmVudC5vZmZzZXQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5pbWF0aW9uIGVmZmVjdCB0byBtYWtlIGl0IGZlZWwgbGlrZSB0aGUgZWxlbWVudCAoaW4gdGhpcyBjYXNlIERUKSBpcyBleHBhbmRpbmdcbiAgICAgKiBmcm9tIHRoZSBtaWRkbGUgdG8gdGhlIGZ1bGwgcGFnZSBtb2RlLlxuICAgICAqXG4gICAgICogV2UgdGFrZSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0YWJsZSB0aGVuIGl0IGlzIHNjYWxlZCBzbG93bHkgdG8gdGhlIGZ1bGwgcGFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgcnVuRXhwYW5kRWZmZWN0KClcbiAgICB7XG4gICAgICAgIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuZXhwYW5kQ29sb3JGcm9tO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybWF0aW9uKHRydWUpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5leHBhbmRDb2xvclRvO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCBzY2FsZSB0aGUgaGVscGVyIGRpdiAob3ZlcmxheSkgZG93biB0byBtYWtlIGl0IGxvb2sgbGlrZVxuICAgICAqIGl0IGNvbGxhcHNlc1xuICAgICAqL1xuICAgIHByaXZhdGUgcnVuQ29sbGFwc2VFZmZlY3QoKVxuICAgIHtcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm1hdGlvbihmYWxzZSk7XG5cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCh0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmxlZnQsIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QudG9wLCAwLFxuICAgICAgICAgICAgICAgIDApO1xuICAgICAgICB9LCA0MDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERGUyAgLSB0byBnbyB0aHJ1IGFsbCB0aGUgZWxlbWVudCB1bmRlciBCT0RZIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBwYWdlLlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQocGFyZW50RWxlbWVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlID09PSBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gcGFyZW50RWxlbWVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLm5lZWRUcmF2ZXJzZURvd24oZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOb25GdWxsU2NyZWVuRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICghZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2R0LWZ1bGwtc2NyZWVuJykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3UtZnMtZWxlbWVudC1vdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1dCBhbGwgdGhlIGVsZW1lbnQgdGhhdCB3ZXJlIHByZXZpb3VzbHkgcmVtb3ZlZCBieSBoaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQoKSBiYWNrXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93Tm9uRnVsbFNjcmVlbkVsZW1lbnQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudS1mcy1lbGVtZW50LW91dCcpKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW06IGFueSkgPT4gZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd1LWZzLWVsZW1lbnQtb3V0JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBJbnRlcm5hbFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBuZWVkVHJhdmVyc2VEb3duKGVsZW1lbnQ6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoZWxlbWVudCkgJiYgZWxlbWVudC50YWdOYW1lICE9PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3UtZnVsbC1zY3JlZW4tZWxlbWVudCcpICYmXG4gICAgICAgICAgICAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2R0LWZ1bGwtc2NyZWVuJyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGVudGVyIGZ1bGwgc2NyZWVuIC9wYWdlIG1vZGUgd2hlbiBuZWVkIHRvIGNhbGN1bGF0ZSBob3cgbWFueSByb3dzIHRvIGxvYWQgaW5pdGlhbGx5XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUxpbWl0KCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IGJyb3dzZXJIID0gdGhpcy5kb21VdGlscy5icm93c2VyRGltZW50aW9ucygpLmhlaWdodDtcbiAgICAgICAgbGV0IHJvd0ggPSB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGJvZHkgdHI6Zmlyc3QtY2hpbGQnKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQocm93SCkgJiYgcm93SCA+IDApID8gKGJyb3dzZXJIIC8gcm93SCkgKyAyMCA6IDUwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBJbnRlcm5hbFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVFbGVtZW50KGw6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdDogbnVtYmVyID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHc6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGg6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGwgKyAncHgnO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGFwcGx5VHJhbnNmb3JtYXRpb24oZXhwYW5kOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHgsIHksIHR4LCB0eTtcbiAgICAgICAgaWYgKGV4cGFuZCkge1xuICAgICAgICAgICAgeCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmhlaWdodDtcbiAgICAgICAgICAgIHR4ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3Qud2lkdGggLyAyXG4gICAgICAgICAgICAgICAgLSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmxlZnQpIC8geDtcbiAgICAgICAgICAgIHR5ID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIDJcbiAgICAgICAgICAgICAgICAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QudG9wKSAvIHk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICAgICAgeSA9IDE7XG4gICAgICAgICAgICB0eCA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICAgICAgICAgIHR5ID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgJ3NjYWxlWCgnICsgeCArICcpIHNjYWxlWSgnICsgeSArICcpIHRyYW5zbGF0ZTNkKCcgKyAodHgpICsgJ3B4LCAnICsgKHR5KSArICdweCwgMHB4KSc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJTkZJTklURSBTQ1JPTExJTkcgTUVUSE9EU1xuICAgICAqL1xuXG4gICAgcHJpdmF0ZSBpbml0RnVsbFNjcmVlbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydEZ1bGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGxvYWRpbmcgaXMgZmluaXNoZWQgbWFyayBsb2FkaW5nIGljb24gaXMgZG9uZSBzbyB3ZSBjYW4gaGlkZSBpdC4gSSBhbSB1c2luZyBsaXR0bGVcbiAgICAgKiBkZWxheSB0byBtYWtlIHRoZSBhbmltYXRpb24gdmlzaWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZGluZ0ZpbmlzaGVkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5pbmZpbml0ZVNjcm9sbCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbmZpbml0ZVNjcm9sbC5jb21wbGV0ZSgpLCAyMDApO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=