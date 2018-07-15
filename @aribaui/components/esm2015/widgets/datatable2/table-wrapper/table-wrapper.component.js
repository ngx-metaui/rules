/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        let /** @type {?} */ fWidth = 0;
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
        let /** @type {?} */ frozenRows = frozenView.querySelectorAll('table tr');
        let /** @type {?} */ unFrozenRows = unFrozenView.querySelectorAll('table tr');
        assert(frozenRows.length === unFrozenRows.length, 'Frozen Column: Two tables does not much!');
        Array.from(frozenRows).forEach((frozen, index) => {
            let /** @type {?} */ h = Math.max(frozen.offsetHeight, unFrozenRows[index].offsetHeight);
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
            let /** @type {?} */ frozenView = this.thisElement.nativeElement.querySelector('.dt-body-frozen');
            let /** @type {?} */ unFrozenView = this.thisElement.nativeElement.querySelector('.dt-body-unfrozen');
            let /** @type {?} */ frozenWidth = this.calculateFrozenWidth();
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
        // mark my element in the path that needs to stay
        let /** @type {?} */ parentNode = this.thisElement.nativeElement.parentNode;
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
            let /** @type {?} */ dataProvider = this.dt.dataSource.dataProvider;
            let /** @type {?} */ data = dataProvider.dataChanges.getValue();
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
        for (let /** @type {?} */ i = 0; i < parentElement.children.length; i++) {
            let /** @type {?} */ element = parentElement.children[i];
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
        let /** @type {?} */ browserH = this.domUtils.browserDimentions().height;
        let /** @type {?} */ rowH = this.dt.el.nativeElement.querySelector('tbody tr:first-child').offsetHeight;
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
        let /** @type {?} */ x, /** @type {?} */ y, /** @type {?} */ tx, /** @type {?} */ ty;
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
                template: `<div [ngClass]="dt.styleClass" [class.dt-full-screen-mode]="isFullScreenMode"
     [style.width]="dt.width"
>
    <div class="dt-loading-overlay" *ngIf="dt.loading"></div>
    <div class="dt-loading-content" *ngIf="dt.loading">
        <i [class]="'sap-icon u-dt-spin-icon ' + dt.loadingIcon"></i>
    </div>

    <div class="dt-header" *ngIf="dt.showTableHeader">
        <ng-template *ngIf="dt.header; then appDefinedHeader else defaultHeader"></ng-template>
    </div>

    <!-- DT BODY with table headers and values -->
    <div class="dt-body-wrapper-view">
        <ng-template
            *ngIf="dt.hasFrozenColumns(); then dtBodyWithFrozenColumns else dtBodyNoFrozenColumns">
        </ng-template>
    </div>

    <!--<div class="dt-footer" *ngIf="footer">-->
    <!--&lt;!&ndash; footerArea&ndash;&gt;-->
    <!--<ng-content select="aw-dt-footer"></ng-content>-->
    <!--</div>-->
</div>

<!-- todo: dont activate this if we reached the end of list - -->
<aw-infinite-scroll #infiniteScroll *ngIf="isFullScreenMode"
                    [distance]="'10%'"
                    [fetchSize]="dt.state.limit"
                    (onLoad)="onLazyLoad($event)">
</aw-infinite-scroll>


<ng-template #appDefinedHeader>
    <ng-container *ngTemplateOutlet="heading;"></ng-container>
</ng-template>

<ng-template #defaultHeader>
    <div class="dt-global-filter">
        <span class="sap-icon icon-filter"></span>
    </div>

    <div class="dt-global-actions">
        <div class="dt-action-combo">
            <span *ngIf="supportFullScreen" class="sap-icon icon-resize"
                  (click)="toggleFullScreen($event)"></span>

            <aw-input-field *ngIf="dt.showGlobalSearch" styleClass="dt-table-search"
                            [(ngModel)]="dt.state.currentSearchQuery"
                            placeHolder="search"
                            icon="icon-search"
                            (ngModelChange)="searchTerms.next($event)">
            </aw-input-field>
            <span class="ariba-icon icon-more"></span>
        </div>
    </div>
</ng-template>

<!--
    Each section frozen/non-frozen is calculated inside table-wrapper in the ngAfterViewChecked, where we set
    proper width for each frame as well as left coordinates for the right one
-->
<ng-template #dtBodyNoFrozenColumns>
    <!--
        For non-frozen case we also need to set TRUE as the view is actually frozen and does not
        scroll.
        We use this frozenColumns flag inside DT to properly set column index on the header level
        columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))

        therefore we need to set true even in this case to return real columnIndex since we dont
        have the second table.
    -->
    <ng-container *ngTemplateOutlet="dtBody; context:{$implicit: dt.columns, frozenColumns: true }">
    </ng-container>
</ng-template>

<ng-template #dtBodyWithFrozenColumns>
    <ng-container
        *ngTemplateOutlet="dtBody; context:{$implicit: dt.frozenColumns, frozenColumns: true }">
    </ng-container>
    <ng-container
        *ngTemplateOutlet="dtBody; context:{$implicit: dt.columns, frozenColumns: false }">
    </ng-container>
</ng-template>


<ng-template #dtBody let-columns let-frozenColumns="frozenColumns">

    <div #dtContainer class="dt-body-wrapper"
         [style.width.px]="this.calculateFrozenWidth()"
         [class.dt-body-unfrozen]="dt.hasFrozenColumns() && !frozenColumns"
         [class.dt-body-frozen]="dt.hasFrozenColumns() && frozenColumns"
    >

        <table [ngClass]="dt.tableStyleClass"
               [style.width]="frozenColumns ? null : dt.scrollWidth"
               [class.dt-pivot-layout]="dt.pivotalLayout"
               [class.dt-plain-layout]="!dt.pivotalLayout && !dt.isOutline()">

            <!-- Render TH header rows-->
            <thead class="dt-thead">
            <ng-container *ngTemplateOutlet="headerRows; context:{$implicit: columns,frozenColumns:frozenColumns }">
            </ng-container>
            </thead>

            <!--
                Render data rows. For data rows we need to keep tbody tag inside DT table
                due to Outline
             -->
            <ng-container *ngTemplateOutlet="bodyRows; context:{$implicit: columns,  frozenColumns:frozenColumns }">
            </ng-container>
        </table>
    </div>
</ng-template>


<div #dtFullScreenOverlay class="dt-full-screen-overlay u-full-screen-element"></div>
`,
                styles: [`.dt-footer,.dt-header{text-align:center;padding:.5em .75em;box-sizing:border-box}.dt-footer{border-top:0}.dt-thead tr{border-width:0}.dt-body-wrapper-view{position:relative}.dt-body-wrapper{overflow:hidden;border:1px solid #d7d7d7}.dt-body-wrapper.dt-body-unfrozen{border-left-color:transparent;position:absolute;top:0;overflow-x:auto}.dt-loading-overlay{position:absolute;background-color:#9b9b9b;width:100%;height:100%;opacity:.1;z-index:1}.dt-loading-content{position:absolute;left:50%;top:25%;z-index:2}.dt-header{width:100%;display:flex;flex-flow:row nowrap;justify-content:space-between;color:#363636;border-bottom:1px solid #f1f1f1;margin-bottom:30px}.dt-header .dt-global-filter{flex:0 0;align-items:flex-start;font-size:18px}.dt-header .dt-global-actions{flex:0 0;align-items:flex-end}.dt-header .dt-action-combo{display:flex;flex-flow:row nowrap;color:#7d7d7d}.dt-header .dt-action-combo .ariba-icon,.dt-header .dt-action-combo .sap-icon{margin-left:15px;font-size:20px;align-self:center;cursor:pointer}.dt-header .dt-action-combo .dt-table-search{border-top-color:transparent;border-left-color:transparent;border-right-color:transparent}.dt-header .dt-action-combo .icon-resize{color:#4a4a4a;font-size:16px;line-height:18px;margin-right:15px}.u-dt-spin-icon{display:inline-block;-webkit-animation:2s linear infinite doSpin;animation:2s linear infinite doSpin}@-webkit-keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.dt-full-screen-overlay{position:fixed;z-index:100;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:all .4s ease-in-out}.dt-full-screen{width:98vw;z-index:120;position:absolute;top:15px;pointer-events:all;transition:opacity .5s ease-in-out}.u-fs-element-out{display:none}`],
                encapsulation: ViewEncapsulation.None
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL3RhYmxlLXdyYXBwZXIvdGFibGUtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBR0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxPQUFPLEVBQTRCLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQTRJaEUsTUFBTSxnQkFBaUIsU0FBUSxhQUFhOzs7Ozs7Ozs7SUFrR3hDLFlBQW1CLEdBQWdCLEVBQ2YsUUFDQSxhQUNBLFVBQ3FCLFVBQWtCLEVBRXhDLEVBQXVCO1FBRXRDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQVJJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFD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O1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7SUFPM0UsZUFBZTtRQUVuQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUV6RDs7OztZQTduQlIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFIYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxpNURBQWk1RCxDQUFDO2dCQUMzNUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFFeEM7Ozs7WUFsSmUsV0FBVztZQUx2QixTQUFTO1lBTFQsVUFBVTtZQWlCTixlQUFlO1lBa1BrQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQXhQM0IsbUJBQW1CLHVCQXlQVixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDOzs7OEJBL0Z4RCxLQUFLOzRCQVNMLEtBQUs7c0JBVUwsWUFBWSxTQUFDLGFBQWE7eUJBTzFCLFlBQVksU0FBQyxZQUFZO3VCQU96QixZQUFZLFNBQUMsVUFBVTtxQkFRdkIsWUFBWSxTQUFDLFlBQVk7a0NBT3pCLFNBQVMsU0FBQyxxQkFBcUI7NkJBUS9CLFNBQVMsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmZpbml0ZVNjcm9sbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50JztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBQbGVhc2Ugc2VlIGRhdGF0YWJsZSBmb3IgbW9yZSBkZXRhaWwgZGVzY3JpcHRpb24uIEJ1dCB0aGUgbWFpbiBnb2FsIG9mIHRoaXMgd3JhcHBlciB0byByZW1vdmVcbiAqIGFsbCB0aGUgY29tbW9uIHN1cnJvdW5kaW5nIHBhcnRzIGFyb3VuZCB0aGUgZGF0YXRhYmxlIGFuZCBtYWtlIHN1cmUgRFQgY2FuIGZvY3VzIG9ubHkgYWN0dWFsXG4gKiBoZWFkZXIgYW5kIGJvZHkgc3RydWN0dXJlXG4gKlxuICogSXQgaXMgZXhwZWN0ZWQgdGhhdCB3cmFwcGVyIGFsc28gcHJvdmlkZXMgc29tZSBjb2RlIGZvciB0aGUgc2xpZGluZyB1cCBwYW5lbCBjb250YWluaW5nXG4gKiBidXR0b25zIGFuZCBvdGhlciBhY3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGR1cmluZyBlZGl0aW5nXG4gKlxuICpcbiAqIFRvZG86IEV4dHJhY3QgdGhlIGV4cGFuZCBsb2dpYyBvdXQgaW50byBzb21lIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgb3IganVzdCBhIGNsYXNzXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LXdyYXBwZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJkdC5zdHlsZUNsYXNzXCIgW2NsYXNzLmR0LWZ1bGwtc2NyZWVuLW1vZGVdPVwiaXNGdWxsU2NyZWVuTW9kZVwiXG4gICAgIFtzdHlsZS53aWR0aF09XCJkdC53aWR0aFwiXG4+XG4gICAgPGRpdiBjbGFzcz1cImR0LWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwiZHQubG9hZGluZ1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkdC1sb2FkaW5nLWNvbnRlbnRcIiAqbmdJZj1cImR0LmxvYWRpbmdcIj5cbiAgICAgICAgPGkgW2NsYXNzXT1cIidzYXAtaWNvbiB1LWR0LXNwaW4taWNvbiAnICsgZHQubG9hZGluZ0ljb25cIj48L2k+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtaGVhZGVyXCIgKm5nSWY9XCJkdC5zaG93VGFibGVIZWFkZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiZHQuaGVhZGVyOyB0aGVuIGFwcERlZmluZWRIZWFkZXIgZWxzZSBkZWZhdWx0SGVhZGVyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRFQgQk9EWSB3aXRoIHRhYmxlIGhlYWRlcnMgYW5kIHZhbHVlcyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtYm9keS13cmFwcGVyLXZpZXdcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAqbmdJZj1cImR0Lmhhc0Zyb3plbkNvbHVtbnMoKTsgdGhlbiBkdEJvZHlXaXRoRnJvemVuQ29sdW1ucyBlbHNlIGR0Qm9keU5vRnJvemVuQ29sdW1uc1wiPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLTxkaXYgY2xhc3M9XCJkdC1mb290ZXJcIiAqbmdJZj1cImZvb3RlclwiPi0tPlxuICAgIDwhLS0mbHQ7ISZuZGFzaDsgZm9vdGVyQXJlYSZuZGFzaDsmZ3Q7LS0+XG4gICAgPCEtLTxuZy1jb250ZW50IHNlbGVjdD1cImF3LWR0LWZvb3RlclwiPjwvbmctY29udGVudD4tLT5cbiAgICA8IS0tPC9kaXY+LS0+XG48L2Rpdj5cblxuPCEtLSB0b2RvOiBkb250IGFjdGl2YXRlIHRoaXMgaWYgd2UgcmVhY2hlZCB0aGUgZW5kIG9mIGxpc3QgLSAtLT5cbjxhdy1pbmZpbml0ZS1zY3JvbGwgI2luZmluaXRlU2Nyb2xsICpuZ0lmPVwiaXNGdWxsU2NyZWVuTW9kZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXN0YW5jZV09XCInMTAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtmZXRjaFNpemVdPVwiZHQuc3RhdGUubGltaXRcIlxuICAgICAgICAgICAgICAgICAgICAob25Mb2FkKT1cIm9uTGF6eUxvYWQoJGV2ZW50KVwiPlxuPC9hdy1pbmZpbml0ZS1zY3JvbGw+XG5cblxuPG5nLXRlbXBsYXRlICNhcHBEZWZpbmVkSGVhZGVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkaW5nO1wiPjwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJkdC1nbG9iYWwtZmlsdGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2FwLWljb24gaWNvbi1maWx0ZXJcIj48L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtZ2xvYmFsLWFjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImR0LWFjdGlvbi1jb21ib1wiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzdXBwb3J0RnVsbFNjcmVlblwiIGNsYXNzPVwic2FwLWljb24gaWNvbi1yZXNpemVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUZ1bGxTY3JlZW4oJGV2ZW50KVwiPjwvc3Bhbj5cblxuICAgICAgICAgICAgPGF3LWlucHV0LWZpZWxkICpuZ0lmPVwiZHQuc2hvd0dsb2JhbFNlYXJjaFwiIHN0eWxlQ2xhc3M9XCJkdC10YWJsZS1zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZHQuc3RhdGUuY3VycmVudFNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUhvbGRlcj1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImljb24tc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWFyY2hUZXJtcy5uZXh0KCRldmVudClcIj5cbiAgICAgICAgICAgIDwvYXctaW5wdXQtZmllbGQ+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFyaWJhLWljb24gaWNvbi1tb3JlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBFYWNoIHNlY3Rpb24gZnJvemVuL25vbi1mcm96ZW4gaXMgY2FsY3VsYXRlZCBpbnNpZGUgdGFibGUtd3JhcHBlciBpbiB0aGUgbmdBZnRlclZpZXdDaGVja2VkLCB3aGVyZSB3ZSBzZXRcbiAgICBwcm9wZXIgd2lkdGggZm9yIGVhY2ggZnJhbWUgYXMgd2VsbCBhcyBsZWZ0IGNvb3JkaW5hdGVzIGZvciB0aGUgcmlnaHQgb25lXG4tLT5cbjxuZy10ZW1wbGF0ZSAjZHRCb2R5Tm9Gcm96ZW5Db2x1bW5zPlxuICAgIDwhLS1cbiAgICAgICAgRm9yIG5vbi1mcm96ZW4gY2FzZSB3ZSBhbHNvIG5lZWQgdG8gc2V0IFRSVUUgYXMgdGhlIHZpZXcgaXMgYWN0dWFsbHkgZnJvemVuIGFuZCBkb2VzIG5vdFxuICAgICAgICBzY3JvbGwuXG4gICAgICAgIFdlIHVzZSB0aGlzIGZyb3plbkNvbHVtbnMgZmxhZyBpbnNpZGUgRFQgdG8gcHJvcGVybHkgc2V0IGNvbHVtbiBpbmRleCBvbiB0aGUgaGVhZGVyIGxldmVsXG4gICAgICAgIGNvbHVtbkluZGV4Oihmcm96ZW4gPyBjb2x1bW5JbmRleDogKGNvbHVtbnMubGVuZ3RoICsgY29sdW1uSW5kZXgpKVxuXG4gICAgICAgIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIHNldCB0cnVlIGV2ZW4gaW4gdGhpcyBjYXNlIHRvIHJldHVybiByZWFsIGNvbHVtbkluZGV4IHNpbmNlIHdlIGRvbnRcbiAgICAgICAgaGF2ZSB0aGUgc2Vjb25kIHRhYmxlLlxuICAgIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdEJvZHk7IGNvbnRleHQ6eyRpbXBsaWNpdDogZHQuY29sdW1ucywgZnJvemVuQ29sdW1uczogdHJ1ZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2R0Qm9keVdpdGhGcm96ZW5Db2x1bW5zPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdEJvZHk7IGNvbnRleHQ6eyRpbXBsaWNpdDogZHQuZnJvemVuQ29sdW1ucywgZnJvemVuQ29sdW1uczogdHJ1ZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImR0Qm9keTsgY29udGV4dDp7JGltcGxpY2l0OiBkdC5jb2x1bW5zLCBmcm96ZW5Db2x1bW5zOiBmYWxzZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjZHRCb2R5IGxldC1jb2x1bW5zIGxldC1mcm96ZW5Db2x1bW5zPVwiZnJvemVuQ29sdW1uc1wiPlxuXG4gICAgPGRpdiAjZHRDb250YWluZXIgY2xhc3M9XCJkdC1ib2R5LXdyYXBwZXJcIlxuICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cInRoaXMuY2FsY3VsYXRlRnJvemVuV2lkdGgoKVwiXG4gICAgICAgICBbY2xhc3MuZHQtYm9keS11bmZyb3plbl09XCJkdC5oYXNGcm96ZW5Db2x1bW5zKCkgJiYgIWZyb3plbkNvbHVtbnNcIlxuICAgICAgICAgW2NsYXNzLmR0LWJvZHktZnJvemVuXT1cImR0Lmhhc0Zyb3plbkNvbHVtbnMoKSAmJiBmcm96ZW5Db2x1bW5zXCJcbiAgICA+XG5cbiAgICAgICAgPHRhYmxlIFtuZ0NsYXNzXT1cImR0LnRhYmxlU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiZnJvemVuQ29sdW1ucyA/IG51bGwgOiBkdC5zY3JvbGxXaWR0aFwiXG4gICAgICAgICAgICAgICBbY2xhc3MuZHQtcGl2b3QtbGF5b3V0XT1cImR0LnBpdm90YWxMYXlvdXRcIlxuICAgICAgICAgICAgICAgW2NsYXNzLmR0LXBsYWluLWxheW91dF09XCIhZHQucGl2b3RhbExheW91dCAmJiAhZHQuaXNPdXRsaW5lKClcIj5cblxuICAgICAgICAgICAgPCEtLSBSZW5kZXIgVEggaGVhZGVyIHJvd3MtLT5cbiAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImR0LXRoZWFkXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyUm93czsgY29udGV4dDp7JGltcGxpY2l0OiBjb2x1bW5zLGZyb3plbkNvbHVtbnM6ZnJvemVuQ29sdW1ucyB9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG5cbiAgICAgICAgICAgIDwhLS1cbiAgICAgICAgICAgICAgICBSZW5kZXIgZGF0YSByb3dzLiBGb3IgZGF0YSByb3dzIHdlIG5lZWQgdG8ga2VlcCB0Ym9keSB0YWcgaW5zaWRlIERUIHRhYmxlXG4gICAgICAgICAgICAgICAgZHVlIHRvIE91dGxpbmVcbiAgICAgICAgICAgICAtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5Um93czsgY29udGV4dDp7JGltcGxpY2l0OiBjb2x1bW5zLCAgZnJvemVuQ29sdW1uczpmcm96ZW5Db2x1bW5zIH1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48ZGl2ICNkdEZ1bGxTY3JlZW5PdmVybGF5IGNsYXNzPVwiZHQtZnVsbC1zY3JlZW4tb3ZlcmxheSB1LWZ1bGwtc2NyZWVuLWVsZW1lbnRcIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kdC1mb290ZXIsLmR0LWhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOi41ZW0gLjc1ZW07Ym94LXNpemluZzpib3JkZXItYm94fS5kdC1mb290ZXJ7Ym9yZGVyLXRvcDowfS5kdC10aGVhZCB0cntib3JkZXItd2lkdGg6MH0uZHQtYm9keS13cmFwcGVyLXZpZXd7cG9zaXRpb246cmVsYXRpdmV9LmR0LWJvZHktd3JhcHBlcntvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjFweCBzb2xpZCAjZDdkN2Q3fS5kdC1ib2R5LXdyYXBwZXIuZHQtYm9keS11bmZyb3plbntib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtvdmVyZmxvdy14OmF1dG99LmR0LWxvYWRpbmctb3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiM5YjliOWI7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvcGFjaXR5Oi4xO3otaW5kZXg6MX0uZHQtbG9hZGluZy1jb250ZW50e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO3RvcDoyNSU7ei1pbmRleDoyfS5kdC1oZWFkZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBub3dyYXA7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Y29sb3I6IzM2MzYzNjtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZjFmMWYxO21hcmdpbi1ib3R0b206MzBweH0uZHQtaGVhZGVyIC5kdC1nbG9iYWwtZmlsdGVye2ZsZXg6MCAwO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7Zm9udC1zaXplOjE4cHh9LmR0LWhlYWRlciAuZHQtZ2xvYmFsLWFjdGlvbnN7ZmxleDowIDA7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmR0LWhlYWRlciAuZHQtYWN0aW9uLWNvbWJve2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IG5vd3JhcDtjb2xvcjojN2Q3ZDdkfS5kdC1oZWFkZXIgLmR0LWFjdGlvbi1jb21ibyAuYXJpYmEtaWNvbiwuZHQtaGVhZGVyIC5kdC1hY3Rpb24tY29tYm8gLnNhcC1pY29ue21hcmdpbi1sZWZ0OjE1cHg7Zm9udC1zaXplOjIwcHg7YWxpZ24tc2VsZjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXJ9LmR0LWhlYWRlciAuZHQtYWN0aW9uLWNvbWJvIC5kdC10YWJsZS1zZWFyY2h7Ym9yZGVyLXRvcC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmR0LWhlYWRlciAuZHQtYWN0aW9uLWNvbWJvIC5pY29uLXJlc2l6ZXtjb2xvcjojNGE0YTRhO2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjE4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LnUtZHQtc3Bpbi1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBkb1NwaW47YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBkb1NwaW59QC13ZWJraXQta2V5ZnJhbWVzIGRvU3BpbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBkb1NwaW57MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS5kdC1mdWxsLXNjcmVlbi1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlIDUwJTt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1pbi1vdXR9LmR0LWZ1bGwtc2NyZWVue3dpZHRoOjk4dnc7ei1pbmRleDoxMjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjE1cHg7cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246b3BhY2l0eSAuNXMgZWFzZS1pbi1vdXR9LnUtZnMtZWxlbWVudC1vdXR7ZGlzcGxheTpub25lfWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcblxufSlcbmV4cG9ydCBjbGFzcyBEVFdyYXBwZXIgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuXG4gICAgLyoqXG4gICAgICogQ29sb3IgdGhhdCBpcyB1c2VkIGJ5IGZ1bGwgc2NyZWVuIGRpdiBvdmVybGF5IHRvIGNyZWF0ZSBleHBhbmRpbmcgZWZmZWN0IHdoaWNoIG5lZWRzIHRvIGhhdmVcbiAgICAgKiBsaXR0bGUgdGVudDtcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXhwYW5kQ29sb3JGcm9tOiBzdHJpbmcgPSAnI2YzZjNmMyc7XG5cblxuICAgIC8qKlxuICAgICAqIENvbG9yIHRoYXQgaXMgdXNlZCB0byBzZXQgYWZ0ZXIgd2UgYXJlIGluIHRoZSBmdWxsIHNjcmVlbiBzbyBvdXIgb3ZlcmxheSBkaXYgaGlkZSBldmVyeXRoaW5nXG4gICAgICogb24gdGhlIHBhZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXhwYW5kQ29sb3JUbzogc3RyaW5nID0gJyNGRkZGRkYnO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRhYmxlIGhlYWRpbmcgYXJlYSBvZmZlcnMgZGV2ZWxvcGVyIHRvIGNvbXBsZXRlbHkgb3ZlcnJpZGUgdGhlIHRvcCBiYXIgd2hlcmUgd2UgaGF2ZSBmaWx0ZXJzXG4gICAgICogYW5kIG90aGVycyBhY3Rpb25zLlxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGluZ0FyZWEnKVxuICAgIGhlYWRpbmc6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgdGFibGUgaGVhZGVycyBhbmQgd3JhcHMgdGhlbSB3aXRoaW4gdGhlYWQgdGFnXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyUm93cycpXG4gICAgaGVhZGVyUm93czogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyB0YWJsZSBib2R5XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYm9keVJvd3MnKVxuICAgIGJvZHlSb3dzOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBoZWFkaW5nIHRlbXBsYXRlLiBXZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGRlcGVuZGVuY3kgb24gcHJpbWVORyBzbyBmYXIgaXQgaXMgdXNpbmdcbiAgICAgKiBwLWZvb3RlclxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Zvb3RlckFyZWEnKVxuICAgIGZvb3RlcjogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogRGl2IHVzZWQgdG8gbWFrZSB0aGUgZnVsbCBzY3JlZW4gZXhwYW5zaW9uIGVmZmVjdFxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ2R0RnVsbFNjcmVlbk92ZXJsYXknKVxuICAgIGR0RnVsbFNjcmVlbk92ZXJsYXk6IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBpbmZpdGUgc2Nyb2xsLiBXZSBhcmUgdXNpbmcgdGhpcyB0byB0cmlnZ2VyIGxvYWRpbmcgZmluaXNoIGV2ZW50IHNvIHdlIGNhblxuICAgICAqIGhpZGUgbG9hZGluZyBhbmltYXRpb25cbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdpbmZpbml0ZVNjcm9sbCcpXG4gICAgaW5maW5pdGVTY3JvbGw6IEluZmluaXRlU2Nyb2xsQ29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBvcmRlciB0byBkZWJvdW5jZSB0aGUgdHlwaW5nIHdlIG5lZWQgdG8gdXNlIHN1YmplY3RcbiAgICAgKlxuICAgICAqL1xuICAgIHNlYXJjaFRlcm1zID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5cbiAgICAvKipcbiAgICAgKiAgU3BlY2lmaWVzIGlmIHdlIGFyZSBpbiB2aWV3aW5nL2VkaXRpbmcgbW9kZSB0aGF0IGNhbiBicm93c2Ugd2hvbGUgZGF0YXNldCBsYXppbHlcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRnVsbFNjcmVlbk1vZGUgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHdlIGNhbiBzdXBwb3J0IGZ1bGwgc2NyZWVuIG1vZGUgLSBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIGJyb3dzZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHN1cHBvcnRGdWxsU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcbiAgICBxdWVyeVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGxvYWRpbmdTdWI6IFN1YnNjcmlwdGlvbjtcbiAgICAvKipcbiAgICAgKiAgU2F2ZXMgb3JpZ2luYWwgYm91bmRpbmcgcmVjdCBjb29yZGluYXRlcyBiZWZvcmUgd2UgZXhwYW5kIHRoZSBEVCB0byBmdWxsIHNjcmVlblxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkdEJvdW5kaW5nQ2xpZW50UmVjdDogYW55O1xuICAgIC8qKlxuICAgICAqIFJlbWVtYmVycyBvcmlnaW5hbCBzY3JvbGwgcG9zaXRpb24gYmVmb3JlIHdlIHN3aXRjaCB0byBmdWxsIHNjcmVlbiBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcmlnaW5hbFNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdGhpc0VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkb21VdGlsczogRG9tVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEYXRhdGFibGUyQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwdWJsaWMgZHQ6IERhdGF0YWJsZTJDb21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLnF1ZXJ5U3Vic2NyaXB0aW9uID0gdGhpcy5zZWFyY2hUZXJtcy5waXBlKFxuICAgICAgICAgICAgLy8gd2FpdCAzMDBtcyBhZnRlciBlYWNoIGtleXN0cm9rZSBiZWZvcmUgY29uc2lkZXJpbmcgdGhlIHRlcm1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuXG4gICAgICAgICAgICAvLyBpZ25vcmUgbmV3IHRlcm0gaWYgc2FtZSBhcyBwcmV2aW91cyB0ZXJtXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKHRlcm06IHN0cmluZykgPT4gb2YodGVybSkpXG4gICAgICAgICkuc3Vic2NyaWJlKCh0ZXJtOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGVybSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmluZCh0ZXJtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nU3ViID0gdGhpcy5kdC52YWx1ZUNoYW5nZVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB0aGlzLmxvYWRpbmdGaW5pc2hlZCgpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgYWxsIGNvbHVtbnMgbWFya2VkIGFzIGZyb3plbiBhbmQgcmV0cmlldmUgYSB3aWR0aCBzbyB3ZSBjYW4gdXBkYXRlXG4gICAgICogcGFyZW50IGRpdlxuICAgICAqXG4gICAgICovXG4gICAgY2FsY3VsYXRlRnJvemVuV2lkdGgoKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmR0LmZyb3plbkNvbHVtbnMuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2wubWF4V2lkdGhQeCA+IDApIHtcbiAgICAgICAgICAgICAgICBmV2lkdGggKz0gY29sLndpZGVzdENlbGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZXaWR0aCArPSBwYXJzZUludChjb2wud2lkdGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZldpZHRoO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBoYXZpbmcgdHdvIHNlcGFyYXRlIHRhYmxlcyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHJvd3Mgb2YgdGhlIHRhYmxlcyBhcmUgYWxpZ25lZC5cbiAgICAgKlxuICAgICAqIFRoZXJlZm9yZSB0aGlzIG1ldGhvZCB0YWtlcyBmaXJzdCBjb2x1bW4gZnJvbSBlYWNoIHRhYmxlIHJlYWQgdGhlIGhlaWdodCBvZiB0aGUgcm93cyBhbmQgc2V0XG4gICAgICogdGhlIG1heCBoZWlnaHQgdG8gYm90aCByb3dzLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBhbGlnblRhYmxlc0hlaWdodHMoZnJvemVuVmlldzogYW55LCB1bkZyb3plblZpZXc6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoZnJvemVuVmlldykgJiYgaXNQcmVzZW50KGZyb3plblZpZXcpLFxuICAgICAgICAgICAgJ0NhbnQgYWxpZ24gdGFibGUgdmlld3MgYXMgb25lIG9mIHRoZSB2aWV3IGlzIHVuZGVmaW5lZCcpO1xuXG4gICAgICAgIGxldCBmcm96ZW5Sb3dzOiBhbnlbXSA9IGZyb3plblZpZXcucXVlcnlTZWxlY3RvckFsbCgndGFibGUgdHInKTtcbiAgICAgICAgbGV0IHVuRnJvemVuUm93czogYW55W10gPSB1bkZyb3plblZpZXcucXVlcnlTZWxlY3RvckFsbCgndGFibGUgdHInKTtcblxuICAgICAgICBhc3NlcnQoZnJvemVuUm93cy5sZW5ndGggPT09IHVuRnJvemVuUm93cy5sZW5ndGgsXG4gICAgICAgICAgICAnRnJvemVuIENvbHVtbjogVHdvIHRhYmxlcyBkb2VzIG5vdCBtdWNoIScpO1xuXG4gICAgICAgIEFycmF5LmZyb20oZnJvemVuUm93cykuZm9yRWFjaCgoZnJvemVuOiBhbnksIGluZGV4OiBudW1iZXIpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBoID0gTWF0aC5tYXgoZnJvemVuLm9mZnNldEhlaWdodCwgdW5Gcm96ZW5Sb3dzW2luZGV4XS5vZmZzZXRIZWlnaHQpO1xuICAgICAgICAgICAgZnJvemVuLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgdW5Gcm96ZW5Sb3dzW2luZGV4XS5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdEZ1bGxTY3JlZW4oKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGlmICh0aGlzLmR0Lmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgbGV0IGZyb3plblZpZXcgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR0LWJvZHktZnJvemVuJyk7XG4gICAgICAgICAgICBsZXQgdW5Gcm96ZW5WaWV3ID0gdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1ib2R5LXVuZnJvemVuJyk7XG5cbiAgICAgICAgICAgIGxldCBmcm96ZW5XaWR0aCA9IHRoaXMuY2FsY3VsYXRlRnJvemVuV2lkdGgoKTtcblxuICAgICAgICAgICAgZnJvemVuVmlldy5zdHlsZS53aWR0aCA9IGZyb3plbldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodW5Gcm96ZW5WaWV3KSkge1xuICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgYm9yZGVyIGFuZCBjcmVhdGUgaW5kZW50IGVmZmVjdCBieSBoYXZpbmcgMXB4IHdoaXRlIHNwYWNlXG4gICAgICAgICAgICAgICAgdW5Gcm96ZW5WaWV3LnN0eWxlLmxlZnQgPSAoZnJvemVuV2lkdGggKyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgdW5Gcm96ZW5WaWV3LnN0eWxlLndpZHRoID0gdW5Gcm96ZW5WaWV3LnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgICAgICAgICAgICAgICAgLSBmcm96ZW5WaWV3Lm9mZnNldFdpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25UYWJsZXNIZWlnaHRzKGZyb3plblZpZXcsIHVuRnJvemVuVmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeVN1YnNjcmlwdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5sb2FkaW5nU3ViKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZVTEwgU0NSRUVOIE1PREUgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGZ1bGxzY3JlZW4gZnVuY3Rpb25hbGl0eSBpcyBlbmFibGVkIHRoaXMgbWV0aG9kIHN3aXRjaGVzIGJldHdlZW4gbm9ybWwgYW5kIGZ1bGwgc2NyZWVuXG4gICAgICogbW9kZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbFNjcmVlbihldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUZ1bGxTY3JlZW4oZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFNjcmVlbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUbyBwdXNoIHRoaXMgY29tcG9uZW50IHRvIGZ1bGwgc2NyZWVuIG1vZGUgb3IgbWF5YmUgZnVsbCBwYWdlIG1vZGUgd2UgbmVlZCBydW4gZm9sbG93aW5nOlxuICAgICAqXG4gICAgICogIC0gRXhlY3V0ZSBleHBhbmQgdHJhbnNmb3JtYXRpb24sIHdoZXJlIHdlIGhhdmUgYWRkaXRpb25hbCBvdmVybGF5IGRpdiB0aGF0IHdlIHNsb3dseSBleHBhbmRcbiAgICAgKiAgYW5kIHRoaXMgY3JlYXRlcyBpbXByZXNzaW9uIHRoZSBEVCBpcyBleHBhbmRpbmdcbiAgICAgKlxuICAgICAqICAtIGFwcGx5IGZ1bGwtc2NyZWVuIGNsYXNzIG9uIHRvcCBob3N0IGVsZW1lbnQgIC0gaW4gdGhpcyBjYXNlIGl0cyBEYXRhVGFibGUgdG8gc3dpdGNoXG4gICAgICogIHRvIGFic29sdXRlIHBvc2l0aW9uaW5nXG4gICAgICpcbiAgICAgKiAgLSBtYWtlIHN1cmUgd2UgYXJlIHNjcm9sbGVkIGFsbCB0aGUgd2F5IHVwXG4gICAgICpcbiAgICAgKiAgLSBoaWRlIGFsbCB0aGUgZWxlbWVudHMgb24gdGhlIHBhZ2Ugc28gdGhlaXIgZGltZW5zaW9uIGRvbid0IGludGVyZmVyZSB3aXRoIHRoaXMgdGFibGUuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIG9wZW5GdWxsU2NyZWVuKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbk1vZGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucnVuRXhwYW5kRWZmZWN0KCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKTtcbiAgICAgICAgdGhpcy50b2dnbGVGdWxsU2NyZWVuT25EVCh0cnVlKTtcblxuXG4gICAgICAgIC8vIG1hcmsgbXkgZWxlbWVudCBpbiB0aGUgcGF0aCB0aGF0IG5lZWRzIHRvIHN0YXlcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChwYXJlbnROb2RlKSAmJiBwYXJlbnROb2RlLnRhZ05hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd1LWZ1bGwtc2NyZWVuLWVsZW1lbnQnKTtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgdGhpcy5kdC5zdGF0ZS5saW1pdCA9IE1hdGgucm91bmQodGhpcy5jYWxjdWxhdGVMaW1pdCgpKTtcbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLmZldGNoKHRoaXMuZHQuc3RhdGUpO1xuXG4gICAgICAgIC8vIG9uY2UgbG9hZGVkIHNldCBiYWNrIGNvcnJlY3QgcGFnZSBzaXplIHdlIHVzZSB3aGVuIGxvYWRpbmcgZGF0YVxuICAgICAgICB0aGlzLmR0LnN0YXRlLmxpbWl0ID0gdGhpcy5kdC5wYWdlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoZSBzYW1lIGxpa2UgYWJvdmUgbWV0aG9kIChvcGVuRnVsbFNjcmVlbikgYnV0IGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBjbG9zZUZ1bGxTY3JlZW4oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuTW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2hvd05vbkZ1bGxTY3JlZW5FbGVtZW50KCk7XG4gICAgICAgIHRoaXMucnVuQ29sbGFwc2VFZmZlY3QoKTtcbiAgICAgICAgdGhpcy50b2dnbGVGdWxsU2NyZWVuT25EVChmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLmxpbWl0ID0gdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLmRpc3BsYXlMaW1pdDtcbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLm9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5mZXRjaCh0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCB0aGlzLm9yaWdpbmFsU2Nyb2xsUG9zaXRpb24pO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgc2V0IG9mIHNldCBvZiBjc3MgcHJvcGVydGllcyB0byBtYWtlIHRoZSBEVCBtYWluIGNvbXBvbmVudCBvbiB0aGUgcGFnZSBleHBhbmQgdG9cbiAgICAgKiBmdWxsIHBhZ2UgbW9kZSBhbmQgYmFja1xuICAgICAqXG4gICAgICogV2Ugd2FudCB0byBtYWtlIGl0IHdpdGggbGl0dGxlIGRlbGF5IHRvIGxldCBvdGhlciBhbmltYXRpb24gZmluaXNoXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbFNjcmVlbk9uRFQoZnVsbFNjcmVlbjogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoZnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuY2xhc3NMaXN0ICs9ICdkdC1mdWxsLXNjcmVlbic7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuY2xhc3NMaXN0ID0gdGhpcy5kdC5jbGFzc0xpc3QucmVwbGFjZSgnZHQtZnVsbC1zY3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBpbmZpbml0ZSBzY3JvbGwgZXZlbnQgYW5kIHJlcXVlc3QgbmV3IGRhdGEgZnJvbSBkYXRhIHNvdXJjZVxuICAgICAqXG4gICAgICovXG4gICAgb25MYXp5TG9hZChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzTG9hZCkge1xuICAgICAgICAgICAgdGhpcy5kdC5zdGF0ZS5vZmZzZXQgPSBldmVudC5vZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmV0Y2godGhpcy5kdC5zdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YVByb3ZpZGVyID0gdGhpcy5kdC5kYXRhU291cmNlLmRhdGFQcm92aWRlcjtcbiAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChkYXRhLnNsaWNlKDAsIGV2ZW50Lm9mZnNldCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmltYXRpb24gZWZmZWN0IHRvIG1ha2UgaXQgZmVlbCBsaWtlIHRoZSBlbGVtZW50IChpbiB0aGlzIGNhc2UgRFQpIGlzIGV4cGFuZGluZ1xuICAgICAqIGZyb20gdGhlIG1pZGRsZSB0byB0aGUgZnVsbCBwYWdlIG1vZGUuXG4gICAgICpcbiAgICAgKiBXZSB0YWtlIHRoZSBkaW1lbnNpb24gb2YgdGhlIHRhYmxlIHRoZW4gaXQgaXMgc2NhbGVkIHNsb3dseSB0byB0aGUgZnVsbCBwYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBydW5FeHBhbmRFZmZlY3QoKVxuICAgIHtcbiAgICAgICAgdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5leHBhbmRDb2xvckZyb207XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtYXRpb24odHJ1ZSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmV4cGFuZENvbG9yVG87XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgdHJhbnNmb3JtYXRpb24gYW5kIHNjYWxlIHRoZSBoZWxwZXIgZGl2IChvdmVybGF5KSBkb3duIHRvIG1ha2UgaXQgbG9vayBsaWtlXG4gICAgICogaXQgY29sbGFwc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBydW5Db2xsYXBzZUVmZmVjdCgpXG4gICAge1xuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybWF0aW9uKGZhbHNlKTtcblxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCwgdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC50b3AsIDAsXG4gICAgICAgICAgICAgICAgMCk7XG4gICAgICAgIH0sIDQwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogREZTICAtIHRvIGdvIHRocnUgYWxsIHRoZSBlbGVtZW50IHVuZGVyIEJPRFkgYW5kIHJlbW92ZSB0aGVtIGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZGVOb25GdWxsU2NyZWVuRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUgPT09IHBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMubmVlZFRyYXZlcnNlRG93bihlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5vbkZ1bGxTY3JlZW5FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHQtZnVsbC1zY3JlZW4nKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndS1mcy1lbGVtZW50LW91dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHV0IGFsbCB0aGUgZWxlbWVudCB0aGF0IHdlcmUgcHJldmlvdXNseSByZW1vdmVkIGJ5IGhpZGVOb25GdWxsU2NyZWVuRWxlbWVudCgpIGJhY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dOb25GdWxsU2NyZWVuRWxlbWVudCgpOiB2b2lkXG4gICAge1xuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51LWZzLWVsZW1lbnQtb3V0JykpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbTogYW55KSA9PiBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3UtZnMtZWxlbWVudC1vdXQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG5lZWRUcmF2ZXJzZURvd24oZWxlbWVudDogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChlbGVtZW50KSAmJiBlbGVtZW50LnRhZ05hbWUgIT09ICdTQ1JJUFQnICYmXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndS1mdWxsLXNjcmVlbi1lbGVtZW50JykgJiZcbiAgICAgICAgICAgICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHQtZnVsbC1zY3JlZW4nKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZW50ZXIgZnVsbCBzY3JlZW4gL3BhZ2UgbW9kZSB3aGVuIG5lZWQgdG8gY2FsY3VsYXRlIGhvdyBtYW55IHJvd3MgdG8gbG9hZCBpbml0aWFsbHlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlTGltaXQoKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgYnJvd3NlckggPSB0aGlzLmRvbVV0aWxzLmJyb3dzZXJEaW1lbnRpb25zKCkuaGVpZ2h0O1xuICAgICAgICBsZXQgcm93SCA9IHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0Ym9keSB0cjpmaXJzdC1jaGlsZCcpLm9mZnNldEhlaWdodDtcblxuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChyb3dIKSAmJiByb3dIID4gMCkgPyAoYnJvd3NlckggLyByb3dIKSArIDIwIDogNTA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUVsZW1lbnQobDogbnVtYmVyID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0OiBudW1iZXIgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdzogbnVtYmVyID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaDogbnVtYmVyID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gbCArICdweCc7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IHQgKyAncHgnO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBASW50ZXJuYWxcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYXBwbHlUcmFuc2Zvcm1hdGlvbihleHBhbmQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgeCwgeSwgdHgsIHR5O1xuICAgICAgICBpZiAoZXhwYW5kKSB7XG4gICAgICAgICAgICB4ID0gd2luZG93LmlubmVyV2lkdGggLyB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LndpZHRoO1xuICAgICAgICAgICAgeSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgdHggPSAod2luZG93LmlubmVyV2lkdGggLyAyIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCAvIDJcbiAgICAgICAgICAgICAgICAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCkgLyB4O1xuICAgICAgICAgICAgdHkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMiAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC50b3ApIC8geTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IDE7XG4gICAgICAgICAgICB5ID0gMTtcbiAgICAgICAgICAgIHR4ID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgICAgICAgdHkgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAnc2NhbGVYKCcgKyB4ICsgJykgc2NhbGVZKCcgKyB5ICsgJykgdHJhbnNsYXRlM2QoJyArICh0eCkgKyAncHgsICcgKyAodHkpICsgJ3B4LCAwcHgpJztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElORklOSVRFIFNDUk9MTElORyBNRVRIT0RTXG4gICAgICovXG5cbiAgICBwcml2YXRlIGluaXRGdWxsU2NyZWVuKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5zdXBwb3J0RnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gbG9hZGluZyBpcyBmaW5pc2hlZCBtYXJrIGxvYWRpbmcgaWNvbiBpcyBkb25lIHNvIHdlIGNhbiBoaWRlIGl0LiBJIGFtIHVzaW5nIGxpdHRsZVxuICAgICAqIGRlbGF5IHRvIG1ha2UgdGhlIGFuaW1hdGlvbiB2aXNpYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBsb2FkaW5nRmluaXNoZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmluZmluaXRlU2Nyb2xsKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluZmluaXRlU2Nyb2xsLmNvbXBsZXRlKCksIDIwMCk7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==