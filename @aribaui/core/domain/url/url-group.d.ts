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
import { RestSegmentType, UrlSegment } from './segment';
import { Type } from '@angular/core';
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
export declare class RestUrlGroup {
    private _segments;
    constructor(_segments?: UrlSegment[]);
    /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     */
    push(segment: UrlSegment): void;
    /**
     * Stack like API
     *
     */
    peak(): UrlSegment;
    pop(): UrlSegment;
    updateSegment(segmentType: RestSegmentType, data: any): void;
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     */
    lookup(segment: RestSegmentType, byResource?: Type<any>): UrlSegment;
    /**
     *
     * Counts number of segments of certain type
     *
     */
    count(segment: RestSegmentType): number;
    readonly segments: UrlSegment[];
}
