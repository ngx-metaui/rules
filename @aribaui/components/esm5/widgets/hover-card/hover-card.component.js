/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { assert, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OverlayComponent } from '../overlay/overlay.component';
/** @enum {number} */
var HCCardPosition = {
    top: 0,
    bottom: 1,
    none: 2,
};
export { HCCardPosition };
HCCardPosition[HCCardPosition.top] = 'top';
HCCardPosition[HCCardPosition.bottom] = 'bottom';
HCCardPosition[HCCardPosition.none] = 'none';
/** @enum {number} */
var HCCardAlignment = {
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
var PositionToStyle = {
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
var AlignmentToStyle = {
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
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        assert(isPresent(this.linkTitle), 'You must provide [linkTitle] binding !');
        // make sure there is open HC when we start new component
        this.env.deleteValue('hc-open');
        if (!this.appendContentToBody) {
            this.appendTo = null;
        }
        this.overlayOnAnimationStart = this.awOverlay.overlay.onAnimationStart;
        this.awOverlay.overlay.onAnimationStart = function (event) {
            _this.overlayOnAnimationStart.call(_this.awOverlay.overlay, event);
            _this.cardOpened();
            _this.onAnimationStart(event);
        };
        // this span is always available
        this.dynamicContent = this.elem.nativeElement.querySelector('.u-ngcontent');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverCardComponent.prototype.onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.opening) {
            /** @type {?} */
            var container = this.awOverlay.overlay.container;
            /** @type {?} */
            var cntRect = container.getBoundingClientRect();
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
     * @return {?}
     */
    HoverCardComponent.prototype.injectDynamicContent = /**
     * @return {?}
     */
    function () {
        if (this.awOverlay.overlay.visible) {
            /** @type {?} */
            var overlayCnt = this.elem.nativeElement
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
        /** @type {?} */
        var titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
        /** @type {?} */
        var triggerElem = this.elem.nativeElement.querySelector('.sap-icon');
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
            this.cd.detectChanges();
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
     * @param {?=} event
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
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var container = this.awOverlay.overlay.container;
        /** @type {?} */
        var target = this.awOverlay.overlay.target;
        this.openForAdjustments(container);
        this.injectDynamicContent();
        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
        /** @type {?} */
        var cntRect = container.getBoundingClientRect();
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
      * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     */
    /**
     *
     * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     * @param {?} event
     * @return {?}
     */
    HoverCardComponent.prototype.beforeClose = /**
     *
     * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dynamicContent.style = 'none';
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
        /** @type {?} */
        var diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        /** @type {?} */
        var scrollTop = modalContainer.domHandler.getWindowScrollTop();
        /** @type {?} */
        var posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';
        /** @type {?} */
        var alignment = this.alignmentForCard(containerRect, modalContainer);
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
            /** @type {?} */
            var alignment = this.alignmentForCard(containerRect, modalContainer);
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
        /** @type {?} */
        var borderWidth = getComputedStyle(container).borderWidth;
        /** @type {?} */
        var cntWidth = parseFloat(borderWidth || '0');
        /** @type {?} */
        var pos = HCCardPosition.none;
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
        /** @type {?} */
        var alignment = HCCardAlignment.left;
        /** @type {?} */
        var viewPort = modalContainer.domHandler.getViewport();
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
        /** @type {?} */
        var wLargeTriangle = boundingRect.width * 0.25;
        /** @type {?} */
        var wSmallTriangle = boundingRect.width * 0.10;
        switch (alignment) {
            case HCCardAlignment.right:
                /** @type {?} */
                var shiftRight = boundingRect.left + wLargeTriangle;
                /** @type {?} */
                var trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);
            case HCCardAlignment.paddedRight:
                /** @type {?} */
                var shiftRightS = boundingRect.left + wSmallTriangle;
                /** @type {?} */
                var trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);
            case HCCardAlignment.paddedLeft:
                /** @type {?} */
                var shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;
            case HCCardAlignment.left:
            default:
                /** @type {?} */
                var shiftLeft = boundingRect.left - wLargeTriangle;
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
                    template: "<span class=\"w-hc\">\n    <span class=\"w-hc-title\">\n        <aw-string [value]=\"linkTitle\"></aw-string>\n        <span class=\"sap-icon icon-slim-arrow-down\" (mouseover)=\"openCard($event)\"></span>\n    </span>\n\n    <div class=\"w-hc-body\">\n\n         <aw-overlay #overlay [showCloseIcon]=\"forceClose\" [dismissable]=\"!forceClose\"\n                     [styleClass]=\"arrowClass\"\n                     [appendTo]=\"appendTo\"\n                     (beforeClose)=\"beforeClose($event)\"\n                     (onClose)=\"cardClosed($event)\">\n             <ng-content></ng-content>\n        </aw-overlay>\n\n\n        <!-- this is workaround to create a dynamic _ngcontent  reference so we can refer to later on with dynamic\n                projection. We cannot really use componentFactory.create[injector, projectedContent] as what we\n                want to add is another angular component that needs to be still rendered.\n\n                Starting PrimeNG 6.1+ they put in ngIf which complicates programmatic creation of this\n                component and injecting another dynamic content into ngContent is hard, so we need to little\n                hacky hackity hack.\n\n                We have this extra span with a class that we use to insert out dynamic content using nativeElement\n                and its DOM manipulation and once the overlay is shown and ng-content appears we move \"u-ngcontent\"\n                to new location.\n\n         -->\n        <span class=\"u-ngcontent\" [style.display]=\"'none'\">\n        </span>\n    </div>\n</span>\n\n\n",
                    styles: [".w-hc-title{padding-right:1.4em;position:relative;white-space:nowrap}.w-hc-title .sap-icon{font-size:1em;color:#00679e;position:absolute;padding-top:.2em;right:0}::ng-deep .w-hc-panel-arrow.u-hc-shadow-b{box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow.u-hc-shadow-t{box-shadow:0 -2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow:after,::ng-deep .w-hc-panel-arrow:before{left:25%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}::ng-deep .w-hc-panel-arrow:after{border-color:rgba(136,183,213,0);border-width:.7em;margin-left:-.7em}::ng-deep .w-hc-panel-arrow:before{border-color:rgba(255,136,56,0);border-width:.8em;margin-left:-.8em}::ng-deep .u-hc-arrow-ll:after,::ng-deep .u-hc-arrow-ll:before{left:25%}::ng-deep .u-hc-arrow-lr:after,::ng-deep .u-hc-arrow-lr:before{left:75%}::ng-deep .u-hc-arrow-sl:after,::ng-deep .u-hc-arrow-sl:before{left:10%}::ng-deep .u-hc-arrow-sr:after,::ng-deep .u-hc-arrow-sr:before{left:90%}::ng-deep .u-hc-arrow-t:after,::ng-deep .u-hc-arrow-t:before{bottom:100%}::ng-deep .u-hc-arrow-t:after{border-bottom-color:#fff}::ng-deep .u-hc-arrow-t:before{border-bottom-color:#d7d7d7}::ng-deep .u-hc-arrow-b:after,::ng-deep .u-hc-arrow-b:before{top:100%}::ng-deep .u-hc-arrow-b:after{border-top-color:#fff}::ng-deep .u-hc-arrow-b:before{border-top-color:#d7d7d7}"]
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekYsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7OztJQVcxRCxNQUFHO0lBQ0gsU0FBTTtJQUNOLE9BQUk7Ozs4QkFGSixHQUFHOzhCQUNILE1BQU07OEJBQ04sSUFBSTs7O0lBWUosT0FBSTtJQUNKLGFBQVU7SUFDVixRQUFLO0lBQ0wsY0FBVztJQUNYLFVBQU87O2dDQUpQLElBQUk7Z0NBQ0osVUFBVTtnQ0FDVixLQUFLO2dDQUNMLFdBQVc7Z0NBQ1gsT0FBTzs7Ozs7Ozs7Ozs7QUFhWCxJQUFNLGVBQWUsR0FBRztJQUNwQixHQUFHLEVBQUUsOENBQThDO0lBQ25ELE1BQU0sRUFBRSw4Q0FBOEM7SUFDdEQsSUFBSSxFQUFFLEVBQUU7Q0FDWCxDQUFDOzs7Ozs7Ozs7Ozs7QUFjRixJQUFNLGdCQUFnQixHQUFHO0lBQ3JCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLGdCQUFnQjtDQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0NzQyw4Q0FBYTtJQW9GakQsNEJBQXNCLElBQWdCLEVBQVMsR0FBZ0IsRUFDM0M7UUFEcEIsWUFHSSxrQkFBTSxHQUFHLENBQUMsU0FDYjtRQUpxQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUMzQyxRQUFFLEdBQUYsRUFBRTs7Ozs7MkJBMURBLElBQUk7Ozs7Ozs7Ozs7b0NBYUssSUFBSTs7Ozs7OzsyQkFlZCxFQUFFO3dCQVdKLEtBQUs7aUNBSVcsY0FBYyxDQUFDLElBQUk7O0tBa0JyRDs7OztJQUVELHFDQUFROzs7SUFBUjtRQUFBLGlCQXdCQztRQXRCRyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDOztRQUc1RSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxLQUFxQjtZQUU1RCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWpFLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEMsQ0FBQzs7UUFHRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUMvRTs7Ozs7SUFHRCw2Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsS0FBcUI7UUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ2YsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztZQUNqRCxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBRS9EO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7YUFDeEI7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QjtLQUNKOzs7O0lBR0QsaURBQW9COzs7SUFBcEI7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNqQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7aUJBQ25DLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBRTVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUMvRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ3ZDO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUN0QztLQUNKO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx5Q0FBWTs7Ozs7SUFBWjs7UUFFSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQ3JFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDakQ7SUFHRDs7Ozs7O09BTUc7Ozs7Ozs7Ozs7SUFDSCxxQ0FBUTs7Ozs7Ozs7O0lBQVIsVUFBUyxLQUFVO1FBRWYsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBR0Q7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7Ozs7O0lBQ0gsdUNBQVU7Ozs7Ozs7Ozs7OztJQUFWLFVBQVcsS0FBVzs7UUFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztRQUNqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztRQUc1QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztRQUN0RSxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ3ZCO0lBR0Q7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILHVDQUFVOzs7Ozs7OztJQUFWLFVBQVcsS0FBVTtRQUVqQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNuQztJQUdEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSCx3Q0FBVzs7Ozs7Ozs7SUFBWCxVQUFZLEtBQVU7UUFFbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ3RDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ0gsdUNBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQVYsVUFBVyxTQUFjLEVBQUUsYUFBa0IsRUFBRSxjQUFtQjs7UUFFOUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUN0RSxJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O1FBQy9ELElBQUksYUFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ2xELFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztRQUVwRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JFLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ3JGOzs7Ozs7O0lBR0QsNENBQWU7Ozs7OztJQUFmLFVBQWdCLFNBQWMsRUFBRSxhQUFrQixFQUFFLGNBQW1CO1FBR25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFNLGVBQWUsRUFBQyxDQUFDLG1CQUFNLGNBQWMsRUFBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFVBQVUsSUFBSSxtQkFBTSxnQkFBZ0IsRUFBQyxDQUFDLG1CQUFNLGVBQWUsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FFakY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO0tBQ0o7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7OztJQUNILDRDQUFlOzs7Ozs7Ozs7SUFBZixVQUFnQixTQUFjLEVBQUUsWUFBaUI7O1FBRzdDLElBQUksV0FBVyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7UUFDMUQsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQzs7UUFDOUMsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztTQUMvQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO1NBQzVCO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNkOzs7Ozs7Ozs7SUFRTyw2Q0FBZ0I7Ozs7Ozs7O2NBQUMsWUFBaUIsRUFBRSxjQUFtQjs7UUFFM0QsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQzs7UUFDckMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlELFlBQVksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQ3hELENBQUM7WUFDRyxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztTQUVwQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDN0QsU0FBUyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7U0FFMUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLFNBQVMsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO1NBRTNDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkUsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FDNUUsQ0FBQztZQUNHLFNBQVMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO1NBRXJDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixTQUFTLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUN2QztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7O0lBR3JCOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsK0NBQWtCOzs7Ozs7O0lBQWxCLFVBQW1CLFNBQWM7UUFFN0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDdkI7SUFHRDs7OztPQUlHOzs7Ozs7OztJQUNILGdEQUFtQjs7Ozs7OztJQUFuQixVQUFvQixTQUFjO1FBRTlCLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzs7S0FFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNDTyxpREFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBQUMsWUFBaUIsRUFBRSxTQUEwQjs7UUFHdEUsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQy9DLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxlQUFlLENBQUMsS0FBSzs7Z0JBQ3RCLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDOztnQkFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDMUQsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFFekQsS0FBSyxlQUFlLENBQUMsV0FBVzs7Z0JBQzVCLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDOztnQkFDckQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFHM0QsS0FBSyxlQUFlLENBQUMsVUFBVTs7Z0JBQzNCLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFOUMsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQzFCOztnQkFDSSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztnQkFDbkQsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzlDOzs7Ozs7O2tDQWhhNkIsRUFBRTs7Ozs7OztzQ0FRRSxFQUFFOztnQkFyQjNDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIscWtEQUEwQzs7aUJBRTdDOzs7O2dCQXpHcUMsVUFBVTtnQkFFaEMsV0FBVztnQkFGbkIsaUJBQWlCOzs7NEJBNkhwQixLQUFLOzZCQU9MLEtBQUs7c0NBYUwsS0FBSzs0QkFNTCxTQUFTLFNBQUMsU0FBUzs7NkJBM0t4QjtFQThId0MsYUFBYTtTQUF4QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge092ZXJsYXlDb21wb25lbnR9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogRGVmaW5lcyB3aGVyZSB0aGUgQ2FyZCBpcyBwb3NpdGlvbmVkLiBJdCBjYW4gYmUgZWl0aGVyOlxuICogICAgLSBhYm92ZSB0aGUgdHJpZ2dlcmluZyBsaW5rXG4gKiAgICAtIHVuZGVyIHRoZSB0cmlnZ2VyaW5nIGxpbmtcbiAqICAgIC0gY29tcGxldGVseSBvbiB0b3Agb2YgaXQgLSBjb3ZlcmluZyBpdC4gRm9yIHRoaXMgY2FzZSB0aGVyZSBpcyBub25lIGFzIG5vIHN0eWxlIGlzIGFwcGxpZWRcbiAqL1xuZXhwb3J0IGVudW0gSENDYXJkUG9zaXRpb25cbntcbiAgICB0b3AsXG4gICAgYm90dG9tLFxuICAgIG5vbmVcbn1cblxuLyoqXG4gKiBEZWZpbmVzIHdoZXJlIHRoZSBDYXJkIGlzIHBvc2l0aW9uZWQgYnkgZGVmYXVsdC4gTWVhbmluZyB3aGVyZSBwcmltZU5HIGNvZGUgcHV0IGl0LlxuICpcbiAqIFdoZW4gdGhlcmUgaXMgYWxsb3Qgb2Ygc3BhY2Ugb24gdGhlIHNpZGVzID49ICAoTGVmdCBvciBSaWdodCkgaXMgdXNlZFxuICogKHBhZGRlZExlZnQsIHBhZGRlZFJpZ2h0KSBvdGhlcndpc2UuIFdoZW4gdGhlcmUgaXMgbm90IG11Y2ggc3BhY2UgYW5kIGNhcmQgY29udGFpbmVyXG4gKiAgaXMgbm90IGFsaWduZWQgKGxlZnQsIHJpZ2h0KSB3aXRoIHRoZSB0cmlnZXJpbmcgaWNvbiBidXQgaXQgaXMgc2hpZnRlZCB0byBmaXQgaW50byB0aGUgc2NyZWVuXG4gKi9cbmVudW0gSENDYXJkQWxpZ25tZW50XG57XG4gICAgbGVmdCxcbiAgICBwYWRkZWRMZWZ0LFxuICAgIHJpZ2h0LFxuICAgIHBhZGRlZFJpZ2h0LFxuICAgIGRlZmF1bHRcbn1cblxuLyoqXG4gKiBNYXBzIHBvc2l0aW9uIHRvIHN0eWxlcyB0aGF0IGFyZSBhcHBsaWVkIHRvIHRoZSBDYXJkIGNvbnRhaW5lci4gVGhpcyBpcyBqdXN0IHRvIG1ha2UgaXQgZWFzaWVyXG4gKiBhcyB3ZSBhcmUgd29ya2luZyB3aXRoIGVudW1lcmF0aW9ucyBhbmQgaGF2ZSBhbHJlYWR5IGVudW0gdHlwZS5cbiAqXG4gKiB1LWhjLWFycm93LWI6IEFycm93IHdpbGwgYXBwZWFyIGF0IHRoZSBib3R0b21cbiAqIHUtaGMtYXJyb3ctdDogQXJyb3cgd2lsbCBhcHBlYXIgYXQgdGhlIHRvcFxuICpcbiAqIHUtaGMtc2hhZG93LXQ6IEJvcmRlciBzaGFkb3cgd2lsbCBhcHBlYXIgYXQgdGhlIHRvcFxuICogdS1oYy1zaGFkb3ctYjogQm9yZGVyIHNoYWRvdyB3aWxsIGFwcGVhciBhdCB0aGUgYm90dG9tXG4gKi9cbmNvbnN0IFBvc2l0aW9uVG9TdHlsZSA9IHtcbiAgICB0b3A6ICcgdy1oYy1wYW5lbC1hcnJvdyB1LWhjLWFycm93LWIgdS1oYy1zaGFkb3ctdCcsXG4gICAgYm90dG9tOiAnIHctaGMtcGFuZWwtYXJyb3cgdS1oYy1hcnJvdy10IHUtaGMtc2hhZG93LWInLFxuICAgIG5vbmU6ICcnXG59O1xuXG5cbi8qKlxuICpcbiAqIE1hcHMgYWxpZ25lZCBDYXJkIGNvbnRhaW5lciB0byBjdXN0b20gc3R5bGVzIGluIG9yZGVyIHRvIGFwcGx5IGNvcnJlY3QgYXJyb3dcbiAqXG4gKiAtbGw6IFN0YW5kcyBmb3IgTGFyZ2UgTGVmdCAobGFyZ2U6IHRoZXJlIGlzIHBsZW50eSBvZiBzcGFjZSBhcm91bmQgKVxuICogLWxyOiBTdGFuZHMgZm9yIExhcmdlIHJpZ2h0XG4gKiAtc2w6IFN0YW5kcyBmb3IgU21hbGwgbGVmdCAoU21hbGwgYW5kIHJlc2l6ZWQgc2NyZWVuIHdoZXJlIHdlIHRyeSB0byBmaXQgY2FyZCBjb250YWluZXJcbiAqIHNvbWV3aGVyZSBpbiBiZXR3ZWVuKVxuICogLXNyOiBTdGFuZHMgZm9yIExhcmdlIHJpZ2h0XG4gKlxuICovXG5jb25zdCBBbGlnbm1lbnRUb1N0eWxlID0ge1xuICAgIGxlZnQ6ICcgdS1oYy1hcnJvdy1sbCcsXG4gICAgcmlnaHQ6ICcgdS1oYy1hcnJvdy1scicsXG4gICAgcGFkZGVkTGVmdDogJyB1LWhjLWFycm93LXNsJyxcbiAgICBwYWRkZWRSaWdodDogJyB1LWhjLWFycm93LXNyJyxcbiAgICBkZWZhdWx0OiAnIHUtaGMtYXJyb3ctbGwnLFxufTtcblxuLyoqXG4gKiBUaGUgSG92ZXJDYXJkIGNvbXBvbmVudHMgYWRkcyBob3ZlciBiZWhhdmlvciB0byB0ZXh0LCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgaXMgbG9hZGVkXG4gKiBvbiB0aGUgbGVmdCBvciByaWdodCBzaWRlIG9mIHRoZSBlbGVtZW50LlxuICpcbiAqIFRvZG86IGV4dGVuZHMgc28gd2UgY2FuIHdyYXAgYW55IGVsZW1lbnQgYW5kIGFueSBlbGVtZW50IGNhbiBiZSB0cmlnZ2VyaW5nIHRoaXMuIE5vdCBvbmx5XG4gKiBsaW5rVGl0bGVcbiAqXG4gKlxuICogIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKlxuICogICA8YXctaG92ZXItY2FyZCBbbGlua1RpdGxlXT1cIidGcmFuayBrb2xhcidcIj5cbiAqICAgICAgIDxoMz5NeSBDYXJkIFRpdGxlPC9oMz5cbiAqICAgICAgIDxkaXY+XG4gKlxuICogICAgICAgICAgIFRoaXMgaXMgbXkgY29udGVudHNcbiAqXG4gKiAgICAgICA8L2Rpdj5cbiAqXG4gKlxuICogICAgPC9hdy1ob3Zlci1jYXJkPlxuICogYGBgXG4gKlxuICogQnkgZGVmYXVsdCB0aGVyZSBpcyBbZm9yY2VDbG9zZV09dHJ1ZSB3aGljaCBmb3JjZXMgdGhlIHVzZXIgdG8gdXNlIFggY2xvc2UgaWNvblxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWhvdmVyLWNhcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ob3Zlci1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9ob3Zlci1jYXJkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG92ZXJDYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBwYWRkaW5nIHJlcHJlc2VudGluZyBhIGhlaWdodCBvZiB0aGUgQXJyb3cgZm9yIHdoaWNoIHdlIG5lZWQgdG8gdmVydGljYWxseSBhZGp1c3RcbiAgICAgKiBDYXJkIGNvbnRhaW5lclxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBcnJvd1BhZCA9IDEwO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBzYWZlIHRocmVzaG9sZCB3aGVyZSB0aGVyZSBtaWdodCBub3QgYmUgZW5vdWdoIHNwYWNlIGFyb3VuZCBvciBDYXJkIGlzIGFsaWduZWQgd2l0aFxuICAgICAqIHRoZSBsZWZ0IG9yIHJpZ2h0IGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IGZvciB3aGljaCB3ZSBuZWVkIHRvIHBvc2l0aW9uIHRoZSBBcnJvdyBjbG9zZXIgdG8gdGhlXG4gICAgICogc2lkZSBvZiB0aGUgY2FyZFxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTcGFjaW5nTGltaXQgPSA1MDtcblxuXG4gICAgQElucHV0KClcbiAgICBsaW5rVGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB3ZSBrZWVwIHRoZSBob3ZlciBjYXJkIG9wZW4gYW5kIGZvcmNlIHVzZXIgdG8gbWFudWFsbHkgY2xvc2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9yY2VDbG9zZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBjdXJyZW50IHdvcmthcm91bmQgdW50aWwgd2UgZmluZCBiZXR0ZXIgc29sdXRpb24uIFByaW1lTkcgb3ZlcmxheXMgb3BlcmF0ZXMgd2l0aGluXG4gICAgICogaXRzIHJlbGF0aXZlIGVsZW1lbnQgc28gaWYgdGhlIG92ZXJsYXkgaXMgd3JhcHBlZCBpbnNpZGUgc29tZSBvdGhlciByZWxhdGl2ZSBjb250YWluZXJcbiAgICAgKiB0aGUgb3ZlcmxheSBjb250ZW50IGlzIGNyb3BlZCBieSBpdHMgcGFyZW50IGFuZCBjb250ZW50IGlzIG5vdCB2aXNpYmxlLlxuICAgICAqXG4gICAgICogVGhleSBoYXZlIFthcHBlbmRUb10gYmluZGluZyB3aGljaCB3ZSBuZWVkIHRvIHVzZSBmb3IgdGhpcyBwdXJwb3NlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZENvbnRlbnRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIE92ZXJsYXlDb21wb25lbnQgdG8gY2FuIGFjY2VzcyBQcmltZU5HIGNvbXBvbmVudCBhcyB3ZWxsXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpXG4gICAgYXdPdmVybGF5OiBPdmVybGF5Q29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEludGVybmFsIHN0eWxlIGNsYXNzIHRvIHVzZSB0byBhcHBseSBhZGRpdGlvbmFsIHN0eWxlcyB3aGVuIGl0IG5lZWRzIHRvIHNob3cgYSBBcnJvdyBvbiB0aGVcbiAgICAgKiBjYXJkXG4gICAgICpcbiAgICAgKi9cbiAgICBhcnJvd0NsYXNzOiBzdHJpbmcgPSAnJztcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgcHJvcGVydGllcyB0byByZWZlcmVuY2VzIHRlbXBsYXRlIGVsZW1lbnRzIGluIG9yZGVyIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbmluZ1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB0aXRsZUFyZWFSZWN0OiBhbnk7XG4gICAgdHJpZ1JlY3Q6IGFueTtcbiAgICB0cmlnSWNvbk1pZGRsZTogYW55O1xuXG4gICAgb3BlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYXBwZW5kVG86ICdib2R5JztcblxuICAgIGN1cnJyZW50UG9zaXRpb246IEhDQ2FyZFBvc2l0aW9uID0gSENDYXJkUG9zaXRpb24ubm9uZTtcblxuICAgIG92ZXJsYXlPbkFuaW1hdGlvblN0YXJ0OiAoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSA9PiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlcyB3aGVyZSB3ZSBuZWVkIHRvIGluamVjdCBkeW5hbWljIGNvbnRlbnQgdXNpbmcgcHJvZ3JhbW1hdGljIEFQSSB3ZSB1c2UgdGhpcyBleHRyYVxuICAgICAqIGVsZW1lbnQgd2hpY2ggaXMgb3V0c2lkZSBvZiB0aGUgPG5nLWNvbnRlbnQ+IGFuZCBoaWRkZW4gYW5kIG9uY2UgdGhlIDxuZy1jb250ZW50PiAgb2ZcbiAgICAgKiB0aGUgY29tcG9uZW50IGlzIHNob3duIHdlIG1vdmUgdGhpcyBkeW5hbWljIGNvbnRlbnQgaW50byBpdC5cbiAgICAgKlxuICAgICAqL1xuICAgIGR5bmFtaWNDb250ZW50OiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtOiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMubGlua1RpdGxlKSwgJ1lvdSBtdXN0IHByb3ZpZGUgW2xpbmtUaXRsZV0gYmluZGluZyAhJyk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZXJlIGlzIG9wZW4gSEMgd2hlbiB3ZSBzdGFydCBuZXcgY29tcG9uZW50XG4gICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKCdoYy1vcGVuJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFwcGVuZENvbnRlbnRUb0JvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kVG8gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5T25BbmltYXRpb25TdGFydCA9IHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkub25BbmltYXRpb25TdGFydDtcbiAgICAgICAgdGhpcy5hd092ZXJsYXkub3ZlcmxheS5vbkFuaW1hdGlvblN0YXJ0ID0gKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5T25BbmltYXRpb25TdGFydC5jYWxsKHRoaXMuYXdPdmVybGF5Lm92ZXJsYXksIGV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5jYXJkT3BlbmVkKCk7XG4gICAgICAgICAgICB0aGlzLm9uQW5pbWF0aW9uU3RhcnQoZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoaXMgc3BhbiBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgICAgIHRoaXMuZHluYW1pY0NvbnRlbnQgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudS1uZ2NvbnRlbnQnKTtcbiAgICB9XG5cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbmluZykge1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkuY29udGFpbmVyO1xuICAgICAgICAgICAgbGV0IGNudFJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJycmVudFBvc2l0aW9uICE9PSBIQ0NhcmRQb3NpdGlvbi5ub25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYXJkKGNvbnRhaW5lciwgY250UmVjdCwgdGhpcy5hd092ZXJsYXkub3ZlcmxheSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3BlbmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbmplY3REeW5hbWljQ29udGVudCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5hd092ZXJsYXkub3ZlcmxheS52aXNpYmxlKSB7XG4gICAgICAgICAgICBsZXQgb3ZlcmxheUNudCA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy51aS1vdmVybGF5cGFuZWwtY29udGVudCAudS1uZ2NvbnRlbnQnKTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsob3ZlcmxheUNudCkgJiYgdGhpcy5keW5hbWljQ29udGVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheUNudCA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aS1vdmVybGF5cGFuZWwtY29udGVudCcpO1xuICAgICAgICAgICAgICAgIG92ZXJsYXlDbnQucHJlcGVuZCh0aGlzLmR5bmFtaWNDb250ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmR5bmFtaWNDb250ZW50LnN0eWxlID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0NvbnRlbnQuc3R5bGUgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGVsZW1lbnRzIEJvdW5kaW5nQ2xpZW50UmVjdCB0aGF0IHdlIHVzZSBmb3IgY2FsY3VsYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRFbGVtZW50cygpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdGl0bGVFbGVtID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnctaGMtdGl0bGUnKTtcbiAgICAgICAgbGV0IHRyaWdnZXJFbGVtID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNhcC1pY29uJyk7XG4gICAgICAgIHRoaXMudGl0bGVBcmVhUmVjdCA9IHRpdGxlRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy50cmlnUmVjdCA9IHRyaWdnZXJFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLnRyaWdJY29uTWlkZGxlID0gdGhpcy50cmlnUmVjdC53aWR0aCAvIDI7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZpcmVzIHdoZW4gdXNlciBtb3VzZSBvdmVyIHRoZSB0cmlnZ2VyaW5nIGljb24gYW5kIG9wZW5zIHVwIG92ZXJsYXkgY29tcG9uZW50LiBUbyBtYWtlIHN1cmVcbiAgICAgKiBvbmx5IG9uZSBDYXJkIGlzIG9wZW5lZCBhdCB0aGUgdGltZSBpdCB1c2VzIEVudmlyb25tZW50IHRvIHNhdmUgZXh0cmEgaW5mb3JtYXRpb24gZm9yIGl0XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIG9wZW5DYXJkKGV2ZW50OiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hd092ZXJsYXkpICYmICF0aGlzLmVudi5oYXNWYWx1ZSgnaGMtb3BlbicpKSB7XG4gICAgICAgICAgICB0aGlzLmF3T3ZlcmxheS5vcGVuKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5lbnYuc2V0VmFsdWUoJ2hjLW9wZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlZCBhdCB0aGUgZW5kIG9mIHRoZSBvcGVuaW5nIGN5Y2xlIHdoZW4gYWxsIGlzIGluaXRpYWxpemVkIGFuZCB0aGUgY2FyZCBpcyBhYm91dCB0b1xuICAgICAqIGZhZGUgaW4uXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBmaXJzdCBzaW11bGF0ZXMgZGlzcGxheWluZyBjYXJkIGJ5IHNldHRpbmcgZGlzcGxheTpibG9jayBhbmRcbiAgICAgKiBkb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24gc28gd2UgY2FuIHJlYWQgZGltZW5zaW9ucyBhbmQgdGhlbiBsYXRlciBvbiBwb3NpdGlvbiB0aGUgY2FyZFxuICAgICAqIGFjY29yZGluZ2x5LlxuICAgICAqXG4gICAgICovXG4gICAgY2FyZE9wZW5lZChldmVudD86IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmF3T3ZlcmxheS5vdmVybGF5LmNvbnRhaW5lcjtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkudGFyZ2V0O1xuXG4gICAgICAgIHRoaXMub3BlbkZvckFkanVzdG1lbnRzKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5qZWN0RHluYW1pY0NvbnRlbnQoKTtcblxuICAgICAgICAvLyBwcmUtcnVuIHBvc2l0aW9uaW5nIHNvIHdlIGNhbiBjYWxjdWxhdGUgbmV3IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuYXdPdmVybGF5Lm92ZXJsYXkuZG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKGNvbnRhaW5lciwgdGFyZ2V0KTtcbiAgICAgICAgbGV0IGNudFJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuY3VycnJlbnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb25Gb3JDYXJkKGNvbnRhaW5lciwgY250UmVjdCk7XG5cbiAgICAgICAgdGhpcy5hcHBseVN0eWxlQ2xhc3MoY29udGFpbmVyLCBjbnRSZWN0LCB0aGlzLmF3T3ZlcmxheS5vdmVybGF5KTtcblxuICAgICAgICB0aGlzLmNsb3NlRm9yQWRqdXN0bWVudHMoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5vcGVuaW5nID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBjYXJkIGlzIGNsb3NlZCB3ZSBuZWVkIHRvIHJlbGVhc2UgaXQgYW5kIGRlbGV0ZSBhbGwgdGhlIHJlZmVyZW5jZXMgZnJvbSBFbnZpcm9ubWVudFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBjYXJkQ2xvc2VkKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZSgnaGMtb3BlbicpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgICogQmVmb3JlIG92ZXJsYXkgaXMgY2xvc2VkIHdlIGhpZGUgaW50ZXJuYWwgY29udGVudCBvdGhlciBpdCBkb2VzIGxpdHRsZSBzaGFrZS4uXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGJlZm9yZUNsb3NlKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR5bmFtaWNDb250ZW50LnN0eWxlID0gJ25vbmUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXBwbGllcyBzdHlsZS5UT1AgYW5kIHN0eWxlLkxFRlQgdG8gdGhlIGNvbnRhaW5lciBpbiBvcmRlciB0byByZXBvc2l0aW9uIGl0IGFuZCBhZGRcbiAgICAgKiBleHRyYSBhcnJvdy5cbiAgICAgKlxuICAgICAqIEZpcnN0IGJhc2VkIG9uIHRoZSBpbml0aWFsIHBvc2l0aW9uIHdlIGFwcGx5IHN0eWxlLlRPUCBhbmQgZGVwZW5kaW5nIGlmIGl0cyBvbiB0aGVcbiAgICAgKiB0b3Agb3IgYm90dG9tIHdlIGFwcGx5IGVpdGhlciAtSG92ZXJDYXJkQ29tcG9uZW50LkFycm93UGFkIG9yICtIb3ZlckNhcmRDb21wb25lbnQuQXJyb3dQYWQuXG4gICAgICpcbiAgICAgKiBUaGVuIGZvciBwb3NpdGlvbmluZyBob3Jpem9udGFsbHkgd2UgdXNlIHR3byB0eXBlcy5cbiAgICAgKiAgLSBXaGVuIHRoZXJlIGlzIGFsbG90IG9mIHNwYWNlIHRoZSBhcnJvdyBpcyAyNSUgZnJvbSB0aGUgZWRnZVxuICAgICAqXG4gICAgICogICAgLS0tLS1eLS0tLS0tLS0tLS0tICAgb3IgICAgICAgLS0tLS0tLS0tLS1eLS0tLVxuICAgICAqXG4gICAgICpcbiAgICAgKiAgLSBXaGVuIHRoZXJlIGlzIGxlc3Mgb3Igbm9uZSBzcGFjZSB3ZSBoYXZlIG9ubHkgMTAlIGZhciBhd2F5IGZvcm0gdGhlIGVkZ2VcbiAgICAgKlxuICAgICAqICAgIC0tXi0tLS0tLS0tLS0tLSAgIG9yICAgICAgIC0tLS0tLS0tLS0tXi0tXG4gICAgICpcbiAgICAgKiAgT25jZSB3ZSBwaWNrIHRoZSBjb3JyZWN0IHBvc2l0aW9uaW5nICgyNSUsIDEwJSkgd2UgbmVlZCB0byByZWNhbGN1bGF0ZSBhbmQgc2hpZnQgdGhlIGNhcmRcbiAgICAgKiAgZWl0aGVyIHRvIHRoZSBsZWZ0IG9yIHJpZ2h0LlxuICAgICAqXG4gICAgICovXG4gICAgYWRqdXN0Q2FyZChjb250YWluZXI6IGFueSwgY29udGFpbmVyUmVjdDogYW55LCBtb2RhbENvbnRhaW5lcjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGRpZmYgPSAodGhpcy5jdXJycmVudFBvc2l0aW9uID09PSBIQ0NhcmRQb3NpdGlvbi5ib3R0b20pID8gMSA6IC0xO1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gbW9kYWxDb250YWluZXIuZG9tSGFuZGxlci5nZXRXaW5kb3dTY3JvbGxUb3AoKTtcbiAgICAgICAgbGV0IHBvc1dpdGhTY3JvbGwgPSBjb250YWluZXJSZWN0LnRvcCArIHNjcm9sbFRvcDtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IChwb3NXaXRoU2Nyb2xsICsgKEhvdmVyQ2FyZENvbXBvbmVudC5BcnJvd1BhZCAqIGRpZmYpKSArICdweCc7XG5cbiAgICAgICAgbGV0IGFsaWdubWVudCA9IHRoaXMuYWxpZ25tZW50Rm9yQ2FyZChjb250YWluZXJSZWN0LCBtb2RhbENvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jYWxjTGVmdEZvckFsaWdubWVudChjb250YWluZXJSZWN0LCBhbGlnbm1lbnQpICsgJ3B4JztcbiAgICB9XG5cblxuICAgIGFwcGx5U3R5bGVDbGFzcyhjb250YWluZXI6IGFueSwgY29udGFpbmVyUmVjdDogYW55LCBtb2RhbENvbnRhaW5lcjogYW55KTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy5jdXJycmVudFBvc2l0aW9uICE9PSBIQ0NhcmRQb3NpdGlvbi5ub25lKSB7XG4gICAgICAgICAgICBsZXQgYWxpZ25tZW50ID0gdGhpcy5hbGlnbm1lbnRGb3JDYXJkKGNvbnRhaW5lclJlY3QsIG1vZGFsQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzID0gKDxhbnk+UG9zaXRpb25Ub1N0eWxlKVsoPGFueT5IQ0NhcmRQb3NpdGlvbilbdGhpcy5jdXJycmVudFBvc2l0aW9uXV07XG4gICAgICAgICAgICB0aGlzLmFycm93Q2xhc3MgKz0gKDxhbnk+QWxpZ25tZW50VG9TdHlsZSlbKDxhbnk+SENDYXJkQWxpZ25tZW50KVthbGlnbm1lbnRdXTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnJvd0NsYXNzID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERldGVjdHMgaWYgdGhlIGNhcmQgaXMgZ29pbmcgdG8gYmUgc2hvd24gb24gdGhlIHRvcCBvZiB0aGUgTGluayBsYWJlbCBvciB1bmRlci4gT3IgaWZcbiAgICAgKiBpdHMgY292ZXJpbmcgaXQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwb3NpdGlvbkZvckNhcmQoY29udGFpbmVyOiBhbnksIGJvdW5kaW5nUmVjdDogYW55KTogSENDYXJkUG9zaXRpb25cbiAgICB7XG4gICAgICAgIC8vIHNlY3VyZSB0aGlzIGluIGNhc2Ugb2YgSUUgcmV0dXJuaW5nIHVuZGVmaW5lZFxuICAgICAgICBsZXQgYm9yZGVyV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikuYm9yZGVyV2lkdGg7XG4gICAgICAgIGxldCBjbnRXaWR0aCA9IHBhcnNlRmxvYXQoYm9yZGVyV2lkdGggfHwgJzAnKTtcbiAgICAgICAgbGV0IHBvcyA9IEhDQ2FyZFBvc2l0aW9uLm5vbmU7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ1JlY3QuYm90dG9tIDwgYm91bmRpbmdSZWN0LnRvcCkge1xuICAgICAgICAgICAgcG9zID0gSENDYXJkUG9zaXRpb24uYm90dG9tO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ1JlY3QudG9wID4gKGJvdW5kaW5nUmVjdC5ib3R0b20gLSBjbnRXaWR0aCkpIHtcbiAgICAgICAgICAgIHBvcyA9IEhDQ2FyZFBvc2l0aW9uLnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERldGVjdCBob3Jpem9udGFsIGFsaWdubWVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYWxpZ25tZW50Rm9yQ2FyZChib3VuZGluZ1JlY3Q6IGFueSwgbW9kYWxDb250YWluZXI6IGFueSk6IEhDQ2FyZEFsaWdubWVudFxuICAgIHtcbiAgICAgICAgbGV0IGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5sZWZ0O1xuICAgICAgICBsZXQgdmlld1BvcnQgPSBtb2RhbENvbnRhaW5lci5kb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ1JlY3QubGVmdC50b0ZpeGVkKDApID09PSBib3VuZGluZ1JlY3QubGVmdC50b0ZpeGVkKDApICYmXG4gICAgICAgICAgICBib3VuZGluZ1JlY3QubGVmdCA+IEhvdmVyQ2FyZENvbXBvbmVudC5TcGFjaW5nTGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFsaWdubWVudCA9IEhDQ2FyZEFsaWdubWVudC5sZWZ0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYm91bmRpbmdSZWN0LmxlZnQgPCBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkTGVmdDtcblxuICAgICAgICB9IGVsc2UgaWYgKCh2aWV3UG9ydC53aWR0aCAtIGJvdW5kaW5nUmVjdC5yaWdodCkgPCBIb3ZlckNhcmRDb21wb25lbnQuU3BhY2luZ0xpbWl0KSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkUmlnaHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWdSZWN0LnJpZ2h0LnRvRml4ZWQoMCkgPT09IGJvdW5kaW5nUmVjdC5yaWdodC50b0ZpeGVkKDApIHx8XG4gICAgICAgICAgICAodmlld1BvcnQud2lkdGggLSBib3VuZGluZ1JlY3QucmlnaHQpID4gSG92ZXJDYXJkQ29tcG9uZW50LlNwYWNpbmdMaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgYWxpZ25tZW50ID0gSENDYXJkQWxpZ25tZW50LnJpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGlnbm1lbnQgPSBIQ0NhcmRBbGlnbm1lbnQuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxpZ25tZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHVybiBvbiB0ZW1wb3JhcnkgZGlzcGxheSB0byBCTE9DSyBzbyB3ZSBjYW4gcmVhZCBkaW1lbnNpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuRm9yQWRqdXN0bWVudHMoY29udGFpbmVyOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHVybiBvZmYgZGlzcGxheSBiYWNrIE5PTkVcbiAgICAgKlxuICAgICAqL1xuICAgIGNsb3NlRm9yQWRqdXN0bWVudHMoY29udGFpbmVyOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgLy8gY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbGN1bGF0ZXMgcG9zaXRpb25pbmcgZm9yIHN0eWxlLkxFRlQuIEFzIGFscmVhZHkgc2FpZCB0aGV5IGFyZSB0d28gdHlwZXMgb2YgdHJpYW5nbGVzIHRoYXRcbiAgICAgKiBhcmUgYXBwbGllcyBmb3IgdGhlc2UgY2FzZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogYSkgTGFyZ2UgbGVmdCwgTGFyZ2UgcmlnaHRcbiAgICAgKlxuICAgICAqICBQcmltZU5HIGFsaWducyB0aGUgY2FyZCB3aXRoIGVpdGhlciB0aGUgcmlnaHQgc2lkZSBvciBsZWZ0IHNpZGUgb2YgdGhlIHRyaWdnZXJpbmcgaWNvblxuICAgICAqXG4gICAgICpcbiAgICAgKiAgViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWXG4gICAgICogIC4uLi4uLl4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gb3IgIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXi4uLi4uLlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICogIGIpIFNtYWxsIGxlZnQgLCBzbWFsbCByaWdodFxuICAgICAqXG4gICAgICogIFRoaXMgaXMgZm9yIGNhc2VzIHdoZXJlIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgYW5kIFByaW1lTkcgcG9zaXRpb24gdGhlIGNhcmQgb2ZmIHRvIHRoZVxuICAgICAqICB0cmlnZ2VyaW5nIGljb25zLCBzbyBldmVuIHByaW1lTmcgZG9lcyBub3QgaGF2ZSBzcGFjZSB0byBhbGlnbiBpdCB3aXRoIHRoZSBWXG4gICAgICpcbiAgICAgKlxuICAgICAqICAgICBWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVlxuICAgICAqICAuLi4uXi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiBvciAgLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5eLi4uLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBjKUFsaWduZWQgd2l0aCB0aGUgZWRnZSBvZiBicm93c2VyXG4gICAgICpcbiAgICAgKiBPbiB0aGUgcmlnaHQgc2lkZSB0aGlzIGlzIHByb2JsZW0gYXMgd2UgY2Fubm90IGNhbGN1bGF0ZSBmdWxsIGZ1dHVyZSB3aWR0aCBvZiB0aGUgY2FyZC5cbiAgICAgKiBidXQgd2UgYXBwbGx5IGZvciB0aGlzIGNhc2UgI2IgKGFycm93IDEwJSApXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjTGVmdEZvckFsaWdubWVudChib3VuZGluZ1JlY3Q6IGFueSwgYWxpZ25tZW50OiBIQ0NhcmRBbGlnbm1lbnQpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIC8vIHdpZHRoIGZvciB3aGljaCB3ZSBuZWVkIHRvIHNoaWZ0IGNhcmQuIDI1JSBvciAxMCUgb2YgdGhlIGNvbnRhaW5lciB3aWR0aFxuICAgICAgICBsZXQgd0xhcmdlVHJpYW5nbGUgPSBib3VuZGluZ1JlY3Qud2lkdGggKiAwLjI1O1xuICAgICAgICBsZXQgd1NtYWxsVHJpYW5nbGUgPSBib3VuZGluZ1JlY3Qud2lkdGggKiAwLjEwO1xuXG4gICAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBjYXNlIEhDQ2FyZEFsaWdubWVudC5yaWdodDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRSaWdodCA9IGJvdW5kaW5nUmVjdC5sZWZ0ICsgd0xhcmdlVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWdSaWdodCA9IHRoaXMudHJpZ1JlY3QucmlnaHQgLSB0aGlzLnRyaWdJY29uTWlkZGxlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdFJpZ2h0IC0gKGJvdW5kaW5nUmVjdC5yaWdodCAtIHRyaWdSaWdodCk7XG5cbiAgICAgICAgICAgIGNhc2UgSENDYXJkQWxpZ25tZW50LnBhZGRlZFJpZ2h0OlxuICAgICAgICAgICAgICAgIGxldCBzaGlmdFJpZ2h0UyA9IGJvdW5kaW5nUmVjdC5sZWZ0ICsgd1NtYWxsVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWdSaWdodFMgPSB0aGlzLnRyaWdSZWN0LnJpZ2h0IC0gdGhpcy50cmlnSWNvbk1pZGRsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRSaWdodFMgLSAoYm91bmRpbmdSZWN0LnJpZ2h0IC0gdHJpZ1JpZ2h0Uyk7XG5cblxuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQucGFkZGVkTGVmdDpcbiAgICAgICAgICAgICAgICBsZXQgc2hpZnRMZWZ0UGFkID0gYm91bmRpbmdSZWN0LmxlZnQgLSB3U21hbGxUcmlhbmdsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnRMZWZ0UGFkICsgdGhpcy50cmlnSWNvbk1pZGRsZTtcblxuICAgICAgICAgICAgY2FzZSBIQ0NhcmRBbGlnbm1lbnQubGVmdDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IHNoaWZ0TGVmdCA9IGJvdW5kaW5nUmVjdC5sZWZ0IC0gd0xhcmdlVHJpYW5nbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0TGVmdCArIHRoaXMudHJpZ0ljb25NaWRkbGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iXX0=