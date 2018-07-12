/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AWCoreComponentModule } from '../../core/core.module';
import { OverlayComponent } from './overlay.component';
import { OverlayPanelModule } from 'primeng/primeng';
var AWOverlayModule = /** @class */ (function () {
    function AWOverlayModule() {
    }
    AWOverlayModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        OverlayComponent
                    ],
                    imports: [
                        CommonModule,
                        AWCoreComponentModule,
                        OverlayPanelModule
                    ],
                    entryComponents: [
                        OverlayComponent
                    ],
                    exports: [
                        OverlayComponent,
                        AWCoreComponentModule
                    ],
                    providers: []
                },] },
    ];
    return AWOverlayModule;
}());
export { AWOverlayModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9vdmVybGF5L292ZXJsYXkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7O2dCQUVsRCxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGdCQUFnQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1oscUJBQXFCO3dCQUNyQixrQkFBa0I7cUJBQ3JCO29CQUNELGVBQWUsRUFBRTt3QkFDYixnQkFBZ0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDTCxnQkFBZ0I7d0JBQ2hCLHFCQUFxQjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2hCOzswQkEzQ0Q7O1NBNENhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQge092ZXJsYXlDb21wb25lbnR9IGZyb20gJy4vb3ZlcmxheS5jb21wb25lbnQnO1xuaW1wb3J0IHtPdmVybGF5UGFuZWxNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE92ZXJsYXlDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGUsXG4gICAgICAgIE92ZXJsYXlQYW5lbE1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE92ZXJsYXlDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3ZlcmxheUNvbXBvbmVudCxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXT3ZlcmxheU1vZHVsZVxue1xufVxuIl19