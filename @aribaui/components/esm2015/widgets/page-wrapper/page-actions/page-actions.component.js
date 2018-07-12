/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 * Page actions is a wrapper for all page actions, buttons, links, menus that interacts it with the
 * page. The wrapper use the ability to position it as needed.
 */
export class PageActionsComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
}
PageActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-actions',
                template: `<div class="page-actions">
    <ng-content></ng-content>
</div>
`,
                styles: [`.page-actions{text-align:right;padding-top:0;padding-right:0}`]
            },] },
];
/** @nocollapse */
PageActionsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
function PageActionsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageActionsComponent.prototype.element;
    /** @type {?} */
    PageActionsComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLWFjdGlvbnMvcGFnZS1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7OztBQWMzRCxNQUFNLDJCQUE0QixTQUFRLGFBQWE7Ozs7O0lBR25ELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7S0FHakU7OztZQWRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7OztDQUdiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLCtEQUErRCxDQUFDO2FBQzVFOzs7O1lBZmtCLFVBQVU7WUFDckIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIFBhZ2UgYWN0aW9ucyBpcyBhIHdyYXBwZXIgZm9yIGFsbCBwYWdlIGFjdGlvbnMsIGJ1dHRvbnMsIGxpbmtzLCBtZW51cyB0aGF0IGludGVyYWN0cyBpdCB3aXRoIHRoZVxuICogcGFnZS4gVGhlIHdyYXBwZXIgdXNlIHRoZSBhYmlsaXR5IHRvIHBvc2l0aW9uIGl0IGFzIG5lZWRlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1wYWdlLWFjdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtYWN0aW9uc1wiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnBhZ2UtYWN0aW9uc3t0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmctdG9wOjA7cGFkZGluZy1yaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VBY3Rpb25zQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG59XG4iXX0=