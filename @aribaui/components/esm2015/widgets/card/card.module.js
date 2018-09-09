/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardZoneBottomComponent, CardZoneTopComponent } from './card.component';
import { CardZoneTitleComponent } from './card-title/card-title.component';
export class AWCardModule {
}
AWCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CardComponent,
                    CardZoneTitleComponent,
                    CardZoneTopComponent,
                    CardZoneBottomComponent
                ],
                entryComponents: [
                    CardComponent
                ],
                exports: [
                    CardComponent,
                    CardZoneTitleComponent,
                    CardZoneTopComponent,
                    CardZoneBottomComponent
                ],
                providers: []
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlGLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBd0J6RSxNQUFNOzs7WUFyQkwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDVixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsb0JBQW9CO29CQUNwQix1QkFBdUI7aUJBQzFCO2dCQUNELGVBQWUsRUFBRTtvQkFDYixhQUFhO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsYUFBYTtvQkFDYixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtvQkFDcEIsdUJBQXVCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NhcmRDb21wb25lbnQsIENhcmRab25lQm90dG9tQ29tcG9uZW50LCBDYXJkWm9uZVRvcENvbXBvbmVudH0gZnJvbSAnLi9jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQge0NhcmRab25lVGl0bGVDb21wb25lbnR9IGZyb20gJy4vY2FyZC10aXRsZS9jYXJkLXRpdGxlLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENhcmRDb21wb25lbnQsXG4gICAgICAgIENhcmRab25lVGl0bGVDb21wb25lbnQsXG4gICAgICAgIENhcmRab25lVG9wQ29tcG9uZW50LFxuICAgICAgICBDYXJkWm9uZUJvdHRvbUNvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIENhcmRDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2FyZENvbXBvbmVudCxcbiAgICAgICAgQ2FyZFpvbmVUaXRsZUNvbXBvbmVudCxcbiAgICAgICAgQ2FyZFpvbmVUb3BDb21wb25lbnQsXG4gICAgICAgIENhcmRab25lQm90dG9tQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXQ2FyZE1vZHVsZVxue1xufVxuIl19