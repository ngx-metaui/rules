/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicNavigatorComponent } from './basic-navigator.component';
import { ToolbarModule } from 'primeng/primeng';
import { AWButtonModule } from '../button/button.module';
import { AWCoreComponentModule } from '../../core/core.module';
var AWBasicNavigatorModule = /** @class */ (function () {
    function AWBasicNavigatorModule() {
    }
    AWBasicNavigatorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        BasicNavigatorComponent
                    ],
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        AWButtonModule,
                        AWCoreComponentModule
                    ],
                    exports: [
                        BasicNavigatorComponent
                    ],
                    providers: []
                },] },
    ];
    return AWBasicNavigatorModule;
}());
export { AWBasicNavigatorModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Jhc2ljLW5hdmlnYXRvci9iYXNpYy1uYXZpZ2F0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Z0JBRzVELFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsdUJBQXVCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QscUJBQXFCO3FCQUV4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsdUJBQXVCO3FCQUMxQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O2lDQTNDRDs7U0E0Q2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCYXNpY05hdmlnYXRvckNvbXBvbmVudH0gZnJvbSAnLi9iYXNpYy1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7VG9vbGJhck1vZHVsZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7QVdCdXR0b25Nb2R1bGV9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCYXNpY05hdmlnYXRvckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRvb2xiYXJNb2R1bGUsXG4gICAgICAgIEFXQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGVcblxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCYXNpY05hdmlnYXRvckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlXG57XG59XG5cblxuIl19