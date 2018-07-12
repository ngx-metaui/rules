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
export class AWOutlineForModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS1mb3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFFLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDbEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFzQnBGLE1BQU07OztZQXBCTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2QixvQkFBb0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbml0TmVzdGluZ0RpcmVjdGl2ZSwgT3V0bGluZUZvckNvbXBvbmVudH0gZnJvbSAnLi9vdXRsaW5lLWZvci5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0NvcmVDb21wb25lbnRNb2R1bGV9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtPdXRsaW5lQ29udHJvbENvbXBvbmVudH0gZnJvbSAnLi9vdXRsaW5lLWNvbnRyb2wvb3V0bGluZS1jb250cm9sLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE91dGxpbmVGb3JDb21wb25lbnQsXG4gICAgICAgIE91dGxpbmVDb250cm9sQ29tcG9uZW50LFxuICAgICAgICBJbml0TmVzdGluZ0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3V0bGluZUZvckNvbXBvbmVudCxcbiAgICAgICAgT3V0bGluZUNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXT3V0bGluZUZvck1vZHVsZVxue1xufVxuXG5cbiJdfQ==