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
 */
import {Directive, ElementRef, Input} from '@angular/core';
import {BaseComponent} from '../../../core/base.component';
import {Environment} from '../../../../core/config/environment';


/**
 * Maps our internal alignment value to real css values
 *
 */
const VAlignMap = {
  'top-left': 'flex-start',
  'top-center': 'flex-start',
  'top-right': 'flex-start',
  'center-left': 'center',
  'center-center': 'center',
  'center-right': 'center',
  'bottom-left': 'flex-end',
  'bottom-center': 'flex-end',
  'bottom-right': 'flex-end'
};


const HAlignMap = {
  'top-left': 'flex-start',
  'top-center': 'center',
  'top-right': 'flex-end',
  'center-left': 'flex-start',
  'center-center': 'center',
  'center-right': 'flex-end',
  'bottom-left': 'flex-start',
  'bottom-center': 'center',
  'bottom-right': 'flex-end'
};


/**
 * Title zone provides a content placeholder for the Title Area. This zone is adding ability
 * to align its content into 9 different position.
 *
 * You can use this Title zone within <aw-card> as:
 *
 *
 * ```html
 *
 *  <aw-card  [width]="'202px'" [height]="'154px'" [hasHover]="true"
 *                       [selectable]="false" [hasAction]="false"
 *                  (onHoverAction)="onAction(7, $event)" >
 *
 *                  <aw-card-title [align]="'bottom-left'">
 *                      <span class="a-supplier-tag">
 *                          Preferred
 *                      </span>
 *                  </aw-card-title>
 *
 *   </aw-card>
 *
 * ```
 * Default alignment is top-left
 *
 *
 *
 *
 */
@Directive({
  selector: `aw-card-title`,
  host: {
    'class': 'w-card-title'
  }
})
export class CardZoneTitleComponent extends BaseComponent {
  /**
   * Special property which is used to apply flex properties for aligning content vertically
   * as well as horizontally
   *
   */
  @Input()
  align: CardTitleAlignment = 'top-left';


  constructor(public env: Environment, public elem: ElementRef) {
    super(env);

  }


  ngOnInit(): void {
    super.ngOnInit();

    this.elem.nativeElement.style.alignItems = VAlignMap[this.align];
    this.elem.nativeElement.style.justifyContent = HAlignMap[this.align];
  }
}


/**
 * Make sure we dont accept any unsupported values. These values maps to the HAlignMap and
 * VAlignMap in order to get real css value for the flex alignment
 */
export type CardTitleAlignment = 'top-left' | 'top-center' | 'top-right' | 'center-left' |
  'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

