/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AWCoreComponentModule } from '../../core/core.module';
import { GenericChooserComponent } from './generic-chooser.component';
import { AWCheckBoxListModule } from '../check-box-list/check-box-list.module';
import { AWChooserModule } from '../chooser/chooser.module';
import { AWRadioButtonListModule } from '../radio-button-list/radio-button-list.module';
import { AWDropdownModule } from '../dropdown/dropdown.module';
export class AWGenericChooserModule {
}
AWGenericChooserModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GenericChooserComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWCoreComponentModule,
                    AWDropdownModule,
                    AWCheckBoxListModule,
                    AWChooserModule,
                    AWRadioButtonListModule
                ],
                entryComponents: [
                    GenericChooserComponent
                ],
                exports: [
                    ReactiveFormsModule,
                    FormsModule,
                    GenericChooserComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jaG9vc2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2dlbmVyaWMtY2hvb3Nlci9nZW5lcmljLWNob29zZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUN0RixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQTBCN0QsTUFBTTs7O1lBdkJMLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsdUJBQXVCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZix1QkFBdUI7aUJBQzFCO2dCQUNELGVBQWUsRUFBRTtvQkFDYix1QkFBdUI7aUJBQzFCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLFdBQVc7b0JBQ1gsdUJBQXVCO2lCQUMxQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBV0NvcmVDb21wb25lbnRNb2R1bGV9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtHZW5lcmljQ2hvb3NlckNvbXBvbmVudH0gZnJvbSAnLi9nZW5lcmljLWNob29zZXIuY29tcG9uZW50JztcbmltcG9ydCB7QVdDaGVja0JveExpc3RNb2R1bGV9IGZyb20gJy4uL2NoZWNrLWJveC1saXN0L2NoZWNrLWJveC1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2hvb3Nlck1vZHVsZX0gZnJvbSAnLi4vY2hvb3Nlci9jaG9vc2VyLm1vZHVsZSc7XG5pbXBvcnQge0FXUmFkaW9CdXR0b25MaXN0TW9kdWxlfSBmcm9tICcuLi9yYWRpby1idXR0b24tbGlzdC9yYWRpby1idXR0b24tbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtBV0Ryb3Bkb3duTW9kdWxlfSBmcm9tICcuLi9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEdlbmVyaWNDaG9vc2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgQVdEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveExpc3RNb2R1bGUsXG4gICAgICAgIEFXQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBHZW5lcmljQ2hvb3NlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgR2VuZXJpY0Nob29zZXJDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFXR2VuZXJpY0Nob29zZXJNb2R1bGVcbntcbn1cblxuXG4iXX0=