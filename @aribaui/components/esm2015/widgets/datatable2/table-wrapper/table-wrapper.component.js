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
            if (term) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL3RhYmxlLXdyYXBwZXIvdGFibGUtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBR0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBQyxPQUFPLEVBQTRCLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQXlJaEUsTUFBTSxnQkFBaUIsU0FBUSxhQUFhOzs7Ozs7Ozs7SUF1R3hDLFlBQW9CLEdBQWdCLEVBQ2YsUUFDQSxhQUNBLFVBQ3FCLFVBQWtCLEVBRXhDLEVBQXVCO1FBRXZDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQVJLLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDZixXQUFNLEdBQU4sTUFBTTtRQUNOLGdCQUFXLEdBQVgsV0FBVztRQUNYLGFBQVEsR0FBUixRQUFRO1FBQ2EsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUV4QyxPQUFFLEdBQUYsRUFBRSxDQUFxQjs7Ozs7OytCQXBHakIsU0FBUzs7Ozs7OzZCQVNYLFNBQVM7Ozs7OzJCQXNEbkIsSUFBSSxPQUFPLEVBQVU7Ozs7O2dDQU9oQixLQUFLOzs7OztpQ0FNSyxJQUFJO0tBMkJoQzs7OztJQUdELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTs7UUFFMUMsWUFBWSxDQUFDLEdBQUcsQ0FBQzs7UUFHakIsb0JBQW9CLEVBQUUsRUFFdEIsU0FBUyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDeEMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUV0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXO2FBQ2hDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7S0FDekQ7Ozs7Ozs7SUFRRCxvQkFBb0I7UUFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUVELHFCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUF1QixFQUFFLEVBQUU7WUFFdEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQzthQUM1QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1NBRUosQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7Ozs7Ozs7O0lBV0Qsa0JBQWtCLENBQUUsVUFBZSxFQUFFLFlBQWlCO1FBRWxELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUNqRCx3REFBd0QsQ0FBQyxDQUFDO1FBRTlELHFCQUFJLFVBQVUsR0FBVSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUscUJBQUksWUFBWSxHQUFVLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVwRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxFQUM1QywwQ0FBMEMsQ0FBQyxDQUFDO1FBRWhELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBVyxFQUFFLEtBQWEsRUFBRSxFQUFFO1lBRTFELHFCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDL0IsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELGVBQWU7UUFFWCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDekI7Ozs7SUFHRCxrQkFBa0I7UUFFZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNqRixxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFckYscUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzlDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTFCLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxXQUFXO3NCQUMzRCxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFFcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNyRDtTQUNKO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBRVAsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztLQUNKOzs7Ozs7Ozs7SUFhRCxnQkFBZ0IsQ0FBRSxLQUFVO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtLQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkQsY0FBYyxDQUFFLEtBQVU7UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDOztRQUloQyxxQkFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQzNELE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDNUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNsRCxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3hDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUMxQzs7Ozs7Ozs7SUFPRCxlQUFlLENBQUUsS0FBVTtRQUV2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFWixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNqRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7Ozs7Ozs7O0lBU08sZUFBZTtRQUVuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVuRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDcEYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUVaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ3JGLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7SUFRSixpQkFBaUI7UUFFckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUdoQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBRVosSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFNUQsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFWixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQy9FLENBQUMsQ0FBQyxDQUFDO1NBQ1YsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7SUFPSix3QkFBd0IsQ0FBRSxhQUFrQjtRQUVoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUM7U0FDVjtRQUVELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckQscUJBQUksT0FBTyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBRTFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDN0M7U0FDSjs7Ozs7O0lBTUcsd0JBQXdCO1FBRTVCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDckQsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBT25FLGdCQUFnQixDQUFFLE9BQVk7UUFFbEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVE7WUFDckQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7WUFDbkQsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7Ozs7O0lBUzlDLGNBQWM7UUFFbEIscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDeEQscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFFdkYsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBUS9ELGFBQWEsQ0FBRSxJQUFZLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQzFDLElBQVksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFDekMsSUFBWSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUMzQyxJQUFZLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1FBRS9ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzlELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7Ozs7OztJQU8zRCxtQkFBbUIsQ0FBRSxNQUFlO1FBRXhDLHFCQUFJLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxFQUFFLG1CQUFFLEVBQUUsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUN4RCxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQzFELEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQztrQkFDM0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUM7a0JBQzdELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFNUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDTixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7WUFDcEMsRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ2xELFNBQVMsR0FBRyxDQUFDLEdBQUcsV0FBVyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs7Ozs7SUFHdkYsY0FBYztRQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBU25GLG9CQUFvQixDQUFFLFVBQW1CO1FBRXJDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBRVosRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBRTlDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUMxRCxFQUFFLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFDOUM7U0FDSixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBRVg7Ozs7Ozs7SUFXRCxVQUFVLENBQUUsS0FBVTtRQUVsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ25ELHFCQUFJLElBQUksR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9DLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzlEO0tBQ0o7Ozs7OztJQU9PLGVBQWU7UUFFbkIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FFekQ7Ozs7WUFsb0JSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrSGI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsaTVEQUFpNUQsQ0FBQztnQkFDMzVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBRXhDOzs7O1lBL0llLFdBQVc7WUFMdkIsU0FBUztZQUxULFVBQVU7WUFpQk4sZUFBZTtZQW9QbUMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7WUExUDVCLG1CQUFtQix1QkEyUFQsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzs7OzhCQXBHekQsS0FBSzs0QkFTTCxLQUFLO3NCQVVMLFlBQVksU0FBQyxhQUFhO3lCQU8xQixZQUFZLFNBQUMsWUFBWTt1QkFPekIsWUFBWSxTQUFDLFVBQVU7cUJBUXZCLFlBQVksU0FBQyxZQUFZO2tDQU96QixTQUFTLFNBQUMscUJBQXFCOzZCQVEvQixTQUFTLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5maW5pdGVTY3JvbGxDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5maXRlLXNjcm9sbC9pbmZpdGUtc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQge0RvbVV0aWxzU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9kb20tdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogUGxlYXNlIHNlZSBkYXRhdGFibGUgZm9yIG1vcmUgZGV0YWlsIGRlc2NyaXB0aW9uLiBCdXQgdGhlIG1haW4gZ29hbCBvZiB0aGlzIHdyYXBwZXIgdG8gcmVtb3ZlXG4gKiBhbGwgdGhlIGNvbW1vbiBzdXJyb3VuZGluZyBwYXJ0cyBhcm91bmQgdGhlIGRhdGF0YWJsZSBhbmQgbWFrZSBzdXJlIERUIGNhbiBmb2N1cyBvbmx5IGFjdHVhbFxuICogaGVhZGVyIGFuZCBib2R5IHN0cnVjdHVyZVxuICpcbiAqIEl0IGlzIGV4cGVjdGVkIHRoYXQgd3JhcHBlciBhbHNvIHByb3ZpZGVzIHNvbWUgY29kZSBmb3IgdGhlIHNsaWRpbmcgdXAgcGFuZWwgY29udGFpbmluZ1xuICogYnV0dG9ucyBhbmQgb3RoZXIgYWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCBkdXJpbmcgZWRpdGluZ1xuICpcbiAqXG4gKiBUb2RvOiBFeHRyYWN0IHRoZSBleHBhbmQgbG9naWMgb3V0IGludG8gc29tZSBkaXJlY3RpdmUgb3IgY29tcG9uZW50IG9yIGp1c3QgYSBjbGFzc1xuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kdC13cmFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZHQuc3R5bGVDbGFzc1wiIFtjbGFzcy5kdC1mdWxsLXNjcmVlbi1tb2RlXT1cImlzRnVsbFNjcmVlbk1vZGVcIlxuICAgICBbc3R5bGUud2lkdGhdPVwiZHQud2lkdGhcIlxuPlxuICAgIDxkaXYgY2xhc3M9XCJkdC1sb2FkaW5nLW92ZXJsYXlcIiAqbmdJZj1cImR0LmxvYWRpbmdcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtbG9hZGluZy1jb250ZW50XCIgKm5nSWY9XCJkdC5sb2FkaW5nXCI+XG4gICAgICAgIDxpIFtjbGFzc109XCInc2FwLWljb24gdS1kdC1zcGluLWljb24gJyArIGR0LmxvYWRpbmdJY29uXCI+PC9pPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImR0LWhlYWRlclwiICpuZ0lmPVwiZHQuc2hvd1RhYmxlSGVhZGVyXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImR0LmhlYWRlcjsgdGhlbiBhcHBEZWZpbmVkSGVhZGVyIGVsc2UgZGVmYXVsdEhlYWRlclwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIERUIEJPRFkgd2l0aCB0YWJsZSBoZWFkZXJzIGFuZCB2YWx1ZXMgLS0+XG4gICAgPGRpdiBjbGFzcz1cImR0LWJvZHktd3JhcHBlci12aWV3XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgKm5nSWY9XCJkdC5oYXNGcm96ZW5Db2x1bW5zKCk7IHRoZW4gZHRCb2R5V2l0aEZyb3plbkNvbHVtbnMgZWxzZSBkdEJvZHlOb0Zyb3plbkNvbHVtbnNcIj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS08ZGl2IGNsYXNzPVwiZHQtZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJcIj4tLT5cbiAgICA8IS0tJmx0OyEmbmRhc2g7IGZvb3RlckFyZWEmbmRhc2g7Jmd0Oy0tPlxuICAgIDwhLS08bmctY29udGVudCBzZWxlY3Q9XCJhdy1kdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+LS0+XG4gICAgPCEtLTwvZGl2Pi0tPlxuPC9kaXY+XG5cbjwhLS0gdG9kbzogZG9udCBhY3RpdmF0ZSB0aGlzIGlmIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiBsaXN0IC0gLS0+XG48YXctaW5maW5pdGUtc2Nyb2xsICNpbmZpbml0ZVNjcm9sbCAqbmdJZj1cImlzRnVsbFNjcmVlbk1vZGVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzdGFuY2VdPVwiJzEwJSdcIlxuICAgICAgICAgICAgICAgICAgICBbZmV0Y2hTaXplXT1cImR0LnN0YXRlLmxpbWl0XCJcbiAgICAgICAgICAgICAgICAgICAgKG9uTG9hZCk9XCJvbkxhenlMb2FkKCRldmVudClcIj5cbjwvYXctaW5maW5pdGUtc2Nyb2xsPlxuXG5cbjxuZy10ZW1wbGF0ZSAjYXBwRGVmaW5lZEhlYWRlcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGluZztcIj48L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEhlYWRlcj5cbiAgICA8ZGl2IGNsYXNzPVwiZHQtZ2xvYmFsLWZpbHRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNhcC1pY29uIGljb24tZmlsdGVyXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImR0LWdsb2JhbC1hY3Rpb25zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkdC1hY3Rpb24tY29tYm9cIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic3VwcG9ydEZ1bGxTY3JlZW5cIiBjbGFzcz1cInNhcC1pY29uIGljb24tcmVzaXplXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVGdWxsU2NyZWVuKCRldmVudClcIj48L3NwYW4+XG5cbiAgICAgICAgICAgIDxhdy1pbnB1dC1maWVsZCAqbmdJZj1cImR0LnNob3dHbG9iYWxTZWFyY2hcIiBzdHlsZUNsYXNzPVwiZHQtdGFibGUtc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImR0LnN0YXRlLmN1cnJlbnRTZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VIb2xkZXI9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJpY29uLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2VhcmNoVGVybXMubmV4dCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2F3LWlucHV0LWZpZWxkPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcmliYS1pY29uIGljb24tbW9yZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjZHRCb2R5Tm9Gcm96ZW5Db2x1bW5zPlxuICAgIDwhLS1cbiAgICAgICAgRm9yIG5vbi1mcm96ZW4gY2FzZSB3ZSBhbHNvIG5lZWQgdG8gc2V0IFRSVUUgYXMgdGhlIHZpZXcgaXMgYWN0dWFsbHkgZnJvemVuIGFuZCBkb2VzIG5vdFxuICAgICAgICBzY3JvbGwuXG4gICAgICAgIFdlIHVzZSB0aGlzIGZyb3plbkNvbHVtbnMgZmxhZyBpbnNpZGUgRFQgdG8gcHJvcGVybHkgc2V0IGNvbHVtbiBpbmRleCBvbiB0aGUgaGVhZGVyIGxldmVsXG4gICAgICAgIGNvbHVtbkluZGV4Oihmcm96ZW4gPyBjb2x1bW5JbmRleDogKGNvbHVtbnMubGVuZ3RoICsgY29sdW1uSW5kZXgpKVxuXG4gICAgICAgIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIHNldCB0cnVlIGV2ZW4gaW4gdGhpcyBjYXNlIHRvIHJldHVybiByZWFsIGNvbHVtbkluZGV4IHNpbmNlIHdlIGRvbnRcbiAgICAgICAgaGF2ZSB0aGUgc2Vjb25kIHRhYmxlLlxuICAgIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdEJvZHk7IGNvbnRleHQ6eyRpbXBsaWNpdDogZHQuY29sdW1ucywgZnJvemVuQ29sdW1uczogdHJ1ZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2R0Qm9keVdpdGhGcm96ZW5Db2x1bW5zPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdEJvZHk7IGNvbnRleHQ6eyRpbXBsaWNpdDogZHQuZnJvemVuQ29sdW1ucywgZnJvemVuQ29sdW1uczogdHJ1ZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImR0Qm9keTsgY29udGV4dDp7JGltcGxpY2l0OiBkdC5jb2x1bW5zLCBmcm96ZW5Db2x1bW5zOiBmYWxzZSB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjZHRCb2R5IGxldC1jb2x1bW5zIGxldC1mcm96ZW5Db2x1bW5zPVwiZnJvemVuQ29sdW1uc1wiPlxuXG4gICAgPGRpdiAjZHRDb250YWluZXIgY2xhc3M9XCJkdC1ib2R5LXdyYXBwZXJcIlxuICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cInRoaXMuY2FsY3VsYXRlRnJvemVuV2lkdGgoKVwiXG4gICAgICAgICBbY2xhc3MuZHQtYm9keS11bmZyb3plbl09XCJkdC5oYXNGcm96ZW5Db2x1bW5zKCkgJiYgIWZyb3plbkNvbHVtbnNcIlxuICAgICAgICAgW2NsYXNzLmR0LWJvZHktZnJvemVuXT1cImR0Lmhhc0Zyb3plbkNvbHVtbnMoKSAmJiBmcm96ZW5Db2x1bW5zXCJcbiAgICA+XG5cbiAgICAgICAgPHRhYmxlIFtuZ0NsYXNzXT1cImR0LnRhYmxlU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiZnJvemVuQ29sdW1ucyA/IG51bGwgOiBkdC5zY3JvbGxXaWR0aFwiXG4gICAgICAgICAgICAgICBbY2xhc3MuZHQtcGl2b3QtbGF5b3V0XT1cImR0LnBpdm90YWxMYXlvdXRcIlxuICAgICAgICAgICAgICAgW2NsYXNzLmR0LXBsYWluLWxheW91dF09XCIhZHQucGl2b3RhbExheW91dCAmJiAhZHQuaXNPdXRsaW5lKClcIj5cblxuICAgICAgICAgICAgPCEtLSBSZW5kZXIgVEggaGVhZGVyIHJvd3MtLT5cbiAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cImR0LXRoZWFkXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclJvd3M7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sdW1ucyxmcm96ZW5Db2x1bW5zOmZyb3plbkNvbHVtbnMgfVwiPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC90aGVhZD5cblxuICAgICAgICAgICAgPCEtLVxuICAgICAgICAgICAgICAgIFJlbmRlciBkYXRhIHJvd3MuIEZvciBkYXRhIHJvd3Mgd2UgbmVlZCB0byBrZWVwIHRib2R5IHRhZyBpbnNpZGUgRFQgdGFibGVcbiAgICAgICAgICAgICAgICBkdWUgdG8gT3V0bGluZVxuICAgICAgICAgICAgIC0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlSb3dzOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHVtbnMsICBmcm96ZW5Db2x1bW5zOmZyb3plbkNvbHVtbnMgfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxkaXYgI2R0RnVsbFNjcmVlbk92ZXJsYXkgY2xhc3M9XCJkdC1mdWxsLXNjcmVlbi1vdmVybGF5IHUtZnVsbC1zY3JlZW4tZWxlbWVudFwiPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLmR0LWZvb3RlciwuZHQtaGVhZGVye3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6LjVlbSAuNzVlbTtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmR0LWZvb3Rlcntib3JkZXItdG9wOjB9LmR0LXRoZWFkIHRye2JvcmRlci13aWR0aDowfS5kdC1ib2R5LXdyYXBwZXItdmlld3twb3NpdGlvbjpyZWxhdGl2ZX0uZHQtYm9keS13cmFwcGVye292ZXJmbG93OmhpZGRlbjtib3JkZXI6MXB4IHNvbGlkICNkN2Q3ZDd9LmR0LWJvZHktd3JhcHBlci5kdC1ib2R5LXVuZnJvemVue2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO292ZXJmbG93LXg6YXV0b30uZHQtbG9hZGluZy1vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzliOWI5Yjt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO29wYWNpdHk6LjE7ei1pbmRleDoxfS5kdC1sb2FkaW5nLWNvbnRlbnR7cG9zaXRpb246YWJzb2x1dGU7bGVmdDo1MCU7dG9wOjI1JTt6LWluZGV4OjJ9LmR0LWhlYWRlcnt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IG5vd3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb2xvcjojMzYzNjM2O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNmMWYxZjE7bWFyZ2luLWJvdHRvbTozMHB4fS5kdC1oZWFkZXIgLmR0LWdsb2JhbC1maWx0ZXJ7ZmxleDowIDA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtmb250LXNpemU6MThweH0uZHQtaGVhZGVyIC5kdC1nbG9iYWwtYWN0aW9uc3tmbGV4OjAgMDthbGlnbi1pdGVtczpmbGV4LWVuZH0uZHQtaGVhZGVyIC5kdC1hY3Rpb24tY29tYm97ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm93cmFwO2NvbG9yOiM3ZDdkN2R9LmR0LWhlYWRlciAuZHQtYWN0aW9uLWNvbWJvIC5hcmliYS1pY29uLC5kdC1oZWFkZXIgLmR0LWFjdGlvbi1jb21ibyAuc2FwLWljb257bWFyZ2luLWxlZnQ6MTVweDtmb250LXNpemU6MjBweDthbGlnbi1zZWxmOmNlbnRlcjtjdXJzb3I6cG9pbnRlcn0uZHQtaGVhZGVyIC5kdC1hY3Rpb24tY29tYm8gLmR0LXRhYmxlLXNlYXJjaHtib3JkZXItdG9wLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH0uZHQtaGVhZGVyIC5kdC1hY3Rpb24tY29tYm8gLmljb24tcmVzaXple2NvbG9yOiM0YTRhNGE7Zm9udC1zaXplOjE2cHg7bGluZS1oZWlnaHQ6MThweDttYXJnaW4tcmlnaHQ6MTVweH0udS1kdC1zcGluLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGRvU3BpbjthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGRvU3Bpbn1ALXdlYmtpdC1rZXlmcmFtZXMgZG9TcGluezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1Aa2V5ZnJhbWVzIGRvU3BpbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19LmR0LWZ1bGwtc2NyZWVuLW92ZXJsYXl7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDA7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCU7dHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlO3RyYW5zaXRpb246YWxsIC40cyBlYXNlLWluLW91dH0uZHQtZnVsbC1zY3JlZW57d2lkdGg6OTh2dzt6LWluZGV4OjEyMDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTVweDtwb2ludGVyLWV2ZW50czphbGw7dHJhbnNpdGlvbjpvcGFjaXR5IC41cyBlYXNlLWluLW91dH0udS1mcy1lbGVtZW50LW91dHtkaXNwbGF5Om5vbmV9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuXG59KVxuZXhwb3J0IGNsYXNzIERUV3JhcHBlciBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkXG57XG5cbiAgICAvKipcbiAgICAgKiBDb2xvciB0aGF0IGlzIHVzZWQgYnkgZnVsbCBzY3JlZW4gZGl2IG92ZXJsYXkgdG8gY3JlYXRlIGV4cGFuZGluZyBlZmZlY3Qgd2hpY2ggbmVlZHMgdG8gaGF2ZVxuICAgICAqIGxpdHRsZSB0ZW50O1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRDb2xvckZyb206IHN0cmluZyA9ICcjZjNmM2YzJztcblxuXG4gICAgLyoqXG4gICAgICogQ29sb3IgdGhhdCBpcyB1c2VkIHRvIHNldCBhZnRlciB3ZSBhcmUgaW4gdGhlIGZ1bGwgc2NyZWVuIHNvIG91ciBvdmVybGF5IGRpdiBoaWRlIGV2ZXJ5dGhpbmdcbiAgICAgKiBvbiB0aGUgcGFnZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRDb2xvclRvOiBzdHJpbmcgPSAnI0ZGRkZGRic7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGFibGUgaGVhZGluZyBhcmVhIG9mZmVycyBkZXZlbG9wZXIgdG8gY29tcGxldGVseSBvdmVycmlkZSB0aGUgdG9wIGJhciB3aGVyZSB3ZSBoYXZlIGZpbHRlcnNcbiAgICAgKiBhbmQgb3RoZXJzIGFjdGlvbnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkaW5nQXJlYScpXG4gICAgaGVhZGluZzogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyB0YWJsZSBoZWFkZXJzIGFuZCB3cmFwcyB0aGVtIHdpdGhpbiB0aGVhZCB0YWdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXJSb3dzJylcbiAgICBoZWFkZXJSb3dzOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRhYmxlIGJvZHlcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdib2R5Um93cycpXG4gICAgYm9keVJvd3M6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGhlYWRpbmcgdGVtcGxhdGUuIFdlIG5lZWQgdG8gcmVtb3ZlIHRoaXMgZGVwZW5kZW5jeSBvbiBwcmltZU5HIHNvIGZhciBpdCBpcyB1c2luZ1xuICAgICAqIHAtZm9vdGVyXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZm9vdGVyQXJlYScpXG4gICAgZm9vdGVyOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBEaXYgdXNlZCB0byBtYWtlIHRoZSBmdWxsIHNjcmVlbiBleHBhbnNpb24gZWZmZWN0XG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnZHRGdWxsU2NyZWVuT3ZlcmxheScpXG4gICAgZHRGdWxsU2NyZWVuT3ZlcmxheTogRWxlbWVudFJlZjtcblxuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGluZml0ZSBzY3JvbGwuIFdlIGFyZSB1c2luZyB0aGlzIHRvIHRyaWdnZXIgbG9hZGluZyBmaW5pc2ggZXZlbnQgc28gd2UgY2FuXG4gICAgICogaGlkZSBsb2FkaW5nIGFuaW1hdGlvblxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ2luZmluaXRlU2Nyb2xsJylcbiAgICBpbmZpbml0ZVNjcm9sbDogSW5maW5pdGVTY3JvbGxDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIEluIG9yZGVyIHRvIGRlYm91bmNlIHRoZSB0eXBpbmcgd2UgbmVlZCB0byB1c2Ugc3ViamVjdFxuICAgICAqXG4gICAgICovXG4gICAgc2VhcmNoVGVybXMgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblxuICAgIC8qKlxuICAgICAqICBTcGVjaWZpZXMgaWYgd2UgYXJlIGluIHZpZXdpbmcvZWRpdGluZyBtb2RlIHRoYXQgY2FuIGJyb3dzZSB3aG9sZSBkYXRhc2V0IGxhemlseVxuICAgICAqXG4gICAgICovXG4gICAgaXNGdWxsU2NyZWVuTW9kZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgd2UgY2FuIHN1cHBvcnQgZnVsbCBzY3JlZW4gbW9kZSAtIG9ubHkgYXZhaWxhYmxlIGZvciB0aGUgYnJvd3NlclxuICAgICAqXG4gICAgICovXG4gICAgc3VwcG9ydEZ1bGxTY3JlZW46IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiAgU2F2ZXMgb3JpZ2luYWwgYm91bmRpbmcgcmVjdCBjb29yZGluYXRlcyBiZWZvcmUgd2UgZXhwYW5kIHRoZSBEVCB0byBmdWxsIHNjcmVlblxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkdEJvdW5kaW5nQ2xpZW50UmVjdDogYW55O1xuXG4gICAgLyoqXG4gICAgICogUmVtZW1iZXJzIG9yaWdpbmFsIHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgd2Ugc3dpdGNoIHRvIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIG9yaWdpbmFsU2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHF1ZXJ5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgbG9hZGluZ1N1YjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgdGhpc0VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tVXRpbHM6IERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEYXRhdGFibGUyQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICAgcHVibGljIGR0OiBEYXRhdGFibGUyQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMucXVlcnlTdWJzY3JpcHRpb24gPSB0aGlzLnNlYXJjaFRlcm1zLnBpcGUoXG4gICAgICAgICAgICAvLyB3YWl0IDMwMG1zIGFmdGVyIGVhY2gga2V5c3Ryb2tlIGJlZm9yZSBjb25zaWRlcmluZyB0aGUgdGVybVxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG5cbiAgICAgICAgICAgIC8vIGlnbm9yZSBuZXcgdGVybSBpZiBzYW1lIGFzIHByZXZpb3VzIHRlcm1cbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG5cbiAgICAgICAgICAgIHN3aXRjaE1hcCgodGVybTogc3RyaW5nKSA9PiBvZih0ZXJtKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKHRlcm06IGFueSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRlcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmluZCh0ZXJtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nU3ViID0gdGhpcy5kdC52YWx1ZUNoYW5nZVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB0aGlzLmxvYWRpbmdGaW5pc2hlZCgpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgYWxsIGNvbHVtbnMgbWFya2VkIGFzIGZyb3plbiBhbmQgcmV0cmlldmUgYSB3aWR0aCBzbyB3ZSBjYW4gdXBkYXRlXG4gICAgICogcGFyZW50IGRpdlxuICAgICAqXG4gICAgICovXG4gICAgY2FsY3VsYXRlRnJvemVuV2lkdGggKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmR0Lmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZldpZHRoID0gMDtcbiAgICAgICAgdGhpcy5kdC5mcm96ZW5Db2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoY29sLm1heFdpZHRoUHggPiAwKSB7XG4gICAgICAgICAgICAgICAgZldpZHRoICs9IGNvbC53aWRlc3RDZWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmV2lkdGggKz0gcGFyc2VJbnQoY29sLndpZHRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZXaWR0aDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaGF2aW5nIHR3byBzZXBhcmF0ZSB0YWJsZXMgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhhdCByb3dzIG9mIHRoZSB0YWJsZXMgYXJlIGFsaWduZWQuXG4gICAgICpcbiAgICAgKiBUaGVyZWZvcmUgdGhpcyBtZXRob2QgdGFrZXMgZmlyc3QgY29sdW1uIGZyb20gZWFjaCB0YWJsZSByZWFkIHRoZSBoZWlnaHQgb2YgdGhlIHJvd3MgYW5kIHNldFxuICAgICAqIHRoZSBtYXggaGVpZ2h0IHRvIGJvdGggcm93cy5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgYWxpZ25UYWJsZXNIZWlnaHRzIChmcm96ZW5WaWV3OiBhbnksIHVuRnJvemVuVmlldzogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChmcm96ZW5WaWV3KSAmJiBpc1ByZXNlbnQoZnJvemVuVmlldyksXG4gICAgICAgICAgICAnQ2FudCBhbGlnbiB0YWJsZSB2aWV3cyBhcyBvbmUgb2YgdGhlIHZpZXcgaXMgdW5kZWZpbmVkJyk7XG5cbiAgICAgICAgbGV0IGZyb3plblJvd3M6IGFueVtdID0gZnJvemVuVmlldy5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZSB0cicpO1xuICAgICAgICBsZXQgdW5Gcm96ZW5Sb3dzOiBhbnlbXSA9IHVuRnJvemVuVmlldy5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZSB0cicpO1xuXG4gICAgICAgIGFzc2VydChmcm96ZW5Sb3dzLmxlbmd0aCA9PT0gdW5Gcm96ZW5Sb3dzLmxlbmd0aCxcbiAgICAgICAgICAgICdGcm96ZW4gQ29sdW1uOiBUd28gdGFibGVzIGRvZXMgbm90IG11Y2ghJyk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShmcm96ZW5Sb3dzKS5mb3JFYWNoKChmcm96ZW46IGFueSwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGggPSBNYXRoLm1heChmcm96ZW4ub2Zmc2V0SGVpZ2h0LCB1bkZyb3plblJvd3NbaW5kZXhdLm9mZnNldEhlaWdodCk7XG4gICAgICAgICAgICBmcm96ZW4uc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICB1bkZyb3plblJvd3NbaW5kZXhdLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdEZ1bGxTY3JlZW4oKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICBsZXQgZnJvemVuVmlldyA9IHRoaXMudGhpc0VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtYm9keS1mcm96ZW4nKTtcbiAgICAgICAgICAgIGxldCB1bkZyb3plblZpZXcgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR0LWJvZHktdW5mcm96ZW4nKTtcblxuICAgICAgICAgICAgbGV0IGZyb3plbldpZHRoID0gdGhpcy5jYWxjdWxhdGVGcm96ZW5XaWR0aCgpO1xuICAgICAgICAgICAgZnJvemVuVmlldy5zdHlsZS53aWR0aCA9IGZyb3plbldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodW5Gcm96ZW5WaWV3KSkge1xuICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgYm9yZGVyIGFuZCBjcmVhdGUgaW5kZW50IGVmZmVjdCBieSBoYXZpbmcgMXB4IHdoaXRlIHNwYWNlXG4gICAgICAgICAgICAgICAgdW5Gcm96ZW5WaWV3LnN0eWxlLmxlZnQgPSAoZnJvemVuV2lkdGggKyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgdW5Gcm96ZW5WaWV3LnN0eWxlLndpZHRoID0gdW5Gcm96ZW5WaWV3LnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgICAgICAgICAgICAgICAgLSBmcm96ZW5WaWV3Lm9mZnNldFdpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25UYWJsZXNIZWlnaHRzKGZyb3plblZpZXcsIHVuRnJvemVuVmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnlTdWJzY3JpcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubG9hZGluZ1N1YikpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGVUxMIFNDUkVFTiBNT0RFIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBmdWxsc2NyZWVuIGZ1bmN0aW9uYWxpdHkgaXMgZW5hYmxlZCB0aGlzIG1ldGhvZCBzd2l0Y2hlcyBiZXR3ZWVuIG5vcm1sIGFuZCBmdWxsIHNjcmVlblxuICAgICAqIG1vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxTY3JlZW4gKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW5Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRnVsbFNjcmVlbihldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsU2NyZWVuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvIHB1c2ggdGhpcyBjb21wb25lbnQgdG8gZnVsbCBzY3JlZW4gbW9kZSBvciBtYXliZSBmdWxsIHBhZ2UgbW9kZSB3ZSBuZWVkIHJ1biBmb2xsb3dpbmc6XG4gICAgICpcbiAgICAgKiAgLSBFeGVjdXRlIGV4cGFuZCB0cmFuc2Zvcm1hdGlvbiwgd2hlcmUgd2UgaGF2ZSBhZGRpdGlvbmFsIG92ZXJsYXkgZGl2IHRoYXQgd2Ugc2xvd2x5IGV4cGFuZFxuICAgICAqICBhbmQgdGhpcyBjcmVhdGVzIGltcHJlc3Npb24gdGhlIERUIGlzIGV4cGFuZGluZ1xuICAgICAqXG4gICAgICogIC0gYXBwbHkgZnVsbC1zY3JlZW4gY2xhc3Mgb24gdG9wIGhvc3QgZWxlbWVudCAgLSBpbiB0aGlzIGNhc2UgaXRzIERhdGFUYWJsZSB0byBzd2l0Y2hcbiAgICAgKiAgdG8gYWJzb2x1dGUgcG9zaXRpb25pbmdcbiAgICAgKlxuICAgICAqICAtIG1ha2Ugc3VyZSB3ZSBhcmUgc2Nyb2xsZWQgYWxsIHRoZSB3YXkgdXBcbiAgICAgKlxuICAgICAqICAtIGhpZGUgYWxsIHRoZSBlbGVtZW50cyBvbiB0aGUgcGFnZSBzbyB0aGVpciBkaW1lbnNpb24gZG9uJ3QgaW50ZXJmZXJlIHdpdGggdGhpcyB0YWJsZS5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb3BlbkZ1bGxTY3JlZW4gKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbk1vZGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucnVuRXhwYW5kRWZmZWN0KCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKTtcbiAgICAgICAgdGhpcy50b2dnbGVGdWxsU2NyZWVuT25EVCh0cnVlKTtcblxuXG4gICAgICAgIC8vIG1hcmsgbXkgZWxlbWVudCBpbiB0aGUgcGF0aCB0aGF0IG5lZWRzIHRvIHN0YXlcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLnRoaXNFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChwYXJlbnROb2RlKSAmJiBwYXJlbnROb2RlLnRhZ05hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd1LWZ1bGwtc2NyZWVuLWVsZW1lbnQnKTtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlTm9uRnVsbFNjcmVlbkVsZW1lbnQoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgdGhpcy5kdC5zdGF0ZS5saW1pdCA9IE1hdGgucm91bmQodGhpcy5jYWxjdWxhdGVMaW1pdCgpKTtcbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLmZldGNoKHRoaXMuZHQuc3RhdGUpO1xuXG4gICAgICAgIC8vIG9uY2UgbG9hZGVkIHNldCBiYWNrIGNvcnJlY3QgcGFnZSBzaXplIHdlIHVzZSB3aGVuIGxvYWRpbmcgZGF0YVxuICAgICAgICB0aGlzLmR0LnN0YXRlLmxpbWl0ID0gdGhpcy5kdC5wYWdlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoZSBzYW1lIGxpa2UgYWJvdmUgbWV0aG9kIChvcGVuRnVsbFNjcmVlbikgYnV0IGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBjbG9zZUZ1bGxTY3JlZW4gKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbk1vZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNob3dOb25GdWxsU2NyZWVuRWxlbWVudCgpO1xuICAgICAgICB0aGlzLnJ1bkNvbGxhcHNlRWZmZWN0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRnVsbFNjcmVlbk9uRFQoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5saW1pdCA9IHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5kaXNwbGF5TGltaXQ7XG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5vZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmV0Y2godGhpcy5kdC5kYXRhU291cmNlLnN0YXRlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgdGhpcy5vcmlnaW5hbFNjcm9sbFBvc2l0aW9uKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5pbWF0aW9uIGVmZmVjdCB0byBtYWtlIGl0IGZlZWwgbGlrZSB0aGUgZWxlbWVudCAoaW4gdGhpcyBjYXNlIERUKSBpcyBleHBhbmRpbmdcbiAgICAgKiBmcm9tIHRoZSBtaWRkbGUgdG8gdGhlIGZ1bGwgcGFnZSBtb2RlLlxuICAgICAqXG4gICAgICogV2UgdGFrZSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0YWJsZSB0aGVuIGl0IGlzIHNjYWxlZCBzbG93bHkgdG8gdGhlIGZ1bGwgcGFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgcnVuRXhwYW5kRWZmZWN0ICgpXG4gICAge1xuICAgICAgICB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmR0RnVsbFNjcmVlbk92ZXJsYXkubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmV4cGFuZENvbG9yRnJvbTtcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm1hdGlvbih0cnVlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuZXhwYW5kQ29sb3JUbztcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCBzY2FsZSB0aGUgaGVscGVyIGRpdiAob3ZlcmxheSkgZG93biB0byBtYWtlIGl0IGxvb2sgbGlrZVxuICAgICAqIGl0IGNvbGxhcHNlc1xuICAgICAqL1xuICAgIHByaXZhdGUgcnVuQ29sbGFwc2VFZmZlY3QgKClcbiAgICB7XG4gICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtYXRpb24oZmFsc2UpO1xuXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQodGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LCB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcCwgMCxcbiAgICAgICAgICAgICAgICAwKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERlMgIC0gdG8gZ28gdGhydSBhbGwgdGhlIGVsZW1lbnQgdW5kZXIgQk9EWSBhbmQgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgcGFnZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlkZU5vbkZ1bGxTY3JlZW5FbGVtZW50IChwYXJlbnRFbGVtZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy50aGlzRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUgPT09IHBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMubmVlZFRyYXZlcnNlRG93bihlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5vbkZ1bGxTY3JlZW5FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHQtZnVsbC1zY3JlZW4nKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndS1mcy1lbGVtZW50LW91dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHV0IGFsbCB0aGUgZWxlbWVudCB0aGF0IHdlcmUgcHJldmlvdXNseSByZW1vdmVkIGJ5IGhpZGVOb25GdWxsU2NyZWVuRWxlbWVudCgpIGJhY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dOb25GdWxsU2NyZWVuRWxlbWVudCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudS1mcy1lbGVtZW50LW91dCcpKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW06IGFueSkgPT4gZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd1LWZzLWVsZW1lbnQtb3V0JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBJbnRlcm5hbFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBuZWVkVHJhdmVyc2VEb3duIChlbGVtZW50OiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGVsZW1lbnQpICYmIGVsZW1lbnQudGFnTmFtZSAhPT0gJ1NDUklQVCcgJiZcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1LWZ1bGwtc2NyZWVuLWVsZW1lbnQnKSAmJlxuICAgICAgICAgICAgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkdC1mdWxsLXNjcmVlbicpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGVudGVyIGZ1bGwgc2NyZWVuIC9wYWdlIG1vZGUgd2hlbiBuZWVkIHRvIGNhbGN1bGF0ZSBob3cgbWFueSByb3dzIHRvIGxvYWQgaW5pdGlhbGx5XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUxpbWl0ICgpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBicm93c2VySCA9IHRoaXMuZG9tVXRpbHMuYnJvd3NlckRpbWVudGlvbnMoKS5oZWlnaHQ7XG4gICAgICAgIGxldCByb3dIID0gdGhpcy5kdC5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5IHRyOmZpcnN0LWNoaWxkJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHJvd0gpICYmIHJvd0ggPiAwKSA/IChicm93c2VySCAvIHJvd0gpICsgMjAgOiA1MDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBJbnRlcm5hbFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVFbGVtZW50IChsOiBudW1iZXIgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0OiBudW1iZXIgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHc6IG51bWJlciA9IHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoOiBudW1iZXIgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBsICsgJ3B4JztcbiAgICAgICAgdGhpcy5kdEZ1bGxTY3JlZW5PdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdCArICdweCc7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBJbnRlcm5hbFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBhcHBseVRyYW5zZm9ybWF0aW9uIChleHBhbmQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgeCwgeSwgdHgsIHR5O1xuICAgICAgICBpZiAoZXhwYW5kKSB7XG4gICAgICAgICAgICB4ID0gd2luZG93LmlubmVyV2lkdGggLyB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LndpZHRoO1xuICAgICAgICAgICAgeSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgdHggPSAod2luZG93LmlubmVyV2lkdGggLyAyIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCAvIDJcbiAgICAgICAgICAgICAgICAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCkgLyB4O1xuICAgICAgICAgICAgdHkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMiAtIHRoaXMuZHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgIC0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC50b3ApIC8geTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IDE7XG4gICAgICAgICAgICB5ID0gMTtcbiAgICAgICAgICAgIHR4ID0gdGhpcy5kdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgICAgICAgdHkgPSB0aGlzLmR0Qm91bmRpbmdDbGllbnRSZWN0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAnc2NhbGVYKCcgKyB4ICsgJykgc2NhbGVZKCcgKyB5ICsgJykgdHJhbnNsYXRlM2QoJyArICh0eCkgKyAncHgsICcgKyAodHkpICsgJ3B4LCAwcHgpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRGdWxsU2NyZWVuICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydEZ1bGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuZHRGdWxsU2NyZWVuT3ZlcmxheS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHNldCBvZiBzZXQgb2YgY3NzIHByb3BlcnRpZXMgdG8gbWFrZSB0aGUgRFQgbWFpbiBjb21wb25lbnQgb24gdGhlIHBhZ2UgZXhwYW5kIHRvXG4gICAgICogZnVsbCBwYWdlIG1vZGUgYW5kIGJhY2tcbiAgICAgKlxuICAgICAqIFdlIHdhbnQgdG8gbWFrZSBpdCB3aXRoIGxpdHRsZSBkZWxheSB0byBsZXQgb3RoZXIgYW5pbWF0aW9uIGZpbmlzaFxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxTY3JlZW5PbkRUIChmdWxsU2NyZWVuOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kdC5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChmdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5jbGFzc0xpc3QgKz0gJ2R0LWZ1bGwtc2NyZWVuJztcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5jbGFzc0xpc3QgPSB0aGlzLmR0LmNsYXNzTGlzdC5yZXBsYWNlKCdkdC1mdWxsLXNjcmVlbicsXG4gICAgICAgICAgICAgICAgICAgICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElORklOSVRFIFNDUk9MTElORyBNRVRIT0RTXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGluZmluaXRlIHNjcm9sbCBldmVudCBhbmQgcmVxdWVzdCBuZXcgZGF0YSBmcm9tIGRhdGEgc291cmNlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkxhenlMb2FkIChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzTG9hZCkge1xuICAgICAgICAgICAgdGhpcy5kdC5zdGF0ZS5vZmZzZXQgPSBldmVudC5vZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2UuZmV0Y2godGhpcy5kdC5zdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YVByb3ZpZGVyID0gdGhpcy5kdC5kYXRhU291cmNlLmRhdGFQcm92aWRlcjtcbiAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChkYXRhLnNsaWNlKDAsIGV2ZW50Lm9mZnNldCkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGxvYWRpbmcgaXMgZmluaXNoZWQgbWFyayBsb2FkaW5nIGljb24gaXMgZG9uZSBzbyB3ZSBjYW4gaGlkZSBpdC4gSSBhbSB1c2luZyBsaXR0bGVcbiAgICAgKiBkZWxheSB0byBtYWtlIHRoZSBhbmltYXRpb24gdmlzaWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZGluZ0ZpbmlzaGVkICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaW5maW5pdGVTY3JvbGwpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5maW5pdGVTY3JvbGwuY29tcGxldGUoKSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgfVxufVxuIl19