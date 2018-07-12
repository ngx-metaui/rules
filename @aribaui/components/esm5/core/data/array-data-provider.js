/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        return this.values.length;
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
            return this.values;
        }
        var /** @type {?} */ data = this.values;
        if (isPresent(params) && params.has('offset') && params.has('limit')) {
            var /** @type {?} */ offset = params.get('offset');
            var /** @type {?} */ limit = params.get('limit');
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
            var /** @type {?} */ value1 = FieldPath.getFieldValue(data1, key);
            var /** @type {?} */ value2 = FieldPath.getFieldValue(data2, key);
            var /** @type {?} */ result = null;
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
function ArrayDataProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayDataProvider.prototype.values;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktZGF0YS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2RhdGEvYXJyYXktZGF0YS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxFQUFFLElBQUksWUFBWSxFQUFhLE1BQU0sTUFBTSxDQUFDOzs7OztBQU1wRDs7OztBQUFBO0lBQTBDLDZDQUFlO0lBR3JELDJCQUF3QixNQUFnQjtRQUF4QyxZQUVJLGlCQUFPLFNBSVY7UUFOdUIsWUFBTSxHQUFOLE1BQU0sQ0FBVTtRQUdwQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0tBQ3RDOzs7OztJQUVELHlDQUFhOzs7O0lBQWIsVUFBZSxNQUF5QjtRQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDN0I7Ozs7O0lBRUQseUNBQWE7Ozs7SUFBYixVQUFlLE1BQXlCO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFDRCxxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxxQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxxQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzthQUM3QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBR0QsaUNBQUs7Ozs7SUFBTCxVQUFPLE1BQXdCO1FBRTNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7Ozs7Ozs7Ozs7O0lBV08sZ0NBQUk7Ozs7Ozs7Ozs7OztjQUFFLFdBQWtCLEVBQUUsR0FBVyxFQUFFLFNBQWlCO1FBRTVELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFVLEVBQUUsS0FBVTtZQUVwQyxxQkFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQscUJBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELHFCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNkO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDZDtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7WUFFRCxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDOzs0QkF4R1g7RUE0QjBDLFlBQVksRUE4RXJELENBQUE7Ozs7O0FBOUVELDZCQThFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJ9IGZyb20gJy4vZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0ZpZWxkUGF0aCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7b2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gZm9yIEFycmF5cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFycmF5RGF0YVByb3ZpZGVyPFQ+IGV4dGVuZHMgRGF0YVByb3ZpZGVyPFQ+XG57XG5cbiAgICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkICB2YWx1ZXM6IEFycmF5PFQ+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gQXJyYXk7XG5cbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMudmFsdWVzKTtcbiAgICB9XG5cbiAgICBleHBlY3RlZENvdW50IChwYXJhbXM/OiBNYXA8c3RyaW5nLCBhbnk+KTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGRhdGFGb3JQYXJhbXMgKHBhcmFtcz86IE1hcDxzdHJpbmcsIGFueT4pOiBBcnJheTxUPlxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy52YWx1ZXM7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXJhbXMpICYmIHBhcmFtcy5oYXMoJ29mZnNldCcpICYmIHBhcmFtcy5oYXMoJ2xpbWl0JykpIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBwYXJhbXMuZ2V0KCdvZmZzZXQnKTtcbiAgICAgICAgICAgIGxldCBsaW1pdCA9IHBhcmFtcy5nZXQoJ2xpbWl0Jyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IChvZmZzZXQgKyBsaW1pdCkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShvZmZzZXQsIG9mZnNldCArIGxpbWl0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2Uob2Zmc2V0LCBkYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmhhcygnb3JkZXJieScpICYmIHBhcmFtcy5oYXMoJ3NlbGVjdG9yJykpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydChkYXRhLCBwYXJhbXMuZ2V0KCdvcmRlcmJ5JyksIHBhcmFtcy5nZXQoJ3NlbGVjdG9yJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuXG4gICAgZmV0Y2ggKHBhcmFtczogTWFwPHN0cmluZywgYW55Pik6IE9ic2VydmFibGU8VFtdPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmRhdGFGb3JQYXJhbXMocGFyYW1zKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBzb3J0aW5nIGN1cnJlbnQgZGF0YXNldCBieSBvbmUgY29sdW1uIC8ga2V5XG4gICAgICpcbiAgICAgKiBmb3Igc29ydE9yZGVyaW5nIHBsZWFzZSBzZWUgRGF0YXRhYmxlIGFuZCBpdHMgc29ydE9yZGVyaW5nRm9yTnVtYmVyKClcbiAgICAgKlxuICAgICAqICAgICAgMSAgPSBhc2NlbmRpbmdcbiAgICAgKiAgICAgIC0xID0gZGVzY2VuZGluZ1xuICAgICAqL1xuICAgIHByaXZhdGUgc29ydCAoYXJyYXlUb1NvcnQ6IGFueVtdLCBrZXk6IHN0cmluZywgc29ydE9yZGVyOiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBhcnJheVRvU29ydC5zb3J0KChkYXRhMTogYW55LCBkYXRhMjogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdmFsdWUxID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTEsIGtleSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTIsIGtleSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHNvcnRPcmRlciAqIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==