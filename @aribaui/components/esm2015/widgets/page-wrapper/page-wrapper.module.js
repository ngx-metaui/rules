/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLifeCycleService } from './page-lifecycle.service';
import { ObjectPageWrapperComponent } from './object-page-wrapper/object-page-wrapper.component';
import { PageActionsComponent } from './page-actions/page-actions.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AWStepperModule } from '../stepper/stepper.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AWCoreComponentModule } from '../../core/core.module';
import { AWPageNotificationModule } from '../page-notification/page-notification.module';
import { RouterModule } from '@angular/router';
export class AWPageWrapperModule {
}
AWPageWrapperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ObjectPageWrapperComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageFooterComponent,
                    PageHeaderComponent,
                    SidenavComponent
                ],
                imports: [
                    CommonModule,
                    RouterModule,
                    AWCoreComponentModule,
                    AWStepperModule,
                    AWPageNotificationModule
                ],
                entryComponents: [
                    PageFooterComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageHeaderComponent
                ],
                exports: [
                    ObjectPageWrapperComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageFooterComponent,
                    PageHeaderComponent,
                    SidenavComponent
                ],
                providers: [PageLifeCycleService]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS13cmFwcGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLXdyYXBwZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQW1DN0MsTUFBTTs7O1lBakNMLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO29CQUMxQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLGdCQUFnQjtpQkFFbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2Ysd0JBQXdCO2lCQUMzQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsbUJBQW1CO29CQUNuQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsbUJBQW1CO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsMEJBQTBCO29CQUMxQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1BhZ2VMaWZlQ3ljbGVTZXJ2aWNlfSBmcm9tICcuL3BhZ2UtbGlmZWN5Y2xlLnNlcnZpY2UnO1xuaW1wb3J0IHtPYmplY3RQYWdlV3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi9vYmplY3QtcGFnZS13cmFwcGVyL29iamVjdC1wYWdlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUFjdGlvbnNDb21wb25lbnR9IGZyb20gJy4vcGFnZS1hY3Rpb25zL3BhZ2UtYWN0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHtQYWdlQ29udGVudENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWNvbnRlbnQvcGFnZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQge1BhZ2VGb290ZXJDb21wb25lbnR9IGZyb20gJy4vcGFnZS1mb290ZXIvcGFnZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUhlYWRlckNvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtBV1N0ZXBwZXJNb2R1bGV9IGZyb20gJy4uL3N0ZXBwZXIvc3RlcHBlci5tb2R1bGUnO1xuaW1wb3J0IHtTaWRlbmF2Q29tcG9uZW50fSBmcm9tICcuL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0NvcmVDb21wb25lbnRNb2R1bGV9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGV9IGZyb20gJy4uL3BhZ2Utbm90aWZpY2F0aW9uL3BhZ2Utbm90aWZpY2F0aW9uLm1vZHVsZSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT2JqZWN0UGFnZVdyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VBY3Rpb25zQ29tcG9uZW50LFxuICAgICAgICBQYWdlQ29udGVudENvbXBvbmVudCxcbiAgICAgICAgUGFnZUZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgU2lkZW5hdkNvbXBvbmVudFxuXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGUsXG4gICAgICAgIEFXU3RlcHBlck1vZHVsZSxcbiAgICAgICAgQVdQYWdlTm90aWZpY2F0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgUGFnZUZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUFjdGlvbnNDb21wb25lbnQsXG4gICAgICAgIFBhZ2VDb250ZW50Q29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE9iamVjdFBhZ2VXcmFwcGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlQWN0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgUGFnZUNvbnRlbnRDb21wb25lbnQsXG4gICAgICAgIFBhZ2VGb290ZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIFNpZGVuYXZDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1BhZ2VMaWZlQ3ljbGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBBV1BhZ2VXcmFwcGVyTW9kdWxlXG57XG59XG5cblxuIl19