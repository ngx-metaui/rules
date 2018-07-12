/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
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
        var /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    };
    ScrollableContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-scrollable',
                    template: "<div class=\"w-scrollable\" [ngClass]=\"layoutClass\" [style.width]=\"width\"\n     [style.height]=\"height\">\n    <ng-content></ng-content>\n</div>\n",
                    styles: [".w-scrollable{display:flex;display:-webkit-flex;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:overflow}.w-scrollable /deep/>*{flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;margin:10px}.u-scrollable-fh{flex-flow:row nowrap;overflow-x:auto;overflow-y:hidden}.u-scrollable-fv{flex-flow:column nowrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fb{flex-flow:row nowrap;overflow-x:auto;overflow-y:auto}.u-scrollable-fv-row{flex-flow:row wrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fn{flex-flow:row wrap}.u-scrollable-al{justify-content:flex-start;-webkit-justify-content:flex-start}.u-scrollable-ar{justify-content:flex-end;-webkit-justify-content:flex-end}.u-scrollable-ac{justify-content:center;-webkit-justify-content:center}.u-scrollable-aj,.u-scrollable-aj-around{justify-content:space-between;-webkit-justify-content:space-between}"]
                },] },
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
function ScrollableContainerComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzRk4sd0RBQWE7SUFnQzNELHNDQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBSWI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGdCQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7Ozs7OzswQkFqQmxDLFlBQVk7Ozs7OzBCQU9QLE1BQU07UUFjdkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7O0tBQ3ZCOzs7O0lBRUQsK0NBQVE7OztJQUFSO1FBRUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCO0lBR0Q7OztPQUdHOzs7Ozs7O0lBQ0gsa0RBQVc7Ozs7OztJQUFYLFVBQVksT0FBc0I7UUFFOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7Ozs7Ozs7OztJQWVPLGtEQUFXOzs7Ozs7Ozs7Ozs7OztRQUVmLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7U0FFeEM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQztTQUU1QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUV4QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUN4QztRQUVELElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLElBQUksTUFBSSxJQUFJLENBQUMsVUFBWSxDQUFDO1NBQzdDOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDeEI7O0lBSUw7OztPQUdHOzs7Ozs7SUFDSCwwREFBbUI7Ozs7O0lBQW5CO1FBRUkscUJBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0tBQ3BFO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCx3REFBaUI7Ozs7O0lBQWpCO1FBRUkscUJBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDO0tBQ3RFOztnQkFsSUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUseUpBSWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsbTNCQUFtM0IsQ0FBQztpQkFDaDRCOzs7O2dCQXRGTyxXQUFXO2dCQURBLFVBQVU7Ozs0QkFzR3hCLEtBQUs7NEJBT0wsS0FBSzs7dUNBaklWO0VBNEdrRCxhQUFhO1NBQWxELDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKiBDb250YWluZXIgcGFuZWwgcHJvdmlkaW5nIHNjcm9sbGluZyBmdW5jdGlvbmFsaXR5IGZvciBpdHMgY2hpbGRyZW4uIFlvdSBjYW4gY29uZmlndXJlIHRoaXNcbiAqIGNvbnRhaW5lciB0byBsZXQgaXQgdG8gc2Nyb2xsIGl0cyBjb250ZW50IGVpdGhlciBob3Jpem9udGFsbHksIHZlcnRpY2FsbHkgb3IgbGV0IHRoZSBjb250ZW50XG4gKiB3cmFwLlxuICpcbiAqXG4gKiBVc2FnZSBpcyBwcmV0dHkgc2ltcGxlOlxuICpcbiAqICAjIyMgRXhhbXBsZSB1c2luZyBob3Jpem9udGFsIHNjcm9sbCAoZGVmYXVsdCBiZWhhdmlvcik6XG4gKlxuICogIGBgYFxuICogICAgICAgICAgICA8YXctc2Nyb2xsYWJsZT5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDE8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAzPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDQ8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA2PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDc8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgODwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA5PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICA8L2F3LXNjcm9sbGFibGU+XG4gKlxuICogIGBgYFxuICpcbiAqICAjIyMgRXhhbXBsZSB1c2luZyB2ZXJ0aWNhbCBzY3JvbGw6XG4gKlxuICogIGBgYFxuICogICAgICAgICAgICA8YXctc2Nyb2xsYWJsZSBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIiBbaGVpZ2h0XT1cIic0MHZoJ1wiPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAyPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDM8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNDwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA1PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDY8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA4PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDk8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgIDwvYXctc2Nyb2xsYWJsZT5cbiAqXG4gKiBgYGBcbiAqXG4gKiAgIyMjIEV4YW1wbGUgc2Nyb2xsaW5nIGlzIGRpc2FibGVkIGFuZCBjb250ZW50IHdyYXBzIGFuZCBjZW50ZXJzOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGUgW2RpcmVjdGlvbl09XCInbm9uZSdcIiBbYWxpZ25tZW50XT1cIidjZW50ZXInXCI+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAxPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDI8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA0PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDU8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA3PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDg8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgOTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgPC9hdy1zY3JvbGxhYmxlPlxuICogIGBgYFxuICpcbiAqICMjIyBIZWlnaHQgcHJvcGVydHk6XG4gKlxuICogV2hlbiB1c2luZyBcImhvcml6b250YWwgc2Nyb2xsaW5nXCIgaXQgc2V0IFwiZmxleGJveC1kaXJlY3Rpb25cIiB0byBcInJvd1wiIHdoZXJlIGhlaWdodFxuICogaXMgc2V0IGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gaXRzIGNvbnRlbnQuIFRoZSBoZWlnaHQgc2hvdWxkIGJlIGFsd2F5cyAxMDAlIHdoZW4gdXNpbmdcbiAqIHRoaXMgaW4gcGFyZW50IGNvbnRhaW5lci5cbiAqXG4gKiBJZiBcInZlcnRpY2FsIHNjcm9sbGluZ1wiIGlzIHVzZWQgeW91IG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQ6XG4gKiAgIC0geW91ciBwYXJlbnQgY29udGFpbmVyIHNldHMgdGhlIGJvdW5kYXJpZXMgd2l0aCBjb3JyZWN0bHkgc2V0IHdpZHRoIGFuZCBoZWlnaHRcbiAqICAgb3RoZXJ3aXNlIGl0IHdpbGwgdXNlIDEwMCUgb2YgdGhlIHZpZXdwb3J0XG4gKiAgIC0gaWYgdXNlZCBhcyBzdGFuZGFsb25lIHlvdSBuZWVkIHRvIGxpbWl0IHRoZSBoZWlnaHQgb3RoZXJ3aXNlIGl0IHdpbGwgZXhwYW5kIHRvIDEwMCUgb2ZcbiAqICAgdGhlIGRvY3VtZW50XG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXNjcm9sbGFibGUnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInctc2Nyb2xsYWJsZVwiIFtuZ0NsYXNzXT1cImxheW91dENsYXNzXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoXCJcbiAgICAgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC53LXNjcm9sbGFibGV7ZGlzcGxheTpmbGV4O2Rpc3BsYXk6LXdlYmtpdC1mbGV4O2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47d2lsbC1jaGFuZ2U6b3ZlcmZsb3d9Lnctc2Nyb2xsYWJsZSAvZGVlcC8+KntmbGV4OjAgMCBhdXRvOy13ZWJraXQtZmxleDowIDAgYXV0bzstbXMtZmxleDowIDAgYXV0bzttYXJnaW46MTBweH0udS1zY3JvbGxhYmxlLWZoe2ZsZXgtZmxvdzpyb3cgbm93cmFwO292ZXJmbG93LXg6YXV0bztvdmVyZmxvdy15OmhpZGRlbn0udS1zY3JvbGxhYmxlLWZ2e2ZsZXgtZmxvdzpjb2x1bW4gbm93cmFwO292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6YXV0b30udS1zY3JvbGxhYmxlLWZie2ZsZXgtZmxvdzpyb3cgbm93cmFwO292ZXJmbG93LXg6YXV0bztvdmVyZmxvdy15OmF1dG99LnUtc2Nyb2xsYWJsZS1mdi1yb3d7ZmxleC1mbG93OnJvdyB3cmFwO292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6YXV0b30udS1zY3JvbGxhYmxlLWZue2ZsZXgtZmxvdzpyb3cgd3JhcH0udS1zY3JvbGxhYmxlLWFse2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0Oy13ZWJraXQtanVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9LnUtc2Nyb2xsYWJsZS1hcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LnUtc2Nyb2xsYWJsZS1hY3tqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtanVzdGlmeS1jb250ZW50OmNlbnRlcn0udS1zY3JvbGxhYmxlLWFqLC51LXNjcm9sbGFibGUtYWotYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOy13ZWJraXQtanVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59YF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsYWJsZUNvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBzY3JvbGxpbmcgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluZXIgbWVhbmluZyB0ZWxscyB3aGljaCBvdmVyZmxvdyBheGllcyB3aWxsIGJlXG4gICAgICogZGlzYWJsZWQgb3IgZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgXCJob3Jpem9udGFsXCI6IEhlcmUgd2UgbG9jayBvdmVyZmxvdy15IGFuZCBvdmVyZmxvdy14IHNldCB0byBhdXRvLlxuICAgICAqXG4gICAgICogV2hlbiBzY3JvbGxpbmcgZGlyZWN0aW9uIGlzIFwidmVydGljYWxcIiBwbGVhc2UgbWFrZSBzdXJlIHlvdSBtYWludGFpbiBjb3JyZWN0IGhlaWdodCBhbmRcbiAgICAgKiB3aWR0aC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlyZWN0aW9uOiBTY3JvbGxpbmdEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyBmbGV4Ym94IGNvbnRhaW5lciBpdGVtcyBzaG91bGQgYmUgYWxpZ25lZC4gRGVmYXVsdCBiZWhhdmlvciBpcyBMRUZUXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFsaWdubWVudDogQ29udGFpbmVySXRlbXNBbGlnbm1lbnQgPSAnbGVmdCc7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIHByb3BlcnRpZXMgZm9yIGNhbGN1bGF0ZWQgY2xhc3MgbGlzdFxuICAgICAqL1xuXG4gICAgbGF5b3V0Q2xhc3M6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgdGhpcy53aWR0aCA9ICcxMDAlJztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgd2UgcmUtaW5pdGlhbGl6ZSBkZWZhdWx0IHdoZW4gSW5wdXQgQmluZGluZ3MgY2hhbmdlc1xuICAgICAqXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdERlZmF1bHQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgZGVmYXVsdCB2YWx1ZXMgYW5kIENhbGN1bGF0ZXMgbGF5b3V0IGFuZCBhbGlnbm1lbnQgY2xhc3MuIFRoZSByZWFzb24gZm9yIHVzaW5nXG4gICAgICogdGhlc2UgdXRpbGl0eSBjbGFzc2VzIGlzIHRoYXQgd2UgY2FuIGNoYW5nZSB0aGUgYmVoYXZpb3IgYW55dGltZSBhcyBjb21wYXJlZCB0byB1c2luZ1xuICAgICAqIGRpcmVjdGx5IFtzdHlsZS54eHhdIGJpbmRpbmdzLlxuICAgICAqXG4gICAgICogIyMjIERpcmVjdGlvbiBmbG93IGNsYXNzOlxuICAgICAqICAtIHUtc2Nyb2xsYWJsZS1mPGRpcmVjdGlvbj5cbiAgICAgKlxuICAgICAqICMjIyBBbGlnbm1lbnQgY2xhc3M6XG4gICAgICogIC0gdS1zY3JvbGxhYmxlLWE8YWxpZ25tZW50PlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGVmYXVsdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1maCc7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZnYnO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwtcm93Jykge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZnYtcm93JztcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYm90aCcpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZiJztcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgKz0gJyB1LXNjcm9sbGFibGUtYScgKyB0aGlzLmFsaWdubWVudC5zdWJzdHJpbmcoMCwgMSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0eWxlQ2xhc3MpKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzICs9IGAgJHt0aGlzLnN0eWxlQ2xhc3N9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkZWZhdWx0IHdpZHRoIGFuZCBoZWlnaHQgdG8gc29tZSB2YWx1ZSBpbiBjYXNlIHNvbWVib2R5IHBhc3NlcyBudWxsXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgdGhlIGhvcml6b250YWwgc2Nyb2xsYmFyIGlzIHZpc2libGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0hvcml6b250YWxTY3JvbGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IHNjcm9sbENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53LXNjcm9sbGFibGUnKTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5zY3JvbGxXaWR0aCA+IHNjcm9sbENvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSB2ZXJ0aWNhbCBzY3JvbGxiYXIgaXMgdmlzaWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaGFzVmVydGljYWxTY3JvbGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IHNjcm9sbENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53LXNjcm9sbGFibGUnKTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5zY3JvbGxIZWlnaHQgPiBzY3JvbGxDb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTY3JvbGxpbmdEaXJlY3Rpb24gaXMgYSBuZXcgdHlwZSB0aGF0IGRyaXZlcyBzY3JvbGxpbmcgYmVoYXZpb3I6XG4gKiAgLSBob3Jpem9udGFsID0+IG92ZXJmbG93LXg6IGF1dG8sIG92ZXJmbG93LXk6aGlkZGVuXG4gKiAgLSB2ZXJ0aWNhbCA9PiBvdmVyZmxvdy14OiBoaWRkZW4sIG92ZXJmbG93LXk6YXV0b1xuICogIC0gdmVydGljYWwtcm93ID0+IG92ZXJmbG93LXg6IGhpZGRlbiwgb3ZlcmZsb3cteTphdXRvOyBmbG93OiByb3cgd3JhcFxuICogIC0gYm90aCA9PiBvdmVyZmxvdy14OiBhdXRvLCBvdmVyZmxvdy15OmF1dG9cbiAqICAtIG5vbmUgPT4gc2V0cyBmbG93LWZsb3cgdG8gcm93IHdyYXBcbiAqL1xuZXhwb3J0IHR5cGUgU2Nyb2xsaW5nRGlyZWN0aW9uID0gJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB8ICd2ZXJ0aWNhbC1yb3cnIHwgJ2JvdGgnIHwgJ25vbmUnO1xuXG5cbi8qKlxuICpcbiAqIENvbnRyb2xzIHRoZSBqdXN0aWZ5LWNvbnRlbnQgcHJvcGVydHk6XG4gKlxuICogLSBsZWZ0ID0+IGZsZXgtc3RhcnRcbiAqIC0gcmlnaHQgPT4gZmxleC1lbmRcbiAqIC0gY2VudGVyID0+IGNlbnRlclxuICogLSBqdXN0aWZ5ID0+IHNwYWNlLWJldHdlZW5cbiAqXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRhaW5lckl0ZW1zQWxpZ25tZW50ID0gJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdjZW50ZXInIHwgJ2p1c3RpZnknO1xuXG4iXX0=