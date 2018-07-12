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
var AWFormTableModule = /** @class */ (function () {
    function AWFormTableModule() {
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
    return AWFormTableModule;
}());
export { AWFormTableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNuQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7OztnQkFHNUQsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixtQkFBbUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLHFCQUFxQjtxQkFDeEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLG1CQUFtQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLG1CQUFtQjtxQkFDdEI7aUJBQ0o7OzRCQXZFRDs7U0F3RWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybVRhYmxlQ29tcG9uZW50fSBmcm9tICcuL2Zvcm0tdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBCb3R0b21ab25lQ29tcG9uZW50LFxuICAgIExlZnRab25lQ29tcG9uZW50LFxuICAgIE1pZGRsZVpvbmVDb21wb25lbnQsXG4gICAgUmlnaHRab25lQ29tcG9uZW50LFxuICAgIFRvcFpvbmVDb21wb25lbnRcbn0gZnJvbSAnLi4vZml2ZS16b25lLWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0NvcmVDb21wb25lbnRNb2R1bGV9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZvcm1UYWJsZUNvbXBvbmVudCxcbiAgICAgICAgRm9ybVJvd0NvbXBvbmVudCxcbiAgICAgICAgVG9wWm9uZUNvbXBvbmVudCxcbiAgICAgICAgTGVmdFpvbmVDb21wb25lbnQsXG4gICAgICAgIFJpZ2h0Wm9uZUNvbXBvbmVudCxcbiAgICAgICAgTWlkZGxlWm9uZUNvbXBvbmVudCxcbiAgICAgICAgQm90dG9tWm9uZUNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIEZvcm1UYWJsZUNvbXBvbmVudCxcbiAgICAgICAgRm9ybVJvd0NvbXBvbmVudCxcbiAgICAgICAgVG9wWm9uZUNvbXBvbmVudCxcbiAgICAgICAgTGVmdFpvbmVDb21wb25lbnQsXG4gICAgICAgIFJpZ2h0Wm9uZUNvbXBvbmVudCxcbiAgICAgICAgTWlkZGxlWm9uZUNvbXBvbmVudCxcbiAgICAgICAgQm90dG9tWm9uZUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBGb3JtVGFibGVDb21wb25lbnQsXG4gICAgICAgIEZvcm1Sb3dDb21wb25lbnQsXG4gICAgICAgIFRvcFpvbmVDb21wb25lbnQsXG4gICAgICAgIExlZnRab25lQ29tcG9uZW50LFxuICAgICAgICBSaWdodFpvbmVDb21wb25lbnQsXG4gICAgICAgIE1pZGRsZVpvbmVDb21wb25lbnQsXG4gICAgICAgIEJvdHRvbVpvbmVDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFXRm9ybVRhYmxlTW9kdWxlXG57XG59XG5cblxuIl19