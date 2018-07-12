/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';
import { AWStringFieldModule } from '../string/string.module';
var AWInputFieldModule = /** @class */ (function () {
    function AWInputFieldModule() {
    }
    AWInputFieldModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        InputFieldComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        InputTextModule,
                        AWStringFieldModule
                    ],
                    entryComponents: [
                        InputFieldComponent
                    ],
                    exports: [
                        InputFieldComponent,
                        AWStringFieldModule,
                        ReactiveFormsModule,
                        FormsModule
                    ],
                    providers: []
                },] },
    ];
    return AWInputFieldModule;
}());
export { AWInputFieldModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Z0JBRTNELFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3RCO29CQUNELGVBQWUsRUFBRTt3QkFDYixtQkFBbUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixXQUFXO3FCQUNkO29CQUNELFNBQVMsRUFBRSxFQUFFO2lCQUNoQjs7NkJBaEREOztTQWlEYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuLi9pbnB1dC1maWVsZC9pbnB1dC1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIElucHV0RmllbGRDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgSW5wdXRGaWVsZENvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0lucHV0RmllbGRNb2R1bGVcbntcbn1cblxuXG4iXX0=