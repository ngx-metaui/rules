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
var AWDatatable2Module = /** @class */ (function () {
    function AWDatatable2Module() {
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
                        DTDraggableRowDirective,
                        SetCellMaxWidthDirective
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
    return AWDatatable2Module;
}());
export { AWDatatable2Module };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQ0gsNEJBQTRCLEVBQy9CLE1BQU0sK0RBQStELENBQUM7QUFDdkUsT0FBTyxFQUNILDRCQUE0QixFQUMvQixNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFDSCw2QkFBNkIsRUFDaEMsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7Z0JBRy9FLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3dCQUNuQixTQUFTO3dCQUNULGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLDRCQUE0Qjt3QkFDNUIsNEJBQTRCO3dCQUM1Qiw2QkFBNkI7d0JBQzdCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3FCQUMzQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNyQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IsNEJBQTRCO3dCQUM1Qiw0QkFBNEI7d0JBQzVCLDZCQUE2QjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7OzZCQWpGRDs7U0FrRmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBV0NvcmVDb21wb25lbnRNb2R1bGV9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtBV091dGxpbmVGb3JNb2R1bGV9IGZyb20gJy4uL291dGxpbmUvb3V0bGluZS1mb3IubW9kdWxlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RUV3JhcHBlcn0gZnJvbSAnLi90YWJsZS13cmFwcGVyL3RhYmxlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdJbnB1dEZpZWxkTW9kdWxlfSBmcm9tICcuLi9pbnB1dC1maWVsZC9pbnB1dC1maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHtEVEhlYWRlckNvbXBvbmVudDJ9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEVERldGFpbFJvd0NvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy9kdC1kZXRhaWwtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy1leHBhbmRlci9kdC1kZXRhaWwtcm93LWV4cGFuZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vbXVsdGktc2VsZWN0L2R0LW11bHRpLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdDaGVja0JveE1vZHVsZX0gZnJvbSAnLi4vY2hlY2tib3gvY2hlY2stYm94Lm1vZHVsZSc7XG5pbXBvcnQge1xuICAgIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL3NpbmdsZS1zZWxlY3QvZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbk1vZHVsZX0gZnJvbSAnLi4vcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHtTZXRDZWxsTWF4V2lkdGhEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9kdC1jZWxsLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHtEVERyYWdnYWJsZVJvd0RpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2R0LWRyYWdnYWJsZS1yb3cuZGlyZWN0aXZlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEYXRhdGFibGUyQ29tcG9uZW50LFxuICAgICAgICBEVFdyYXBwZXIsXG4gICAgICAgIERUQ29sdW1uMkNvbXBvbmVudCxcbiAgICAgICAgRFRIZWFkZXJDb21wb25lbnQyLFxuICAgICAgICBEVERldGFpbFJvd0NvbXBvbmVudCxcbiAgICAgICAgRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudCxcbiAgICAgICAgRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudCxcbiAgICAgICAgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQsXG4gICAgICAgIERURHJhZ2dhYmxlUm93RGlyZWN0aXZlLFxuICAgICAgICBTZXRDZWxsTWF4V2lkdGhEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBV091dGxpbmVGb3JNb2R1bGUsXG4gICAgICAgIEFXUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXSW5wdXRGaWVsZE1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQsXG4gICAgICAgIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQsXG4gICAgICAgIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERhdGF0YWJsZTJDb21wb25lbnQsXG4gICAgICAgIERUQ29sdW1uMkNvbXBvbmVudCxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBEVEhlYWRlckNvbXBvbmVudDIsXG4gICAgICAgIERURGV0YWlsUm93Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFXRGF0YXRhYmxlMk1vZHVsZVxue1xufVxuXG5cblxuIl19