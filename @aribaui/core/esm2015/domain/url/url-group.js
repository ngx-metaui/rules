/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { RestSegmentType } from './segment';
import { assert, isBlank, isPresent, isString } from '../../utils/lang';
import { ListWrapper } from '../../utils/collection';
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
export class RestUrlGroup {
    /**
     * @param {?=} _segments
     */
    constructor(_segments) {
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
     * @param {?} segment
     * @return {?}
     */
    push(segment) {
        segment.assertSegment((this._segments.length > 0) ? this.peak().type : null);
        if (isString(segment.value)) {
            segment.value = segment.value.replace(/^\/|\/$/g, '');
        }
        this._segments.push(segment);
    }
    /**
     * Stack like API
     *
     * @return {?}
     */
    peak() {
        return ListWrapper.last(this._segments);
    }
    /**
     * @return {?}
     */
    pop() {
        assert(this._segments.length > 0, ' Attempt to get value from empty segments stack');
        return ListWrapper.removeAt(this._segments, this._segments.length - 1);
    }
    /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    updateSegment(segmentType, data) {
        /** @type {?} */
        let urlSegment = this.lookup(segmentType);
        urlSegment.value = data;
    }
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    lookup(segment, byResource) {
        if (isBlank(this.segments)) {
            return null;
        }
        /** @type {?} */
        let ss = [...this.segments];
        ss = ss.reverse();
        return ss.find(((s) => {
            /** @type {?} */
            let hasMatch = s.type === segment;
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
    }
    /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    count(segment) {
        /** @type {?} */
        let segments = this.segments.filter((s) => segment === s.type);
        return isPresent(segments) ? segments.length : 0;
    }
    /**
     * @return {?}
     */
    get segments() {
        return this._segments;
    }
}
if (false) {
    /** @type {?} */
    RestUrlGroup.prototype._segments;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImRvbWFpbi91cmwvdXJsLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFrQixlQUFlLEVBQWEsTUFBTSxXQUFXLENBQUM7QUFDdkUsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBUW5ELE1BQU07Ozs7SUFFRixZQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7Ozs7OztJQVNELElBQUksQ0FBQyxPQUFtQjtRQUVwQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEM7Ozs7OztJQU9ELElBQUk7UUFFQSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBYSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkQ7Ozs7SUFHRCxHQUFHO1FBRUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDNUIsaURBQWlELENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBYSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RGOzs7Ozs7SUFFRCxhQUFhLENBQUMsV0FBNEIsRUFBRSxJQUFTOztRQUVqRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQzNCOzs7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsT0FBd0IsRUFBRSxVQUFzQjtRQUVuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7O1FBRUQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRTs7WUFDOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixNQUFNLENBQUMsUUFBUSxJQUFJLG1CQUFrQixDQUFDLEVBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO2lCQUNoRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsUUFBUSxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztLQUNQOzs7Ozs7OztJQU9ELEtBQUssQ0FBQyxPQUF3Qjs7UUFFMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BEOzs7O0lBR0QsSUFBSSxRQUFRO1FBRVIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtSZXNvdXJjZVNlZ21lbnQsIFJlc3RTZWdtZW50VHlwZSwgVXJsU2VnbWVudH0gZnJvbSAnLi9zZWdtZW50JztcbmltcG9ydCB7YXNzZXJ0LCBpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nfSBmcm9tICcuLi8uLi91dGlscy9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKlxuICogVGhpcyBjbGFzcyBqdXN0IGFnZ3JlZ2F0ZXMgYW5kIHByb3ZpZGVzIGNvbnZpZW50IGFwaXQgdG8gdG8gd29yayB3aXRoIFVybFNlZ21lbnRzXG4gKlxuICovXG5leHBvcnQgY2xhc3MgUmVzdFVybEdyb3VwXG57XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VnbWVudHM/OiBVcmxTZWdtZW50W10pXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9zZWdtZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRXZlcnkgcHVzaCBpcyB2YWxpZGF0ZWQgYWdhaW50cyBVcmxTZWdtZW50IGFzc2VydCBtZXRob2RzIHRvIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgdGhlXG4gICAgICogbWV0aG9kIGNhbGxzIGlzIGNvcnJlY3RcbiAgICAgKlxuICAgICAqL1xuICAgIHB1c2goc2VnbWVudDogVXJsU2VnbWVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHNlZ21lbnQuYXNzZXJ0U2VnbWVudCgodGhpcy5fc2VnbWVudHMubGVuZ3RoID4gMCkgPyB0aGlzLnBlYWsoKS50eXBlIDogbnVsbCk7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKHNlZ21lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICBzZWdtZW50LnZhbHVlID0gc2VnbWVudC52YWx1ZS5yZXBsYWNlKC9eXFwvfFxcLyQvZywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTdGFjayBsaWtlIEFQSVxuICAgICAqXG4gICAgICovXG4gICAgcGVhaygpOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIubGFzdDxVcmxTZWdtZW50Pih0aGlzLl9zZWdtZW50cyk7XG4gICAgfVxuXG5cbiAgICBwb3AoKTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3NlZ21lbnRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAnIEF0dGVtcHQgdG8gZ2V0IHZhbHVlIGZyb20gZW1wdHkgc2VnbWVudHMgc3RhY2snKTtcblxuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIucmVtb3ZlQXQ8VXJsU2VnbWVudD4odGhpcy5fc2VnbWVudHMsIHRoaXMuX3NlZ21lbnRzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlZ21lbnQoc2VnbWVudFR5cGU6IFJlc3RTZWdtZW50VHlwZSwgZGF0YTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHVybFNlZ21lbnQgPSB0aGlzLmxvb2t1cChzZWdtZW50VHlwZSk7XG4gICAgICAgIHVybFNlZ21lbnQudmFsdWUgPSBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQmFzZWQgb24gdGhlIGVudW0gU2VnbWVudCBUeXBlICBpdCB3aWxsIHJldHJpZXZlIGNvcnJlY3Qgc2VnbWVudCBmcm9tIHRoZSBzdGFja1xuICAgICAqXG4gICAgICovXG4gICAgbG9va3VwKHNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSwgYnlSZXNvdXJjZT86IFR5cGU8YW55Pik6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VnbWVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcyA9IFsuLi50aGlzLnNlZ21lbnRzXTtcbiAgICAgICAgc3MgPSBzcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHNzLmZpbmQoKChzOiBVcmxTZWdtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzTWF0Y2ggPSBzLnR5cGUgPT09IHNlZ21lbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYnlSZXNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoICYmICg8UmVzb3VyY2VTZWdtZW50PnMpLnZhbHVlID09PSBieVJlc291cmNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2g7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvdW50cyBudW1iZXIgb2Ygc2VnbWVudHMgb2YgY2VydGFpbiB0eXBlXG4gICAgICpcbiAgICAgKi9cbiAgICBjb3VudChzZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBzZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKChzOiBVcmxTZWdtZW50KSA9PiBzZWdtZW50ID09PSBzLnR5cGUpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHNlZ21lbnRzKSA/IHNlZ21lbnRzLmxlbmd0aCA6IDA7XG4gICAgfVxuXG5cbiAgICBnZXQgc2VnbWVudHMoKTogVXJsU2VnbWVudFtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudHM7XG4gICAgfVxufVxuIl19