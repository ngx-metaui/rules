/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        // Default values
        var /** @type {?} */ currencyCode = 'USD', /** @type {?} */ symbolDisplay = true, /** @type {?} */ digits = '1.0-2';
        if (!value || value.length === 0) {
            return value;
        }
        if (args && args.length > 0) {
            var /** @type {?} */ code = args[0];
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
                },] },
    ];
    /** @nocollapse */
    CurrencyFormatPipe.ctorParameters = function () { return [
        { type: CurrencyPipe }
    ]; };
    return CurrencyFormatPipe;
}());
export { CurrencyFormatPipe };
function CurrencyFormatPipe_tsickle_Closure_declarations() {
    /** @type {?} */
    CurrencyFormatPipe.prototype.currencyPipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybWF0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9waXBlcy9jdXJyZW5jeS1mb3JtYXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lBYTlDLDRCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztLQUU3Qzs7Ozs7O0lBRUQsc0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7O1FBSW5DLHFCQUFJLFlBQVksR0FBRyxLQUFLLG1CQUFFLGFBQWEsR0FBRyxJQUFJLG1CQUFFLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLHFCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtTQUNKO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2xGOztnQkE3QkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxLQUFLO2lCQUNkOzs7O2dCQVZPLFlBQVk7OzZCQXBCcEI7O1NBK0JhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDdXJyZW5jeVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgY3VycmVuY3kgZm9ybWF0dGVyIHdpbGwgaWdub3JlIG51bGwgYW5kIGVtcHR5IHN0cmluZyBmb3IgdmFsdWUuXG4gKiBJc3N1ZSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzg2OTQgIERJIGZhaWxzIHdoZW4gZXh0ZW5kcyBvdGhlciBjbGFzc2VzXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnY3VycmVuY3lGb3JtYXQnLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5Rm9ybWF0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm1cbntcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3VycmVuY3lQaXBlOiBDdXJyZW5jeVBpcGUpXG4gICAge1xuICAgIH1cblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueVxuICAgIHtcblxuICAgICAgICAvLyBEZWZhdWx0IHZhbHVlc1xuICAgICAgICBsZXQgY3VycmVuY3lDb2RlID0gJ1VTRCcsIHN5bWJvbERpc3BsYXkgPSB0cnVlLCBkaWdpdHMgPSAnMS4wLTInO1xuXG4gICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gYXJnc1swXTtcbiAgICAgICAgICAgIGlmIChjb2RlICYmIGNvZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeVBpcGUudHJhbnNmb3JtKHZhbHVlLCBjdXJyZW5jeUNvZGUsIHN5bWJvbERpc3BsYXksIGRpZ2l0cyk7XG4gICAgfVxufVxuXG4iXX0=