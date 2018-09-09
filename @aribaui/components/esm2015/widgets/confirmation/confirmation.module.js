/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AWCoreComponentModule } from '../../core/core.module';
import { ConfirmationComponent } from './confirmation.component';
import { ConfirmationHeaderComponent } from './confirmation-header.component';
import { ConfirmationFooterComponent } from './confirmation-footer.component';
import { ModalComponent } from '../../core/modal-service/modal/modal.component';
import { AWDialogModule } from '../dialog/dialog.module';
import { AWButtonModule } from '../button/button.module';
export class AWConfirmationModule {
}
AWConfirmationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                imports: [
                    CommonModule,
                    AWCoreComponentModule,
                    AWDialogModule,
                    AWButtonModule
                ],
                entryComponents: [
                    ModalComponent,
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                exports: [
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                providers: []
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUEyQnZELE1BQU07OztZQXpCTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQiwyQkFBMkI7aUJBQzlCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxjQUFjO2lCQUNqQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBQzNCLDJCQUEyQjtpQkFDOUI7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7YUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQge0NvbmZpcm1hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi9jb25maXJtYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7Q29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7Q29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7TW9kYWxDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0RpYWxvZ01vZHVsZX0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHtBV0J1dHRvbk1vZHVsZX0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb25maXJtYXRpb25Db21wb25lbnQsXG4gICAgICAgIENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0RpYWxvZ01vZHVsZSxcbiAgICAgICAgQVdCdXR0b25Nb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uQ29tcG9uZW50LFxuICAgICAgICBDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnQsXG4gICAgICAgIENvbmZpcm1hdGlvbkZvb3RlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBDb25maXJtYXRpb25Db21wb25lbnQsXG4gICAgICAgIENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXQ29uZmlybWF0aW9uTW9kdWxlXG57XG59XG5cblxuIl19