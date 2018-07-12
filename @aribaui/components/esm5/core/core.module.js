/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbeddedItemDirective } from './embedded-item';
import { GenericContainerComponent } from './generic-container.component';
import { IncludeComponentDirective } from './include-component.directive';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { ModalComponent } from './modal-service/modal/modal.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { NgForSetDirective } from './on-ngfor-set.directive';
import { InfiniteScrollComponent } from './infite-scroll/infite-scroll.component';
import { AwNameDirective } from './aw-name/aw-name.directive';
var AWCoreComponentModule = /** @class */ (function () {
    function AWCoreComponentModule() {
    }
    AWCoreComponentModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        EmbeddedItemDirective,
                        IncludeComponentDirective,
                        GenericContainerComponent,
                        ErrorMessagesComponent,
                        ModalComponent,
                        CurrencyFormatPipe,
                        NgForSetDirective,
                        InfiniteScrollComponent,
                        AwNameDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    entryComponents: [
                        GenericContainerComponent,
                        ModalComponent
                    ],
                    exports: [
                        EmbeddedItemDirective,
                        IncludeComponentDirective,
                        GenericContainerComponent,
                        ErrorMessagesComponent,
                        ModalComponent,
                        CurrencyFormatPipe,
                        NgForSetDirective,
                        InfiniteScrollComponent,
                        AwNameDirective
                    ]
                },] },
    ];
    return AWCoreComponentModule;
}());
export { AWCoreComponentModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7Ozs7O2dCQUczRCxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLHNCQUFzQjt3QkFDdEIsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixlQUFlO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IseUJBQXlCO3dCQUN6QixjQUFjO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wscUJBQXFCO3dCQUNyQix5QkFBeUI7d0JBQ3pCLHlCQUF5Qjt3QkFDekIsc0JBQXNCO3dCQUN0QixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLGVBQWU7cUJBQ2xCO2lCQUNKOztnQ0EvREQ7O1NBZ0VhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RW1iZWRkZWRJdGVtRGlyZWN0aXZlfSBmcm9tICcuL2VtYmVkZGVkLWl0ZW0nO1xuaW1wb3J0IHtHZW5lcmljQ29udGFpbmVyQ29tcG9uZW50fSBmcm9tICcuL2dlbmVyaWMtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0luY2x1ZGVDb21wb25lbnREaXJlY3RpdmV9IGZyb20gJy4vaW5jbHVkZS1jb21wb25lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7RXJyb3JNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSAnLi9lcnJvci1tZXNzYWdlcy9lcnJvci1tZXNzYWdlcy5jb21wb25lbnQnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi9tb2RhbC1zZXJ2aWNlL21vZGFsL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQge0N1cnJlbmN5Rm9ybWF0UGlwZX0gZnJvbSAnLi9waXBlcy9jdXJyZW5jeS1mb3JtYXQucGlwZSc7XG5pbXBvcnQge05nRm9yU2V0RGlyZWN0aXZlfSBmcm9tICcuL29uLW5nZm9yLXNldC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbmZpbml0ZVNjcm9sbENvbXBvbmVudH0gZnJvbSAnLi9pbmZpdGUtc2Nyb2xsL2luZml0ZS1zY3JvbGwuY29tcG9uZW50JztcbmltcG9ydCB7QXdOYW1lRGlyZWN0aXZlfSBmcm9tICcuL2F3LW5hbWUvYXctbmFtZS5kaXJlY3RpdmUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEVtYmVkZGVkSXRlbURpcmVjdGl2ZSxcbiAgICAgICAgSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSxcbiAgICAgICAgR2VuZXJpY0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgRXJyb3JNZXNzYWdlc0NvbXBvbmVudCxcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEN1cnJlbmN5Rm9ybWF0UGlwZSxcbiAgICAgICAgTmdGb3JTZXREaXJlY3RpdmUsXG4gICAgICAgIEluZmluaXRlU2Nyb2xsQ29tcG9uZW50LFxuICAgICAgICBBd05hbWVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgR2VuZXJpY0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRW1iZWRkZWRJdGVtRGlyZWN0aXZlLFxuICAgICAgICBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLFxuICAgICAgICBHZW5lcmljQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBFcnJvck1lc3NhZ2VzQ29tcG9uZW50LFxuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ3VycmVuY3lGb3JtYXRQaXBlLFxuICAgICAgICBOZ0ZvclNldERpcmVjdGl2ZSxcbiAgICAgICAgSW5maW5pdGVTY3JvbGxDb21wb25lbnQsXG4gICAgICAgIEF3TmFtZURpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQVdDb3JlQ29tcG9uZW50TW9kdWxlXG57XG59XG5cblxuIl19