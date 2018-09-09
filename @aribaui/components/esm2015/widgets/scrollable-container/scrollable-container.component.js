/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class ScrollableContainerComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} elementRef
     */
    constructor(env, elementRef) {
        super(env);
        this.env = env;
        this.elementRef = elementRef;
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
        this.direction = 'horizontal';
        /**
         * Defines how flexbox container items should be aligned. Default behavior is LEFT
         *
         */
        this.alignment = 'left';
        this.height = '100%';
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initDefault();
    }
    /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.initDefault();
    }
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
    initDefault() {
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
            this.layoutClass += ` ${this.styleClass}`;
        }
        // make sure we default width and height to some value in case somebody passes null
        if (isBlank(this.width)) {
            this.width = '100%';
        }
        if (isBlank(this.height)) {
            this.height = '100%';
        }
    }
    /**
     * Tells if the horizontal scrollbar is visible
     *
     * @return {?}
     */
    hasHorizontalScroll() {
        /** @type {?} */
        let scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollWidth > scrollContainer.clientWidth;
    }
    /**
     * Tells if the vertical scrollbar is visible
     *
     * @return {?}
     */
    hasVerticalScroll() {
        /** @type {?} */
        let scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    }
}
ScrollableContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-scrollable',
                template: "<div class=\"w-scrollable\" [ngClass]=\"layoutClass\" [style.width]=\"width\"\n     [style.height]=\"height\">\n    <ng-content></ng-content>\n</div>\n",
                styles: [".w-scrollable{display:flex;display:-webkit-flex;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:overflow}.w-scrollable /deep/>*{flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;margin:10px}.u-scrollable-fh{flex-flow:row nowrap;overflow-x:auto;overflow-y:hidden}.u-scrollable-fv{flex-flow:column nowrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fb{flex-flow:row nowrap;overflow-x:auto;overflow-y:auto}.u-scrollable-fv-row{flex-flow:row wrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fn{flex-flow:row wrap}.u-scrollable-al{justify-content:flex-start;-webkit-justify-content:flex-start}.u-scrollable-ar{justify-content:flex-end;-webkit-justify-content:flex-end}.u-scrollable-ac{justify-content:center;-webkit-justify-content:center}.u-scrollable-aj,.u-scrollable-aj-around{justify-content:space-between;-webkit-justify-content:space-between}"]
            }] }
];
/** @nocollapse */
ScrollableContainerComponent.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef }
];
ScrollableContainerComponent.propDecorators = {
    direction: [{ type: Input }],
    alignment: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0Z4RCxNQUFNLG1DQUFvQyxTQUFRLGFBQWE7Ozs7O0lBZ0MzRCxZQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBRTlELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7Ozs7Ozt5QkFqQmxDLFlBQVk7Ozs7O3lCQU9QLE1BQU07UUFjdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDdkI7Ozs7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLE9BQXNCO1FBRTlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7Ozs7Ozs7Ozs7SUFlTyxXQUFXO1FBRWYsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUV4QztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1NBRTVDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1NBRXhDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM3Qzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3hCOzs7Ozs7O0lBUUwsbUJBQW1COztRQUVmLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0tBQ3BFOzs7Ozs7SUFPRCxpQkFBaUI7O1FBRWIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUM7S0FDdEU7OztZQTlISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG1LQUFrRDs7YUFFckQ7Ozs7WUFsRk8sV0FBVztZQURBLFVBQVU7Ozt3QkFrR3hCLEtBQUs7d0JBT0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKiBDb250YWluZXIgcGFuZWwgcHJvdmlkaW5nIHNjcm9sbGluZyBmdW5jdGlvbmFsaXR5IGZvciBpdHMgY2hpbGRyZW4uIFlvdSBjYW4gY29uZmlndXJlIHRoaXNcbiAqIGNvbnRhaW5lciB0byBsZXQgaXQgdG8gc2Nyb2xsIGl0cyBjb250ZW50IGVpdGhlciBob3Jpem9udGFsbHksIHZlcnRpY2FsbHkgb3IgbGV0IHRoZSBjb250ZW50XG4gKiB3cmFwLlxuICpcbiAqXG4gKiBVc2FnZSBpcyBwcmV0dHkgc2ltcGxlOlxuICpcbiAqICAjIyMgRXhhbXBsZSB1c2luZyBob3Jpem9udGFsIHNjcm9sbCAoZGVmYXVsdCBiZWhhdmlvcik6XG4gKlxuICogIGBgYFxuICogICAgICAgICAgICA8YXctc2Nyb2xsYWJsZT5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDE8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAzPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDQ8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA2PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDc8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgODwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA5PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICA8L2F3LXNjcm9sbGFibGU+XG4gKlxuICogIGBgYFxuICpcbiAqICAjIyMgRXhhbXBsZSB1c2luZyB2ZXJ0aWNhbCBzY3JvbGw6XG4gKlxuICogIGBgYFxuICogICAgICAgICAgICA8YXctc2Nyb2xsYWJsZSBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIiBbaGVpZ2h0XT1cIic0MHZoJ1wiPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAyPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDM8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNDwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA1PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDY8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA4PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDk8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgIDwvYXctc2Nyb2xsYWJsZT5cbiAqXG4gKiBgYGBcbiAqXG4gKiAgIyMjIEV4YW1wbGUgc2Nyb2xsaW5nIGlzIGRpc2FibGVkIGFuZCBjb250ZW50IHdyYXBzIGFuZCBjZW50ZXJzOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGUgW2RpcmVjdGlvbl09XCInbm9uZSdcIiBbYWxpZ25tZW50XT1cIidjZW50ZXInXCI+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAxPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDI8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA0PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDU8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA3PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDg8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgOTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgPC9hdy1zY3JvbGxhYmxlPlxuICogIGBgYFxuICpcbiAqICMjIyBIZWlnaHQgcHJvcGVydHk6XG4gKlxuICogV2hlbiB1c2luZyBcImhvcml6b250YWwgc2Nyb2xsaW5nXCIgaXQgc2V0IFwiZmxleGJveC1kaXJlY3Rpb25cIiB0byBcInJvd1wiIHdoZXJlIGhlaWdodFxuICogaXMgc2V0IGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gaXRzIGNvbnRlbnQuIFRoZSBoZWlnaHQgc2hvdWxkIGJlIGFsd2F5cyAxMDAlIHdoZW4gdXNpbmdcbiAqIHRoaXMgaW4gcGFyZW50IGNvbnRhaW5lci5cbiAqXG4gKiBJZiBcInZlcnRpY2FsIHNjcm9sbGluZ1wiIGlzIHVzZWQgeW91IG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQ6XG4gKiAgIC0geW91ciBwYXJlbnQgY29udGFpbmVyIHNldHMgdGhlIGJvdW5kYXJpZXMgd2l0aCBjb3JyZWN0bHkgc2V0IHdpZHRoIGFuZCBoZWlnaHRcbiAqICAgb3RoZXJ3aXNlIGl0IHdpbGwgdXNlIDEwMCUgb2YgdGhlIHZpZXdwb3J0XG4gKiAgIC0gaWYgdXNlZCBhcyBzdGFuZGFsb25lIHlvdSBuZWVkIHRvIGxpbWl0IHRoZSBoZWlnaHQgb3RoZXJ3aXNlIGl0IHdpbGwgZXhwYW5kIHRvIDEwMCUgb2ZcbiAqICAgdGhlIGRvY3VtZW50XG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXNjcm9sbGFibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzY3JvbGxhYmxlLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGVDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgc2Nyb2xsaW5nIGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmVyIG1lYW5pbmcgdGVsbHMgd2hpY2ggb3ZlcmZsb3cgYXhpZXMgd2lsbCBiZVxuICAgICAqIGRpc2FibGVkIG9yIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIFwiaG9yaXpvbnRhbFwiOiBIZXJlIHdlIGxvY2sgb3ZlcmZsb3cteSBhbmQgb3ZlcmZsb3cteCBzZXQgdG8gYXV0by5cbiAgICAgKlxuICAgICAqIFdoZW4gc2Nyb2xsaW5nIGRpcmVjdGlvbiBpcyBcInZlcnRpY2FsXCIgcGxlYXNlIG1ha2Ugc3VyZSB5b3UgbWFpbnRhaW4gY29ycmVjdCBoZWlnaHQgYW5kXG4gICAgICogd2lkdGguXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpcmVjdGlvbjogU2Nyb2xsaW5nRGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgZmxleGJveCBjb250YWluZXIgaXRlbXMgc2hvdWxkIGJlIGFsaWduZWQuIERlZmF1bHQgYmVoYXZpb3IgaXMgTEVGVFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbm1lbnQ6IENvbnRhaW5lckl0ZW1zQWxpZ25tZW50ID0gJ2xlZnQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBwcm9wZXJ0aWVzIGZvciBjYWxjdWxhdGVkIGNsYXNzIGxpc3RcbiAgICAgKi9cblxuICAgIGxheW91dENsYXNzOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIHdlIHJlLWluaXRpYWxpemUgZGVmYXVsdCB3aGVuIElucHV0IEJpbmRpbmdzIGNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGRlZmF1bHQgdmFsdWVzIGFuZCBDYWxjdWxhdGVzIGxheW91dCBhbmQgYWxpZ25tZW50IGNsYXNzLiBUaGUgcmVhc29uIGZvciB1c2luZ1xuICAgICAqIHRoZXNlIHV0aWxpdHkgY2xhc3NlcyBpcyB0aGF0IHdlIGNhbiBjaGFuZ2UgdGhlIGJlaGF2aW9yIGFueXRpbWUgYXMgY29tcGFyZWQgdG8gdXNpbmdcbiAgICAgKiBkaXJlY3RseSBbc3R5bGUueHh4XSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqICMjIyBEaXJlY3Rpb24gZmxvdyBjbGFzczpcbiAgICAgKiAgLSB1LXNjcm9sbGFibGUtZjxkaXJlY3Rpb24+XG4gICAgICpcbiAgICAgKiAjIyMgQWxpZ25tZW50IGNsYXNzOlxuICAgICAqICAtIHUtc2Nyb2xsYWJsZS1hPGFsaWdubWVudD5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERlZmF1bHQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZmgnO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZ2JztcblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsLXJvdycpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZ2LXJvdyc7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mYic7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mbic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dENsYXNzICs9ICcgdS1zY3JvbGxhYmxlLWEnICsgdGhpcy5hbGlnbm1lbnQuc3Vic3RyaW5nKDAsIDEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyArPSBgICR7dGhpcy5zdHlsZUNsYXNzfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgZGVmYXVsdCB3aWR0aCBhbmQgaGVpZ2h0IHRvIHNvbWUgdmFsdWUgaW4gY2FzZSBzb21lYm9keSBwYXNzZXMgbnVsbFxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLndpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhciBpcyB2aXNpYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNIb3Jpem9udGFsU2Nyb2xsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBzY3JvbGxDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudy1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxDb250YWluZXIuc2Nyb2xsV2lkdGggPiBzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGUgdmVydGljYWwgc2Nyb2xsYmFyIGlzIHZpc2libGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc1ZlcnRpY2FsU2Nyb2xsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBzY3JvbGxDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudy1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxDb250YWluZXIuc2Nyb2xsSGVpZ2h0ID4gc2Nyb2xsQ29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgICB9XG59XG5cbi8qKlxuICogU2Nyb2xsaW5nRGlyZWN0aW9uIGlzIGEgbmV3IHR5cGUgdGhhdCBkcml2ZXMgc2Nyb2xsaW5nIGJlaGF2aW9yOlxuICogIC0gaG9yaXpvbnRhbCA9PiBvdmVyZmxvdy14OiBhdXRvLCBvdmVyZmxvdy15OmhpZGRlblxuICogIC0gdmVydGljYWwgPT4gb3ZlcmZsb3cteDogaGlkZGVuLCBvdmVyZmxvdy15OmF1dG9cbiAqICAtIHZlcnRpY2FsLXJvdyA9PiBvdmVyZmxvdy14OiBoaWRkZW4sIG92ZXJmbG93LXk6YXV0bzsgZmxvdzogcm93IHdyYXBcbiAqICAtIGJvdGggPT4gb3ZlcmZsb3cteDogYXV0bywgb3ZlcmZsb3cteTphdXRvXG4gKiAgLSBub25lID0+IHNldHMgZmxvdy1mbG93IHRvIHJvdyB3cmFwXG4gKi9cbmV4cG9ydCB0eXBlIFNjcm9sbGluZ0RpcmVjdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgfCAndmVydGljYWwtcm93JyB8ICdib3RoJyB8ICdub25lJztcblxuXG4vKipcbiAqXG4gKiBDb250cm9scyB0aGUganVzdGlmeS1jb250ZW50IHByb3BlcnR5OlxuICpcbiAqIC0gbGVmdCA9PiBmbGV4LXN0YXJ0XG4gKiAtIHJpZ2h0ID0+IGZsZXgtZW5kXG4gKiAtIGNlbnRlciA9PiBjZW50ZXJcbiAqIC0ganVzdGlmeSA9PiBzcGFjZS1iZXR3ZWVuXG4gKlxuICovXG5leHBvcnQgdHlwZSBDb250YWluZXJJdGVtc0FsaWdubWVudCA9ICdsZWZ0JyB8ICdyaWdodCcgfCAnY2VudGVyJyB8ICdqdXN0aWZ5JztcblxuIl19