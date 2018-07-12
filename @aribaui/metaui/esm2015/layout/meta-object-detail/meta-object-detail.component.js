/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<m-context [pushNewContext]="true" [object]="object" [operation]="operation"
           [layout]="layout" group="ObjectDetail">

    <div class="w-object-detail">
        <m-include-component></m-include-component>
    </div>

</m-context>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
MetaObjectDetailComponent.ctorParameters = () => [
    { type: Environment }
];
MetaObjectDetailComponent.propDecorators = {
    object: [{ type: Input }],
    operation: [{ type: Input }],
    layout: [{ type: Input }]
};
function MetaObjectDetailComponent_tsickle_Closure_declarations() {
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
    /** @type {?} */
    MetaObjectDetailComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLW9iamVjdC1kZXRhaWwvbWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q2xELE1BQU0sZ0NBQWlDLFNBQVEsYUFBYTs7OztJQXNCeEQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7Ozt5QkFUZixNQUFNOzs7OztzQkFPVCxTQUFTO0tBS3pCOzs7O0lBRUQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDeEU7S0FFSjs7O1lBOUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7O0NBUWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2Y7Ozs7WUF4Q08sV0FBVzs7O3FCQStDZCxLQUFLO3dCQU1MLEtBQUs7cUJBT0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzU3RyaW5nTWFwfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5cblxuLyoqXG4gKiBKdXN0IGxpa2UgTWV0YUNvbnRlbnRQYWdlIHRoaXMgY29tcG9uZW50cyByZW5kZXJzIG1ldGEgY29udGV4dCBkZXRhaWxzIGJ1dCBlbWJlZGRlZCBhcyBzb21lXG4gKiBpbmxpbmUgY29tcG9uZW50LiBOb3QgYSBwYWdlIHdpdGggcGFnZSBsZXZlbCBidXR0b25zXG4gKlxuICpcbiAqIFRvZG86IFdlIGRvbnQgcmVhbGx5IG5lZWQgdGhpcyBjb21wb25lbnQgd2Ugd2UgaW4gdGhlIGZ1dHVyZSBleHRlbmRzIE1ldGFJbmNsdWRlQ29tcG9uZW50IHRvXG4gKiBzdXBwb3J0IGF3Y29udGVudEVsZW1lbnQ6XG4gKlxuICogYGBgXG4gKiAge1xuICogICAgICBjb21wb25lbnQ6TWV0YUNvbnRleHRDb21wb25lbnQ7XG4gKiAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICBvYmplY3Q6JHZhbHVlO1xuICogICAgICAgICAgbGF5b3V0Okluc3BlY3Q7XG4gKiAgICAgICAgICBvcGVyYXRpb246dmlldztcbiAqICAgICAgICAgIGF3Y29udGVudEVsZW1lbnQ6TWV0YUluY2x1ZGVDb21wb25uZXREaXJlY3RpdmU7XG4gKiAgICAgIH1cbiAqXG4gKiAgfVxuICpcbiAqICBgYGBcbiAqXG4gKiAgVGhpcyB3b3VsZCBpbnN0YW50aWF0ZSByaWdodCBtZXRhIGNvbnRleHQganVzdCBsaWtlIHRoaXMgY2xhc3MuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1jb250ZW50LWRldGFpbCcsXG4gICAgdGVtcGxhdGU6IGA8bS1jb250ZXh0IFtwdXNoTmV3Q29udGV4dF09XCJ0cnVlXCIgW29iamVjdF09XCJvYmplY3RcIiBbb3BlcmF0aW9uXT1cIm9wZXJhdGlvblwiXG4gICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0XCIgZ3JvdXA9XCJPYmplY3REZXRhaWxcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ3LW9iamVjdC1kZXRhaWxcIj5cbiAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICAgIDwvZGl2PlxuXG48L20tY29udGV4dD5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFPYmplY3REZXRhaWxDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBPYmplY3QgZGV0YWlsIHRvIGJlIHJlbmRlcmVkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3Q6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEZvciB0aGUgZGV0YWlsIHZpZXcgd2UgYWx3YXlzIHVzZSByZWFkIG9ubHkgY29udGVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3BlcmF0aW9uOiBzdHJpbmcgPSAndmlldyc7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGxheW91dFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYXlvdXQ6IHN0cmluZyA9ICdJbnNwZWN0JztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm9iamVjdCkgfHwgIWlzU3RyaW5nTWFwKHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVuZGVyIHByaW1pdGl2ZSB2YWx1ZXMgYXMgb2JqZWN0IGRldGFpbHMhJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG4iXX0=