/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { RestAction, RestSegmentType } from './segment';
import { assert, isPresent, StringJoiner } from '../../utils/lang';
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
var /**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
DefaultRestBuilder = /** @class */ (function () {
    function DefaultRestBuilder(urlGroup) {
        this.urlGroup = urlGroup;
        this.sorted = false;
    }
    /**
     * @param {?} isMocked
     * @return {?}
     */
    DefaultRestBuilder.prototype.assembleUrl = /**
     * @param {?} isMocked
     * @return {?}
     */
    function (isMocked) {
        this.validate();
        var /** @type {?} */ sortedSegments = this.adjustRank(this.urlGroup.segments);
        var /** @type {?} */ url = new StringJoiner();
        for (var /** @type {?} */ i = 1; i < sortedSegments.length; i++) {
            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;
                case RestSegmentType.Resource:
                    var /** @type {?} */ resSegment = /** @type {?} */ (sortedSegments[i]);
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
    };
    /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    DefaultRestBuilder.prototype.addSlash = /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    function (url, shouldAdd) {
        if (shouldAdd) {
            url.add('/');
        }
    };
    /**
     * @return {?}
     */
    DefaultRestBuilder.prototype.validate = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ action = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                // make sure we have a Identifier
                var /** @type {?} */ withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                var /** @type {?} */ of = this.urlGroup.lookup(RestSegmentType.OfParent);
                assert(withIdCount >= 1, 'Missing withId(<IDENTIFIER>) call!');
                break;
        }
    };
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
    DefaultRestBuilder.prototype.adjustRank = /**
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
    function (segments) {
        var /** @type {?} */ ofIndex = segments
            .findIndex(function (s) { return s.type === RestSegmentType.OfParent; });
        if (ofIndex !== -1) {
            var /** @type {?} */ of = segments[ofIndex];
            var /** @type {?} */ segment = void 0;
            do {
                segment = segments[--ofIndex];
                segment.rank *= of.rank;
            } while (segment.type !== RestSegmentType.Resource);
        }
        return segments.sort(function (a, b) { return a.rank - b.rank; });
    };
    return DefaultRestBuilder;
}());
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
export { DefaultRestBuilder };
function DefaultRestBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultRestBuilder.prototype.sorted;
    /** @type {?} */
    DefaultRestBuilder.prototype.urlGroup;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vdXJsL2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQWlDLFVBQVUsRUFBRSxlQUFlLEVBQWEsTUFBTSxXQUFXLENBQUM7QUFDbEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFPakU7OztBQUFBO0lBS0ksNEJBQW9CLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7c0JBSGhCLEtBQUs7S0FLOUI7Ozs7O0lBRUQsd0NBQVc7Ozs7SUFBWCxVQUFZLFFBQWlCO1FBR3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVoQixxQkFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELHFCQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUU3QyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUM1QixLQUFLLGVBQWUsQ0FBQyxRQUFRO29CQUN6QixLQUFLLENBQUM7Z0JBRVYsS0FBSyxlQUFlLENBQUMsUUFBUTtvQkFDekIscUJBQUksVUFBVSxxQkFBc0MsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3RFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFR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LENBQUMsSUFBSSxDQUFDO2FBQzNCLFFBQVEsT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsUUFBUSxFQUFFO1NBQ3ZEO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFmLENBQWUsQ0FBQyxDQUFDOzs2QkFuSnhEO0lBcUpDLENBQUE7Ozs7QUF6SEQsOEJBeUhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0FjdGlvblNlZ21lbnQsIFJlc291cmNlU2VnbWVudCwgUmVzdEFjdGlvbiwgUmVzdFNlZ21lbnRUeXBlLCBVcmxTZWdtZW50fSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IHthc3NlcnQsIGlzUHJlc2VudCwgU3RyaW5nSm9pbmVyfSBmcm9tICcuLi8uLi91dGlscy9sYW5nJztcbmltcG9ydCB7UmVzdFVybEdyb3VwfSBmcm9tICcuL3VybC1ncm91cCc7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHRoYXQgcmVhZHMgYWJzdHJhY3QgVVJMIHN0cnVjdHVyZSBhbmQgYXNzZW1ibGVzIGNvcnJlY3QgVVJMLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc3RCdWlsZGVyXG57XG4gICAgcHJpdmF0ZSBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1cmxHcm91cDogUmVzdFVybEdyb3VwKVxuICAgIHtcbiAgICB9XG5cbiAgICBhc3NlbWJsZVVybChpc01vY2tlZDogYm9vbGVhbik6IHN0cmluZ1xuICAgIHtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XG5cbiAgICAgICAgbGV0IHNvcnRlZFNlZ21lbnRzID0gdGhpcy5hZGp1c3RSYW5rKHRoaXMudXJsR3JvdXAuc2VnbWVudHMpO1xuXG4gICAgICAgIGxldCB1cmwgPSBuZXcgU3RyaW5nSm9pbmVyKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkU2VnbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChzb3J0ZWRTZWdtZW50c1tpXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuQWN0aW9uOlxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlOlxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzU2VnbWVudDogUmVzb3VyY2VTZWdtZW50ID0gPFJlc291cmNlU2VnbWVudD4gc29ydGVkU2VnbWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLmFkZCgnbW9ja2VkJykuYWRkKCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXJsLmFkZChyZXNTZWdtZW50LnJlc291cmNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2xhc2godXJsLCBpICE9PSAoc29ydGVkU2VnbWVudHMubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdXJsLmFkZChzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2xhc2godXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudChzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICE9PSAoc29ydGVkU2VnbWVudHMubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoPEFjdGlvblNlZ21lbnQ+c29ydGVkU2VnbWVudHNbMF0pLnZhbHVlID09PSBSZXN0QWN0aW9uLkRvKSB7XG4gICAgICAgICAgICB1cmwuYWRkKCcvJykuYWRkKCdhY3Rpb25zJykuYWRkKCcvJykuYWRkKCg8QWN0aW9uU2VnbWVudD5zb3J0ZWRTZWdtZW50c1swXSkuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGFkZFNsYXNoKHVybDogU3RyaW5nSm9pbmVyLCBzaG91bGRBZGQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICB1cmwuYWRkKCcvJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYWN0aW9uOiBBY3Rpb25TZWdtZW50ID0gPEFjdGlvblNlZ21lbnQ+dGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYSBJZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgbGV0IHdpdGhJZENvdW50ID0gdGhpcy51cmxHcm91cC5jb3VudChSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgbGV0IG9mID0gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcblxuICAgICAgICAgICAgICAgIGFzc2VydCh3aXRoSWRDb3VudCA+PSAxLCAnTWlzc2luZyB3aXRoSWQoPElERU5USUZJRVI+KSBjYWxsIScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgT0Ygc2VnbWVudCB3aGVyZSB3ZSByZWZlciB0byBwYXJlbnQgcmVzb3VyY2UuIEluIHN1Y2ggY2FzZSB3ZVxuICAgICAqIG5lZWQgbW92ZSBhbGwgYmVmb3JlIE9GIGF0IHRoZSBlbmQuIEVpdGhlciBhZnRlciBwYXJlbnQgUkVTT1VSQ0Ugb3IgSURFTlRJRklFUlxuICAgICAqXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgIHNlcnZpY2VcbiAgICAgKiAgICAgIC5sb2FkKClcbiAgICAgKiAgICAgIC5yZXNvdXJjZShMaW5lSXRlbSlcbiAgICAgKiAgICAgIC5vZlxuICAgICAqICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICAgICAqICAgICAgLndpdGhJZCgnMTIzJyk7XG4gICAgICogIGBgYFxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqIEZpbmQgdGhlIE9GIHNlZ21lbnQgYW5kIGdvIGJhY2sgdW50aWwgd2UgcmVhY2ggUmVzb3VyY2UgYW5kIGFkanVzdCByYW5rIG9mIHRoZXNlIGFkblxuICAgICAqIHRoZW5cbiAgICAgKiBzb3J0XG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkanVzdFJhbmsoc2VnbWVudHM6IFVybFNlZ21lbnRbXSk6IFVybFNlZ21lbnRbXVxuICAgIHtcbiAgICAgICAgbGV0IG9mSW5kZXggPSBzZWdtZW50c1xuICAgICAgICAgICAgLmZpbmRJbmRleCgoczogVXJsU2VnbWVudCkgPT4gcy50eXBlID09PSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuXG4gICAgICAgIGlmIChvZkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IG9mID0gc2VnbWVudHNbb2ZJbmRleF07XG4gICAgICAgICAgICBsZXQgc2VnbWVudDogVXJsU2VnbWVudDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50ID0gc2VnbWVudHNbLS1vZkluZGV4XTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnJhbmsgKj0gb2YucmFuaztcbiAgICAgICAgICAgIH0gd2hpbGUgKHNlZ21lbnQudHlwZSAhPT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnJhbmsgLSBiLnJhbmspO1xuICAgIH1cbn1cbiJdfQ==