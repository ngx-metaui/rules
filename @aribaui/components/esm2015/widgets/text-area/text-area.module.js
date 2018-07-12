/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/primeng';
import { TextAreaComponent } from './text-area.component';
import { AWStringFieldModule } from '../string/string.module';
export class AWTextAreaModule {
}
AWTextAreaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TextAreaComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextareaModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    TextAreaComponent
                ],
                exports: [
                    TextAreaComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3RleHQtYXJlYS90ZXh0LWFyZWEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBd0I1RCxNQUFNOzs7WUF0QkwsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDdEI7Z0JBRUQsZUFBZSxFQUFFO29CQUNiLGlCQUFpQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHRhcmVhTW9kdWxlfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtUZXh0QXJlYUNvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7QVdTdHJpbmdGaWVsZE1vZHVsZX0gZnJvbSAnLi4vc3RyaW5nL3N0cmluZy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUZXh0QXJlYUNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRhcmVhTW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlXG4gICAgXSxcblxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBUZXh0QXJlYUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUZXh0QXJlYUNvbXBvbmVudCxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQVdUZXh0QXJlYU1vZHVsZVxue1xufVxuXG5cbiJdfQ==