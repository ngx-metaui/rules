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
import { ElementRef, SimpleChanges } from '@angular/core';
import { Environment } from '@aribaui/core';
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
export declare class ScrollableContainerComponent extends BaseComponent {
    env: Environment;
    elementRef: ElementRef;
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
    direction: ScrollingDirection;
    /**
     * Defines how flexbox container items should be aligned. Default behavior is LEFT
     *
     */
    alignment: ContainerItemsAlignment;
    /**
     * Internal properties for calculated class list
     */
    layoutClass: string;
    constructor(env: Environment, elementRef: ElementRef);
    ngOnInit(): void;
    /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     */
    ngOnChanges(changes: SimpleChanges): void;
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
     */
    private initDefault();
    /**
     * Tells if the horizontal scrollbar is visible
     *
     */
    hasHorizontalScroll(): boolean;
    /**
     * Tells if the vertical scrollbar is visible
     *
     */
    hasVerticalScroll(): boolean;
}
/**
 * ScrollingDirection is a new type that drives scrolling behavior:
 *  - horizontal => overflow-x: auto, overflow-y:hidden
 *  - vertical => overflow-x: hidden, overflow-y:auto
 *  - vertical-row => overflow-x: hidden, overflow-y:auto; flow: row wrap
 *  - both => overflow-x: auto, overflow-y:auto
 *  - none => sets flow-flow to row wrap
 */
export declare type ScrollingDirection = 'horizontal' | 'vertical' | 'vertical-row' | 'both' | 'none';
/**
 *
 * Controls the justify-content property:
 *
 * - left => flex-start
 * - right => flex-end
 * - center => center
 * - justify => space-between
 *
 */
export declare type ContainerItemsAlignment = 'left' | 'right' | 'center' | 'justify';
