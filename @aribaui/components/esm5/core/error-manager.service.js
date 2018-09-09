/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
var ErrorManagerService = /** @class */ (function () {
    function ErrorManagerService() {
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
    ErrorManagerService.prototype.errorMessage = /**
     * @param {?} validatorName
     * @param {?=} validatorValue
     * @return {?}
     */
    function (validatorName, validatorValue) {
        /** @type {?} */
        var message = this.messages[validatorName];
        if (StringWrapper.contains(message, '%s')) {
            // todo: use ng-translate with proper message formatting
            return StringWrapper.replace(message, '%s', validatorValue.msg);
        }
        return message;
    };
    ErrorManagerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ErrorManagerService.ctorParameters = function () { return []; };
    return ErrorManagerService;
}());
export { ErrorManagerService };
if (false) {
    /** @type {?} */
    ErrorManagerService.prototype.messages;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZXJyb3ItbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7OztJQWdCeEM7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osVUFBVSxFQUFFLGdCQUFnQjtZQUM1QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQztLQUNMOzs7Ozs7SUFHRCwwQ0FBWTs7Ozs7SUFBWixVQUFhLGFBQXFCLEVBQUUsY0FBb0I7O1FBRXBELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUd4QyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuRTtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDbEI7O2dCQTFCSixVQUFVOzs7OzhCQWhDWDs7U0FpQ2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKiBFcnJvciBNYW5hZ2VyIGlzIGEgc2VydmljZSB1c2VkIGJ5IEZvcm1zIGNvbXBvbmVudHMgdG8gbWFwIGVycm9yIGNvZGVzIGludG8gbWVhbmluZ2Z1bCBtZXNzYWdlcy5cbiAqIEN1cnJlbnRseSBpdCBkb2VzIG5vdCBoYXZlIG11Y2ggYnV0IG9uY2Ugd2UgcGx1ZyBpbiBsb2NhbGl6YXRpb24gaXQgd2lsbCBtYWtlIG1vcmUgc2Vuc2VcbiAqXG4gKlxuICogdG9kbzogT25jZSBuZy10cmFuc2xhdGUgaXMgaW1wbGVtZW50ZWQgcmVwbGFjZSB0aGlzIHdpdGggbmctdHJhbnNsYXRlIGZ1bmN0aW9uYWxpdHkgc28gd2UgY2FuXG4gKiBleHRlcm5hbGl6ZSB0aGVzZSBtZXNzYWdlcyBpbnRvIGxvY2FsZSBmaWxlcy5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvck1hbmFnZXJTZXJ2aWNlXG57XG4gICAgbWVzc2FnZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHtcbiAgICAgICAgICAgICdyZXF1aXJlZCc6ICdSZXF1aXJlZCBmaWVsZCcsXG4gICAgICAgICAgICAnbWlubGVuZ3RoJzogJ0ZpZWxkIGRvZXMgbm90IG1lZXQgbWluaW11bSBsZW5ndGgnLFxuICAgICAgICAgICAgJ21heGxlbmd0aCc6ICdGaWVsZCBkb2VzIG5vdCBtZWV0IG1heGltdW0gbGVuZ3RoJyxcbiAgICAgICAgICAgICdjdXN0b21Nc2cnOiAnJXMnLFxuICAgICAgICAgICAgJ21ldGF2YWxpZCc6ICclcydcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIGVycm9yTWVzc2FnZSh2YWxpZGF0b3JOYW1lOiBzdHJpbmcsIHZhbGlkYXRvclZhbHVlPzogYW55KVxuICAgIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VzW3ZhbGlkYXRvck5hbWVdO1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhtZXNzYWdlLCAnJXMnKSkge1xuICAgICAgICAgICAgLy8gdG9kbzogdXNlIG5nLXRyYW5zbGF0ZSB3aXRoIHByb3BlciBtZXNzYWdlIGZvcm1hdHRpbmdcblxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZShtZXNzYWdlLCAnJXMnLCB2YWxpZGF0b3JWYWx1ZS5tc2cpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxufVxuIl19