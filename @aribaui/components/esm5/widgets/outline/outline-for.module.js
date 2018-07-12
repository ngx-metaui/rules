/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InitNestingDirective, OutlineForComponent } from './outline-for.component';
import { AWCoreComponentModule } from '../../core/core.module';
import { OutlineControlComponent } from './outline-control/outline-control.component';
var AWOutlineForModule = /** @class */ (function () {
    function AWOutlineForModule() {
    }
    AWOutlineForModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        OutlineForComponent,
                        OutlineControlComponent,
                        InitNestingDirective
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AWCoreComponentModule
                    ],
                    exports: [
                        OutlineForComponent,
                        OutlineControlComponent,
                        ReactiveFormsModule,
                        FormsModule
                    ],
                    providers: []
                },] },
    ];
    return AWOutlineForModule;
}());
export { AWOutlineForModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFFLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDbEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sNkNBQTZDLENBQUM7Ozs7O2dCQUVuRixRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixvQkFBb0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQixXQUFXO3FCQUNkO29CQUNELFNBQVMsRUFBRSxFQUFFO2lCQUNoQjs7NkJBOUNEOztTQStDYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luaXROZXN0aW5nRGlyZWN0aXZlLCBPdXRsaW5lRm9yQ29tcG9uZW50fSBmcm9tICcuL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQge091dGxpbmVDb250cm9sQ29tcG9uZW50fSBmcm9tICcuL291dGxpbmUtY29udHJvbC9vdXRsaW5lLWNvbnRyb2wuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3V0bGluZUZvckNvbXBvbmVudCxcbiAgICAgICAgT3V0bGluZUNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgIEluaXROZXN0aW5nRGlyZWN0aXZlXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBPdXRsaW5lRm9yQ29tcG9uZW50LFxuICAgICAgICBPdXRsaW5lQ29udHJvbENvbXBvbmVudCxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQVdPdXRsaW5lRm9yTW9kdWxlXG57XG59XG5cblxuIl19