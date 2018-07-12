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
var AWGenericChooserModule = /** @class */ (function () {
    function AWGenericChooserModule() {
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
    return AWGenericChooserModule;
}());
export { AWGenericChooserModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jaG9vc2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2dlbmVyaWMtY2hvb3Nlci9nZW5lcmljLWNob29zZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUN0RixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Z0JBRzVELFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsdUJBQXVCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsZUFBZTt3QkFDZix1QkFBdUI7cUJBQzFCO29CQUNELGVBQWUsRUFBRTt3QkFDYix1QkFBdUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLFdBQVc7d0JBQ1gsdUJBQXVCO3FCQUMxQjtpQkFDSjs7aUNBckREOztTQXNEYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQge0dlbmVyaWNDaG9vc2VyQ29tcG9uZW50fSBmcm9tICcuL2dlbmVyaWMtY2hvb3Nlci5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0NoZWNrQm94TGlzdE1vZHVsZX0gZnJvbSAnLi4vY2hlY2stYm94LWxpc3QvY2hlY2stYm94LWxpc3QubW9kdWxlJztcbmltcG9ydCB7QVdDaG9vc2VyTW9kdWxlfSBmcm9tICcuLi9jaG9vc2VyL2Nob29zZXIubW9kdWxlJztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbkxpc3RNb2R1bGV9IGZyb20gJy4uL3JhZGlvLWJ1dHRvbi1saXN0L3JhZGlvLWJ1dHRvbi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4uL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgR2VuZXJpY0Nob29zZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0Ryb3Bkb3duTW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TGlzdE1vZHVsZSxcbiAgICAgICAgQVdDaG9vc2VyTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTGlzdE1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIEdlbmVyaWNDaG9vc2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBHZW5lcmljQ2hvb3NlckNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQVdHZW5lcmljQ2hvb3Nlck1vZHVsZVxue1xufVxuXG5cbiJdfQ==