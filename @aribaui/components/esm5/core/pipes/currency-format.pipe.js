/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CurrencyPipe } from '@angular/common';
import { Pipe } from '@angular/core';
/**
 * This currency formatter will ignore null and empty string for value.
 * Issue : https://github.com/angular/angular/issues/8694  DI fails when extends other classes
 */
var CurrencyFormatPipe = /** @class */ (function () {
    function CurrencyFormatPipe(currencyPipe) {
        this.currencyPipe = currencyPipe;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    CurrencyFormatPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var currencyCode = 'USD';
        /** @type {?} */
        var symbolDisplay = true;
        /** @type {?} */
        var digits = '1.0-2';
        if (!value || value.length === 0) {
            return value;
        }
        if (args && args.length > 0) {
            /** @type {?} */
            var code = args[0];
            if (code && code.length > 0) {
                currencyCode = code;
            }
        }
        return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
    };
    CurrencyFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'currencyFormat',
                    pure: false
                },] }
    ];
    /** @nocollapse */
    CurrencyFormatPipe.ctorParameters = function () { return [
        { type: CurrencyPipe }
    ]; };
    return CurrencyFormatPipe;
}());
export { CurrencyFormatPipe };
if (false) {
    /** @type {?} */
    CurrencyFormatPipe.prototype.currencyPipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybWF0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9waXBlcy9jdXJyZW5jeS1mb3JtYXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lBYTlDLDRCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztLQUU3Qzs7Ozs7O0lBRUQsc0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7O1FBSW5DLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBeUM7O1FBQWpFLElBQTBCLGFBQWEsR0FBRyxJQUFJLENBQW1COztRQUFqRSxJQUFnRCxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7U0FDSjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsRjs7Z0JBN0JKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsS0FBSztpQkFDZDs7OztnQkFWTyxZQUFZOzs2QkFwQnBCOztTQStCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q3VycmVuY3lQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGlzIGN1cnJlbmN5IGZvcm1hdHRlciB3aWxsIGlnbm9yZSBudWxsIGFuZCBlbXB0eSBzdHJpbmcgZm9yIHZhbHVlLlxuICogSXNzdWUgOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84Njk0ICBESSBmYWlscyB3aGVuIGV4dGVuZHMgb3RoZXIgY2xhc3Nlc1xuICovXG5AUGlwZSh7XG4gICAgbmFtZTogJ2N1cnJlbmN5Rm9ybWF0JyxcbiAgICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUZvcm1hdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXG57XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1cnJlbmN5UGlwZTogQ3VycmVuY3lQaXBlKVxuICAgIHtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBhbnlcbiAgICB7XG5cbiAgICAgICAgLy8gRGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgbGV0IGN1cnJlbmN5Q29kZSA9ICdVU0QnLCBzeW1ib2xEaXNwbGF5ID0gdHJ1ZSwgZGlnaXRzID0gJzEuMC0yJztcblxuICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGFyZ3NbMF07XG4gICAgICAgICAgICBpZiAoY29kZSAmJiBjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVuY3lQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgY3VycmVuY3lDb2RlLCBzeW1ib2xEaXNwbGF5LCBkaWdpdHMpO1xuICAgIH1cbn1cblxuIl19