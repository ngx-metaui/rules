/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { assert, Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OverlayComponent } from '../overlay/overlay.component';
/** @enum {number} */
const HCCardPosition = {
    top: 0,
    bottom: 1,
    none: 2,
};
export { HCCardPosition };
HCCardPosition[HCCardPosition.top] = "top";
HCCardPosition[HCCardPosition.bottom] = "bottom";
HCCardPosition[HCCardPosition.none] = "none";
/** @enum {number} */
const HCCardAlignment = {
    left: 0,
    paddedLeft: 1,
    right: 2,
    paddedRight: 3,
    default: 4,
};
HCCardAlignment[HCCardAlignment.left] = "left";
HCCardAlignment[HCCardAlignment.paddedLeft] = "paddedLeft";
HCCardAlignment[HCCardAlignment.right] = "right";
HCCardAlignment[HCCardAlignment.paddedRight] = "paddedRight";
HCCardAlignment[HCCardAlignment.default] = "default";
/**
 * Maps position to styles that are applied to the Card container. This is just to make it easier
 * as we are working with enumerations and have already enum type.
 *
 * u-hc-arrow-b: Arrow will appear at the bottom
 * u-hc-arrow-t: Arrow will appear at the top
 *
 * u-hc-shadow-t: Border shadow will appear at the top
 * u-hc-shadow-b: Border shadow will appear at the bottom
 */
const /** @type {?} */ PositionToStyle = {
    top: ' w-hc-panel-arrow u-hc-arrow-b u-hc-shadow-t',
    bottom: ' w-hc-panel-arrow u-hc-arrow-t u-hc-shadow-b',
    none: ''
};
/**
 *
 * Maps aligned Card container to custom styles in order to apply correct arrow
 *
 * -ll: Stands for Large Left (large: there is plenty of space around )
 * -lr: Stands for Large right
 * -sl: Stands for Small left (Small and resized screen where we try to fit card container
 * somewhere in between)
 * -sr: Stands for Large right
 *
 */
const /** @type {?} */ AlignmentToStyle = {
    left: ' u-hc-arrow-ll',
    right: ' u-hc-arrow-lr',
    paddedLeft: ' u-hc-arrow-sl',
    paddedRight: ' u-hc-arrow-sr',
    default: ' u-hc-arrow-ll',
};
/**
 * The HoverCard components adds hover behavior to text, the specified content is loaded
 * on the left or right side of the element.
 *
 * Todo: extends so we can wrap any element and any element can be triggering this. Not only
 * linkTitle
 *
 *
 * ### Example:
 *
 * ```
 *
 *   <aw-hover-card [linkTitle]="'Frank kolar'">
 *       <h3>My Card Title</h3>
 *       <div>
 *
 *           This is my contents
 *
 *       </div>
 *
 *
 *    </aw-hover-card>
 * ```
 *
 * By default there is [forceClose]=true which forces the user to use X close icon
 *
 *
 *
 */
export class HoverCardComponent extends BaseComponent {
    /**
     * @param {?} elem
     * @param {?} env
     * @param {?} cd
     */
    constructor(elem, env, cd) {
        super(env);
        this.elem = elem;
        this.env = env;
        this.cd = cd;
        /**
         * Should we keep the hover card open and force user to manually close
         *
         */
        this.forceClose = true;
        /**
         *
         * This current workaround until we find better solution. PrimeNG overlays operates within
         * its relative element so if the overlay is wrapped inside some other relative container
         * the overlay content is croped by its parent and content is not visible.
         *
         * They have [appendTo] binding which we need to use for this purpose
         *
         */
        this.appendContentToBody = true;
        /**
         *
         * Internal style class to use to apply additional styles when it needs to show a Arrow on the
         * card
         *
         */
        this.arrowClass = '';
        this.opening = false;
        this.currrentPosition = HCCardPosition.none;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        assert(isPresent(this.linkTitle), 'You must provide [linkTitle] binding !');
        // make sure there is open HC when we start new component
        this.env.deleteValue('hc-open');
        if (!this.appendContentToBody) {
            this.appendTo = null;
        }
    }
    /**
     * As of Angular 5 we have to introduce this ViewChecked as PrimeNG does final calculation
     * during this phase.
     *
     * So now its broken down into two parts:
     *   - Apply class styles
     *   - Position it.
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.opening) {
            let /** @type {?} */ container = this.awOverlay.overlay.container;
            let /** @type {?} */ cntRect = container.getBoundingClientRect();
            if (this.currrentPosition !== HCCardPosition.none) {
                this.adjustCard(container, cntRect, this.awOverlay.overlay);
            }
            else {
                this.arrowClass = '';
            }
            this.opening = false;
        }
    }
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     * @return {?}
     */
    initElements() {
        let /** @type {?} */ titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
        let /** @type {?} */ triggerElem = this.elem.nativeElement.querySelector('.sap-icon');
        this.titleAreaRect = titleElem.getBoundingClientRect();
        this.trigRect = triggerElem.getBoundingClientRect();
        this.trigIconMiddle = this.trigRect.width / 2;
    }
    /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     * @param {?} event
     * @return {?}
     */
    openCard(event) {
        if (isPresent(this.awOverlay) && !this.env.hasValue('hc-open')) {
            this.awOverlay.open(event);
            this.env.setValue('hc-open', true);
        }
    }
    /**
     *
     * Fired at the end of the opening cycle when all is initialized and the card is about to
     * fade in.
     *
     * This method first simulates displaying card by setting display:block and
     * domHandler.absolutePosition so we can read dimensions and then later on position the card
     * accordingly.
     *
     * @param {?} event
     * @return {?}
     */
    cardOpened(event) {
        let /** @type {?} */ container = this.awOverlay.overlay.container;
        let /** @type {?} */ target = this.awOverlay.overlay.target;
        this.openForAdjustments(container);
        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
        let /** @type {?} */ cntRect = container.getBoundingClientRect();
        this.currrentPosition = this.positionForCard(container, cntRect);
        this.applyStyleClass(container, cntRect, this.awOverlay.overlay);
        this.closeForAdjustments(container);
        this.opening = true;
    }
    /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     * @param {?} event
     * @return {?}
     */
    cardClosed(event) {
        this.env.deleteValue('hc-open');
    }
    /**
     *
     * Applies style.TOP and style.LEFT to the container in order to reposition it and add
     * extra arrow.
     *
     * First based on the initial position we apply style.TOP and depending if its on the
     * top or bottom we apply either -HoverCardComponent.ArrowPad or +HoverCardComponent.ArrowPad.
     *
     * Then for positioning horizontally we use two types.
     *  - When there is allot of space the arrow is 25% from the edge
     *
     *    -----^------------   or       -----------^----
     *
     *
     *  - When there is less or none space we have only 10% far away form the edge
     *
     *    --^------------   or       -----------^--
     *
     *  Once we pick the correct positioning (25%, 10%) we need to recalculate and shift the card
     *  either to the left or right.
     *
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    adjustCard(container, containerRect, modalContainer) {
        let /** @type {?} */ diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        let /** @type {?} */ scrollTop = modalContainer.domHandler.getWindowScrollTop();
        let /** @type {?} */ posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';
        let /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
        container.style.left = this.calcLeftForAlignment(containerRect, alignment) + 'px';
    }
    /**
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    applyStyleClass(container, containerRect, modalContainer) {
        if (this.currrentPosition !== HCCardPosition.none) {
            let /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
            this.arrowClass = (/** @type {?} */ (PositionToStyle))[(/** @type {?} */ (HCCardPosition))[this.currrentPosition]];
            this.arrowClass += (/** @type {?} */ (AlignmentToStyle))[(/** @type {?} */ (HCCardAlignment))[alignment]];
        }
        else {
            this.arrowClass = '';
        }
    }
    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     * @param {?} container
     * @param {?} boundingRect
     * @return {?}
     */
    positionForCard(container, boundingRect) {
        // secure this in case of IE returning undefined
        let /** @type {?} */ borderWidth = getComputedStyle(container).borderWidth;
        let /** @type {?} */ cntWidth = parseFloat(borderWidth || '0');
        let /** @type {?} */ pos = HCCardPosition.none;
        if (this.trigRect.bottom < boundingRect.top) {
            pos = HCCardPosition.bottom;
        }
        else if (this.trigRect.top > (boundingRect.bottom - cntWidth)) {
            pos = HCCardPosition.top;
        }
        return pos;
    }
    /**
     *
     * Detect horizontal alignment.
     *
     * @param {?} boundingRect
     * @param {?} modalContainer
     * @return {?}
     */
    alignmentForCard(boundingRect, modalContainer) {
        let /** @type {?} */ alignment = HCCardAlignment.left;
        let /** @type {?} */ viewPort = modalContainer.domHandler.getViewport();
        if (this.trigRect.left.toFixed(0) === boundingRect.left.toFixed(0) &&
            boundingRect.left > HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.left;
        }
        else if (boundingRect.left < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedLeft;
        }
        else if ((viewPort.width - boundingRect.right) < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedRight;
        }
        else if (this.trigRect.right.toFixed(0) === boundingRect.right.toFixed(0) ||
            (viewPort.width - boundingRect.right) > HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.right;
        }
        else {
            alignment = HCCardAlignment.default;
        }
        return alignment;
    }
    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     * @param {?} container
     * @return {?}
     */
    openForAdjustments(container) {
        container.style.visibility = 'hidden';
        container.style.display = 'block';
        this.initElements();
    }
    /**
     *
     * Turn off display back NONE
     *
     * @param {?} container
     * @return {?}
     */
    closeForAdjustments(container) {
        container.style.visibility = 'visible';
        // container.style.display = 'none';
    }
    /**
     *
     * Calculates positioning for style.LEFT. As already said they are two types of triangles that
     * are applies for these case:
     *
     *
     * a) Large left, Large right
     *
     *  PrimeNG aligns the card with either the right side or left side of the triggering icon
     *
     *
     *  V                                                                V
     *  ......^........................ or  .......................^......
     *
     *
     *
     *
     *  b) Small left , small right
     *
     *  This is for cases where there is not enough space and PrimeNG position the card off to the
     *  triggering icons, so even primeNg does not have space to align it with the V
     *
     *
     *     V                                                      V
     *  ....^........................ or  .......................^....
     *
     *
     * c)Aligned with the edge of browser
     *
     * On the right side this is problem as we cannot calculate full future width of the card.
     * but we applly for this case #b (arrow 10% )
     *
     *
     *
     * @param {?} boundingRect
     * @param {?} alignment
     * @return {?}
     */
    calcLeftForAlignment(boundingRect, alignment) {
        // width for which we need to shift card. 25% or 10% of the container width
        let /** @type {?} */ wLargeTriangle = boundingRect.width * 0.25;
        let /** @type {?} */ wSmallTriangle = boundingRect.width * 0.10;
        switch (alignment) {
            case HCCardAlignment.right:
                let /** @type {?} */ shiftRight = boundingRect.left + wLargeTriangle;
                let /** @type {?} */ trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);
            case HCCardAlignment.paddedRight:
                let /** @type {?} */ shiftRightS = boundingRect.left + wSmallTriangle;
                let /** @type {?} */ trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);
            case HCCardAlignment.paddedLeft:
                let /** @type {?} */ shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;
            case HCCardAlignment.left:
            default:
                let /** @type {?} */ shiftLeft = boundingRect.left - wLargeTriangle;
                return shiftLeft + this.trigIconMiddle;
        }
    }
}
/**
 * Default padding representing a height of the Arrow for which we need to vertically adjust
 * Card container
 *
 */
HoverCardComponent.ArrowPad = 10;
/**
 * Defines safe threshold where there might not be enough space around or Card is aligned with
 * the left or right edge of the viewport for which we need to position the Arrow closer to the
 * side of the card
 *
 */
HoverCardComponent.SpacingLimit = 50;
HoverCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-hover-card',
                template: `<span class="w-hc">
    <span class="w-hc-title">
        <aw-string [value]="linkTitle"></aw-string>
        <span class="sap-icon icon-slim-arrow-down" (mouseover)="openCard($event)"></span>
    </span>

    <div class="w-hc-body">

         <aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"
                     [styleClass]="arrowClass"
                     [appendTo]="appendTo"
                     (onOpen)="cardOpened($event)"
                     (onClose)="cardClosed($event)">

        <!-- this is workaround to create a _ngcontent-INDEX reference so we can
        refer to this ng-content. Angular does not have any way right now to track this
        -->
        <span class="u-ngcontent">
                <ng-content></ng-content>
            </span>

    </aw-overlay>

    </div>
</span>


<!--<ng-template #contentToBody>-->
    <!--<aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"-->
                <!--[styleClass]="arrowClass"-->
                <!--[appendTo]="appendTo"-->
                <!--(onOpen)="cardOpened($event)"-->
                <!--(onClose)="cardClosed($event)">-->

        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->
        <!--refer to this ng-content. Angular does not have any way right now to track this-->
        <!--&ndash;&gt;-->
        <!--<span class="u-ngcontent">-->
                <!--<ng-content></ng-content>-->
            <!--</span>-->

    <!--</aw-overlay>-->

<!--</ng-template>-->


<!--<ng-template #contentToOverlay>-->

    <!--<aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"-->
                <!--[styleClass]="arrowClass"-->
                <!--(onOpen)="cardOpened($event)"-->
                <!--(onClose)="cardClosed($event)">-->

        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->
        <!--refer to this ng-content. Angular does not have any way right now to track this-->
        <!--&ndash;&gt;-->
        <!--<span class="u-ngcontent">-->
                <!--<ng-content></ng-content>-->
            <!--</span>-->

    <!--</aw-overlay>-->
<!--</ng-template>-->


`,
                styles: [`.w-hc-title{padding-right:1.4em;position:relative;white-space:nowrap}.w-hc-title .sap-icon{font-size:1em;color:#00679e;position:absolute;padding-top:.2em;right:0}::ng-deep .w-hc-panel-arrow.u-hc-shadow-b{box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow.u-hc-shadow-t{box-shadow:0 -2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow:after,::ng-deep .w-hc-panel-arrow:before{left:25%;border:solid transparent;content:" ";height:0;width:0;position:absolute;pointer-events:none}::ng-deep .w-hc-panel-arrow:after{border-color:rgba(136,183,213,0);border-width:.7em;margin-left:-.7em}::ng-deep .w-hc-panel-arrow:before{border-color:rgba(255,136,56,0);border-width:.8em;margin-left:-.8em}::ng-deep .u-hc-arrow-ll:after,::ng-deep .u-hc-arrow-ll:before{left:25%}::ng-deep .u-hc-arrow-lr:after,::ng-deep .u-hc-arrow-lr:before{left:75%}::ng-deep .u-hc-arrow-sl:after,::ng-deep .u-hc-arrow-sl:before{left:10%}::ng-deep .u-hc-arrow-sr:after,::ng-deep .u-hc-arrow-sr:before{left:90%}::ng-deep .u-hc-arrow-t:after,::ng-deep .u-hc-arrow-t:before{bottom:100%}::ng-deep .u-hc-arrow-t:after{border-bottom-color:#fff}::ng-deep .u-hc-arrow-t:before{border-bottom-color:#d7d7d7}::ng-deep .u-hc-arrow-b:after,::ng-deep .u-hc-arrow-b:before{top:100%}::ng-deep .u-hc-arrow-b:after{border-top-color:#fff}::ng-deep .u-hc-arrow-b:before{border-top-color:#d7d7d7}`]
            },] },
];
/** @nocollapse */
HoverCardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: ChangeDetectorRef }
];
HoverCardComponent.propDecorators = {
    linkTitle: [{ type: Input }],
    forceClose: [{ type: Input }],
    appendContentToBody: [{ type: Input }],
    awOverlay: [{ type: ViewChild, args: ['overlay',] }]
};
function HoverCardComponent_tsickle_Closure_declarations() {
    /**
     * Default padding representing a height of the Arrow for which we need to vertically adjust
     * Card container
     *
     * @type {?}
     */
    HoverCardComponent.ArrowPad;
    /**
     * Defines safe threshold where there might not be enough space around or Card is aligned with
     * the left or right edge of the viewport for which we need to position the Arrow closer to the
     * side of the card
     *
     * @type {?}
     */
    HoverCardComponent.SpacingLimit;
    /** @type {?} */
    HoverCardComponent.prototype.linkTitle;
    /**
     * Should we keep the hover card open and force user to manually close
     *
     * @type {?}
     */
    HoverCardComponent.prototype.forceClose;
    /**
     *
     * This current workaround until we find better solution. PrimeNG overlays operates within
     * its relative element so if the overlay is wrapped inside some other relative container
     * the overlay content is croped by its parent and content is not visible.
     *
     * They have [appendTo] binding which we need to use for this purpose
     *
     * @type {?}
     */
    HoverCardComponent.prototype.appendContentToBody;
    /**
     * Reference to OverlayComponent to can access PrimeNG component as well
     * @type {?}
     */
    HoverCardComponent.prototype.awOverlay;
    /**
     *
     * Internal style class to use to apply additional styles when it needs to show a Arrow on the
     * card
     *
     * @type {?}
     */
    HoverCardComponent.prototype.arrowClass;
    /**
     * Internal properties to references template elements in order to calculate positioning
     *
     * @type {?}
     */
    HoverCardComponent.prototype.titleAreaRect;
    /** @type {?} */
    HoverCardComponent.prototype.trigRect;
    /** @type {?} */
    HoverCardComponent.prototype.trigIconMiddle;
    /** @type {?} */
    HoverCardComponent.prototype.opening;
    /** @type {?} */
    HoverCardComponent.prototype.appendTo;
    /** @type {?} */
    HoverCardComponent.prototype.currrentPosition;
    /** @type {?} */
    HoverCardComponent.prototype.elem;
    /** @type {?} */
    HoverCardComponent.prototype.env;
    /** @type {?} */
    HoverCardComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDOUQsdUJBQU0sZUFBZSxHQUFHO0lBQ3BCLEdBQUcsRUFBRSw4Q0FBOEM7SUFDbkQsTUFBTSxFQUFFLDhDQUE4QztJQUN0RCxJQUFJLEVBQUUsRUFBRTtDQUNYLENBQUM7Ozs7Ozs7Ozs7OztBQWNGLHVCQUFNLGdCQUFnQixHQUFHO0lBQ3JCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLGdCQUFnQjtDQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvR0YsTUFBTSx5QkFBMEIsU0FBUSxhQUFhOzs7Ozs7SUF3RWpELFlBQXNCLElBQWdCLEVBQVMsR0FBZ0IsRUFDM0M7UUFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDM0MsT0FBRSxHQUFGLEVBQUU7Ozs7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QUFDLGNBQWMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFHM0QsS0FBSyxlQUFlLENBQUMsVUFBVTtnQkFDM0IscUJBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFOUMsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQzFCO2dCQUNJLHFCQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztnQkFDbkQsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzlDOzs7Ozs7Ozs4QkFwVzZCLEVBQUU7Ozs7Ozs7a0NBUUUsRUFBRTs7WUFwRjNDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0ViO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDAwQ0FBMDBDLENBQUM7YUFDdjFDOzs7O1lBektHLFVBQVU7WUFJRSxXQUFXO1lBTnZCLGlCQUFpQjs7O3dCQThMaEIsS0FBSzt5QkFPTCxLQUFLO2tDQWFMLEtBQUs7d0JBTUwsU0FBUyxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdmVybGF5Q29tcG9uZW50fSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50JztcblxuXG4vKipcbiAqIERlZmluZXMgd2hlcmUgdGhlIENhcmQgaXMgcG9zaXRpb25lZC4gSXQgY2FuIGJlIGVpdGhlcjpcbiAqICAgIC0gYWJvdmUgdGhlIHRyaWdnZXJpbmcgbGlua1xuICogICAgLSB1bmRlciB0aGUgdHJpZ2dlcmluZyBsaW5rXG4gKiAgICAtIGNvbXBsZXRlbHkgb24gdG9wIG9mIGl0IC0gY292ZXJpbmcgaXQuIEZvciB0aGlzIGNhc2UgdGhlcmUgaXMgbm9uZSBhcyBubyBzdHlsZSBpcyBhcHBsaWVkXG4gKi9cbmV4cG9ydCBlbnVtIEhDQ2FyZFBvc2l0aW9uIHtcbiAgICB0b3AsXG4gICAgYm90dG9tLFxuICAgIG5vbmVcbn1cblxuLyoqXG4gKiBEZWZpbmVzIHdoZXJlIHRoZSBDYXJkIGlzIHBvc2l0aW9uZWQgYnkgZGVmYXVsdC4gTWVhbmluZyB3aGVyZSBwcmltZU5HIGNvZGUgcHV0IGl0LlxuICpcbiAqIFdoZW4gdGhlcmUgaXMgYWxsb3Qgb2Ygc3BhY2Ugb24gdGhlIHNpZGVzID49ICAoTGVmdCBvciBSaWdodCkgaXMgdXNlZFxuICogKHBhZGRlZExlZnQsIHBhZGRlZFJpZ2h0KSBvdGhlcndpc2UuIFdoZW4gdGhlcmUgaXMgbm90IG11Y2ggc3BhY2UgYW5kIGNhcmQgY29udGFpbmVyXG4gKiAgaXMgbm90IGFsaWduZWQgKGxlZnQsIHJpZ2h0KSB3aXRoIHRoZSB0cmlnZXJpbmcgaWNvbiBidXQgaXQgaXMgc2hpZnRlZCB0byBmaXQgaW50byB0aGUgc2NyZWVuXG4gKi9cbmVudW0gSENDYXJkQWxpZ25tZW50IHtcbiAgICBsZWZ0LFxuICAgIHBhZGRlZExlZnQsXG4gICAgcmlnaHQsXG4gICAgcGFkZGVkUmlnaHQsXG4gICAgZGVmYXVsdFxufVxuXG4vKipcbiAqIE1hcHMgcG9zaXRpb24gdG8gc3R5bGVzIHRoYXQgYXJlIGFwcGxpZWQgdG8gdGhlIENhcmQgY29udGFpbmVyLiBUaGlzIGlzIGp1c3QgdG8gbWFrZSBpdCBlYXNpZXJcbiAqIGFzIHdlIGFyZSB3b3JraW5nIHdpdGggZW51bWVyYXRpb25zIGFuZCBoYXZlIGFscmVhZHkgZW51bSB0eXBlLlxuICpcbiAqIHUtaGMtYXJyb3ctYjogQXJyb3cgd2lsbCBhcHBlYXIgYXQgdGhlIGJvdHRvbVxuICogdS1oYy1hcnJvdy10OiBBcnJvdyB3aWxsIGFwcGVhciBhdCB0aGUgdG9wXG4gKlxuICogdS1oYy1zaGFkb3ctdDogQm9yZGVyIHNoYWRvdyB3aWxsIGFwcGVhciBhdCB0aGUgdG9wXG4gKiB1LWhjLXNoYWRvdy1iOiBCb3JkZXIgc2hhZG93IHdpbGwgYXBwZWFyIGF0IHRoZSBib3R0b21cbiAqL1xuY29uc3QgUG9zaXRpb25Ub1N0eWxlID0ge1xuICAgIHRvcDogJyB3LWhjLXBhbmVsLWFycm93IHUtaGMtYXJyb3ctYiB1LWhjLXNoYWRvdy10JyxcbiAgICBib3R0b206ICcgdy1oYy1wYW5lbC1hcnJvdyB1LWhjLWFycm93LXQgdS1oYy1zaGFkb3ctYicsXG4gICAgbm9uZTogJydcbn07XG5cblxuLyoqXG4gKlxuICogTWFwcyBhbGlnbmVkIENhcmQgY29udGFpbmVyIHRvIGN1c3RvbSBzdHlsZXMgaW4gb3JkZXIgdG8gYXBwbHkgY29ycmVjdCBhcnJvd1xuICpcbiAqIC1sbDogU3RhbmRzIGZvciBMYXJnZSBMZWZ0IChsYXJnZTogdGhlcmUgaXMgcGxlbnR5IG9mIHNwYWNlIGFyb3VuZCApXG4gKiAtbHI6IFN0YW5kcyBmb3IgTGFyZ2UgcmlnaHRcbiAqIC1zbDogU3RhbmRzIGZvciBTbWFsbCBsZWZ0IChTbWFsbCBhbmQgcmVzaXplZCBzY3JlZW4gd2hlcmUgd2UgdHJ5IHRvIGZpdCBjYXJkIGNvbnRhaW5lclxuICogc29tZXdoZXJlIGluIGJldHdlZW4pXG4gKiAtc3I6IFN0YW5kcyBmb3IgTGFyZ2UgcmlnaHRcbiAqXG4gKi9cbmNvbnN0IEFsaWdubWVudFRvU3R5bGUgPSB7XG4gICAgbGVmdDogJyB1LWhjLWFycm93LWxsJyxcbiAgICByaWdodDogJyB1LWhjLWFycm93LWxyJyxcbiAgICBwYWRkZWRMZWZ0OiAnIHUtaGMtYXJyb3ctc2wnLFxuICAgIHBhZGRlZFJpZ2h0OiAnIHUtaGMtYXJyb3ctc3InLFxuICAgIGRlZmF1bHQ6ICcgdS1oYy1hcnJvdy1sbCcsXG59O1xuXG4vKipcbiAqIFRoZSBIb3ZlckNhcmQgY29tcG9uZW50cyBhZGRzIGhvdmVyIGJlaGF2aW9yIHRvIHRleHQsIHRoZSBzcGVjaWZpZWQgY29udGVudCBpcyBsb2FkZWRcbiAqIG9uIHRoZSBsZWZ0IG9yIHJpZ2h0IHNpZGUgb2YgdGhlIGVsZW1lbnQuXG4gKlxuICogVG9kbzogZXh0ZW5kcyBzbyB3ZSBjYW4gd3JhcCBhbnkgZWxlbWVudCBhbmQgYW55IGVsZW1lbnQgY2FuIGJlIHRyaWdnZXJpbmcgdGhpcy4gTm90IG9ubHlcbiAqIGxpbmtUaXRsZVxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqXG4gKiAgIDxhdy1ob3Zlci1jYXJkIFtsaW5rVGl0bGVdPVwiJ0ZyYW5rIGtvbGFyJ1wiPlxuICogICAgICAgPGgzPk15IENhcmQgVGl0bGU8L2gzPlxuICogICAgICAgPGRpdj5cbiAqXG4gKiAgICAgICAgICAgVGhpcyBpcyBteSBjb250ZW50c1xuICpcbiAqICAgICAgIDwvZGl2PlxuICpcbiAqXG4gKiAgICA8L2F3LWhvdmVyLWNhcmQ+XG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0IHRoZXJlIGlzIFtmb3JjZUNsb3NlXT10cnVlIHdoaWNoIGZvcmNlcyB0aGUgdXNlciB0byB1c2UgWCBjbG9zZSBpY29uXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctaG92ZXItY2FyZCcsXG4gICAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cInctaGNcIj5cbiAgICA8c3BhbiBjbGFzcz1cInctaGMtdGl0bGVcIj5cbiAgICAgICAgPGF3LXN0cmluZyBbdmFsdWVdPVwibGlua1RpdGxlXCI+PC9hdy1zdHJpbmc+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2FwLWljb24gaWNvbi1zbGltLWFycm93LWRvd25cIiAobW91c2VvdmVyKT1cIm9wZW5DYXJkKCRldmVudClcIj48L3NwYW4+XG4gICAgPC9zcGFuPlxuXG4gICAgPGRpdiBjbGFzcz1cInctaGMtYm9keVwiPlxuXG4gICAgICAgICA8YXctb3ZlcmxheSAjb3ZlcmxheSBbc2hvd0Nsb3NlSWNvbl09XCJmb3JjZUNsb3NlXCIgW2Rpc21pc3NhYmxlXT1cIiFmb3JjZUNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtzdHlsZUNsYXNzXT1cImFycm93Q2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICAgICAgIChvbk9wZW4pPVwiY2FyZE9wZW5lZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgIChvbkNsb3NlKT1cImNhcmRDbG9zZWQoJGV2ZW50KVwiPlxuXG4gICAgICAgIDwhLS0gdGhpcyBpcyB3b3JrYXJvdW5kIHRvIGNyZWF0ZSBhIF9uZ2NvbnRlbnQtSU5ERVggcmVmZXJlbmNlIHNvIHdlIGNhblxuICAgICAgICByZWZlciB0byB0aGlzIG5nLWNvbnRlbnQuIEFuZ3VsYXIgZG9lcyBub3QgaGF2ZSBhbnkgd2F5IHJpZ2h0IG5vdyB0byB0cmFjayB0aGlzXG4gICAgICAgIC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInUtbmdjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgPC9hdy1vdmVybGF5PlxuXG4gICAgPC9kaXY+XG48L3NwYW4+XG5cblxuPCEtLTxuZy10ZW1wbGF0ZSAjY29udGVudFRvQm9keT4tLT5cbiAgICA8IS0tPGF3LW92ZXJsYXkgI292ZXJsYXkgW3Nob3dDbG9zZUljb25dPVwiZm9yY2VDbG9zZVwiIFtkaXNtaXNzYWJsZV09XCIhZm9yY2VDbG9zZVwiLS0+XG4gICAgICAgICAgICAgICAgPCEtLVtzdHlsZUNsYXNzXT1cImFycm93Q2xhc3NcIi0tPlxuICAgICAgICAgICAgICAgIDwhLS1bYXBwZW5kVG9dPVwiYXBwZW5kVG9cIi0tPlxuICAgICAgICAgICAgICAgIDwhLS0ob25PcGVuKT1cImNhcmRPcGVuZWQoJGV2ZW50KVwiLS0+XG4gICAgICAgICAgICAgICAgPCEtLShvbkNsb3NlKT1cImNhcmRDbG9zZWQoJGV2ZW50KVwiPi0tPlxuXG4gICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsgdGhpcyBpcyB3b3JrYXJvdW5kIHRvIGNyZWF0ZSBhIF9uZ2NvbnRlbnQtSU5ERVggcmVmZXJlbmNlIHNvIHdlIGNhbi0tPlxuICAgICAgICA8IS0tcmVmZXIgdG8gdGhpcyBuZy1jb250ZW50LiBBbmd1bGFyIGRvZXMgbm90IGhhdmUgYW55IHdheSByaWdodCBub3cgdG8gdHJhY2sgdGhpcy0tPlxuICAgICAgICA8IS0tJm5kYXNoOyZndDstLT5cbiAgICAgICAgPCEtLTxzcGFuIGNsYXNzPVwidS1uZ2NvbnRlbnRcIj4tLT5cbiAgICAgICAgICAgICAgICA8IS0tPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pi0tPlxuICAgICAgICAgICAgPCEtLTwvc3Bhbj4tLT5cblxuICAgIDwhLS08L2F3LW92ZXJsYXk+LS0+XG5cbjwhLS08L25nLXRlbXBsYXRlPi0tPlxuXG5cbjwhLS08bmctdGVtcGxhdGUgI2NvbnRlbnRUb092ZXJsYXk+LS0+XG5cbiAgICA8IS0tPGF3LW92ZXJsYXkgI292ZXJsYXkgW3Nob3dDbG9zZUljb25dPVwiZm9yY2VDbG9zZVwiIFtkaXNtaXNzYWJsZV09XCIhZm9yY2VDbG9zZVwiLS0+XG4gICAgICAgICAgICAgICAgPCEtLVtzdHlsZUNsYXNzXT1cImFycm93Q2xhc3NcIi0tPlxuICAgICAgICAgICAgICAgIDwhLS0ob25PcGVuKT1cImNhcmRPcGVuZWQoJGV2ZW50KVwiLS0+XG4gICAgICAgICAgICAgICAgPCEtLShvbkNsb3NlKT1cImNhcmRDbG9zZWQoJGV2ZW50KVwiPi0tPlxuXG4gICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsgdGhpcyBpcyB3b3JrYXJvdW5kIHRvIGNyZWF0ZSBhIF9uZ2NvbnRlbnQtSU5ERVggcmVmZXJlbmNlIHNvIHdlIGNhbi0tPlxuICAgICAgICA8IS0tcmVmZXIgdG8gdGhpcyBuZy1jb250ZW50LiBBbmd1bGFyIGRvZXMgbm90IGhhdmUgYW55IHdheSByaWdodCBub3cgdG8gdHJhY2sgdGhpcy0tPlxuICAgICAgICA8IS0tJm5kYXNoOyZndDstLT5cbiAgICAgICAgPCEtLTxzcGFuIGNsYXNzPVwidS1uZ2NvbnRlbnRcIj4tLT5cbiAgICAgICAgICAgICAgICA8IS0tPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pi0tPlxuICAgICAgICAgICAgPCEtLTwvc3Bhbj4tLT5cblxuICAgIDwhLS08L2F3LW92ZXJsYXk+LS0+XG48IS0tPC9uZy10ZW1wbGF0ZT4tLT5cblxuXG5gLFxuICAgIHN0eWxlczogW2Audy1oYy10aXRsZXtwYWRkaW5nLXJpZ2h0OjEuNGVtO3Bvc2l0aW9uOnJlbGF0aXZlO3doaXRlLXNwYWNlOm5vd3JhcH0udy1oYy10aXRsZSAuc2FwLWljb257Zm9udC1zaXplOjFlbTtjb2xvcjojMDA2NzllO3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmctdG9wOi4yZW07cmlnaHQ6MH06Om5nLWRlZXAgLnctaGMtcGFuZWwtYXJyb3cudS1oYy1zaGFkb3ctYntib3gtc2hhZG93OjAgMnB4IDRweCAwIHJnYmEoMCwwLDAsLjIpfTo6bmctZGVlcCAudy1oYy1wYW5lbC1hcnJvdy51LWhjLXNoYWRvdy10e2JveC1zaGFkb3c6MCAtMnB4IDRweCAwIHJnYmEoMCwwLDAsLjIpfTo6bmctZGVlcCAudy1oYy1wYW5lbC1hcnJvdzphZnRlciw6Om5nLWRlZXAgLnctaGMtcGFuZWwtYXJyb3c6YmVmb3Jle2xlZnQ6MjUlO2JvcmRlcjpzb2xpZCB0cmFuc3BhcmVudDtjb250ZW50OlwiIFwiO2hlaWdodDowO3dpZHRoOjA7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX06Om5nLWRlZXAgLnctaGMtcGFuZWwtYXJyb3c6YWZ0ZXJ7Ym9yZGVyLWNvbG9yOnJnYmEoMTM2LDE4MywyMTMsMCk7Ym9yZGVyLXdpZHRoOi43ZW07bWFyZ2luLWxlZnQ6LS43ZW19OjpuZy1kZWVwIC53LWhjLXBhbmVsLWFycm93OmJlZm9yZXtib3JkZXItY29sb3I6cmdiYSgyNTUsMTM2LDU2LDApO2JvcmRlci13aWR0aDouOGVtO21hcmdpbi1sZWZ0Oi0uOGVtfTo6bmctZGVlcCAudS1oYy1hcnJvdy1sbDphZnRlciw6Om5nLWRlZXAgLnUtaGMtYXJyb3ctbGw6YmVmb3Jle2xlZnQ6MjUlfTo6bmctZGVlcCAudS1oYy1hcnJvdy1scjphZnRlciw6Om5nLWRlZXAgLnUtaGMtYXJyb3ctbHI6YmVmb3Jle2xlZnQ6NzUlfTo6bmctZGVlcCAudS1oYy1hcnJvdy1zbDphZnRlciw6Om5nLWRlZXAgLnUtaGMtYXJyb3ctc2w6YmVmb3Jle2xlZnQ6MTAlfTo6bmctZGVlcCAudS1oYy1hcnJvdy1zcjphZnRlciw6Om5nLWRlZXAgLnUtaGMtYXJyb3ctc3I6YmVmb3Jle2xlZnQ6OTAlfTo6bmctZGVlcCAudS1oYy1hcnJvdy10OmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy10OmJlZm9yZXtib3R0b206MTAwJX06Om5nLWRlZXAgLnUtaGMtYXJyb3ctdDphZnRlcntib3JkZXItYm90dG9tLWNvbG9yOiNmZmZ9OjpuZy1kZWVwIC51LWhjLWFycm93LXQ6YmVmb3Jle2JvcmRlci1ib3R0b20tY29sb3I6I2Q3ZDdkN306Om5nLWRlZXAgLnUtaGMtYXJyb3ctYjphZnRlciw6Om5nLWRlZXAgLnUtaGMtYXJyb3ctYjpiZWZvcmV7dG9wOjEwMCV9OjpuZy1kZWVwIC51LWhjLWFycm93LWI6YWZ0ZXJ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmfTo6bmctZGVlcCAudS1oYy1hcnJvdy1iOmJlZm9yZXtib3JkZXItdG9wLWNvbG9yOiNkN2Q3ZDd9YF1cbn0pXG5leHBvcnQgY2xhc3MgSG92ZXJDYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBwYWRkaW5nIHJlcHJlc2VudGluZyBhIGhlaWdodCBvZiB0aGUgQXJyb3cgZm9yIHdoaWNoIHdlIG5lZWQgdG8gdmVydGljYWxseSBhZGp1c3RcbiAgICAgKiBDYXJkIGNvbnRhaW5lclxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBcnJvd1BhZCA9IDEwO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBzYWZlIHRocmVzaG9sZCB3aGVyZSB0aGVyZSBtaWdodCBub3QgYmUgZW5vdWdoIHNwYWNlIGFyb3VuZCBvciBDYXJkIGlzIGFsaWduZWQgd2l0aFxuICAgICAqIHRoZSBsZWZ0IG9yIHJpZ2h0IGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IGZvciB3aGljaCB3ZSBuZWVkIHRvIHBvc2l0aW9uIHRoZSBBcnJvdyBjbG9zZXIgdG8gdGhlXG4gICAgICogc2lkZSBvZiB0aGUgY2FyZFxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTcGFjaW5nTGltaXQgPSA1MDtcblxuXG4gICAgQElucHV0KClcbiAgICBsaW5rVGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB3ZSBrZWVwIHRoZSBob3ZlciBjYXJkIG9wZW4gYW5kIGZvcmNlIHVzZXIgdG8gbWFudWFsbHkgY2xvc2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9yY2VDbG9zZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBjdXJyZW50IHdvcmthcm91bmQgdW50aWwgd2UgZmluZCBiZXR0ZXIgc29sdXRpb24uIFByaW1lTkcgb3ZlcmxheXMgb3BlcmF0ZXMgd2l0aGluXG4gICAgICogaXRzIHJlbGF0aXZlIGVsZW1lbnQgc28gaWYgdGhlIG92ZXJsYXkgaXMgd3JhcHBlZCBpbnNpZGUgc29tZSBvdGhlciByZWxhdGl2ZSBjb250YWluZXJcbiAgICAgKiB0aGUgb3ZlcmxheSBjb250ZW50IGlzIGNyb3BlZCBieSBpdHMgcGFyZW50IGFuZCBjb250ZW50IGlzIG5vdCB2aXNpYmxlLlxuICAgICAqXG4gICAgICogVGhleSBoYXZlIFthcHBlbmRUb10gYmluZGluZyB3aGljaCB3ZSBuZWVkIHRvIHVzZSBmb3IgdGhpcyBwdXJwb3NlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZENvbnRlbnRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIE92ZXJsYXlDb21wb25lbnQgdG8gY2FuIGFjY2VzcyBQcmltZU5HIGNvbXBvbmVudCBhcyB3ZWxsXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpXG4gICAgYXdPdmVybGF5OiBPdmVybGF5Q29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEludGVybmFsIHN0eWxlIGNsYXNzIHRvIHVzZSB0byBhcHBseSBhZGRpdGlvbmFsIHN0eWxlcyB3aGVuIGl0IG5lZWRzIHRvIHNob3cgYSBBcnJvdyBvbiB0aGVcbiAgICAgKiBjYXJkXG4gICAgICpcbiAgICAgKi9cbiAgICBhcnJvd0NsYXNzOiBzdHJpbmcgPSAnJztcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgcHJvcGVydGllcyB0byByZWZlcmVuY2VzIHRlbXBsYXRlIGVsZW1lbnRzIGluIG9yZGVyIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbmluZ1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB0aXRsZUFyZWFSZWN0OiBhbnk7XG4gICAgdHJpZ1JlY3Q6IGFueTtcbiAgICB0cmlnSWNvbk1pZGRsZTogYW55O1xuXG4gICAgb3BlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYXBwZW5kVG86ICdib2R5JztcblxuICAgIGN1cnJyZW50UG9zaXRpb246IEhDQ2FyZFBvc2l0aW9uID0gSENDYXJkUG9zaXRpb24ubm9uZTtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW06IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmxpbmtUaXRsZSksICdZb3UgbXVzdCBwcm92aWRlIFtsaW5rVGl0bGVdIGJpbmRpbmcgIScpO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBvcGVuIEhDIHdoZW4gd2Ugc3RhcnQgbmV3IGNvbXBvbmVudFxuICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZSgnaGMtb3BlbicpO1xuXG4gICAgICAgIGlmICghdGhpcy5hcHBlbmRDb250ZW50VG9Cb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZFRvID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXMgb2YgQW5ndWxhciA1IHdlIGhhdmUgdG8gaW50cm9kdWNlIHRoaXMgVmlld0NoZWNrZWQgYXMgUHJpbWVORyBkb2VzIGZpbmFsIGNhbGN1bGF0aW9uXG4gICAgICogZHVyaW5nIHRoaXMgcGhhc2UuXG4gICAgICpcbiAgICAgKiBTbyBub3cgaXRzIGJyb2tlbiBkb3duIGludG8gdHdvIHBhcnRzOlxuICAgICAqICAgLSBBcHBseSBjbGFzcyBzdHlsZXNcbiAgICAgKiAgIC0gUG9zaXRpb24gaXQuXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vcGVuaW5nKSB7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5hd092ZXJsYXkub3ZlcmxheS5jb250YWluZXI7XG5cbiAgICAgICAgICAgIGxldCBjbnRSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycnJlbnRQb3NpdGlvbiAhPT0gSENDYXJkUG9zaXRpb24ubm9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FyZChjb250YWluZXIsIGNudFJlY3QsIHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9wZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBlbGVtZW50cyBCb3VuZGluZ0NsaWVudFJlY3QgdGhhdCB3ZSB1c2UgZm9yIGNhbGN1bGF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCB0aXRsZUVsZW0gPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudy1oYy10aXRsZScpO1xuICAgICAgICBsZXQgdHJpZ2dlckVsZW0gPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2FwLWljb24nKTtcbiAgICAgICAgdGhpcy50aXRsZUFyZWFSZWN0ID0gdGl0bGVFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLnRyaWdSZWN0ID0gdHJpZ2dlckVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMudHJpZ0ljb25NaWRkbGUgPSB0aGlzLnRyaWdSZWN0LndpZHRoIC8gMjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRmlyZXMgd2hlbiB1c2VyIG1vdXNlIG92ZXIgdGhlIHRyaWdnZXJpbmcgaWNvbiBhbmQgb3BlbnMgdXAgb3ZlcmxheSBjb21wb25lbnQuIFRvIG1ha2Ugc3VyZVxuICAgICAqIG9ubHkgb25lIENhcmQgaXMgb3BlbmVkIGF0IHRoZSB0aW1lIGl0IHVzZXMgRW52aXJvbm1lbnQgdG8gc2F2ZSBleHRyYSBpbmZvcm1hdGlvbiBmb3IgaXRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb3BlbkNhcmQoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hd092ZXJsYXkpICYmICF0aGlzLmVudi5oYXNWYWx1ZSgnaGMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLmF3T3ZlcmxheS5vcGVuKGV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5lbnYuc2V0VmFsdWUoJ2hjLW9wZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlZCBhdCB0aGUgZW5kIG9mIHRoZSBvcGVuaW5nIGN5Y2xlIHdoZW4gYWxsIGlzIGluaXRpYWxpemVkIGFuZCB0aGUgY2FyZCBpcyBhYm91dCB0b1xuICAgICAqIGZhZGUgaW4uXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBmaXJzdCBzaW11bGF0ZXMgZGlzcGxheWluZyBjYXJkIGJ5IHNldHRpbmcgZGlzcGxheTpibG9jayBhbmRcbiAgICAgKiBkb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24gc28gd2UgY2FuIHJlYWQgZGltZW5zaW9ucyBhbmQgdGhlbiBsYXRlciBvbiBwb3NpdGlvbiB0aGUgY2FyZFxuICAgICAqIGFjY29yZGluZ2x5LlxuICAgICAqXG4gICAgICovXG4gICAgY2FyZE9wZW5lZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmNvbnRhaW5lcjtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkudGFyZ2V0O1xuICAgICAgICB0aGlzLm9wZW5Gb3JBZGp1c3RtZW50cyhjb250YWluZXIpO1xuXG4gICAgICAgIC8vIHByZS1ydW4gcG9zaXRpb25pbmcgc28gd2UgY2FuIGNhbGN1bGF0ZSBuZXcgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5hd092ZXJsYXkub3ZlcmxheS5kb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24oY29udGFpbmVyLCB0YXJnZXQpO1xuICAgICAgICBsZXQgY250UmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5jdXJycmVudFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkZvckNhcmQoY29udGFpbmVyLCBjbnRSZWN0KTtcblxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVDbGFzcyhjb250YWluZXIsIGNudFJlY3QsIHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkpO1xuXG4gICAgICAgIHRoaXMuY2xvc2VGb3JBZGp1c3RtZW50cyhjb250YWluZXIpO1xuICAgICAgICB0aGlzLm9wZW5pbmcgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGNhcmQgaXMgY2xvc2VkIHdlIG5lZWQgdG8gcmVsZWFzZSBpdCBhbmQgZGVsZXRlIGFsbCB0aGUgcmVmZXJlbmNlcyBmcm9tIEVudmlyb25tZW50XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGNhcmRDbG9zZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZSgnaGMtb3BlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXBwbGllcyBzdHlsZS5UT1AgYW5kIHN0eWxlLkxFRlQgdG8gdGhlIGNvbnRhaW5lciBpbiBvcmRlciB0byByZXBvc2l0aW9uIGl0IGFuZCBhZGRcbiAgICAgKiBleHRyYSBhcnJvdy5cbiAgICAgKlxuICAgICAqIEZpcnN0IGJhc2VkIG9uIHRoZSBpbml0aWFsIHBvc2l0aW9uIHdlIGFwcGx5IHN0eWxlLlRPUCBhbmQgZGVwZW5kaW5nIGlmIGl0cyBvbiB0aGVcbiAgICAgKiB0b3Agb3IgYm90dG9tIHdlIGFwcGx5IGVpdGhlciAtSG92ZXJDYXJkQ29tcG9uZW50LkFycm93UGFkIG9yICtIb3ZlckNhcmRDb21wb25lbnQuQXJyb3dQYWQuXG4gICAgICpcbiAgICAgKiBUaGVuIGZvciBwb3NpdGlvbmluZyBob3Jpem9udGFsbHkgd2UgdXNlIHR3byB0eXBlcy5cbiAgICAgKiAgLSBXaGVuIHRoZXJlIGlzIGFsbG90IG9mIHNwYWNlIHRoZSBhcnJvdyBpcyAyNSUgZnJvbSB0aGUgZWRnZVxuICAgICAqXG4gICAgICogICAgLS0tLS1eLS0tLS0tLS0tLS0tICAgb3IgICAgICAgLS0tLS0tLS0tLS1eLS0tLVxuICAgICAqXG4gICAgICpcbiAgICAgKiAgLSBXaGVuIHRoZXJlIGlzIGxlc3Mgb3Igbm9uZSBzcGFjZSB3ZSBoYXZlIG9ubHkgMTAlIGZhciBhd2F5IGZvcm0gdGhlIGVkZ2VcbiAgICAgKlxuICAgICAqICAgIC0tXi0tLS0tLS0tLS0tLSAgIG9yICAgICAgIC0tLS0tLS0tLS0tXi0tXG4gICAgICpcbiAgICAgKiAgT25jZSB3ZSBwaWNrIHRoZSBjb3JyZWN0IHBvc2l0aW9uaW5nICgyNSUsIDEwJSkgd2UgbmVlZCB0byByZWNhbGN1bGF0ZSBhbmQgc2hpZnQgdGhlIGNhcmRcbiAgICAgKiAgZWl0aGVyIHRvIHRoZSBsZWZ0IG9yIHJpZ2h0LlxuICAgICAqXG4gICAgICovXG4gICAgYWRqdXN0Q2FyZChjb250YWluZXI6IGFueSwgY29udGFpbmVyUmVjdDogYW55LCBtb2RhbENvbnRhaW5lcjogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBkaWZmID0gKHRoaXMuY3VycnJlbnRQb3NpdGlvbiA9PT0gSENDYXJkUG9zaXRpb24uYm90dG9tKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IHNjcm9sbFRvcCA9IG1vZGFsQ29udGFpbmVyLmRvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XG4gICAgICAgIGxldCBwb3NXaXRoU2Nyb2xsID0gY29udGFpbmVyUmVjdC50b3AgKyBzY3JvbGxUb3A7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSAocG9zV2l0aFNjcm9sbCArIChIb3ZlckNhcmRDb21wb25lbnQuQXJyb3dQYWQgKiBkaWZmKSkgKyAncHgnO1xuXG4gICAgICAgIGxldCBhbGlnbm1lbnQgPSB0aGlzLmFsaWdubWVudEZvckNhcmQoY29udGFpbmVyUmVjdCwgbW9kYWxDb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuY2FsY0xlZnRGb3JBbGlnbm1lbnQoY29udGFpbmVyUmVjdCwgYWxpZ25tZW50KSArICdweCc7XG4gICAgfVxuXG5cbiAgICBhcHBseVN0eWxlQ2xhc3MoY29udGFpbmVyOiBhbnksIGNvbnRhaW5lclJlY3Q6IGFueSwgbW9kYWxDb250YWluZXI6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJyZW50UG9zaXRpb24gIT09IEhDQ2FyZFBvc2l0aW9uLm5vbmUpIHtcbiAgICAgICAgICAgIGxldCBhbGlnbm1lbnQgPSB0aGlzLmFsaWdubWVudEZvckNhcmQoY29udGFpbmVyUmVjdCwgbW9kYWxDb250YWluZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmFycm93Q2xhc3MgPSAoPGFueT5Qb3NpdGlvblRvU3R5bGUpWyg8YW55PkhDQ2FyZFBvc2l0aW9uKVt0aGlzLmN1cnJyZW50UG9zaXRpb25dXTtcbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyArPSAoPGFueT5BbGlnbm1lbnRUb1N0eWxlKVsoPGFueT5IQ0NhcmRBbGlnbm1lbnQpW2FsaWdubWVudF1dO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFycm93Q2xhc3MgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGV0ZWN0cyBpZiB0aGUgY2FyZCBpcyBnb2luZyB0byBiZSBzaG93biBvbiB0aGUgdG9wIG9mIHRoZSBMaW5rIGxhYmVsIG9yIHVuZGVyLiBPciBpZlxuICAgICAqIGl0cyBjb3ZlcmluZyBpdC5cbiAgICAgKlxuICAgICAqL1xuICAgIHBvc2l0aW9uRm9yQ2FyZChjb250YWluZXI6IGFueSwgYm91bmRpbmdSZWN0OiBhbnkpOiBIQ0NhcmRQb3NpdGlvbiB7XG4gICAgICAgIC8vIHNlY3VyZSB0aGlzIGluIGNhc2Ugb2YgSUUgcmV0dXJuaW5nIHVuZGVmaW5lZFxuICAgICAgICBsZXQgYm9yZGVyV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikuYm9yZGVyV2lkdGg7XG4gICAgICAgIGxldCBjbnRXaWR0aCA9IHBhcnNlRmxvYXQoYm9yZGVyV2lkdGggfHwgJzAnKTtcbiAgICAgICAgbGV0IHBvcyA9IEhDQ2FyZFBvc2l0aW9uLm5vbmU7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ1JlY3QuYm90dG9tIDwgYm91bmRpbmdSZWN0LnRvcCkge1xuICAgICAgICAgICAgcG9zID0gSENDYXJkUG9zaXRpb24uYm90dG9tO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ1JlY3QudG9wID4gKGJvdW5kaW5nUmVjdC5ib3R0b20gLSBjbnRXaWR0aCkpIHtcbiAgICAgICAgICAgIHBvcyA9IEhDQ2FyZFBvc2l0aW9uLnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERldGVjdCBob3Jpem9udGFsIGFsaWdubWVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYWxpZ25tZW50Rm9yQ2FyZChib3VuZGluZ1JlY3Q6IGFueSwgbW9kYWxDb250YWluZXI6IGFueSk6IEhDQ2FyZEFsaWdubWVudCB7XG4gICAgICAgIGxldCBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQubGVmdDtcbiAgICAgICAgbGV0IHZpZXdQb3J0ID0gbW9kYWxDb250YWluZXIuZG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdSZWN0LmxlZnQudG9GaXhlZCgwKSA9PT0gYm91bmRpbmdSZWN0LmxlZnQudG9GaXhlZCgwKSAmJlxuICAgICAgICAgICAgYm91bmRpbmdSZWN0LmxlZnQgPiBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQubGVmdDtcblxuICAgICAgICB9IGVsc2UgaWYgKGJvdW5kaW5nUmVjdC5sZWZ0IDwgSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdCkge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnBhZGRlZExlZnQ7XG5cbiAgICAgICAgfSBlbHNlIGlmICgodmlld1BvcnQud2lkdGggLSBib3VuZGluZ1JlY3QucmlnaHQpIDwgSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdCkge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnBhZGRlZFJpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmlnUmVjdC5yaWdodC50b0ZpeGVkKDApID09PSBib3VuZGluZ1JlY3QucmlnaHQudG9GaXhlZCgwKSB8fFxuICAgICAgICAgICAgKHZpZXdQb3J0LndpZHRoIC0gYm91bmRpbmdSZWN0LnJpZ2h0KSA+IEhvdmVyQ2FyZENvbXBvbmVudC5TcGFjaW5nTGltaXQpIHtcbiAgICAgICAgICAgIGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5yaWdodDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsaWdubWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFR1cm4gb24gdGVtcG9yYXJ5IGRpc3BsYXkgdG8gQkxPQ0sgc28gd2UgY2FuIHJlYWQgZGltZW5zaW9uc1xuICAgICAqXG4gICAgICovXG4gICAgb3BlbkZvckFkanVzdG1lbnRzKGNvbnRhaW5lcjogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUdXJuIG9mZiBkaXNwbGF5IGJhY2sgTk9ORVxuICAgICAqXG4gICAgICovXG4gICAgY2xvc2VGb3JBZGp1c3RtZW50cyhjb250YWluZXI6IGFueSk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgLy8gY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbGN1bGF0ZXMgcG9zaXRpb25pbmcgZm9yIHN0eWxlLkxFRlQuIEFzIGFscmVhZHkgc2FpZCB0aGV5IGFyZSB0d28gdHlwZXMgb2YgdHJpYW5nbGVzIHRoYXRcbiAgICAgKiBhcmUgYXBwbGllcyBmb3IgdGhlc2UgY2FzZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogYSkgTGFyZ2UgbGVmdCwgTGFyZ2UgcmlnaHRcbiAgICAgKlxuICAgICAqICBQcmltZU5HIGFsaWducyB0aGUgY2FyZCB3aXRoIGVpdGhlciB0aGUgcmlnaHQgc2lkZSBvciBsZWZ0IHNpZGUgb2YgdGhlIHRyaWdnZXJpbmcgaWNvblxuICAgICAqXG4gICAgICpcbiAgICAgKiAgViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWXG4gICAgICogIC4uLi4uLl4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gb3IgIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXi4uLi4uLlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICogIGIpIFNtYWxsIGxlZnQgLCBzbWFsbCByaWdodFxuICAgICAqXG4gICAgICogIFRoaXMgaXMgZm9yIGNhc2VzIHdoZXJlIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgYW5kIFByaW1lTkcgcG9zaXRpb24gdGhlIGNhcmQgb2ZmIHRvIHRoZVxuICAgICAqICB0cmlnZ2VyaW5nIGljb25zLCBzbyBldmVuIHByaW1lTmcgZG9lcyBub3QgaGF2ZSBzcGFjZSB0byBhbGlnbiBpdCB3aXRoIHRoZSBWXG4gICAgICpcbiAgICAgKlxuICAgICAqICAgICBWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVlxuICAgICAqICAuLi4uXi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiBvciAgLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5eLi4uLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBjKUFsaWduZWQgd2l0aCB0aGUgZWRnZSBvZiBicm93c2VyXG4gICAgICpcbiAgICAgKiBPbiB0aGUgcmlnaHQgc2lkZSB0aGlzIGlzIHByb2JsZW0gYXMgd2UgY2Fubm90IGNhbGN1bGF0ZSBmdWxsIGZ1dHVyZSB3aWR0aCBvZiB0aGUgY2FyZC5cbiAgICAgKiBidXQgd2UgYXBwbGx5IGZvciB0aGlzIGNhc2UgI2IgKGFycm93IDEwJSApXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjTGVmdEZvckFsaWdubWVudChib3VuZGluZ1JlY3Q6IGFueSwgYWxpZ25tZW50OiBIQ0NhcmRBbGlnbm1lbnQpOiBudW1iZXIge1xuICAgICAgICAvLyB3aWR0aCBmb3Igd2hpY2ggd2UgbmVlZCB0byBzaGlmdCBjYXJkLiAyNSUgb3IgMTAlIG9mIHRoZSBjb250YWluZXIgd2lkdGhcbiAgICAgICAgbGV0IHdMYXJnZVRyaWFuZ2xlID0gYm91bmRpbmdSZWN0LndpZHRoICogMC4yNTtcbiAgICAgICAgbGV0IHdTbWFsbFRyaWFuZ2xlID0gYm91bmRpbmdSZWN0LndpZHRoICogMC4xMDtcblxuICAgICAgICBzd2l0Y2ggKGFsaWdubWVudCkge1xuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQucmlnaHQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0UmlnaHQgPSBib3VuZGluZ1JlY3QubGVmdCArIHdMYXJnZVRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIGxldCB0cmlnUmlnaHQgPSB0aGlzLnRyaWdSZWN0LnJpZ2h0IC0gdGhpcy50cmlnSWNvbk1pZGRsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRSaWdodCAtIChib3VuZGluZ1JlY3QucmlnaHQgLSB0cmlnUmlnaHQpO1xuXG4gICAgICAgICAgICBjYXNlIEhDQ2FyZEFsaWdubWVudC5wYWRkZWRSaWdodDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRSaWdodFMgPSBib3VuZGluZ1JlY3QubGVmdCArIHdTbWFsbFRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIGxldCB0cmlnUmlnaHRTID0gdGhpcy50cmlnUmVjdC5yaWdodCAtIHRoaXMudHJpZ0ljb25NaWRkbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0UmlnaHRTIC0gKGJvdW5kaW5nUmVjdC5yaWdodCAtIHRyaWdSaWdodFMpO1xuXG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LnBhZGRlZExlZnQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0TGVmdFBhZCA9IGJvdW5kaW5nUmVjdC5sZWZ0IC0gd1NtYWxsVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0TGVmdFBhZCArIHRoaXMudHJpZ0ljb25NaWRkbGU7XG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LmxlZnQ6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCBzaGlmdExlZnQgPSBib3VuZGluZ1JlY3QubGVmdCAtIHdMYXJnZVRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdExlZnQgKyB0aGlzLnRyaWdJY29uTWlkZGxlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuIl19