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
/**
 * @param {?} compRegistry
 * @return {?}
 */
export function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLGNBQWMsRUFDZCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxn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aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLG1CQUFtQjtvQkFDbkIsV0FBVztvQkFDWCwwQkFBMEI7b0JBQzFCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixzQkFBc0I7b0JBQ3RCLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2Ysd0JBQXdCO29CQUN4QixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0IsZUFBZTtvQkFDZixlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLFlBQVk7b0JBQ1osa0JBQWtCO29CQUdsQixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsWUFBWTtvQkFDWixVQUFVO29CQUNWLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysa0JBQWtCO2lCQUNyQjthQUNKOzs7Ozs7QUE2QkQsTUFBTSw2QkFBOEIsWUFBK0I7SUFFL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBBY2NvcmRpb25Nb2R1bGUsXG4gICAgQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vZHVsZSxcbiAgICBDaGVja2JveCxcbiAgICBDaGVja2JveE1vZHVsZSxcbiAgICBEYXRhVGFibGVNb2R1bGUsXG4gICAgRGlhbG9nLFxuICAgIERpYWxvZ01vZHVsZSxcbiAgICBEcm9wZG93bk1vZHVsZSxcbiAgICBFZGl0b3JNb2R1bGUsXG4gICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgTWVudU1vZHVsZSxcbiAgICBPdmVybGF5UGFuZWxNb2R1bGUsXG4gICAgUGFnaW5hdG9yTW9kdWxlLFxuICAgIFBhbmVsTW9kdWxlLFxuICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBUYWJNZW51TW9kdWxlLFxuICAgIFRvb2xiYXJNb2R1bGVcbn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7QXJpYmFDb3JlTW9kdWxlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7U3B5TGlmZUN5Y2xlSG9va3NEaXJlY3RpdmV9IGZyb20gJy4vc3B5LWxpZmVjeWNsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtFbWJlZGRlZEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vY29yZS9lbWJlZGRlZC1pdGVtJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4vY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4vZW50cnktY29tcG9uZW50cyc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7QVdCYXNpY05hdmlnYXRvck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Jhc2ljLW5hdmlnYXRvci9iYXNpYy1uYXZpZ2F0b3IubW9kdWxlJztcbmltcG9ydCB7QVdDaGVja0JveExpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9jaGVjay1ib3gtbGlzdC9jaGVjay1ib3gtbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtBV0NoZWNrQm94TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvY2hlY2tib3gvY2hlY2stYm94Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2hvb3Nlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2Nob29zZXIvY2hvb3Nlci5tb2R1bGUnO1xuaW1wb3J0IHtBV0NvbmZpcm1hdGlvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24ubW9kdWxlJztcbmltcG9ydCB7QVdDdXJyZW5jeU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2N1cnJlbmN5L2N1cnJlbmN5Lm1vZHVsZSc7XG5pbXBvcnQge0FXRGF0ZUFuZFRpbWVNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGEtYW5kLXRpbWUubW9kdWxlJztcbmltcG9ydCB7QVdEaWFsb2dNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kaWFsb2cvZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQge0FXRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHtBV0dlbmVyaWNDaG9vc2VyTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvZ2VuZXJpYy1jaG9vc2VyL2dlbmVyaWMtY2hvb3Nlci5tb2R1bGUnO1xuaW1wb3J0IHtBV0h5cGVybGlua01vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2h5cGVybGluay9oeXBlcmxpbmsubW9kdWxlJztcbmltcG9ydCB7QVdJbnB1dEZpZWxkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7QVdPdXRsaW5lRm9yTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvb3V0bGluZS9vdXRsaW5lLWZvci5tb2R1bGUnO1xuaW1wb3J0IHtBV092ZXJsYXlNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9vdmVybGF5L292ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7QVdQYWdlTm90aWZpY2F0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7QVdQYWdlV3JhcHBlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLXdyYXBwZXIubW9kdWxlJztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7QVdSYWRpb0J1dHRvbkxpc3RNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9yYWRpby1idXR0b24tbGlzdC9yYWRpby1idXR0b24tbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtBV1JpY2hUZXh0QXJlYU1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3JpY2gtdGV4dC1hcmVhL3JpY2gtdGV4dC1hcmVhLm1vZHVsZSc7XG5pbXBvcnQge0FXSG92ZXJDYXJkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvaG92ZXItY2FyZC9ob3Zlci1jYXJkLm1vZHVsZSc7XG5pbXBvcnQge1xuICAgIEFXU2Nyb2xsYWJsZUNvbnRhaW5lck1vZHVsZVxufSBmcm9tICcuL3dpZGdldHMvc2Nyb2xsYWJsZS1jb250YWluZXIvc2Nyb2xsYWJsZS1jb250YWluZXIubW9kdWxlJztcbmltcG9ydCB7QVdTZWN0aW9uTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc2VjdGlvbi9zZWN0aW9uLm1vZHVsZSc7XG5pbXBvcnQge0FXU3RlcHBlck1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL3N0ZXBwZXIvc3RlcHBlci5tb2R1bGUnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvc3RyaW5nL3N0cmluZy5tb2R1bGUnO1xuaW1wb3J0IHtBV1RleHRBcmVhTW9kdWxlfSBmcm9tICcuL3dpZGdldHMvdGV4dC1hcmVhL3RleHQtYXJlYS5tb2R1bGUnO1xuaW1wb3J0IHtBV0J1dHRvbk1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7QVdGb3JtVGFibGVNb2R1bGV9IGZyb20gJy4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUubW9kdWxlJztcbmltcG9ydCB7QVdMaXN0TW9kdWxlfSBmcm9tICcuL3dpZGdldHMvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQge0FXQ2FyZE1vZHVsZX0gZnJvbSAnLi93aWRnZXRzL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHtBV0RhdGF0YWJsZTJNb2R1bGV9IGZyb20gJy4vd2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIubW9kdWxlJztcbmltcG9ydCB7RG9tVXRpbHNTZXJ2aWNlfSBmcm9tICcuL2NvcmUvZG9tLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtNb2RhbFNlcnZpY2V9IGZyb20gJy4vY29yZS9tb2RhbC1zZXJ2aWNlL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge0RhdGFGaW5kZXJzfSBmcm9tICcuL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtFcnJvck1hbmFnZXJTZXJ2aWNlfSBmcm9tICcuL2NvcmUvZXJyb3ItbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7QXdOYW1lU3RvcmV9IGZyb20gJy4vY29yZS9hdy1uYW1lL2F3LW5hbWUuc3RvcmUnO1xuaW1wb3J0IHtEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnl9IGZyb20gJy4vY29yZS9kYXRhL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCBtb2R1bGUgaXMgY29yZSBtb2R1bGUgZm9yIHRoZSBjb21tb24gbGF5b3V0cyBhbmQgd2lkZ2V0cyBsaWJyYXJpZXMuXG4gKlxuICogdG9kbzogVGhlcmUgYXJlIHNvbWUgdGhpbmdzIHRoYXQgSSBzdGlsbCBuZWVkIHRvIHJlc29sdmUgLSBwbGVhc2Ugc2VlIGFuZCBub3RpY2VzIEBEdXBsaWNhdGVzXG4gKiBqc2RvYyBJIHdhbnQgdG8ga2VlcCB0aGlzIHRoZXJlIHRvIHJlbWluZCBtZSB0aGF0IEkgbmVlZCB0byByZWZhY3RvciB0aGlzIGFzIG9mIG5vdyB0aGVyZSBhcmVcbiAqIG5vdCBtdWNoIG9wdGlvbiB3aXRoIGFuZ3VsYXIuXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQXJpYmFDb3JlTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgQVdCYXNpY05hdmlnYXRvck1vZHVsZSxcbiAgICAgICAgQVdDYXJkTW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TGlzdE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveE1vZHVsZSxcbiAgICAgICAgQVdDaG9vc2VyTW9kdWxlLFxuICAgICAgICBBV0NvbmZpcm1hdGlvbk1vZHVsZSxcbiAgICAgICAgQVdDdXJyZW5jeU1vZHVsZSxcbiAgICAgICAgQVdEYXRlQW5kVGltZU1vZHVsZSxcbiAgICAgICAgQVdEaWFsb2dNb2R1bGUsXG4gICAgICAgIEFXRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIEFXR2VuZXJpY0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXSHlwZXJsaW5rTW9kdWxlLFxuICAgICAgICBBV0lucHV0RmllbGRNb2R1bGUsXG4gICAgICAgIEFXT3V0bGluZUZvck1vZHVsZSxcbiAgICAgICAgQVdPdmVybGF5TW9kdWxlLFxuICAgICAgICBBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGUsXG4gICAgICAgIEFXUGFnZVdyYXBwZXJNb2R1bGUsXG4gICAgICAgIEFXUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXUmFkaW9CdXR0b25MaXN0TW9kdWxlLFxuICAgICAgICBBV1JpY2hUZXh0QXJlYU1vZHVsZSxcbiAgICAgICAgQVdTY3JvbGxhYmxlQ29udGFpbmVyTW9kdWxlLFxuICAgICAgICBBV1NlY3Rpb25Nb2R1bGUsXG4gICAgICAgIEFXU3RlcHBlck1vZHVsZSxcbiAgICAgICAgQVdTdHJpbmdGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdUZXh0QXJlYU1vZHVsZSxcbiAgICAgICAgQVdGb3JtVGFibGVNb2R1bGUsXG4gICAgICAgIEFXQnV0dG9uTW9kdWxlLFxuICAgICAgICBBV0hvdmVyQ2FyZE1vZHVsZSxcbiAgICAgICAgQVdMaXN0TW9kdWxlLFxuICAgICAgICBBV0RhdGF0YWJsZTJNb2R1bGUsXG5cbiAgICAgICAgLy8gUHJpbWVORyByZW1vdmUgd2hlbiBhbGwgQVcgYXJlIGltcG9ydGVkXG4gICAgICAgIFBhbmVsTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFRvb2xiYXJNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICAgICAgQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgICAgICBEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgICAgIENoZWNrYm94TW9kdWxlLFxuICAgICAgICBSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBEaWFsb2dNb2R1bGUsXG4gICAgICAgIE1lbnVNb2R1bGUsXG4gICAgICAgIFRhYk1lbnVNb2R1bGUsXG4gICAgICAgIEFjY29yZGlvbk1vZHVsZSxcbiAgICAgICAgRWRpdG9yTW9kdWxlLFxuICAgICAgICBEYXRhVGFibGVNb2R1bGUsXG4gICAgICAgIFBhZ2luYXRvck1vZHVsZSxcbiAgICAgICAgT3ZlcmxheVBhbmVsTW9kdWxlXG5cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTcHlMaWZlQ3ljbGVIb29rc0RpcmVjdGl2ZSxcbiAgICAgICAgLy8gM3RoIHBhcnR5IGRlY2xhcmF0aW9uXG4gICAgXSxcbiAgICBib290c3RyYXA6IFtdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuXG4gICAgICAgIC8vIFByaW1lTkdcbiAgICAgICAgQ2hlY2tib3gsXG4gICAgICAgIERpYWxvZ1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgU3B5TGlmZUN5Y2xlSG9va3NEaXJlY3RpdmUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgQVdCYXNpY05hdmlnYXRvck1vZHVsZSxcbiAgICAgICAgQVdDYXJkTW9kdWxlLFxuICAgICAgICBBV0NoZWNrQm94TGlzdE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveE1vZHVsZSxcbiAgICAgICAgQVdDaG9vc2VyTW9kdWxlLFxuICAgICAgICBBV0NvbmZpcm1hdGlvbk1vZHVsZSxcbiAgICAgICAgQVdDdXJyZW5jeU1vZHVsZSxcbiAgICAgICAgQVdEYXRlQW5kVGltZU1vZHVsZSxcbiAgICAgICAgQVdEaWFsb2dNb2R1bGUsXG4gICAgICAgIEFXRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIEFXR2VuZXJpY0Nob29zZXJNb2R1bGUsXG4gICAgICAgIEFXSHlwZXJsaW5rTW9kdWxlLFxuICAgICAgICBBV0lucHV0RmllbGRNb2R1bGUsXG4gICAgICAgIEFXT3V0bGluZUZvck1vZHVsZSxcbiAgICAgICAgQVdPdmVybGF5TW9kdWxlLFxuICAgICAgICBBV1BhZ2VOb3RpZmljYXRpb25Nb2R1bGUsXG4gICAgICAgIEFXUGFnZVdyYXBwZXJNb2R1bGUsXG4gICAgICAgIEFXUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXUmFkaW9CdXR0b25MaXN0TW9kdWxlLFxuICAgICAgICBBV1JpY2hUZXh0QXJlYU1vZHVsZSxcbiAgICAgICAgQVdTY3JvbGxhYmxlQ29udGFpbmVyTW9kdWxlLFxuICAgICAgICBBV1NlY3Rpb25Nb2R1bGUsXG4gICAgICAgIEFXU3RlcHBlck1vZHVsZSxcbiAgICAgICAgQVdTdHJpbmdGaWVsZE1vZHVsZSxcbiAgICAgICAgQVdUZXh0QXJlYU1vZHVsZSxcbiAgICAgICAgQVdGb3JtVGFibGVNb2R1bGUsXG4gICAgICAgIEVtYmVkZGVkSXRlbURpcmVjdGl2ZSxcbiAgICAgICAgQVdCdXR0b25Nb2R1bGUsXG4gICAgICAgIEFXSG92ZXJDYXJkTW9kdWxlLFxuICAgICAgICBBV0xpc3RNb2R1bGUsXG4gICAgICAgIEFXRGF0YXRhYmxlMk1vZHVsZSxcblxuICAgICAgICAvLyBQcmltZU5HXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgUGFuZWxNb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgVG9vbGJhck1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBJbnB1dFRleHRhcmVhTW9kdWxlLFxuICAgICAgICBBdXRvQ29tcGxldGVNb2R1bGUsXG4gICAgICAgIERyb3Bkb3duTW9kdWxlLFxuICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBEaWFsb2dNb2R1bGUsXG4gICAgICAgIE1lbnVNb2R1bGUsXG4gICAgICAgIFRhYk1lbnVNb2R1bGUsXG4gICAgICAgIEVkaXRvck1vZHVsZSxcbiAgICAgICAgRGF0YVRhYmxlTW9kdWxlLFxuICAgICAgICBQYWdpbmF0b3JNb2R1bGUsXG4gICAgICAgIE92ZXJsYXlQYW5lbE1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXJpYmFDb21wb25lbnRzTW9kdWxlXG57XG5cblxuICAgIHN0YXRpYyBmb3JSb290ICgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFyaWJhQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIE1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBDb21wb25lbnRSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBFcnJvck1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIERvbVV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgICBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgRGF0YVByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICBEYXRhRmluZGVycyxcbiAgICAgICAgICAgICAgICBBd05hbWVTdG9yZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogcmVnaXN0ZXJDb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbQ29tcG9uZW50UmVnaXN0cnldLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnRzIChjb21wUmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5KTogRnVuY3Rpb25cbntcbiAgICByZXR1cm4gY29tcFJlZ2lzdHJ5LmluaXRpYWxpemUuYmluZChjb21wUmVnaXN0cnksIGNvbXBvbmVudHMpO1xufVxuXG5cbiJdfQ==