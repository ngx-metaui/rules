/**
 *
 * Under @original-license
 *
 * Copyright 2015-present Drifty Co.
 * http://drifty.com/
 *
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Credit to drifty for this excellent component. We have a strong needs for good infinite
 * scrolling component so this is derived work based on this drifty component as we can not really
 * bring in whole framework and their component/API. It would be too heavy
 *
 * Component is updated with native DOM API. plus simplified by removing things
 * that are not necessary for our usecase. Updated directive prefix to match our guidelines
 *
 *
 *
 */


import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone, OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import {isPresent} from '@aribaui/core';
import {DomUtilsService} from '../../core/dom-utils.service';

/**
 * The Infinite Scroll allows you to perform an action when the user
 * scrolls a specified distance from the bottom or top of the page.
 *
 * The expression assigned to the `infinite` event is called when
 * the user scrolls to the specified distance. When this expression
 * has finished its tasks, it should call the `complete()` method
 * on the infinite scroll instance.
 *
 * ## Usage
 *
 * ```html
 *
 *  <div  *ngFor="let item of items">{{item}} </div>
 *   <aw-infinite-scroll (onLoad)="doInfinite($event)">
 *  </aw-infinite-scroll>
 *
 * ```
 *
 *
 * You can also set a threshold to change the distance when the lazy load kicks
 * in.
 * ## Usage
 *
 * ```html
 *
 *  <div  *ngFor="let item of items">{{item}} </div>
 *   <aw-infinite-scroll (onLoad)="doInfinite($event)"  [distance]="'15%'">
 *  </aw-infinite-scroll>
 *
 * ```
 */
@Component({
    selector: 'aw-infinite-scroll',
    templateUrl: 'infite-scroll.component.html',
    styleUrls: ['infite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, AfterContentInit
{
    _lastCheck: number = 0;
    _lastScrollTop: number = 0;
    _scLsn: any;
    _thr: string = '10%';
    _thrPx: number = 0;
    _thrPc: number = 0.10;
    _init: boolean = false;

    _content: any;
    _docBody: any;

    /**
     * @internal
     */
    state: string = STATE_ENABLED;

    /**
     * @input {string} The threshold distance from the bottom
     * of the content to call the `onLoad` output event when scrolled.
     * The threshold value can be either a percent, or
     * in pixels. For example, use the value of `10%` for the `infinite`
     * output event to get called when the user has scrolled 10%
     * from the bottom of the page. Use the value `100px` when the
     * scroll is within 100 pixels from the bottom of the page.
     * Default is `15%`.
     */
    @Input()
    get distance (): string
    {
        return this._thr;
    }

    set distance (val: string)
    {
        this._thr = val;
        if (val.indexOf('%') > -1) {
            this._thrPx = 0;
            this._thrPc = (parseFloat(val) / 100);

        } else {
            this._thrPx = parseFloat(val);
            this._thrPc = 0;
        }
    }

    /**
     * @input {boolean} If true, Whether or not the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    @Input()
    set enabled (shouldEnable: boolean)
    {
        this.enable(shouldEnable);
    }


    /**
     * @output {event} Emitted when the scroll reaches
     * the threshold distance. From within your infinite handler,
     * you must call the infinite scroll's `complete()` method when
     * your async operation has completed.
     */
    @Output()
    onLoad: EventEmitter<any> = new EventEmitter<any>();


    @ViewChild('loadinPanel')
    loadPanel: ElementRef;


    /**
     *
     * Lazy load current numbers. tell the app starting point and what is the size of loaded
     * list
     *
     */
    @Input()
    fetchSize: number = 0;

    loadOffset: number = 0;


    constructor (private _render: Renderer2, private _zone: NgZone,
                 private domUtils: DomUtilsService,
                 private _cd: ChangeDetectorRef)
    {


    }


    ngOnInit (): void
    {
        this._render.addClass(document.body, 'has-infinite-scroll');

    }

    _onScroll (ev: any): void
    {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return;
        }

        // must throttle the class by 100ms
        if (this._lastCheck + 100 > ev.timeStamp) {
            // no need to check less than every XXms
            return;
        }

        this._lastCheck = ev.timeStamp;
        let scrollTop = this.scrollTop();

        let winHeight = this.domUtils.browserDimentions().height;
        const height = Math.max(this._docBody.scrollHeight, this._docBody.offsetHeight,
            winHeight, this._content.scrollHeight, this._content.offsetHeight);

        if (!height) {
            // if there is no height of this element then do nothing
            return;
        }
        const threshold = this._thrPc ? (height * this._thrPc) : this._thrPx;
        let distanceFromInfinite = this._content.scrollHeight - winHeight - scrollTop - threshold;

        // console.log('Document height (' + height + ') , Distance from bottom '
        // + distanceFromInfinite + ',  => threshold = ' +
        //     this.distance + ' (' + threshold + ')');

        if (distanceFromInfinite < 0 && this._lastScrollTop < scrollTop) {
            this.fireOnLazyLoad();

        } else if (this._lastScrollTop > scrollTop && scrollTop < winHeight
            && this.loadOffset !== this.fetchSize) {
            this.fireOnLazyUnLoad();
        }
        this._lastScrollTop = scrollTop;
        return;
    }

    /**
     * Todo: refactor to one method
     */
    private fireOnLazyLoad ()
    {
        this._zone.run(() =>
        {
            if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
                this.state = STATE_LOADING;

                this.onLoad.emit({
                    isLoad: true,
                    limit: this.fetchSize,
                    offset: this.loadOffset
                });
                // start on the next record
                this.loadOffset += this.fetchSize;
            }
        });
    }


    private fireOnLazyUnLoad ()
    {
        this._zone.run(() =>
        {
            if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
                this.state = STATE_LOADING;

                // start on the next record
                this.loadOffset = this.fetchSize;

                this.onLoad.emit({
                    isLoad: false,
                    limit: this.fetchSize,
                    offset: this.loadOffset
                });
            }
        });
    }


    private scrollTop (): number
    {
        return (window.pageYOffset || this._content.scrollTop);
    }

    /**
     * Call `complete()` within the `infinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     */
    complete ()
    {
        if (this.state !== STATE_LOADING) {
            return;
        }

        setTimeout(() =>
        {
            this.state = STATE_ENABLED;

            // need to trigger extra detect changes to rerender loading icon
            this._cd.detectChanges();
        }, 100);
    }


    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    enable (shouldEnable: boolean)
    {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    }

    /**
     * Subscribes to native windows scroll event
     */
    _setListeners (shouldListen: boolean)
    {
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(() =>
                    {
                        this._scLsn = this._onScroll.bind(this);
                        window.addEventListener('scroll', this._scLsn);
                    });
                }
            } else {

                if (isPresent(this._scLsn)) {
                    window.removeEventListener('scroll', this._scLsn);
                    this._scLsn = null;
                }
            }
        }
    }


    isLoading (): boolean
    {
        return this.state === STATE_LOADING;
    }

    ngAfterContentInit ()
    {
        this._init = true;
        this._docBody = document.body;
        this._content = document.documentElement;

        this._setListeners(this.state !== STATE_DISABLED);

        if (this.loadOffset === 0) {
            this.fireOnLazyLoad();
        }
    }

    /**
     * @hidden
     */
    ngOnDestroy ()
    {
        this._setListeners(false);
    }

}


const STATE_ENABLED = 'enabled';
const STATE_DISABLED = 'disabled';
const STATE_LOADING = 'loading';
