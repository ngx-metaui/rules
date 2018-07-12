/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Used by IncludeComponent directive to represent a components and all required detailed needed to
 * dynamically instantiate and insert component into the view.
 * @record
 */
export function ComponentReference() { }
function ComponentReference_tsickle_Closure_declarations() {
    /**
     * Metadata about the instantiated component.
     *
     * Note: before this one was called ComponentMetadate, but in Angular 2.0 final it was renamed
     * to Component
     * @type {?}
     */
    ComponentReference.prototype.metadata;
    /**
     * Component factory created by
     *
     * ```
     *  factoryResolver.resolveComponentFactory(<TYPE>)
     * ```
     *  We do not really need it now, but once we start caching created components it will more
     * more sense.
     *
     * @type {?}
     */
    ComponentReference.prototype.resolvedCompFactory;
    /**
     * Resolved Component TYPE
     * @type {?}
     */
    ComponentReference.prototype.componentType;
    /**
     * String representation of componnent being rendered
     * @type {?}
     */
    ComponentReference.prototype.componentName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2NvbXBvbmVudC1yZWZlcmVuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogVXNlZCBieSBJbmNsdWRlQ29tcG9uZW50IGRpcmVjdGl2ZSB0byByZXByZXNlbnQgYSBjb21wb25lbnRzIGFuZCBhbGwgcmVxdWlyZWQgZGV0YWlsZWQgbmVlZGVkIHRvXG4gKiBkeW5hbWljYWxseSBpbnN0YW50aWF0ZSBhbmQgaW5zZXJ0IGNvbXBvbmVudCBpbnRvIHRoZSB2aWV3LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudFJlZmVyZW5jZVxue1xuICAgIC8qKlxuICAgICAqIE1ldGFkYXRhIGFib3V0IHRoZSBpbnN0YW50aWF0ZWQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogTm90ZTogYmVmb3JlIHRoaXMgb25lIHdhcyBjYWxsZWQgQ29tcG9uZW50TWV0YWRhdGUsIGJ1dCBpbiBBbmd1bGFyIDIuMCBmaW5hbCBpdCB3YXMgcmVuYW1lZFxuICAgICAqIHRvIENvbXBvbmVudFxuICAgICAqL1xuICAgIG1ldGFkYXRhOiBDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb21wb25lbnQgZmFjdG9yeSBjcmVhdGVkIGJ5XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgZmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxUWVBFPilcbiAgICAgKiBgYGBcbiAgICAgKiAgV2UgZG8gbm90IHJlYWxseSBuZWVkIGl0IG5vdywgYnV0IG9uY2Ugd2Ugc3RhcnQgY2FjaGluZyBjcmVhdGVkIGNvbXBvbmVudHMgaXQgd2lsbCBtb3JlXG4gICAgICogbW9yZSBzZW5zZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHJlc29sdmVkQ29tcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmVkIENvbXBvbmVudCBUWVBFXG4gICAgICovXG4gICAgY29tcG9uZW50VHlwZTogVHlwZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGNvbXBvbm5lbnQgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmc7XG59XG5cbiJdfQ==