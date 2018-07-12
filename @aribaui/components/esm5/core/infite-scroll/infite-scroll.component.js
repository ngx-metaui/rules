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
var InfiniteScrollComponent = /** @class */ (function () {
    function InfiniteScrollComponent(_render, _zone, domUtils, _cd) {
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
    Object.defineProperty(InfiniteScrollComponent.prototype, "distance", {
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
        get: /**
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
        function () {
            return this._thr;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._thr = val;
            if (val.indexOf('%') > -1) {
                this._thrPx = 0;
                this._thrPc = (parseFloat(val) / 100);
            }
            else {
                this._thrPx = parseFloat(val);
                this._thrPc = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfiniteScrollComponent.prototype, "enabled", {
        /**
         * @input {boolean} If true, Whether or not the infinite scroll should be
         * enabled or not. Setting to `false` will remove scroll event listeners
         * and hide the display.
         */
        set: /**
         * \@input {boolean} If true, Whether or not the infinite scroll should be
         * enabled or not. Setting to `false` will remove scroll event listeners
         * and hide the display.
         * @param {?} shouldEnable
         * @return {?}
         */
        function (shouldEnable) {
            this.enable(shouldEnable);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InfiniteScrollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._render.addClass(document.body, 'has-infinite-scroll');
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    InfiniteScrollComponent.prototype._onScroll = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return;
        }
        // must throttle the class by 100ms
        if (this._lastCheck + 100 > ev.timeStamp) {
            // no need to check less than every XXms
            return;
        }
        this._lastCheck = ev.timeStamp;
        var /** @type {?} */ scrollTop = this.scrollTop();
        var /** @type {?} */ winHeight = this.domUtils.browserDimentions().height;
        var /** @type {?} */ height = Math.max(this._docBody.scrollHeight, this._docBody.offsetHeight, winHeight, this._content.scrollHeight, this._content.offsetHeight);
        if (!height) {
            // if there is no height of this element then do nothing
            return;
        }
        var /** @type {?} */ threshold = this._thrPc ? (height * this._thrPc) : this._thrPx;
        var /** @type {?} */ distanceFromInfinite = this._content.scrollHeight - winHeight - scrollTop - threshold;
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
    };
    /**
     * Todo: refactor to one method
     * @return {?}
     */
    InfiniteScrollComponent.prototype.fireOnLazyLoad = /**
     * Todo: refactor to one method
     * @return {?}
     */
    function () {
        var _this = this;
        this._zone.run(function () {
            if (_this.state !== STATE_LOADING && _this.state !== STATE_DISABLED) {
                _this.state = STATE_LOADING;
                _this.onLoad.emit({
                    isLoad: true,
                    limit: _this.fetchSize,
                    offset: _this.loadOffset
                });
                // start on the next record
                // start on the next record
                _this.loadOffset += _this.fetchSize;
            }
        });
    };
    /**
     * @return {?}
     */
    InfiniteScrollComponent.prototype.fireOnLazyUnLoad = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._zone.run(function () {
            if (_this.state !== STATE_LOADING && _this.state !== STATE_DISABLED) {
                _this.state = STATE_LOADING;
                // start on the next record
                // start on the next record
                _this.loadOffset = _this.fetchSize;
                _this.onLoad.emit({
                    isLoad: false,
                    limit: _this.fetchSize,
                    offset: _this.loadOffset
                });
            }
        });
    };
    /**
     * @return {?}
     */
    InfiniteScrollComponent.prototype.scrollTop = /**
     * @return {?}
     */
    function () {
        return (window.pageYOffset || this._content.scrollTop);
    };
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
    InfiniteScrollComponent.prototype.complete = /**
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
    function () {
        var _this = this;
        if (this.state !== STATE_LOADING) {
            return;
        }
        setTimeout(function () {
            _this.state = STATE_ENABLED;
            // need to trigger extra detect changes to rerender loading icon
            // need to trigger extra detect changes to rerender loading icon
            _this._cd.detectChanges();
        }, 100);
    };
    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
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
    InfiniteScrollComponent.prototype.enable = /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param {?} shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     * @return {?}
     */
    function (shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    };
    /**
     * Subscribes to native windows scroll event
     */
    /**
     * Subscribes to native windows scroll event
     * @param {?} shouldListen
     * @return {?}
     */
    InfiniteScrollComponent.prototype._setListeners = /**
     * Subscribes to native windows scroll event
     * @param {?} shouldListen
     * @return {?}
     */
    function (shouldListen) {
        var _this = this;
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(function () {
                        _this._scLsn = _this._onScroll.bind(_this);
                        window.addEventListener('scroll', _this._scLsn);
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
    };
    /**
     * @return {?}
     */
    InfiniteScrollComponent.prototype.isLoading = /**
     * @return {?}
     */
    function () {
        return this.state === STATE_LOADING;
    };
    /**
     * @return {?}
     */
    InfiniteScrollComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init = true;
        this._docBody = document.body;
        this._content = document.documentElement;
        this._setListeners(this.state !== STATE_DISABLED);
        if (this.loadOffset === 0) {
            this.fireOnLazyLoad();
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    InfiniteScrollComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._setListeners(false);
    };
    InfiniteScrollComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-infinite-scroll',
                    template: "<div class=\"w-infinite-loader-panel\" *ngIf=\"isLoading()\">\n    <span class=\"sap-icon icon-synchronize u-spin-icon\"></span>\n</div>\n",
                    styles: [".w-infinite-loader-panel{display:flex;align-items:center;justify-content:center;background-color:#fff;width:100%;height:100px;z-index:300;bottom:100px}.w-infinite-loader-panel span{color:#4a4a4a;font-size:2em}"],
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: DomUtilsService },
        { type: ChangeDetectorRef }
    ]; };
    InfiniteScrollComponent.propDecorators = {
        distance: [{ type: Input }],
        enabled: [{ type: Input }],
        onLoad: [{ type: Output }],
        loadPanel: [{ type: ViewChild, args: ['loadinPanel',] }],
        fetchSize: [{ type: Input }]
    };
    return InfiniteScrollComponent;
}());
export { InfiniteScrollComponent };
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
var /** @type {?} */ STATE_ENABLED = 'enabled';
var /** @type {?} */ STATE_DISABLED = 'disabled';
var /** @type {?} */ STATE_LOADING = 'loading';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maXRlLXNjcm9sbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0EsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0h6RCxpQ0FBcUIsT0FBa0IsRUFBVSxLQUFhLEVBQ3pDLFVBQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUN6QyxhQUFRLEdBQVIsUUFBUTtRQUNSLFFBQUcsR0FBSCxHQUFHOzBCQXJGSCxDQUFDOzhCQUNHLENBQUM7b0JBRVgsS0FBSztzQkFDSCxDQUFDO3NCQUNELElBQUk7cUJBQ0osS0FBSzs7OztxQkFRTixhQUFhOzs7Ozs7O3NCQWtERCxJQUFJLFlBQVksRUFBTzs7Ozs7Ozt5QkFjL0IsQ0FBQzswQkFFQSxDQUFDO0tBU3JCO0lBL0RELHNCQUNJLDZDQUFRO1FBWFo7Ozs7Ozs7OztXQVNHOzs7Ozs7Ozs7Ozs7UUFDSDtZQUdJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCOzs7OztRQUVELFVBQWMsR0FBVztZQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FB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MlJwQyxxQkFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBQ2hDLHFCQUFNLGNBQWMsR0FBRyxVQUFVLENBQUM7QUFDbEMscUJBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIFVuZGVyIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCBEcmlmdHkgQ28uXG4gKiBodHRwOi8vZHJpZnR5LmNvbS9cbiAqXG4gKiAgTUlUIExpY2Vuc2VcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbiAqIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuICogXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4gKiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4gKiBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbiAqIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuICogdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuICogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbiAqIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuICogV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKlxuICpcbiAqIENyZWRpdCB0byBkcmlmdHkgZm9yIHRoaXMgZXhjZWxsZW50IGNvbXBvbmVudC4gV2UgaGF2ZSBhIHN0cm9uZyBuZWVkcyBmb3IgZ29vZCBpbmZpbml0ZVxuICogc2Nyb2xsaW5nIGNvbXBvbmVudCBzbyB0aGlzIGlzIGRlcml2ZWQgd29yayBiYXNlZCBvbiB0aGlzIGRyaWZ0eSBjb21wb25lbnQgYXMgd2UgY2FuIG5vdCByZWFsbHlcbiAqIGJyaW5nIGluIHdob2xlIGZyYW1ld29yayBhbmQgdGhlaXIgY29tcG9uZW50L0FQSS4gSXQgd291bGQgYmUgdG9vIGhlYXZ5XG4gKlxuICogQ29tcG9uZW50IGlzIHVwZGF0ZWQgd2l0aCBuYXRpdmUgRE9NIEFQSS4gcGx1cyBzaW1wbGlmaWVkIGJ5IHJlbW92aW5nIHRoaW5nc1xuICogdGhhdCBhcmUgbm90IG5lY2Vzc2FyeSBmb3Igb3VyIHVzZWNhc2UuIFVwZGF0ZWQgZGlyZWN0aXZlIHByZWZpeCB0byBtYXRjaCBvdXIgZ3VpZGVsaW5lc1xuICpcbiAqXG4gKlxuICovXG5cblxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGUgSW5maW5pdGUgU2Nyb2xsIGFsbG93cyB5b3UgdG8gcGVyZm9ybSBhbiBhY3Rpb24gd2hlbiB0aGUgdXNlclxuICogc2Nyb2xscyBhIHNwZWNpZmllZCBkaXN0YW5jZSBmcm9tIHRoZSBib3R0b20gb3IgdG9wIG9mIHRoZSBwYWdlLlxuICpcbiAqIFRoZSBleHByZXNzaW9uIGFzc2lnbmVkIHRvIHRoZSBgaW5maW5pdGVgIGV2ZW50IGlzIGNhbGxlZCB3aGVuXG4gKiB0aGUgdXNlciBzY3JvbGxzIHRvIHRoZSBzcGVjaWZpZWQgZGlzdGFuY2UuIFdoZW4gdGhpcyBleHByZXNzaW9uXG4gKiBoYXMgZmluaXNoZWQgaXRzIHRhc2tzLCBpdCBzaG91bGQgY2FsbCB0aGUgYGNvbXBsZXRlKClgIG1ldGhvZFxuICogb24gdGhlIGluZmluaXRlIHNjcm9sbCBpbnN0YW5jZS5cbiAqXG4gKiAjIyBVc2FnZVxuICpcbiAqIGBgYGh0bWxcbiAqXG4gKiAgPGRpdiAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj57e2l0ZW19fSA8L2Rpdj5cbiAqICAgPGF3LWluZmluaXRlLXNjcm9sbCAob25Mb2FkKT1cImRvSW5maW5pdGUoJGV2ZW50KVwiPlxuICogIDwvYXctaW5maW5pdGUtc2Nyb2xsPlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKiBZb3UgY2FuIGFsc28gc2V0IGEgdGhyZXNob2xkIHRvIGNoYW5nZSB0aGUgZGlzdGFuY2Ugd2hlbiB0aGUgbGF6eSBsb2FkIGtpY2tzXG4gKiBpbi5cbiAqICMjIFVzYWdlXG4gKlxuICogYGBgaHRtbFxuICpcbiAqICA8ZGl2ICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiPnt7aXRlbX19IDwvZGl2PlxuICogICA8YXctaW5maW5pdGUtc2Nyb2xsIChvbkxvYWQpPVwiZG9JbmZpbml0ZSgkZXZlbnQpXCIgIFtkaXN0YW5jZV09XCInMTUlJ1wiPlxuICogIDwvYXctaW5maW5pdGUtc2Nyb2xsPlxuICpcbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWluZmluaXRlLXNjcm9sbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidy1pbmZpbml0ZS1sb2FkZXItcGFuZWxcIiAqbmdJZj1cImlzTG9hZGluZygpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzYXAtaWNvbiBpY29uLXN5bmNocm9uaXplIHUtc3Bpbi1pY29uXCI+PC9zcGFuPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Audy1pbmZpbml0ZS1sb2FkZXItcGFuZWx7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2ZmZjt3aWR0aDoxMDAlO2hlaWdodDoxMDBweDt6LWluZGV4OjMwMDtib3R0b206MTAwcHh9LnctaW5maW5pdGUtbG9hZGVyLXBhbmVsIHNwYW57Y29sb3I6IzRhNGE0YTtmb250LXNpemU6MmVtfWBdLFxufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdFxue1xuICAgIF9sYXN0Q2hlY2s6IG51bWJlciA9IDA7XG4gICAgX2xhc3RTY3JvbGxUb3A6IG51bWJlciA9IDA7XG4gICAgX3NjTHNuOiBhbnk7XG4gICAgX3Rocjogc3RyaW5nID0gJzEwJSc7XG4gICAgX3RoclB4OiBudW1iZXIgPSAwO1xuICAgIF90aHJQYzogbnVtYmVyID0gMC4xMDtcbiAgICBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2NvbnRlbnQ6IGFueTtcbiAgICBfZG9jQm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgc3RhdGU6IHN0cmluZyA9IFNUQVRFX0VOQUJMRUQ7XG5cbiAgICAvKipcbiAgICAgKiBAaW5wdXQge3N0cmluZ30gVGhlIHRocmVzaG9sZCBkaXN0YW5jZSBmcm9tIHRoZSBib3R0b21cbiAgICAgKiBvZiB0aGUgY29udGVudCB0byBjYWxsIHRoZSBgb25Mb2FkYCBvdXRwdXQgZXZlbnQgd2hlbiBzY3JvbGxlZC5cbiAgICAgKiBUaGUgdGhyZXNob2xkIHZhbHVlIGNhbiBiZSBlaXRoZXIgYSBwZXJjZW50LCBvclxuICAgICAqIGluIHBpeGVscy4gRm9yIGV4YW1wbGUsIHVzZSB0aGUgdmFsdWUgb2YgYDEwJWAgZm9yIHRoZSBgaW5maW5pdGVgXG4gICAgICogb3V0cHV0IGV2ZW50IHRvIGdldCBjYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgMTAlXG4gICAgICogZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLiBVc2UgdGhlIHZhbHVlIGAxMDBweGAgd2hlbiB0aGVcbiAgICAgKiBzY3JvbGwgaXMgd2l0aGluIDEwMCBwaXhlbHMgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLlxuICAgICAqIERlZmF1bHQgaXMgYDE1JWAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzdGFuY2UgKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RocjtcbiAgICB9XG5cbiAgICBzZXQgZGlzdGFuY2UgKHZhbDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdGhyID0gdmFsO1xuICAgICAgICBpZiAodmFsLmluZGV4T2YoJyUnKSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl90aHJQeCA9IDA7XG4gICAgICAgICAgICB0aGlzLl90aHJQYyA9IChwYXJzZUZsb2F0KHZhbCkgLyAxMDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90aHJQeCA9IHBhcnNlRmxvYXQodmFsKTtcbiAgICAgICAgICAgIHRoaXMuX3RoclBjID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCB7Ym9vbGVhbn0gSWYgdHJ1ZSwgV2hldGhlciBvciBub3QgdGhlIGluZmluaXRlIHNjcm9sbCBzaG91bGQgYmVcbiAgICAgKiBlbmFibGVkIG9yIG5vdC4gU2V0dGluZyB0byBgZmFsc2VgIHdpbGwgcmVtb3ZlIHNjcm9sbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgKiBhbmQgaGlkZSB0aGUgZGlzcGxheS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBlbmFibGVkIChzaG91bGRFbmFibGU6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICB0aGlzLmVuYWJsZShzaG91bGRFbmFibGUpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQG91dHB1dCB7ZXZlbnR9IEVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsIHJlYWNoZXNcbiAgICAgKiB0aGUgdGhyZXNob2xkIGRpc3RhbmNlLiBGcm9tIHdpdGhpbiB5b3VyIGluZmluaXRlIGhhbmRsZXIsXG4gICAgICogeW91IG11c3QgY2FsbCB0aGUgaW5maW5pdGUgc2Nyb2xsJ3MgYGNvbXBsZXRlKClgIG1ldGhvZCB3aGVuXG4gICAgICogeW91ciBhc3luYyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICAgIEBWaWV3Q2hpbGQoJ2xvYWRpblBhbmVsJylcbiAgICBsb2FkUGFuZWw6IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTGF6eSBsb2FkIGN1cnJlbnQgbnVtYmVycy4gdGVsbCB0aGUgYXBwIHN0YXJ0aW5nIHBvaW50IGFuZCB3aGF0IGlzIHRoZSBzaXplIG9mIGxvYWRlZFxuICAgICAqIGxpc3RcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmV0Y2hTaXplOiBudW1iZXIgPSAwO1xuXG4gICAgbG9hZE9mZnNldDogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX3JlbmRlcjogUmVuZGVyZXIyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tVXRpbHM6IERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKVxuICAgIHtcblxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdoYXMtaW5maW5pdGUtc2Nyb2xsJyk7XG5cbiAgICB9XG5cbiAgICBfb25TY3JvbGwgKGV2OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU1RBVEVfTE9BRElORyB8fCB0aGlzLnN0YXRlID09PSBTVEFURV9ESVNBQkxFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbXVzdCB0aHJvdHRsZSB0aGUgY2xhc3MgYnkgMTAwbXNcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RDaGVjayArIDEwMCA+IGV2LnRpbWVTdGFtcCkge1xuICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBjaGVjayBsZXNzIHRoYW4gZXZlcnkgWFhtc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdENoZWNrID0gZXYudGltZVN0YW1wO1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3AoKTtcblxuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gdGhpcy5kb21VdGlscy5icm93c2VyRGltZW50aW9ucygpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5fZG9jQm9keS5zY3JvbGxIZWlnaHQsIHRoaXMuX2RvY0JvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgd2luSGVpZ2h0LCB0aGlzLl9jb250ZW50LnNjcm9sbEhlaWdodCwgdGhpcy5fY29udGVudC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgIGlmICghaGVpZ2h0KSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBoZWlnaHQgb2YgdGhpcyBlbGVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMuX3RoclBjID8gKGhlaWdodCAqIHRoaXMuX3RoclBjKSA6IHRoaXMuX3RoclB4O1xuICAgICAgICBsZXQgZGlzdGFuY2VGcm9tSW5maW5pdGUgPSB0aGlzLl9jb250ZW50LnNjcm9sbEhlaWdodCAtIHdpbkhlaWdodCAtIHNjcm9sbFRvcCAtIHRocmVzaG9sZDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRG9jdW1lbnQgaGVpZ2h0ICgnICsgaGVpZ2h0ICsgJykgLCBEaXN0YW5jZSBmcm9tIGJvdHRvbSAnXG4gICAgICAgIC8vICsgZGlzdGFuY2VGcm9tSW5maW5pdGUgKyAnLCAgPT4gdGhyZXNob2xkID0gJyArXG4gICAgICAgIC8vICAgICB0aGlzLmRpc3RhbmNlICsgJyAoJyArIHRocmVzaG9sZCArICcpJyk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlRnJvbUluZmluaXRlIDwgMCAmJiB0aGlzLl9sYXN0U2Nyb2xsVG9wIDwgc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVPbkxhenlMb2FkKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXN0U2Nyb2xsVG9wID4gc2Nyb2xsVG9wICYmIHNjcm9sbFRvcCA8IHdpbkhlaWdodFxuICAgICAgICAgICAgJiYgdGhpcy5sb2FkT2Zmc2V0ICE9PSB0aGlzLmZldGNoU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5maXJlT25MYXp5VW5Mb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZG86IHJlZmFjdG9yIHRvIG9uZSBtZXRob2RcbiAgICAgKi9cbiAgICBwcml2YXRlIGZpcmVPbkxhenlMb2FkICgpXG4gICAge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfTE9BRElORyAmJiB0aGlzLnN0YXRlICE9PSBTVEFURV9ESVNBQkxFRCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9MT0FESU5HO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMuZmV0Y2hTaXplLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMubG9hZE9mZnNldFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IG9uIHRoZSBuZXh0IHJlY29yZFxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE9mZnNldCArPSB0aGlzLmZldGNoU2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGZpcmVPbkxhenlVbkxvYWQgKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9MT0FESU5HICYmIHRoaXMuc3RhdGUgIT09IFNUQVRFX0RJU0FCTEVEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0xPQURJTkc7XG5cbiAgICAgICAgICAgICAgICAvLyBzdGFydCBvbiB0aGUgbmV4dCByZWNvcmRcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRPZmZzZXQgPSB0aGlzLmZldGNoU2l6ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5mZXRjaFNpemUsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5sb2FkT2Zmc2V0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBzY3JvbGxUb3AgKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgdGhpcy5fY29udGVudC5zY3JvbGxUb3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgYGNvbXBsZXRlKClgIHdpdGhpbiB0aGUgYGluZmluaXRlYCBvdXRwdXQgZXZlbnQgaGFuZGxlciB3aGVuXG4gICAgICogeW91ciBhc3luYyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZC4gRm9yIGV4YW1wbGUsIHRoZSBgbG9hZGluZ2BcbiAgICAgKiBzdGF0ZSBpcyB3aGlsZSB0aGUgYXBwIGlzIHBlcmZvcm1pbmcgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbixcbiAgICAgKiBzdWNoIGFzIHJlY2VpdmluZyBtb3JlIGRhdGEgZnJvbSBhbiBBSkFYIHJlcXVlc3QgdG8gYWRkIG1vcmUgaXRlbXNcbiAgICAgKiB0byBhIGRhdGEgbGlzdC4gT25jZSB0aGUgZGF0YSBoYXMgYmVlbiByZWNlaXZlZCBhbmQgVUkgdXBkYXRlZCwgeW91XG4gICAgICogdGhlbiBjYWxsIHRoaXMgbWV0aG9kIHRvIHNpZ25pZnkgdGhhdCB0aGUgbG9hZGluZyBoYXMgY29tcGxldGVkLlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgY2hhbmdlIHRoZSBpbmZpbml0ZSBzY3JvbGwncyBzdGF0ZSBmcm9tIGBsb2FkaW5nYFxuICAgICAqIHRvIGBlbmFibGVkYC5cbiAgICAgKi9cbiAgICBjb21wbGV0ZSAoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX0xPQURJTkcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0VOQUJMRUQ7XG5cbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdHJpZ2dlciBleHRyYSBkZXRlY3QgY2hhbmdlcyB0byByZXJlbmRlciBsb2FkaW5nIGljb25cbiAgICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGwgYGVuYWJsZShmYWxzZSlgIHRvIGRpc2FibGUgdGhlIGluZmluaXRlIHNjcm9sbCBmcm9tIGFjdGl2ZWx5XG4gICAgICogdHJ5aW5nIHRvIHJlY2VpdmUgbmV3IGRhdGEgd2hpbGUgc2Nyb2xsaW5nLiBUaGlzIG1ldGhvZCBpcyB1c2VmdWxcbiAgICAgKiB3aGVuIGl0IGlzIGtub3duIHRoYXQgdGhlcmUgaXMgbm8gbW9yZSBkYXRhIHRoYXQgY2FuIGJlIGFkZGVkLCBhbmRcbiAgICAgKiB0aGUgaW5maW5pdGUgc2Nyb2xsIGlzIG5vIGxvbmdlciBuZWVkZWQuXG4gICAgICogQHBhcmFtIHNob3VsZEVuYWJsZSAgSWYgdGhlIGluZmluaXRlIHNjcm9sbCBzaG91bGQgYmVcbiAgICAgKiBlbmFibGVkIG9yIG5vdC4gU2V0dGluZyB0byBgZmFsc2VgIHdpbGwgcmVtb3ZlIHNjcm9sbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgKiBhbmQgaGlkZSB0aGUgZGlzcGxheS5cbiAgICAgKi9cbiAgICBlbmFibGUgKHNob3VsZEVuYWJsZTogYm9vbGVhbilcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAoc2hvdWxkRW5hYmxlID8gU1RBVEVfRU5BQkxFRCA6IFNUQVRFX0RJU0FCTEVEKTtcbiAgICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKHNob3VsZEVuYWJsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byBuYXRpdmUgd2luZG93cyBzY3JvbGwgZXZlbnRcbiAgICAgKi9cbiAgICBfc2V0TGlzdGVuZXJzIChzaG91bGRMaXN0ZW46IGJvb2xlYW4pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZExpc3Rlbikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2NMc24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY0xzbiA9IHRoaXMuX29uU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2NMc24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9zY0xzbikpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3NjTHNuKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NMc24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaXNMb2FkaW5nICgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gU1RBVEVfTE9BRElORztcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQgKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kb2NCb2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICB0aGlzLl9zZXRMaXN0ZW5lcnModGhpcy5zdGF0ZSAhPT0gU1RBVEVfRElTQUJMRUQpO1xuXG4gICAgICAgIGlmICh0aGlzLmxvYWRPZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZU9uTGF6eUxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG5jb25zdCBTVEFURV9FTkFCTEVEID0gJ2VuYWJsZWQnO1xuY29uc3QgU1RBVEVfRElTQUJMRUQgPSAnZGlzYWJsZWQnO1xuY29uc3QgU1RBVEVfTE9BRElORyA9ICdsb2FkaW5nJztcbiJdfQ==