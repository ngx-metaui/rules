/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AribaCoreModule } from '@aribaui/core';
import { AWStringFieldModule } from '../string/string.module';
import { AccordionModule, SharedModule } from 'primeng/primeng';
import { SectionActionsComponent, SectionComponent, SubSectionComponent } from './section.component';
import { AWHyperlinkModule } from '../hyperlink/hyperlink.module';
import { AWButtonModule } from '../button/button.module';
export class AWSectionModule {
}
AWSectionModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SectionComponent,
                    SubSectionComponent,
                    SectionActionsComponent
                ],
                imports: [
                    CommonModule,
                    AccordionModule,
                    AribaCoreModule,
                    AWStringFieldModule,
                    AWHyperlinkModule,
                    AWButtonModule,
                    SharedModule
                ],
                entryComponents: [
                    SectionComponent,
                    SubSectionComponent,
                    SectionActionsComponent
                ],
                exports: [
                    SectionComponent,
                    SectionActionsComponent,
                    SubSectionComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFpQ3ZELE1BQU07OztZQTlCTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLGdCQUFnQjtvQkFDaEIsbUJBQW1CO29CQUNuQix1QkFBdUI7aUJBQzFCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxZQUFZO2lCQUNmO2dCQUVELGVBQWUsRUFBRTtvQkFDYixnQkFBZ0I7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsdUJBQXVCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsZ0JBQWdCO29CQUNoQix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBcmliYUNvcmVNb2R1bGV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5pbXBvcnQge0FjY29yZGlvbk1vZHVsZSwgU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtTZWN0aW9uQWN0aW9uc0NvbXBvbmVudCwgU2VjdGlvbkNvbXBvbmVudCwgU3ViU2VjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi9zZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXSHlwZXJsaW5rTW9kdWxlfSBmcm9tICcuLi9oeXBlcmxpbmsvaHlwZXJsaW5rLm1vZHVsZSc7XG5pbXBvcnQge0FXQnV0dG9uTW9kdWxlfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU2VjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgU3ViU2VjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgU2VjdGlvbkFjdGlvbnNDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgICAgIEFyaWJhQ29yZU1vZHVsZSxcbiAgICAgICAgQVdTdHJpbmdGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdIeXBlcmxpbmtNb2R1bGUsXG4gICAgICAgIEFXQnV0dG9uTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFNlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIFN1YlNlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIFNlY3Rpb25BY3Rpb25zQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIFNlY3Rpb25BY3Rpb25zQ29tcG9uZW50LFxuICAgICAgICBTdWJTZWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV1NlY3Rpb25Nb2R1bGVcbntcbn1cblxuXG4iXX0=