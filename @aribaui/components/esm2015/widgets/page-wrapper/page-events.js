/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Represents an event triggered when a page has been initialized.
 *
 */
export class PageInitialized {
    /**
     * @param {?} title
     */
    constructor(title) {
        this.title = title;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageInitializied(title: ${this.title})`;
    }
}
if (false) {
    /** @type {?} */
    PageInitialized.prototype.title;
}
/**
 * Represents an event triggered when a page has been destroyed.
 *
 */
export class PageDestroyed {
    /**
     * @param {?} title
     */
    constructor(title) {
        this.title = title;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageDestroyed(title: ${this.title})`;
    }
}
if (false) {
    /** @type {?} */
    PageDestroyed.prototype.title;
}
/** @typedef {?} */
var PageEvent;
export { PageEvent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ldmVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvcGFnZS1ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUF3QkEsTUFBTTs7OztJQUVGLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0tBRS9COzs7O0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQywyQkFBMkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0tBQ25EO0NBQ0o7Ozs7Ozs7OztBQU1ELE1BQU07Ozs7SUFFRixZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtLQUUvQjs7OztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsd0JBQXdCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztLQUNoRDtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBwYWdlIGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VJbml0aWFsaXplZFxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0aXRsZTogc3RyaW5nKVxuICAgIHtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgUGFnZUluaXRpYWxpemllZCh0aXRsZTogJHt0aGlzLnRpdGxlfSlgO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgcGFnZSBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgUGFnZURlc3Ryb3llZFxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0aXRsZTogc3RyaW5nKVxuICAgIHtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgUGFnZURlc3Ryb3llZCh0aXRsZTogJHt0aGlzLnRpdGxlfSlgO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZUV2ZW50ID0gUGFnZUluaXRpYWxpemVkIHwgUGFnZURlc3Ryb3llZDtcbiJdfQ==