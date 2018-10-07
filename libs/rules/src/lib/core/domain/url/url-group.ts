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
import {ResourceSegment, RestSegmentType, UrlSegment} from './segment';
import {assert, isBlank, isPresent, isString} from '../../utils/lang';
import {ListWrapper} from '../../utils/collection';
import {Type} from '@angular/core';

/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
export class RestUrlGroup {
  constructor(private _segments?: UrlSegment[]) {
    if (isBlank(this._segments)) {
      this._segments = [];
    }
  }


  /**
   *
   * Every push is validated againts UrlSegment assert methods to make sure the order of the
   * method calls is correct
   *
   */
  push(segment: UrlSegment): void {
    segment.assertSegment((this._segments.length > 0) ? this.peak().type : null);

    if (isString(segment.value)) {
      segment.value = segment.value.replace(/^\/|\/$/g, '');
    }
    this._segments.push(segment);
  }


  /**
   * Stack like API
   *
   */
  peak(): UrlSegment {
    return ListWrapper.last<UrlSegment>(this._segments);
  }


  pop(): UrlSegment {
    assert(this._segments.length > 0,
      ' Attempt to get value from empty segments stack');

    return ListWrapper.removeAt<UrlSegment>(this._segments, this._segments.length - 1);
  }

  updateSegment(segmentType: RestSegmentType, data: any): void {
    let urlSegment = this.lookup(segmentType);
    urlSegment.value = data;
  }

  /**
   *
   * Based on the enum Segment Type  it will retrieve correct segment from the stack
   *
   */
  lookup(segment: RestSegmentType, byResource?: Type<any>): UrlSegment {
    if (isBlank(this.segments)) {
      return null;
    }

    let ss = [...this.segments];
    ss = ss.reverse();

    return ss.find(((s: UrlSegment) => {
      let hasMatch = s.type === segment;

      if (segment === RestSegmentType.Resource) {

        if (isPresent(byResource)) {
          return hasMatch && (<ResourceSegment>s).value === byResource;
        } else {
          return hasMatch;
        }
      }
      return hasMatch;
    }));
  }

  /**
   *
   * Counts number of segments of certain type
   *
   */
  count(segment: RestSegmentType): number {
    let segments = this.segments.filter((s: UrlSegment) => segment === s.type);
    return isPresent(segments) ? segments.length : 0;
  }


  get segments(): UrlSegment[] {
    return this._segments;
  }
}
