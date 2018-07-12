/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ level = 0;
        var /** @type {?} */ me = this.elementRef.nativeElement;
        var /** @type {?} */ tagBody = me;
        while ((tagBody = tagBody.parentNode) != null) {
            level++;
            if (tagBody.tagName === 'APP-ROOT' || level === 6) {
                break;
            }
        }
        var /** @type {?} */ indent = '';
        var /** @type {?} */ indentNumber = level;
        while (level > 0) {
            indent += '\t';
            level--;
        }
        var /** @type {?} */ params = '';
        if (isPresent(me.attributes)) {
            for (var /** @type {?} */ i = 0; i < me.attributes.length; i++) {
                var /** @type {?} */ attr = me.attributes.item(i);
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
        { type: Directive, args: [{ selector: '[spyHooks]' },] },
    ];
    /** @nocollapse */
    SpyLifeCycleHooksDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return SpyLifeCycleHooksDirective;
}());
export { SpyLifeCycleHooksDirective };
function SpyLifeCycleHooksDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SpyLifeCycleHooksDirective.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBS0gsU0FBUyxFQUVULFVBQVUsRUFLYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0lBa0IzQyxvQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtLQUV6Qzs7OztJQUdELDZDQUFROzs7SUFBUjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEI7Ozs7SUFFRCxnREFBVzs7O0lBQVg7UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELGdEQUFXOzs7O0lBQVgsVUFBWSxPQUE0QztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsOENBQVM7OztJQUFUO1FBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMzQjs7OztJQUVELHVEQUFrQjs7O0lBQWxCO1FBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBRUQsMERBQXFCOzs7SUFBckI7UUFHSSxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDdkM7Ozs7SUFFRCxvREFBZTs7O0lBQWY7UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDakM7Ozs7SUFFRCx1REFBa0I7OztJQUFsQjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTywwQ0FBSzs7OztjQUFDLEdBQVc7UUFFckIscUJBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLHFCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxxQkFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVDLEtBQUssRUFBRSxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQzthQUNUO1NBQ0o7UUFDRCxxQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksSUFBSSxDQUFDO1lBQ2YsS0FBSyxFQUFFLENBQUM7U0FDWDtRQUdELHFCQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMscUJBQUksSUFBSSxHQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLFFBQVEsQ0FBQztpQkFDWjtnQkFHRCxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBQ3pEO1NBQ0o7UUFDRCxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFlBQVksR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBRzVFLDJDQUFNOzs7O2NBQUMsSUFBWTtRQUV2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O2dCQTNGekMsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBQzs7OztnQkFuQi9CLFVBQVU7O3FDQTNCZDs7U0ErQ2EsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgcHJpbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICogU3B5IGxpZmVjeWNsZSBkaXJlY3RpdmUgaXMgdXNlZCBmb3IgZGVidWdnaW5nIHB1cnBvc2VzIHRvIHRyYWNrIGxpZmVjeWNsZSBjYWxsYmFja1xuICpcbiAqICMjI1VzYWdlXG4gKlxuICogYGBgXG4gKiAgIDxteS1kaXJlY3RpdmUgc3B5aG9va3M+PG15LWRpcmVjdGl2ZT5cbiAqXG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbc3B5SG9va3NdJ30pXG5leHBvcnQgY2xhc3MgU3B5TGlmZUN5Y2xlSG9va3NEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLFxuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWRcbntcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZilcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCdvbkluaXQnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCdvbkRlc3Ryb3knKTtcbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtbIHByb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnbmdPbkNoYW5nZXMgPSAnICsgY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ25nRG9DaGVjaycpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmxvZ0l0KCduZ0FmdGVyQ29udGVudEluaXQnKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKVxuICAgIHtcblxuICAgICAgICB0aGlzLmxvZ0l0KCduZ0FmdGVyQ29udGVudENoZWNrZWQnKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2dJdCgnbmdBZnRlclZpZXdJbml0Jyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKClcbiAgICB7XG4gICAgICAgIHRoaXMubG9nSXQoJ25nQWZ0ZXJWaWV3Q2hlY2tlZCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nSXQobXNnOiBzdHJpbmcpXG4gICAge1xuICAgICAgICBsZXQgbGV2ZWwgPSAwO1xuICAgICAgICBsZXQgbWUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHRhZ0JvZHkgPSBtZTtcblxuICAgICAgICB3aGlsZSAoKHRhZ0JvZHkgPSB0YWdCb2R5LnBhcmVudE5vZGUpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldmVsKys7XG4gICAgICAgICAgICBpZiAodGFnQm9keS50YWdOYW1lID09PSAnQVBQLVJPT1QnIHx8IGxldmVsID09PSA2KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluZGVudCA9ICcnO1xuICAgICAgICBsZXQgaW5kZW50TnVtYmVyID0gbGV2ZWw7XG4gICAgICAgIHdoaWxlIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgIGluZGVudCArPSAnXFx0JztcbiAgICAgICAgICAgIGxldmVsLS07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCBwYXJhbXMgPSAnJztcbiAgICAgICAgaWYgKGlzUHJlc2VudChtZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGF0dHI6IEF0dHIgPSBtZS5hdHRyaWJ1dGVzLml0ZW0oaSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWdub3JlKGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHBhcmFtcyArPSAnKCcgKyBhdHRyLm5hbWUgKyAnPScgKyBhdHRyLnZhbHVlICsgJyksICAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaW50KGluZGVudCArIG1lLnRhZ05hbWUgKyAnKCcgKyBpbmRlbnROdW1iZXIgKyAnKTogJyArIG1zZyArICcgPT4gJyArIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpZ25vcmUobmFtZTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5hbWUuaW5kZXhPZignX25nJykgPiAtMSB8fFxuICAgICAgICAgICAgbmFtZS5pbmRleE9mKCduZy0nKSA+IC0xIHx8XG4gICAgICAgICAgICBuYW1lLmluZGV4T2YoJ3NweWhvb2tzJykgPiAtMTtcbiAgICB9XG59XG4iXX0=