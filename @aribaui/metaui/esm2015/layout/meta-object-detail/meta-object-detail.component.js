/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Environment, isBlank, isStringMap } from '@aribaui/core';
import { BaseComponent } from '@aribaui/components';
/**
 * Just like MetaContentPage this components renders meta context details but embedded as some
 * inline component. Not a page with page level buttons
 *
 *
 * Todo: We dont really need this component we we in the future extends MetaIncludeComponent to
 * support awcontentElement:
 *
 * ```
 *  {
 *      component:MetaContextComponent;
 *      bindings: {
 *          object:$value;
 *          layout:Inspect;
 *          operation:view;
 *          awcontentElement:MetaIncludeComponnetDirective;
 *      }
 *
 *  }
 *
 *  ```
 *
 *  This would instantiate right meta context just like this class.
 */
export class MetaObjectDetailComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * For the detail view we always use read only content
         */
        this.operation = 'view';
        /**
         * Default layout
         *
         */
        this.layout = 'Inspect';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isBlank(this.object) || !isStringMap(this.object)) {
            throw new Error('Cannot render primitive values as object details!');
        }
    }
}
MetaObjectDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-content-detail',
                template: "<span class=\"w-obj-detail-lbl\" *ngIf=\"label\">{{label}}</span>\n<m-context [pushNewContext]=\"true\" [object]=\"object\" [operation]=\"operation\"\n           [layout]=\"layout\" group=\"ObjectDetail\">\n\n    <div class=\"w-object-detail\">\n        <m-include-component></m-include-component>\n    </div>\n\n</m-context>\n",
                styles: [".w-obj-detail-lbl{color:#aeaeae;font-weight:700;border-bottom:1px solid #e9e9e9}"]
            }] }
];
/** @nocollapse */
MetaObjectDetailComponent.ctorParameters = () => [
    { type: Environment }
];
MetaObjectDetailComponent.propDecorators = {
    object: [{ type: Input }],
    operation: [{ type: Input }],
    layout: [{ type: Input }],
    label: [{ type: Input }]
};
if (false) {
    /**
     * Object detail to be rendered
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.object;
    /**
     * For the detail view we always use read only content
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.operation;
    /**
     * Default layout
     *
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.layout;
    /**
     * Rendered object detail can have a section label
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.label;
    /** @type {?} */
    MetaObjectDetailComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLW9iamVjdC1kZXRhaWwvbWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ2xELE1BQU0sZ0NBQWlDLFNBQVEsYUFBYTs7OztJQTRCeEQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7Ozt5QkFmZixNQUFNOzs7OztzQkFPVCxTQUFTO0tBV3pCOzs7O0lBRUQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDeEU7S0FFSjs7O1lBNUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixtVkFBZ0Q7O2FBRW5EOzs7O1lBaENPLFdBQVc7OztxQkF1Q2QsS0FBSzt3QkFNTCxLQUFLO3FCQU9MLEtBQUs7b0JBTUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzU3RyaW5nTWFwfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5cblxuLyoqXG4gKiBKdXN0IGxpa2UgTWV0YUNvbnRlbnRQYWdlIHRoaXMgY29tcG9uZW50cyByZW5kZXJzIG1ldGEgY29udGV4dCBkZXRhaWxzIGJ1dCBlbWJlZGRlZCBhcyBzb21lXG4gKiBpbmxpbmUgY29tcG9uZW50LiBOb3QgYSBwYWdlIHdpdGggcGFnZSBsZXZlbCBidXR0b25zXG4gKlxuICpcbiAqIFRvZG86IFdlIGRvbnQgcmVhbGx5IG5lZWQgdGhpcyBjb21wb25lbnQgd2Ugd2UgaW4gdGhlIGZ1dHVyZSBleHRlbmRzIE1ldGFJbmNsdWRlQ29tcG9uZW50IHRvXG4gKiBzdXBwb3J0IGF3Y29udGVudEVsZW1lbnQ6XG4gKlxuICogYGBgXG4gKiAge1xuICogICAgICBjb21wb25lbnQ6TWV0YUNvbnRleHRDb21wb25lbnQ7XG4gKiAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICBvYmplY3Q6JHZhbHVlO1xuICogICAgICAgICAgbGF5b3V0Okluc3BlY3Q7XG4gKiAgICAgICAgICBvcGVyYXRpb246dmlldztcbiAqICAgICAgICAgIGF3Y29udGVudEVsZW1lbnQ6TWV0YUluY2x1ZGVDb21wb25uZXREaXJlY3RpdmU7XG4gKiAgICAgIH1cbiAqXG4gKiAgfVxuICpcbiAqICBgYGBcbiAqXG4gKiAgVGhpcyB3b3VsZCBpbnN0YW50aWF0ZSByaWdodCBtZXRhIGNvbnRleHQganVzdCBsaWtlIHRoaXMgY2xhc3MuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1jb250ZW50LWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdtZXRhLW9iamVjdC1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhLW9iamVjdC1kZXRhaWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhT2JqZWN0RGV0YWlsQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogT2JqZWN0IGRldGFpbCB0byBiZSByZW5kZXJlZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBGb3IgdGhlIGRldGFpbCB2aWV3IHdlIGFsd2F5cyB1c2UgcmVhZCBvbmx5IGNvbnRlbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9wZXJhdGlvbjogc3RyaW5nID0gJ3ZpZXcnO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBsYXlvdXRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGF5b3V0OiBzdHJpbmcgPSAnSW5zcGVjdCc7XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJlZCBvYmplY3QgZGV0YWlsIGNhbiBoYXZlIGEgc2VjdGlvbiBsYWJlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm9iamVjdCkgfHwgIWlzU3RyaW5nTWFwKHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVuZGVyIHByaW1pdGl2ZSB2YWx1ZXMgYXMgb2JqZWN0IGRldGFpbHMhJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG4iXX0=