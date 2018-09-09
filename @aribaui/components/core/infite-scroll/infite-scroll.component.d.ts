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
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit, Renderer2 } from '@angular/core';
import { DomUtilsService } from '../../core/dom-utils.service';
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
export declare class InfiniteScrollComponent implements OnInit, AfterContentInit {
    private _render;
    private _zone;
    private domUtils;
    private _cd;
    _lastCheck: number;
    _lastScrollTop: number;
    _scLsn: any;
    _thr: string;
    _thrPx: number;
    _thrPc: number;
    _init: boolean;
    _content: any;
    _docBody: any;
    /**
     * @internal
     */
    state: string;
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
    distance: string;
    /**
     * @input {boolean} If true, Whether or not the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    enabled: boolean;
    /**
     * @output {event} Emitted when the scroll reaches
     * the threshold distance. From within your infinite handler,
     * you must call the infinite scroll's `complete()` method when
     * your async operation has completed.
     */
    onLoad: EventEmitter<any>;
    loadPanel: ElementRef;
    /**
     *
     * Lazy load current numbers. tell the app starting point and what is the size of loaded
     * list
     *
     */
    fetchSize: number;
    loadOffset: number;
    constructor(_render: Renderer2, _zone: NgZone, domUtils: DomUtilsService, _cd: ChangeDetectorRef);
    ngOnInit(): void;
    _onScroll(ev: any): void;
    /**
     * Todo: refactor to one method
     */
    private fireOnLazyLoad();
    private fireOnLazyUnLoad();
    private scrollTop();
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
    complete(): void;
    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    enable(shouldEnable: boolean): void;
    /**
     * Subscribes to native windows scroll event
     */
    _setListeners(shouldListen: boolean): void;
    isLoading(): boolean;
    ngAfterContentInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
}
