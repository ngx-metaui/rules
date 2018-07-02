/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {assert, Environment, isPresent} from '@aribaui/core';
import {Datatable2Component} from '../datatable2.component';
import {BaseComponent} from '../../../core/base.component';
import {Subject, Observable, Subscription, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {InfiniteScrollComponent} from '../../../core/infite-scroll/infite-scroll.component';
import {DomUtilsService} from '../../../core/dom-utils.service';
import {DTColumn2Component} from '../column/dt-column.component';


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
@Component({
    selector: 'aw-dt-wrapper',
    templateUrl: 'table-wrapper.component.html',
    styleUrls: ['table-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DTWrapper extends BaseComponent implements AfterViewInit, AfterViewChecked
{

    /**
     * Color that is used by full screen div overlay to create expanding effect which needs to have
     * little tent;
     *
     */
    @Input()
    expandColorFrom: string = '#f3f3f3';


    /**
     * Color that is used to set after we are in the full screen so our overlay div hide everything
     * on the page
     *
     */
    @Input()
    expandColorTo: string = '#FFFFFF';


    /**
     *
     * Table heading area offers developer to completely override the top bar where we have filters
     * and others actions.
     *
     */
    @ContentChild('headingArea')
    heading: TemplateRef<any>;


    /**
     * Renders table headers and wraps them within thead tag
     */
    @ContentChild('headerRows')
    headerRows: TemplateRef<any>;


    /**
     * Renders table body
     */
    @ContentChild('bodyRows')
    bodyRows: TemplateRef<any>;


    /**
     * The same as heading template. We need to remove this dependency on primeNG so far it is using
     * p-footer
     */
    @ContentChild('footerArea')
    footer: TemplateRef<any>;


    /**
     * Div used to make the full screen expansion effect
     */
    @ViewChild('dtFullScreenOverlay')
    dtFullScreenOverlay: ElementRef;


    /**
     * Reference to infite scroll. We are using this to trigger loading finish event so we can
     * hide loading animation
     */
    @ViewChild('infiniteScroll')
    infiniteScroll: InfiniteScrollComponent;


    /**
     * In order to debounce the typing we need to use subject
     *
     */
    private searchTerms = new Subject<string>();


    /**
     *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
     *
     */
    isFullScreenMode = false;

    /**
     * Tells if we can support full screen mode - only available for the browser
     *
     */
    supportFullScreen: boolean = true;


    /**
     *  Saves original bounding rect coordinates before we expand the DT to full screen
     *
     */
    private dtBoundingClientRect: any;

    /**
     * Remembers original scroll position before we switch to full screen mode
     */
    private originalScrollPosition: number;

    querySubscription: Subscription;
    loadingSub: Subscription;


    constructor (public env: Environment,
                 private render: Renderer2,
                 private thisElement: ElementRef,
                 private domUtils: DomUtilsService,
                 @Inject(PLATFORM_ID) private platformId: Object,
                 @Inject(forwardRef(() => Datatable2Component))
                 public dt: Datatable2Component)
    {
        super(env);
    }


    ngOnInit (): void
    {
        super.ngOnInit();

        this.querySubscription = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            switchMap((term: string) => of(term))
        ).subscribe((term: any) =>
        {
            if (term) {
                this.dt.dataSource.find(term);
            }
        });

        this.loadingSub = this.dt.valueChange
            .subscribe((data: any) => this.loadingFinished());
    }


    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     */
    calculateFrozenWidth (): number
    {
        if (!this.dt.hasFrozenColumns()) {
            return null;
        }

        let fWidth = 0;
        this.dt.frozenColumns.forEach((col: DTColumn2Component) =>
        {
            if (col.maxWidthPx > 0) {
                fWidth += col.widestCell;
            } else {
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
     */
    alignTablesHeights (frozenView: any, unFrozenView: any): void
    {
        assert(isPresent(frozenView) && isPresent(frozenView),
            'Cant align table views as one of the view is undefined');

        let frozenRows: any[] = frozenView.querySelectorAll('table tr');
        let unFrozenRows: any[] = unFrozenView.querySelectorAll('table tr');

        assert(frozenRows.length === unFrozenRows.length,
            'Frozen Column: Two tables does not much!');

        Array.from(frozenRows).forEach((frozen: any, index: number) =>
        {
            let h = Math.max(frozen.offsetHeight, unFrozenRows[index].offsetHeight);
            frozen.style.height = h + 'px';
            unFrozenRows[index].style.height = h + 'px';
        });
    }

    ngAfterViewInit (): void
    {
        this.initFullScreen();
    }


    ngAfterViewChecked (): void
    {
        if (this.dt.hasFrozenColumns()) {
            let frozenView = this.thisElement.nativeElement.querySelector('.dt-body-frozen');
            let unFrozenView = this.thisElement.nativeElement.querySelector('.dt-body-unfrozen');

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

    ngOnDestroy (): void
    {
        super.ngOnDestroy();

        if (isPresent(this.querySubscription)) {
            this.querySubscription.unsubscribe();
        }

        if (isPresent(this.loadingSub)) {
            this.loadingSub.unsubscribe();
        }
    }


    /**
     * FULL SCREEN MODE methods
     */

    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     */
    toggleFullScreen (event: any): void
    {
        if (this.isFullScreenMode) {
            this.closeFullScreen(event);
        } else {
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
     */
    openFullScreen (event: any): void
    {
        this.isFullScreenMode = true;

        this.runExpandEffect();
        this.originalScrollPosition = window.pageYOffset;
        window.scroll(0, 0);
        this.toggleFullScreenOnDT(true);


        // mark my element in the path that needs to stay
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
     */
    closeFullScreen (event: any): void
    {
        this.isFullScreenMode = false;

        this.showNonFullScreenElement();
        this.runCollapseEffect();
        this.toggleFullScreenOnDT(false);

        this.dt.dataSource.state.limit = this.dt.dataSource.state.displayLimit;
        this.dt.dataSource.state.offset = 0;
        this.dt.dataSource.fetch(this.dt.dataSource.state);

        setTimeout(() =>
        {
            window.scroll(0, this.originalScrollPosition);
        }, 300);
    }


    /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     */
    private runExpandEffect ()
    {
        this.dtBoundingClientRect = this.thisElement.nativeElement.getBoundingClientRect();

        this.updateElement();
        this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorFrom;
        this.dtFullScreenOverlay.nativeElement.style.opacity = 1;
        this.applyTransformation(true);

        setTimeout(() =>
        {
            this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorTo;
        }, 300);
    }


    /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     */
    private runCollapseEffect ()
    {
        this.updateElement();
        this.applyTransformation(false);


        setTimeout(() =>
        {
            this.updateElement();
            this.dtFullScreenOverlay.nativeElement.style.opacity = 0;

        }, 200);

        setTimeout(() =>
        {
            this.updateElement(this.dtBoundingClientRect.left, this.dtBoundingClientRect.top, 0,
                0);
        }, 400);
    }

    /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     */
    private hideNonFullScreenElement (parentElement: any): void
    {
        if (this.thisElement.nativeElement.parentNode === parentElement) {
            return;
        }

        for (let i = 0; i < parentElement.children.length; i++) {
            let element = parentElement.children[i];
            if (this.needTraverseDown(element)) {
                this.hideNonFullScreenElement(element);

            } else if (!element.classList.contains('dt-full-screen')) {
                element.classList.add('u-fs-element-out');
            }
        }
    }

    /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     */
    private showNonFullScreenElement (): void
    {
        Array.from(document.querySelectorAll('.u-fs-element-out'))
            .forEach((elem: any) => elem.classList.remove('u-fs-element-out'));
    }

    /**
     * @private
     *
     */
    private needTraverseDown (element: any): boolean
    {
        return isPresent(element) && element.tagName !== 'SCRIPT' &&
            element.classList.contains('u-full-screen-element') &&
            !element.classList.contains('dt-full-screen');

    }


    /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     */
    private calculateLimit (): number
    {
        let browserH = this.domUtils.browserDimentions().height;
        let rowH = this.dt.el.nativeElement.querySelector('tbody tr:first-child').offsetHeight;

        return (isPresent(rowH) && rowH > 0) ? (browserH / rowH) + 20 : 50;
    }


    /**
     * @private
     *
     */
    private updateElement (l: number = this.dtBoundingClientRect.left,
                           t: number = this.dtBoundingClientRect.top,
                           w: number = this.dtBoundingClientRect.width,
                           h: number = this.dtBoundingClientRect.height): void
    {
        this.dtFullScreenOverlay.nativeElement.style.left = l + 'px';
        this.dtFullScreenOverlay.nativeElement.style.top = t + 'px';
        this.dtFullScreenOverlay.nativeElement.style.width = w + 'px';
        this.dtFullScreenOverlay.nativeElement.style.height = h + 'px';
    }

    /**
     * @private
     *
     */
    private applyTransformation (expand: boolean): void
    {
        let x, y, tx, ty;
        if (expand) {
            x = window.innerWidth / this.dtBoundingClientRect.width;
            y = window.innerHeight / this.dtBoundingClientRect.height;
            tx = (window.innerWidth / 2 - this.dtBoundingClientRect.width / 2
                - this.dtBoundingClientRect.left) / x;
            ty = (window.innerHeight / 2 - this.dtBoundingClientRect.height / 2
                - this.dtBoundingClientRect.top) / y;

        } else {
            x = 1;
            y = 1;
            tx = this.dtBoundingClientRect.left;
            ty = this.dtBoundingClientRect.top;
        }

        this.dtFullScreenOverlay.nativeElement.style.transform =
            'scaleX(' + x + ') scaleY(' + y + ') translate3d(' + (tx) + 'px, ' + (ty) + 'px, 0px)';
    }

    private initFullScreen (): void
    {
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
     */
    toggleFullScreenOnDT (fullScreen: boolean): void
    {
        this.dt.el.nativeElement.style.opacity = 0;
        setTimeout(() =>
        {
            if (fullScreen) {
                this.dt.classList += 'dt-full-screen';
                this.dt.el.nativeElement.style.opacity = 1;

            } else {
                this.dt.classList = this.dt.classList.replace('dt-full-screen',
                    '');
                this.dt.el.nativeElement.style.opacity = 1;
            }
        }, 200);

    }


    /**
     * INFINITE SCROLLING METHODS
     */

    /**
     * Listen for infinite scroll event and request new data from data source
     *
     */
    onLazyLoad (event: any): void
    {
        if (event.isLoad) {
            this.dt.state.offset = event.offset;
            this.dt.dataSource.fetch(this.dt.state);
        } else {
            let dataProvider = this.dt.dataSource.dataProvider;
            let data = dataProvider.dataChanges.getValue();
            dataProvider.dataChanges.next(data.slice(0, event.offset));
        }
    }


    /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     */
    private loadingFinished (): void
    {
        if (isPresent(this.infiniteScroll)) {
            setTimeout(() => this.infiniteScroll.complete(), 200);

        }
    }
}
