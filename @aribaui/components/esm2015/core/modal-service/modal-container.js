/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { noop } from '@aribaui/core';
import { BaseComponent } from '../base.component';
/**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
export class ModalContainer extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Override function.
         */
        this.destroy = noop;
    }
    /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     * @return {?}
     */
    closeModal() {
        this.destroy();
    }
}
function ModalContainer_tsickle_Closure_declarations() {
    /**
     * Override function.
     * @type {?}
     */
    ModalContainer.prototype.destroy;
    /** @type {?} */
    ModalContainer.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQWMsSUFBSSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUtoRCxNQUFNLHFCQUFzQixTQUFRLGFBQWE7Ozs7SUFTN0MsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7Ozt1QkFIYixJQUFJO0tBTXpCOzs7Ozs7SUFPRCxVQUFVO1FBRU4sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2xCO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RW52aXJvbm1lbnQsIG5vb3B9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogUGFyZW50IGNsYXNzIGZvciBhbGwgbW9kYWwgZGlhbG9ncy4gUHJvdmlkZXMgZGVmYXVsdHMgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIG1vZGFscy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZGVzdHJveTogKCkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGZ1bmN0aW9uIHRoYXQgY2xvc2VzIHRoZSBkaWFsb2cgYnkgY2FsbGluZyBkZXN0cm95IG9uIHRoZSBjb21wb25lbnQgcmVmZXJlbmNlLlxuICAgICAqIE1ldGhvZCBpbmhlcml0ZWQgYnkgYWxsIGl0cyBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBjbG9zZU1vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==