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
export class AribaComponentsModule {
    /**
     * @return {?}
     */
    static forRoot() {
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
    }
}
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
/**
 * @param {?} compRegistry
 * @return {?}
 */
export function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLGNBQWMsRUFDZCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFVBQVUsRUFDYixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVB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O0lBRTlELE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDakUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgIEF1dG9Db21wbGV0ZU1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgQ2hlY2tib3gsXG4gICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgRGF0YVRhYmxlTW9kdWxlLFxuICAgIERpYWxvZyxcbiAgICBEaWFsb2dNb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgRWRpdG9yTW9kdWxlLFxuICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgIE1lbnVNb2R1bGUsXG4gICAgT3ZlcmxheVBhbmVsTW9kdWxlLFxuICAgIFBhZ2luYXRvck1vZHVsZSxcbiAgICBQYW5lbE1vZHVsZSxcbiAgICBSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgVGFiTWVudU1vZHVsZSxcbiAgICBUb29sYmFyTW9kdWxlLFxuICAgIFRyZWVNb2R1bGVcbn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7QXJpYmFDb3JlTW9kdWxlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7U3B5TGlmZUN5Y2xlSG9va3NEaXJlY3RpdmV9IGZyb20gJy4vc3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtFbWJlZGRlZEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vY29yZS9lbWJlZGRlZC1pdGVtJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4vY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4vZW50cnktY29tcG9uZW50cyc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7QVdCYXNpY05hdmlnYXRvck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Jhc2ljLW5hdmlnYXRvci9iYXNpYy1uYXZpZ2F0b3IubW9kdWxlJztcbmltcG9ydCB7QVdDaGVja0JveExpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9jaGVjay1ib3gtbGlzdC9jaGVjay1ib3gtbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtBV0NoZWNrQm94TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2hlY2tib3gvY2hlY2stYm94Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2hvb3Nlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Nob29zZXIvY2hvb3Nlci5tb2R1bGUnO1xuaW1wb3J0IHtBV0NvbmZpcm1hdGlvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24ubW9kdWxlJztcbmltcG9ydCB7QVdDdXJyZW5jeU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2N1cnJlbmN5L2N1cnJlbmN5Lm1vZHVsZSc7XG5pbXBvcnQge0FXRGF0ZUFuZFRpbWVNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGEtYW5kLXRpbWUubW9kdWxlJztcbmltcG9ydCB7QVdEaWFsb2dNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kaWFsb2cvZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQge0FXRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHtBV0dlbmVyaWNDaG9vc2VyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvZ2VuZXJpYy1jaG9vc2VyL2dlbmVyaWMtY2hvb3Nlci5tb2R1bGUnO1xuaW1wb3J0IHtBV0h5cGVybGlua01vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsubW9kdWxlJztcbmltcG9ydCB7QVdJbnB1dEZpZWxkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7QVdPdXRsaW5lRm9yTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5tb2R1bGUnO1xuaW1wb3J0IHtBV092ZXJsYXlNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9vdmVybGF5L292ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7QVdQYWdlTm90aWZpY2F0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7QVdQYWdlV3JhcHBlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLXdyYXBwZXIubW9kdWxlJztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbkxpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9yYWRpby1idXR0b24tbGlzdC9yYWRpby1idXR0b24tbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtBV1JpY2hUZXh0QXJlYU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JpY2gtdGV4dC1hcmVhL3JpY2gtdGV4dC1hcmVhLm1vZHVsZSc7XG5pbXBvcnQge0FXSG92ZXJDYXJkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaG92ZXItY2FyZC9ob3Zlci1jYXJkLm1vZHVsZSc7XG5pbXBvcnQge1xuICAgIEFXU2Nyb2xsYWJsZUNvbnRhaW5lck1vZHVsZVxufSBmcm9tICcuL3dpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIubW9kdWxlJztcbmltcG9ydCB7QVdTZWN0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc2VjdGlvbi9zZWN0aW9uLm1vZHVsZSc7XG5pbXBvcnQge0FXU3RlcHBlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3N0ZXBwZXIvc3RlcHBlci5tb2R1bGUnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc3RyaW5nL3N0cmluZy5tb2R1bGUnO1xuaW1wb3J0IHtBV1RleHRBcmVhTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvdGV4dC1hcmVhL3RleHQtYXJlYS5tb2R1bGUnO1xuaW1wb3J0IHtBV0J1dHRvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7QVdGb3JtVGFibGVNb2R1bGV9IGZyb20gJy4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUubW9kdWxlJztcbmltcG9ydCB7QVdMaXN0TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2FyZE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHtBV0RhdGF0YWJsZTJNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIubW9kdWxlJztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuL2NvcmUvZG9tLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtNb2RhbFNlcnZpY2V9IGZyb20gJy4vY29yZS9tb2RhbC1zZXJ2aWNlL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge0RhdGFGaW5kZXJzfSBmcm9tICcuL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtFcnJvck1hbmFnZXJTZXJ2aWNlfSBmcm9tICcuL2NvcmUvZXJyb3ItbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7QXdOYW1lU3RvcmV9IGZyb20gJy4vY29yZS9hdy1uYW1lL2F3LW5hbWUuc3RvcmUnO1xuaW1wb3J0IHtEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnl9IGZyb20gJy4vY29yZS9kYXRhL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtXaXphcmRQcm9ncmVzc01vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3dpemFyZC1wcm9ncmVzcy93aXphcmQtcHJvZ3Jlc3MubW9kdWxlJztcbmltcG9ydCB7VG9nZ2xlU3dpdGNoTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvdG9nZ2xlLXN3aXRjaC90b2dnbGUtc3dpdGNoLm1vZHVsZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IG1vZHVsZSBpcyBjb3JlIG1vZHVsZSBmb3IgdGhlIGNvbW1vbiBsYXlvdXRzIGFuZCB3aWRnZXRzIGxpYnJhcmllcy5cbiAqXG4gKiB0b2RvOiBUaGVyZSBhcmUgc29tZSB0aGluZ3MgdGhhdCBJIHN0aWxsIG5lZWQgdG8gcmVzb2x2ZSAtIHBsZWFzZSBzZWUgYW5kIG5vdGljZXMgQER1cGxpY2F0ZXNcbiAqIGpzZG9jIEkgd2FudCB0byBrZWVwIHRoaXMgdGhlcmUgdG8gcmVtaW5kIG1lIHRoYXQgSSBuZWVkIHRvIHJlZmFjdG9yIHRoaXMgYXMgb2Ygbm93IHRoZXJlIGFyZVxuICogbm90IG11Y2ggb3B0aW9uIHdpdGggYW5ndWxhci5cbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBcmliYUNvcmVNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlLFxuICAgICAgICBBV0NhcmRNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hMaXN0TW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBV0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBBV0N1cnJlbmN5TW9kdWxlLFxuICAgICAgICBBV0RhdGVBbmRUaW1lTW9kdWxlLFxuICAgICAgICBBV0RpYWxvZ01vZHVsZSxcbiAgICAgICAgQVdEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQVdHZW5lcmljQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdIeXBlcmxpbmtNb2R1bGUsXG4gICAgICAgIEFXSW5wdXRGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBBV092ZXJsYXlNb2R1bGUsXG4gICAgICAgIEFXUGFnZU5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICAgICAgQVdQYWdlV3JhcHBlck1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGUsXG4gICAgICAgIEFXUmljaFRleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV1Njcm9sbGFibGVDb250YWluZXJNb2R1bGUsXG4gICAgICAgIEFXU2VjdGlvbk1vZHVsZSxcbiAgICAgICAgQVdTdGVwcGVyTW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlLFxuICAgICAgICBBV1RleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV0Zvcm1UYWJsZU1vZHVsZSxcbiAgICAgICAgQVdCdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXSG92ZXJDYXJkTW9kdWxlLFxuICAgICAgICBBV0xpc3RNb2R1bGUsXG4gICAgICAgIEFXRGF0YXRhYmxlMk1vZHVsZSxcbiAgICAgICAgV2l6YXJkUHJvZ3Jlc3NNb2R1bGUsXG4gICAgICAgIFRvZ2dsZVN3aXRjaE1vZHVsZSxcblxuICAgICAgICAvLyBQcmltZU5HIHJlbW92ZSB3aGVuIGFsbCBBVyBhcmUgaW1wb3J0ZWRcbiAgICAgICAgUGFuZWxNb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgVG9vbGJhck1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRhcmVhTW9kdWxlLFxuICAgICAgICBBdXRvQ29tcGxldGVNb2R1bGUsXG4gICAgICAgIERyb3Bkb3duTW9kdWxlLFxuICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWVudU1vZHVsZSxcbiAgICAgICAgVGFiTWVudU1vZHVsZSxcbiAgICAgICAgQWNjb3JkaW9uTW9kdWxlLFxuICAgICAgICBFZGl0b3JNb2R1bGUsXG4gICAgICAgIERhdGFUYWJsZU1vZHVsZSxcbiAgICAgICAgUGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBPdmVybGF5UGFuZWxNb2R1bGUsXG4gICAgICAgIFRyZWVNb2R1bGVcblxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNweUxpZmVDeWNsZUhvb2tzRGlyZWN0aXZlLFxuICAgICAgICAvLyAzdGggcGFydHkgZGVjbGFyYXRpb25cbiAgICBdLFxuICAgIGJvb3RzdHJhcDogW10sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG5cbiAgICAgICAgLy8gUHJpbWVOR1xuICAgICAgICBDaGVja2JveCxcbiAgICAgICAgRGlhbG9nXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZSxcbiAgICAgICAgQVdDb3JlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBBV0Jhc2ljTmF2aWdhdG9yTW9kdWxlLFxuICAgICAgICBBV0NhcmRNb2R1bGUsXG4gICAgICAgIEFXQ2hlY2tCb3hMaXN0TW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBV0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBBV0N1cnJlbmN5TW9kdWxlLFxuICAgICAgICBBV0RhdGVBbmRUaW1lTW9kdWxlLFxuICAgICAgICBBV0RpYWxvZ01vZHVsZSxcbiAgICAgICAgQVdEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQVdHZW5lcmljQ2hvb3Nlck1vZHVsZSxcbiAgICAgICAgQVdIeXBlcmxpbmtNb2R1bGUsXG4gICAgICAgIEFXSW5wdXRGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdPdXRsaW5lRm9yTW9kdWxlLFxuICAgICAgICBBV092ZXJsYXlNb2R1bGUsXG4gICAgICAgIEFXUGFnZU5vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICAgICAgQVdQYWdlV3JhcHBlck1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdSYWRpb0J1dHRvbkxpc3RNb2R1bGUsXG4gICAgICAgIEFXUmljaFRleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV1Njcm9sbGFibGVDb250YWluZXJNb2R1bGUsXG4gICAgICAgIEFXU2VjdGlvbk1vZHVsZSxcbiAgICAgICAgQVdTdGVwcGVyTW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlLFxuICAgICAgICBBV1RleHRBcmVhTW9kdWxlLFxuICAgICAgICBBV0Zvcm1UYWJsZU1vZHVsZSxcbiAgICAgICAgRW1iZWRkZWRJdGVtRGlyZWN0aXZlLFxuICAgICAgICBBV0J1dHRvbk1vZHVsZSxcbiAgICAgICAgQVdIb3ZlckNhcmRNb2R1bGUsXG4gICAgICAgIEFXTGlzdE1vZHVsZSxcbiAgICAgICAgQVdEYXRhdGFibGUyTW9kdWxlLFxuICAgICAgICBXaXphcmRQcm9ncmVzc01vZHVsZSxcbiAgICAgICAgVG9nZ2xlU3dpdGNoTW9kdWxlLFxuXG4gICAgICAgIC8vIFByaW1lTkdcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBQYW5lbE1vZHVsZSxcbiAgICAgICAgQnV0dG9uTW9kdWxlLFxuICAgICAgICBUb29sYmFyTW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgICAgIEF1dG9Db21wbGV0ZU1vZHVsZSxcbiAgICAgICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIENhbGVuZGFyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWVudU1vZHVsZSxcbiAgICAgICAgVGFiTWVudU1vZHVsZSxcbiAgICAgICAgRWRpdG9yTW9kdWxlLFxuICAgICAgICBEYXRhVGFibGVNb2R1bGUsXG4gICAgICAgIFBhZ2luYXRvck1vZHVsZSxcbiAgICAgICAgT3ZlcmxheVBhbmVsTW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvbXBvbmVudHNNb2R1bGVcbntcblxuXG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyc1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcmliYUNvbXBvbmVudHNNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50UmVnaXN0cnksXG4gICAgICAgICAgICAgICAgRXJyb3JNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBEb21VdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIERhdGFQcm92aWRlcnMsXG4gICAgICAgICAgICAgICAgRGF0YUZpbmRlcnMsXG4gICAgICAgICAgICAgICAgQXdOYW1lU3RvcmUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHJlZ2lzdGVyQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW0NvbXBvbmVudFJlZ2lzdHJ5XSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wUmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5KTogRnVuY3Rpb25cbntcbiAgICByZXR1cm4gY29tcFJlZ2lzdHJ5LmluaXRpYWxpemUuYmluZChjb21wUmVnaXN0cnksIGNvbXBvbmVudHMpO1xufVxuXG5cbiJdfQ==