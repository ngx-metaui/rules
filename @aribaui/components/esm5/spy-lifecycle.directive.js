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
var SpyLifeCycleHooksDirective = /** @class */ (function () {
    function SpyLifeCycleHooksDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.logIt('onInit');
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.logIt('onDestroy');
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.logIt('ngOnChanges = ' + changes);
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.logIt('ngDoCheck');
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.logIt('ngAfterContentInit');
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.logIt('ngAfterContentChecked');
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.logIt('ngAfterViewInit');
    };
    /**
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.logIt('ngAfterViewChecked');
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.logIt = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        /** @type {?} */
        var level = 0;
        /** @type {?} */
        var me = this.elementRef.nativeElement;
        /** @type {?} */
        var tagBody = me;
        while ((tagBody = tagBody.parentNode) != null) {
            level++;
            if (tagBody.tagName === 'APP-ROOT' || level === 6) {
                break;
            }
        }
        /** @type {?} */
        var indent = '';
        /** @type {?} */
        var indentNumber = level;
        while (level > 0) {
            indent += '\t';
            level--;
        }
        /** @type {?} */
        var params = '';
        if (isPresent(me.attributes)) {
            for (var i = 0; i < me.attributes.length; i++) {
                /** @type {?} */
                var attr = me.attributes.item(i);
                if (this.ignore(attr.name.toLowerCase())) {
                    continue;
                }
                params += '(' + attr.name + '=' + attr.value + '),  ';
            }
        }
        print(indent + me.tagName + '(' + indentNumber + '): ' + msg + ' => ' + params);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    SpyLifeCycleHooksDirective.prototype.ignore = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return name.indexOf('_ng') > -1 ||
            name.indexOf('ng-') > -1 ||
            name.indexOf('spyhooks') > -1;
    };
    SpyLifeCycleHooksDirective.decorators = [
        { type: Directive, args: [{ selector: '[spyHooks]' },] }
    ];
    /** @nocollapse */
    SpyLifeCycleHooksDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return SpyLifeCycleHooksDirective;
}());
export { SpyLifeCycleHooksDirective };
if (false) {
    /** @type {?} */
    SpyLifeCycleHooksDirective.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBS0gsU0FBUyxFQUVULFVBQVUsRUFLYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0lBa0IzQyxvQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtLQUV6Qzs7OztJQUdELDZDQUFROzs7SUFBUjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEI7Ozs7SUFFRCxnREFBVzs7O0lBQVg7UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELGdEQUFXOzs7O0lBQVgsVUFBWSxPQUE0QztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsOENBQVM7OztJQUFUO1FBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMzQjs7OztJQUVELHVEQUFrQjs7O0lBQWxCO1FBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBRUQsMERBQXFCOzs7SUFBckI7UUFHSSxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDdkM7Ozs7SUFFRCxvREFBZTs7O0lBQWY7UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDakM7Ozs7SUFFRCx1REFBa0I7OztJQUFsQjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTywwQ0FBSzs7OztjQUFDLEdBQVc7O1FBRXJCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs7UUFDZCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzs7UUFDdkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVDLEtBQUssRUFBRSxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQzthQUNUO1NBQ0o7O1FBQ0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUNoQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksSUFBSSxDQUFDO1lBQ2YsS0FBSyxFQUFFLENBQUM7U0FDWDs7UUFHRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztnQkFDNUMsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDO2lCQUNaO2dCQUdELE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDekQ7U0FDSjtRQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHNUUsMkNBQU07Ozs7Y0FBQyxJQUFZO1FBRXZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Z0JBM0Z6QyxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFDOzs7O2dCQW5CL0IsVUFBVTs7cUNBM0JkOztTQStDYSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50LCBwcmludH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBTcHkgbGlmZWN5Y2xlIGRpcmVjdGl2ZSBpcyB1c2VkIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgdG8gdHJhY2sgbGlmZWN5Y2xlIGNhbGxiYWNrXG4gKlxuICogIyMjVXNhZ2VcbiAqXG4gKiBgYGBcbiAqICAgPG15LWRpcmVjdGl2ZSBzcHlob29rcz48bXktZGlyZWN0aXZlPlxuICpcbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tzcHlIb29rc10nfSlcbmV4cG9ydCBjbGFzcyBTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ29uSW5pdCcpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ29uRGVzdHJveScpO1xuICAgIH1cblxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1sgcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCduZ09uQ2hhbmdlcyA9ICcgKyBjaGFuZ2VzKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnbmdEb0NoZWNrJyk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ25nQWZ0ZXJDb250ZW50SW5pdCcpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpXG4gICAge1xuXG4gICAgICAgIHRoaXMubG9nSXQoJ25nQWZ0ZXJDb250ZW50Q2hlY2tlZCcpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCduZ0FmdGVyVmlld0luaXQnKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnbmdBZnRlclZpZXdDaGVja2VkJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2dJdChtc2c6IHN0cmluZylcbiAgICB7XG4gICAgICAgIGxldCBsZXZlbCA9IDA7XG4gICAgICAgIGxldCBtZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdGFnQm9keSA9IG1lO1xuXG4gICAgICAgIHdoaWxlICgodGFnQm9keSA9IHRhZ0JvZHkucGFyZW50Tm9kZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgICAgIGlmICh0YWdCb2R5LnRhZ05hbWUgPT09ICdBUFAtUk9PVCcgfHwgbGV2ZWwgPT09IDYpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZW50ID0gJyc7XG4gICAgICAgIGxldCBpbmRlbnROdW1iZXIgPSBsZXZlbDtcbiAgICAgICAgd2hpbGUgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgaW5kZW50ICs9ICdcXHQnO1xuICAgICAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHBhcmFtcyA9ICcnO1xuICAgICAgICBpZiAoaXNQcmVzZW50KG1lLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYXR0cjogQXR0ciA9IG1lLmF0dHJpYnV0ZXMuaXRlbShpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZ25vcmUoYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcGFyYW1zICs9ICcoJyArIGF0dHIubmFtZSArICc9JyArIGF0dHIudmFsdWUgKyAnKSwgICc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpbnQoaW5kZW50ICsgbWUudGFnTmFtZSArICcoJyArIGluZGVudE51bWJlciArICcpOiAnICsgbXNnICsgJyA9PiAnICsgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlnbm9yZShuYW1lOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gbmFtZS5pbmRleE9mKCdfbmcnKSA+IC0xIHx8XG4gICAgICAgICAgICBuYW1lLmluZGV4T2YoJ25nLScpID4gLTEgfHxcbiAgICAgICAgICAgIG5hbWUuaW5kZXhPZignc3B5aG9va3MnKSA+IC0xO1xuICAgIH1cbn1cbiJdfQ==