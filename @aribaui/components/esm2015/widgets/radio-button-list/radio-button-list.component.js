/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
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
  @type {?} */
export const RB_LIST_CONTROL_VALUE_ACCESSOR = {
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
        /** @type {?} */
        let updatedModel = this.list[this.model];
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
        /** @type {?} */
        let index = this.list.findIndex((elem) => {
            return souceItem === elem;
        });
        this.model = index === -1 ? 0 : index;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        let updatedModel = this.list[this.model];
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
            /** @type {?} */
            let newModel = value;
            this.updateModel(newModel);
        }
    }
}
RadioButtonListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-radiobutton-list',
                template: "<div *ngFor=\"let item of list;  let i = index\" class=\"ui-g\">\n\n    <div class=\"ui-g-12\">\n        <aw-radiobutton\n            [(ngModel)]=\"model\"\n            (ngModelChange)=\"onChange($event)\"\n            [isStandalone]=\"false\"\n            [name]=\"name\"\n            [value]=\"i\"\n            [label]=\"labelValue(item)\">\n        </aw-radiobutton>\n    </div>\n\n</div>\n",
                providers: [
                    RB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonListComponent) }
                ],
                styles: [""]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW8tYnV0dG9uLWxpc3QvcmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDdEYsYUFBYSw4QkFBOEIsR0FBUTtJQUMvQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUM7SUFDdkQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBYUYsTUFBTSwrQkFBZ0MsU0FBUSxpQkFBaUI7Ozs7O0lBdUMzRCxZQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7MkJBWHZCLElBQUksWUFBWSxFQUFPO0tBY3ZEOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixFQUFFLENB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dCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyBmb3IgUmFkaW9CdXR0b24gY29tcG9uZW50IHByb3ZpZGluZyBjb252ZW5pZW50IHdheSB0byB0byByZW5kZXIgUmFkaW9CdXR0b24gR3JvdXBzXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICpcbiAqIGBgYFxuICogICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiAnZ2VuZGVyLXNlbGVjdG9yJyAsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbi1saXN0IFtsaXN0XT1cInJiTGlzdFZhbHVlc1wiIFtsYXlvdXRdPVwibGF5b3V0XCJcbiAqICAgICBbc2VsZWN0aW9uXT1cInNlbGVjdGVkVmFsdWVcIiBbbmFtZV09XCInbmFtZSdcIj5cbiAqICAgICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbi1saXN0PlxuICogICAgICBgXG4gKiAgICAgIH0pXG4gKiAgICAgIGV4cG9ydCBjbGFzcyBHZW5kZXJTZWxlY3RvckNvbXBvbmVudFxuICogICAgICB7XG4gKiAgICAgICAgICByYkxpc3RWYWx1ZXM6IHN0cmluZ1tdID0gWydtYWxlJyAsICdmZW1hbGUnICwgJ290aGVyJ107XG4gKiAgICAgICAgICBzZWxlY3RlZFZhbHVlOiBzdHJpbmcgPSAnb3RoZXInO1xuICogICAgICAgICAgbGF5b3V0OiBzdHJpbmcgPSAnc3RhY2tlZCc7XG4gKlxuICpcbiAqICAgICAgICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKlxuICpcbiAqICAgICAgICAgIG9uQ0JDbGljayAoZXZlbnQpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQ0JDbGljayA9ICcgKyBldmVudCk7XG4gKiAgICAgICAgICB9XG4gKlxuICogICAgICB9XG4gKlxuICogYGBgXG4gKi9cblxuXG5leHBvcnQgY29uc3QgUkJfTElTVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25MaXN0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXJhZGlvYnV0dG9uLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAncmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydyYWRpby1idXR0b24tbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBSQl9MSVNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25MaXN0Q29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25MaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBMSXN0IG9mIHZhbHVlcyB1c2VkIHRvIHJlbmRlciB0aGUgcmFkaW8gYnV0dG9uIGdyb3VwXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyB3aGljaCByYWRpbyBidXR0b25zIGlzIHNlbGVjdGVkIHdoZW4gcmVuZGVyZWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGlvbjogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBzcGVjaWFsIGV4cHJlc3Npb24gdG8gZm9ybWF0IGxhYmVsXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlcyBhbiBldmVudCB3aGVuIHJhZGlvIGJ1dHRvbiBpcyBzZWxlY3RlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICAgIC8qKlxuICAgICAqIGludGVybmFsIG1vZGVsIHRvIGxpc3RlbiBmb3IgcmFkaW8gdmFsdWUgY2hhbmdlc1xuICAgICAqXG4gICAgICovXG4gICAgbW9kZWw6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuc2VsZWN0aW9uKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIExhYmVsIGlzIGV4dHJhY3RlZCBpbnRvIGEgbWV0aG9kIHNvIGluIHRoZSBmdXR1cmUgd2UgY2FuIHBsYXkgaG93IHdlIHdhbnQgdG8gZGlzcGxheSB0aGVcbiAgICAgKiB2YWx1ZS4gU2luY2UgSSB3YW50IHRvIHN1cHBvcnQgZm9ybWF0dGVycyBmb3IgZWFjaCBjb21wb25lbnRzIHdlIG1pZ2h0IGhhdmUgYSBjaGFuY2UgdG9cbiAgICAgKiBkZWNpZGUgaG93IHRoZSBsYWJlbCB3aWxsIGxvb2sgbGlrZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGxhYmVsVmFsdWUoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGFiZWxGb3JtYXR0ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbEZvcm1hdHRlcihpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gdGhpcyB2ZXJzaW9uIG9mIGNoZWNrYm94ZXMgd2Ugc3RpbGwgZXhwZWN0IG9ubHkgcHJpbWl0aXZlIHR5cGVzLiBLZWVwIHRoaXMgZnVuY3Rpb25hbGl0eVxuICAgICAqIGluIGV4dHJhIG1ldGhvZCBzbyB3ZSBjYW4gd29yayB3aXRoIGl0IGV2ZW4gbm93IHdlIGp1c3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2tcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgdmFsdWUoaXRlbTogYW55KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT24gTkdNb2RlbCBjaGFuZ2UgcmV0cmlldmUgYWN0dWFsIHJlY29yZCBiYXNlZCBvbiB0aGUgSU5ERVggYW5kIHByb3BhZ2F0ZSBpdCB0byBib3RoXG4gICAgICogbmdNb2RlbCBhcyB3ZWxsIGFzIEZvcm1Hcm91cC5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ2hhbmdlKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBsZXQgdXBkYXRlZE1vZGVsOiBhbnkgPSB0aGlzLmxpc3RbdGhpcy5tb2RlbF07XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHVwZGF0ZWRNb2RlbCk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodXBkYXRlZE1vZGVsKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh1cGRhdGVkTW9kZWwsIHtcbiAgICAgICAgICAgIGVtaXRFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTaW5jZSB3ZSBtaWdodCBiZSBkZWFsaW5nIHdpdGggY29tcGxleCBvYmplY3Qgc3RvcmUgb25seSBJTkRFWCBudW1iZXIgaW4gdGhlIG1vZGVsLlxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlTW9kZWwoc291Y2VJdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmxpc3QuZmluZEluZGV4KChlbGVtOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VjZUl0ZW0gPT09IGVsZW07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1vZGVsID0gaW5kZXggPT09IC0xID8gMCA6IGluZGV4O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdXBkYXRlZE1vZGVsOiBhbnkgPSB0aGlzLmxpc3RbdGhpcy5tb2RlbF07XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodXBkYXRlZE1vZGVsLCB7XG4gICAgICAgICAgICBlbWl0RXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBuZXdNb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChuZXdNb2RlbCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==