/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
 *  Checkbox list is a wrapper class around 'Checkbox' component to simply assembly of multi choice
 * component
 *
 * In Addition it adds ability to work with complex object. PrimeNG checkboxes work only with
 * primitive values.
 *
 * @see {\@link check-box/check-box.component.ts}
 *
 *
 * ### Example
 *
 *
 * \@Component({
 *       selector: 'showCheckBoxList' ,
 *       template: `
 *           <aw-checkbox-list [list]="checkBoxListValues" [selections]="selectedValues"
 *
 *            [name]="'myColors'" [formGroup]="formGroup" (onSelection)="onCBClick">
 *           </aw-checkbox-list>
 *       `
 *
 *       })
 *        class MyShowCLComponent
 *        {
 *            checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' ,
 *     'silver' , 'black' ,
 *            'Green' , 'Gray' , 'Navy' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *            selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *
 *            formGroup: FormGroup = new FormGroup({});
 *
 *
 *            onCBClick (event): void
 *            {
 *                console.log('onCBClick = ' + event);
 *            }
 *
 *        }
 * *
 */
export const /** @type {?} */ CB_LIST_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxListComponent),
    multi: true
};
export class CheckBoxListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} cd
     * @param {?} parentContainer
     */
    constructor(env, cd, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.cd = cd;
        this.parentContainer = parentContainer;
        /**
         * Fires event when checkbox is selected/clicked. Emits current clicked checkboxed. not the
         * actuall internal model value in this case array of choices
         *
         */
        this.onSelection = new EventEmitter();
        /**
         * Internal model
         */
        this.model = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.selections)) {
            this.selections = [];
        }
        this.registerFormControl(this.selections);
        this.updateModel(this.selections);
        this.onModelChanged(this.selections);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        let /** @type {?} */ updatedModel = [];
        this.model.forEach((index) => updatedModel.push(this.list[index]));
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
        this.cd.detectChanges();
    }
    /**
     * Label is extracted into this method so in the future we can play more how we want to display
     * the value. Since I want to support formatters for each components we might have a chance to
     * decide how label will look like.
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
     * @param {?} item
     * @return {?}
     */
    value(item) {
        return item;
    }
    /**
     * Delegate event outside of this component and convert indexed model to original objects
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        let /** @type {?} */ updatedModel = [];
        this.model.forEach((index) => {
            updatedModel.push(this.list[index]);
        });
        this.onSelection.emit(updatedModel);
        this.onModelChanged(updatedModel);
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
    }
    /**
     * Since we might be dealing with complex object store only INDEXes number in the model.
     *
     * @param {?} sourceList
     * @return {?}
     */
    updateModel(sourceList) {
        sourceList.forEach((item) => {
            let /** @type {?} */ index = this.list.findIndex((elem) => {
                return equals(item, elem);
            });
            this.model.push(index);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (isPresent(this.model) && isPresent(value)) {
            let /** @type {?} */ newModel = value;
            this.updateModel(newModel);
            // this.cd.markForCheck();
        }
    }
}
CheckBoxListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-checkbox-list',
                template: `<div *ngFor="let item of list; let i = index" class="ui-g">

    <!-- in the future we should be able to to support inline and stack-->
    <div class="ui-g-12">
        <aw-checkbox [(ngModel)]="model"
                     (ngModelChange)="onChange($event)"
                     [editable]="editable"
                     [isStandalone]="false"
                     [name]="name"
                     [value]="i"
                     [label]="labelValue(item)">

        </aw-checkbox>
    </div>

</div>

`,
                styles: [``],
                providers: [
                    CB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CheckBoxListComponent) }
                ]
            },] },
];
/** @nocollapse */
CheckBoxListComponent.ctorParameters = () => [
    { type: Environment },
    { type: ChangeDetectorRef },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
CheckBoxListComponent.propDecorators = {
    list: [{ type: Input }],
    selections: [{ type: Input }],
    onSelection: [{ type: Output }],
    labelFormatter: [{ type: Input }]
};
function CheckBoxListComponent_tsickle_Closure_declarations() {
    /**
     * List of values used to render checkboxes. Even we have here type as ANY we internally
     * support only string at the moment
     * @type {?}
     */
    CheckBoxListComponent.prototype.list;
    /**
     *  Selections are default CHECKED values passed. e.g. When rendering field favorite colors:
     * blue, red, yellow you will pass in here blue, red, then checkboxes with value blue, red wil
     * be rendered as check and yellow unchecked
     * @type {?}
     */
    CheckBoxListComponent.prototype.selections;
    /**
     * Fires event when checkbox is selected/clicked. Emits current clicked checkboxed. not the
     * actuall internal model value in this case array of choices
     *
     * @type {?}
     */
    CheckBoxListComponent.prototype.onSelection;
    /**
     * special expression to format label
     * @type {?}
     */
    CheckBoxListComponent.prototype.labelFormatter;
    /**
     * Internal model
     * @type {?}
     */
    CheckBoxListComponent.prototype.model;
    /** @type {?} */
    CheckBoxListComponent.prototype.env;
    /** @type {?} */
    CheckBoxListComponent.prototype.cd;
    /** @type {?} */
    CheckBoxListComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stYm94LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY2hlY2stYm94LWxpc3QvY2hlY2stYm94LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0R0RixNQUFNLENBQUMsdUJBQU0sOEJBQThCLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQThCRixNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7O0lBc0N4RCxZQUFtQixHQUFnQixFQUNmLElBRUUsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUxiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDZixPQUFFLEdBQUYsRUFBRTtRQUVBLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7OzJCQWpCdkIsSUFBSSxZ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WUFqTEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUVaLFNBQVMsRUFBRTtvQkFDUCw4QkFBOEI7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBQztpQkFDckY7YUFDSjs7OztZQXRGTyxXQUFXO1lBVmYsaUJBQWlCO1lBWWIsaUJBQWlCLHVCQTZIUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7OzttQkFsQzdFLEtBQUs7eUJBU0wsS0FBSzswQkFRTCxNQUFNOzZCQU1OLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogIENoZWNrYm94IGxpc3QgaXMgYSB3cmFwcGVyIGNsYXNzIGFyb3VuZCAnQ2hlY2tib3gnIGNvbXBvbmVudCB0byBzaW1wbHkgYXNzZW1ibHkgb2YgbXVsdGkgY2hvaWNlXG4gKiBjb21wb25lbnRcbiAqXG4gKiBJbiBBZGRpdGlvbiBpdCBhZGRzIGFiaWxpdHkgdG8gd29yayB3aXRoIGNvbXBsZXggb2JqZWN0LiBQcmltZU5HIGNoZWNrYm94ZXMgd29yayBvbmx5IHdpdGhcbiAqIHByaW1pdGl2ZSB2YWx1ZXMuXG4gKlxuICogQHNlZSB7QGxpbmsgY2hlY2stYm94L2NoZWNrLWJveC5jb21wb25lbnQudHN9XG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICpcbiAqICAgIEBDb21wb25lbnQoe1xuICogICAgICAgc2VsZWN0b3I6ICdzaG93Q2hlY2tCb3hMaXN0JyAsXG4gKiAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgIDxhdy1jaGVja2JveC1saXN0IFtsaXN0XT1cImNoZWNrQm94TGlzdFZhbHVlc1wiIFtzZWxlY3Rpb25zXT1cInNlbGVjdGVkVmFsdWVzXCJcbiAqXG4gKiAgICAgICAgICAgIFtuYW1lXT1cIidteUNvbG9ycydcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIChvblNlbGVjdGlvbik9XCJvbkNCQ2xpY2tcIj5cbiAqICAgICAgICAgICA8L2F3LWNoZWNrYm94LWxpc3Q+XG4gKiAgICAgICBgXG4gKlxuICogICAgICAgfSlcbiAqICAgICAgICBjbGFzcyBNeVNob3dDTENvbXBvbmVudFxuICogICAgICAgIHtcbiAqICAgICAgICAgICAgY2hlY2tCb3hMaXN0VmFsdWVzOiBzdHJpbmdbXSA9IFsnYmx1ZScgLCAncmVkJyAsICd5ZWxsb3cnICwgJ29yYW5nZScgLCAnd2hpdGUnICxcbiAqICAgICAnc2lsdmVyJyAsICdibGFjaycgLFxuICogICAgICAgICAgICAnR3JlZW4nICwgJ0dyYXknICwgJ05hdnknICwgJ09saXZlJyAsICdBcXVhJyAsICdQdXJwbGUnXTtcbiAqXG4gKiAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzOiBzdHJpbmdbXSA9IFsnYmx1ZScgLCAnT2xpdmUnICwgJ0FxdWEnICwgJ1B1cnBsZSddO1xuICpcbiAqXG4gKiAgICAgICAgICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKlxuICpcbiAqICAgICAgICAgICAgb25DQkNsaWNrIChldmVudCk6IHZvaWRcbiAqICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQ0JDbGljayA9ICcgKyBldmVudCk7XG4gKiAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgfVxuICoqXG4gKi9cblxuXG5cblxuZXhwb3J0IGNvbnN0IENCX0xJU1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrQm94TGlzdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jaGVja2JveC1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbGlzdDsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwidWktZ1wiPlxuXG4gICAgPCEtLSBpbiB0aGUgZnV0dXJlIHdlIHNob3VsZCBiZSBhYmxlIHRvIHRvIHN1cHBvcnQgaW5saW5lIGFuZCBzdGFjay0tPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyXCI+XG4gICAgICAgIDxhdy1jaGVja2JveCBbKG5nTW9kZWwpXT1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpc1N0YW5kYWxvbmVdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiaVwiXG4gICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwibGFiZWxWYWx1ZShpdGVtKVwiPlxuXG4gICAgICAgIDwvYXctY2hlY2tib3g+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG5gLFxuICAgIHN0eWxlczogW2BgXSxcblxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDQl9MSVNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tCb3hMaXN0Q29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrQm94TGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdFxue1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgdmFsdWVzIHVzZWQgdG8gcmVuZGVyIGNoZWNrYm94ZXMuIEV2ZW4gd2UgaGF2ZSBoZXJlIHR5cGUgYXMgQU5ZIHdlIGludGVybmFsbHlcbiAgICAgKiBzdXBwb3J0IG9ubHkgc3RyaW5nIGF0IHRoZSBtb21lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q6IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiAgU2VsZWN0aW9ucyBhcmUgZGVmYXVsdCBDSEVDS0VEIHZhbHVlcyBwYXNzZWQuIGUuZy4gV2hlbiByZW5kZXJpbmcgZmllbGQgZmF2b3JpdGUgY29sb3JzOlxuICAgICAqIGJsdWUsIHJlZCwgeWVsbG93IHlvdSB3aWxsIHBhc3MgaW4gaGVyZSBibHVlLCByZWQsIHRoZW4gY2hlY2tib3hlcyB3aXRoIHZhbHVlIGJsdWUsIHJlZCB3aWxcbiAgICAgKiBiZSByZW5kZXJlZCBhcyBjaGVjayBhbmQgeWVsbG93IHVuY2hlY2tlZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uczogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyBldmVudCB3aGVuIGNoZWNrYm94IGlzIHNlbGVjdGVkL2NsaWNrZWQuIEVtaXRzIGN1cnJlbnQgY2xpY2tlZCBjaGVja2JveGVkLiBub3QgdGhlXG4gICAgICogYWN0dWFsbCBpbnRlcm5hbCBtb2RlbCB2YWx1ZSBpbiB0aGlzIGNhc2UgYXJyYXkgb2YgY2hvaWNlc1xuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBzcGVjaWFsIGV4cHJlc3Npb24gdG8gZm9ybWF0IGxhYmVsXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbW9kZWxcbiAgICAgKi9cbiAgICBtb2RlbDogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbnMpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy5zZWxlY3Rpb25zKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnNlbGVjdGlvbnMpO1xuICAgIH1cblxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB1cGRhdGVkTW9kZWw6IGFueVtdID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbC5mb3JFYWNoKChpbmRleDogbnVtYmVyKSA9PiB1cGRhdGVkTW9kZWwucHVzaCh0aGlzLmxpc3RbaW5kZXhdKSk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodXBkYXRlZE1vZGVsLCB7XG4gICAgICAgICAgICBlbWl0RXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTGFiZWwgaXMgZXh0cmFjdGVkIGludG8gdGhpcyBtZXRob2Qgc28gaW4gdGhlIGZ1dHVyZSB3ZSBjYW4gcGxheSBtb3JlIGhvdyB3ZSB3YW50IHRvIGRpc3BsYXlcbiAgICAgKiB0aGUgdmFsdWUuIFNpbmNlIEkgd2FudCB0byBzdXBwb3J0IGZvcm1hdHRlcnMgZm9yIGVhY2ggY29tcG9uZW50cyB3ZSBtaWdodCBoYXZlIGEgY2hhbmNlIHRvXG4gICAgICogZGVjaWRlIGhvdyBsYWJlbCB3aWxsIGxvb2sgbGlrZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGxhYmVsVmFsdWUoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGFiZWxGb3JtYXR0ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbEZvcm1hdHRlcihpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gdGhpcyB2ZXJzaW9uIG9mIGNoZWNrYm94ZXMgd2Ugc3RpbGwgZXhwZWN0IG9ubHkgcHJpbWl0aXZlIHR5cGVzLiBLZWVwIHRoaXMgZnVuY3Rpb25hbGl0eVxuICAgICAqIGluIGV4dHJhIG1ldGhvZCBzbyB3ZSBjYW4gd29yayB3aXRoIGl0IGV2ZW4gbm93IHdlIGp1c3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2tcbiAgICAgKi9cbiAgICB2YWx1ZShpdGVtOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGV2ZW50IG91dHNpZGUgb2YgdGhpcyBjb21wb25lbnQgYW5kIGNvbnZlcnQgaW5kZXhlZCBtb2RlbCB0byBvcmlnaW5hbCBvYmplY3RzXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNb2RlbDogYW55W10gPSBbXTtcblxuICAgICAgICB0aGlzLm1vZGVsLmZvckVhY2goKGluZGV4OiBudW1iZXIpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZWRNb2RlbC5wdXNoKHRoaXMubGlzdFtpbmRleF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodXBkYXRlZE1vZGVsKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh1cGRhdGVkTW9kZWwpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHVwZGF0ZWRNb2RlbCwge1xuICAgICAgICAgICAgZW1pdEV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIG1pZ2h0IGJlIGRlYWxpbmcgd2l0aCBjb21wbGV4IG9iamVjdCBzdG9yZSBvbmx5IElOREVYZXMgbnVtYmVyIGluIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZU1vZGVsKHNvdXJjZUxpc3Q6IGFueVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgc291cmNlTGlzdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubGlzdC5maW5kSW5kZXgoKGVsZW06IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXF1YWxzKGl0ZW0sIGVsZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnB1c2goaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9kZWwpICYmIGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdNb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChuZXdNb2RlbCk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=