/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AWCoreComponentModule } from '../../core/core.module';
import { AWOutlineForModule } from '../outline/outline-for.module';
import { Datatable2Component } from './datatable2.component';
import { DTWrapper } from './table-wrapper/table-wrapper.component';
import { DTColumn2Component } from './column/dt-column.component';
import { AWInputFieldModule } from '../input-field/input-field.module';
import { DTHeaderComponent2 } from './header/header.component';
import { DTDetailRowComponent } from './column/detail-row/dt-detail-row.component';
import { DTDetailRowExpanderComponent } from './column/detail-row-expander/dt-detail-row-expander.component';
import { DTMultiSelectColumnComponent } from './column/multi-select/dt-multi-select-column.component';
import { AWCheckBoxModule } from '../checkbox/check-box.module';
import { DTSingleSelectColumnComponent } from './column/single-select/dt-single-select-column.component';
import { AWRadioButtonModule } from '../radio-button/radio-button.module';
import { SetCellMaxWidthDirective } from './directives/dt-cell-directives';
import { DTDraggableRowDirective } from './directives/dt-draggable-row.directive';
export class AWDatatable2Module {
}
AWDatatable2Module.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Datatable2Component,
                    DTWrapper,
                    DTColumn2Component,
                    DTHeaderComponent2,
                    DTDetailRowComponent,
                    DTDetailRowExpanderComponent,
                    DTMultiSelectColumnComponent,
                    DTSingleSelectColumnComponent,
                    SetCellMaxWidthDirective,
                    DTDraggableRowDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    AWCoreComponentModule,
                    AWCheckBoxModule,
                    AWOutlineForModule,
                    AWRadioButtonModule,
                    AWInputFieldModule
                ],
                entryComponents: [
                    DTDetailRowExpanderComponent,
                    DTMultiSelectColumnComponent,
                    DTSingleSelectColumnComponent
                ],
                exports: [
                    Datatable2Component,
                    DTColumn2Component,
                    AWOutlineForModule,
                    DTHeaderComponent2,
                    DTDetailRowComponent
                ],
                providers: []
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQ0gsNEJBQTRCLEVBQy9CLE1BQU0sK0RBQStELENBQUM7QUFDdkUsT0FBTyxFQUNILDRCQUE0QixFQUMvQixNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFDSCw2QkFBNkIsRUFDaEMsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQXVDaEYsTUFBTTs7O1lBcENMLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsbUJBQW1CO29CQUNuQixTQUFTO29CQUNULGtCQUFrQjtvQkFDbEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLDRCQUE0QjtvQkFDNUIsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNyQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsNEJBQTRCO29CQUM1Qiw0QkFBNEI7b0JBQzVCLDZCQUE2QjtpQkFDaEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsb0JBQW9CO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7QVdPdXRsaW5lRm9yTW9kdWxlfSBmcm9tICcuLi9vdXRsaW5lL291dGxpbmUtZm9yLm1vZHVsZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtEVFdyYXBwZXJ9IGZyb20gJy4vdGFibGUtd3JhcHBlci90YWJsZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXSW5wdXRGaWVsZE1vZHVsZX0gZnJvbSAnLi4vaW5wdXQtZmllbGQvaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7RFRIZWFkZXJDb21wb25lbnQyfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7RFREZXRhaWxSb3dDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3cvZHQtZGV0YWlsLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3ctZXhwYW5kZXIvZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL211bHRpLXNlbGVjdC9kdC1tdWx0aS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXQ2hlY2tCb3hNb2R1bGV9IGZyb20gJy4uL2NoZWNrYm94L2NoZWNrLWJveC5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgICBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9zaW5nbGUtc2VsZWN0L2R0LXNpbmdsZS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXUmFkaW9CdXR0b25Nb2R1bGV9IGZyb20gJy4uL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7U2V0Q2VsbE1heFdpZHRoRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHQtY2VsbC1kaXJlY3RpdmVzJztcbmltcG9ydCB7RFREcmFnZ2FibGVSb3dEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9kdC1kcmFnZ2FibGUtcm93LmRpcmVjdGl2ZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGF0YXRhYmxlMkNvbXBvbmVudCxcbiAgICAgICAgRFRXcmFwcGVyLFxuICAgICAgICBEVENvbHVtbjJDb21wb25lbnQsXG4gICAgICAgIERUSGVhZGVyQ29tcG9uZW50MixcbiAgICAgICAgRFREZXRhaWxSb3dDb21wb25lbnQsXG4gICAgICAgIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQsXG4gICAgICAgIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQsXG4gICAgICAgIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50LFxuICAgICAgICBTZXRDZWxsTWF4V2lkdGhEaXJlY3RpdmUsXG4gICAgICAgIERURHJhZ2dhYmxlUm93RGlyZWN0aXZlXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveE1vZHVsZSxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV0lucHV0RmllbGRNb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50LFxuICAgICAgICBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50LFxuICAgICAgICBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRhdGFibGUyQ29tcG9uZW50LFxuICAgICAgICBEVENvbHVtbjJDb21wb25lbnQsXG4gICAgICAgIEFXT3V0bGluZUZvck1vZHVsZSxcbiAgICAgICAgRFRIZWFkZXJDb21wb25lbnQyLFxuICAgICAgICBEVERldGFpbFJvd0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0RhdGF0YWJsZTJNb2R1bGVcbntcbn1cblxuXG5cbiJdfQ==