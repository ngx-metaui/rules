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
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
import { OverlayComponent } from '../overlay/overlay.component';
/**
 * Defines where the Card is positioned. It can be either:
 *    - above the triggering link
 *    - under the triggering link
 *    - completely on top of it - covering it. For this case there is none as no style is applied
 */
export declare enum HCCardPosition {
    top = 0,
    bottom = 1,
    none = 2,
}
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
export declare class HoverCardComponent extends BaseComponent {
    protected elem: ElementRef;
    env: Environment;
    private cd;
    /**
     * Default padding representing a height of the Arrow for which we need to vertically adjust
     * Card container
     *
     */
    static readonly ArrowPad: number;
    /**
     * Defines safe threshold where there might not be enough space around or Card is aligned with
     * the left or right edge of the viewport for which we need to position the Arrow closer to the
     * side of the card
     *
     */
    static readonly SpacingLimit: number;
    linkTitle: string;
    /**
     * Should we keep the hover card open and force user to manually close
     *
     */
    forceClose: boolean;
    /**
     *
     * This current workaround until we find better solution. PrimeNG overlays operates within
     * its relative element so if the overlay is wrapped inside some other relative container
     * the overlay content is croped by its parent and content is not visible.
     *
     * They have [appendTo] binding which we need to use for this purpose
     *
     */
    appendContentToBody: boolean;
    /**
     * Reference to OverlayComponent to can access PrimeNG component as well
     */
    awOverlay: OverlayComponent;
    /**
     *
     * Internal style class to use to apply additional styles when it needs to show a Arrow on the
     * card
     *
     */
    arrowClass: string;
    /**
     * Internal properties to references template elements in order to calculate positioning
     *
     */
    private titleAreaRect;
    trigRect: any;
    trigIconMiddle: any;
    opening: boolean;
    appendTo: 'body';
    currrentPosition: HCCardPosition;
    overlayOnAnimationStart: (event: AnimationEvent) => void;
    /**
     * In cases where we need to inject dynamic content using programmatic API we use this extra
     * element which is outside of the <ng-content> and hidden and once the <ng-content>  of
     * the component is shown we move this dynamic content into it.
     *
     */
    dynamicContent: any;
    constructor(elem: ElementRef, env: Environment, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onAnimationStart(event: AnimationEvent): void;
    injectDynamicContent(): void;
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     */
    initElements(): void;
    /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     */
    openCard(event: any): any;
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
    cardOpened(event?: any): void;
    /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     */
    cardClosed(event: any): void;
    /**
     *
      * Before overlay is closed we hide internal content other it does little shake..
     *
     *
     */
    beforeClose(event: any): void;
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
    adjustCard(container: any, containerRect: any, modalContainer: any): void;
    applyStyleClass(container: any, containerRect: any, modalContainer: any): void;
    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     */
    positionForCard(container: any, boundingRect: any): HCCardPosition;
    /**
     *
     * Detect horizontal alignment.
     *
     */
    private alignmentForCard(boundingRect, modalContainer);
    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     */
    openForAdjustments(container: any): void;
    /**
     *
     * Turn off display back NONE
     *
     */
    closeForAdjustments(container: any): void;
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
    private calcLeftForAlignment(boundingRect, alignment);
}
