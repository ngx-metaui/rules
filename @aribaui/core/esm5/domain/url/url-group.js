/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        var urlSegment = this.lookup(segmentType);
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
        /** @type {?} */
        var ss = tslib_1.__spread(this.segments);
        ss = ss.reverse();
        return ss.find((function (s) {
            /** @type {?} */
            var hasMatch = s.type === segment;
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
        /** @type {?} */
        var segments = this.segments.filter(function (s) { return segment === s.type; });
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
if (false) {
    /** @type {?} */
    RestUrlGroup.prototype._segments;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImRvbWFpbi91cmwvdXJsLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBa0IsZUFBZSxFQUFhLE1BQU0sV0FBVyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQVFuRDs7Ozs7QUFBQTtJQUVJLHNCQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO0tBQ0o7SUFHRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gsMkJBQUk7Ozs7Ozs7O0lBQUosVUFBSyxPQUFtQjtRQUVwQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEM7SUFHRDs7O09BR0c7Ozs7OztJQUNILDJCQUFJOzs7OztJQUFKO1FBRUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZEOzs7O0lBR0QsMEJBQUc7OztJQUFIO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDNUIsaURBQWlELENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBYSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RGOzs7Ozs7SUFFRCxvQ0FBYTs7Ozs7SUFBYixVQUFjLFdBQTRCLEVBQUUsSUFBUzs7UUFFakQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUMzQjtJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNILDZCQUFNOzs7Ozs7OztJQUFOLFVBQU8sT0FBd0IsRUFBRSxVQUFzQjtRQUVuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7O1FBRUQsSUFBSSxFQUFFLG9CQUFPLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDNUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVsQixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQUMsQ0FBYTs7WUFDMUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixNQUFNLENBQUMsUUFBUSxJQUFJLG1CQUFrQixDQUFDLEVBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO2lCQUNoRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsUUFBUSxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztLQUNQO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw0QkFBSzs7Ozs7OztJQUFMLFVBQU0sT0FBd0I7O1FBRTFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBYSxJQUFLLE9BQUEsT0FBTyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFHRCxzQkFBSSxrQ0FBUTs7OztRQUFaO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDekI7OztPQUFBO3VCQTdITDtJQThIQyxDQUFBOzs7Ozs7QUFoR0Qsd0JBZ0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1Jlc291cmNlU2VnbWVudCwgUmVzdFNlZ21lbnRUeXBlLCBVcmxTZWdtZW50fSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IHthc3NlcnQsIGlzQmxhbmssIGlzUHJlc2VudCwgaXNTdHJpbmd9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBUaGlzIGNsYXNzIGp1c3QgYWdncmVnYXRlcyBhbmQgcHJvdmlkZXMgY29udmllbnQgYXBpdCB0byB0byB3b3JrIHdpdGggVXJsU2VnbWVudHNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXN0VXJsR3JvdXBcbntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWdtZW50cz86IFVybFNlZ21lbnRbXSlcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3NlZ21lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VnbWVudHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVyeSBwdXNoIGlzIHZhbGlkYXRlZCBhZ2FpbnRzIFVybFNlZ21lbnQgYXNzZXJ0IG1ldGhvZHMgdG8gbWFrZSBzdXJlIHRoZSBvcmRlciBvZiB0aGVcbiAgICAgKiBtZXRob2QgY2FsbHMgaXMgY29ycmVjdFxuICAgICAqXG4gICAgICovXG4gICAgcHVzaChzZWdtZW50OiBVcmxTZWdtZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgc2VnbWVudC5hc3NlcnRTZWdtZW50KCh0aGlzLl9zZWdtZW50cy5sZW5ndGggPiAwKSA/IHRoaXMucGVhaygpLnR5cGUgOiBudWxsKTtcblxuICAgICAgICBpZiAoaXNTdHJpbmcoc2VnbWVudC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHNlZ21lbnQudmFsdWUgPSBzZWdtZW50LnZhbHVlLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFN0YWNrIGxpa2UgQVBJXG4gICAgICpcbiAgICAgKi9cbiAgICBwZWFrKCk6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5sYXN0PFVybFNlZ21lbnQ+KHRoaXMuX3NlZ21lbnRzKTtcbiAgICB9XG5cblxuICAgIHBvcCgpOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICBhc3NlcnQodGhpcy5fc2VnbWVudHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICcgQXR0ZW1wdCB0byBnZXQgdmFsdWUgZnJvbSBlbXB0eSBzZWdtZW50cyBzdGFjaycpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5yZW1vdmVBdDxVcmxTZWdtZW50Pih0aGlzLl9zZWdtZW50cywgdGhpcy5fc2VnbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VnbWVudChzZWdtZW50VHlwZTogUmVzdFNlZ21lbnRUeXBlLCBkYXRhOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMubG9va3VwKHNlZ21lbnRUeXBlKTtcbiAgICAgICAgdXJsU2VnbWVudC52YWx1ZSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgZW51bSBTZWdtZW50IFR5cGUgIGl0IHdpbGwgcmV0cmlldmUgY29ycmVjdCBzZWdtZW50IGZyb20gdGhlIHN0YWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBsb29rdXAoc2VnbWVudDogUmVzdFNlZ21lbnRUeXBlLCBieVJlc291cmNlPzogVHlwZTxhbnk+KTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWdtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNzID0gWy4uLnRoaXMuc2VnbWVudHNdO1xuICAgICAgICBzcyA9IHNzLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gc3MuZmluZCgoKHM6IFVybFNlZ21lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNNYXRjaCA9IHMudHlwZSA9PT0gc2VnbWVudDtcblxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChieVJlc291cmNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2ggJiYgKDxSZXNvdXJjZVNlZ21lbnQ+cykudmFsdWUgPT09IGJ5UmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ291bnRzIG51bWJlciBvZiBzZWdtZW50cyBvZiBjZXJ0YWluIHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIGNvdW50KHNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoKHM6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQgPT09IHMudHlwZSk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoc2VnbWVudHMpID8gc2VnbWVudHMubGVuZ3RoIDogMDtcbiAgICB9XG5cblxuICAgIGdldCBzZWdtZW50cygpOiBVcmxTZWdtZW50W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50cztcbiAgICB9XG59XG4iXX0=