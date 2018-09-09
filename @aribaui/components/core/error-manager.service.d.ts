/**
 * Error Manager is a service used by Forms components to map error codes into meaningful messages.
 * Currently it does not have much but once we plug in localization it will make more sense
 *
 *
 * todo: Once ng-translate is implemented replace this with ng-translate functionality so we can
 * externalize these messages into locale files.
 *
 */
export declare class ErrorManagerService {
    messages: {
        [key: string]: any;
    };
    constructor();
    errorMessage(validatorName: string, validatorValue?: any): any;
}
