/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
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
  @type {?} */
export const CB_LIST_CONTROL_VALUE_ACCESSOR = {
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
        /** @type {?} */
        let updatedModel = [];
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
        /** @type {?} */
        let updatedModel = [];
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
            /** @type {?} */
            let index = this.list.findIndex((elem) => {
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
            /** @type {?} */
            let newModel = value;
            this.updateModel(newModel);
            // this.cd.markForCheck();
        }
    }
}
CheckBoxListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-checkbox-list',
                template: "<div *ngFor=\"let item of list; let i = index\" class=\"ui-g\">\n\n    <!-- in the future we should be able to to support inline and stack-->\n    <div class=\"ui-g-12\">\n        <aw-checkbox [(ngModel)]=\"model\"\n                     (ngModelChange)=\"onChange($event)\"\n                     [editable]=\"editable\"\n                     [isStandalone]=\"false\"\n                     [name]=\"name\"\n                     [value]=\"i\"\n                     [label]=\"labelValue(item)\">\n\n        </aw-checkbox>\n    </div>\n\n</div>\n\n",
                providers: [
                    CB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CheckBoxListComponent) }
                ],
                styles: [""]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stYm94LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY2hlY2stYm94LWxpc3QvY2hlY2stYm94LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0R0RixhQUFhLDhCQUE4QixHQUFRO0lBQy9DLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFhRixNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7O0lBc0N4RCxZQUFtQixHQUFnQixFQUNmLElBRUUsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUxiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDZixPQUFFLEdBQUYsRUFBRTtRQUVBLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7OzJCQWpCdkIsSUFBSSxZQUFZLEVBQU87Ozs7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QUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDRpQkFBNEM7Z0JBRzVDLFNBQVMsRUFBRTtvQkFDUCw4QkFBOEI7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBQztpQkFDckY7O2FBQ0o7Ozs7WUFyRU8sV0FBVztZQVZmLGlCQUFpQjtZQVliLGlCQUFpQix1QkE0R1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDOzs7bUJBbEM3RSxLQUFLO3lCQVNMLEtBQUs7MEJBUUwsTUFBTTs2QkFNTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBlcXVhbHMsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuXG4vKipcbiAqICBDaGVja2JveCBsaXN0IGlzIGEgd3JhcHBlciBjbGFzcyBhcm91bmQgJ0NoZWNrYm94JyBjb21wb25lbnQgdG8gc2ltcGx5IGFzc2VtYmx5IG9mIG11bHRpIGNob2ljZVxuICogY29tcG9uZW50XG4gKlxuICogSW4gQWRkaXRpb24gaXQgYWRkcyBhYmlsaXR5IHRvIHdvcmsgd2l0aCBjb21wbGV4IG9iamVjdC4gUHJpbWVORyBjaGVja2JveGVzIHdvcmsgb25seSB3aXRoXG4gKiBwcmltaXRpdmUgdmFsdWVzLlxuICpcbiAqIEBzZWUge0BsaW5rIGNoZWNrLWJveC9jaGVjay1ib3guY29tcG9uZW50LnRzfVxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqXG4gKiAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgIHNlbGVjdG9yOiAnc2hvd0NoZWNrQm94TGlzdCcgLFxuICogICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICA8YXctY2hlY2tib3gtbGlzdCBbbGlzdF09XCJjaGVja0JveExpc3RWYWx1ZXNcIiBbc2VsZWN0aW9uc109XCJzZWxlY3RlZFZhbHVlc1wiXG4gKlxuICogICAgICAgICAgICBbbmFtZV09XCInbXlDb2xvcnMnXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiAob25TZWxlY3Rpb24pPVwib25DQkNsaWNrXCI+XG4gKiAgICAgICAgICAgPC9hdy1jaGVja2JveC1saXN0PlxuICogICAgICAgYFxuICpcbiAqICAgICAgIH0pXG4gKiAgICAgICAgY2xhc3MgTXlTaG93Q0xDb21wb25lbnRcbiAqICAgICAgICB7XG4gKiAgICAgICAgICAgIGNoZWNrQm94TGlzdFZhbHVlczogc3RyaW5nW10gPSBbJ2JsdWUnICwgJ3JlZCcgLCAneWVsbG93JyAsICdvcmFuZ2UnICwgJ3doaXRlJyAsXG4gKiAgICAgJ3NpbHZlcicgLCAnYmxhY2snICxcbiAqICAgICAgICAgICAgJ0dyZWVuJyAsICdHcmF5JyAsICdOYXZ5JyAsICdPbGl2ZScgLCAnQXF1YScgLCAnUHVycGxlJ107XG4gKlxuICogICAgICAgICAgICBzZWxlY3RlZFZhbHVlczogc3RyaW5nW10gPSBbJ2JsdWUnICwgJ09saXZlJyAsICdBcXVhJyAsICdQdXJwbGUnXTtcbiAqXG4gKlxuICogICAgICAgICAgICBmb3JtR3JvdXA6IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICpcbiAqXG4gKiAgICAgICAgICAgIG9uQ0JDbGljayAoZXZlbnQpOiB2b2lkXG4gKiAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkNCQ2xpY2sgPSAnICsgZXZlbnQpO1xuICogICAgICAgICAgICB9XG4gKlxuICogICAgICAgIH1cbiAqKlxuICovXG5cblxuXG5cbmV4cG9ydCBjb25zdCBDQl9MSVNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja0JveExpc3RDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctY2hlY2tib3gtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjaGVjay1ib3gtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NoZWNrLWJveC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ0JfTElTVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrQm94TGlzdENvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja0JveExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHZhbHVlcyB1c2VkIHRvIHJlbmRlciBjaGVja2JveGVzLiBFdmVuIHdlIGhhdmUgaGVyZSB0eXBlIGFzIEFOWSB3ZSBpbnRlcm5hbGx5XG4gICAgICogc3VwcG9ydCBvbmx5IHN0cmluZyBhdCB0aGUgbW9tZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogIFNlbGVjdGlvbnMgYXJlIGRlZmF1bHQgQ0hFQ0tFRCB2YWx1ZXMgcGFzc2VkLiBlLmcuIFdoZW4gcmVuZGVyaW5nIGZpZWxkIGZhdm9yaXRlIGNvbG9yczpcbiAgICAgKiBibHVlLCByZWQsIHllbGxvdyB5b3Ugd2lsbCBwYXNzIGluIGhlcmUgYmx1ZSwgcmVkLCB0aGVuIGNoZWNrYm94ZXMgd2l0aCB2YWx1ZSBibHVlLCByZWQgd2lsXG4gICAgICogYmUgcmVuZGVyZWQgYXMgY2hlY2sgYW5kIHllbGxvdyB1bmNoZWNrZWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGlvbnM6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgZXZlbnQgd2hlbiBjaGVja2JveCBpcyBzZWxlY3RlZC9jbGlja2VkLiBFbWl0cyBjdXJyZW50IGNsaWNrZWQgY2hlY2tib3hlZC4gbm90IHRoZVxuICAgICAqIGFjdHVhbGwgaW50ZXJuYWwgbW9kZWwgdmFsdWUgaW4gdGhpcyBjYXNlIGFycmF5IG9mIGNob2ljZXNcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogc3BlY2lhbCBleHByZXNzaW9uIHRvIGZvcm1hdCBsYWJlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWxGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1vZGVsXG4gICAgICovXG4gICAgbW9kZWw6IGFueSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWxlY3Rpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5zZWxlY3Rpb25zKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuc2VsZWN0aW9ucyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5zZWxlY3Rpb25zKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdXBkYXRlZE1vZGVsOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMubW9kZWwuZm9yRWFjaCgoaW5kZXg6IG51bWJlcikgPT4gdXBkYXRlZE1vZGVsLnB1c2godGhpcy5saXN0W2luZGV4XSkpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHVwZGF0ZWRNb2RlbCwge1xuICAgICAgICAgICAgZW1pdEV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIExhYmVsIGlzIGV4dHJhY3RlZCBpbnRvIHRoaXMgbWV0aG9kIHNvIGluIHRoZSBmdXR1cmUgd2UgY2FuIHBsYXkgbW9yZSBob3cgd2Ugd2FudCB0byBkaXNwbGF5XG4gICAgICogdGhlIHZhbHVlLiBTaW5jZSBJIHdhbnQgdG8gc3VwcG9ydCBmb3JtYXR0ZXJzIGZvciBlYWNoIGNvbXBvbmVudHMgd2UgbWlnaHQgaGF2ZSBhIGNoYW5jZSB0b1xuICAgICAqIGRlY2lkZSBob3cgbGFiZWwgd2lsbCBsb29rIGxpa2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBsYWJlbFZhbHVlKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxhYmVsRm9ybWF0dGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxGb3JtYXR0ZXIoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluIHRoaXMgdmVyc2lvbiBvZiBjaGVja2JveGVzIHdlIHN0aWxsIGV4cGVjdCBvbmx5IHByaW1pdGl2ZSB0eXBlcy4gS2VlcCB0aGlzIGZ1bmN0aW9uYWxpdHlcbiAgICAgKiBpbiBleHRyYSBtZXRob2Qgc28gd2UgY2FuIHdvcmsgd2l0aCBpdCBldmVuIG5vdyB3ZSBqdXN0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrXG4gICAgICovXG4gICAgdmFsdWUoaXRlbTogYW55KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBldmVudCBvdXRzaWRlIG9mIHRoaXMgY29tcG9uZW50IGFuZCBjb252ZXJ0IGluZGV4ZWQgbW9kZWwgdG8gb3JpZ2luYWwgb2JqZWN0c1xuICAgICAqXG4gICAgICovXG4gICAgb25DaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB1cGRhdGVkTW9kZWw6IGFueVtdID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbC5mb3JFYWNoKChpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGVkTW9kZWwucHVzaCh0aGlzLmxpc3RbaW5kZXhdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHVwZGF0ZWRNb2RlbCk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodXBkYXRlZE1vZGVsKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh1cGRhdGVkTW9kZWwsIHtcbiAgICAgICAgICAgIGVtaXRFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTaW5jZSB3ZSBtaWdodCBiZSBkZWFsaW5nIHdpdGggY29tcGxleCBvYmplY3Qgc3RvcmUgb25seSBJTkRFWGVzIG51bWJlciBpbiB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVNb2RlbChzb3VyY2VMaXN0OiBhbnlbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmxpc3QuZmluZEluZGV4KChlbGVtOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhpdGVtLCBlbGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5wdXNoKGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1vZGVsKSAmJiBpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3TW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwobmV3TW9kZWwpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19