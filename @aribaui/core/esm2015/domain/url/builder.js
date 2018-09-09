/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { RestAction, RestSegmentType } from './segment';
import { assert, isPresent, StringJoiner } from '../../utils/lang';
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
export class DefaultRestBuilder {
    /**
     * @param {?} urlGroup
     */
    constructor(urlGroup) {
        this.urlGroup = urlGroup;
        this.sorted = false;
    }
    /**
     * @param {?} isMocked
     * @return {?}
     */
    assembleUrl(isMocked) {
        this.validate();
        /** @type {?} */
        let sortedSegments = this.adjustRank(this.urlGroup.segments);
        /** @type {?} */
        let url = new StringJoiner();
        for (let i = 1; i < sortedSegments.length; i++) {
            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;
                case RestSegmentType.Resource:
                    /** @type {?} */
                    let resSegment = /** @type {?} */ (sortedSegments[i]);
                    if (isMocked) {
                        url.add('mocked').add('/');
                    }
                    url.add(resSegment.resourceName);
                    this.addSlash(url, i !== (sortedSegments.length - 1));
                    break;
                default:
                    url.add(sortedSegments[i].value);
                    this.addSlash(url, isPresent(sortedSegments[i].value) &&
                        sortedSegments[i].value.toString().length > 0 &&
                        i !== (sortedSegments.length - 1));
            }
        }
        if ((/** @type {?} */ (sortedSegments[0])).value === RestAction.Do) {
            url.add('/').add('actions').add('/').add((/** @type {?} */ (sortedSegments[0])).data);
        }
        return url.toString();
    }
    /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    addSlash(url, shouldAdd) {
        if (shouldAdd) {
            url.add('/');
        }
    }
    /**
     * @return {?}
     */
    validate() {
        /** @type {?} */
        let action = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                /** @type {?} */
                let withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                /** @type {?} */
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
     * @param {?} segments
     * @return {?}
     */
    adjustRank(segments) {
        /** @type {?} */
        let ofIndex = segments
            .findIndex((s) => s.type === RestSegmentType.OfParent);
        if (ofIndex !== -1) {
            /** @type {?} */
            let of = segments[ofIndex];
            /** @type {?} */
            let segment;
            do {
                segment = segments[--ofIndex];
                segment.rank *= of.rank;
            } while (segment.type !== RestSegmentType.Resource);
        }
        return segments.sort((a, b) => a.rank - b.rank);
    }
}
if (false) {
    /** @type {?} */
    DefaultRestBuilder.prototype.sorted;
    /** @type {?} */
    DefaultRestBuilder.prototype.urlGroup;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vdXJsL2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQWlDLFVBQVUsRUFBRSxlQUFlLEVBQWEsTUFBTSxXQUFXLENBQUM7QUFDbEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFPakUsTUFBTTs7OztJQUtGLFlBQW9CLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7c0JBSGhCLEtBQUs7S0FLOUI7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWlCO1FBR3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFFaEIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUU3RCxJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixLQUFLLGVBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBQzVCLEtBQUssZUFBZSxDQUFDLFFBQVE7b0JBQ3pCLEtBQUssQ0FBQztnQkFFVixLQUFLLGVBQWUsQ0FBQyxRQUFROztvQkFDekIsSUFBSSxVQUFVLHFCQUFzQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQ3RFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFH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O1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Q0FFdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QWN0aW9uU2VnbWVudCwgUmVzb3VyY2VTZWdtZW50LCBSZXN0QWN0aW9uLCBSZXN0U2VnbWVudFR5cGUsIFVybFNlZ21lbnR9IGZyb20gJy4vc2VnbWVudCc7XG5pbXBvcnQge2Fzc2VydCwgaXNQcmVzZW50LCBTdHJpbmdKb2luZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtSZXN0VXJsR3JvdXB9IGZyb20gJy4vdXJsLWdyb3VwJztcblxuXG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdGhhdCByZWFkcyBhYnN0cmFjdCBVUkwgc3RydWN0dXJlIGFuZCBhc3NlbWJsZXMgY29ycmVjdCBVUkwuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzdEJ1aWxkZXJcbntcbiAgICBwcml2YXRlIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVybEdyb3VwOiBSZXN0VXJsR3JvdXApXG4gICAge1xuICAgIH1cblxuICAgIGFzc2VtYmxlVXJsKGlzTW9ja2VkOiBib29sZWFuKTogc3RyaW5nXG4gICAge1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcblxuICAgICAgICBsZXQgc29ydGVkU2VnbWVudHMgPSB0aGlzLmFkanVzdFJhbmsodGhpcy51cmxHcm91cC5zZWdtZW50cyk7XG5cbiAgICAgICAgbGV0IHVybCA9IG5ldyBTdHJpbmdKb2luZXIoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzb3J0ZWRTZWdtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHNvcnRlZFNlZ21lbnRzW2ldLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5BY3Rpb246XG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2U6XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNTZWdtZW50OiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PiBzb3J0ZWRTZWdtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKCdtb2NrZWQnKS5hZGQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHJlc1NlZ21lbnQucmVzb3VyY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCg8QWN0aW9uU2VnbWVudD5zb3J0ZWRTZWdtZW50c1swXSkudmFsdWUgPT09IFJlc3RBY3Rpb24uRG8pIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKS5hZGQoJ2FjdGlvbnMnKS5hZGQoJy8nKS5hZGQoKDxBY3Rpb25TZWdtZW50PnNvcnRlZFNlZ21lbnRzWzBdKS5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWRkU2xhc2godXJsOiBTdHJpbmdKb2luZXIsIHNob3VsZEFkZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHZhbGlkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhY3Rpb246IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD50aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBhIElkZW50aWZpZXJcbiAgICAgICAgICAgICAgICBsZXQgd2l0aElkQ291bnQgPSB0aGlzLnVybEdyb3VwLmNvdW50KFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBsZXQgb2YgPSB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgYXNzZXJ0KHdpdGhJZENvdW50ID49IDEsICdNaXNzaW5nIHdpdGhJZCg8SURFTlRJRklFUj4pIGNhbGwhJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBPRiBzZWdtZW50IHdoZXJlIHdlIHJlZmVyIHRvIHBhcmVudCByZXNvdXJjZS4gSW4gc3VjaCBjYXNlIHdlXG4gICAgICogbmVlZCBtb3ZlIGFsbCBiZWZvcmUgT0YgYXQgdGhlIGVuZC4gRWl0aGVyIGFmdGVyIHBhcmVudCBSRVNPVVJDRSBvciBJREVOVElGSUVSXG4gICAgICpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICAgc2VydmljZVxuICAgICAqICAgICAgLmxvYWQoKVxuICAgICAqICAgICAgLnJlc291cmNlKExpbmVJdGVtKVxuICAgICAqICAgICAgLm9mXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gICAgICogICAgICAud2l0aElkKCcxMjMnKTtcbiAgICAgKiAgYGBgXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICogRmluZCB0aGUgT0Ygc2VnbWVudCBhbmQgZ28gYmFjayB1bnRpbCB3ZSByZWFjaCBSZXNvdXJjZSBhbmQgYWRqdXN0IHJhbmsgb2YgdGhlc2UgYWRuXG4gICAgICogdGhlblxuICAgICAqIHNvcnRcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0UmFuayhzZWdtZW50czogVXJsU2VnbWVudFtdKTogVXJsU2VnbWVudFtdXG4gICAge1xuICAgICAgICBsZXQgb2ZJbmRleCA9IHNlZ21lbnRzXG4gICAgICAgICAgICAuZmluZEluZGV4KChzOiBVcmxTZWdtZW50KSA9PiBzLnR5cGUgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG5cbiAgICAgICAgaWYgKG9mSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgb2YgPSBzZWdtZW50c1tvZkluZGV4XTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50OiBVcmxTZWdtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50c1stLW9mSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQucmFuayAqPSBvZi5yYW5rO1xuICAgICAgICAgICAgfSB3aGlsZSAoc2VnbWVudC50eXBlICE9PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzLnNvcnQoKGEsIGIpID0+IGEucmFuayAtIGIucmFuayk7XG4gICAgfVxufVxuIl19