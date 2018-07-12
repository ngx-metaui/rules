/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
var AWConfirmationModule = /** @class */ (function () {
    function AWConfirmationModule() {
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
                },] },
    ];
    return AWConfirmationModule;
}());
export { AWConfirmationModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7Ozs7O2dCQUV0RCxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIsMkJBQTJCO3dCQUMzQiwyQkFBMkI7cUJBQzlCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxjQUFjO3FCQUNqQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFDM0IsMkJBQTJCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLDJCQUEyQjtxQkFDOUI7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2hCOzsrQkF0REQ7O1NBdURhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7Q29uZmlybWF0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tb2RhbC1zZXJ2aWNlL21vZGFsL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXRGlhbG9nTW9kdWxlfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQge0FXQnV0dG9uTW9kdWxlfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENvbmZpcm1hdGlvbkNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGUsXG4gICAgICAgIEFXRGlhbG9nTW9kdWxlLFxuICAgICAgICBBV0J1dHRvbk1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBDb25maXJtYXRpb25Db21wb25lbnQsXG4gICAgICAgIENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENvbmZpcm1hdGlvbkNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQVdDb25maXJtYXRpb25Nb2R1bGVcbntcbn1cblxuXG4iXX0=