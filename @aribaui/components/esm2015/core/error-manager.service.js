/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { StringWrapper } from '@aribaui/core';
/**
 * Error Manager is a service used by Forms components to map error codes into meaningful messages.
 * Currently it does not have much but once we plug in localization it will make more sense
 *
 *
 * todo: Once ng-translate is implemented replace this with ng-translate functionality so we can
 * externalize these messages into locale files.
 *
 */
export class ErrorManagerService {
    constructor() {
        this.messages = {
            'required': 'Required field',
            'minlength': 'Field does not meet minimum length',
            'maxlength': 'Field does not meet maximum length',
            'customMsg': '%s',
            'metavalid': '%s'
        };
    }
    /**
     * @param {?} validatorName
     * @param {?=} validatorValue
     * @return {?}
     */
    errorMessage(validatorName, validatorValue) {
        let /** @type {?} */ message = this.messages[validatorName];
        if (StringWrapper.contains(message, '%s')) {
            // todo: use ng-translate with proper message formatting
            return StringWrapper.replace(message, '%s', validatorValue.msg);
        }
        return message;
    }
}
ErrorManagerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorManagerService.ctorParameters = () => [];
function ErrorManagerService_tsickle_Closure_declarations() {
    /** @type {?} */
    ErrorManagerService.prototype.messages;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZXJyb3ItbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7O0FBWTVDLE1BQU07SUFJRjtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixVQUFVLEVBQUUsZ0JBQWdCO1lBQzVCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxXQUFXLEVBQUUsSUFBSTtZQUNqQixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO0tBQ0w7Ozs7OztJQUdELFlBQVksQ0FBQyxhQUFxQixFQUFFLGNBQW9CO1FBRXBELHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHeEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkU7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2xCOzs7WUExQkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RyaW5nV3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogRXJyb3IgTWFuYWdlciBpcyBhIHNlcnZpY2UgdXNlZCBieSBGb3JtcyBjb21wb25lbnRzIHRvIG1hcCBlcnJvciBjb2RlcyBpbnRvIG1lYW5pbmdmdWwgbWVzc2FnZXMuXG4gKiBDdXJyZW50bHkgaXQgZG9lcyBub3QgaGF2ZSBtdWNoIGJ1dCBvbmNlIHdlIHBsdWcgaW4gbG9jYWxpemF0aW9uIGl0IHdpbGwgbWFrZSBtb3JlIHNlbnNlXG4gKlxuICpcbiAqIHRvZG86IE9uY2UgbmctdHJhbnNsYXRlIGlzIGltcGxlbWVudGVkIHJlcGxhY2UgdGhpcyB3aXRoIG5nLXRyYW5zbGF0ZSBmdW5jdGlvbmFsaXR5IHNvIHdlIGNhblxuICogZXh0ZXJuYWxpemUgdGhlc2UgbWVzc2FnZXMgaW50byBsb2NhbGUgZmlsZXMuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JNYW5hZ2VyU2VydmljZVxue1xuICAgIG1lc3NhZ2VzOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB7XG4gICAgICAgICAgICAncmVxdWlyZWQnOiAnUmVxdWlyZWQgZmllbGQnLFxuICAgICAgICAgICAgJ21pbmxlbmd0aCc6ICdGaWVsZCBkb2VzIG5vdCBtZWV0IG1pbmltdW0gbGVuZ3RoJyxcbiAgICAgICAgICAgICdtYXhsZW5ndGgnOiAnRmllbGQgZG9lcyBub3QgbWVldCBtYXhpbXVtIGxlbmd0aCcsXG4gICAgICAgICAgICAnY3VzdG9tTXNnJzogJyVzJyxcbiAgICAgICAgICAgICdtZXRhdmFsaWQnOiAnJXMnXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICBlcnJvck1lc3NhZ2UodmFsaWRhdG9yTmFtZTogc3RyaW5nLCB2YWxpZGF0b3JWYWx1ZT86IGFueSlcbiAgICB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5tZXNzYWdlc1t2YWxpZGF0b3JOYW1lXTtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMobWVzc2FnZSwgJyVzJykpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHVzZSBuZy10cmFuc2xhdGUgd2l0aCBwcm9wZXIgbWVzc2FnZSBmb3JtYXR0aW5nXG5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2UobWVzc2FnZSwgJyVzJywgdmFsaWRhdG9yVmFsdWUubXNnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbn1cbiJdfQ==