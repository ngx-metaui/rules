/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/**
 *
 * Container panel providing scrolling functionality for its children. You can configure this
 * container to let it to scroll its content either horizontally, vertically or let the content
 * wrap.
 *
 *
 * Usage is pretty simple:
 *
 *  ### Example using horizontal scroll (default behavior):
 *
 *  ```
 *            <aw-scrollable>
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *
 *  ```
 *
 *  ### Example using vertical scroll:
 *
 *  ```
 *            <aw-scrollable [direction]="'vertical'" [height]="'40vh'">
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *
 * ```
 *
 *  ### Example scrolling is disabled and content wraps and centers:
 *
 *  ```
 *            <aw-scrollable [direction]="'none'" [alignment]="'center'">
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *  ```
 *
 * ### Height property:
 *
 * When using "horizontal scrolling" it set "flexbox-direction" to "row" where height
 * is set automatically based on its content. The height should be always 100% when using
 * this in parent container.
 *
 * If "vertical scrolling" is used you need to make sure that:
 *   - your parent container sets the boundaries with correctly set width and height
 *   otherwise it will use 100% of the viewport
 *   - if used as standalone you need to limit the height otherwise it will expand to 100% of
 *   the document
 *
 *
 *
 *
 */
var ScrollableContainerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollableContainerComponent, _super);
    function ScrollableContainerComponent(env, elementRef) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.elementRef = elementRef;
        /**
         * Defines scrolling direction of the container meaning tells which overflow axies will be
         * disabled or enabled.
         *
         * Default value is "horizontal": Here we lock overflow-y and overflow-x set to auto.
         *
         * When scrolling direction is "vertical" please make sure you maintain correct height and
         * width.
         *
         */
        _this.direction = 'horizontal';
        /**
         * Defines how flexbox container items should be aligned. Default behavior is LEFT
         *
         */
        _this.alignment = 'left';
        _this.height = '100%';
        _this.width = '100%';
        return _this;
    }
    /**
     * @return {?}
     */
    ScrollableContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initDefault();
    };
    /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     */
    /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     * @param {?} changes
     * @return {?}
     */
    ScrollableContainerComponent.prototype.ngOnChanges = /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.initDefault();
    };
    /**
     * Initialize default values and Calculates layout and alignment class. The reason for using
     * these utility classes is that we can change the behavior anytime as compared to using
     * directly [style.xxx] bindings.
     *
     * ### Direction flow class:
     *  - u-scrollable-f<direction>
     *
     * ### Alignment class:
     *  - u-scrollable-a<alignment>
     *
     * @return {?}
     */
    ScrollableContainerComponent.prototype.initDefault = /**
     * Initialize default values and Calculates layout and alignment class. The reason for using
     * these utility classes is that we can change the behavior anytime as compared to using
     * directly [style.xxx] bindings.
     *
     * ### Direction flow class:
     *  - u-scrollable-f<direction>
     *
     * ### Alignment class:
     *  - u-scrollable-a<alignment>
     *
     * @return {?}
     */
    function () {
        this.layoutClass = 'u-scrollable-fh';
        if (this.direction === 'vertical') {
            this.layoutClass = 'u-scrollable-fv';
        }
        if (this.direction === 'vertical-row') {
            this.layoutClass = 'u-scrollable-fv-row';
        }
        else if (this.direction === 'both') {
            this.layoutClass = 'u-scrollable-fb';
        }
        else if (this.direction === 'none') {
            this.layoutClass = 'u-scrollable-fn';
        }
        this.layoutClass += ' u-scrollable-a' + this.alignment.substring(0, 1);
        if (isPresent(this.styleClass)) {
            this.layoutClass += " " + this.styleClass;
        }
        // make sure we default width and height to some value in case somebody passes null
        if (isBlank(this.width)) {
            this.width = '100%';
        }
        if (isBlank(this.height)) {
            this.height = '100%';
        }
    };
    /**
     * Tells if the horizontal scrollbar is visible
     *
     */
    /**
     * Tells if the horizontal scrollbar is visible
     *
     * @return {?}
     */
    ScrollableContainerComponent.prototype.hasHorizontalScroll = /**
     * Tells if the horizontal scrollbar is visible
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollWidth > scrollContainer.clientWidth;
    };
    /**
     * Tells if the vertical scrollbar is visible
     *
     */
    /**
     * Tells if the vertical scrollbar is visible
     *
     * @return {?}
     */
    ScrollableContainerComponent.prototype.hasVerticalScroll = /**
     * Tells if the vertical scrollbar is visible
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    };
    ScrollableContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-scrollable',
                    template: "<div class=\"w-scrollable\" [ngClass]=\"layoutClass\" [style.width]=\"width\"\n     [style.height]=\"height\">\n    <ng-content></ng-content>\n</div>\n",
                    styles: [".w-scrollable{display:flex;display:-webkit-flex;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:overflow}.w-scrollable /deep/>*{flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;margin:10px}.u-scrollable-fh{flex-flow:row nowrap;overflow-x:auto;overflow-y:hidden}.u-scrollable-fv{flex-flow:column nowrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fb{flex-flow:row nowrap;overflow-x:auto;overflow-y:auto}.u-scrollable-fv-row{flex-flow:row wrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fn{flex-flow:row wrap}.u-scrollable-al{justify-content:flex-start;-webkit-justify-content:flex-start}.u-scrollable-ar{justify-content:flex-end;-webkit-justify-content:flex-end}.u-scrollable-ac{justify-content:center;-webkit-justify-content:center}.u-scrollable-aj,.u-scrollable-aj-around{justify-content:space-between;-webkit-justify-content:space-between}"]
                }] }
    ];
    /** @nocollapse */
    ScrollableContainerComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ElementRef }
    ]; };
    ScrollableContainerComponent.propDecorators = {
        direction: [{ type: Input }],
        alignment: [{ type: Input }]
    };
    return ScrollableContainerComponent;
}(BaseComponent));
export { ScrollableContainerComponent };
if (false) {
    /**
     * Defines scrolling direction of the container meaning tells which overflow axies will be
     * disabled or enabled.
     *
     * Default value is "horizontal": Here we lock overflow-y and overflow-x set to auto.
     *
     * When scrolling direction is "vertical" please make sure you maintain correct height and
     * width.
     *
     * @type {?}
     */
    ScrollableContainerComponent.prototype.direction;
    /**
     * Defines how flexbox container items should be aligned. Default behavior is LEFT
     *
     * @type {?}
     */
    ScrollableContainerComponent.prototype.alignment;
    /**
     * Internal properties for calculated class list
     * @type {?}
     */
    ScrollableContainerComponent.prototype.layoutClass;
    /** @type {?} */
    ScrollableContainerComponent.prototype.env;
    /** @type {?} */
    ScrollableContainerComponent.prototype.elementRef;
}
/** @typedef {?} */
var ScrollingDirection;
export { ScrollingDirection };
/** @typedef {?} */
var ContainerItemsAlignment;
export { ContainerItemsAlignment };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrRk4sd0RBQWE7SUFnQzNELHNDQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBSWI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGdCQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7Ozs7OzswQkFqQmxDLFlBQVk7Ozs7OzBCQU9QLE1BQU07UUFjdkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7O0tBQ3ZCOzs7O0lBRUQsK0NBQVE7OztJQUFSO1FBRUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCO0lBR0Q7OztPQUdHOzs7Ozs7O0lBQ0gsa0RBQVc7Ozs7OztJQUFYLFVBQVksT0FBc0I7UUFFOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7Ozs7Ozs7OztJQWVPLGtEQUFXOzs7Ozs7Ozs7Ozs7OztRQUVmLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7U0FFeEM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQztTQUU1QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUV4QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUN4QztRQUVELElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLElBQUksTUFBSSxJQUFJLENBQUMsVUFBWSxDQUFDO1NBQzdDOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDeEI7O0lBSUw7OztPQUdHOzs7Ozs7SUFDSCwwREFBbUI7Ozs7O0lBQW5COztRQUVJLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0tBQ3BFO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCx3REFBaUI7Ozs7O0lBQWpCOztRQUVJLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDO0tBQ3RFOztnQkE5SEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixtS0FBa0Q7O2lCQUVyRDs7OztnQkFsRk8sV0FBVztnQkFEQSxVQUFVOzs7NEJBa0d4QixLQUFLOzRCQU9MLEtBQUs7O3VDQTdIVjtFQXdHa0QsYUFBYTtTQUFsRCw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogQ29udGFpbmVyIHBhbmVsIHByb3ZpZGluZyBzY3JvbGxpbmcgZnVuY3Rpb25hbGl0eSBmb3IgaXRzIGNoaWxkcmVuLiBZb3UgY2FuIGNvbmZpZ3VyZSB0aGlzXG4gKiBjb250YWluZXIgdG8gbGV0IGl0IHRvIHNjcm9sbCBpdHMgY29udGVudCBlaXRoZXIgaG9yaXpvbnRhbGx5LCB2ZXJ0aWNhbGx5IG9yIGxldCB0aGUgY29udGVudFxuICogd3JhcC5cbiAqXG4gKlxuICogVXNhZ2UgaXMgcHJldHR5IHNpbXBsZTpcbiAqXG4gKiAgIyMjIEV4YW1wbGUgdXNpbmcgaG9yaXpvbnRhbCBzY3JvbGwgKGRlZmF1bHQgYmVoYXZpb3IpOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGU+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAxPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDI8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA0PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDU8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA3PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDg8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgOTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgPC9hdy1zY3JvbGxhYmxlPlxuICpcbiAqICBgYGBcbiAqXG4gKiAgIyMjIEV4YW1wbGUgdXNpbmcgdmVydGljYWwgc2Nyb2xsOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGUgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCIgW2hlaWdodF09XCInNDB2aCdcIj5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDE8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAzPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDQ8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA2PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDc8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgODwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA5PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICA8L2F3LXNjcm9sbGFibGU+XG4gKlxuICogYGBgXG4gKlxuICogICMjIyBFeGFtcGxlIHNjcm9sbGluZyBpcyBkaXNhYmxlZCBhbmQgY29udGVudCB3cmFwcyBhbmQgY2VudGVyczpcbiAqXG4gKiAgYGBgXG4gKiAgICAgICAgICAgIDxhdy1zY3JvbGxhYmxlIFtkaXJlY3Rpb25dPVwiJ25vbmUnXCIgW2FsaWdubWVudF09XCInY2VudGVyJ1wiPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAyPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDM8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNDwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA1PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDY8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA4PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDk8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgIDwvYXctc2Nyb2xsYWJsZT5cbiAqICBgYGBcbiAqXG4gKiAjIyMgSGVpZ2h0IHByb3BlcnR5OlxuICpcbiAqIFdoZW4gdXNpbmcgXCJob3Jpem9udGFsIHNjcm9sbGluZ1wiIGl0IHNldCBcImZsZXhib3gtZGlyZWN0aW9uXCIgdG8gXCJyb3dcIiB3aGVyZSBoZWlnaHRcbiAqIGlzIHNldCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIGl0cyBjb250ZW50LiBUaGUgaGVpZ2h0IHNob3VsZCBiZSBhbHdheXMgMTAwJSB3aGVuIHVzaW5nXG4gKiB0aGlzIGluIHBhcmVudCBjb250YWluZXIuXG4gKlxuICogSWYgXCJ2ZXJ0aWNhbCBzY3JvbGxpbmdcIiBpcyB1c2VkIHlvdSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0OlxuICogICAtIHlvdXIgcGFyZW50IGNvbnRhaW5lciBzZXRzIHRoZSBib3VuZGFyaWVzIHdpdGggY29ycmVjdGx5IHNldCB3aWR0aCBhbmQgaGVpZ2h0XG4gKiAgIG90aGVyd2lzZSBpdCB3aWxsIHVzZSAxMDAlIG9mIHRoZSB2aWV3cG9ydFxuICogICAtIGlmIHVzZWQgYXMgc3RhbmRhbG9uZSB5b3UgbmVlZCB0byBsaW1pdCB0aGUgaGVpZ2h0IG90aGVyd2lzZSBpdCB3aWxsIGV4cGFuZCB0byAxMDAlIG9mXG4gKiAgIHRoZSBkb2N1bWVudFxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zY3JvbGxhYmxlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3Njcm9sbGFibGUtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxhYmxlQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHNjcm9sbGluZyBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5lciBtZWFuaW5nIHRlbGxzIHdoaWNoIG92ZXJmbG93IGF4aWVzIHdpbGwgYmVcbiAgICAgKiBkaXNhYmxlZCBvciBlbmFibGVkLlxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBcImhvcml6b250YWxcIjogSGVyZSB3ZSBsb2NrIG92ZXJmbG93LXkgYW5kIG92ZXJmbG93LXggc2V0IHRvIGF1dG8uXG4gICAgICpcbiAgICAgKiBXaGVuIHNjcm9sbGluZyBkaXJlY3Rpb24gaXMgXCJ2ZXJ0aWNhbFwiIHBsZWFzZSBtYWtlIHN1cmUgeW91IG1haW50YWluIGNvcnJlY3QgaGVpZ2h0IGFuZFxuICAgICAqIHdpZHRoLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXJlY3Rpb246IFNjcm9sbGluZ0RpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IGZsZXhib3ggY29udGFpbmVyIGl0ZW1zIHNob3VsZCBiZSBhbGlnbmVkLiBEZWZhdWx0IGJlaGF2aW9yIGlzIExFRlRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxpZ25tZW50OiBDb250YWluZXJJdGVtc0FsaWdubWVudCA9ICdsZWZ0JztcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgcHJvcGVydGllcyBmb3IgY2FsY3VsYXRlZCBjbGFzcyBsaXN0XG4gICAgICovXG5cbiAgICBsYXlvdXRDbGFzczogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB0aGlzLndpZHRoID0gJzEwMCUnO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdERlZmF1bHQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSB3ZSByZS1pbml0aWFsaXplIGRlZmF1bHQgd2hlbiBJbnB1dCBCaW5kaW5ncyBjaGFuZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlcyBhbmQgQ2FsY3VsYXRlcyBsYXlvdXQgYW5kIGFsaWdubWVudCBjbGFzcy4gVGhlIHJlYXNvbiBmb3IgdXNpbmdcbiAgICAgKiB0aGVzZSB1dGlsaXR5IGNsYXNzZXMgaXMgdGhhdCB3ZSBjYW4gY2hhbmdlIHRoZSBiZWhhdmlvciBhbnl0aW1lIGFzIGNvbXBhcmVkIHRvIHVzaW5nXG4gICAgICogZGlyZWN0bHkgW3N0eWxlLnh4eF0gYmluZGluZ3MuXG4gICAgICpcbiAgICAgKiAjIyMgRGlyZWN0aW9uIGZsb3cgY2xhc3M6XG4gICAgICogIC0gdS1zY3JvbGxhYmxlLWY8ZGlyZWN0aW9uPlxuICAgICAqXG4gICAgICogIyMjIEFsaWdubWVudCBjbGFzczpcbiAgICAgKiAgLSB1LXNjcm9sbGFibGUtYTxhbGlnbm1lbnQ+XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXREZWZhdWx0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZoJztcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mdic7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbC1yb3cnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mdi1yb3cnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdib3RoJykge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZmInO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdub25lJykge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZm4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyArPSAnIHUtc2Nyb2xsYWJsZS1hJyArIHRoaXMuYWxpZ25tZW50LnN1YnN0cmluZygwLCAxKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3R5bGVDbGFzcykpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgKz0gYCAke3RoaXMuc3R5bGVDbGFzc31gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGRlZmF1bHQgd2lkdGggYW5kIGhlaWdodCB0byBzb21lIHZhbHVlIGluIGNhc2Ugc29tZWJvZHkgcGFzc2VzIG51bGxcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmhlaWdodCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgaXMgdmlzaWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaGFzSG9yaXpvbnRhbFNjcm9sbCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgc2Nyb2xsQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnctc2Nyb2xsYWJsZScpO1xuICAgICAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFdpZHRoID4gc2Nyb2xsQ29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgdGhlIHZlcnRpY2FsIHNjcm9sbGJhciBpcyB2aXNpYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNWZXJ0aWNhbFNjcm9sbCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgc2Nyb2xsQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnctc2Nyb2xsYWJsZScpO1xuICAgICAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbEhlaWdodCA+IHNjcm9sbENvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFNjcm9sbGluZ0RpcmVjdGlvbiBpcyBhIG5ldyB0eXBlIHRoYXQgZHJpdmVzIHNjcm9sbGluZyBiZWhhdmlvcjpcbiAqICAtIGhvcml6b250YWwgPT4gb3ZlcmZsb3cteDogYXV0bywgb3ZlcmZsb3cteTpoaWRkZW5cbiAqICAtIHZlcnRpY2FsID0+IG92ZXJmbG93LXg6IGhpZGRlbiwgb3ZlcmZsb3cteTphdXRvXG4gKiAgLSB2ZXJ0aWNhbC1yb3cgPT4gb3ZlcmZsb3cteDogaGlkZGVuLCBvdmVyZmxvdy15OmF1dG87IGZsb3c6IHJvdyB3cmFwXG4gKiAgLSBib3RoID0+IG92ZXJmbG93LXg6IGF1dG8sIG92ZXJmbG93LXk6YXV0b1xuICogIC0gbm9uZSA9PiBzZXRzIGZsb3ctZmxvdyB0byByb3cgd3JhcFxuICovXG5leHBvcnQgdHlwZSBTY3JvbGxpbmdEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHwgJ3ZlcnRpY2FsLXJvdycgfCAnYm90aCcgfCAnbm9uZSc7XG5cblxuLyoqXG4gKlxuICogQ29udHJvbHMgdGhlIGp1c3RpZnktY29udGVudCBwcm9wZXJ0eTpcbiAqXG4gKiAtIGxlZnQgPT4gZmxleC1zdGFydFxuICogLSByaWdodCA9PiBmbGV4LWVuZFxuICogLSBjZW50ZXIgPT4gY2VudGVyXG4gKiAtIGp1c3RpZnkgPT4gc3BhY2UtYmV0d2VlblxuICpcbiAqL1xuZXhwb3J0IHR5cGUgQ29udGFpbmVySXRlbXNBbGlnbm1lbnQgPSAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgfCAnanVzdGlmeSc7XG5cbiJdfQ==