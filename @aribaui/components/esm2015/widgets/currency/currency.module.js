/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, InputTextModule } from 'primeng/primeng';
import { CurrencyComponent } from './currency.component';
import { AWStringFieldModule } from '../string/string.module';
import { AWDropdownModule } from '../dropdown/dropdown.module';
import { AWCoreComponentModule } from '../../core/core.module';
export class AWCurrencyModule {
}
AWCurrencyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CurrencyComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextModule,
                    DropdownModule,
                    AWDropdownModule,
                    AWStringFieldModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    CurrencyComponent
                ],
                exports: [
                    CurrencyComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: [CurrencyPipe]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY3VycmVuY3kvY3VycmVuY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFFLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBMEI3RCxNQUFNOzs7WUF4QkwsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLHFCQUFxQjtpQkFDeEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLGlCQUFpQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgQ3VycmVuY3lQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEcm9wZG93bk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtDdXJyZW5jeUNvbXBvbmVudH0gZnJvbSAnLi9jdXJyZW5jeS5jb21wb25lbnQnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5pbXBvcnQge0FXRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4uL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQge0FXQ29yZUNvbXBvbmVudE1vZHVsZX0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEN1cnJlbmN5Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIEFXRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIEFXU3RyaW5nRmllbGRNb2R1bGUsXG4gICAgICAgIEFXQ29yZUNvbXBvbmVudE1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIEN1cnJlbmN5Q29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEN1cnJlbmN5Q29tcG9uZW50LFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbQ3VycmVuY3lQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBBV0N1cnJlbmN5TW9kdWxlXG57XG59XG5cblxuIl19