import { RestUrlGroup } from './url-group';
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
export declare class DefaultRestBuilder {
    private urlGroup;
    private sorted;
    constructor(urlGroup: RestUrlGroup);
    assembleUrl(isMocked: boolean): string;
    private addSlash(url, shouldAdd);
    private validate();
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
    private adjustRank(segments);
}
