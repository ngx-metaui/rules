/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import { ListWrapper } from '../utils/collection';
import { assert } from '../utils/lang';
/**
 * Environment is sharable state between components and its injected at the root level and
 * the same instance accessible down the component tree.
 *
 */
export class Environment {
    constructor() {
        /**
         * Helper properties for debugging and testing purposes
         *
         */
        this.isPseudoLocalized = false;
        this.inTest = false;
        /**
         * An EventEmitter to listen to locale change events
         */
        this.onLocaleChange = new EventEmitter();
        this.isProduction = false;
        this._locale = 'en';
        this.envVariables = new Map();
        this.stacksVariables = new Map();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getValue(key) {
        if (this.envVariables.has(key)) {
            return this.envVariables.get(key);
        }
        return null;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setValue(key, value) {
        this.envVariables.set(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    deleteValue(key) {
        if (this.hasValue(key)) {
            this.envVariables.delete(key);
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    hasValue(key) {
        return this.envVariables.has(key);
    }
    /**
     * @return {?}
     */
    allVariables() {
        return this.envVariables;
    }
    /**
     * @return {?}
     */
    get locale() {
        return this._locale;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set locale(value) {
        this._locale = value;
        // Emit locale changed event
        this.onLocaleChange.emit(value);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    peak(key) {
        /** @type {?} */
        let stack = this.stacksVariables.get(key) || [];
        return ListWrapper.last(stack);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    pop(key) {
        /** @type {?} */
        let stack = this.stacksVariables.get(key) || [];
        assert(stack.length > 0, ' Attempt to get value from empty stack');
        return ListWrapper.removeAt(stack, stack.length - 1);
    }
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    push(key, value) {
        /** @type {?} */
        let stack = this.stacksVariables.get(key) || [];
        stack.push(value);
        this.stacksVariables.set(key, stack);
    }
}
Environment.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Environment.ctorParameters = () => [];
if (false) {
    /**
     * Keep Current Locale. Initialized from AppConfig along with i18n support
     * @type {?}
     */
    Environment.prototype._locale;
    /**
     * Used by component to save save additional properties for processing and its rendering
     * @type {?}
     */
    Environment.prototype.envVariables;
    /**
     * Simple stack-like storage where we need to a keep history
     * @type {?}
     */
    Environment.prototype.stacksVariables;
    /**
     * Helper properties for debugging and testing purposes
     *
     * @type {?}
     */
    Environment.prototype.isPseudoLocalized;
    /** @type {?} */
    Environment.prototype.inTest;
    /**
     * Store current Page FormGroup State that need to be shared down across components
     * @type {?}
     */
    Environment.prototype.currentForm;
    /**
     * An EventEmitter to listen to locale change events
     * @type {?}
     */
    Environment.prototype.onLocaleChange;
    /** @type {?} */
    Environment.prototype.isProduction;
    /**
     *
     * Register and save reference to user defined rules if any. You might define its own metadata
     * when rendering UI.
     * @type {?}
     */
    Environment.prototype.userRules;
    /**
     * This is jsut for debugging purposes to save some temp message that I can then trace.
     *
     * @type {?}
     */
    Environment.prototype.debugString;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiY29uZmlnL2Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVNyQyxNQUFNO0lBc0RGOzs7OztpQ0E5QjZCLEtBQUs7c0JBQ2hCLEtBQUs7Ozs7OEJBV2dCLElBQUksWUFBWSxFQUFVOzRCQUV6QyxLQUFLO1FBa0J6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBaUIsQ0FBQztLQUNuRDs7Ozs7SUFHRCxRQUFRLENBQUMsR0FBVztRQUVoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUVELFdBQVcsQ0FBQyxHQUFXO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0tBQ0o7Ozs7O0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFFaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JDOzs7O0lBRUQsWUFBWTtRQUVSLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzVCOzs7O0lBR0QsSUFBSSxNQUFNO1FBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkI7Ozs7O0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBYTtRQUVwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7UUFHckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7OztJQUVELElBQUksQ0FBSSxHQUFXOztRQUVmLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBSSxLQUFLLENBQUMsQ0FBQztLQUVyQzs7Ozs7O0lBR0QsR0FBRyxDQUFJLEdBQVc7O1FBRWQsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFNLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzdEOzs7Ozs7O0lBR0QsSUFBSSxDQUFJLEdBQVcsRUFBRSxLQUFROztRQUV6QixJQUFJLEtBQUssR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckQsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDeEM7OztZQWpJSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cblxuLyoqXG4gKiBFbnZpcm9ubWVudCBpcyBzaGFyYWJsZSBzdGF0ZSBiZXR3ZWVuIGNvbXBvbmVudHMgYW5kIGl0cyBpbmplY3RlZCBhdCB0aGUgcm9vdCBsZXZlbCBhbmRcbiAqIHRoZSBzYW1lIGluc3RhbmNlIGFjY2Vzc2libGUgZG93biB0aGUgY29tcG9uZW50IHRyZWUuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEtlZXAgQ3VycmVudCBMb2NhbGUuIEluaXRpYWxpemVkIGZyb20gQXBwQ29uZmlnIGFsb25nIHdpdGggaTE4biBzdXBwb3J0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgY29tcG9uZW50IHRvIHNhdmUgc2F2ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZm9yIHByb2Nlc3NpbmcgYW5kIGl0cyByZW5kZXJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGVudlZhcmlhYmxlczogTWFwPHN0cmluZywgYW55PjtcblxuXG4gICAgLyoqXG4gICAgICogU2ltcGxlIHN0YWNrLWxpa2Ugc3RvcmFnZSB3aGVyZSB3ZSBuZWVkIHRvIGEga2VlcCBoaXN0b3J5XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFja3NWYXJpYWJsZXM6IE1hcDxzdHJpbmcsIGFueVtdPjtcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBwcm9wZXJ0aWVzIGZvciBkZWJ1Z2dpbmcgYW5kIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGlzUHNldWRvTG9jYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaW5UZXN0OiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGN1cnJlbnQgUGFnZSBGb3JtR3JvdXAgU3RhdGUgdGhhdCBuZWVkIHRvIGJlIHNoYXJlZCBkb3duIGFjcm9zcyBjb21wb25lbnRzXG4gICAgICovXG4gICAgY3VycmVudEZvcm06IEZvcm1Hcm91cDtcblxuICAgIC8qKlxuICAgICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbG9jYWxlIGNoYW5nZSBldmVudHNcbiAgICAgKi9cbiAgICBvbkxvY2FsZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGlzUHJvZHVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZWdpc3RlciBhbmQgc2F2ZSByZWZlcmVuY2UgdG8gdXNlciBkZWZpbmVkIHJ1bGVzIGlmIGFueS4gWW91IG1pZ2h0IGRlZmluZSBpdHMgb3duIG1ldGFkYXRhXG4gICAgICogd2hlbiByZW5kZXJpbmcgVUkuXG4gICAgICovXG4gICAgdXNlclJ1bGVzOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGpzdXQgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyB0byBzYXZlIHNvbWUgdGVtcCBtZXNzYWdlIHRoYXQgSSBjYW4gdGhlbiB0cmFjZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGRlYnVnU3RyaW5nOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9ICdlbic7XG4gICAgICAgIHRoaXMuZW52VmFyaWFibGVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgdGhpcy5zdGFja3NWYXJpYWJsZXMgPSBuZXcgTWFwPHN0cmluZywgYW55W10+KCk7XG4gICAgfVxuXG5cbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZW52VmFyaWFibGVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbnZWYXJpYWJsZXMuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmVudlZhcmlhYmxlcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZGVsZXRlVmFsdWUoa2V5OiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmVudlZhcmlhYmxlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ZhbHVlKGtleTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIGFsbFZhcmlhYmxlcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnZWYXJpYWJsZXM7XG4gICAgfVxuXG5cbiAgICBnZXQgbG9jYWxlKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBzZXQgbG9jYWxlKHZhbHVlOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBFbWl0IGxvY2FsZSBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHRoaXMub25Mb2NhbGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcGVhazxUPihrZXk6IHN0cmluZyk6IFRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5sYXN0PFQ+KHN0YWNrKTtcblxuICAgIH1cblxuXG4gICAgcG9wPFQ+KGtleTogc3RyaW5nKTogVFxuICAgIHtcbiAgICAgICAgbGV0IHN0YWNrOiBUW10gPSB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgYXNzZXJ0KHN0YWNrLmxlbmd0aCA+IDAsICcgQXR0ZW1wdCB0byBnZXQgdmFsdWUgZnJvbSBlbXB0eSBzdGFjaycpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5yZW1vdmVBdDxhbnk+KHN0YWNrLCBzdGFjay5sZW5ndGggLSAxKTtcbiAgICB9XG5cblxuICAgIHB1c2g8VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHN0YWNrOiBUW10gPSB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc3RhY2tzVmFyaWFibGVzLnNldChrZXksIHN0YWNrKTtcbiAgICB9XG5cbn1cblxuIl19