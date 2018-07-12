/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { DateAndTimeComponent } from './date-and-time.component';
import { AWStringFieldModule } from '../string/string.module';
var AWDateAndTimeModule = /** @class */ (function () {
    function AWDateAndTimeModule() {
    }
    AWDateAndTimeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DateAndTimeComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CalendarModule,
                        AWStringFieldModule
                    ],
                    entryComponents: [
                        DateAndTimeComponent
                    ],
                    exports: [
                        DateAndTimeComponent,
                        ReactiveFormsModule,
                        FormsModule
                    ]
                },] },
    ];
    return AWDateAndTimeModule;
}());
export { AWDateAndTimeModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1hbmQtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGEtYW5kLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7OztnQkFFM0QsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixvQkFBb0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLG1CQUFtQjtxQkFDdEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLG9CQUFvQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixXQUFXO3FCQUNkO2lCQUNKOzs4QkExQkQ7O1NBMkJhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NhbGVuZGFyTW9kdWxlfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEYXRlQW5kVGltZUNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWFuZC10aW1lLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXU3RyaW5nRmllbGRNb2R1bGV9IGZyb20gJy4uL3N0cmluZy9zdHJpbmcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGF0ZUFuZFRpbWVDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgICAgIEFXU3RyaW5nRmllbGRNb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBEYXRlQW5kVGltZUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRlQW5kVGltZUNvbXBvbmVudCxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFXRGF0ZUFuZFRpbWVNb2R1bGVcbntcbn1cblxuXG4iXX0=