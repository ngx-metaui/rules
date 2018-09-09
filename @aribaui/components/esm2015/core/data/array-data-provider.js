/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DataProvider } from './datatype-registry.service';
import { FieldPath, isBlank, isPresent } from '@aribaui/core';
import { of as observableOf } from 'rxjs';
/**
 * Default implementation for Arrays.
 * @template T
 */
export class ArrayDataProvider extends DataProvider {
    /**
     * @param {?} values
     */
    constructor(values) {
        super();
        this.values = values;
        this.type = Array;
        this.offScreenData = this.values;
        this.dataChanges.next(this.values);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    expectedCount(params) {
        return this.offScreenData.length;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    dataForParams(params) {
        if (isBlank(params)) {
            return this.offScreenData;
        }
        /** @type {?} */
        let data = this.offScreenData;
        if (isPresent(params) && params.has('offset') && params.has('limit')) {
            /** @type {?} */
            let offset = params.get('offset');
            /** @type {?} */
            let limit = params.get('limit');
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
    }
    /**
     * @param {?} params
     * @return {?}
     */
    fetch(params) {
        return observableOf(this.dataForParams(params));
    }
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
    sort(arrayToSort, key, sortOrder) {
        arrayToSort.sort((data1, data2) => {
            /** @type {?} */
            let value1 = FieldPath.getFieldValue(data1, key);
            /** @type {?} */
            let value2 = FieldPath.getFieldValue(data2, key);
            /** @type {?} */
            let result = null;
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
    }
}
if (false) {
    /** @type {?} */
    ArrayDataProvider.prototype.values;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktZGF0YS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2RhdGEvYXJyYXktZGF0YS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFhLEVBQUUsSUFBSSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBTXBELE1BQU0sd0JBQTRCLFNBQVEsWUFBZTs7OztJQUdyRCxZQUF1QixNQUFnQjtRQUVuQyxLQUFLLEVBQUUsQ0FBQztRQUZXLFdBQU0sR0FBTixNQUFNLENBQVU7UUFHbkMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0Qzs7Ozs7SUFFRCxhQUFhLENBQUMsTUFBeUI7UUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0tBQ3BDOzs7OztJQUVELGFBQWEsQ0FBQyxNQUF5QjtRQUVuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCOztRQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcs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Z2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtGaWVsZFBhdGgsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZn0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBBcnJheXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnJheURhdGFQcm92aWRlcjxUPiBleHRlbmRzIERhdGFQcm92aWRlcjxUPlxue1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkICB2YWx1ZXM6IEFycmF5PFQ+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gQXJyYXk7XG5cbiAgICAgICAgdGhpcy5vZmZTY3JlZW5EYXRhID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIHRoaXMuZGF0YUNoYW5nZXMubmV4dCh0aGlzLnZhbHVlcyk7XG4gICAgfVxuXG4gICAgZXhwZWN0ZWRDb3VudChwYXJhbXM/OiBNYXA8c3RyaW5nLCBhbnk+KTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5vZmZTY3JlZW5EYXRhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBkYXRhRm9yUGFyYW1zKHBhcmFtcz86IE1hcDxzdHJpbmcsIGFueT4pOiBBcnJheTxUPlxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2ZmU2NyZWVuRGF0YTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMub2ZmU2NyZWVuRGF0YTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHBhcmFtcykgJiYgcGFyYW1zLmhhcygnb2Zmc2V0JykgJiYgcGFyYW1zLmhhcygnbGltaXQnKSkge1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHBhcmFtcy5nZXQoJ29mZnNldCcpO1xuICAgICAgICAgICAgbGV0IGxpbWl0ID0gcGFyYW1zLmdldCgnbGltaXQnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gKG9mZnNldCArIGxpbWl0KSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGltaXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShvZmZzZXQsIGRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMuaGFzKCdvcmRlcmJ5JykgJiYgcGFyYW1zLmhhcygnc2VsZWN0b3InKSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KGRhdGEsIHBhcmFtcy5nZXQoJ29yZGVyYnknKSwgcGFyYW1zLmdldCgnc2VsZWN0b3InKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG5cbiAgICBmZXRjaChwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT4pOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5kYXRhRm9yUGFyYW1zKHBhcmFtcykpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBmb3Igc29ydGluZyBjdXJyZW50IGRhdGFzZXQgYnkgb25lIGNvbHVtbiAvIGtleVxuICAgICAqXG4gICAgICogZm9yIHNvcnRPcmRlcmluZyBwbGVhc2Ugc2VlIERhdGF0YWJsZSBhbmQgaXRzIHNvcnRPcmRlcmluZ0Zvck51bWJlcigpXG4gICAgICpcbiAgICAgKiAgICAgIDEgID0gYXNjZW5kaW5nXG4gICAgICogICAgICAtMSA9IGRlc2NlbmRpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIHNvcnQoYXJyYXlUb1NvcnQ6IGFueVtdLCBrZXk6IHN0cmluZywgc29ydE9yZGVyOiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBhcnJheVRvU29ydC5zb3J0KChkYXRhMTogYW55LCBkYXRhMjogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdmFsdWUxID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTEsIGtleSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YTIsIGtleSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHNvcnRPcmRlciAqIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==