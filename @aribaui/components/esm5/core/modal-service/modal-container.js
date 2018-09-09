/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { noop } from '@aribaui/core';
import { BaseComponent } from '../base.component';
/**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
var /**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
ModalContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ModalContainer, _super);
    function ModalContainer(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * Override function.
         */
        _this.destroy = noop;
        return _this;
    }
    /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     */
    /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     * @return {?}
     */
    ModalContainer.prototype.closeModal = /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     * @return {?}
     */
    function () {
        this.destroy();
    };
    return ModalContainer;
}(BaseComponent));
/**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
export { ModalContainer };
if (false) {
    /**
     * Override function.
     * @type {?}
     */
    ModalContainer.prototype.destroy;
    /** @type {?} */
    ModalContainer.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFjLElBQUksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFLaEQ7OztBQUFBO0lBQW9DLDBDQUFhO0lBUzdDLHdCQUFtQixHQUFnQjtRQUFuQyxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7d0JBSGIsSUFBSTs7S0FNekI7SUFHRDs7O09BR0c7Ozs7OztJQUNILG1DQUFVOzs7OztJQUFWO1FBRUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2xCO3lCQWhETDtFQTBCb0MsYUFBYSxFQXVCaEQsQ0FBQTs7OztBQXZCRCwwQkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RW52aXJvbm1lbnQsIG5vb3B9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogUGFyZW50IGNsYXNzIGZvciBhbGwgbW9kYWwgZGlhbG9ncy4gUHJvdmlkZXMgZGVmYXVsdHMgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIG1vZGFscy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZGVzdHJveTogKCkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGZ1bmN0aW9uIHRoYXQgY2xvc2VzIHRoZSBkaWFsb2cgYnkgY2FsbGluZyBkZXN0cm95IG9uIHRoZSBjb21wb25lbnQgcmVmZXJlbmNlLlxuICAgICAqIE1ldGhvZCBpbmhlcml0ZWQgYnkgYWxsIGl0cyBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBjbG9zZU1vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==