/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollWidth > scrollContainer.clientWidth;
    }
    /**
     * Tells if the vertical scrollbar is visible
     *
     * @return {?}
     */
    hasVerticalScroll() {
        let /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    }
}
ScrollableContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-scrollable',
                template: `<div class="w-scrollable" [ngClass]="layoutClass" [style.width]="width"
     [style.height]="height">
    <ng-content></ng-content>
</div>
`,
                styles: [`.w-scrollable{display:flex;display:-webkit-flex;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:overflow}.w-scrollable /deep/>*{flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;margin:10px}.u-scrollable-fh{flex-flow:row nowrap;overflow-x:auto;overflow-y:hidden}.u-scrollable-fv{flex-flow:column nowrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fb{flex-flow:row nowrap;overflow-x:auto;overflow-y:auto}.u-scrollable-fv-row{flex-flow:row wrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fn{flex-flow:row wrap}.u-scrollable-al{justify-content:flex-start;-webkit-justify-content:flex-start}.u-scrollable-ar{justify-content:flex-end;-webkit-justify-content:flex-end}.u-scrollable-ac{justify-content:center;-webkit-justify-content:center}.u-scrollable-aj,.u-scrollable-aj-around{justify-content:space-between;-webkit-justify-content:space-between}`]
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0Z4RCxNQUFNLG1DQUFvQyxTQUFRLGFBQWE7Ozs7O0lBZ0MzRCxZQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBRTlELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7Ozs7Ozt5QkFqQmxDLFlBQVk7Ozs7O3lCQU9QLE1BQU07UUFjdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDdkI7Ozs7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLE9BQXNCO1FBRTlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7Ozs7Ozs7Ozs7SUFlTyxXQUFXO1FBRWYsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztTQUV4QztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1NBRTVDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1NBRXhDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM3Qzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3hCOzs7Ozs7O0lBUUwsbUJBQW1CO1FBRWYscUJBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO0tBQ3BFOzs7Ozs7SUFPRCxpQkFBaUI7UUFFYixxQkFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUM7S0FDdEU7OztZQWxJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7OztDQUliO2dCQUNHLE1BQU0sRUFBRSxDQUFDLG0zQkFBbTNCLENBQUM7YUFDaDRCOzs7O1lBdEZPLFdBQVc7WUFEQSxVQUFVOzs7d0JBc0d4QixLQUFLO3dCQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogQ29udGFpbmVyIHBhbmVsIHByb3ZpZGluZyBzY3JvbGxpbmcgZnVuY3Rpb25hbGl0eSBmb3IgaXRzIGNoaWxkcmVuLiBZb3UgY2FuIGNvbmZpZ3VyZSB0aGlzXG4gKiBjb250YWluZXIgdG8gbGV0IGl0IHRvIHNjcm9sbCBpdHMgY29udGVudCBlaXRoZXIgaG9yaXpvbnRhbGx5LCB2ZXJ0aWNhbGx5IG9yIGxldCB0aGUgY29udGVudFxuICogd3JhcC5cbiAqXG4gKlxuICogVXNhZ2UgaXMgcHJldHR5IHNpbXBsZTpcbiAqXG4gKiAgIyMjIEV4YW1wbGUgdXNpbmcgaG9yaXpvbnRhbCBzY3JvbGwgKGRlZmF1bHQgYmVoYXZpb3IpOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGU+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAxPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDI8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA0PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDU8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA3PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDg8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgOTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgPC9hdy1zY3JvbGxhYmxlPlxuICpcbiAqICBgYGBcbiAqXG4gKiAgIyMjIEV4YW1wbGUgdXNpbmcgdmVydGljYWwgc2Nyb2xsOlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LXNjcm9sbGFibGUgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCIgW2hlaWdodF09XCInNDB2aCdcIj5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDE8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMjwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAzPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDQ8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA2PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDc8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgODwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA5PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICA8L2F3LXNjcm9sbGFibGU+XG4gKlxuICogYGBgXG4gKlxuICogICMjIyBFeGFtcGxlIHNjcm9sbGluZyBpcyBkaXNhYmxlZCBhbmQgY29udGVudCB3cmFwcyBhbmQgY2VudGVyczpcbiAqXG4gKiAgYGBgXG4gKiAgICAgICAgICAgIDxhdy1zY3JvbGxhYmxlIFtkaXJlY3Rpb25dPVwiJ25vbmUnXCIgW2FsaWdubWVudF09XCInY2VudGVyJ1wiPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgMTwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCAyPC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDM8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNDwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA1PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDY8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgICAgICA8dy1kZW1vLWNhcmQ+IENhcmQgNzwvdy1kZW1vLWNhcmQ+XG4gKiAgICAgICAgICAgICAgICAgIDx3LWRlbW8tY2FyZD4gQ2FyZCA4PC93LWRlbW8tY2FyZD5cbiAqICAgICAgICAgICAgICAgICAgPHctZGVtby1jYXJkPiBDYXJkIDk8L3ctZGVtby1jYXJkPlxuICogICAgICAgICAgICAgIDwvYXctc2Nyb2xsYWJsZT5cbiAqICBgYGBcbiAqXG4gKiAjIyMgSGVpZ2h0IHByb3BlcnR5OlxuICpcbiAqIFdoZW4gdXNpbmcgXCJob3Jpem9udGFsIHNjcm9sbGluZ1wiIGl0IHNldCBcImZsZXhib3gtZGlyZWN0aW9uXCIgdG8gXCJyb3dcIiB3aGVyZSBoZWlnaHRcbiAqIGlzIHNldCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIGl0cyBjb250ZW50LiBUaGUgaGVpZ2h0IHNob3VsZCBiZSBhbHdheXMgMTAwJSB3aGVuIHVzaW5nXG4gKiB0aGlzIGluIHBhcmVudCBjb250YWluZXIuXG4gKlxuICogSWYgXCJ2ZXJ0aWNhbCBzY3JvbGxpbmdcIiBpcyB1c2VkIHlvdSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0OlxuICogICAtIHlvdXIgcGFyZW50IGNvbnRhaW5lciBzZXRzIHRoZSBib3VuZGFyaWVzIHdpdGggY29ycmVjdGx5IHNldCB3aWR0aCBhbmQgaGVpZ2h0XG4gKiAgIG90aGVyd2lzZSBpdCB3aWxsIHVzZSAxMDAlIG9mIHRoZSB2aWV3cG9ydFxuICogICAtIGlmIHVzZWQgYXMgc3RhbmRhbG9uZSB5b3UgbmVlZCB0byBsaW1pdCB0aGUgaGVpZ2h0IG90aGVyd2lzZSBpdCB3aWxsIGV4cGFuZCB0byAxMDAlIG9mXG4gKiAgIHRoZSBkb2N1bWVudFxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zY3JvbGxhYmxlJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3LXNjcm9sbGFibGVcIiBbbmdDbGFzc109XCJsYXlvdXRDbGFzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiXG4gICAgIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Audy1zY3JvbGxhYmxle2Rpc3BsYXk6ZmxleDtkaXNwbGF5Oi13ZWJraXQtZmxleDtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOm92ZXJmbG93fS53LXNjcm9sbGFibGUgL2RlZXAvPip7ZmxleDowIDAgYXV0bzstd2Via2l0LWZsZXg6MCAwIGF1dG87LW1zLWZsZXg6MCAwIGF1dG87bWFyZ2luOjEwcHh9LnUtc2Nyb2xsYWJsZS1maHtmbGV4LWZsb3c6cm93IG5vd3JhcDtvdmVyZmxvdy14OmF1dG87b3ZlcmZsb3cteTpoaWRkZW59LnUtc2Nyb2xsYWJsZS1mdntmbGV4LWZsb3c6Y29sdW1uIG5vd3JhcDtvdmVyZmxvdy14OmhpZGRlbjtvdmVyZmxvdy15OmF1dG99LnUtc2Nyb2xsYWJsZS1mYntmbGV4LWZsb3c6cm93IG5vd3JhcDtvdmVyZmxvdy14OmF1dG87b3ZlcmZsb3cteTphdXRvfS51LXNjcm9sbGFibGUtZnYtcm93e2ZsZXgtZmxvdzpyb3cgd3JhcDtvdmVyZmxvdy14OmhpZGRlbjtvdmVyZmxvdy15OmF1dG99LnUtc2Nyb2xsYWJsZS1mbntmbGV4LWZsb3c6cm93IHdyYXB9LnUtc2Nyb2xsYWJsZS1hbHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDstd2Via2l0LWp1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS51LXNjcm9sbGFibGUtYXJ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kOy13ZWJraXQtanVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS51LXNjcm9sbGFibGUtYWN7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWp1c3RpZnktY29udGVudDpjZW50ZXJ9LnUtc2Nyb2xsYWJsZS1haiwudS1zY3JvbGxhYmxlLWFqLWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjstd2Via2l0LWp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufWBdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGVDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgc2Nyb2xsaW5nIGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmVyIG1lYW5pbmcgdGVsbHMgd2hpY2ggb3ZlcmZsb3cgYXhpZXMgd2lsbCBiZVxuICAgICAqIGRpc2FibGVkIG9yIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIFwiaG9yaXpvbnRhbFwiOiBIZXJlIHdlIGxvY2sgb3ZlcmZsb3cteSBhbmQgb3ZlcmZsb3cteCBzZXQgdG8gYXV0by5cbiAgICAgKlxuICAgICAqIFdoZW4gc2Nyb2xsaW5nIGRpcmVjdGlvbiBpcyBcInZlcnRpY2FsXCIgcGxlYXNlIG1ha2Ugc3VyZSB5b3UgbWFpbnRhaW4gY29ycmVjdCBoZWlnaHQgYW5kXG4gICAgICogd2lkdGguXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpcmVjdGlvbjogU2Nyb2xsaW5nRGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgZmxleGJveCBjb250YWluZXIgaXRlbXMgc2hvdWxkIGJlIGFsaWduZWQuIERlZmF1bHQgYmVoYXZpb3IgaXMgTEVGVFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbm1lbnQ6IENvbnRhaW5lckl0ZW1zQWxpZ25tZW50ID0gJ2xlZnQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBwcm9wZXJ0aWVzIGZvciBjYWxjdWxhdGVkIGNsYXNzIGxpc3RcbiAgICAgKi9cblxuICAgIGxheW91dENsYXNzOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIHdlIHJlLWluaXRpYWxpemUgZGVmYXVsdCB3aGVuIElucHV0IEJpbmRpbmdzIGNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGRlZmF1bHQgdmFsdWVzIGFuZCBDYWxjdWxhdGVzIGxheW91dCBhbmQgYWxpZ25tZW50IGNsYXNzLiBUaGUgcmVhc29uIGZvciB1c2luZ1xuICAgICAqIHRoZXNlIHV0aWxpdHkgY2xhc3NlcyBpcyB0aGF0IHdlIGNhbiBjaGFuZ2UgdGhlIGJlaGF2aW9yIGFueXRpbWUgYXMgY29tcGFyZWQgdG8gdXNpbmdcbiAgICAgKiBkaXJlY3RseSBbc3R5bGUueHh4XSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqICMjIyBEaXJlY3Rpb24gZmxvdyBjbGFzczpcbiAgICAgKiAgLSB1LXNjcm9sbGFibGUtZjxkaXJlY3Rpb24+XG4gICAgICpcbiAgICAgKiAjIyMgQWxpZ25tZW50IGNsYXNzOlxuICAgICAqICAtIHUtc2Nyb2xsYWJsZS1hPGFsaWdubWVudD5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERlZmF1bHQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyA9ICd1LXNjcm9sbGFibGUtZmgnO1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZ2JztcblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsLXJvdycpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Q2xhc3MgPSAndS1zY3JvbGxhYmxlLWZ2LXJvdyc7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mYic7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dENsYXNzID0gJ3Utc2Nyb2xsYWJsZS1mbic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dENsYXNzICs9ICcgdS1zY3JvbGxhYmxlLWEnICsgdGhpcy5hbGlnbm1lbnQuc3Vic3RyaW5nKDAsIDEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdHlsZUNsYXNzKSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRDbGFzcyArPSBgICR7dGhpcy5zdHlsZUNsYXNzfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgZGVmYXVsdCB3aWR0aCBhbmQgaGVpZ2h0IHRvIHNvbWUgdmFsdWUgaW4gY2FzZSBzb21lYm9keSBwYXNzZXMgbnVsbFxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLndpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhciBpcyB2aXNpYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNIb3Jpem9udGFsU2Nyb2xsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBzY3JvbGxDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudy1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxDb250YWluZXIuc2Nyb2xsV2lkdGggPiBzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGUgdmVydGljYWwgc2Nyb2xsYmFyIGlzIHZpc2libGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc1ZlcnRpY2FsU2Nyb2xsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBzY3JvbGxDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudy1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxDb250YWluZXIuc2Nyb2xsSGVpZ2h0ID4gc2Nyb2xsQ29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgICB9XG59XG5cbi8qKlxuICogU2Nyb2xsaW5nRGlyZWN0aW9uIGlzIGEgbmV3IHR5cGUgdGhhdCBkcml2ZXMgc2Nyb2xsaW5nIGJlaGF2aW9yOlxuICogIC0gaG9yaXpvbnRhbCA9PiBvdmVyZmxvdy14OiBhdXRvLCBvdmVyZmxvdy15OmhpZGRlblxuICogIC0gdmVydGljYWwgPT4gb3ZlcmZsb3cteDogaGlkZGVuLCBvdmVyZmxvdy15OmF1dG9cbiAqICAtIHZlcnRpY2FsLXJvdyA9PiBvdmVyZmxvdy14OiBoaWRkZW4sIG92ZXJmbG93LXk6YXV0bzsgZmxvdzogcm93IHdyYXBcbiAqICAtIGJvdGggPT4gb3ZlcmZsb3cteDogYXV0bywgb3ZlcmZsb3cteTphdXRvXG4gKiAgLSBub25lID0+IHNldHMgZmxvdy1mbG93IHRvIHJvdyB3cmFwXG4gKi9cbmV4cG9ydCB0eXBlIFNjcm9sbGluZ0RpcmVjdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgfCAndmVydGljYWwtcm93JyB8ICdib3RoJyB8ICdub25lJztcblxuXG4vKipcbiAqXG4gKiBDb250cm9scyB0aGUganVzdGlmeS1jb250ZW50IHByb3BlcnR5OlxuICpcbiAqIC0gbGVmdCA9PiBmbGV4LXN0YXJ0XG4gKiAtIHJpZ2h0ID0+IGZsZXgtZW5kXG4gKiAtIGNlbnRlciA9PiBjZW50ZXJcbiAqIC0ganVzdGlmeSA9PiBzcGFjZS1iZXR3ZWVuXG4gKlxuICovXG5leHBvcnQgdHlwZSBDb250YWluZXJJdGVtc0FsaWdubWVudCA9ICdsZWZ0JyB8ICdyaWdodCcgfCAnY2VudGVyJyB8ICdqdXN0aWZ5JztcblxuIl19