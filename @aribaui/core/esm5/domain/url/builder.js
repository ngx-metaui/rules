/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        var sortedSegments = this.adjustRank(this.urlGroup.segments);
        /** @type {?} */
        var url = new StringJoiner();
        for (var i = 1; i < sortedSegments.length; i++) {
            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;
                case RestSegmentType.Resource:
                    /** @type {?} */
                    var resSegment = /** @type {?} */ (sortedSegments[i]);
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
        /** @type {?} */
        var action = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                /** @type {?} */
                var withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                /** @type {?} */
                var of = this.urlGroup.lookup(RestSegmentType.OfParent);
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
        /** @type {?} */
        var ofIndex = segments
            .findIndex(function (s) { return s.type === RestSegmentType.OfParent; });
        if (ofIndex !== -1) {
            /** @type {?} */
            var of = segments[ofIndex];
            /** @type {?} */
            var segment = void 0;
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
if (false) {
    /** @type {?} */
    DefaultRestBuilder.prototype.sorted;
    /** @type {?} */
    DefaultRestBuilder.prototype.urlGroup;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vdXJsL2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQWlDLFVBQVUsRUFBRSxlQUFlLEVBQWEsTUFBTSxXQUFXLENBQUM7QUFDbEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFPakU7OztBQUFBO0lBS0ksNEJBQW9CLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7c0JBSGhCLEtBQUs7S0FLOUI7Ozs7O0lBRUQsd0NBQVc7Ozs7SUFBWCxVQUFZLFFBQWlCO1FBR3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFFaEIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUU3RCxJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixLQUFLLGVBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBQzVCLEtBQUssZUFBZSxDQUFDLFFBQVE7b0JBQ3pCLEtBQUssQ0FBQztnQkFFVixLQUFLLGVBQWUsQ0FBQyxRQUFROztvQkFDekIsSUFBSSxVQUFVLHFCQUFzQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQ3RFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMs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QUMzQixRQUFRLE9BQU8sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLFFBQVEsRUFBRTtTQUN2RDtRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQzs7NkJBbkp4RDtJQXFKQyxDQUFBOzs7O0FBekhELDhCQXlIQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBY3Rpb25TZWdtZW50LCBSZXNvdXJjZVNlZ21lbnQsIFJlc3RBY3Rpb24sIFJlc3RTZWdtZW50VHlwZSwgVXJsU2VnbWVudH0gZnJvbSAnLi9zZWdtZW50JztcbmltcG9ydCB7YXNzZXJ0LCBpc1ByZXNlbnQsIFN0cmluZ0pvaW5lcn0gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3RVcmxHcm91cH0gZnJvbSAnLi91cmwtZ3JvdXAnO1xuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB0aGF0IHJlYWRzIGFic3RyYWN0IFVSTCBzdHJ1Y3R1cmUgYW5kIGFzc2VtYmxlcyBjb3JyZWN0IFVSTC5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRSZXN0QnVpbGRlclxue1xuICAgIHByaXZhdGUgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXJsR3JvdXA6IFJlc3RVcmxHcm91cClcbiAgICB7XG4gICAgfVxuXG4gICAgYXNzZW1ibGVVcmwoaXNNb2NrZWQ6IGJvb2xlYW4pOiBzdHJpbmdcbiAgICB7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuXG4gICAgICAgIGxldCBzb3J0ZWRTZWdtZW50cyA9IHRoaXMuYWRqdXN0UmFuayh0aGlzLnVybEdyb3VwLnNlZ21lbnRzKTtcblxuICAgICAgICBsZXQgdXJsID0gbmV3IFN0cmluZ0pvaW5lcigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZFNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoc29ydGVkU2VnbWVudHNbaV0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLkFjdGlvbjpcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZTpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc1NlZ21lbnQ6IFJlc291cmNlU2VnbWVudCA9IDxSZXNvdXJjZVNlZ21lbnQ+IHNvcnRlZFNlZ21lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybC5hZGQoJ21vY2tlZCcpLmFkZCgnLycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVybC5hZGQocmVzU2VnbWVudC5yZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNsYXNoKHVybCwgaSAhPT0gKHNvcnRlZFNlZ21lbnRzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHVybC5hZGQoc29ydGVkU2VnbWVudHNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNsYXNoKHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQoc29ydGVkU2VnbWVudHNbaV0udmFsdWUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGVkU2VnbWVudHNbaV0udmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAhPT0gKHNvcnRlZFNlZ21lbnRzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKDxBY3Rpb25TZWdtZW50PnNvcnRlZFNlZ21lbnRzWzBdKS52YWx1ZSA9PT0gUmVzdEFjdGlvbi5Ebykge1xuICAgICAgICAgICAgdXJsLmFkZCgnLycpLmFkZCgnYWN0aW9ucycpLmFkZCgnLycpLmFkZCgoPEFjdGlvblNlZ21lbnQ+c29ydGVkU2VnbWVudHNbMF0pLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBhZGRTbGFzaCh1cmw6IFN0cmluZ0pvaW5lciwgc2hvdWxkQWRkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgdXJsLmFkZCgnLycpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHByaXZhdGUgdmFsaWRhdGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFjdGlvbjogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PnRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5TYXZlOlxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGEgSWRlbnRpZmllclxuICAgICAgICAgICAgICAgIGxldCB3aXRoSWRDb3VudCA9IHRoaXMudXJsR3JvdXAuY291bnQoUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIGxldCBvZiA9IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICBhc3NlcnQod2l0aElkQ291bnQgPj0gMSwgJ01pc3Npbmcgd2l0aElkKDxJREVOVElGSUVSPikgY2FsbCEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIE9GIHNlZ21lbnQgd2hlcmUgd2UgcmVmZXIgdG8gcGFyZW50IHJlc291cmNlLiBJbiBzdWNoIGNhc2Ugd2VcbiAgICAgKiBuZWVkIG1vdmUgYWxsIGJlZm9yZSBPRiBhdCB0aGUgZW5kLiBFaXRoZXIgYWZ0ZXIgcGFyZW50IFJFU09VUkNFIG9yIElERU5USUZJRVJcbiAgICAgKlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogICBzZXJ2aWNlXG4gICAgICogICAgICAubG9hZCgpXG4gICAgICogICAgICAucmVzb3VyY2UoTGluZUl0ZW0pXG4gICAgICogICAgICAub2ZcbiAgICAgKiAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAgICAgKiAgICAgIC53aXRoSWQoJzEyMycpO1xuICAgICAqICBgYGBcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKiBGaW5kIHRoZSBPRiBzZWdtZW50IGFuZCBnbyBiYWNrIHVudGlsIHdlIHJlYWNoIFJlc291cmNlIGFuZCBhZGp1c3QgcmFuayBvZiB0aGVzZSBhZG5cbiAgICAgKiB0aGVuXG4gICAgICogc29ydFxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGp1c3RSYW5rKHNlZ21lbnRzOiBVcmxTZWdtZW50W10pOiBVcmxTZWdtZW50W11cbiAgICB7XG4gICAgICAgIGxldCBvZkluZGV4ID0gc2VnbWVudHNcbiAgICAgICAgICAgIC5maW5kSW5kZXgoKHM6IFVybFNlZ21lbnQpID0+IHMudHlwZSA9PT0gUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcblxuICAgICAgICBpZiAob2ZJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBvZiA9IHNlZ21lbnRzW29mSW5kZXhdO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnQ6IFVybFNlZ21lbnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnRzWy0tb2ZJbmRleF07XG4gICAgICAgICAgICAgICAgc2VnbWVudC5yYW5rICo9IG9mLnJhbms7XG4gICAgICAgICAgICB9IHdoaWxlIChzZWdtZW50LnR5cGUgIT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5yYW5rIC0gYi5yYW5rKTtcbiAgICB9XG59XG4iXX0=