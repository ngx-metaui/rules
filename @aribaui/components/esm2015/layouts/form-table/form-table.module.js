/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormTableComponent } from './form-table.component';
import { FormRowComponent } from './form-row/form-row.component';
import { BottomZoneComponent, LeftZoneComponent, MiddleZoneComponent, RightZoneComponent, TopZoneComponent } from '../five-zone-layout.component';
import { AWCoreComponentModule } from '../../core/core.module';
export class AWFormTableModule {
}
AWFormTableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ],
                exports: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNuQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBdUM3RCxNQUFNOzs7WUFwQ0wsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixrQkFBa0I7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLHFCQUFxQjtpQkFDeEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLGtCQUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGtCQUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDdEI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lucHV0VGV4dE1vZHVsZX0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1UYWJsZUNvbXBvbmVudH0gZnJvbSAnLi9mb3JtLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4vZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgQm90dG9tWm9uZUNvbXBvbmVudCxcbiAgICBMZWZ0Wm9uZUNvbXBvbmVudCxcbiAgICBNaWRkbGVab25lQ29tcG9uZW50LFxuICAgIFJpZ2h0Wm9uZUNvbXBvbmVudCxcbiAgICBUb3Bab25lQ29tcG9uZW50XG59IGZyb20gJy4uL2ZpdmUtem9uZS1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGb3JtVGFibGVDb21wb25lbnQsXG4gICAgICAgIEZvcm1Sb3dDb21wb25lbnQsXG4gICAgICAgIFRvcFpvbmVDb21wb25lbnQsXG4gICAgICAgIExlZnRab25lQ29tcG9uZW50LFxuICAgICAgICBSaWdodFpvbmVDb21wb25lbnQsXG4gICAgICAgIE1pZGRsZVpvbmVDb21wb25lbnQsXG4gICAgICAgIEJvdHRvbVpvbmVDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBGb3JtVGFibGVDb21wb25lbnQsXG4gICAgICAgIEZvcm1Sb3dDb21wb25lbnQsXG4gICAgICAgIFRvcFpvbmVDb21wb25lbnQsXG4gICAgICAgIExlZnRab25lQ29tcG9uZW50LFxuICAgICAgICBSaWdodFpvbmVDb21wb25lbnQsXG4gICAgICAgIE1pZGRsZVpvbmVDb21wb25lbnQsXG4gICAgICAgIEJvdHRvbVpvbmVDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRm9ybVRhYmxlQ29tcG9uZW50LFxuICAgICAgICBGb3JtUm93Q29tcG9uZW50LFxuICAgICAgICBUb3Bab25lQ29tcG9uZW50LFxuICAgICAgICBMZWZ0Wm9uZUNvbXBvbmVudCxcbiAgICAgICAgUmlnaHRab25lQ29tcG9uZW50LFxuICAgICAgICBNaWRkbGVab25lQ29tcG9uZW50LFxuICAgICAgICBCb3R0b21ab25lQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBV0Zvcm1UYWJsZU1vZHVsZVxue1xufVxuXG5cbiJdfQ==