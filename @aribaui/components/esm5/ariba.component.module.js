/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, Checkbox, CheckboxModule, DataTableModule, Dialog, DialogModule, DropdownModule, EditorModule, InputTextareaModule, InputTextModule, MenuModule, OverlayPanelModule, PaginatorModule, PanelModule, RadioButtonModule, SharedModule, TabMenuModule, ToolbarModule, TreeModule } from 'primeng/primeng';
import { AribaCoreModule } from '@aribaui/core';
import { SpyLifeCycleHooksDirective } from './spy-lifecycle.directive';
import { EmbeddedItemDirective } from './core/embedded-item';
import { ComponentRegistry } from './core/component-registry.service';
import * as components from './entry-components';
import { AWCoreComponentModule } from './core/core.module';
import { AWBasicNavigatorModule } from './widgets/basic-navigator/basic-navigator.module';
import { AWCheckBoxListModule } from './widgets/check-box-list/check-box-list.module';
import { AWCheckBoxModule } from './widgets/checkbox/check-box.module';
import { AWChooserModule } from './widgets/chooser/chooser.module';
import { AWConfirmationModule } from './widgets/confirmation/confirmation.module';
import { AWCurrencyModule } from './widgets/currency/currency.module';
import { AWDateAndTimeModule } from './widgets/date-and-time/data-and-time.module';
import { AWDialogModule } from './widgets/dialog/dialog.module';
import { AWDropdownModule } from './widgets/dropdown/dropdown.module';
import { AWGenericChooserModule } from './widgets/generic-chooser/generic-chooser.module';
import { AWHyperlinkModule } from './widgets/hyperlink/hyperlink.module';
import { AWInputFieldModule } from './widgets/input-field/input-field.module';
import { AWOutlineForModule } from './widgets/outline/outline-for.module';
import { AWOverlayModule } from './widgets/overlay/overlay.module';
import { AWPageNotificationModule } from './widgets/page-notification/page-notification.module';
import { AWPageWrapperModule } from './widgets/page-wrapper/page-wrapper.module';
import { AWRadioButtonModule } from './widgets/radio-button/radio-button.module';
import { AWRadioButtonListModule } from './widgets/radio-button-list/radio-button-list.module';
import { AWRichTextAreaModule } from './widgets/rich-text-area/rich-text-area.module';
import { AWHoverCardModule } from './widgets/hover-card/hover-card.module';
import { AWScrollableContainerModule } from './widgets/scrollable-container/scrollable-container.module';
import { AWSectionModule } from './widgets/section/section.module';
import { AWStepperModule } from './widgets/stepper/stepper.module';
import { AWStringFieldModule } from './widgets/string/string.module';
import { AWTextAreaModule } from './widgets/text-area/text-area.module';
import { AWButtonModule } from './widgets/button/button.module';
import { AWFormTableModule } from './layouts/form-table/form-table.module';
import { AWListModule } from './widgets/list/list.module';
import { AWCardModule } from './widgets/card/card.module';
import { AWDatatable2Module } from './widgets/datatable2/datatable2.module';
import { DomUtilsService } from './core/dom-utils.service';
import { ModalService } from './core/modal-service/modal.service';
import { DataProviders } from './core/data/data-providers';
import { DataFinders } from './core/data/data-finders';
import { ErrorManagerService } from './core/error-manager.service';
import { AwNameStore } from './core/aw-name/aw-name.store';
import { DataTypeProviderRegistry } from './core/data/datatype-registry.service';
import { WizardProgressModule } from './widgets/wizard-progress/wizard-progress.module';
import { ToggleSwitchModule } from './widgets/toggle-switch/toggle-switch.module';
/**
 * Component module is core module for the common layouts and widgets libraries.
 *
 * todo: There are some things that I still need to resolve - please see and notices \@Duplicates
 * jsdoc I want to keep this there to remind me that I need to refactor this as of now there are
 * not much option with angular.
 *
 */
var AribaComponentsModule = /** @class */ (function () {
    function AribaComponentsModule() {
    }
    /**
     * @return {?}
     */
    AribaComponentsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AribaComponentsModule,
            providers: [
                ModalService,
                ComponentRegistry,
                ErrorManagerService,
                DomUtilsService,
                DataTypeProviderRegistry,
                DataProviders,
                DataFinders,
                AwNameStore,
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerComponents,
                    deps: [ComponentRegistry],
                    multi: true,
                }
            ]
        };
    };
    AribaComponentsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        AribaCoreModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AWCoreComponentModule,
                        AWBasicNavigatorModule,
                        AWCardModule,
                        AWCheckBoxListModule,
                        AWCheckBoxModule,
                        AWChooserModule,
                        AWConfirmationModule,
                        AWCurrencyModule,
                        AWDateAndTimeModule,
                        AWDialogModule,
                        AWDropdownModule,
                        AWGenericChooserModule,
                        AWHyperlinkModule,
                        AWInputFieldModule,
                        AWOutlineForModule,
                        AWOverlayModule,
                        AWPageNotificationModule,
                        AWPageWrapperModule,
                        AWRadioButtonModule,
                        AWRadioButtonListModule,
                        AWRichTextAreaModule,
                        AWScrollableContainerModule,
                        AWSectionModule,
                        AWStepperModule,
                        AWStringFieldModule,
                        AWTextAreaModule,
                        AWFormTableModule,
                        AWButtonModule,
                        AWHoverCardModule,
                        AWListModule,
                        AWDatatable2Module,
                        WizardProgressModule,
                        ToggleSwitchModule,
                        PanelModule,
                        ButtonModule,
                        ToolbarModule,
                        InputTextModule,
                        InputTextareaModule,
                        AutoCompleteModule,
                        DropdownModule,
                        CalendarModule,
                        CheckboxModule,
                        RadioButtonModule,
                        SharedModule,
                        DialogModule,
                        MenuModule,
                        TabMenuModule,
                        AccordionModule,
                        EditorModule,
                        DataTableModule,
                        PaginatorModule,
                        OverlayPanelModule,
                        TreeModule
                    ],
                    declarations: [
                        SpyLifeCycleHooksDirective,
                    ],
                    bootstrap: [],
                    entryComponents: [
                        Checkbox,
                        Dialog
                    ],
                    exports: [
                        ReactiveFormsModule,
                        FormsModule,
                        SpyLifeCycleHooksDirective,
                        AWCoreComponentModule,
                        AWBasicNavigatorModule,
                        AWCardModule,
                        AWCheckBoxListModule,
                        AWCheckBoxModule,
                        AWChooserModule,
                        AWConfirmationModule,
                        AWCurrencyModule,
                        AWDateAndTimeModule,
                        AWDialogModule,
                        AWDropdownModule,
                        AWGenericChooserModule,
                        AWHyperlinkModule,
                        AWInputFieldModule,
                        AWOutlineForModule,
                        AWOverlayModule,
                        AWPageNotificationModule,
                        AWPageWrapperModule,
                        AWRadioButtonModule,
                        AWRadioButtonListModule,
                        AWRichTextAreaModule,
                        AWScrollableContainerModule,
                        AWSectionModule,
                        AWStepperModule,
                        AWStringFieldModule,
                        AWTextAreaModule,
                        AWFormTableModule,
                        EmbeddedItemDirective,
                        AWButtonModule,
                        AWHoverCardModule,
                        AWListModule,
                        AWDatatable2Module,
                        WizardProgressModule,
                        ToggleSwitchModule,
                        SharedModule,
                        PanelModule,
                        ButtonModule,
                        ToolbarModule,
                        InputTextModule,
                        InputTextareaModule,
                        AutoCompleteModule,
                        DropdownModule,
                        CalendarModule,
                        CheckboxModule,
                        RadioButtonModule,
                        DialogModule,
                        MenuModule,
                        TabMenuModule,
                        EditorModule,
                        DataTableModule,
                        PaginatorModule,
                        OverlayPanelModule
                    ]
                },] },
    ];
    return AribaComponentsModule;
}());
export { AribaComponentsModule };
/**
 * @param {?} compRegistry
 * @return {?}
 */
export function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLGNBQWMsRUFDZCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFVBQVUsRUFDYixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDaEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDakYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM3RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUN6RSxPQUFPLEVBQ0gsMkJBQTJCLEVBQzlCLE1BQU0sNERBQTRELENBQUM7QUFDcEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDekUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUFxSnJFLDZCQUFPOzs7SUFBZDtRQUVJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2Ysd0JBQXdCO2dCQUN4QixhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWDtvQkFDSSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7U0FDSixDQUFDO0tBQ0w7O2dCQWhLSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFFbkIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLHNCQUFzQjt3QkFDdEIsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLG9CQUFvQjt3QkFDcEIsMkJBQTJCO3dCQUMzQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFHbEIsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2Ysa0JBQWtCO3dCQUNsQixVQUFVO3FCQUViO29CQUNELFlBQVksRUFBRTt3QkFDViwwQkFBMEI7cUJBRTdCO29CQUNELFNBQVMsRUFBRSxFQUFFO29CQUNiLGVBQWUsRUFBRTt3QkFHYixRQUFRO3dCQUNSLE1BQU07cUJBQ1Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCwwQkFBMEI7d0JBQzFCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4QixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFHbEIsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixlQUFlO3dCQUNmLGtCQUFrQjtxQkFDckI7aUJBQ0o7O2dDQTdPRDs7U0E4T2EscUJBQXFCOzs7OztBQTRCbEMsTUFBTSw2QkFBNkIsWUFBK0I7SUFFOUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vZHVsZSxcbiAgICBDaGVja2JveCxcbiAgICBDaGVja2JveE1vZHVsZSxcbiAgICBEYXRhVGFibGVNb2R1bGUsXG4gICAgRGlhbG9nLFxuICAgIERpYWxvZ01vZHVsZSxcbiAgICBEcm9wZG93bk1vZHVsZSxcbiAgICBFZGl0b3JNb2R1bGUsXG4gICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgTWVudU1vZHVsZSxcbiAgICBPdmVybGF5UGFuZWxNb2R1bGUsXG4gICAgUGFnaW5hdG9yTW9kdWxlLFxuICAgIFBhbmVsTW9kdWxlLFxuICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBUYWJNZW51TW9kdWxlLFxuICAgIFRvb2xiYXJNb2R1bGUsXG4gICAgVHJlZU1vZHVsZVxufSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtBcmliYUNvcmVNb2R1bGV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZX0gZnJvbSAnLi9zcHktbGlmZWN5Y2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0VtYmVkZGVkSXRlbURpcmVjdGl2ZX0gZnJvbSAnLi9jb3JlL2VtYmVkZGVkLWl0ZW0nO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9jb3JlL2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi9lbnRyeS1jb21wb25lbnRzJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvYmFzaWMtbmF2aWdhdG9yL2Jhc2ljLW5hdmlnYXRvci5tb2R1bGUnO1xuaW1wb3J0IHtBV0NoZWNrQm94TGlzdE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NoZWNrLWJveC1saXN0L2NoZWNrLWJveC1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2hlY2tCb3hNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9jaGVja2JveC9jaGVjay1ib3gubW9kdWxlJztcbmltcG9ydCB7QVdDaG9vc2VyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2hvb3Nlci9jaG9vc2VyLm1vZHVsZSc7XG5pbXBvcnQge0FXQ29uZmlybWF0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV0N1cnJlbmN5TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY3VycmVuY3kvY3VycmVuY3kubW9kdWxlJztcbmltcG9ydCB7QVdEYXRlQW5kVGltZU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RhdGUtYW5kLXRpbWUvZGF0YS1hbmQtdGltZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0RpYWxvZ01vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RpYWxvZy9kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7QVdEcm9wZG93bk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQge0FXR2VuZXJpY0Nob29zZXJNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9nZW5lcmljLWNob29zZXIvZ2VuZXJpYy1jaG9vc2VyLm1vZHVsZSc7XG5pbXBvcnQge0FXSHlwZXJsaW5rTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaHlwZXJsaW5rL2h5cGVybGluay5tb2R1bGUnO1xuaW1wb3J0IHtBV0lucHV0RmllbGRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9pbnB1dC1maWVsZC9pbnB1dC1maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHtBV091dGxpbmVGb3JNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9vdXRsaW5lL291dGxpbmUtZm9yLm1vZHVsZSc7XG5pbXBvcnQge0FXT3ZlcmxheU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHtBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9wYWdlLW5vdGlmaWNhdGlvbi9wYWdlLW5vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV1BhZ2VXcmFwcGVyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2Utd3JhcHBlci5tb2R1bGUnO1xuaW1wb3J0IHtBV1JhZGlvQnV0dG9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV1JhZGlvQnV0dG9uTGlzdE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JhZGlvLWJ1dHRvbi1saXN0L3JhZGlvLWJ1dHRvbi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXUmljaFRleHRBcmVhTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEubW9kdWxlJztcbmltcG9ydCB7QVdIb3ZlckNhcmRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQubW9kdWxlJztcbmltcG9ydCB7XG4gICAgQVdTY3JvbGxhYmxlQ29udGFpbmVyTW9kdWxlXG59IGZyb20gJy4vd2lkZ2V0cy9zY3JvbGxhYmxlLWNvbnRhaW5lci9zY3JvbGxhYmxlLWNvbnRhaW5lci5tb2R1bGUnO1xuaW1wb3J0IHtBV1NlY3Rpb25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24ubW9kdWxlJztcbmltcG9ydCB7QVdTdGVwcGVyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc3RlcHBlci9zdGVwcGVyLm1vZHVsZSc7XG5pbXBvcnQge0FXU3RyaW5nRmllbGRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5pbXBvcnQge0FXVGV4dEFyZWFNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy90ZXh0LWFyZWEvdGV4dC1hcmVhLm1vZHVsZSc7XG5pbXBvcnQge0FXQnV0dG9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV0Zvcm1UYWJsZU1vZHVsZX0gZnJvbSAnLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS10YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0xpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9saXN0L2xpc3QubW9kdWxlJztcbmltcG9ydCB7QVdDYXJkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQge0FXRGF0YXRhYmxlMk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi5tb2R1bGUnO1xuaW1wb3J0IHtEb21VdGlsc1NlcnZpY2V9IGZyb20gJy4vY29yZS9kb20tdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSAnLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0Vycm9yTWFuYWdlclNlcnZpY2V9IGZyb20gJy4vY29yZS9lcnJvci1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtBd05hbWVTdG9yZX0gZnJvbSAnLi9jb3JlL2F3LW5hbWUvYXctbmFtZS5zdG9yZSc7XG5pbXBvcnQge0RhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeX0gZnJvbSAnLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge1dpemFyZFByb2dyZXNzTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvd2l6YXJkLXByb2dyZXNzL3dpemFyZC1wcm9ncmVzcy5tb2R1bGUnO1xuaW1wb3J0IHtUb2dnbGVTd2l0Y2hNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2gubW9kdWxlJztcblxuLyoqXG4gKiBDb21wb25lbnQgbW9kdWxlIGlzIGNvcmUgbW9kdWxlIGZvciB0aGUgY29tbW9uIGxheW91dHMgYW5kIHdpZGdldHMgbGlicmFyaWVzLlxuICpcbiAqIHRvZG86IFRoZXJlIGFyZSBzb21lIHRoaW5ncyB0aGF0IEkgc3RpbGwgbmVlZCB0byByZXNvbHZlIC0gcGxlYXNlIHNlZSBhbmQgbm90aWNlcyBARHVwbGljYXRlc1xuICoganNkb2MgSSB3YW50IHRvIGtlZXAgdGhpcyB0aGVyZSB0byByZW1pbmQgbWUgdGhhdCBJIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBhcyBvZiBub3cgdGhlcmUgYXJlXG4gKiBub3QgbXVjaCBvcHRpb24gd2l0aCBhbmd1bGFyLlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEFyaWJhQ29yZU1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGUsXG4gICAgICAgIEFXQmFzaWNOYXZpZ2F0b3JNb2R1bGUsXG4gICAgICAgIEFXQ2FyZE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveExpc3RNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIEFXQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdDb25maXJtYXRpb25Nb2R1bGUsXG4gICAgICAgIEFXQ3VycmVuY3lNb2R1bGUsXG4gICAgICAgIEFXRGF0ZUFuZFRpbWVNb2R1bGUsXG4gICAgICAgIEFXRGlhbG9nTW9kdWxlLFxuICAgICAgICBBV0Ryb3Bkb3duTW9kdWxlLFxuICAgICAgICBBV0dlbmVyaWNDaG9vc2VyTW9kdWxlLFxuICAgICAgICBBV0h5cGVybGlua01vZHVsZSxcbiAgICAgICAgQVdJbnB1dEZpZWxkTW9kdWxlLFxuICAgICAgICBBV091dGxpbmVGb3JNb2R1bGUsXG4gICAgICAgIEFXT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQVdQYWdlTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgICAgICBBV1BhZ2VXcmFwcGVyTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTGlzdE1vZHVsZSxcbiAgICAgICAgQVdSaWNoVGV4dEFyZWFNb2R1bGUsXG4gICAgICAgIEFXU2Nyb2xsYWJsZUNvbnRhaW5lck1vZHVsZSxcbiAgICAgICAgQVdTZWN0aW9uTW9kdWxlLFxuICAgICAgICBBV1N0ZXBwZXJNb2R1bGUsXG4gICAgICAgIEFXU3RyaW5nRmllbGRNb2R1bGUsXG4gICAgICAgIEFXVGV4dEFyZWFNb2R1bGUsXG4gICAgICAgIEFXRm9ybVRhYmxlTW9kdWxlLFxuICAgICAgICBBV0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdIb3ZlckNhcmRNb2R1bGUsXG4gICAgICAgIEFXTGlzdE1vZHVsZSxcbiAgICAgICAgQVdEYXRhdGFibGUyTW9kdWxlLFxuICAgICAgICBXaXphcmRQcm9ncmVzc01vZHVsZSxcbiAgICAgICAgVG9nZ2xlU3dpdGNoTW9kdWxlLFxuXG4gICAgICAgIC8vIFByaW1lTkcgcmVtb3ZlIHdoZW4gYWxsIEFXIGFyZSBpbXBvcnRlZFxuICAgICAgICBQYW5lbE1vZHVsZSxcbiAgICAgICAgQnV0dG9uTW9kdWxlLFxuICAgICAgICBUb29sYmFyTW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgICAgIEF1dG9Db21wbGV0ZU1vZHVsZSxcbiAgICAgICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIENhbGVuZGFyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgRGlhbG9nTW9kdWxlLFxuICAgICAgICBNZW51TW9kdWxlLFxuICAgICAgICBUYWJNZW51TW9kdWxlLFxuICAgICAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgICAgIEVkaXRvck1vZHVsZSxcbiAgICAgICAgRGF0YVRhYmxlTW9kdWxlLFxuICAgICAgICBQYWdpbmF0b3JNb2R1bGUsXG4gICAgICAgIE92ZXJsYXlQYW5lbE1vZHVsZSxcbiAgICAgICAgVHJlZU1vZHVsZVxuXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3B5TGlmZUN5Y2xlSG9va3NEaXJlY3RpdmUsXG4gICAgICAgIC8vIDN0aCBwYXJ0eSBkZWNsYXJhdGlvblxuICAgIF0sXG4gICAgYm9vdHN0cmFwOiBbXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcblxuICAgICAgICAvLyBQcmltZU5HXG4gICAgICAgIENoZWNrYm94LFxuICAgICAgICBEaWFsb2dcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFNweUxpZmVDeWNsZUhvb2tzRGlyZWN0aXZlLFxuICAgICAgICBBV0NvcmVDb21wb25lbnRNb2R1bGUsXG4gICAgICAgIEFXQmFzaWNOYXZpZ2F0b3JNb2R1bGUsXG4gICAgICAgIEFXQ2FyZE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveExpc3RNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIEFXQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdDb25maXJtYXRpb25Nb2R1bGUsXG4gICAgICAgIEFXQ3VycmVuY3lNb2R1bGUsXG4gICAgICAgIEFXRGF0ZUFuZFRpbWVNb2R1bGUsXG4gICAgICAgIEFXRGlhbG9nTW9kdWxlLFxuICAgICAgICBBV0Ryb3Bkb3duTW9kdWxlLFxuICAgICAgICBBV0dlbmVyaWNDaG9vc2VyTW9kdWxlLFxuICAgICAgICBBV0h5cGVybGlua01vZHVsZSxcbiAgICAgICAgQVdJbnB1dEZpZWxkTW9kdWxlLFxuICAgICAgICBBV091dGxpbmVGb3JNb2R1bGUsXG4gICAgICAgIEFXT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQVdQYWdlTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgICAgICBBV1BhZ2VXcmFwcGVyTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV1JhZGlvQnV0dG9uTGlzdE1vZHVsZSxcbiAgICAgICAgQVdSaWNoVGV4dEFyZWFNb2R1bGUsXG4gICAgICAgIEFXU2Nyb2xsYWJsZUNvbnRhaW5lck1vZHVsZSxcbiAgICAgICAgQVdTZWN0aW9uTW9kdWxlLFxuICAgICAgICBBV1N0ZXBwZXJNb2R1bGUsXG4gICAgICAgIEFXU3RyaW5nRmllbGRNb2R1bGUsXG4gICAgICAgIEFXVGV4dEFyZWFNb2R1bGUsXG4gICAgICAgIEFXRm9ybVRhYmxlTW9kdWxlLFxuICAgICAgICBFbWJlZGRlZEl0ZW1EaXJlY3RpdmUsXG4gICAgICAgIEFXQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV0hvdmVyQ2FyZE1vZHVsZSxcbiAgICAgICAgQVdMaXN0TW9kdWxlLFxuICAgICAgICBBV0RhdGF0YWJsZTJNb2R1bGUsXG4gICAgICAgIFdpemFyZFByb2dyZXNzTW9kdWxlLFxuICAgICAgICBUb2dnbGVTd2l0Y2hNb2R1bGUsXG5cbiAgICAgICAgLy8gUHJpbWVOR1xuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIFBhbmVsTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFRvb2xiYXJNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICAgICAgQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgICAgICBEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgICAgIENoZWNrYm94TW9kdWxlLFxuICAgICAgICBSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgRGlhbG9nTW9kdWxlLFxuICAgICAgICBNZW51TW9kdWxlLFxuICAgICAgICBUYWJNZW51TW9kdWxlLFxuICAgICAgICBFZGl0b3JNb2R1bGUsXG4gICAgICAgIERhdGFUYWJsZU1vZHVsZSxcbiAgICAgICAgUGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBPdmVybGF5UGFuZWxNb2R1bGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFyaWJhQ29tcG9uZW50c01vZHVsZVxue1xuXG5cbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFyaWJhQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIE1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBDb21wb25lbnRSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBFcnJvck1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgRGF0YVByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICBEYXRhRmluZGVycyxcbiAgICAgICAgICAgICAgICBBd05hbWVTdG9yZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogcmVnaXN0ZXJDb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbQ29tcG9uZW50UmVnaXN0cnldLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnRzKGNvbXBSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnkpOiBGdW5jdGlvblxue1xuICAgIHJldHVybiBjb21wUmVnaXN0cnkuaW5pdGlhbGl6ZS5iaW5kKGNvbXBSZWdpc3RyeSwgY29tcG9uZW50cyk7XG59XG5cblxuIl19