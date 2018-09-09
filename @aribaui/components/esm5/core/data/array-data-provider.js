/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataProvider } from './datatype-registry.service';
import { FieldPath, isBlank, isPresent } from '@aribaui/core';
import { of as observableOf } from 'rxjs';
/**
 * Default implementation for Arrays.
 * @template T
 */
var /**
 * Default implementation for Arrays.
 * @template T
 */
ArrayDataProvider = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayDataProvider, _super);
    function ArrayDataProvider(values) {
        var _this = _super.call(this) || this;
        _this.values = values;
        _this.type = Array;
        _this.offScreenData = _this.values;
        _this.dataChanges.next(_this.values);
        return _this;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    ArrayDataProvider.prototype.expectedCount = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        return this.offScreenData.length;
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    ArrayDataProvider.prototype.dataForParams = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (isBlank(params)) {
            return this.offScreenData;
        }
        /** @type {?} */
        var data = this.offScreenData;
        if (isPresent(params) && params.has('offset') && params.has('limit')) {
            /** @type {?} */
            var offset = params.get('offset');
            /** @type {?} */
            var limit = params.get('limit');
            if (data.length > (offset + limit)) {
                data = data.slice(offset, offset + limit);
            }
            else {
                data = data.slice(offset, data.length);
            }
        }
        if (params.has('orderby') && params.has('selector')) {
            this.sort(data, params.get('orderby'), params.get('selector'));
        }
        return data;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ArrayDataProvider.prototype.fetch = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return observableOf(this.dataForParams(params));
    };
    /**
     * Provides default implementation for sorting current dataset by one column / key
     *
     * for sortOrdering please see Datatable and its sortOrderingForNumber()
     *
     *      1  = ascending
     *      -1 = descending
     * @param {?} arrayToSort
     * @param {?} key
     * @param {?} sortOrder
     * @return {?}
     */
    ArrayDataProvider.prototype.sort = /**
     * Provides default implementation for sorting current dataset by one column / key
     *
     * for sortOrdering please see Datatable and its sortOrderingForNumber()
     *
     *      1  = ascending
     *      -1 = descending
     * @param {?} arrayToSort
     * @param {?} key
     * @param {?} sortOrder
     * @return {?}
     */
    function (arrayToSort, key, sortOrder) {
        arrayToSort.sort(function (data1, data2) {
            /** @type {?} */
            var value1 = FieldPath.getFieldValue(data1, key);
            /** @type {?} */
            var value2 = FieldPath.getFieldValue(data2, key);
            /** @type {?} */
            var result = null;
            if (value1 == null && value2 != null) {
                result = -1;
            }
            else if (value1 != null && value2 == null) {
                result = 1;
            }
            else if (value1 == null && value2 == null) {
                result = 0;
            }
            else if (typeof value1 === 'string' && typeof value2 === 'string') {
                result = value1.localeCompare(value2);
            }
            else {
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            }
            return (sortOrder * result);
        });
    };
    return ArrayDataProvider;
}(DataProvider));
/**
 * Default implementation for Arrays.
 * @template T
 */
export { ArrayDataProvider };
if (false) {
    /** @type {?} */
    ArrayDataProvider.prototype.values;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktZGF0YS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2RhdGEvYXJyYXktZGF0YS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYSxFQUFFLElBQUksWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7OztBQU1wRDs7OztBQUFBO0lBQTBDLDZDQUFlO0lBR3JELDJCQUF1QixNQUFnQjtRQUF2QyxZQUVJLGlCQUFPLFNBS1Y7UUFQc0IsWUFBTSxHQUFOLE1BQU0sQ0FBVTtRQUduQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztLQUN0Qzs7Ozs7SUFFRCx5Q0FBYTs7OztJQUFiLFVBQWMsTUFBeUI7UUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0tBQ3BDOzs7OztJQUVELHlDQUFhOzs7O0lBQWIsVUFBYyxNQUF5QjtRQUVuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCOztRQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElB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QUFBOzs7OztBQS9FRCw2QkErRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtGaWVsZFBhdGgsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZn0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBBcnJheXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnJheURhdGFQcm92aWRlcjxUPiBleHRlbmRzIERhdGFQcm92aWRlcjxUPlxue1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkICB2YWx1ZXM6IEFycmF5PFQ+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gQXJyYXk7XG5cbiAgICAgICAgdGhpcy5vZmZTY3JlZW5EYXRhID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIHRoaXMuZGF0YUNoYW5nZXMubmV4dCh0aGlzLnZhbHVlcyk7XG4gICAgfVxuXG4gICAgZXhwZWN0ZWRDb3VudChwYXJhbXM/OiBNYXA8c3RyaW5nLCBhbnk+KTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5vZmZTY3JlZW5EYXRhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBkYXRhRm9yUGFyYW1zKHBhcmFtcz86IE1hcDxzdHJpbmcsIGFueT4pOiBBcnJheTxUPlxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2ZmU2NyZWVuRGF0YTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMub2ZmU2NyZWVuRGF0YTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHBhcmFtcykgJiYgcGFyYW1zLmhhcygnb2Zmc2V0JykgJiYgcGFyYW1zLmhhcygnbGltaXQnKSkge1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHBhcmFtcy5nZXQoJ29mZnNldCcpO1xuICAgICAgICAgICAgbGV0IGxpbWl0ID0gcGFyYW1zLmdldCgnbGltaXQnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gKG9mZnNldCArIGxpbWl0KSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGltaXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShvZmZzZXQsIGRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMuaGFzKCdvcmRlcmJ5JykgJiYgcGFyYW1zLmhhcygnc2VsZWN0b3InKSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KGRhdGEsIHBhcmFtcy5nZXQoJ29yZGVyYnknKSwgcGFyYW1zLmdldCgnc2VsZWN0b3InKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG5cbiAgICBmZXRjaChwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT4pOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5kYXRhRm9yUGFyYW1zKHBhcmFtcykpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBmb3Igc29ydGluZyBjdXJyZW50IGRhdGFzZXQgYnkgb25lIGNvbHVtbiAvIGtleVxuICAgICAqXG4gICAgICogZm9yIHNvcnRPcmRlcmluZyBwbGVhc2Ugc2VlIERhdGF0YWJsZSBhbmQgaXRzIHNvcnRPcmRlcmluZ0Zvck51bWJlcigpXG4gICAgICpcbiAgICAgKiAgICAgIDEgID0gYXNjZW5kaW5nXG4gICAgICogICAgICAtMSA9IGRlc2NlbmRpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIHNvcnQoYXJyYXlUb1NvcnQ6IGFueVtdLCBrZXk6IHN0cmluZywgc29ydE9yZGVyOiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBhcnJheVRvU29ydC5zb3J0KChkYXRhMTogYW55LCBkYXRhMjogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdmFsdWUxID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTEsIGtleSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTIsIGtleSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHNvcnRPcmRlciAqIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==