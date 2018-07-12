/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import { isPresent } from '@aribaui/core';
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
export class InfiniteScrollComponent {
    /**
     * @param {?} _render
     * @param {?} _zone
     * @param {?} domUtils
     * @param {?} _cd
     */
    constructor(_render, _zone, domUtils, _cd) {
        this._render = _render;
        this._zone = _zone;
        this.domUtils = domUtils;
        this._cd = _cd;
        this._lastCheck = 0;
        this._lastScrollTop = 0;
        this._thr = '10%';
        this._thrPx = 0;
        this._thrPc = 0.10;
        this._init = false;
        /**
         * \@internal
         */
        this.state = STATE_ENABLED;
        /**
         * \@output {event} Emitted when the scroll reaches
         * the threshold distance. From within your infinite handler,
         * you must call the infinite scroll's `complete()` method when
         * your async operation has completed.
         */
        this.onLoad = new EventEmitter();
        /**
         *
         * Lazy load current numbers. tell the app starting point and what is the size of loaded
         * list
         *
         */
        this.fetchSize = 0;
        this.loadOffset = 0;
    }
    /**
     * \@input {string} The threshold distance from the bottom
     * of the content to call the `onLoad` output event when scrolled.
     * The threshold value can be either a percent, or
     * in pixels. For example, use the value of `10%` for the `infinite`
     * output event to get called when the user has scrolled 10%
     * from the bottom of the page. Use the value `100px` when the
     * scroll is within 100 pixels from the bottom of the page.
     * Default is `15%`.
     * @return {?}
     */
    get distance() {
        return this._thr;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set distance(val) {
        this._thr = val;
        if (val.indexOf('%') > -1) {
            this._thrPx = 0;
            this._thrPc = (parseFloat(val) / 100);
        }
        else {
            this._thrPx = parseFloat(val);
            this._thrPc = 0;
        }
    }
    /**
     * \@input {boolean} If true, Whether or not the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     * @param {?} shouldEnable
     * @return {?}
     */
    set enabled(shouldEnable) {
        this.enable(shouldEnable);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._render.addClass(document.body, 'has-infinite-scroll');
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    _onScroll(ev) {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return;
        }
        // must throttle the class by 100ms
        if (this._lastCheck + 100 > ev.timeStamp) {
            // no need to check less than every XXms
            return;
        }
        this._lastCheck = ev.timeStamp;
        let /** @type {?} */ scrollTop = this.scrollTop();
        let /** @type {?} */ winHeight = this.domUtils.browserDimentions().height;
        const /** @type {?} */ height = Math.max(this._docBody.scrollHeight, this._docBody.offsetHeight, winHeight, this._content.scrollHeight, this._content.offsetHeight);
        if (!height) {
            // if there is no height of this element then do nothing
            return;
        }
        const /** @type {?} */ threshold = this._thrPc ? (height * this._thrPc) : this._thrPx;
        let /** @type {?} */ distanceFromInfinite = this._content.scrollHeight - winHeight - scrollTop - threshold;
        // console.log('Document height (' + height + ') , Distance from bottom '
        // + distanceFromInfinite + ',  => threshold = ' +
        //     this.distance + ' (' + threshold + ')');
        if (distanceFromInfinite < 0 && this._lastScrollTop < scrollTop) {
            this.fireOnLazyLoad();
        }
        else if (this._lastScrollTop > scrollTop && scrollTop < winHeight
            && this.loadOffset !== this.fetchSize) {
            this.fireOnLazyUnLoad();
        }
        this._lastScrollTop = scrollTop;
        return;
    }
    /**
     * Todo: refactor to one method
     * @return {?}
     */
    fireOnLazyLoad() {
        this._zone.run(() => {
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
    /**
     * @return {?}
     */
    fireOnLazyUnLoad() {
        this._zone.run(() => {
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
    /**
     * @return {?}
     */
    scrollTop() {
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
     * @return {?}
     */
    complete() {
        if (this.state !== STATE_LOADING) {
            return;
        }
        setTimeout(() => {
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
     * @param {?} shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     * @return {?}
     */
    enable(shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    }
    /**
     * Subscribes to native windows scroll event
     * @param {?} shouldListen
     * @return {?}
     */
    _setListeners(shouldListen) {
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(() => {
                        this._scLsn = this._onScroll.bind(this);
                        window.addEventListener('scroll', this._scLsn);
                    });
                }
            }
            else {
                if (isPresent(this._scLsn)) {
                    window.removeEventListener('scroll', this._scLsn);
                    this._scLsn = null;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    isLoading() {
        return this.state === STATE_LOADING;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
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
     * @return {?}
     */
    ngOnDestroy() {
        this._setListeners(false);
    }
}
InfiniteScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-infinite-scroll',
                template: `<div class="w-infinite-loader-panel" *ngIf="isLoading()">
    <span class="sap-icon icon-synchronize u-spin-icon"></span>
</div>
`,
                styles: [`.w-infinite-loader-panel{display:flex;align-items:center;justify-content:center;background-color:#fff;width:100%;height:100px;z-index:300;bottom:100px}.w-infinite-loader-panel span{color:#4a4a4a;font-size:2em}`],
            },] },
];
/** @nocollapse */
InfiniteScrollComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: DomUtilsService },
    { type: ChangeDetectorRef }
];
InfiniteScrollComponent.propDecorators = {
    distance: [{ type: Input }],
    enabled: [{ type: Input }],
    onLoad: [{ type: Output }],
    loadPanel: [{ type: ViewChild, args: ['loadinPanel',] }],
    fetchSize: [{ type: Input }]
};
function InfiniteScrollComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    InfiniteScrollComponent.prototype._lastCheck;
    /** @type {?} */
    InfiniteScrollComponent.prototype._lastScrollTop;
    /** @type {?} */
    InfiniteScrollComponent.prototype._scLsn;
    /** @type {?} */
    InfiniteScrollComponent.prototype._thr;
    /** @type {?} */
    InfiniteScrollComponent.prototype._thrPx;
    /** @type {?} */
    InfiniteScrollComponent.prototype._thrPc;
    /** @type {?} */
    InfiniteScrollComponent.prototype._init;
    /** @type {?} */
    InfiniteScrollComponent.prototype._content;
    /** @type {?} */
    InfiniteScrollComponent.prototype._docBody;
    /**
     * \@internal
     * @type {?}
     */
    InfiniteScrollComponent.prototype.state;
    /**
     * \@output {event} Emitted when the scroll reaches
     * the threshold distance. From within your infinite handler,
     * you must call the infinite scroll's `complete()` method when
     * your async operation has completed.
     * @type {?}
     */
    InfiniteScrollComponent.prototype.onLoad;
    /** @type {?} */
    InfiniteScrollComponent.prototype.loadPanel;
    /**
     *
     * Lazy load current numbers. tell the app starting point and what is the size of loaded
     * list
     *
     * @type {?}
     */
    InfiniteScrollComponent.prototype.fetchSize;
    /** @type {?} */
    InfiniteScrollComponent.prototype.loadOffset;
    /** @type {?} */
    InfiniteScrollComponent.prototype._render;
    /** @type {?} */
    InfiniteScrollComponent.prototype._zone;
    /** @type {?} */
    InfiniteScrollComponent.prototype.domUtils;
    /** @type {?} */
    InfiniteScrollComponent.prototype._cd;
}
const /** @type {?} */ STATE_ENABLED = 'enabled';
const /** @type {?} */ STATE_DISABLED = 'disabled';
const /** @type {?} */ STATE_LOADING = 'loading';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maXRlLXNjcm9sbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0EsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQzdELE1BQU07Ozs7Ozs7SUFxRkYsWUFBcUIsT0FBa0IsRUFBVSxLQUFhLEVBQ3pDLFVBQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUN6QyxhQUFRLEdBQVIsUUFBUTtRQUNSLFFBQUcsR0FBSCxHQUFHOzBCQXJGSCxDQUFDOzhCQUNHLENBQUM7b0JBRVgsS0FBSztzQkFDSCxDQUFDO3NCQUNELElBQUk7cUJBQ0osS0FBSzs7OztxQkFRTixhQUFhOzs7Ozs7O3NCQWtERCxJQUFJLFlBQVksRUFBTzs7Ozs7Ozt5QkFjL0IsQ0FBQzswQkFFQSxDQUFDO0tBU3JCOzs7Ozs7Ozs7Ozs7SUEvREQsSUFDSSxRQUFRO1FBRVIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDcEI7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUUsR0FBVztRQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FB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Ozs7SUFFRCxrQkFBa0I7UUFFZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO1FBRXpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0tBQ0o7Ozs7O0lBS0QsV0FBVztRQUVQLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0I7OztZQTlSSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Q0FHYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxtTkFBbU4sQ0FBQzthQUNoTzs7OztZQTdDRyxTQUFTO1lBRlQsTUFBTTtZQU1GLGVBQWU7WUFYbkIsaUJBQWlCOzs7dUJBaUZoQixLQUFLO3NCQXdCTCxLQUFLO3FCQWFMLE1BQU07d0JBSU4sU0FBUyxTQUFDLGFBQWE7d0JBVXZCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0TVYsdUJBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUNoQyx1QkFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDO0FBQ2xDLHVCQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBVbmRlciBAb3JpZ2luYWwtbGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQgRHJpZnR5IENvLlxuICogaHR0cDovL2RyaWZ0eS5jb20vXG4gKlxuICogIE1JVCBMaWNlbnNlXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXG4gKiBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbiAqIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuICogd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuICogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4gKiBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbiAqIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbiAqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gKiBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4gKiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbiAqIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICpcbiAqXG4gKiBDcmVkaXQgdG8gZHJpZnR5IGZvciB0aGlzIGV4Y2VsbGVudCBjb21wb25lbnQuIFdlIGhhdmUgYSBzdHJvbmcgbmVlZHMgZm9yIGdvb2QgaW5maW5pdGVcbiAqIHNjcm9sbGluZyBjb21wb25lbnQgc28gdGhpcyBpcyBkZXJpdmVkIHdvcmsgYmFzZWQgb24gdGhpcyBkcmlmdHkgY29tcG9uZW50IGFzIHdlIGNhbiBub3QgcmVhbGx5XG4gKiBicmluZyBpbiB3aG9sZSBmcmFtZXdvcmsgYW5kIHRoZWlyIGNvbXBvbmVudC9BUEkuIEl0IHdvdWxkIGJlIHRvbyBoZWF2eVxuICpcbiAqIENvbXBvbmVudCBpcyB1cGRhdGVkIHdpdGggbmF0aXZlIERPTSBBUEkuIHBsdXMgc2ltcGxpZmllZCBieSByZW1vdmluZyB0aGluZ3NcbiAqIHRoYXQgYXJlIG5vdCBuZWNlc3NhcnkgZm9yIG91ciB1c2VjYXNlLiBVcGRhdGVkIGRpcmVjdGl2ZSBwcmVmaXggdG8gbWF0Y2ggb3VyIGd1aWRlbGluZXNcbiAqXG4gKlxuICpcbiAqL1xuXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLCBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbVV0aWxzU2VydmljZX0gZnJvbSAnLi4vLi4vY29yZS9kb20tdXRpbHMuc2VydmljZSc7XG5cbi8qKlxuICogVGhlIEluZmluaXRlIFNjcm9sbCBhbGxvd3MgeW91IHRvIHBlcmZvcm0gYW4gYWN0aW9uIHdoZW4gdGhlIHVzZXJcbiAqIHNjcm9sbHMgYSBzcGVjaWZpZWQgZGlzdGFuY2UgZnJvbSB0aGUgYm90dG9tIG9yIHRvcCBvZiB0aGUgcGFnZS5cbiAqXG4gKiBUaGUgZXhwcmVzc2lvbiBhc3NpZ25lZCB0byB0aGUgYGluZmluaXRlYCBldmVudCBpcyBjYWxsZWQgd2hlblxuICogdGhlIHVzZXIgc2Nyb2xscyB0byB0aGUgc3BlY2lmaWVkIGRpc3RhbmNlLiBXaGVuIHRoaXMgZXhwcmVzc2lvblxuICogaGFzIGZpbmlzaGVkIGl0cyB0YXNrcywgaXQgc2hvdWxkIGNhbGwgdGhlIGBjb21wbGV0ZSgpYCBtZXRob2RcbiAqIG9uIHRoZSBpbmZpbml0ZSBzY3JvbGwgaW5zdGFuY2UuXG4gKlxuICogIyMgVXNhZ2VcbiAqXG4gKiBgYGBodG1sXG4gKlxuICogIDxkaXYgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCI+e3tpdGVtfX0gPC9kaXY+XG4gKiAgIDxhdy1pbmZpbml0ZS1zY3JvbGwgKG9uTG9hZCk9XCJkb0luZmluaXRlKCRldmVudClcIj5cbiAqICA8L2F3LWluZmluaXRlLXNjcm9sbD5cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICogWW91IGNhbiBhbHNvIHNldCBhIHRocmVzaG9sZCB0byBjaGFuZ2UgdGhlIGRpc3RhbmNlIHdoZW4gdGhlIGxhenkgbG9hZCBraWNrc1xuICogaW4uXG4gKiAjIyBVc2FnZVxuICpcbiAqIGBgYGh0bWxcbiAqXG4gKiAgPGRpdiAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj57e2l0ZW19fSA8L2Rpdj5cbiAqICAgPGF3LWluZmluaXRlLXNjcm9sbCAob25Mb2FkKT1cImRvSW5maW5pdGUoJGV2ZW50KVwiICBbZGlzdGFuY2VdPVwiJzE1JSdcIj5cbiAqICA8L2F3LWluZmluaXRlLXNjcm9sbD5cbiAqXG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1pbmZpbml0ZS1zY3JvbGwnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInctaW5maW5pdGUtbG9hZGVyLXBhbmVsXCIgKm5nSWY9XCJpc0xvYWRpbmcoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2FwLWljb24gaWNvbi1zeW5jaHJvbml6ZSB1LXNwaW4taWNvblwiPjwvc3Bhbj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnctaW5maW5pdGUtbG9hZGVyLXBhbmVse2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7ei1pbmRleDozMDA7Ym90dG9tOjEwMHB4fS53LWluZmluaXRlLWxvYWRlci1wYW5lbCBzcGFue2NvbG9yOiM0YTRhNGE7Zm9udC1zaXplOjJlbX1gXSxcbn0pXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXRcbntcbiAgICBfbGFzdENoZWNrOiBudW1iZXIgPSAwO1xuICAgIF9sYXN0U2Nyb2xsVG9wOiBudW1iZXIgPSAwO1xuICAgIF9zY0xzbjogYW55O1xuICAgIF90aHI6IHN0cmluZyA9ICcxMCUnO1xuICAgIF90aHJQeDogbnVtYmVyID0gMDtcbiAgICBfdGhyUGM6IG51bWJlciA9IDAuMTA7XG4gICAgX2luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9jb250ZW50OiBhbnk7XG4gICAgX2RvY0JvZHk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHN0YXRlOiBzdHJpbmcgPSBTVEFURV9FTkFCTEVEO1xuXG4gICAgLyoqXG4gICAgICogQGlucHV0IHtzdHJpbmd9IFRoZSB0aHJlc2hvbGQgZGlzdGFuY2UgZnJvbSB0aGUgYm90dG9tXG4gICAgICogb2YgdGhlIGNvbnRlbnQgdG8gY2FsbCB0aGUgYG9uTG9hZGAgb3V0cHV0IGV2ZW50IHdoZW4gc2Nyb2xsZWQuXG4gICAgICogVGhlIHRocmVzaG9sZCB2YWx1ZSBjYW4gYmUgZWl0aGVyIGEgcGVyY2VudCwgb3JcbiAgICAgKiBpbiBwaXhlbHMuIEZvciBleGFtcGxlLCB1c2UgdGhlIHZhbHVlIG9mIGAxMCVgIGZvciB0aGUgYGluZmluaXRlYFxuICAgICAqIG91dHB1dCBldmVudCB0byBnZXQgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHNjcm9sbGVkIDEwJVxuICAgICAqIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZS4gVXNlIHRoZSB2YWx1ZSBgMTAwcHhgIHdoZW4gdGhlXG4gICAgICogc2Nyb2xsIGlzIHdpdGhpbiAxMDAgcGl4ZWxzIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZS5cbiAgICAgKiBEZWZhdWx0IGlzIGAxNSVgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc3RhbmNlICgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aHI7XG4gICAgfVxuXG4gICAgc2V0IGRpc3RhbmNlICh2YWw6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuX3RociA9IHZhbDtcbiAgICAgICAgaWYgKHZhbC5pbmRleE9mKCclJykgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5fdGhyUHggPSAwO1xuICAgICAgICAgICAgdGhpcy5fdGhyUGMgPSAocGFyc2VGbG9hdCh2YWwpIC8gMTAwKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGhyUHggPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgICAgICAgICB0aGlzLl90aHJQYyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5wdXQge2Jvb2xlYW59IElmIHRydWUsIFdoZXRoZXIgb3Igbm90IHRoZSBpbmZpbml0ZSBzY3JvbGwgc2hvdWxkIGJlXG4gICAgICogZW5hYmxlZCBvciBub3QuIFNldHRpbmcgdG8gYGZhbHNlYCB3aWxsIHJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogYW5kIGhpZGUgdGhlIGRpc3BsYXkuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgZW5hYmxlZCAoc2hvdWxkRW5hYmxlOiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbmFibGUoc2hvdWxkRW5hYmxlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBvdXRwdXQge2V2ZW50fSBFbWl0dGVkIHdoZW4gdGhlIHNjcm9sbCByZWFjaGVzXG4gICAgICogdGhlIHRocmVzaG9sZCBkaXN0YW5jZS4gRnJvbSB3aXRoaW4geW91ciBpbmZpbml0ZSBoYW5kbGVyLFxuICAgICAqIHlvdSBtdXN0IGNhbGwgdGhlIGluZmluaXRlIHNjcm9sbCdzIGBjb21wbGV0ZSgpYCBtZXRob2Qgd2hlblxuICAgICAqIHlvdXIgYXN5bmMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgICBAVmlld0NoaWxkKCdsb2FkaW5QYW5lbCcpXG4gICAgbG9hZFBhbmVsOiBFbGVtZW50UmVmO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIExhenkgbG9hZCBjdXJyZW50IG51bWJlcnMuIHRlbGwgdGhlIGFwcCBzdGFydGluZyBwb2ludCBhbmQgd2hhdCBpcyB0aGUgc2l6ZSBvZiBsb2FkZWRcbiAgICAgKiBsaXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZldGNoU2l6ZTogbnVtYmVyID0gMDtcblxuICAgIGxvYWRPZmZzZXQ6IG51bWJlciA9IDA7XG5cblxuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIF9yZW5kZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgICBwcml2YXRlIGRvbVV0aWxzOiBEb21VdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZilcbiAgICB7XG5cblxuICAgIH1cblxuXG4gICAgbmdPbkluaXQgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX3JlbmRlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnaGFzLWluZmluaXRlLXNjcm9sbCcpO1xuXG4gICAgfVxuXG4gICAgX29uU2Nyb2xsIChldjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX0xPQURJTkcgfHwgdGhpcy5zdGF0ZSA9PT0gU1RBVEVfRElTQUJMRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG11c3QgdGhyb3R0bGUgdGhlIGNsYXNzIGJ5IDEwMG1zXG4gICAgICAgIGlmICh0aGlzLl9sYXN0Q2hlY2sgKyAxMDAgPiBldi50aW1lU3RhbXApIHtcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gY2hlY2sgbGVzcyB0aGFuIGV2ZXJ5IFhYbXNcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RDaGVjayA9IGV2LnRpbWVTdGFtcDtcbiAgICAgICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgbGV0IHdpbkhlaWdodCA9IHRoaXMuZG9tVXRpbHMuYnJvd3NlckRpbWVudGlvbnMoKS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KHRoaXMuX2RvY0JvZHkuc2Nyb2xsSGVpZ2h0LCB0aGlzLl9kb2NCb2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHdpbkhlaWdodCwgdGhpcy5fY29udGVudC5zY3JvbGxIZWlnaHQsIHRoaXMuX2NvbnRlbnQub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICBpZiAoIWhlaWdodCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gaGVpZ2h0IG9mIHRoaXMgZWxlbWVudCB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSB0aGlzLl90aHJQYyA/IChoZWlnaHQgKiB0aGlzLl90aHJQYykgOiB0aGlzLl90aHJQeDtcbiAgICAgICAgbGV0IGRpc3RhbmNlRnJvbUluZmluaXRlID0gdGhpcy5fY29udGVudC5zY3JvbGxIZWlnaHQgLSB3aW5IZWlnaHQgLSBzY3JvbGxUb3AgLSB0aHJlc2hvbGQ7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0RvY3VtZW50IGhlaWdodCAoJyArIGhlaWdodCArICcpICwgRGlzdGFuY2UgZnJvbSBib3R0b20gJ1xuICAgICAgICAvLyArIGRpc3RhbmNlRnJvbUluZmluaXRlICsgJywgID0+IHRocmVzaG9sZCA9ICcgK1xuICAgICAgICAvLyAgICAgdGhpcy5kaXN0YW5jZSArICcgKCcgKyB0aHJlc2hvbGQgKyAnKScpO1xuXG4gICAgICAgIGlmIChkaXN0YW5jZUZyb21JbmZpbml0ZSA8IDAgJiYgdGhpcy5fbGFzdFNjcm9sbFRvcCA8IHNjcm9sbFRvcCkge1xuICAgICAgICAgICAgdGhpcy5maXJlT25MYXp5TG9hZCgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGFzdFNjcm9sbFRvcCA+IHNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgPCB3aW5IZWlnaHRcbiAgICAgICAgICAgICYmIHRoaXMubG9hZE9mZnNldCAhPT0gdGhpcy5mZXRjaFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZU9uTGF6eVVuTG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2RvOiByZWZhY3RvciB0byBvbmUgbWV0aG9kXG4gICAgICovXG4gICAgcHJpdmF0ZSBmaXJlT25MYXp5TG9hZCAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX0xPQURJTkcgJiYgdGhpcy5zdGF0ZSAhPT0gU1RBVEVfRElTQUJMRUQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfTE9BRElORztcblxuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLmZldGNoU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmxvYWRPZmZzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBvbiB0aGUgbmV4dCByZWNvcmRcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRPZmZzZXQgKz0gdGhpcy5mZXRjaFNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBmaXJlT25MYXp5VW5Mb2FkICgpXG4gICAge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfTE9BRElORyAmJiB0aGlzLnN0YXRlICE9PSBTVEFURV9ESVNBQkxFRCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9MT0FESU5HO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgb24gdGhlIG5leHQgcmVjb3JkXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkT2Zmc2V0ID0gdGhpcy5mZXRjaFNpemU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuZmV0Y2hTaXplLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMubG9hZE9mZnNldFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgc2Nyb2xsVG9wICgpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IHRoaXMuX2NvbnRlbnQuc2Nyb2xsVG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIGBjb21wbGV0ZSgpYCB3aXRoaW4gdGhlIGBpbmZpbml0ZWAgb3V0cHV0IGV2ZW50IGhhbmRsZXIgd2hlblxuICAgICAqIHlvdXIgYXN5bmMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWQuIEZvciBleGFtcGxlLCB0aGUgYGxvYWRpbmdgXG4gICAgICogc3RhdGUgaXMgd2hpbGUgdGhlIGFwcCBpcyBwZXJmb3JtaW5nIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24sXG4gICAgICogc3VjaCBhcyByZWNlaXZpbmcgbW9yZSBkYXRhIGZyb20gYW4gQUpBWCByZXF1ZXN0IHRvIGFkZCBtb3JlIGl0ZW1zXG4gICAgICogdG8gYSBkYXRhIGxpc3QuIE9uY2UgdGhlIGRhdGEgaGFzIGJlZW4gcmVjZWl2ZWQgYW5kIFVJIHVwZGF0ZWQsIHlvdVxuICAgICAqIHRoZW4gY2FsbCB0aGlzIG1ldGhvZCB0byBzaWduaWZ5IHRoYXQgdGhlIGxvYWRpbmcgaGFzIGNvbXBsZXRlZC5cbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGNoYW5nZSB0aGUgaW5maW5pdGUgc2Nyb2xsJ3Mgc3RhdGUgZnJvbSBgbG9hZGluZ2BcbiAgICAgKiB0byBgZW5hYmxlZGAuXG4gICAgICovXG4gICAgY29tcGxldGUgKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9FTkFCTEVEO1xuXG4gICAgICAgICAgICAvLyBuZWVkIHRvIHRyaWdnZXIgZXh0cmEgZGV0ZWN0IGNoYW5nZXMgdG8gcmVyZW5kZXIgbG9hZGluZyBpY29uXG4gICAgICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsIGBlbmFibGUoZmFsc2UpYCB0byBkaXNhYmxlIHRoZSBpbmZpbml0ZSBzY3JvbGwgZnJvbSBhY3RpdmVseVxuICAgICAqIHRyeWluZyB0byByZWNlaXZlIG5ldyBkYXRhIHdoaWxlIHNjcm9sbGluZy4gVGhpcyBtZXRob2QgaXMgdXNlZnVsXG4gICAgICogd2hlbiBpdCBpcyBrbm93biB0aGF0IHRoZXJlIGlzIG5vIG1vcmUgZGF0YSB0aGF0IGNhbiBiZSBhZGRlZCwgYW5kXG4gICAgICogdGhlIGluZmluaXRlIHNjcm9sbCBpcyBubyBsb25nZXIgbmVlZGVkLlxuICAgICAqIEBwYXJhbSBzaG91bGRFbmFibGUgIElmIHRoZSBpbmZpbml0ZSBzY3JvbGwgc2hvdWxkIGJlXG4gICAgICogZW5hYmxlZCBvciBub3QuIFNldHRpbmcgdG8gYGZhbHNlYCB3aWxsIHJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogYW5kIGhpZGUgdGhlIGRpc3BsYXkuXG4gICAgICovXG4gICAgZW5hYmxlIChzaG91bGRFbmFibGU6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlID0gKHNob3VsZEVuYWJsZSA/IFNUQVRFX0VOQUJMRUQgOiBTVEFURV9ESVNBQkxFRCk7XG4gICAgICAgIHRoaXMuX3NldExpc3RlbmVycyhzaG91bGRFbmFibGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdG8gbmF0aXZlIHdpbmRvd3Mgc2Nyb2xsIGV2ZW50XG4gICAgICovXG4gICAgX3NldExpc3RlbmVycyAoc2hvdWxkTGlzdGVuOiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRMaXN0ZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NjTHNuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NMc24gPSB0aGlzLl9vblNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3NjTHNuKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc2NMc24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY0xzbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NjTHNuID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGlzTG9hZGluZyAoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFNUQVRFX0xPQURJTkc7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0ICgpXG4gICAge1xuICAgICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZG9jQm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKHRoaXMuc3RhdGUgIT09IFNUQVRFX0RJU0FCTEVEKTtcblxuICAgICAgICBpZiAodGhpcy5sb2FkT2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVPbkxhenlMb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3kgKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NldExpc3RlbmVycyhmYWxzZSk7XG4gICAgfVxuXG59XG5cblxuY29uc3QgU1RBVEVfRU5BQkxFRCA9ICdlbmFibGVkJztcbmNvbnN0IFNUQVRFX0RJU0FCTEVEID0gJ2Rpc2FibGVkJztcbmNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG4iXX0=