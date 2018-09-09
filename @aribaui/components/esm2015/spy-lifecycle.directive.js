/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { isPresent, print } from '@aribaui/core';
/**
 * Spy lifecycle directive is used for debugging purposes to track lifecycle callback
 *
 * ###Usage
 *
 * ```
 *   <my-directive spyhooks><my-directive>
 *
 * ```
 */
export class SpyLifeCycleHooksDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.logIt('onInit');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.logIt('onDestroy');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.logIt('ngOnChanges = ' + changes);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.logIt('ngDoCheck');
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.logIt('ngAfterContentInit');
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.logIt('ngAfterContentChecked');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.logIt('ngAfterViewInit');
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.logIt('ngAfterViewChecked');
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logIt(msg) {
        /** @type {?} */
        let level = 0;
        /** @type {?} */
        let me = this.elementRef.nativeElement;
        /** @type {?} */
        let tagBody = me;
        while ((tagBody = tagBody.parentNode) != null) {
            level++;
            if (tagBody.tagName === 'APP-ROOT' || level === 6) {
                break;
            }
        }
        /** @type {?} */
        let indent = '';
        /** @type {?} */
        let indentNumber = level;
        while (level > 0) {
            indent += '\t';
            level--;
        }
        /** @type {?} */
        let params = '';
        if (isPresent(me.attributes)) {
            for (let i = 0; i < me.attributes.length; i++) {
                /** @type {?} */
                let attr = me.attributes.item(i);
                if (this.ignore(attr.name.toLowerCase())) {
                    continue;
                }
                params += '(' + attr.name + '=' + attr.value + '),  ';
            }
        }
        print(indent + me.tagName + '(' + indentNumber + '): ' + msg + ' => ' + params);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ignore(name) {
        return name.indexOf('_ng') > -1 ||
            name.indexOf('ng-') > -1 ||
            name.indexOf('spyhooks') > -1;
    }
}
SpyLifeCycleHooksDirective.decorators = [
    { type: Directive, args: [{ selector: '[spyHooks]' },] }
];
/** @nocollapse */
SpyLifeCycleHooksDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    SpyLifeCycleHooksDirective.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBS0gsU0FBUyxFQUVULFVBQVUsRUFLYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUFjL0MsTUFBTTs7OztJQUlGLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7S0FFekM7Ozs7SUFHRCxRQUFRO1FBRUosSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4Qjs7OztJQUVELFdBQVc7UUFFUCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELFdBQVcsQ0FBQyxPQUE0QztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsU0FBUztRQUVMLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDM0I7Ozs7SUFFRCxrQkFBa0I7UUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDcEM7Ozs7SUFFRCxxQkFBcUI7UUFHakIsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3ZDOzs7O0lBRUQsZUFBZTtRQUVYLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELGtCQUFrQjtRQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTyxLQUFLLENBQUMsR0FBVzs7UUFFckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOztRQUNkLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDOztRQUN2QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFakIsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDNUMsS0FBSyxFQUFFLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxDQUFDO2FBQ1Q7U0FDSjs7UUFDRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBQ2hCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDZixLQUFLLEVBQUUsQ0FBQztTQUNYOztRQUdELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O2dCQUM1QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxRQUFRLENBQUM7aUJBQ1o7Z0JBR0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUN6RDtTQUNKO1FBQ0QsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUc1RSxNQUFNLENBQUMsSUFBWTtRQUV2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztZQTNGekMsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBQzs7OztZQW5CL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIHByaW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFNweSBsaWZlY3ljbGUgZGlyZWN0aXZlIGlzIHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyB0byB0cmFjayBsaWZlY3ljbGUgY2FsbGJhY2tcbiAqXG4gKiAjIyNVc2FnZVxuICpcbiAqIGBgYFxuICogICA8bXktZGlyZWN0aXZlIHNweWhvb2tzPjxteS1kaXJlY3RpdmU+XG4gKlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3NweUhvb2tzXSd9KVxuZXhwb3J0IGNsYXNzIFNweUxpZmVDeWNsZUhvb2tzRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcyxcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkXG57XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpXG4gICAge1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnb25Jbml0Jyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnb25EZXN0cm95Jyk7XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7WyBwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSlcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ25nT25DaGFuZ2VzID0gJyArIGNoYW5nZXMpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCduZ0RvQ2hlY2snKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnbmdBZnRlckNvbnRlbnRJbml0Jyk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKClcbiAgICB7XG5cbiAgICAgICAgdGhpcy5sb2dJdCgnbmdBZnRlckNvbnRlbnRDaGVja2VkJyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ25nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCduZ0FmdGVyVmlld0NoZWNrZWQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvZ0l0KG1zZzogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgbGV0IGxldmVsID0gMDtcbiAgICAgICAgbGV0IG1lID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0YWdCb2R5ID0gbWU7XG5cbiAgICAgICAgd2hpbGUgKCh0YWdCb2R5ID0gdGFnQm9keS5wYXJlbnROb2RlKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXZlbCsrO1xuICAgICAgICAgICAgaWYgKHRhZ0JvZHkudGFnTmFtZSA9PT0gJ0FQUC1ST09UJyB8fCBsZXZlbCA9PT0gNikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpbmRlbnQgPSAnJztcbiAgICAgICAgbGV0IGluZGVudE51bWJlciA9IGxldmVsO1xuICAgICAgICB3aGlsZSAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gJ1xcdCc7XG4gICAgICAgICAgICBsZXZlbC0tO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgcGFyYW1zID0gJyc7XG4gICAgICAgIGlmIChpc1ByZXNlbnQobWUuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWUuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBhdHRyOiBBdHRyID0gbWUuYXR0cmlidXRlcy5pdGVtKGkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlnbm9yZShhdHRyLm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBwYXJhbXMgKz0gJygnICsgYXR0ci5uYW1lICsgJz0nICsgYXR0ci52YWx1ZSArICcpLCAgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcmludChpbmRlbnQgKyBtZS50YWdOYW1lICsgJygnICsgaW5kZW50TnVtYmVyICsgJyk6ICcgKyBtc2cgKyAnID0+ICcgKyBwYXJhbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaWdub3JlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBuYW1lLmluZGV4T2YoJ19uZycpID4gLTEgfHxcbiAgICAgICAgICAgIG5hbWUuaW5kZXhPZignbmctJykgPiAtMSB8fFxuICAgICAgICAgICAgbmFtZS5pbmRleE9mKCdzcHlob29rcycpID4gLTE7XG4gICAgfVxufVxuIl19