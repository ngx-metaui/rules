/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
 * Wrapper class for RadioButton component providing convenient way to to render RadioButton Groups
 *
 *
 * ### Example
 *
 *
 * ```
 * \@Component({
 *          selector: 'gender-selector' ,
 *          template: `
 *              <aw-radiobutton-list [list]="rbListValues" [layout]="layout"
 *     [selection]="selectedValue" [name]="'name'">
 *               </aw-radiobutton-list>
 *      `
 *      })
 *      export class GenderSelectorComponent
 *      {
 *          rbListValues: string[] = ['male' , 'female' , 'other'];
 *          selectedValue: string = 'other';
 *          layout: string = 'stacked';
 *
 *
 *          formGroup: FormGroup = new FormGroup({});
 *
 *
 *          onCBClick (event): void
 *          {
 *              console.log('onCBClick = ' + event);
 *          }
 *
 *      }
 *
 * ```
 */
export const /** @type {?} */ RB_LIST_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonListComponent),
    multi: true
};
export class RadioButtonListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * Fires an event when radio button is selected
         *
         */
        this.onSelection = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.selection)) {
            this.model = 0;
        }
        this.updateModel(this.selection);
        this.onModelChanged(this.selection);
        this.registerFormControl(this.selection);
    }
    /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     * @param {?} item
     * @return {?}
     */
    labelValue(item) {
        if (isPresent(this.labelFormatter)) {
            return this.labelFormatter(item);
        }
        return item.toString();
    }
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     * @param {?} item
     * @return {?}
     */
    value(item) {
        return item;
    }
    /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        let /** @type {?} */ updatedModel = this.list[this.model];
        this.onSelection.emit(updatedModel);
        this.onModelChanged(updatedModel);
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
    }
    /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     * @param {?} souceItem
     * @return {?}
     */
    updateModel(souceItem) {
        let /** @type {?} */ index = this.list.findIndex((elem) => {
            return souceItem === elem;
        });
        this.model = index === -1 ? 0 : index;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        let /** @type {?} */ updatedModel = this.list[this.model];
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
        // this.cd.detectChanges();
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            let /** @type {?} */ newModel = value;
            this.updateModel(newModel);
        }
    }
}
RadioButtonListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-radiobutton-list',
                template: `<div *ngFor="let item of list;  let i = index" class="ui-g">

    <div class="ui-g-12">
        <aw-radiobutton
            [(ngModel)]="model"
            (ngModelChange)="onChange($event)"
            [isStandalone]="false"
            [name]="name"
            [value]="i"
            [label]="labelValue(item)">
        </aw-radiobutton>
    </div>

</div>
`,
                styles: [``],
                providers: [
                    RB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonListComponent) }
                ]
            },] },
];
/** @nocollapse */
RadioButtonListComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RadioButtonListComponent.propDecorators = {
    list: [{ type: Input }],
    selection: [{ type: Input }],
    labelFormatter: [{ type: Input }],
    onSelection: [{ type: Output }]
};
function RadioButtonListComponent_tsickle_Closure_declarations() {
    /**
     * LIst of values used to render the radio button group
     * @type {?}
     */
    RadioButtonListComponent.prototype.list;
    /**
     * Identifies which radio buttons is selected when rendered
     * @type {?}
     */
    RadioButtonListComponent.prototype.selection;
    /**
     * special expression to format label
     * @type {?}
     */
    RadioButtonListComponent.prototype.labelFormatter;
    /**
     *
     * Fires an event when radio button is selected
     *
     * @type {?}
     */
    RadioButtonListComponent.prototype.onSelection;
    /**
     * internal model to listen for radio value changes
     *
     * @type {?}
     */
    RadioButtonListComponent.prototype.model;
    /** @type {?} */
    RadioButtonListComponent.prototype.env;
    /** @type {?} */
    RadioButtonListComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW8tYnV0dG9uLWxpc3QvcmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDdEYsTUFBTSxDQUFDLHVCQUFNLDhCQUE4QixHQUFRO0lBQy9DLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUEyQkYsTUFBTSwrQkFBZ0MsU0FBUSxpQkFBaUI7Ozs7O0lBdUMzRCxZQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7MkJBWHZCLElBQUksWUFBWSxFQUFPO0tBY3ZEOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUM7Ozs7Ozs7OztJQVNELFVBQVUsQ0FBQyxJQUFTO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7Ozs7O0lBU0QsS0FBSyxDQUFDLElBQVM7UUFFWCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7OztJQVNELFFBQVEsQ0FBQyxLQUFVO1FBRWYscUJBQUksWUFBWSxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3BDLFNBQVMsRUFBRSxJQUFJO1lBQ2YscUJBQXFCLEVBQUUsS0FBSztTQUMvQixDQUFDLENBQUM7S0FDTjs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxTQUFjO1FBRXRCLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBRTFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO1NBQzdCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUN6Qzs7OztJQUVELGtCQUFrQjtRQUVkLHFCQUFJLFlBQVksR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDcEMsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxLQUFLO1NBQy9CLENBQUMsQ0FBQzs7S0FHTjs7Ozs7OztJQU1ELFVBQVUsQ0FBQyxLQUFVO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixxQkFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7S0FFSjs7O1lBcktKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0NBY2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRTtvQkFDUCw4QkFBOEI7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBQztpQkFDeEY7YUFFSjs7OztZQXhFTyxXQUFXO1lBQ1gsaUJBQWlCLHVCQWdIUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7OzttQkFsQzdFLEtBQUs7d0JBT0wsS0FBSzs2QkFPTCxLQUFLOzBCQVNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIGZvciBSYWRpb0J1dHRvbiBjb21wb25lbnQgcHJvdmlkaW5nIGNvbnZlbmllbnQgd2F5IHRvIHRvIHJlbmRlciBSYWRpb0J1dHRvbiBHcm91cHNcbiAqXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKlxuICogYGBgXG4gKiAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgc2VsZWN0b3I6ICdnZW5kZXItc2VsZWN0b3InICxcbiAqICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgPGF3LXJhZGlvYnV0dG9uLWxpc3QgW2xpc3RdPVwicmJMaXN0VmFsdWVzXCIgW2xheW91dF09XCJsYXlvdXRcIlxuICogICAgIFtzZWxlY3Rpb25dPVwic2VsZWN0ZWRWYWx1ZVwiIFtuYW1lXT1cIiduYW1lJ1wiPlxuICogICAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uLWxpc3Q+XG4gKiAgICAgIGBcbiAqICAgICAgfSlcbiAqICAgICAgZXhwb3J0IGNsYXNzIEdlbmRlclNlbGVjdG9yQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIHJiTGlzdFZhbHVlczogc3RyaW5nW10gPSBbJ21hbGUnICwgJ2ZlbWFsZScgLCAnb3RoZXInXTtcbiAqICAgICAgICAgIHNlbGVjdGVkVmFsdWU6IHN0cmluZyA9ICdvdGhlcic7XG4gKiAgICAgICAgICBsYXlvdXQ6IHN0cmluZyA9ICdzdGFja2VkJztcbiAqXG4gKlxuICogICAgICAgICAgZm9ybUdyb3VwOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAqXG4gKlxuICogICAgICAgICAgb25DQkNsaWNrIChldmVudCk6IHZvaWRcbiAqICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25DQkNsaWNrID0gJyArIGV2ZW50KTtcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgIH1cbiAqXG4gKiBgYGBcbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBSQl9MSVNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYWRpb0J1dHRvbkxpc3RDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcmFkaW9idXR0b24tbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxpc3Q7ICBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJ1aS1nXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidWktZy0xMlwiPlxuICAgICAgICA8YXctcmFkaW9idXR0b25cbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbaXNTdGFuZGFsb25lXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImlcIlxuICAgICAgICAgICAgW2xhYmVsXT1cImxhYmVsVmFsdWUoaXRlbSlcIj5cbiAgICAgICAgPC9hdy1yYWRpb2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUkJfTElTVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogTElzdCBvZiB2YWx1ZXMgdXNlZCB0byByZW5kZXIgdGhlIHJhZGlvIGJ1dHRvbiBncm91cFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgd2hpY2ggcmFkaW8gYnV0dG9ucyBpcyBzZWxlY3RlZCB3aGVuIHJlbmRlcmVkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb246IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogc3BlY2lhbCBleHByZXNzaW9uIHRvIGZvcm1hdCBsYWJlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWxGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRmlyZXMgYW4gZXZlbnQgd2hlbiByYWRpbyBidXR0b24gaXMgc2VsZWN0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBtb2RlbCB0byBsaXN0ZW4gZm9yIHJhZGlvIHZhbHVlIGNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIG1vZGVsOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBMYWJlbCBpcyBleHRyYWN0ZWQgaW50byBhIG1ldGhvZCBzbyBpbiB0aGUgZnV0dXJlIHdlIGNhbiBwbGF5IGhvdyB3ZSB3YW50IHRvIGRpc3BsYXkgdGhlXG4gICAgICogdmFsdWUuIFNpbmNlIEkgd2FudCB0byBzdXBwb3J0IGZvcm1hdHRlcnMgZm9yIGVhY2ggY29tcG9uZW50cyB3ZSBtaWdodCBoYXZlIGEgY2hhbmNlIHRvXG4gICAgICogZGVjaWRlIGhvdyB0aGUgbGFiZWwgd2lsbCBsb29rIGxpa2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBsYWJlbFZhbHVlKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxhYmVsRm9ybWF0dGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxGb3JtYXR0ZXIoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluIHRoaXMgdmVyc2lvbiBvZiBjaGVja2JveGVzIHdlIHN0aWxsIGV4cGVjdCBvbmx5IHByaW1pdGl2ZSB0eXBlcy4gS2VlcCB0aGlzIGZ1bmN0aW9uYWxpdHlcbiAgICAgKiBpbiBleHRyYSBtZXRob2Qgc28gd2UgY2FuIHdvcmsgd2l0aCBpdCBldmVuIG5vdyB3ZSBqdXN0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHZhbHVlKGl0ZW06IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE9uIE5HTW9kZWwgY2hhbmdlIHJldHJpZXZlIGFjdHVhbCByZWNvcmQgYmFzZWQgb24gdGhlIElOREVYIGFuZCBwcm9wYWdhdGUgaXQgdG8gYm90aFxuICAgICAqIG5nTW9kZWwgYXMgd2VsbCBhcyBGb3JtR3JvdXAuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNb2RlbDogYW55ID0gdGhpcy5saXN0W3RoaXMubW9kZWxdO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh1cGRhdGVkTW9kZWwpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHVwZGF0ZWRNb2RlbCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodXBkYXRlZE1vZGVsLCB7XG4gICAgICAgICAgICBlbWl0RXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgbWlnaHQgYmUgZGVhbGluZyB3aXRoIGNvbXBsZXggb2JqZWN0IHN0b3JlIG9ubHkgSU5ERVggbnVtYmVyIGluIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZU1vZGVsKHNvdWNlSXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5saXN0LmZpbmRJbmRleCgoZWxlbTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gc291Y2VJdGVtID09PSBlbGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IGluZGV4ID09PSAtMSA/IDAgOiBpbmRleDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNb2RlbDogYW55ID0gdGhpcy5saXN0W3RoaXMubW9kZWxdO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHVwZGF0ZWRNb2RlbCwge1xuICAgICAgICAgICAgZW1pdEV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbmV3TW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwobmV3TW9kZWwpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=