/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AWCoreComponentModule } from '../../core/core.module';
import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogFooterComponent } from './dialog-footer.component';
import { ModalComponent } from '../../core/modal-service/modal/modal.component';
import { DialogModule } from 'primeng/primeng';
var AWDialogModule = /** @class */ (function () {
    function AWDialogModule() {
    }
    AWDialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DialogComponent,
                        DialogHeaderComponent,
                        DialogFooterComponent
                    ],
                    imports: [
                        CommonModule,
                        AWCoreComponentModule,
                        DialogModule
                    ],
                    entryComponents: [
                        ModalComponent,
                        DialogComponent,
                        DialogHeaderComponent,
                        DialogFooterComponent
                    ],
                    exports: [
                        DialogComponent,
                        DialogHeaderComponent,
                        DialogFooterComponent,
                        AWCoreComponentModule
                    ],
                    providers: []
                },] },
    ];
    return AWDialogModule;
}());
export { AWDialogModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RpYWxvZy9kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7O2dCQUU1QyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIsWUFBWTtxQkFDZjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIscUJBQXFCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O3lCQXJERDs7U0FzRGEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7RGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL2RpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHtEaWFsb2dIZWFkZXJDb21wb25lbnR9IGZyb20gJy4vZGlhbG9nLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEaWFsb2dGb290ZXJDb21wb25lbnR9IGZyb20gJy4vZGlhbG9nLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHtNb2RhbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tb2RhbC1zZXJ2aWNlL21vZGFsL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQge0RpYWxvZ01vZHVsZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBEaWFsb2dIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIERpYWxvZ0Zvb3RlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgRGlhbG9nTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIERpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgRGlhbG9nSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBEaWFsb2dGb290ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBEaWFsb2dIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIERpYWxvZ0Zvb3RlckNvbXBvbmVudCxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXRGlhbG9nTW9kdWxlXG57XG59XG5cblxuIl19