/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonListComponent } from './radio-button-list.component';
import { AWRadioButtonModule } from '../radio-button/radio-button.module';
var AWRadioButtonListModule = /** @class */ (function () {
    function AWRadioButtonListModule() {
    }
    AWRadioButtonListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        RadioButtonListComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AWRadioButtonModule
                    ],
                    entryComponents: [
                        RadioButtonListComponent
                    ],
                    exports: [
                        RadioButtonListComponent,
                        ReactiveFormsModule,
                        FormsModule
                    ],
                    providers: []
                },] },
    ];
    return AWRadioButtonListModule;
}());
export { AWRadioButtonListModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW8tYnV0dG9uLWxpc3QvcmFkaW8tYnV0dG9uLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOzs7OztnQkFHdkUsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVix3QkFBd0I7cUJBQzNCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixtQkFBbUI7cUJBQ3RCO29CQUNELGVBQWUsRUFBRTt3QkFDYix3QkFBd0I7cUJBQzNCO29CQUNELE9BQU8sRUFBRTt3QkFDTCx3QkFBd0I7d0JBQ3hCLG1CQUFtQjt3QkFDbkIsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O2tDQTlDRDs7U0ErQ2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtSYWRpb0J1dHRvbkxpc3RDb21wb25lbnR9IGZyb20gJy4vcmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbk1vZHVsZX0gZnJvbSAnLi4vcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5tb2R1bGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgUmFkaW9CdXR0b25MaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGVcbntcbn1cblxuXG4iXX0=