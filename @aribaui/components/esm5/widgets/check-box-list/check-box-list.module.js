/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxListComponent } from '../check-box-list/check-box-list.component';
import { AWCheckBoxModule } from '../checkbox/check-box.module';
var AWCheckBoxListModule = /** @class */ (function () {
    function AWCheckBoxListModule() {
    }
    AWCheckBoxListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CheckBoxListComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AWCheckBoxModule
                    ],
                    exports: [
                        CheckBoxListComponent
                    ],
                    providers: []
                },] },
    ];
    return AWCheckBoxListModule;
}());
export { AWCheckBoxListModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stYm94LWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY2hlY2stYm94LWxpc3QvY2hlY2stYm94LWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7OztnQkFHN0QsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixnQkFBZ0I7cUJBQ25CO29CQUdELE9BQU8sRUFBRTt3QkFDTCxxQkFBcUI7cUJBQ3hCO29CQUNELFNBQVMsRUFBRSxFQUFFO2lCQUNoQjs7K0JBM0NEOztTQTRDYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NoZWNrQm94TGlzdENvbXBvbmVudH0gZnJvbSAnLi4vY2hlY2stYm94LWxpc3QvY2hlY2stYm94LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7QVdDaGVja0JveE1vZHVsZX0gZnJvbSAnLi4vY2hlY2tib3gvY2hlY2stYm94Lm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2hlY2tCb3hMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hNb2R1bGVcbiAgICBdLFxuXG5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENoZWNrQm94TGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0NoZWNrQm94TGlzdE1vZHVsZVxue1xufVxuXG5cbiJdfQ==