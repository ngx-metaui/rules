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
import {Injectable} from '@angular/core';
import {isPresent} from '../../core/utils/lang';


/**
 * Simple convenient service to work with the dom. All the future logic related to DOM manipulation
 * or traversal should be put into this service
 *
 */
@Injectable({
  providedIn: 'root'
})
export class DomUtilsService {

  constructor() {
  }

  /**
   * goes all the way up to the body and checks if there is a element identified by a 'selector'
   *
   */
  hasParent(nativeElement: any, selector: string): boolean {
    return isPresent(this.closest(nativeElement, selector));
  }


  /**
   *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
   * not found
   *
   */
  closest(nativeElement: any, selector: string): any {
    const firstChar = selector.charAt(0);

    let parentNode = nativeElement;


    while (isPresent((parentNode = parentNode.parentNode))) {
      if (firstChar === '.' && parentNode.classList.contains(selector.substr(1))) {
        return parentNode;
      }

      if (firstChar === '#' && parentNode.id === selector.substr(1)) {
        return parentNode;
      }

      // If selector is a tag
      if (parentNode.nodeType === 1 && parentNode.tagName.toLowerCase() === selector) {
        return parentNode;
      }

      if (parentNode.nodeType === 1 && parentNode.tagName === 'BODY') {
        return null;
      }
    }
    return null;
  }

  /**
   * When angular component is rendered along with NGContent it has its own _ngContent_INDEX
   * which always corresponds with _nghost_INDEX, this works fine if we have actual component
   * that is already rendered. If we are creating component programatically there is no way to
   * identify where the actual ng-content is placed within the component
   *
   * e.g. Consider following example:
   *
   *
   * Button Component Template:
   *
   * ```
   *  <span class=mybuttonTitle><ng-content></ng-content></span>
   * ```
   *
   * When you use button component as <aw-button>ClickMe</aw-button>  then its rendered as
   *
   * ```
   * <aw-button _nghost_123>
   *  <span _ngcontent_123 class=mybuttonTitle>ClickMe</span>
   * </aw-button>
   * ```
   *
   * But with programmatic API you instantiate Button and since it created without a Content it
   * looks like this;
   *
   *  ```
   * <aw-button _nghost_123>
   *  <span class=mybuttonTitle></span>
   * </aw-button>
   * ```
   *
   * Where do you place you child (content component)? Therefore utility css class was created
   * to wrap <ng-content> to get around this limitation.
   *
   *  ```
   *   <span class="u-ngcontent">
   *      <ng-content></ng-content>
   *   </span>
   *  ````
   *
   *
   *
   *
   */
  insertIntoParentNgContent(parentNativeEl: any, childNativeEl: any): void {
    // default behavior is to insert it as child to parentNativeEl
    let ngContentParent = parentNativeEl;

    const foundNgContent = parentNativeEl.querySelector('.u-ngcontent');
    if (isPresent(foundNgContent)) {
      // we don't cover a case where there could be multiple ngcontents
      ngContentParent = foundNgContent;
    }
    ngContentParent.appendChild(childNativeEl);

  }


  /**
   *
   * Retrieves current browser window width and height
   *
   */
  browserDimentions(): any {
    return {
      width: (window.innerWidth || document.documentElement.clientWidth
        || document.body.clientWidth),
      height: (window.innerHeight || document.documentElement.clientHeight
        || document.body.clientHeight)
    };
  }


  /**
   *
   * Retrieves elemements dimensions
   *
   */
  elementDimensions(element: any): any {
    if (isPresent(element.getBoundingClientRect)) {
      return element.getBoundingClientRect();
    }
    return {left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0, width: 0, height: 0};
  }
}

