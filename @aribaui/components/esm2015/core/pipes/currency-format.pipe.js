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
export class CurrencyFormatPipe {
    /**
     * @param {?} currencyPipe
     */
    constructor(currencyPipe) {
        this.currencyPipe = currencyPipe;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        /** @type {?} */
        let currencyCode = 'USD';
        /** @type {?} */
        let symbolDisplay = true;
        /** @type {?} */
        let digits = '1.0-2';
        if (!value || value.length === 0) {
            return value;
        }
        if (args && args.length > 0) {
            /** @type {?} */
            let code = args[0];
            if (code && code.length > 0) {
                currencyCode = code;
            }
        }
        return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
    }
}
CurrencyFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'currencyFormat',
                pure: false
            },] }
];
/** @nocollapse */
CurrencyFormatPipe.ctorParameters = () => [
    { type: CurrencyPipe }
];
if (false) {
    /** @type {?} */
    CurrencyFormatPipe.prototype.currencyPipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybWF0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9waXBlcy9jdXJyZW5jeS1mb3JtYXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFVbEQsTUFBTTs7OztJQUdGLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0tBRTdDOzs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLEdBQUcsSUFBVzs7UUFJbkMsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUF5Qzs7UUFBakUsSUFBMEIsYUFBYSxHQUFHLElBQUksQ0FBbUI7O1FBQWpFLElBQWdELE1BQU0sR0FBRyxPQUFPLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtTQUNKO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2xGOzs7WUE3QkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLElBQUksRUFBRSxLQUFLO2FBQ2Q7Ozs7WUFWTyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0N1cnJlbmN5UGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhpcyBjdXJyZW5jeSBmb3JtYXR0ZXIgd2lsbCBpZ25vcmUgbnVsbCBhbmQgZW1wdHkgc3RyaW5nIGZvciB2YWx1ZS5cbiAqIElzc3VlIDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvODY5NCAgREkgZmFpbHMgd2hlbiBleHRlbmRzIG90aGVyIGNsYXNzZXNcbiAqL1xuQFBpcGUoe1xuICAgIG5hbWU6ICdjdXJyZW5jeUZvcm1hdCcsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxue1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjdXJyZW5jeVBpcGU6IEN1cnJlbmN5UGlwZSlcbiAgICB7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogYW55XG4gICAge1xuXG4gICAgICAgIC8vIERlZmF1bHQgdmFsdWVzXG4gICAgICAgIGxldCBjdXJyZW5jeUNvZGUgPSAnVVNEJywgc3ltYm9sRGlzcGxheSA9IHRydWUsIGRpZ2l0cyA9ICcxLjAtMic7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBhcmdzWzBdO1xuICAgICAgICAgICAgaWYgKGNvZGUgJiYgY29kZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlID0gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5UGlwZS50cmFuc2Zvcm0odmFsdWUsIGN1cnJlbmN5Q29kZSwgc3ltYm9sRGlzcGxheSwgZGlnaXRzKTtcbiAgICB9XG59XG5cbiJdfQ==