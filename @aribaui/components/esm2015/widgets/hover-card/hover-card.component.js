/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { assert, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OverlayComponent } from '../overlay/overlay.component';
/** @enum {number} */
const HCCardPosition = {
    top: 0,
    bottom: 1,
    none: 2,
};
export { HCCardPosition };
HCCardPosition[HCCardPosition.top] = 'top';
HCCardPosition[HCCardPosition.bottom] = 'bottom';
HCCardPosition[HCCardPosition.none] = 'none';
/** @enum {number} */
const HCCardAlignment = {
    left: 0,
    paddedLeft: 1,
    right: 2,
    paddedRight: 3,
    default: 4,
};
HCCardAlignment[HCCardAlignment.left] = 'left';
HCCardAlignment[HCCardAlignment.paddedLeft] = 'paddedLeft';
HCCardAlignment[HCCardAlignment.right] = 'right';
HCCardAlignment[HCCardAlignment.paddedRight] = 'paddedRight';
HCCardAlignment[HCCardAlignment.default] = 'default';
/** *
 * Maps position to styles that are applied to the Card container. This is just to make it easier
 * as we are working with enumerations and have already enum type.
 *
 * u-hc-arrow-b: Arrow will appear at the bottom
 * u-hc-arrow-t: Arrow will appear at the top
 *
 * u-hc-shadow-t: Border shadow will appear at the top
 * u-hc-shadow-b: Border shadow will appear at the bottom
  @type {?} */
const PositionToStyle = {
    top: ' w-hc-panel-arrow u-hc-arrow-b u-hc-shadow-t',
    bottom: ' w-hc-panel-arrow u-hc-arrow-t u-hc-shadow-b',
    none: ''
};
/** *
 *
 * Maps aligned Card container to custom styles in order to apply correct arrow
 *
 * -ll: Stands for Large Left (large: there is plenty of space around )
 * -lr: Stands for Large right
 * -sl: Stands for Small left (Small and resized screen where we try to fit card container
 * somewhere in between)
 * -sr: Stands for Large right
 *
  @type {?} */
const AlignmentToStyle = {
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
        this.overlayOnAnimationStart = this.awOverlay.overlay.onAnimationStart;
        this.awOverlay.overlay.onAnimationStart = (event) => {
            this.overlayOnAnimationStart.call(this.awOverlay.overlay, event);
            this.cardOpened();
            this.onAnimationStart(event);
        };
        // this span is always available
        this.dynamicContent = this.elem.nativeElement.querySelector('.u-ngcontent');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimationStart(event) {
        if (this.opening) {
            /** @type {?} */
            let container = this.awOverlay.overlay.container;
            /** @type {?} */
            let cntRect = container.getBoundingClientRect();
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
     * @return {?}
     */
    injectDynamicContent() {
        if (this.awOverlay.overlay.visible) {
            /** @type {?} */
            let overlayCnt = this.elem.nativeElement
                .querySelector('.ui-overlaypanel-content .u-ngcontent');
            if (isBlank(overlayCnt) && this.dynamicContent.children.length > 0) {
                overlayCnt = this.elem.nativeElement.querySelector('.ui-overlaypanel-content');
                overlayCnt.prepend(this.dynamicContent);
                this.dynamicContent.style = 'block';
            }
        }
        else {
            this.dynamicContent.style = 'none';
        }
    }
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     * @return {?}
     */
    initElements() {
        /** @type {?} */
        let titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
        /** @type {?} */
        let triggerElem = this.elem.nativeElement.querySelector('.sap-icon');
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
            this.cd.detectChanges();
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
     * @param {?=} event
     * @return {?}
     */
    cardOpened(event) {
        /** @type {?} */
        let container = this.awOverlay.overlay.container;
        /** @type {?} */
        let target = this.awOverlay.overlay.target;
        this.openForAdjustments(container);
        this.injectDynamicContent();
        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
        /** @type {?} */
        let cntRect = container.getBoundingClientRect();
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
     * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     * @param {?} event
     * @return {?}
     */
    beforeClose(event) {
        this.dynamicContent.style = 'none';
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
        /** @type {?} */
        let diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        /** @type {?} */
        let scrollTop = modalContainer.domHandler.getWindowScrollTop();
        /** @type {?} */
        let posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';
        /** @type {?} */
        let alignment = this.alignmentForCard(containerRect, modalContainer);
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
            /** @type {?} */
            let alignment = this.alignmentForCard(containerRect, modalContainer);
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
        /** @type {?} */
        let borderWidth = getComputedStyle(container).borderWidth;
        /** @type {?} */
        let cntWidth = parseFloat(borderWidth || '0');
        /** @type {?} */
        let pos = HCCardPosition.none;
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
        /** @type {?} */
        let alignment = HCCardAlignment.left;
        /** @type {?} */
        let viewPort = modalContainer.domHandler.getViewport();
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
        /** @type {?} */
        let wLargeTriangle = boundingRect.width * 0.25;
        /** @type {?} */
        let wSmallTriangle = boundingRect.width * 0.10;
        switch (alignment) {
            case HCCardAlignment.right:
                /** @type {?} */
                let shiftRight = boundingRect.left + wLargeTriangle;
                /** @type {?} */
                let trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);
            case HCCardAlignment.paddedRight:
                /** @type {?} */
                let shiftRightS = boundingRect.left + wSmallTriangle;
                /** @type {?} */
                let trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);
            case HCCardAlignment.paddedLeft:
                /** @type {?} */
                let shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;
            case HCCardAlignment.left:
            default:
                /** @type {?} */
                let shiftLeft = boundingRect.left - wLargeTriangle;
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
                template: "<span class=\"w-hc\">\n    <span class=\"w-hc-title\">\n        <aw-string [value]=\"linkTitle\"></aw-string>\n        <span class=\"sap-icon icon-slim-arrow-down\" (mouseover)=\"openCard($event)\"></span>\n    </span>\n\n    <div class=\"w-hc-body\">\n\n         <aw-overlay #overlay [showCloseIcon]=\"forceClose\" [dismissable]=\"!forceClose\"\n                     [styleClass]=\"arrowClass\"\n                     [appendTo]=\"appendTo\"\n                     (beforeClose)=\"beforeClose($event)\"\n                     (onClose)=\"cardClosed($event)\">\n             <ng-content></ng-content>\n        </aw-overlay>\n\n\n        <!-- this is workaround to create a dynamic _ngcontent  reference so we can refer to later on with dynamic\n                projection. We cannot really use componentFactory.create[injector, projectedContent] as what we\n                want to add is another angular component that needs to be still rendered.\n\n                Starting PrimeNG 6.1+ they put in ngIf which complicates programmatic creation of this\n                component and injecting another dynamic content into ngContent is hard, so we need to little\n                hacky hackity hack.\n\n                We have this extra span with a class that we use to insert out dynamic content using nativeElement\n                and its DOM manipulation and once the overlay is shown and ng-content appears we move \"u-ngcontent\"\n                to new location.\n\n         -->\n        <span class=\"u-ngcontent\" [style.display]=\"'none'\">\n        </span>\n    </div>\n</span>\n\n\n",
                styles: [".w-hc-title{padding-right:1.4em;position:relative;white-space:nowrap}.w-hc-title .sap-icon{font-size:1em;color:#00679e;position:absolute;padding-top:.2em;right:0}::ng-deep .w-hc-panel-arrow.u-hc-shadow-b{box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow.u-hc-shadow-t{box-shadow:0 -2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow:after,::ng-deep .w-hc-panel-arrow:before{left:25%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}::ng-deep .w-hc-panel-arrow:after{border-color:rgba(136,183,213,0);border-width:.7em;margin-left:-.7em}::ng-deep .w-hc-panel-arrow:before{border-color:rgba(255,136,56,0);border-width:.8em;margin-left:-.8em}::ng-deep .u-hc-arrow-ll:after,::ng-deep .u-hc-arrow-ll:before{left:25%}::ng-deep .u-hc-arrow-lr:after,::ng-deep .u-hc-arrow-lr:before{left:75%}::ng-deep .u-hc-arrow-sl:after,::ng-deep .u-hc-arrow-sl:before{left:10%}::ng-deep .u-hc-arrow-sr:after,::ng-deep .u-hc-arrow-sr:before{left:90%}::ng-deep .u-hc-arrow-t:after,::ng-deep .u-hc-arrow-t:before{bottom:100%}::ng-deep .u-hc-arrow-t:after{border-bottom-color:#fff}::ng-deep .u-hc-arrow-t:before{border-bottom-color:#d7d7d7}::ng-deep .u-hc-arrow-b:after,::ng-deep .u-hc-arrow-b:before{top:100%}::ng-deep .u-hc-arrow-b:after{border-top-color:#fff}::ng-deep .u-hc-arrow-b:before{border-top-color:#d7d7d7}"]
            }] }
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
if (false) {
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
    HoverCardComponent.prototype.overlayOnAnimationStart;
    /**
     * In cases where we need to inject dynamic content using programmatic API we use this extra
     * element which is outside of the <ng-content> and hidden and once the <ng-content>  of
     * the component is shown we move this dynamic content into it.
     *
     * @type {?}
     */
    HoverCardComponent.prototype.dynamicContent;
    /** @type {?} */
    HoverCardComponent.prototype.elem;
    /** @type {?} */
    HoverCardComponent.prototype.env;
    /** @type {?} */
    HoverCardComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6RixPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7O0lBVzFELE1BQUc7SUFDSCxTQUFNO0lBQ04sT0FBSTs7OzhCQUZKLEdBQUc7OEJBQ0gsTUFBTTs4QkFDTixJQUFJOzs7SUFZSixPQUFJO0lBQ0osYUFBVTtJQUNWLFFBQUs7SUFDTCxjQUFXO0lBQ1gsVUFBTzs7Z0NBSlAsSUFBSTtnQ0FDSixVQUFVO2dDQUNWLEtBQUs7Z0NBQ0wsV0FBVztnQ0FDWCxPQUFPOzs7Ozs7Ozs7OztBQWFYLE1BQU0sZUFBZSxHQUFHO0lBQ3BCLEdBQUcsRUFBRSw4Q0FBOEM7SUFDbkQsTUFBTSxFQUFFLDhDQUE4QztJQUN0RCxJQUFJLEVBQUUsRUFBRTtDQUNYLENBQUM7Ozs7Ozs7Ozs7OztBQWNGLE1BQU0sZ0JBQWdCLEdBQUc7SUFDckIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFVBQVUsRUFBRSxnQkFBZ0I7SUFDNUIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsZ0JBQWdCO0NBQzVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DRixNQUFNLHlCQUEw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OlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdmVybGF5Q29tcG9uZW50fSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50JztcblxuXG4vKipcbiAqIERlZmluZXMgd2hlcmUgdGhlIENhcmQgaXMgcG9zaXRpb25lZC4gSXQgY2FuIGJlIGVpdGhlcjpcbiAqICAgIC0gYWJvdmUgdGhlIHRyaWdnZXJpbmcgbGlua1xuICogICAgLSB1bmRlciB0aGUgdHJpZ2dlcmluZyBsaW5rXG4gKiAgICAtIGNvbXBsZXRlbHkgb24gdG9wIG9mIGl0IC0gY292ZXJpbmcgaXQuIEZvciB0aGlzIGNhc2UgdGhlcmUgaXMgbm9uZSBhcyBubyBzdHlsZSBpcyBhcHBsaWVkXG4gKi9cbmV4cG9ydCBlbnVtIEhDQ2FyZFBvc2l0aW9uXG57XG4gICAgdG9wLFxuICAgIGJvdHRvbSxcbiAgICBub25lXG59XG5cbi8qKlxuICogRGVmaW5lcyB3aGVyZSB0aGUgQ2FyZCBpcyBwb3NpdGlvbmVkIGJ5IGRlZmF1bHQuIE1lYW5pbmcgd2hlcmUgcHJpbWVORyBjb2RlIHB1dCBpdC5cbiAqXG4gKiBXaGVuIHRoZXJlIGlzIGFsbG90IG9mIHNwYWNlIG9uIHRoZSBzaWRlcyA+PSAgKExlZnQgb3IgUmlnaHQpIGlzIHVzZWRcbiAqIChwYWRkZWRMZWZ0LCBwYWRkZWRSaWdodCkgb3RoZXJ3aXNlLiBXaGVuIHRoZXJlIGlzIG5vdCBtdWNoIHNwYWNlIGFuZCBjYXJkIGNvbnRhaW5lclxuICogIGlzIG5vdCBhbGlnbmVkIChsZWZ0LCByaWdodCkgd2l0aCB0aGUgdHJpZ2VyaW5nIGljb24gYnV0IGl0IGlzIHNoaWZ0ZWQgdG8gZml0IGludG8gdGhlIHNjcmVlblxuICovXG5lbnVtIEhDQ2FyZEFsaWdubWVudFxue1xuICAgIGxlZnQsXG4gICAgcGFkZGVkTGVmdCxcbiAgICByaWdodCxcbiAgICBwYWRkZWRSaWdodCxcbiAgICBkZWZhdWx0XG59XG5cbi8qKlxuICogTWFwcyBwb3NpdGlvbiB0byBzdHlsZXMgdGhhdCBhcmUgYXBwbGllZCB0byB0aGUgQ2FyZCBjb250YWluZXIuIFRoaXMgaXMganVzdCB0byBtYWtlIGl0IGVhc2llclxuICogYXMgd2UgYXJlIHdvcmtpbmcgd2l0aCBlbnVtZXJhdGlvbnMgYW5kIGhhdmUgYWxyZWFkeSBlbnVtIHR5cGUuXG4gKlxuICogdS1oYy1hcnJvdy1iOiBBcnJvdyB3aWxsIGFwcGVhciBhdCB0aGUgYm90dG9tXG4gKiB1LWhjLWFycm93LXQ6IEFycm93IHdpbGwgYXBwZWFyIGF0IHRoZSB0b3BcbiAqXG4gKiB1LWhjLXNoYWRvdy10OiBCb3JkZXIgc2hhZG93IHdpbGwgYXBwZWFyIGF0IHRoZSB0b3BcbiAqIHUtaGMtc2hhZG93LWI6IEJvcmRlciBzaGFkb3cgd2lsbCBhcHBlYXIgYXQgdGhlIGJvdHRvbVxuICovXG5jb25zdCBQb3NpdGlvblRvU3R5bGUgPSB7XG4gICAgdG9wOiAnIHctaGMtcGFuZWwtYXJyb3cgdS1oYy1hcnJvdy1iIHUtaGMtc2hhZG93LXQnLFxuICAgIGJvdHRvbTogJyB3LWhjLXBhbmVsLWFycm93IHUtaGMtYXJyb3ctdCB1LWhjLXNoYWRvdy1iJyxcbiAgICBub25lOiAnJ1xufTtcblxuXG4vKipcbiAqXG4gKiBNYXBzIGFsaWduZWQgQ2FyZCBjb250YWluZXIgdG8gY3VzdG9tIHN0eWxlcyBpbiBvcmRlciB0byBhcHBseSBjb3JyZWN0IGFycm93XG4gKlxuICogLWxsOiBTdGFuZHMgZm9yIExhcmdlIExlZnQgKGxhcmdlOiB0aGVyZSBpcyBwbGVudHkgb2Ygc3BhY2UgYXJvdW5kIClcbiAqIC1scjogU3RhbmRzIGZvciBMYXJnZSByaWdodFxuICogLXNsOiBTdGFuZHMgZm9yIFNtYWxsIGxlZnQgKFNtYWxsIGFuZCByZXNpemVkIHNjcmVlbiB3aGVyZSB3ZSB0cnkgdG8gZml0IGNhcmQgY29udGFpbmVyXG4gKiBzb21ld2hlcmUgaW4gYmV0d2VlbilcbiAqIC1zcjogU3RhbmRzIGZvciBMYXJnZSByaWdodFxuICpcbiAqL1xuY29uc3QgQWxpZ25tZW50VG9TdHlsZSA9IHtcbiAgICBsZWZ0OiAnIHUtaGMtYXJyb3ctbGwnLFxuICAgIHJpZ2h0OiAnIHUtaGMtYXJyb3ctbHInLFxuICAgIHBhZGRlZExlZnQ6ICcgdS1oYy1hcnJvdy1zbCcsXG4gICAgcGFkZGVkUmlnaHQ6ICcgdS1oYy1hcnJvdy1zcicsXG4gICAgZGVmYXVsdDogJyB1LWhjLWFycm93LWxsJyxcbn07XG5cbi8qKlxuICogVGhlIEhvdmVyQ2FyZCBjb21wb25lbnRzIGFkZHMgaG92ZXIgYmVoYXZpb3IgdG8gdGV4dCwgdGhlIHNwZWNpZmllZCBjb250ZW50IGlzIGxvYWRlZFxuICogb24gdGhlIGxlZnQgb3IgcmlnaHQgc2lkZSBvZiB0aGUgZWxlbWVudC5cbiAqXG4gKiBUb2RvOiBleHRlbmRzIHNvIHdlIGNhbiB3cmFwIGFueSBlbGVtZW50IGFuZCBhbnkgZWxlbWVudCBjYW4gYmUgdHJpZ2dlcmluZyB0aGlzLiBOb3Qgb25seVxuICogbGlua1RpdGxlXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICpcbiAqICAgPGF3LWhvdmVyLWNhcmQgW2xpbmtUaXRsZV09XCInRnJhbmsga29sYXInXCI+XG4gKiAgICAgICA8aDM+TXkgQ2FyZCBUaXRsZTwvaDM+XG4gKiAgICAgICA8ZGl2PlxuICpcbiAqICAgICAgICAgICBUaGlzIGlzIG15IGNvbnRlbnRzXG4gKlxuICogICAgICAgPC9kaXY+XG4gKlxuICpcbiAqICAgIDwvYXctaG92ZXItY2FyZD5cbiAqIGBgYFxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlcmUgaXMgW2ZvcmNlQ2xvc2VdPXRydWUgd2hpY2ggZm9yY2VzIHRoZSB1c2VyIHRvIHVzZSBYIGNsb3NlIGljb25cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1ob3Zlci1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaG92ZXItY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaG92ZXItY2FyZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvdmVyQ2FyZENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcGFkZGluZyByZXByZXNlbnRpbmcgYSBoZWlnaHQgb2YgdGhlIEFycm93IGZvciB3aGljaCB3ZSBuZWVkIHRvIHZlcnRpY2FsbHkgYWRqdXN0XG4gICAgICogQ2FyZCBjb250YWluZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQXJyb3dQYWQgPSAxMDtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgc2FmZSB0aHJlc2hvbGQgd2hlcmUgdGhlcmUgbWlnaHQgbm90IGJlIGVub3VnaCBzcGFjZSBhcm91bmQgb3IgQ2FyZCBpcyBhbGlnbmVkIHdpdGhcbiAgICAgKiB0aGUgbGVmdCBvciByaWdodCBlZGdlIG9mIHRoZSB2aWV3cG9ydCBmb3Igd2hpY2ggd2UgbmVlZCB0byBwb3NpdGlvbiB0aGUgQXJyb3cgY2xvc2VyIHRvIHRoZVxuICAgICAqIHNpZGUgb2YgdGhlIGNhcmRcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3BhY2luZ0xpbWl0ID0gNTA7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgbGlua1RpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTaG91bGQgd2Uga2VlcCB0aGUgaG92ZXIgY2FyZCBvcGVuIGFuZCBmb3JjZSB1c2VyIHRvIG1hbnVhbGx5IGNsb3NlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvcmNlQ2xvc2U6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgY3VycmVudCB3b3JrYXJvdW5kIHVudGlsIHdlIGZpbmQgYmV0dGVyIHNvbHV0aW9uLiBQcmltZU5HIG92ZXJsYXlzIG9wZXJhdGVzIHdpdGhpblxuICAgICAqIGl0cyByZWxhdGl2ZSBlbGVtZW50IHNvIGlmIHRoZSBvdmVybGF5IGlzIHdyYXBwZWQgaW5zaWRlIHNvbWUgb3RoZXIgcmVsYXRpdmUgY29udGFpbmVyXG4gICAgICogdGhlIG92ZXJsYXkgY29udGVudCBpcyBjcm9wZWQgYnkgaXRzIHBhcmVudCBhbmQgY29udGVudCBpcyBub3QgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIFRoZXkgaGF2ZSBbYXBwZW5kVG9dIGJpbmRpbmcgd2hpY2ggd2UgbmVlZCB0byB1c2UgZm9yIHRoaXMgcHVycG9zZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhcHBlbmRDb250ZW50VG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBPdmVybGF5Q29tcG9uZW50IHRvIGNhbiBhY2Nlc3MgUHJpbWVORyBjb21wb25lbnQgYXMgd2VsbFxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ292ZXJsYXknKVxuICAgIGF3T3ZlcmxheTogT3ZlcmxheUNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbnRlcm5hbCBzdHlsZSBjbGFzcyB0byB1c2UgdG8gYXBwbHkgYWRkaXRpb25hbCBzdHlsZXMgd2hlbiBpdCBuZWVkcyB0byBzaG93IGEgQXJyb3cgb24gdGhlXG4gICAgICogY2FyZFxuICAgICAqXG4gICAgICovXG4gICAgYXJyb3dDbGFzczogc3RyaW5nID0gJyc7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIHByb3BlcnRpZXMgdG8gcmVmZXJlbmNlcyB0ZW1wbGF0ZSBlbGVtZW50cyBpbiBvcmRlciB0byBjYWxjdWxhdGUgcG9zaXRpb25pbmdcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgdGl0bGVBcmVhUmVjdDogYW55O1xuICAgIHRyaWdSZWN0OiBhbnk7XG4gICAgdHJpZ0ljb25NaWRkbGU6IGFueTtcblxuICAgIG9wZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFwcGVuZFRvOiAnYm9keSc7XG5cbiAgICBjdXJycmVudFBvc2l0aW9uOiBIQ0NhcmRQb3NpdGlvbiA9IEhDQ2FyZFBvc2l0aW9uLm5vbmU7XG5cbiAgICBvdmVybGF5T25BbmltYXRpb25TdGFydDogKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT4gdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZXMgd2hlcmUgd2UgbmVlZCB0byBpbmplY3QgZHluYW1pYyBjb250ZW50IHVzaW5nIHByb2dyYW1tYXRpYyBBUEkgd2UgdXNlIHRoaXMgZXh0cmFcbiAgICAgKiBlbGVtZW50IHdoaWNoIGlzIG91dHNpZGUgb2YgdGhlIDxuZy1jb250ZW50PiBhbmQgaGlkZGVuIGFuZCBvbmNlIHRoZSA8bmctY29udGVudD4gIG9mXG4gICAgICogdGhlIGNvbXBvbmVudCBpcyBzaG93biB3ZSBtb3ZlIHRoaXMgZHluYW1pYyBjb250ZW50IGludG8gaXQuXG4gICAgICpcbiAgICAgKi9cbiAgICBkeW5hbWljQ29udGVudDogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbTogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmxpbmtUaXRsZSksICdZb3UgbXVzdCBwcm92aWRlIFtsaW5rVGl0bGVdIGJpbmRpbmcgIScpO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBvcGVuIEhDIHdoZW4gd2Ugc3RhcnQgbmV3IGNvbXBvbmVudFxuICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZSgnaGMtb3BlbicpO1xuXG4gICAgICAgIGlmICghdGhpcy5hcHBlbmRDb250ZW50VG9Cb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZFRvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3ZlcmxheU9uQW5pbWF0aW9uU3RhcnQgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5Lm9uQW5pbWF0aW9uU3RhcnQ7XG4gICAgICAgIHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkub25BbmltYXRpb25TdGFydCA9IChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheU9uQW5pbWF0aW9uU3RhcnQuY2FsbCh0aGlzLmF3T3ZlcmxheS5vdmVybGF5LCBldmVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FyZE9wZW5lZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkFuaW1hdGlvblN0YXJ0KGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGlzIHNwYW4gaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgICAgICB0aGlzLmR5bmFtaWNDb250ZW50ID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnUtbmdjb250ZW50Jyk7XG4gICAgfVxuXG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5pbmcpIHtcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGxldCBjbnRSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycnJlbnRQb3NpdGlvbiAhPT0gSENDYXJkUG9zaXRpb24ubm9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FyZChjb250YWluZXIsIGNudFJlY3QsIHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9wZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5qZWN0RHluYW1pY0NvbnRlbnQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkudmlzaWJsZSkge1xuICAgICAgICAgICAgbGV0IG92ZXJsYXlDbnQgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcudWktb3ZlcmxheXBhbmVsLWNvbnRlbnQgLnUtbmdjb250ZW50Jyk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG92ZXJsYXlDbnQpICYmIHRoaXMuZHluYW1pY0NvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlDbnQgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudWktb3ZlcmxheXBhbmVsLWNvbnRlbnQnKTtcbiAgICAgICAgICAgICAgICBvdmVybGF5Q250LnByZXBlbmQodGhpcy5keW5hbWljQ29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5keW5hbWljQ29udGVudC5zdHlsZSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNDb250ZW50LnN0eWxlID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBlbGVtZW50cyBCb3VuZGluZ0NsaWVudFJlY3QgdGhhdCB3ZSB1c2UgZm9yIGNhbGN1bGF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0RWxlbWVudHMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHRpdGxlRWxlbSA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53LWhjLXRpdGxlJyk7XG4gICAgICAgIGxldCB0cmlnZ2VyRWxlbSA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXAtaWNvbicpO1xuICAgICAgICB0aGlzLnRpdGxlQXJlYVJlY3QgPSB0aXRsZUVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMudHJpZ1JlY3QgPSB0cmlnZ2VyRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy50cmlnSWNvbk1pZGRsZSA9IHRoaXMudHJpZ1JlY3Qud2lkdGggLyAyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlcyB3aGVuIHVzZXIgbW91c2Ugb3ZlciB0aGUgdHJpZ2dlcmluZyBpY29uIGFuZCBvcGVucyB1cCBvdmVybGF5IGNvbXBvbmVudC4gVG8gbWFrZSBzdXJlXG4gICAgICogb25seSBvbmUgQ2FyZCBpcyBvcGVuZWQgYXQgdGhlIHRpbWUgaXQgdXNlcyBFbnZpcm9ubWVudCB0byBzYXZlIGV4dHJhIGluZm9ybWF0aW9uIGZvciBpdFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuQ2FyZChldmVudDogYW55KTogYW55XG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXdPdmVybGF5KSAmJiAhdGhpcy5lbnYuaGFzVmFsdWUoJ2hjLW9wZW4nKSkge1xuICAgICAgICAgICAgdGhpcy5hd092ZXJsYXkub3BlbihldmVudCk7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZW52LnNldFZhbHVlKCdoYy1vcGVuJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRmlyZWQgYXQgdGhlIGVuZCBvZiB0aGUgb3BlbmluZyBjeWNsZSB3aGVuIGFsbCBpcyBpbml0aWFsaXplZCBhbmQgdGhlIGNhcmQgaXMgYWJvdXQgdG9cbiAgICAgKiBmYWRlIGluLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgZmlyc3Qgc2ltdWxhdGVzIGRpc3BsYXlpbmcgY2FyZCBieSBzZXR0aW5nIGRpc3BsYXk6YmxvY2sgYW5kXG4gICAgICogZG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uIHNvIHdlIGNhbiByZWFkIGRpbWVuc2lvbnMgYW5kIHRoZW4gbGF0ZXIgb24gcG9zaXRpb24gdGhlIGNhcmRcbiAgICAgKiBhY2NvcmRpbmdseS5cbiAgICAgKlxuICAgICAqL1xuICAgIGNhcmRPcGVuZWQoZXZlbnQ/OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5hd092ZXJsYXkub3ZlcmxheS5jb250YWluZXI7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LnRhcmdldDtcblxuICAgICAgICB0aGlzLm9wZW5Gb3JBZGp1c3RtZW50cyhjb250YWluZXIpO1xuICAgICAgICB0aGlzLmluamVjdER5bmFtaWNDb250ZW50KCk7XG5cbiAgICAgICAgLy8gcHJlLXJ1biBwb3NpdGlvbmluZyBzbyB3ZSBjYW4gY2FsY3VsYXRlIG5ldyBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmRvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbihjb250YWluZXIsIHRhcmdldCk7XG4gICAgICAgIGxldCBjbnRSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmN1cnJyZW50UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uRm9yQ2FyZChjb250YWluZXIsIGNudFJlY3QpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZUNsYXNzKGNvbnRhaW5lciwgY250UmVjdCwgdGhpcy5hd092ZXJsYXkub3ZlcmxheSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZUZvckFkanVzdG1lbnRzKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMub3BlbmluZyA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gY2FyZCBpcyBjbG9zZWQgd2UgbmVlZCB0byByZWxlYXNlIGl0IGFuZCBkZWxldGUgYWxsIHRoZSByZWZlcmVuY2VzIGZyb20gRW52aXJvbm1lbnRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgY2FyZENsb3NlZChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5lbnYuZGVsZXRlVmFsdWUoJ2hjLW9wZW4nKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICAqIEJlZm9yZSBvdmVybGF5IGlzIGNsb3NlZCB3ZSBoaWRlIGludGVybmFsIGNvbnRlbnQgb3RoZXIgaXQgZG9lcyBsaXR0bGUgc2hha2UuLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBiZWZvcmVDbG9zZShldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5keW5hbWljQ29udGVudC5zdHlsZSA9ICdub25lJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgc3R5bGUuVE9QIGFuZCBzdHlsZS5MRUZUIHRvIHRoZSBjb250YWluZXIgaW4gb3JkZXIgdG8gcmVwb3NpdGlvbiBpdCBhbmQgYWRkXG4gICAgICogZXh0cmEgYXJyb3cuXG4gICAgICpcbiAgICAgKiBGaXJzdCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBwb3NpdGlvbiB3ZSBhcHBseSBzdHlsZS5UT1AgYW5kIGRlcGVuZGluZyBpZiBpdHMgb24gdGhlXG4gICAgICogdG9wIG9yIGJvdHRvbSB3ZSBhcHBseSBlaXRoZXIgLUhvdmVyQ2FyZENvbXBvbmVudC5BcnJvd1BhZCBvciArSG92ZXJDYXJkQ29tcG9uZW50LkFycm93UGFkLlxuICAgICAqXG4gICAgICogVGhlbiBmb3IgcG9zaXRpb25pbmcgaG9yaXpvbnRhbGx5IHdlIHVzZSB0d28gdHlwZXMuXG4gICAgICogIC0gV2hlbiB0aGVyZSBpcyBhbGxvdCBvZiBzcGFjZSB0aGUgYXJyb3cgaXMgMjUlIGZyb20gdGhlIGVkZ2VcbiAgICAgKlxuICAgICAqICAgIC0tLS0tXi0tLS0tLS0tLS0tLSAgIG9yICAgICAgIC0tLS0tLS0tLS0tXi0tLS1cbiAgICAgKlxuICAgICAqXG4gICAgICogIC0gV2hlbiB0aGVyZSBpcyBsZXNzIG9yIG5vbmUgc3BhY2Ugd2UgaGF2ZSBvbmx5IDEwJSBmYXIgYXdheSBmb3JtIHRoZSBlZGdlXG4gICAgICpcbiAgICAgKiAgICAtLV4tLS0tLS0tLS0tLS0gICBvciAgICAgICAtLS0tLS0tLS0tLV4tLVxuICAgICAqXG4gICAgICogIE9uY2Ugd2UgcGljayB0aGUgY29ycmVjdCBwb3NpdGlvbmluZyAoMjUlLCAxMCUpIHdlIG5lZWQgdG8gcmVjYWxjdWxhdGUgYW5kIHNoaWZ0IHRoZSBjYXJkXG4gICAgICogIGVpdGhlciB0byB0aGUgbGVmdCBvciByaWdodC5cbiAgICAgKlxuICAgICAqL1xuICAgIGFkanVzdENhcmQoY29udGFpbmVyOiBhbnksIGNvbnRhaW5lclJlY3Q6IGFueSwgbW9kYWxDb250YWluZXI6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBkaWZmID0gKHRoaXMuY3VycnJlbnRQb3NpdGlvbiA9PT0gSENDYXJkUG9zaXRpb24uYm90dG9tKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IHNjcm9sbFRvcCA9IG1vZGFsQ29udGFpbmVyLmRvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XG4gICAgICAgIGxldCBwb3NXaXRoU2Nyb2xsID0gY29udGFpbmVyUmVjdC50b3AgKyBzY3JvbGxUb3A7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSAocG9zV2l0aFNjcm9sbCArIChIb3ZlckNhcmRDb21wb25lbnQuQXJyb3dQYWQgKiBkaWZmKSkgKyAncHgnO1xuXG4gICAgICAgIGxldCBhbGlnbm1lbnQgPSB0aGlzLmFsaWdubWVudEZvckNhcmQoY29udGFpbmVyUmVjdCwgbW9kYWxDb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuY2FsY0xlZnRGb3JBbGlnbm1lbnQoY29udGFpbmVyUmVjdCwgYWxpZ25tZW50KSArICdweCc7XG4gICAgfVxuXG5cbiAgICBhcHBseVN0eWxlQ2xhc3MoY29udGFpbmVyOiBhbnksIGNvbnRhaW5lclJlY3Q6IGFueSwgbW9kYWxDb250YWluZXI6IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycnJlbnRQb3NpdGlvbiAhPT0gSENDYXJkUG9zaXRpb24ubm9uZSkge1xuICAgICAgICAgICAgbGV0IGFsaWdubWVudCA9IHRoaXMuYWxpZ25tZW50Rm9yQ2FyZChjb250YWluZXJSZWN0LCBtb2RhbENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICg8YW55PlBvc2l0aW9uVG9TdHlsZSlbKDxhbnk+SENDYXJkUG9zaXRpb24pW3RoaXMuY3VycnJlbnRQb3NpdGlvbl1dO1xuICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzICs9ICg8YW55PkFsaWdubWVudFRvU3R5bGUpWyg8YW55PkhDQ2FyZEFsaWdubWVudClbYWxpZ25tZW50XV07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZXRlY3RzIGlmIHRoZSBjYXJkIGlzIGdvaW5nIHRvIGJlIHNob3duIG9uIHRoZSB0b3Agb2YgdGhlIExpbmsgbGFiZWwgb3IgdW5kZXIuIE9yIGlmXG4gICAgICogaXRzIGNvdmVyaW5nIGl0LlxuICAgICAqXG4gICAgICovXG4gICAgcG9zaXRpb25Gb3JDYXJkKGNvbnRhaW5lcjogYW55LCBib3VuZGluZ1JlY3Q6IGFueSk6IEhDQ2FyZFBvc2l0aW9uXG4gICAge1xuICAgICAgICAvLyBzZWN1cmUgdGhpcyBpbiBjYXNlIG9mIElFIHJldHVybmluZyB1bmRlZmluZWRcbiAgICAgICAgbGV0IGJvcmRlcldpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLmJvcmRlcldpZHRoO1xuICAgICAgICBsZXQgY250V2lkdGggPSBwYXJzZUZsb2F0KGJvcmRlcldpZHRoIHx8ICcwJyk7XG4gICAgICAgIGxldCBwb3MgPSBIQ0NhcmRQb3NpdGlvbi5ub25lO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdSZWN0LmJvdHRvbSA8IGJvdW5kaW5nUmVjdC50b3ApIHtcbiAgICAgICAgICAgIHBvcyA9IEhDQ2FyZFBvc2l0aW9uLmJvdHRvbTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWdSZWN0LnRvcCA+IChib3VuZGluZ1JlY3QuYm90dG9tIC0gY250V2lkdGgpKSB7XG4gICAgICAgICAgICBwb3MgPSBIQ0NhcmRQb3NpdGlvbi50b3A7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZXRlY3QgaG9yaXpvbnRhbCBhbGlnbm1lbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGFsaWdubWVudEZvckNhcmQoYm91bmRpbmdSZWN0OiBhbnksIG1vZGFsQ29udGFpbmVyOiBhbnkpOiBIQ0NhcmRBbGlnbm1lbnRcbiAgICB7XG4gICAgICAgIGxldCBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQubGVmdDtcbiAgICAgICAgbGV0IHZpZXdQb3J0ID0gbW9kYWxDb250YWluZXIuZG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdSZWN0LmxlZnQudG9GaXhlZCgwKSA9PT0gYm91bmRpbmdSZWN0LmxlZnQudG9GaXhlZCgwKSAmJlxuICAgICAgICAgICAgYm91bmRpbmdSZWN0LmxlZnQgPiBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQubGVmdDtcblxuICAgICAgICB9IGVsc2UgaWYgKGJvdW5kaW5nUmVjdC5sZWZ0IDwgSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdCkge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnBhZGRlZExlZnQ7XG5cbiAgICAgICAgfSBlbHNlIGlmICgodmlld1BvcnQud2lkdGggLSBib3VuZGluZ1JlY3QucmlnaHQpIDwgSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdCkge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnBhZGRlZFJpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmlnUmVjdC5yaWdodC50b0ZpeGVkKDApID09PSBib3VuZGluZ1JlY3QucmlnaHQudG9GaXhlZCgwKSB8fFxuICAgICAgICAgICAgKHZpZXdQb3J0LndpZHRoIC0gYm91bmRpbmdSZWN0LnJpZ2h0KSA+IEhvdmVyQ2FyZENvbXBvbmVudC5TcGFjaW5nTGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5yaWdodDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsaWdubWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFR1cm4gb24gdGVtcG9yYXJ5IGRpc3BsYXkgdG8gQkxPQ0sgc28gd2UgY2FuIHJlYWQgZGltZW5zaW9uc1xuICAgICAqXG4gICAgICovXG4gICAgb3BlbkZvckFkanVzdG1lbnRzKGNvbnRhaW5lcjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRzKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFR1cm4gb2ZmIGRpc3BsYXkgYmFjayBOT05FXG4gICAgICpcbiAgICAgKi9cbiAgICBjbG9zZUZvckFkanVzdG1lbnRzKGNvbnRhaW5lcjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIC8vIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYWxjdWxhdGVzIHBvc2l0aW9uaW5nIGZvciBzdHlsZS5MRUZULiBBcyBhbHJlYWR5IHNhaWQgdGhleSBhcmUgdHdvIHR5cGVzIG9mIHRyaWFuZ2xlcyB0aGF0XG4gICAgICogYXJlIGFwcGxpZXMgZm9yIHRoZXNlIGNhc2U6XG4gICAgICpcbiAgICAgKlxuICAgICAqIGEpIExhcmdlIGxlZnQsIExhcmdlIHJpZ2h0XG4gICAgICpcbiAgICAgKiAgUHJpbWVORyBhbGlnbnMgdGhlIGNhcmQgd2l0aCBlaXRoZXIgdGhlIHJpZ2h0IHNpZGUgb3IgbGVmdCBzaWRlIG9mIHRoZSB0cmlnZ2VyaW5nIGljb25cbiAgICAgKlxuICAgICAqXG4gICAgICogIFYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVlxuICAgICAqICAuLi4uLi5eLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIG9yICAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLl4uLi4uLi5cbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqICBiKSBTbWFsbCBsZWZ0ICwgc21hbGwgcmlnaHRcbiAgICAgKlxuICAgICAqICBUaGlzIGlzIGZvciBjYXNlcyB3aGVyZSB0aGVyZSBpcyBub3QgZW5vdWdoIHNwYWNlIGFuZCBQcmltZU5HIHBvc2l0aW9uIHRoZSBjYXJkIG9mZiB0byB0aGVcbiAgICAgKiAgdHJpZ2dlcmluZyBpY29ucywgc28gZXZlbiBwcmltZU5nIGRvZXMgbm90IGhhdmUgc3BhY2UgdG8gYWxpZ24gaXQgd2l0aCB0aGUgVlxuICAgICAqXG4gICAgICpcbiAgICAgKiAgICAgViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZcbiAgICAgKiAgLi4uLl4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gb3IgIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXi4uLi5cbiAgICAgKlxuICAgICAqXG4gICAgICogYylBbGlnbmVkIHdpdGggdGhlIGVkZ2Ugb2YgYnJvd3NlclxuICAgICAqXG4gICAgICogT24gdGhlIHJpZ2h0IHNpZGUgdGhpcyBpcyBwcm9ibGVtIGFzIHdlIGNhbm5vdCBjYWxjdWxhdGUgZnVsbCBmdXR1cmUgd2lkdGggb2YgdGhlIGNhcmQuXG4gICAgICogYnV0IHdlIGFwcGxseSBmb3IgdGhpcyBjYXNlICNiIChhcnJvdyAxMCUgKVxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0xlZnRGb3JBbGlnbm1lbnQoYm91bmRpbmdSZWN0OiBhbnksIGFsaWdubWVudDogSENDYXJkQWxpZ25tZW50KTogbnVtYmVyXG4gICAge1xuICAgICAgICAvLyB3aWR0aCBmb3Igd2hpY2ggd2UgbmVlZCB0byBzaGlmdCBjYXJkLiAyNSUgb3IgMTAlIG9mIHRoZSBjb250YWluZXIgd2lkdGhcbiAgICAgICAgbGV0IHdMYXJnZVRyaWFuZ2xlID0gYm91bmRpbmdSZWN0LndpZHRoICogMC4yNTtcbiAgICAgICAgbGV0IHdTbWFsbFRyaWFuZ2xlID0gYm91bmRpbmdSZWN0LndpZHRoICogMC4xMDtcblxuICAgICAgICBzd2l0Y2ggKGFsaWdubWVudCkge1xuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQucmlnaHQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0UmlnaHQgPSBib3VuZGluZ1JlY3QubGVmdCArIHdMYXJnZVRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIGxldCB0cmlnUmlnaHQgPSB0aGlzLnRyaWdSZWN0LnJpZ2h0IC0gdGhpcy50cmlnSWNvbk1pZGRsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRSaWdodCAtIChib3VuZGluZ1JlY3QucmlnaHQgLSB0cmlnUmlnaHQpO1xuXG4gICAgICAgICAgICBjYXNlIEhDQ2FyZEFsaWdubWVudC5wYWRkZWRSaWdodDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRSaWdodFMgPSBib3VuZGluZ1JlY3QubGVmdCArIHdTbWFsbFRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIGxldCB0cmlnUmlnaHRTID0gdGhpcy50cmlnUmVjdC5yaWdodCAtIHRoaXMudHJpZ0ljb25NaWRkbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0UmlnaHRTIC0gKGJvdW5kaW5nUmVjdC5yaWdodCAtIHRyaWdSaWdodFMpO1xuXG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LnBhZGRlZExlZnQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0TGVmdFBhZCA9IGJvdW5kaW5nUmVjdC5sZWZ0IC0gd1NtYWxsVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0TGVmdFBhZCArIHRoaXMudHJpZ0ljb25NaWRkbGU7XG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LmxlZnQ6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCBzaGlmdExlZnQgPSBib3VuZGluZ1JlY3QubGVmdCAtIHdMYXJnZVRyaWFuZ2xlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdExlZnQgKyB0aGlzLnRyaWdJY29uTWlkZGxlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuIl19