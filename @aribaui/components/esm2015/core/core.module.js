/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
export class AWCoreComponentModule {
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFrQzVELE1BQU07OztZQS9CTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLHNCQUFzQjtvQkFDdEIsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixlQUFlO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IseUJBQXlCO29CQUN6QixjQUFjO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wscUJBQXFCO29CQUNyQix5QkFBeUI7b0JBQ3pCLHlCQUF5QjtvQkFDekIsc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLGVBQWU7aUJBQ2xCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0VtYmVkZGVkSXRlbURpcmVjdGl2ZX0gZnJvbSAnLi9lbWJlZGRlZC1pdGVtJztcbmltcG9ydCB7R2VuZXJpY0NvbnRhaW5lckNvbXBvbmVudH0gZnJvbSAnLi9nZW5lcmljLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHtJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlfSBmcm9tICcuL2luY2x1ZGUtY29tcG9uZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQge0Vycm9yTWVzc2FnZXNDb21wb25lbnR9IGZyb20gJy4vZXJyb3ItbWVzc2FnZXMvZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50JztcbmltcG9ydCB7TW9kYWxDb21wb25lbnR9IGZyb20gJy4vbW9kYWwtc2VydmljZS9tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHtDdXJyZW5jeUZvcm1hdFBpcGV9IGZyb20gJy4vcGlwZXMvY3VycmVuY3ktZm9ybWF0LnBpcGUnO1xuaW1wb3J0IHtOZ0ZvclNldERpcmVjdGl2ZX0gZnJvbSAnLi9vbi1uZ2Zvci1zZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7SW5maW5pdGVTY3JvbGxDb21wb25lbnR9IGZyb20gJy4vaW5maXRlLXNjcm9sbC9pbmZpdGUtc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQge0F3TmFtZURpcmVjdGl2ZX0gZnJvbSAnLi9hdy1uYW1lL2F3LW5hbWUuZGlyZWN0aXZlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBFbWJlZGRlZEl0ZW1EaXJlY3RpdmUsXG4gICAgICAgIEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUsXG4gICAgICAgIEdlbmVyaWNDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIEVycm9yTWVzc2FnZXNDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBDdXJyZW5jeUZvcm1hdFBpcGUsXG4gICAgICAgIE5nRm9yU2V0RGlyZWN0aXZlLFxuICAgICAgICBJbmZpbml0ZVNjcm9sbENvbXBvbmVudCxcbiAgICAgICAgQXdOYW1lRGlyZWN0aXZlXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIEdlbmVyaWNDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEVtYmVkZGVkSXRlbURpcmVjdGl2ZSxcbiAgICAgICAgSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSxcbiAgICAgICAgR2VuZXJpY0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgRXJyb3JNZXNzYWdlc0NvbXBvbmVudCxcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEN1cnJlbmN5Rm9ybWF0UGlwZSxcbiAgICAgICAgTmdGb3JTZXREaXJlY3RpdmUsXG4gICAgICAgIEluZmluaXRlU2Nyb2xsQ29tcG9uZW50LFxuICAgICAgICBBd05hbWVEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFXQ29yZUNvbXBvbmVudE1vZHVsZVxue1xufVxuXG5cbiJdfQ==