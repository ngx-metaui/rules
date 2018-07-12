/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, Checkbox, CheckboxModule, DataTableModule, Dialog, DialogModule, DropdownModule, EditorModule, InputTextareaModule, InputTextModule, MenuModule, OverlayPanelModule, PaginatorModule, PanelModule, RadioButtonModule, SharedModule, TabMenuModule, ToolbarModule } from 'primeng/primeng';
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
                        OverlayPanelModule
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLGNBQWMsRUFDZCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxn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Q0QsT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCwwQkFBMEI7d0JBQzFCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4QixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUdsQixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2Ysa0JBQWtCO3FCQUNyQjtpQkFDSjs7Z0NBck9EOztTQXNPYSxxQkFBcUI7Ozs7O0FBNEJsQyxNQUFNLDZCQUE4QixZQUErQjtJQUUvRCxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ2pFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEFjY29yZGlvbk1vZHVsZSxcbiAgICBBdXRvQ29tcGxldGVNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlLFxuICAgIENhbGVuZGFyTW9kdWxlLFxuICAgIENoZWNrYm94LFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIERhdGFUYWJsZU1vZHVsZSxcbiAgICBEaWFsb2csXG4gICAgRGlhbG9nTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIEVkaXRvck1vZHVsZSxcbiAgICBJbnB1dFRleHRhcmVhTW9kdWxlLFxuICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICBNZW51TW9kdWxlLFxuICAgIE92ZXJsYXlQYW5lbE1vZHVsZSxcbiAgICBQYWdpbmF0b3JNb2R1bGUsXG4gICAgUGFuZWxNb2R1bGUsXG4gICAgUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIFRhYk1lbnVNb2R1bGUsXG4gICAgVG9vbGJhck1vZHVsZVxufSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtBcmliYUNvcmVNb2R1bGV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZX0gZnJvbSAnLi9zcHktbGlmZWN5Y2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0VtYmVkZGVkSXRlbURpcmVjdGl2ZX0gZnJvbSAnLi9jb3JlL2VtYmVkZGVkLWl0ZW0nO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9jb3JlL2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi9lbnRyeS1jb21wb25lbnRzJztcbmltcG9ydCB7QVdDb3JlQ29tcG9uZW50TW9kdWxlfSBmcm9tICcuL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvYmFzaWMtbmF2aWdhdG9yL2Jhc2ljLW5hdmlnYXRvci5tb2R1bGUnO1xuaW1wb3J0IHtBV0NoZWNrQm94TGlzdE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NoZWNrLWJveC1saXN0L2NoZWNrLWJveC1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2hlY2tCb3hNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9jaGVja2JveC9jaGVjay1ib3gubW9kdWxlJztcbmltcG9ydCB7QVdDaG9vc2VyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2hvb3Nlci9jaG9vc2VyLm1vZHVsZSc7XG5pbXBvcnQge0FXQ29uZmlybWF0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV0N1cnJlbmN5TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY3VycmVuY3kvY3VycmVuY3kubW9kdWxlJztcbmltcG9ydCB7QVdEYXRlQW5kVGltZU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RhdGUtYW5kLXRpbWUvZGF0YS1hbmQtdGltZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0RpYWxvZ01vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RpYWxvZy9kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7QVdEcm9wZG93bk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQge0FXR2VuZXJpY0Nob29zZXJNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9nZW5lcmljLWNob29zZXIvZ2VuZXJpYy1jaG9vc2VyLm1vZHVsZSc7XG5pbXBvcnQge0FXSHlwZXJsaW5rTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaHlwZXJsaW5rL2h5cGVybGluay5tb2R1bGUnO1xuaW1wb3J0IHtBV0lucHV0RmllbGRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9pbnB1dC1maWVsZC9pbnB1dC1maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHtBV091dGxpbmVGb3JNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9vdXRsaW5lL291dGxpbmUtZm9yLm1vZHVsZSc7XG5pbXBvcnQge0FXT3ZlcmxheU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHtBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9wYWdlLW5vdGlmaWNhdGlvbi9wYWdlLW5vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV1BhZ2VXcmFwcGVyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2Utd3JhcHBlci5tb2R1bGUnO1xuaW1wb3J0IHtBV1JhZGlvQnV0dG9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV1JhZGlvQnV0dG9uTGlzdE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JhZGlvLWJ1dHRvbi1saXN0L3JhZGlvLWJ1dHRvbi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXUmljaFRleHRBcmVhTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEubW9kdWxlJztcbmltcG9ydCB7QVdIb3ZlckNhcmRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQubW9kdWxlJztcbmltcG9ydCB7XG4gICAgQVdTY3JvbGxhYmxlQ29udGFpbmVyTW9kdWxlXG59IGZyb20gJy4vd2lkZ2V0cy9zY3JvbGxhYmxlLWNvbnRhaW5lci9zY3JvbGxhYmxlLWNvbnRhaW5lci5tb2R1bGUnO1xuaW1wb3J0IHtBV1NlY3Rpb25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24ubW9kdWxlJztcbmltcG9ydCB7QVdTdGVwcGVyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc3RlcHBlci9zdGVwcGVyLm1vZHVsZSc7XG5pbXBvcnQge0FXU3RyaW5nRmllbGRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5pbXBvcnQge0FXVGV4dEFyZWFNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy90ZXh0LWFyZWEvdGV4dC1hcmVhLm1vZHVsZSc7XG5pbXBvcnQge0FXQnV0dG9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHtBV0Zvcm1UYWJsZU1vZHVsZX0gZnJvbSAnLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS10YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHtBV0xpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9saXN0L2xpc3QubW9kdWxlJztcbmltcG9ydCB7QVdDYXJkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQge0FXRGF0YXRhYmxlMk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi5tb2R1bGUnO1xuaW1wb3J0IHtEb21VdGlsc1NlcnZpY2V9IGZyb20gJy4vY29yZS9kb20tdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSAnLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0Vycm9yTWFuYWdlclNlcnZpY2V9IGZyb20gJy4vY29yZS9lcnJvci1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtBd05hbWVTdG9yZX0gZnJvbSAnLi9jb3JlL2F3LW5hbWUvYXctbmFtZS5zdG9yZSc7XG5pbXBvcnQge0RhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeX0gZnJvbSAnLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IG1vZHVsZSBpcyBjb3JlIG1vZHVsZSBmb3IgdGhlIGNvbW1vbiBsYXlvdXRzIGFuZCB3aWRnZXRzIGxpYnJhcmllcy5cbiAqXG4gKiB0b2RvOiBUaGVyZSBhcmUgc29tZSB0aGluZ3MgdGhhdCBJIHN0aWxsIG5lZWQgdG8gcmVzb2x2ZSAtIHBsZWFzZSBzZWUgYW5kIG5vdGljZXMgQER1cGxpY2F0ZXNcbiAqIGpzZG9jIEkgd2FudCB0byBrZWVwIHRoaXMgdGhlcmUgdG8gcmVtaW5kIG1lIHRoYXQgSSBuZWVkIHRvIHJlZmFjdG9yIHRoaXMgYXMgb2Ygbm93IHRoZXJlIGFyZVxuICogbm90IG11Y2ggb3B0aW9uIHdpdGggYW5ndWxhci5cbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBcmliYUNvcmVNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlLFxuICAgICAgICBBV0NhcmRNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hMaXN0TW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBV0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBBV0N1cnJlbmN5TW9kdWxlLFxuICAgICAgICBBV0RhdGVBbmRUaW1lTW9kdWxlLFxuICAgICAgICBBV0RpYWxvZ01vZHVsZSxcbiAgICAgICAgQVdEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQVdHZW5lcmljQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdIeXBlcmxpbmtNb2R1bGUsXG4gICAgICAgIEFXSW5wdXRGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBBV092ZXJsYXlNb2R1bGUsXG4gICAgICAgIEFXUGFnZU5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICAgICAgQVdQYWdlV3JhcHBlck1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGUsXG4gICAgICAgIEFXUmljaFRleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV1Njcm9sbGFibGVDb250YWluZXJNb2R1bGUsXG4gICAgICAgIEFXU2VjdGlvbk1vZHVsZSxcbiAgICAgICAgQVdTdGVwcGVyTW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlLFxuICAgICAgICBBV1RleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV0Zvcm1UYWJsZU1vZHVsZSxcbiAgICAgICAgQVdCdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXSG92ZXJDYXJkTW9kdWxlLFxuICAgICAgICBBV0xpc3RNb2R1bGUsXG4gICAgICAgIEFXRGF0YXRhYmxlMk1vZHVsZSxcblxuICAgICAgICAvLyBQcmltZU5HIHJlbW92ZSB3aGVuIGFsbCBBVyBhcmUgaW1wb3J0ZWRcbiAgICAgICAgUGFuZWxNb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgVG9vbGJhck1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRhcmVhTW9kdWxlLFxuICAgICAgICBBdXRvQ29tcGxldGVNb2R1bGUsXG4gICAgICAgIERyb3Bkb3duTW9kdWxlLFxuICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWVudU1vZHVsZSxcbiAgICAgICAgVGFiTWVudU1vZHVsZSxcbiAgICAgICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgICAgICBFZGl0b3JNb2R1bGUsXG4gICAgICAgIERhdGFUYWJsZU1vZHVsZSxcbiAgICAgICAgUGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBPdmVybGF5UGFuZWxNb2R1bGVcblxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNweUxpZmVDeWNsZUhvb2tzRGlyZWN0aXZlLFxuICAgICAgICAvLyAzdGggcGFydHkgZGVjbGFyYXRpb25cbiAgICBdLFxuICAgIGJvb3RzdHJhcDogW10sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG5cbiAgICAgICAgLy8gUHJpbWVOR1xuICAgICAgICBDaGVja2JveCxcbiAgICAgICAgRGlhbG9nXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZSxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlLFxuICAgICAgICBBV0NhcmRNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hMaXN0TW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBV0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBBV0N1cnJlbmN5TW9kdWxlLFxuICAgICAgICBBV0RhdGVBbmRUaW1lTW9kdWxlLFxuICAgICAgICBBV0RpYWxvZ01vZHVsZSxcbiAgICAgICAgQVdEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQVdHZW5lcmljQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdIeXBlcmxpbmtNb2R1bGUsXG4gICAgICAgIEFXSW5wdXRGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBBV092ZXJsYXlNb2R1bGUsXG4gICAgICAgIEFXUGFnZU5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICAgICAgQVdQYWdlV3JhcHBlck1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGUsXG4gICAgICAgIEFXUmljaFRleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV1Njcm9sbGFibGVDb250YWluZXJNb2R1bGUsXG4gICAgICAgIEFXU2VjdGlvbk1vZHVsZSxcbiAgICAgICAgQVdTdGVwcGVyTW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlLFxuICAgICAgICBBV1RleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV0Zvcm1UYWJsZU1vZHVsZSxcbiAgICAgICAgRW1iZWRkZWRJdGVtRGlyZWN0aXZlLFxuICAgICAgICBBV0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdIb3ZlckNhcmRNb2R1bGUsXG4gICAgICAgIEFXTGlzdE1vZHVsZSxcbiAgICAgICAgQVdEYXRhdGFibGUyTW9kdWxlLFxuXG4gICAgICAgIC8vIFByaW1lTkdcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBQYW5lbE1vZHVsZSxcbiAgICAgICAgQnV0dG9uTW9kdWxlLFxuICAgICAgICBUb29sYmFyTW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgICAgIEF1dG9Db21wbGV0ZU1vZHVsZSxcbiAgICAgICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIENhbGVuZGFyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWVudU1vZHVsZSxcbiAgICAgICAgVGFiTWVudU1vZHVsZSxcbiAgICAgICAgRWRpdG9yTW9kdWxlLFxuICAgICAgICBEYXRhVGFibGVNb2R1bGUsXG4gICAgICAgIFBhZ2luYXRvck1vZHVsZSxcbiAgICAgICAgT3ZlcmxheVBhbmVsTW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvbXBvbmVudHNNb2R1bGVcbntcblxuXG4gICAgc3RhdGljIGZvclJvb3QgKCk6IE1vZHVsZVdpdGhQcm92aWRlcnNcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXJpYmFDb21wb25lbnRzTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgTW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIENvbXBvbmVudFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIEVycm9yTWFuYWdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgRG9tVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBEYXRhUHJvdmlkZXJzLFxuICAgICAgICAgICAgICAgIERhdGFGaW5kZXJzLFxuICAgICAgICAgICAgICAgIEF3TmFtZVN0b3JlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiByZWdpc3RlckNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtDb21wb25lbnRSZWdpc3RyeV0sXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudHMgKGNvbXBSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnkpOiBGdW5jdGlvblxue1xuICAgIHJldHVybiBjb21wUmVnaXN0cnkuaW5pdGlhbGl6ZS5iaW5kKGNvbXBSZWdpc3RyeSwgY29tcG9uZW50cyk7XG59XG5cblxuIl19