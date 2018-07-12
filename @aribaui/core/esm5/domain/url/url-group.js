/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { RestSegmentType } from './segment';
import { assert, isBlank, isPresent, isString } from '../../utils/lang';
import { ListWrapper } from '../../utils/collection';
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
var /**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
RestUrlGroup = /** @class */ (function () {
    function RestUrlGroup(_segments) {
        this._segments = _segments;
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
    /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     * @param {?} segment
     * @return {?}
     */
    RestUrlGroup.prototype.push = /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     * @param {?} segment
     * @return {?}
     */
    function (segment) {
        segment.assertSegment((this._segments.length > 0) ? this.peak().type : null);
        if (isString(segment.value)) {
            segment.value = segment.value.replace(/^\/|\/$/g, '');
        }
        this._segments.push(segment);
    };
    /**
     * Stack like API
     *
     */
    /**
     * Stack like API
     *
     * @return {?}
     */
    RestUrlGroup.prototype.peak = /**
     * Stack like API
     *
     * @return {?}
     */
    function () {
        return ListWrapper.last(this._segments);
    };
    /**
     * @return {?}
     */
    RestUrlGroup.prototype.pop = /**
     * @return {?}
     */
    function () {
        assert(this._segments.length > 0, ' Attempt to get value from empty segments stack');
        return ListWrapper.removeAt(this._segments, this._segments.length - 1);
    };
    /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    RestUrlGroup.prototype.updateSegment = /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    function (segmentType, data) {
        var /** @type {?} */ urlSegment = this.lookup(segmentType);
        urlSegment.value = data;
    };
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     */
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    RestUrlGroup.prototype.lookup = /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    function (segment, byResource) {
        if (isBlank(this.segments)) {
            return null;
        }
        var /** @type {?} */ ss = tslib_1.__spread(this.segments);
        ss = ss.reverse();
        return ss.find((function (s) {
            var /** @type {?} */ hasMatch = s.type === segment;
            if (segment === RestSegmentType.Resource) {
                if (isPresent(byResource)) {
                    return hasMatch && (/** @type {?} */ (s)).value === byResource;
                }
                else {
                    return hasMatch;
                }
            }
            return hasMatch;
        }));
    };
    /**
     *
     * Counts number of segments of certain type
     *
     */
    /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    RestUrlGroup.prototype.count = /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    function (segment) {
        var /** @type {?} */ segments = this.segments.filter(function (s) { return segment === s.type; });
        return isPresent(segments) ? segments.length : 0;
    };
    Object.defineProperty(RestUrlGroup.prototype, "segments", {
        get: /**
         * @return {?}
         */
        function () {
            return this._segments;
        },
        enumerable: true,
        configurable: true
    });
    return RestUrlGroup;
}());
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
export { RestUrlGroup };
function RestUrlGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    RestUrlGroup.prototype._segments;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImRvbWFpbi91cmwvdXJsLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBa0IsZUFBZSxFQUFhLE1BQU0sV0FBVyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQVFuRDs7Ozs7QUFBQTtJQUVJLHNCQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO0tBQ0o7SUFHRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gsMkJBQUk7Ozs7Ozs7O0lBQUosVUFBSyxPQUFtQjtRQUVwQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEM7SUFHRDs7O09BR0c7Ozs7OztJQUNILDJCQUFJOzs7OztJQUFKO1FBRUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZEOzs7O0lBR0QsMEJBQUc7OztJQUFIO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDNUIsaURBQWlELENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBYSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RGOzs7Ozs7SUFFRCxvQ0FBYTs7Ozs7SUFBYixVQUFjLFdBQTRCLEVBQUUsSUFBUztRQUVqRCxxQkFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUMzQjtJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNILDZCQUFNOzs7Ozs7OztJQUFOLFVBQU8sT0FBd0IsRUFBRSxVQUFzQjtRQUVuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxxQkFBSSxFQUFFLG9CQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBQyxDQUFhO1lBQzFCLHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztZQUVsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRXZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxRQUFRLElBQUksbUJBQWtCLENBQUMsRUFBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUM7aUJBQ2hFO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQ25CO2FBQ0o7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25CLENBQUMsQ0FBQyxDQUFDO0tBQ1A7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNILDRCQUFLOzs7Ozs7O0lBQUwsVUFBTSxPQUF3QjtRQUUxQixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFhLElBQUssT0FBQSxPQUFPLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUdELHNCQUFJLGtDQUFROzs7O1FBQVo7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN6Qjs7O09BQUE7dUJBN0hMO0lBOEhDLENBQUE7Ozs7OztBQWhHRCx3QkFnR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7UmVzb3VyY2VTZWdtZW50LCBSZXN0U2VnbWVudFR5cGUsIFVybFNlZ21lbnR9IGZyb20gJy4vc2VnbWVudCc7XG5pbXBvcnQge2Fzc2VydCwgaXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICcuLi8uLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICpcbiAqIFRoaXMgY2xhc3MganVzdCBhZ2dyZWdhdGVzIGFuZCBwcm92aWRlcyBjb252aWVudCBhcGl0IHRvIHRvIHdvcmsgd2l0aCBVcmxTZWdtZW50c1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3RVcmxHcm91cFxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlZ21lbnRzPzogVXJsU2VnbWVudFtdKVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fc2VnbWVudHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWdtZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEV2ZXJ5IHB1c2ggaXMgdmFsaWRhdGVkIGFnYWludHMgVXJsU2VnbWVudCBhc3NlcnQgbWV0aG9kcyB0byBtYWtlIHN1cmUgdGhlIG9yZGVyIG9mIHRoZVxuICAgICAqIG1ldGhvZCBjYWxscyBpcyBjb3JyZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBwdXNoKHNlZ21lbnQ6IFVybFNlZ21lbnQpOiB2b2lkXG4gICAge1xuICAgICAgICBzZWdtZW50LmFzc2VydFNlZ21lbnQoKHRoaXMuX3NlZ21lbnRzLmxlbmd0aCA+IDApID8gdGhpcy5wZWFrKCkudHlwZSA6IG51bGwpO1xuXG4gICAgICAgIGlmIChpc1N0cmluZyhzZWdtZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgc2VnbWVudC52YWx1ZSA9IHNlZ21lbnQudmFsdWUucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3RhY2sgbGlrZSBBUElcbiAgICAgKlxuICAgICAqL1xuICAgIHBlYWsoKTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmxhc3Q8VXJsU2VnbWVudD4odGhpcy5fc2VnbWVudHMpO1xuICAgIH1cblxuXG4gICAgcG9wKCk6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9zZWdtZW50cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgJyBBdHRlbXB0IHRvIGdldCB2YWx1ZSBmcm9tIGVtcHR5IHNlZ21lbnRzIHN0YWNrJyk7XG5cbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLnJlbW92ZUF0PFVybFNlZ21lbnQ+KHRoaXMuX3NlZ21lbnRzLCB0aGlzLl9zZWdtZW50cy5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWdtZW50KHNlZ21lbnRUeXBlOiBSZXN0U2VnbWVudFR5cGUsIGRhdGE6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB1cmxTZWdtZW50ID0gdGhpcy5sb29rdXAoc2VnbWVudFR5cGUpO1xuICAgICAgICB1cmxTZWdtZW50LnZhbHVlID0gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEJhc2VkIG9uIHRoZSBlbnVtIFNlZ21lbnQgVHlwZSAgaXQgd2lsbCByZXRyaWV2ZSBjb3JyZWN0IHNlZ21lbnQgZnJvbSB0aGUgc3RhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGxvb2t1cChzZWdtZW50OiBSZXN0U2VnbWVudFR5cGUsIGJ5UmVzb3VyY2U/OiBUeXBlPGFueT4pOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlZ21lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3MgPSBbLi4udGhpcy5zZWdtZW50c107XG4gICAgICAgIHNzID0gc3MucmV2ZXJzZSgpO1xuXG4gICAgICAgIHJldHVybiBzcy5maW5kKCgoczogVXJsU2VnbWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc01hdGNoID0gcy50eXBlID09PSBzZWdtZW50O1xuXG4gICAgICAgICAgICBpZiAoc2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KGJ5UmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaCAmJiAoPFJlc291cmNlU2VnbWVudD5zKS52YWx1ZSA9PT0gYnlSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb3VudHMgbnVtYmVyIG9mIHNlZ21lbnRzIG9mIGNlcnRhaW4gdHlwZVxuICAgICAqXG4gICAgICovXG4gICAgY291bnQoc2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcigoczogVXJsU2VnbWVudCkgPT4gc2VnbWVudCA9PT0gcy50eXBlKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChzZWdtZW50cykgPyBzZWdtZW50cy5sZW5ndGggOiAwO1xuICAgIH1cblxuXG4gICAgZ2V0IHNlZ21lbnRzKCk6IFVybFNlZ21lbnRbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnRzO1xuICAgIH1cbn1cbiJdfQ==