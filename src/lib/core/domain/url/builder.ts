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
import {ActionSegment, ResourceSegment, RestAction, RestSegmentType, UrlSegment} from './segment';
import {assert, isPresent, StringJoiner} from '../../utils/lang';
import {RestUrlGroup} from './url-group';


/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
export class DefaultRestBuilder
{
    private sorted: boolean = false;


    constructor(private urlGroup: RestUrlGroup)
    {
    }

    assembleUrl(isMocked: boolean): string
    {

        this.validate();

        let sortedSegments = this.adjustRank(this.urlGroup.segments);

        let url = new StringJoiner();
        for (let i = 1; i < sortedSegments.length; i++) {

            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;

                case RestSegmentType.Resource:
                    let resSegment: ResourceSegment = <ResourceSegment> sortedSegments[i];
                    if (isMocked) {
                        url.add('mocked').add('/');
                    }
                    url.add(resSegment.resourceName);
                    this.addSlash(url, i !== (sortedSegments.length - 1));
                    break;


                default:
                    url.add(sortedSegments[i].value);
                    this.addSlash(url,
                                  isPresent(sortedSegments[i].value) &&
                                  sortedSegments[i].value.toString().length > 0 &&
                                  i !== (sortedSegments.length - 1));
            }
        }
        if ((<ActionSegment>sortedSegments[0]).value === RestAction.Do) {
            url.add('/').add('actions').add('/').add((<ActionSegment>sortedSegments[0]).data);
        }

        return url.toString();
    }


    private addSlash(url: StringJoiner, shouldAdd: boolean): void
    {
        if (shouldAdd) {
            url.add('/');
        }

    }


    private validate(): void
    {
        let action: ActionSegment = <ActionSegment>this.urlGroup.lookup(RestSegmentType.Action);

        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                // make sure we have a Identifier
                let withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                let of = this.urlGroup.lookup(RestSegmentType.OfParent);

                assert(withIdCount >= 1, 'Missing withId(<IDENTIFIER>) call!');
                break;

        }
    }


    /**
     *
     * Check to see if we have OF segment where we refer to parent resource. In such case we
     * need move all before OF at the end. Either after parent RESOURCE or IDENTIFIER
     *
     *
     * ```
     *   service
     *      .load()
     *      .resource(LineItem)
     *      .of
     *      .resource(Requisition)
     *      .withId('123');
     *  ```
     *
     *
     *
     * Find the OF segment and go back until we reach Resource and adjust rank of these adn
     * then
     * sort
     *
     *
     *
     *
     *
     *
     *
     */
    private adjustRank(segments: UrlSegment[]): UrlSegment[]
    {
        let ofIndex = segments
            .findIndex((s: UrlSegment) => s.type === RestSegmentType.OfParent);

        if (ofIndex !== -1) {
            let of = segments[ofIndex];
            let segment: UrlSegment;
            do {
                segment = segments[--ofIndex];
                segment.rank *= of.rank;
            } while (segment.type !== RestSegmentType.Resource);
        }

        return segments.sort((a, b) => a.rank - b.rank);
    }
}
