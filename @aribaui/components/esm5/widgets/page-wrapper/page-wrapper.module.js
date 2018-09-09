/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
var AWPageWrapperModule = /** @class */ (function () {
    function AWPageWrapperModule() {
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
                },] }
    ];
    return AWPageWrapperModule;
}());
export { AWPageWrapperModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS13cmFwcGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLXdyYXBwZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Z0JBRTVDLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsMEJBQTBCO3dCQUMxQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLGdCQUFnQjtxQkFFbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2Ysd0JBQXdCO3FCQUMzQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsMEJBQTBCO3dCQUMxQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLGdCQUFnQjtxQkFDbkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ3BDOzs4QkFsRUQ7O1NBbUVhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UGFnZUxpZmVDeWNsZVNlcnZpY2V9IGZyb20gJy4vcGFnZS1saWZlY3ljbGUuc2VydmljZSc7XG5pbXBvcnQge09iamVjdFBhZ2VXcmFwcGVyQ29tcG9uZW50fSBmcm9tICcuL29iamVjdC1wYWdlLXdyYXBwZXIvb2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHtQYWdlQWN0aW9uc0NvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWFjdGlvbnMvcGFnZS1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQge1BhZ2VDb250ZW50Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtY29udGVudC9wYWdlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUZvb3RlckNvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWZvb3Rlci9wYWdlLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHtQYWdlSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXU3RlcHBlck1vZHVsZX0gZnJvbSAnLi4vc3RlcHBlci9zdGVwcGVyLm1vZHVsZSc7XG5pbXBvcnQge1NpZGVuYXZDb21wb25lbnR9IGZyb20gJy4vc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQge0FXUGFnZU5vdGlmaWNhdGlvbk1vZHVsZX0gZnJvbSAnLi4vcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBPYmplY3RQYWdlV3JhcHBlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUFjdGlvbnNDb21wb25lbnQsXG4gICAgICAgIFBhZ2VDb250ZW50Q29tcG9uZW50LFxuICAgICAgICBQYWdlRm9vdGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBTaWRlbmF2Q29tcG9uZW50XG5cbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgQVdTdGVwcGVyTW9kdWxlLFxuICAgICAgICBBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBQYWdlRm9vdGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlQWN0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgUGFnZUNvbnRlbnRDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT2JqZWN0UGFnZVdyYXBwZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VBY3Rpb25zQ29tcG9uZW50LFxuICAgICAgICBQYWdlQ29udGVudENvbXBvbmVudCxcbiAgICAgICAgUGFnZUZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgU2lkZW5hdkNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbUGFnZUxpZmVDeWNsZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFXUGFnZVdyYXBwZXJNb2R1bGVcbntcbn1cblxuXG4iXX0=