/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { assert, Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OverlayComponent } from '../overlay/overlay.component';
/** @enum {number} */
var HCCardPosition = {
    top: 0,
    bottom: 1,
    none: 2,
};
export { HCCardPosition };
HCCardPosition[HCCardPosition.top] = "top";
HCCardPosition[HCCardPosition.bottom] = "bottom";
HCCardPosition[HCCardPosition.none] = "none";
/** @enum {number} */
var HCCardAlignment = {
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
var /** @type {?} */ PositionToStyle = {
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
var /** @type {?} */ AlignmentToStyle = {
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
var HoverCardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HoverCardComponent, _super);
    function HoverCardComponent(elem, env, cd) {
        var _this = _super.call(this, env) || this;
        _this.elem = elem;
        _this.env = env;
        _this.cd = cd;
        /**
         * Should we keep the hover card open and force user to manually close
         *
         */
        _this.forceClose = true;
        /**
         *
         * This current workaround until we find better solution. PrimeNG overlays operates within
         * its relative element so if the overlay is wrapped inside some other relative container
         * the overlay content is croped by its parent and content is not visible.
         *
         * They have [appendTo] binding which we need to use for this purpose
         *
         */
        _this.appendContentToBody = true;
        /**
         *
         * Internal style class to use to apply additional styles when it needs to show a Arrow on the
         * card
         *
         */
        _this.arrowClass = '';
        _this.opening = false;
        _this.currrentPosition = HCCardPosition.none;
        return _this;
    }
    /**
     * @return {?}
     */
    HoverCardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        assert(isPresent(this.linkTitle), 'You must provide [linkTitle] binding !');
        // make sure there is open HC when we start new component
        this.env.deleteValue('hc-open');
        if (!this.appendContentToBody) {
            this.appendTo = null;
        }
    };
    /**
     * As of Angular 5 we have to introduce this ViewChecked as PrimeNG does final calculation
     * during this phase.
     *
     * So now its broken down into two parts:
     *   - Apply class styles
     *   - Position it.
     */
    /**
     * As of Angular 5 we have to introduce this ViewChecked as PrimeNG does final calculation
     * during this phase.
     *
     * So now its broken down into two parts:
     *   - Apply class styles
     *   - Position it.
     * @return {?}
     */
    HoverCardComponent.prototype.ngAfterViewChecked = /**
     * As of Angular 5 we have to introduce this ViewChecked as PrimeNG does final calculation
     * during this phase.
     *
     * So now its broken down into two parts:
     *   - Apply class styles
     *   - Position it.
     * @return {?}
     */
    function () {
        if (this.opening) {
            var /** @type {?} */ container = this.awOverlay.overlay.container;
            var /** @type {?} */ cntRect = container.getBoundingClientRect();
            if (this.currrentPosition !== HCCardPosition.none) {
                this.adjustCard(container, cntRect, this.awOverlay.overlay);
            }
            else {
                this.arrowClass = '';
            }
            this.opening = false;
        }
    };
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     */
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     * @return {?}
     */
    HoverCardComponent.prototype.initElements = /**
     * Init elements BoundingClientRect that we use for calculation
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
        var /** @type {?} */ triggerElem = this.elem.nativeElement.querySelector('.sap-icon');
        this.titleAreaRect = titleElem.getBoundingClientRect();
        this.trigRect = triggerElem.getBoundingClientRect();
        this.trigIconMiddle = this.trigRect.width / 2;
    };
    /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     */
    /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     * @param {?} event
     * @return {?}
     */
    HoverCardComponent.prototype.openCard = /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (isPresent(this.awOverlay) && !this.env.hasValue('hc-open')) {
            this.awOverlay.open(event);
            this.env.setValue('hc-open', true);
        }
    };
    /**
     *
     * Fired at the end of the opening cycle when all is initialized and the card is about to
     * fade in.
     *
     * This method first simulates displaying card by setting display:block and
     * domHandler.absolutePosition so we can read dimensions and then later on position the card
     * accordingly.
     *
     */
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
    HoverCardComponent.prototype.cardOpened = /**
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
    function (event) {
        var /** @type {?} */ container = this.awOverlay.overlay.container;
        var /** @type {?} */ target = this.awOverlay.overlay.target;
        this.openForAdjustments(container);
        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
        var /** @type {?} */ cntRect = container.getBoundingClientRect();
        this.currrentPosition = this.positionForCard(container, cntRect);
        this.applyStyleClass(container, cntRect, this.awOverlay.overlay);
        this.closeForAdjustments(container);
        this.opening = true;
    };
    /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     */
    /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     * @param {?} event
     * @return {?}
     */
    HoverCardComponent.prototype.cardClosed = /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.env.deleteValue('hc-open');
    };
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
     */
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
    HoverCardComponent.prototype.adjustCard = /**
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
    function (container, containerRect, modalContainer) {
        var /** @type {?} */ diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        var /** @type {?} */ scrollTop = modalContainer.domHandler.getWindowScrollTop();
        var /** @type {?} */ posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';
        var /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
        container.style.left = this.calcLeftForAlignment(containerRect, alignment) + 'px';
    };
    /**
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    HoverCardComponent.prototype.applyStyleClass = /**
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    function (container, containerRect, modalContainer) {
        if (this.currrentPosition !== HCCardPosition.none) {
            var /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
            this.arrowClass = (/** @type {?} */ (PositionToStyle))[(/** @type {?} */ (HCCardPosition))[this.currrentPosition]];
            this.arrowClass += (/** @type {?} */ (AlignmentToStyle))[(/** @type {?} */ (HCCardAlignment))[alignment]];
        }
        else {
            this.arrowClass = '';
        }
    };
    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     */
    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     * @param {?} container
     * @param {?} boundingRect
     * @return {?}
     */
    HoverCardComponent.prototype.positionForCard = /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     * @param {?} container
     * @param {?} boundingRect
     * @return {?}
     */
    function (container, boundingRect) {
        // secure this in case of IE returning undefined
        var /** @type {?} */ borderWidth = getComputedStyle(container).borderWidth;
        var /** @type {?} */ cntWidth = parseFloat(borderWidth || '0');
        var /** @type {?} */ pos = HCCardPosition.none;
        if (this.trigRect.bottom < boundingRect.top) {
            pos = HCCardPosition.bottom;
        }
        else if (this.trigRect.top > (boundingRect.bottom - cntWidth)) {
            pos = HCCardPosition.top;
        }
        return pos;
    };
    /**
     *
     * Detect horizontal alignment.
     *
     * @param {?} boundingRect
     * @param {?} modalContainer
     * @return {?}
     */
    HoverCardComponent.prototype.alignmentForCard = /**
     *
     * Detect horizontal alignment.
     *
     * @param {?} boundingRect
     * @param {?} modalContainer
     * @return {?}
     */
    function (boundingRect, modalContainer) {
        var /** @type {?} */ alignment = HCCardAlignment.left;
        var /** @type {?} */ viewPort = modalContainer.domHandler.getViewport();
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
    };
    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     */
    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     * @param {?} container
     * @return {?}
     */
    HoverCardComponent.prototype.openForAdjustments = /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     * @param {?} container
     * @return {?}
     */
    function (container) {
        container.style.visibility = 'hidden';
        container.style.display = 'block';
        this.initElements();
    };
    /**
     *
     * Turn off display back NONE
     *
     */
    /**
     *
     * Turn off display back NONE
     *
     * @param {?} container
     * @return {?}
     */
    HoverCardComponent.prototype.closeForAdjustments = /**
     *
     * Turn off display back NONE
     *
     * @param {?} container
     * @return {?}
     */
    function (container) {
        container.style.visibility = 'visible';
        // container.style.display = 'none';
    };
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
    HoverCardComponent.prototype.calcLeftForAlignment = /**
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
    function (boundingRect, alignment) {
        // width for which we need to shift card. 25% or 10% of the container width
        var /** @type {?} */ wLargeTriangle = boundingRect.width * 0.25;
        var /** @type {?} */ wSmallTriangle = boundingRect.width * 0.10;
        switch (alignment) {
            case HCCardAlignment.right:
                var /** @type {?} */ shiftRight = boundingRect.left + wLargeTriangle;
                var /** @type {?} */ trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);
            case HCCardAlignment.paddedRight:
                var /** @type {?} */ shiftRightS = boundingRect.left + wSmallTriangle;
                var /** @type {?} */ trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);
            case HCCardAlignment.paddedLeft:
                var /** @type {?} */ shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;
            case HCCardAlignment.left:
            default:
                var /** @type {?} */ shiftLeft = boundingRect.left - wLargeTriangle;
                return shiftLeft + this.trigIconMiddle;
        }
    };
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
                    template: "<span class=\"w-hc\">\n    <span class=\"w-hc-title\">\n        <aw-string [value]=\"linkTitle\"></aw-string>\n        <span class=\"sap-icon icon-slim-arrow-down\" (mouseover)=\"openCard($event)\"></span>\n    </span>\n\n    <div class=\"w-hc-body\">\n\n         <aw-overlay #overlay [showCloseIcon]=\"forceClose\" [dismissable]=\"!forceClose\"\n                     [styleClass]=\"arrowClass\"\n                     [appendTo]=\"appendTo\"\n                     (onOpen)=\"cardOpened($event)\"\n                     (onClose)=\"cardClosed($event)\">\n\n        <!-- this is workaround to create a _ngcontent-INDEX reference so we can\n        refer to this ng-content. Angular does not have any way right now to track this\n        -->\n        <span class=\"u-ngcontent\">\n                <ng-content></ng-content>\n            </span>\n\n    </aw-overlay>\n\n    </div>\n</span>\n\n\n<!--<ng-template #contentToBody>-->\n    <!--<aw-overlay #overlay [showCloseIcon]=\"forceClose\" [dismissable]=\"!forceClose\"-->\n                <!--[styleClass]=\"arrowClass\"-->\n                <!--[appendTo]=\"appendTo\"-->\n                <!--(onOpen)=\"cardOpened($event)\"-->\n                <!--(onClose)=\"cardClosed($event)\">-->\n\n        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->\n        <!--refer to this ng-content. Angular does not have any way right now to track this-->\n        <!--&ndash;&gt;-->\n        <!--<span class=\"u-ngcontent\">-->\n                <!--<ng-content></ng-content>-->\n            <!--</span>-->\n\n    <!--</aw-overlay>-->\n\n<!--</ng-template>-->\n\n\n<!--<ng-template #contentToOverlay>-->\n\n    <!--<aw-overlay #overlay [showCloseIcon]=\"forceClose\" [dismissable]=\"!forceClose\"-->\n                <!--[styleClass]=\"arrowClass\"-->\n                <!--(onOpen)=\"cardOpened($event)\"-->\n                <!--(onClose)=\"cardClosed($event)\">-->\n\n        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->\n        <!--refer to this ng-content. Angular does not have any way right now to track this-->\n        <!--&ndash;&gt;-->\n        <!--<span class=\"u-ngcontent\">-->\n                <!--<ng-content></ng-content>-->\n            <!--</span>-->\n\n    <!--</aw-overlay>-->\n<!--</ng-template>-->\n\n\n",
                    styles: [".w-hc-title{padding-right:1.4em;position:relative;white-space:nowrap}.w-hc-title .sap-icon{font-size:1em;color:#00679e;position:absolute;padding-top:.2em;right:0}::ng-deep .w-hc-panel-arrow.u-hc-shadow-b{box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow.u-hc-shadow-t{box-shadow:0 -2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow:after,::ng-deep .w-hc-panel-arrow:before{left:25%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}::ng-deep .w-hc-panel-arrow:after{border-color:rgba(136,183,213,0);border-width:.7em;margin-left:-.7em}::ng-deep .w-hc-panel-arrow:before{border-color:rgba(255,136,56,0);border-width:.8em;margin-left:-.8em}::ng-deep .u-hc-arrow-ll:after,::ng-deep .u-hc-arrow-ll:before{left:25%}::ng-deep .u-hc-arrow-lr:after,::ng-deep .u-hc-arrow-lr:before{left:75%}::ng-deep .u-hc-arrow-sl:after,::ng-deep .u-hc-arrow-sl:before{left:10%}::ng-deep .u-hc-arrow-sr:after,::ng-deep .u-hc-arrow-sr:before{left:90%}::ng-deep .u-hc-arrow-t:after,::ng-deep .u-hc-arrow-t:before{bottom:100%}::ng-deep .u-hc-arrow-t:after{border-bottom-color:#fff}::ng-deep .u-hc-arrow-t:before{border-bottom-color:#d7d7d7}::ng-deep .u-hc-arrow-b:after,::ng-deep .u-hc-arrow-b:before{top:100%}::ng-deep .u-hc-arrow-b:after{border-top-color:#fff}::ng-deep .u-hc-arrow-b:before{border-top-color:#d7d7d7}"]
                },] },
    ];
    /** @nocollapse */
    HoverCardComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment },
        { type: ChangeDetectorRef }
    ]; };
    HoverCardComponent.propDecorators = {
        linkTitle: [{ type: Input }],
        forceClose: [{ type: Input }],
        appendContentToBody: [{ type: Input }],
        awOverlay: [{ type: ViewChild, args: ['overlay',] }]
    };
    return HoverCardComponent;
}(BaseComponent));
export { HoverCardComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QzlELHFCQUFNLGVBQWUsR0FBRztJQUNwQixHQUFHLEVBQUUsOENBQThDO0lBQ25ELE1BQU0sRUFBRSw4Q0FBOEM7SUFDdEQsSUFBSSxFQUFFLEVBQUU7Q0FDWCxDQUFDOzs7Ozs7Ozs7Ozs7QUFjRixxQkFBTSxnQkFBZ0IsR0FBRztJQUNyQixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsVUFBVSxFQUFFLGdCQUFnQjtJQUM1QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxnQkFBZ0I7Q0FDNUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9Hc0MsOENBQWE7SUF3RWpELDRCQUFzQixJQUFnQixFQUFTLEdBQWdCLEVBQzNDO1FBRHBCLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIcUIsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDM0MsUUFBRSxHQUFGLEVBQUU7Ozs7OzJCQS9DQSxJQUFJOzs7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OzRCQU1MLFNBQVMsU0FBQyxTQUFTOzs2QkE5T3hCO0VBa013QyxhQUFhO1NBQXhDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge092ZXJsYXlDb21wb25lbnR9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogRGVmaW5lcyB3aGVyZSB0aGUgQ2FyZCBpcyBwb3NpdGlvbmVkLiBJdCBjYW4gYmUgZWl0aGVyOlxuICogICAgLSBhYm92ZSB0aGUgdHJpZ2dlcmluZyBsaW5rXG4gKiAgICAtIHVuZGVyIHRoZSB0cmlnZ2VyaW5nIGxpbmtcbiAqICAgIC0gY29tcGxldGVseSBvbiB0b3Agb2YgaXQgLSBjb3ZlcmluZyBpdC4gRm9yIHRoaXMgY2FzZSB0aGVyZSBpcyBub25lIGFzIG5vIHN0eWxlIGlzIGFwcGxpZWRcbiAqL1xuZXhwb3J0IGVudW0gSENDYXJkUG9zaXRpb24ge1xuICAgIHRvcCxcbiAgICBib3R0b20sXG4gICAgbm9uZVxufVxuXG4vKipcbiAqIERlZmluZXMgd2hlcmUgdGhlIENhcmQgaXMgcG9zaXRpb25lZCBieSBkZWZhdWx0LiBNZWFuaW5nIHdoZXJlIHByaW1lTkcgY29kZSBwdXQgaXQuXG4gKlxuICogV2hlbiB0aGVyZSBpcyBhbGxvdCBvZiBzcGFjZSBvbiB0aGUgc2lkZXMgPj0gIChMZWZ0IG9yIFJpZ2h0KSBpcyB1c2VkXG4gKiAocGFkZGVkTGVmdCwgcGFkZGVkUmlnaHQpIG90aGVyd2lzZS4gV2hlbiB0aGVyZSBpcyBub3QgbXVjaCBzcGFjZSBhbmQgY2FyZCBjb250YWluZXJcbiAqICBpcyBub3QgYWxpZ25lZCAobGVmdCwgcmlnaHQpIHdpdGggdGhlIHRyaWdlcmluZyBpY29uIGJ1dCBpdCBpcyBzaGlmdGVkIHRvIGZpdCBpbnRvIHRoZSBzY3JlZW5cbiAqL1xuZW51bSBIQ0NhcmRBbGlnbm1lbnQge1xuICAgIGxlZnQsXG4gICAgcGFkZGVkTGVmdCxcbiAgICByaWdodCxcbiAgICBwYWRkZWRSaWdodCxcbiAgICBkZWZhdWx0XG59XG5cbi8qKlxuICogTWFwcyBwb3NpdGlvbiB0byBzdHlsZXMgdGhhdCBhcmUgYXBwbGllZCB0byB0aGUgQ2FyZCBjb250YWluZXIuIFRoaXMgaXMganVzdCB0byBtYWtlIGl0IGVhc2llclxuICogYXMgd2UgYXJlIHdvcmtpbmcgd2l0aCBlbnVtZXJhdGlvbnMgYW5kIGhhdmUgYWxyZWFkeSBlbnVtIHR5cGUuXG4gKlxuICogdS1oYy1hcnJvdy1iOiBBcnJvdyB3aWxsIGFwcGVhciBhdCB0aGUgYm90dG9tXG4gKiB1LWhjLWFycm93LXQ6IEFycm93IHdpbGwgYXBwZWFyIGF0IHRoZSB0b3BcbiAqXG4gKiB1LWhjLXNoYWRvdy10OiBCb3JkZXIgc2hhZG93IHdpbGwgYXBwZWFyIGF0IHRoZSB0b3BcbiAqIHUtaGMtc2hhZG93LWI6IEJvcmRlciBzaGFkb3cgd2lsbCBhcHBlYXIgYXQgdGhlIGJvdHRvbVxuICovXG5jb25zdCBQb3NpdGlvblRvU3R5bGUgPSB7XG4gICAgdG9wOiAnIHctaGMtcGFuZWwtYXJyb3cgdS1oYy1hcnJvdy1iIHUtaGMtc2hhZG93LXQnLFxuICAgIGJvdHRvbTogJyB3LWhjLXBhbmVsLWFycm93IHUtaGMtYXJyb3ctdCB1LWhjLXNoYWRvdy1iJyxcbiAgICBub25lOiAnJ1xufTtcblxuXG4vKipcbiAqXG4gKiBNYXBzIGFsaWduZWQgQ2FyZCBjb250YWluZXIgdG8gY3VzdG9tIHN0eWxlcyBpbiBvcmRlciB0byBhcHBseSBjb3JyZWN0IGFycm93XG4gKlxuICogLWxsOiBTdGFuZHMgZm9yIExhcmdlIExlZnQgKGxhcmdlOiB0aGVyZSBpcyBwbGVudHkgb2Ygc3BhY2UgYXJvdW5kIClcbiAqIC1scjogU3RhbmRzIGZvciBMYXJnZSByaWdodFxuICogLXNsOiBTdGFuZHMgZm9yIFNtYWxsIGxlZnQgKFNtYWxsIGFuZCByZXNpemVkIHNjcmVlbiB3aGVyZSB3ZSB0cnkgdG8gZml0IGNhcmQgY29udGFpbmVyXG4gKiBzb21ld2hlcmUgaW4gYmV0d2VlbilcbiAqIC1zcjogU3RhbmRzIGZvciBMYXJnZSByaWdodFxuICpcbiAqL1xuY29uc3QgQWxpZ25tZW50VG9TdHlsZSA9IHtcbiAgICBsZWZ0OiAnIHUtaGMtYXJyb3ctbGwnLFxuICAgIHJpZ2h0OiAnIHUtaGMtYXJyb3ctbHInLFxuICAgIHBhZGRlZExlZnQ6ICcgdS1oYy1hcnJvdy1zbCcsXG4gICAgcGFkZGVkUmlnaHQ6ICcgdS1oYy1hcnJvdy1zcicsXG4gICAgZGVmYXVsdDogJyB1LWhjLWFycm93LWxsJyxcbn07XG5cbi8qKlxuICogVGhlIEhvdmVyQ2FyZCBjb21wb25lbnRzIGFkZHMgaG92ZXIgYmVoYXZpb3IgdG8gdGV4dCwgdGhlIHNwZWNpZmllZCBjb250ZW50IGlzIGxvYWRlZFxuICogb24gdGhlIGxlZnQgb3IgcmlnaHQgc2lkZSBvZiB0aGUgZWxlbWVudC5cbiAqXG4gKiBUb2RvOiBleHRlbmRzIHNvIHdlIGNhbiB3cmFwIGFueSBlbGVtZW50IGFuZCBhbnkgZWxlbWVudCBjYW4gYmUgdHJpZ2dlcmluZyB0aGlzLiBOb3Qgb25seVxuICogbGlua1RpdGxlXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICpcbiAqICAgPGF3LWhvdmVyLWNhcmQgW2xpbmtUaXRsZV09XCInRnJhbmsga29sYXInXCI+XG4gKiAgICAgICA8aDM+TXkgQ2FyZCBUaXRsZTwvaDM+XG4gKiAgICAgICA8ZGl2PlxuICpcbiAqICAgICAgICAgICBUaGlzIGlzIG15IGNvbnRlbnRzXG4gKlxuICogICAgICAgPC9kaXY+XG4gKlxuICpcbiAqICAgIDwvYXctaG92ZXItY2FyZD5cbiAqIGBgYFxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlcmUgaXMgW2ZvcmNlQ2xvc2VdPXRydWUgd2hpY2ggZm9yY2VzIHRoZSB1c2VyIHRvIHVzZSBYIGNsb3NlIGljb25cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1ob3Zlci1jYXJkJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwidy1oY1wiPlxuICAgIDxzcGFuIGNsYXNzPVwidy1oYy10aXRsZVwiPlxuICAgICAgICA8YXctc3RyaW5nIFt2YWx1ZV09XCJsaW5rVGl0bGVcIj48L2F3LXN0cmluZz5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzYXAtaWNvbiBpY29uLXNsaW0tYXJyb3ctZG93blwiIChtb3VzZW92ZXIpPVwib3BlbkNhcmQoJGV2ZW50KVwiPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG5cbiAgICA8ZGl2IGNsYXNzPVwidy1oYy1ib2R5XCI+XG5cbiAgICAgICAgIDxhdy1vdmVybGF5ICNvdmVybGF5IFtzaG93Q2xvc2VJY29uXT1cImZvcmNlQ2xvc2VcIiBbZGlzbWlzc2FibGVdPVwiIWZvcmNlQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgW3N0eWxlQ2xhc3NdPVwiYXJyb3dDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICBbYXBwZW5kVG9dPVwiYXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgICAgICAgKG9uT3Blbik9XCJjYXJkT3BlbmVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgKG9uQ2xvc2UpPVwiY2FyZENsb3NlZCgkZXZlbnQpXCI+XG5cbiAgICAgICAgPCEtLSB0aGlzIGlzIHdvcmthcm91bmQgdG8gY3JlYXRlIGEgX25nY29udGVudC1JTkRFWCByZWZlcmVuY2Ugc28gd2UgY2FuXG4gICAgICAgIHJlZmVyIHRvIHRoaXMgbmctY29udGVudC4gQW5ndWxhciBkb2VzIG5vdCBoYXZlIGFueSB3YXkgcmlnaHQgbm93IHRvIHRyYWNrIHRoaXNcbiAgICAgICAgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidS1uZ2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICA8L2F3LW92ZXJsYXk+XG5cbiAgICA8L2Rpdj5cbjwvc3Bhbj5cblxuXG48IS0tPG5nLXRlbXBsYXRlICNjb250ZW50VG9Cb2R5Pi0tPlxuICAgIDwhLS08YXctb3ZlcmxheSAjb3ZlcmxheSBbc2hvd0Nsb3NlSWNvbl09XCJmb3JjZUNsb3NlXCIgW2Rpc21pc3NhYmxlXT1cIiFmb3JjZUNsb3NlXCItLT5cbiAgICAgICAgICAgICAgICA8IS0tW3N0eWxlQ2xhc3NdPVwiYXJyb3dDbGFzc1wiLS0+XG4gICAgICAgICAgICAgICAgPCEtLVthcHBlbmRUb109XCJhcHBlbmRUb1wiLS0+XG4gICAgICAgICAgICAgICAgPCEtLShvbk9wZW4pPVwiY2FyZE9wZW5lZCgkZXZlbnQpXCItLT5cbiAgICAgICAgICAgICAgICA8IS0tKG9uQ2xvc2UpPVwiY2FyZENsb3NlZCgkZXZlbnQpXCI+LS0+XG5cbiAgICAgICAgPCEtLSZsdDshJm5kYXNoOyB0aGlzIGlzIHdvcmthcm91bmQgdG8gY3JlYXRlIGEgX25nY29udGVudC1JTkRFWCByZWZlcmVuY2Ugc28gd2UgY2FuLS0+XG4gICAgICAgIDwhLS1yZWZlciB0byB0aGlzIG5nLWNvbnRlbnQuIEFuZ3VsYXIgZG9lcyBub3QgaGF2ZSBhbnkgd2F5IHJpZ2h0IG5vdyB0byB0cmFjayB0aGlzLS0+XG4gICAgICAgIDwhLS0mbmRhc2g7Jmd0Oy0tPlxuICAgICAgICA8IS0tPHNwYW4gY2xhc3M9XCJ1LW5nY29udGVudFwiPi0tPlxuICAgICAgICAgICAgICAgIDwhLS08bmctY29udGVudD48L25nLWNvbnRlbnQ+LS0+XG4gICAgICAgICAgICA8IS0tPC9zcGFuPi0tPlxuXG4gICAgPCEtLTwvYXctb3ZlcmxheT4tLT5cblxuPCEtLTwvbmctdGVtcGxhdGU+LS0+XG5cblxuPCEtLTxuZy10ZW1wbGF0ZSAjY29udGVudFRvT3ZlcmxheT4tLT5cblxuICAgIDwhLS08YXctb3ZlcmxheSAjb3ZlcmxheSBbc2hvd0Nsb3NlSWNvbl09XCJmb3JjZUNsb3NlXCIgW2Rpc21pc3NhYmxlXT1cIiFmb3JjZUNsb3NlXCItLT5cbiAgICAgICAgICAgICAgICA8IS0tW3N0eWxlQ2xhc3NdPVwiYXJyb3dDbGFzc1wiLS0+XG4gICAgICAgICAgICAgICAgPCEtLShvbk9wZW4pPVwiY2FyZE9wZW5lZCgkZXZlbnQpXCItLT5cbiAgICAgICAgICAgICAgICA8IS0tKG9uQ2xvc2UpPVwiY2FyZENsb3NlZCgkZXZlbnQpXCI+LS0+XG5cbiAgICAgICAgPCEtLSZsdDshJm5kYXNoOyB0aGlzIGlzIHdvcmthcm91bmQgdG8gY3JlYXRlIGEgX25nY29udGVudC1JTkRFWCByZWZlcmVuY2Ugc28gd2UgY2FuLS0+XG4gICAgICAgIDwhLS1yZWZlciB0byB0aGlzIG5nLWNvbnRlbnQuIEFuZ3VsYXIgZG9lcyBub3QgaGF2ZSBhbnkgd2F5IHJpZ2h0IG5vdyB0byB0cmFjayB0aGlzLS0+XG4gICAgICAgIDwhLS0mbmRhc2g7Jmd0Oy0tPlxuICAgICAgICA8IS0tPHNwYW4gY2xhc3M9XCJ1LW5nY29udGVudFwiPi0tPlxuICAgICAgICAgICAgICAgIDwhLS08bmctY29udGVudD48L25nLWNvbnRlbnQ+LS0+XG4gICAgICAgICAgICA8IS0tPC9zcGFuPi0tPlxuXG4gICAgPCEtLTwvYXctb3ZlcmxheT4tLT5cbjwhLS08L25nLXRlbXBsYXRlPi0tPlxuXG5cbmAsXG4gICAgc3R5bGVzOiBbYC53LWhjLXRpdGxle3BhZGRpbmctcmlnaHQ6MS40ZW07cG9zaXRpb246cmVsYXRpdmU7d2hpdGUtc3BhY2U6bm93cmFwfS53LWhjLXRpdGxlIC5zYXAtaWNvbntmb250LXNpemU6MWVtO2NvbG9yOiMwMDY3OWU7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZy10b3A6LjJlbTtyaWdodDowfTo6bmctZGVlcCAudy1oYy1wYW5lbC1hcnJvdy51LWhjLXNoYWRvdy1ie2JveC1zaGFkb3c6MCAycHggNHB4IDAgcmdiYSgwLDAsMCwuMil9OjpuZy1kZWVwIC53LWhjLXBhbmVsLWFycm93LnUtaGMtc2hhZG93LXR7Ym94LXNoYWRvdzowIC0ycHggNHB4IDAgcmdiYSgwLDAsMCwuMil9OjpuZy1kZWVwIC53LWhjLXBhbmVsLWFycm93OmFmdGVyLDo6bmctZGVlcCAudy1oYy1wYW5lbC1hcnJvdzpiZWZvcmV7bGVmdDoyNSU7Ym9yZGVyOnNvbGlkIHRyYW5zcGFyZW50O2NvbnRlbnQ6XCIgXCI7aGVpZ2h0OjA7d2lkdGg6MDtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfTo6bmctZGVlcCAudy1oYy1wYW5lbC1hcnJvdzphZnRlcntib3JkZXItY29sb3I6cmdiYSgxMzYsMTgzLDIxMywwKTtib3JkZXItd2lkdGg6LjdlbTttYXJnaW4tbGVmdDotLjdlbX06Om5nLWRlZXAgLnctaGMtcGFuZWwtYXJyb3c6YmVmb3Jle2JvcmRlci1jb2xvcjpyZ2JhKDI1NSwxMzYsNTYsMCk7Ym9yZGVyLXdpZHRoOi44ZW07bWFyZ2luLWxlZnQ6LS44ZW19OjpuZy1kZWVwIC51LWhjLWFycm93LWxsOmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy1sbDpiZWZvcmV7bGVmdDoyNSV9OjpuZy1kZWVwIC51LWhjLWFycm93LWxyOmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy1scjpiZWZvcmV7bGVmdDo3NSV9OjpuZy1kZWVwIC51LWhjLWFycm93LXNsOmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy1zbDpiZWZvcmV7bGVmdDoxMCV9OjpuZy1kZWVwIC51LWhjLWFycm93LXNyOmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy1zcjpiZWZvcmV7bGVmdDo5MCV9OjpuZy1kZWVwIC51LWhjLWFycm93LXQ6YWZ0ZXIsOjpuZy1kZWVwIC51LWhjLWFycm93LXQ6YmVmb3Jle2JvdHRvbToxMDAlfTo6bmctZGVlcCAudS1oYy1hcnJvdy10OmFmdGVye2JvcmRlci1ib3R0b20tY29sb3I6I2ZmZn06Om5nLWRlZXAgLnUtaGMtYXJyb3ctdDpiZWZvcmV7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZDdkN2Q3fTo6bmctZGVlcCAudS1oYy1hcnJvdy1iOmFmdGVyLDo6bmctZGVlcCAudS1oYy1hcnJvdy1iOmJlZm9yZXt0b3A6MTAwJX06Om5nLWRlZXAgLnUtaGMtYXJyb3ctYjphZnRlcntib3JkZXItdG9wLWNvbG9yOiNmZmZ9OjpuZy1kZWVwIC51LWhjLWFycm93LWI6YmVmb3Jle2JvcmRlci10b3AtY29sb3I6I2Q3ZDdkN31gXVxufSlcbmV4cG9ydCBjbGFzcyBIb3ZlckNhcmRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHBhZGRpbmcgcmVwcmVzZW50aW5nIGEgaGVpZ2h0IG9mIHRoZSBBcnJvdyBmb3Igd2hpY2ggd2UgbmVlZCB0byB2ZXJ0aWNhbGx5IGFkanVzdFxuICAgICAqIENhcmQgY29udGFpbmVyXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFycm93UGFkID0gMTA7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHNhZmUgdGhyZXNob2xkIHdoZXJlIHRoZXJlIG1pZ2h0IG5vdCBiZSBlbm91Z2ggc3BhY2UgYXJvdW5kIG9yIENhcmQgaXMgYWxpZ25lZCB3aXRoXG4gICAgICogdGhlIGxlZnQgb3IgcmlnaHQgZWRnZSBvZiB0aGUgdmlld3BvcnQgZm9yIHdoaWNoIHdlIG5lZWQgdG8gcG9zaXRpb24gdGhlIEFycm93IGNsb3NlciB0byB0aGVcbiAgICAgKiBzaWRlIG9mIHRoZSBjYXJkXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNwYWNpbmdMaW1pdCA9IDUwO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGxpbmtUaXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHdlIGtlZXAgdGhlIGhvdmVyIGNhcmQgb3BlbiBhbmQgZm9yY2UgdXNlciB0byBtYW51YWxseSBjbG9zZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb3JjZUNsb3NlOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGN1cnJlbnQgd29ya2Fyb3VuZCB1bnRpbCB3ZSBmaW5kIGJldHRlciBzb2x1dGlvbi4gUHJpbWVORyBvdmVybGF5cyBvcGVyYXRlcyB3aXRoaW5cbiAgICAgKiBpdHMgcmVsYXRpdmUgZWxlbWVudCBzbyBpZiB0aGUgb3ZlcmxheSBpcyB3cmFwcGVkIGluc2lkZSBzb21lIG90aGVyIHJlbGF0aXZlIGNvbnRhaW5lclxuICAgICAqIHRoZSBvdmVybGF5IGNvbnRlbnQgaXMgY3JvcGVkIGJ5IGl0cyBwYXJlbnQgYW5kIGNvbnRlbnQgaXMgbm90IHZpc2libGUuXG4gICAgICpcbiAgICAgKiBUaGV5IGhhdmUgW2FwcGVuZFRvXSBiaW5kaW5nIHdoaWNoIHdlIG5lZWQgdG8gdXNlIGZvciB0aGlzIHB1cnBvc2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXBwZW5kQ29udGVudFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gT3ZlcmxheUNvbXBvbmVudCB0byBjYW4gYWNjZXNzIFByaW1lTkcgY29tcG9uZW50IGFzIHdlbGxcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdvdmVybGF5JylcbiAgICBhd092ZXJsYXk6IE92ZXJsYXlDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW50ZXJuYWwgc3R5bGUgY2xhc3MgdG8gdXNlIHRvIGFwcGx5IGFkZGl0aW9uYWwgc3R5bGVzIHdoZW4gaXQgbmVlZHMgdG8gc2hvdyBhIEFycm93IG9uIHRoZVxuICAgICAqIGNhcmRcbiAgICAgKlxuICAgICAqL1xuICAgIGFycm93Q2xhc3M6IHN0cmluZyA9ICcnO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBwcm9wZXJ0aWVzIHRvIHJlZmVyZW5jZXMgdGVtcGxhdGUgZWxlbWVudHMgaW4gb3JkZXIgdG8gY2FsY3VsYXRlIHBvc2l0aW9uaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHRpdGxlQXJlYVJlY3Q6IGFueTtcbiAgICB0cmlnUmVjdDogYW55O1xuICAgIHRyaWdJY29uTWlkZGxlOiBhbnk7XG5cbiAgICBvcGVuaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhcHBlbmRUbzogJ2JvZHknO1xuXG4gICAgY3VycnJlbnRQb3NpdGlvbjogSENDYXJkUG9zaXRpb24gPSBIQ0NhcmRQb3NpdGlvbi5ub25lO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbTogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMubGlua1RpdGxlKSwgJ1lvdSBtdXN0IHByb3ZpZGUgW2xpbmtUaXRsZV0gYmluZGluZyAhJyk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZXJlIGlzIG9wZW4gSEMgd2hlbiB3ZSBzdGFydCBuZXcgY29tcG9uZW50XG4gICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKCdoYy1vcGVuJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFwcGVuZENvbnRlbnRUb0JvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kVG8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBcyBvZiBBbmd1bGFyIDUgd2UgaGF2ZSB0byBpbnRyb2R1Y2UgdGhpcyBWaWV3Q2hlY2tlZCBhcyBQcmltZU5HIGRvZXMgZmluYWwgY2FsY3VsYXRpb25cbiAgICAgKiBkdXJpbmcgdGhpcyBwaGFzZS5cbiAgICAgKlxuICAgICAqIFNvIG5vdyBpdHMgYnJva2VuIGRvd24gaW50byB0d28gcGFydHM6XG4gICAgICogICAtIEFwcGx5IGNsYXNzIHN0eWxlc1xuICAgICAqICAgLSBQb3NpdGlvbiBpdC5cbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5pbmcpIHtcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmNvbnRhaW5lcjtcblxuICAgICAgICAgICAgbGV0IGNudFJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJycmVudFBvc2l0aW9uICE9PSBIQ0NhcmRQb3NpdGlvbi5ub25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYXJkKGNvbnRhaW5lciwgY250UmVjdCwgdGhpcy5hd092ZXJsYXkub3ZlcmxheSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3BlbmluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGVsZW1lbnRzIEJvdW5kaW5nQ2xpZW50UmVjdCB0aGF0IHdlIHVzZSBmb3IgY2FsY3VsYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRFbGVtZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRpdGxlRWxlbSA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53LWhjLXRpdGxlJyk7XG4gICAgICAgIGxldCB0cmlnZ2VyRWxlbSA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXAtaWNvbicpO1xuICAgICAgICB0aGlzLnRpdGxlQXJlYVJlY3QgPSB0aXRsZUVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMudHJpZ1JlY3QgPSB0cmlnZ2VyRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy50cmlnSWNvbk1pZGRsZSA9IHRoaXMudHJpZ1JlY3Qud2lkdGggLyAyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlcyB3aGVuIHVzZXIgbW91c2Ugb3ZlciB0aGUgdHJpZ2dlcmluZyBpY29uIGFuZCBvcGVucyB1cCBvdmVybGF5IGNvbXBvbmVudC4gVG8gbWFrZSBzdXJlXG4gICAgICogb25seSBvbmUgQ2FyZCBpcyBvcGVuZWQgYXQgdGhlIHRpbWUgaXQgdXNlcyBFbnZpcm9ubWVudCB0byBzYXZlIGV4dHJhIGluZm9ybWF0aW9uIGZvciBpdFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuQ2FyZChldmVudDogYW55KTogYW55IHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmF3T3ZlcmxheSkgJiYgIXRoaXMuZW52Lmhhc1ZhbHVlKCdoYy1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMuYXdPdmVybGF5Lm9wZW4oZXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmVudi5zZXRWYWx1ZSgnaGMtb3BlbicsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZpcmVkIGF0IHRoZSBlbmQgb2YgdGhlIG9wZW5pbmcgY3ljbGUgd2hlbiBhbGwgaXMgaW5pdGlhbGl6ZWQgYW5kIHRoZSBjYXJkIGlzIGFib3V0IHRvXG4gICAgICogZmFkZSBpbi5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGZpcnN0IHNpbXVsYXRlcyBkaXNwbGF5aW5nIGNhcmQgYnkgc2V0dGluZyBkaXNwbGF5OmJsb2NrIGFuZFxuICAgICAqIGRvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbiBzbyB3ZSBjYW4gcmVhZCBkaW1lbnNpb25zIGFuZCB0aGVuIGxhdGVyIG9uIHBvc2l0aW9uIHRoZSBjYXJkXG4gICAgICogYWNjb3JkaW5nbHkuXG4gICAgICpcbiAgICAgKi9cbiAgICBjYXJkT3BlbmVkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkuY29udGFpbmVyO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5hd092ZXJsYXkub3ZlcmxheS50YXJnZXQ7XG4gICAgICAgIHRoaXMub3BlbkZvckFkanVzdG1lbnRzKGNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gcHJlLXJ1biBwb3NpdGlvbmluZyBzbyB3ZSBjYW4gY2FsY3VsYXRlIG5ldyBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmRvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbihjb250YWluZXIsIHRhcmdldCk7XG4gICAgICAgIGxldCBjbnRSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmN1cnJyZW50UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uRm9yQ2FyZChjb250YWluZXIsIGNudFJlY3QpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZUNsYXNzKGNvbnRhaW5lciwgY250UmVjdCwgdGhpcy5hd092ZXJsYXkub3ZlcmxheSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZUZvckFkanVzdG1lbnRzKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMub3BlbmluZyA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gY2FyZCBpcyBjbG9zZWQgd2UgbmVlZCB0byByZWxlYXNlIGl0IGFuZCBkZWxldGUgYWxsIHRoZSByZWZlcmVuY2VzIGZyb20gRW52aXJvbm1lbnRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgY2FyZENsb3NlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKCdoYy1vcGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBcHBsaWVzIHN0eWxlLlRPUCBhbmQgc3R5bGUuTEVGVCB0byB0aGUgY29udGFpbmVyIGluIG9yZGVyIHRvIHJlcG9zaXRpb24gaXQgYW5kIGFkZFxuICAgICAqIGV4dHJhIGFycm93LlxuICAgICAqXG4gICAgICogRmlyc3QgYmFzZWQgb24gdGhlIGluaXRpYWwgcG9zaXRpb24gd2UgYXBwbHkgc3R5bGUuVE9QIGFuZCBkZXBlbmRpbmcgaWYgaXRzIG9uIHRoZVxuICAgICAqIHRvcCBvciBib3R0b20gd2UgYXBwbHkgZWl0aGVyIC1Ib3ZlckNhcmRDb21wb25lbnQuQXJyb3dQYWQgb3IgK0hvdmVyQ2FyZENvbXBvbmVudC5BcnJvd1BhZC5cbiAgICAgKlxuICAgICAqIFRoZW4gZm9yIHBvc2l0aW9uaW5nIGhvcml6b250YWxseSB3ZSB1c2UgdHdvIHR5cGVzLlxuICAgICAqICAtIFdoZW4gdGhlcmUgaXMgYWxsb3Qgb2Ygc3BhY2UgdGhlIGFycm93IGlzIDI1JSBmcm9tIHRoZSBlZGdlXG4gICAgICpcbiAgICAgKiAgICAtLS0tLV4tLS0tLS0tLS0tLS0gICBvciAgICAgICAtLS0tLS0tLS0tLV4tLS0tXG4gICAgICpcbiAgICAgKlxuICAgICAqICAtIFdoZW4gdGhlcmUgaXMgbGVzcyBvciBub25lIHNwYWNlIHdlIGhhdmUgb25seSAxMCUgZmFyIGF3YXkgZm9ybSB0aGUgZWRnZVxuICAgICAqXG4gICAgICogICAgLS1eLS0tLS0tLS0tLS0tICAgb3IgICAgICAgLS0tLS0tLS0tLS1eLS1cbiAgICAgKlxuICAgICAqICBPbmNlIHdlIHBpY2sgdGhlIGNvcnJlY3QgcG9zaXRpb25pbmcgKDI1JSwgMTAlKSB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlIGFuZCBzaGlmdCB0aGUgY2FyZFxuICAgICAqICBlaXRoZXIgdG8gdGhlIGxlZnQgb3IgcmlnaHQuXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGp1c3RDYXJkKGNvbnRhaW5lcjogYW55LCBjb250YWluZXJSZWN0OiBhbnksIG1vZGFsQ29udGFpbmVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRpZmYgPSAodGhpcy5jdXJycmVudFBvc2l0aW9uID09PSBIQ0NhcmRQb3NpdGlvbi5ib3R0b20pID8gMSA6IC0xO1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gbW9kYWxDb250YWluZXIuZG9tSGFuZGxlci5nZXRXaW5kb3dTY3JvbGxUb3AoKTtcbiAgICAgICAgbGV0IHBvc1dpdGhTY3JvbGwgPSBjb250YWluZXJSZWN0LnRvcCArIHNjcm9sbFRvcDtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IChwb3NXaXRoU2Nyb2xsICsgKEhvdmVyQ2FyZENvbXBvbmVudC5BcnJvd1BhZCAqIGRpZmYpKSArICdweCc7XG5cbiAgICAgICAgbGV0IGFsaWdubWVudCA9IHRoaXMuYWxpZ25tZW50Rm9yQ2FyZChjb250YWluZXJSZWN0LCBtb2RhbENvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jYWxjTGVmdEZvckFsaWdubWVudChjb250YWluZXJSZWN0LCBhbGlnbm1lbnQpICsgJ3B4JztcbiAgICB9XG5cblxuICAgIGFwcGx5U3R5bGVDbGFzcyhjb250YWluZXI6IGFueSwgY29udGFpbmVyUmVjdDogYW55LCBtb2RhbENvbnRhaW5lcjogYW55KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycnJlbnRQb3NpdGlvbiAhPT0gSENDYXJkUG9zaXRpb24ubm9uZSkge1xuICAgICAgICAgICAgbGV0IGFsaWdubWVudCA9IHRoaXMuYWxpZ25tZW50Rm9yQ2FyZChjb250YWluZXJSZWN0LCBtb2RhbENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICg8YW55PlBvc2l0aW9uVG9TdHlsZSlbKDxhbnk+SENDYXJkUG9zaXRpb24pW3RoaXMuY3VycnJlbnRQb3NpdGlvbl1dO1xuICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzICs9ICg8YW55PkFsaWdubWVudFRvU3R5bGUpWyg8YW55PkhDQ2FyZEFsaWdubWVudClbYWxpZ25tZW50XV07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZXRlY3RzIGlmIHRoZSBjYXJkIGlzIGdvaW5nIHRvIGJlIHNob3duIG9uIHRoZSB0b3Agb2YgdGhlIExpbmsgbGFiZWwgb3IgdW5kZXIuIE9yIGlmXG4gICAgICogaXRzIGNvdmVyaW5nIGl0LlxuICAgICAqXG4gICAgICovXG4gICAgcG9zaXRpb25Gb3JDYXJkKGNvbnRhaW5lcjogYW55LCBib3VuZGluZ1JlY3Q6IGFueSk6IEhDQ2FyZFBvc2l0aW9uIHtcbiAgICAgICAgLy8gc2VjdXJlIHRoaXMgaW4gY2FzZSBvZiBJRSByZXR1cm5pbmcgdW5kZWZpbmVkXG4gICAgICAgIGxldCBib3JkZXJXaWR0aCA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5ib3JkZXJXaWR0aDtcbiAgICAgICAgbGV0IGNudFdpZHRoID0gcGFyc2VGbG9hdChib3JkZXJXaWR0aCB8fCAnMCcpO1xuICAgICAgICBsZXQgcG9zID0gSENDYXJkUG9zaXRpb24ubm9uZTtcblxuICAgICAgICBpZiAodGhpcy50cmlnUmVjdC5ib3R0b20gPCBib3VuZGluZ1JlY3QudG9wKSB7XG4gICAgICAgICAgICBwb3MgPSBIQ0NhcmRQb3NpdGlvbi5ib3R0b207XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmlnUmVjdC50b3AgPiAoYm91bmRpbmdSZWN0LmJvdHRvbSAtIGNudFdpZHRoKSkge1xuICAgICAgICAgICAgcG9zID0gSENDYXJkUG9zaXRpb24udG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGV0ZWN0IGhvcml6b250YWwgYWxpZ25tZW50LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBhbGlnbm1lbnRGb3JDYXJkKGJvdW5kaW5nUmVjdDogYW55LCBtb2RhbENvbnRhaW5lcjogYW55KTogSENDYXJkQWxpZ25tZW50IHtcbiAgICAgICAgbGV0IGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5sZWZ0O1xuICAgICAgICBsZXQgdmlld1BvcnQgPSBtb2RhbENvbnRhaW5lci5kb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ1JlY3QubGVmdC50b0ZpeGVkKDApID09PSBib3VuZGluZ1JlY3QubGVmdC50b0ZpeGVkKDApICYmXG4gICAgICAgICAgICBib3VuZGluZ1JlY3QubGVmdCA+IEhvdmVyQ2FyZENvbXBvbmVudC5TcGFjaW5nTGltaXQpIHtcbiAgICAgICAgICAgIGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5sZWZ0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYm91bmRpbmdSZWN0LmxlZnQgPCBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkTGVmdDtcblxuICAgICAgICB9IGVsc2UgaWYgKCh2aWV3UG9ydC53aWR0aCAtIGJvdW5kaW5nUmVjdC5yaWdodCkgPCBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkUmlnaHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWdSZWN0LnJpZ2h0LnRvRml4ZWQoMCkgPT09IGJvdW5kaW5nUmVjdC5yaWdodC50b0ZpeGVkKDApIHx8XG4gICAgICAgICAgICAodmlld1BvcnQud2lkdGggLSBib3VuZGluZ1JlY3QucmlnaHQpID4gSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdCkge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnJpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxpZ25tZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHVybiBvbiB0ZW1wb3JhcnkgZGlzcGxheSB0byBCTE9DSyBzbyB3ZSBjYW4gcmVhZCBkaW1lbnNpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuRm9yQWRqdXN0bWVudHMoY29udGFpbmVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRzKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFR1cm4gb2ZmIGRpc3BsYXkgYmFjayBOT05FXG4gICAgICpcbiAgICAgKi9cbiAgICBjbG9zZUZvckFkanVzdG1lbnRzKGNvbnRhaW5lcjogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAvLyBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FsY3VsYXRlcyBwb3NpdGlvbmluZyBmb3Igc3R5bGUuTEVGVC4gQXMgYWxyZWFkeSBzYWlkIHRoZXkgYXJlIHR3byB0eXBlcyBvZiB0cmlhbmdsZXMgdGhhdFxuICAgICAqIGFyZSBhcHBsaWVzIGZvciB0aGVzZSBjYXNlOlxuICAgICAqXG4gICAgICpcbiAgICAgKiBhKSBMYXJnZSBsZWZ0LCBMYXJnZSByaWdodFxuICAgICAqXG4gICAgICogIFByaW1lTkcgYWxpZ25zIHRoZSBjYXJkIHdpdGggZWl0aGVyIHRoZSByaWdodCBzaWRlIG9yIGxlZnQgc2lkZSBvZiB0aGUgdHJpZ2dlcmluZyBpY29uXG4gICAgICpcbiAgICAgKlxuICAgICAqICBWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZcbiAgICAgKiAgLi4uLi4uXi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiBvciAgLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5eLi4uLi4uXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKiAgYikgU21hbGwgbGVmdCAsIHNtYWxsIHJpZ2h0XG4gICAgICpcbiAgICAgKiAgVGhpcyBpcyBmb3IgY2FzZXMgd2hlcmUgdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBhbmQgUHJpbWVORyBwb3NpdGlvbiB0aGUgY2FyZCBvZmYgdG8gdGhlXG4gICAgICogIHRyaWdnZXJpbmcgaWNvbnMsIHNvIGV2ZW4gcHJpbWVOZyBkb2VzIG5vdCBoYXZlIHNwYWNlIHRvIGFsaWduIGl0IHdpdGggdGhlIFZcbiAgICAgKlxuICAgICAqXG4gICAgICogICAgIFYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWXG4gICAgICogIC4uLi5eLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIG9yICAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLl4uLi4uXG4gICAgICpcbiAgICAgKlxuICAgICAqIGMpQWxpZ25lZCB3aXRoIHRoZSBlZGdlIG9mIGJyb3dzZXJcbiAgICAgKlxuICAgICAqIE9uIHRoZSByaWdodCBzaWRlIHRoaXMgaXMgcHJvYmxlbSBhcyB3ZSBjYW5ub3QgY2FsY3VsYXRlIGZ1bGwgZnV0dXJlIHdpZHRoIG9mIHRoZSBjYXJkLlxuICAgICAqIGJ1dCB3ZSBhcHBsbHkgZm9yIHRoaXMgY2FzZSAjYiAoYXJyb3cgMTAlIClcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNMZWZ0Rm9yQWxpZ25tZW50KGJvdW5kaW5nUmVjdDogYW55LCBhbGlnbm1lbnQ6IEhDQ2FyZEFsaWdubWVudCk6IG51bWJlciB7XG4gICAgICAgIC8vIHdpZHRoIGZvciB3aGljaCB3ZSBuZWVkIHRvIHNoaWZ0IGNhcmQuIDI1JSBvciAxMCUgb2YgdGhlIGNvbnRhaW5lciB3aWR0aFxuICAgICAgICBsZXQgd0xhcmdlVHJpYW5nbGUgPSBib3VuZGluZ1JlY3Qud2lkdGggKiAwLjI1O1xuICAgICAgICBsZXQgd1NtYWxsVHJpYW5nbGUgPSBib3VuZGluZ1JlY3Qud2lkdGggKiAwLjEwO1xuXG4gICAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBjYXNlIEhDQ2FyZEFsaWdubWVudC5yaWdodDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRSaWdodCA9IGJvdW5kaW5nUmVjdC5sZWZ0ICsgd0xhcmdlVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWdSaWdodCA9IHRoaXMudHJpZ1JlY3QucmlnaHQgLSB0aGlzLnRyaWdJY29uTWlkZGxlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdFJpZ2h0IC0gKGJvdW5kaW5nUmVjdC5yaWdodCAtIHRyaWdSaWdodCk7XG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LnBhZGRlZFJpZ2h0OlxuICAgICAgICAgICAgICAgIGxldCBzaGlmdFJpZ2h0UyA9IGJvdW5kaW5nUmVjdC5sZWZ0ICsgd1NtYWxsVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWdSaWdodFMgPSB0aGlzLnRyaWdSZWN0LnJpZ2h0IC0gdGhpcy50cmlnSWNvbk1pZGRsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRSaWdodFMgLSAoYm91bmRpbmdSZWN0LnJpZ2h0IC0gdHJpZ1JpZ2h0Uyk7XG5cblxuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkTGVmdDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRMZWZ0UGFkID0gYm91bmRpbmdSZWN0LmxlZnQgLSB3U21hbGxUcmlhbmdsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRMZWZ0UGFkICsgdGhpcy50cmlnSWNvbk1pZGRsZTtcblxuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQubGVmdDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0TGVmdCA9IGJvdW5kaW5nUmVjdC5sZWZ0IC0gd0xhcmdlVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0TGVmdCArIHRoaXMudHJpZ0ljb25NaWRkbGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iXX0=