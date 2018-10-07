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
import {Component, ElementRef, Input, SimpleChanges} from '@angular/core';
import {isBlank, isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {BaseComponent} from '../../core/base.component';

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
@Component({
  selector: 'aw-scrollable',
  templateUrl: 'scrollable-container.component.html',
  styleUrls: ['scrollable-container.component.scss']
})
export class ScrollableContainerComponent extends BaseComponent {


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
  @Input()
  direction: ScrollingDirection = 'horizontal';

  /**
   * Defines how flexbox container items should be aligned. Default behavior is LEFT
   *
   */
  @Input()
  alignment: ContainerItemsAlignment = 'left';


  /**
   * Internal properties for calculated class list
   */

  layoutClass: string;


  constructor(public env: Environment, public elementRef: ElementRef) {
    super(env);

    this.height = '100%';
    this.width = '100%';
  }

  ngOnInit() {
    this.initDefault();
  }


  /**
   * Make sure we re-initialize default when Input Bindings changes
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
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
   */
  private initDefault(): void {
    this.layoutClass = 'u-scrollable-fh';
    if (this.direction === 'vertical') {
      this.layoutClass = 'u-scrollable-fv';

    }
    if (this.direction === 'vertical-row') {
      this.layoutClass = 'u-scrollable-fv-row';

    } else if (this.direction === 'both') {
      this.layoutClass = 'u-scrollable-fb';

    } else if (this.direction === 'none') {
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
   */
  hasHorizontalScroll(): boolean {
    let scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
    return scrollContainer.scrollWidth > scrollContainer.clientWidth;
  }


  /**
   * Tells if the vertical scrollbar is visible
   *
   */
  hasVerticalScroll(): boolean {
    let scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
    return scrollContainer.scrollHeight > scrollContainer.clientHeight;
  }
}

/**
 * ScrollingDirection is a new type that drives scrolling behavior:
 *  - horizontal => overflow-x: auto, overflow-y:hidden
 *  - vertical => overflow-x: hidden, overflow-y:auto
 *  - vertical-row => overflow-x: hidden, overflow-y:auto; flow: row wrap
 *  - both => overflow-x: auto, overflow-y:auto
 *  - none => sets flow-flow to row wrap
 */
export type ScrollingDirection = 'horizontal' | 'vertical' | 'vertical-row' | 'both' | 'none';


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
export type ContainerItemsAlignment = 'left' | 'right' | 'center' | 'justify';

