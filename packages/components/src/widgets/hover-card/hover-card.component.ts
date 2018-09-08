/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import {assert, Environment, isBlank, isPresent} from '@aribaui/core';
import {BaseComponent} from '../../core/base.component';
import {OverlayComponent} from '../overlay/overlay.component';


/**
 * Defines where the Card is positioned. It can be either:
 *    - above the triggering link
 *    - under the triggering link
 *    - completely on top of it - covering it. For this case there is none as no style is applied
 */
export enum HCCardPosition
{
    top,
    bottom,
    none
}

/**
 * Defines where the Card is positioned by default. Meaning where primeNG code put it.
 *
 * When there is allot of space on the sides >=  (Left or Right) is used
 * (paddedLeft, paddedRight) otherwise. When there is not much space and card container
 *  is not aligned (left, right) with the trigering icon but it is shifted to fit into the screen
 */
enum HCCardAlignment
{
    left,
    paddedLeft,
    right,
    paddedRight,
    default
}

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
const PositionToStyle = {
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
@Component({
    selector: 'aw-hover-card',
    templateUrl: './hover-card.component.html',
    styleUrls: ['./hover-card.component.scss']
})
export class HoverCardComponent extends BaseComponent
{

    /**
     * Default padding representing a height of the Arrow for which we need to vertically adjust
     * Card container
     *
     */
    public static readonly ArrowPad = 10;

    /**
     * Defines safe threshold where there might not be enough space around or Card is aligned with
     * the left or right edge of the viewport for which we need to position the Arrow closer to the
     * side of the card
     *
     */
    public static readonly SpacingLimit = 50;


    @Input()
    linkTitle: string;

    /**
     * Should we keep the hover card open and force user to manually close
     *
     */
    @Input()
    forceClose: boolean = true;


    /**
     *
     * This current workaround until we find better solution. PrimeNG overlays operates within
     * its relative element so if the overlay is wrapped inside some other relative container
     * the overlay content is croped by its parent and content is not visible.
     *
     * They have [appendTo] binding which we need to use for this purpose
     *
     */
    @Input()
    appendContentToBody: boolean = true;

    /**
     * Reference to OverlayComponent to can access PrimeNG component as well
     */
    @ViewChild('overlay')
    awOverlay: OverlayComponent;


    /**
     *
     * Internal style class to use to apply additional styles when it needs to show a Arrow on the
     * card
     *
     */
    arrowClass: string = '';


    /**
     * Internal properties to references template elements in order to calculate positioning
     *
     */
    private titleAreaRect: any;
    trigRect: any;
    trigIconMiddle: any;

    opening: boolean = false;

    appendTo: 'body';

    currrentPosition: HCCardPosition = HCCardPosition.none;

    overlayOnAnimationStart: (event: AnimationEvent) => void;


    /**
     * In cases where we need to inject dynamic content using programmatic API we use this extra
     * element which is outside of the <ng-content> and hidden and once the <ng-content>  of
     * the component is shown we move this dynamic content into it.
     *
     */
    dynamicContent: any;


    constructor(protected elem: ElementRef, public env: Environment,
                private cd: ChangeDetectorRef)
    {
        super(env);
    }

    ngOnInit()
    {
        super.ngOnInit();

        assert(isPresent(this.linkTitle), 'You must provide [linkTitle] binding !');

        // make sure there is open HC when we start new component
        this.env.deleteValue('hc-open');

        if (!this.appendContentToBody) {
            this.appendTo = null;
        }

        this.overlayOnAnimationStart = this.awOverlay.overlay.onAnimationStart;
        this.awOverlay.overlay.onAnimationStart = (event: AnimationEvent) =>
        {
            this.overlayOnAnimationStart.call(this.awOverlay.overlay, event);

            this.cardOpened();
            this.onAnimationStart(event);
        };

        // this span is always available
        this.dynamicContent = this.elem.nativeElement.querySelector('.u-ngcontent');
    }


    onAnimationStart(event: AnimationEvent): void
    {
        if (this.opening) {
            let container = this.awOverlay.overlay.container;
            let cntRect = container.getBoundingClientRect();
            if (this.currrentPosition !== HCCardPosition.none) {
                this.adjustCard(container, cntRect, this.awOverlay.overlay);

            } else {
                this.arrowClass = '';
            }

            this.opening = false;
        }
    }


    injectDynamicContent(): void
    {
        if (this.awOverlay.overlay.visible) {
            let overlayCnt = this.elem.nativeElement
                .querySelector('.ui-overlaypanel-content .u-ngcontent');

            if (isBlank(overlayCnt) && this.dynamicContent.children.length > 0) {
                overlayCnt = this.elem.nativeElement.querySelector('.ui-overlaypanel-content');
                overlayCnt.prepend(this.dynamicContent);
                this.dynamicContent.style = 'block';
            }
        } else {
            this.dynamicContent.style = 'none';
        }
    }

    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     */
    initElements(): void
    {
        let titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
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
     */
    openCard(event: any): any
    {
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
     */
    cardOpened(event?: any): void
    {
        let container = this.awOverlay.overlay.container;
        let target = this.awOverlay.overlay.target;

        this.openForAdjustments(container);
        this.injectDynamicContent();

        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
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
     */
    cardClosed(event: any): void
    {
        this.env.deleteValue('hc-open');
    }


    /**
     *
      * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     */
    beforeClose(event: any): void
    {
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
     */
    adjustCard(container: any, containerRect: any, modalContainer: any): void
    {
        let diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        let scrollTop = modalContainer.domHandler.getWindowScrollTop();
        let posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';

        let alignment = this.alignmentForCard(containerRect, modalContainer);
        container.style.left = this.calcLeftForAlignment(containerRect, alignment) + 'px';
    }


    applyStyleClass(container: any, containerRect: any, modalContainer: any): void
    {

        if (this.currrentPosition !== HCCardPosition.none) {
            let alignment = this.alignmentForCard(containerRect, modalContainer);

            this.arrowClass = (<any>PositionToStyle)[(<any>HCCardPosition)[this.currrentPosition]];
            this.arrowClass += (<any>AlignmentToStyle)[(<any>HCCardAlignment)[alignment]];

        } else {
            this.arrowClass = '';
        }
    }

    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     */
    positionForCard(container: any, boundingRect: any): HCCardPosition
    {
        // secure this in case of IE returning undefined
        let borderWidth = getComputedStyle(container).borderWidth;
        let cntWidth = parseFloat(borderWidth || '0');
        let pos = HCCardPosition.none;

        if (this.trigRect.bottom < boundingRect.top) {
            pos = HCCardPosition.bottom;
        } else if (this.trigRect.top > (boundingRect.bottom - cntWidth)) {
            pos = HCCardPosition.top;
        }

        return pos;
    }


    /**
     *
     * Detect horizontal alignment.
     *
     */
    private alignmentForCard(boundingRect: any, modalContainer: any): HCCardAlignment
    {
        let alignment = HCCardAlignment.left;
        let viewPort = modalContainer.domHandler.getViewport();

        if (this.trigRect.left.toFixed(0) === boundingRect.left.toFixed(0) &&
            boundingRect.left > HoverCardComponent.SpacingLimit)
        {
            alignment = HCCardAlignment.left;

        } else if (boundingRect.left < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedLeft;

        } else if ((viewPort.width - boundingRect.right) < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedRight;

        } else if (this.trigRect.right.toFixed(0) === boundingRect.right.toFixed(0) ||
            (viewPort.width - boundingRect.right) > HoverCardComponent.SpacingLimit)
        {
            alignment = HCCardAlignment.right;

        } else {
            alignment = HCCardAlignment.default;
        }
        return alignment;
    }

    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     */
    openForAdjustments(container: any): void
    {
        container.style.visibility = 'hidden';
        container.style.display = 'block';

        this.initElements();
    }


    /**
     *
     * Turn off display back NONE
     *
     */
    closeForAdjustments(container: any): void
    {
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
     */
    private calcLeftForAlignment(boundingRect: any, alignment: HCCardAlignment): number
    {
        // width for which we need to shift card. 25% or 10% of the container width
        let wLargeTriangle = boundingRect.width * 0.25;
        let wSmallTriangle = boundingRect.width * 0.10;

        switch (alignment) {
            case HCCardAlignment.right:
                let shiftRight = boundingRect.left + wLargeTriangle;
                let trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);

            case HCCardAlignment.paddedRight:
                let shiftRightS = boundingRect.left + wSmallTriangle;
                let trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);


            case HCCardAlignment.paddedLeft:
                let shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;

            case HCCardAlignment.left:
            default:
                let shiftLeft = boundingRect.left - wLargeTriangle;
                return shiftLeft + this.trigIconMiddle;
        }
    }
}



