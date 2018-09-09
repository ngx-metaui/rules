/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isPresent } from '@aribaui/core';
import { ErrorManagerService } from '../../core/error-manager.service';
/**
 * ErrorMessagesComponent is used by form's component like FormRow to print its validation errors.
 * Its  based on ModelDriven (Reactive forms) and it reads errors from FormControl
 *
 *
 *
 */
export class ErrorMessagesComponent {
    /**
     * @param {?} errManager
     */
    constructor(errManager) {
        this.errManager = errManager;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    hasMessage() {
        /** @type {?} */
        let msg = this.errorMsg;
        return isPresent(msg);
    }
    /**
     * Retrieve a messages if any registered by added validators
     *
     * @return {?}
     */
    get errorMsg() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.errManager.errorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
    }
    /**
     *
     * Show errors? We currently shows errors if the control is not valid, it was touched by user.
     * Most of the type on blur event  and at last its not pristine anymore (its dirty)
     *
     * @return {?}
     */
    showErrors() {
        return !this.control.valid && !this.control.pristine && this.control.touched;
    }
}
ErrorMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'a-error-messages',
                template: `
            <div class="ui-g">
                    <small *ngIf="hasMessage()"
                        class="ui-g-12 ui-message ui-messages-error ui-corner-all">
                        {{ errorMsg }}
                    </small>
            </div>
    `,
                styles: [""]
            }] }
];
/** @nocollapse */
ErrorMessagesComponent.ctorParameters = () => [
    { type: ErrorManagerService }
];
ErrorMessagesComponent.propDecorators = {
    control: [{ type: Input }]
};
if (false) {
    /**
     * Current form FormControll to check for Errors
     * @type {?}
     */
    ErrorMessagesComponent.prototype.control;
    /** @type {?} */
    ErrorMessagesComponent.prototype.errManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZXJyb3ItbWVzc2FnZXMvZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7O0FBcUJyRSxNQUFNOzs7O0lBVUYsWUFBb0IsVUFBK0I7UUFBL0IsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7S0FFbEQ7Ozs7SUFFRCxRQUFRO0tBR1A7Ozs7SUFHRCxVQUFVOztRQUVOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBTUQsSUFBSSxRQUFRO1FBRVIsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDMUM7U0FDSjtLQUNKOzs7Ozs7OztJQVFELFVBQVU7UUFFTixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0tBQ2hGOzs7WUE3REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7OztLQU9UOzthQUVKOzs7O1lBcEJPLG1CQUFtQjs7O3NCQTJCdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtFcnJvck1hbmFnZXJTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb3JlL2Vycm9yLW1hbmFnZXIuc2VydmljZSc7XG5cbi8qKlxuICogRXJyb3JNZXNzYWdlc0NvbXBvbmVudCBpcyB1c2VkIGJ5IGZvcm0ncyBjb21wb25lbnQgbGlrZSBGb3JtUm93IHRvIHByaW50IGl0cyB2YWxpZGF0aW9uIGVycm9ycy5cbiAqIEl0cyAgYmFzZWQgb24gTW9kZWxEcml2ZW4gKFJlYWN0aXZlIGZvcm1zKSBhbmQgaXQgcmVhZHMgZXJyb3JzIGZyb20gRm9ybUNvbnRyb2xcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhLWVycm9yLW1lc3NhZ2VzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiaGFzTWVzc2FnZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktZy0xMiB1aS1tZXNzYWdlIHVpLW1lc3NhZ2VzLWVycm9yIHVpLWNvcm5lci1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGVycm9yTXNnIH19XG4gICAgICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWydlcnJvci1tZXNzYWdlcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZm9ybSBGb3JtQ29udHJvbGwgdG8gY2hlY2sgZm9yIEVycm9yc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udHJvbDogRm9ybUNvbnRyb2w7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyTWFuYWdlcjogRXJyb3JNYW5hZ2VyU2VydmljZSlcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgIH1cblxuXG4gICAgaGFzTWVzc2FnZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgbXNnID0gdGhpcy5lcnJvck1zZztcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChtc2cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIGEgbWVzc2FnZXMgaWYgYW55IHJlZ2lzdGVyZWQgYnkgYWRkZWQgdmFsaWRhdG9yc1xuICAgICAqXG4gICAgICovXG4gICAgZ2V0IGVycm9yTXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHRoaXMuY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wuZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgdGhpcy5jb250cm9sLnRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJNYW5hZ2VyLmVycm9yTWVzc2FnZShwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5lcnJvcnNbcHJvcGVydHlOYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNob3cgZXJyb3JzPyBXZSBjdXJyZW50bHkgc2hvd3MgZXJyb3JzIGlmIHRoZSBjb250cm9sIGlzIG5vdCB2YWxpZCwgaXQgd2FzIHRvdWNoZWQgYnkgdXNlci5cbiAgICAgKiBNb3N0IG9mIHRoZSB0eXBlIG9uIGJsdXIgZXZlbnQgIGFuZCBhdCBsYXN0IGl0cyBub3QgcHJpc3RpbmUgYW55bW9yZSAoaXRzIGRpcnR5KVxuICAgICAqXG4gICAgICovXG4gICAgc2hvd0Vycm9ycygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gIXRoaXMuY29udHJvbC52YWxpZCAmJiAhdGhpcy5jb250cm9sLnByaXN0aW5lICYmIHRoaXMuY29udHJvbC50b3VjaGVkO1xuICAgIH1cblxufVxuIl19