/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, equals, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * A popup like component rendering list of values as. Based on PrimeNG component and one of the
 * main reason why we need to wrap this is to extend its capabilities to accept almost any
 * data type without using Primens's specific SelectItem type.
 *
 *
 * ### Example
 *
 * ```
 * \@Component({
 *      selector: 'showDropDown' ,
 *      template: '<aw-dropdown [list]="testItemSmall"
 *     (onSelection)="onSelection($event)"></aw-dropdown>'
 *  })
 *  export class MyDropComponent
 *  {
 *      testItemSmall: string[] = ['view' , 'edit'];
 *
 *      // when you switch list binding to refert to large item fiilter automatically is shown and
 *     max 10 items are
 *      // visible
 *      testItemLarge: string[] = ['view' , 'edit' , 'frank' , 'kolar' , 'The Sun' , 'Dog' ,
 *     'Computer' , 'A Desk' ,
 *      'My Car' , 'Pencil' , 'This Page' , 'Yesterday' , 'Monday' , 'Tuesday' , 'BMW R1200 GS' ,
 *     'Czech Republic' ,
 *      'Last Item'];
 *
 *
 *      itemSelected: string = 'view';
 *      itemSelectedLg: string = 'Monday';
 *
 *      noselString: string = '(no selection)';
 *
 *
 *      onSelection (event): void
 *      {
 *          this.itemSelected = event;
 *
 *      }
 *  }
 *
 *  ```
 *
 */
export const /** @type {?} */ DD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};
export class DropdownComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Event fired when user select a item
         */
        this.onSelection = new EventEmitter();
    }
    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     * @return {?}
     */
    ngOnInit() {
        if (this.isStandalone) {
            super.ngOnInit();
            super.registerFormControl(this.selection);
        }
        else {
            if (isPresent(this.name)) {
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
        // transform a value to PrimeNg Format, we are not really be using a label field only a
        // value.
        this.internalList = [];
        // if (isPresent(this.noSelectionString)) {
        //     this.internalList.push({
        //         label: this.noSelectionString,
        //         value: null
        //     });
        //
        //     if (isBlank(this.selection)) {
        //         this.selection = this.noSelectionString;
        //     }
        // }
        if (isPresent(this.list) && this.list.length >= DropdownComponent.MaxNumShown) {
            this.internalList = this.list.slice(0, DropdownComponent.MaxNumShown).map((item) => {
                return { label: item.toString(), value: item };
            });
        }
        else if (isPresent(this.list)) {
            this.internalList = this.list.slice(0).map((item) => {
                return { label: item.toString(), value: item };
            });
        }
    }
    /**
     * @return {?}
     */
    hasEmbeddedTemplate() {
        return isPresent(this.itemTemplate);
    }
    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     * @param {?} item
     * @return {?}
     */
    itemExist(item) {
        return isPresent(item);
    }
    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     * @return {?}
     */
    showFilter() {
        return false;
        // return isPresent(this.list) && this.list.length > DropdownComponent.MaxNumShown;
    }
    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     * @param {?} value
     * @return {?}
     */
    onItemSelection(value) {
        this.selection = value.value;
        this.onSelection.emit(value.value);
        if (this.isStandalone) {
            this.formControl.setValue(this.selection);
            this.formControl.markAsDirty({ onlySelf: true });
        }
        this.onModelChanged(value.value);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    displayItem(item) {
        return isPresent(item) ? item.label : 'No Selection';
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            this.formControl.setValue(value);
        }
    }
}
DropdownComponent.MaxNumShown = 10;
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dropdown',
                template: `<div class="w-dropdown" [formGroup]="formGroup">

    <ng-template [ngIf]="isStandalone">
        <p-dropdown [options]="internalList"
                    [formControlName]="name"
                    [placeholder]="noSelectionString"
                    [autoWidth]="false"
                    [filter]="showFilter()"
                    (onChange)="onItemSelection($event)">

            <ng-template let-item pTemplate="item">
                <ng-template [ngIf]="!hasEmbeddedTemplate() && itemExist(item)">
                    {{item.label }}
                </ng-template>

                <ng-template [embeddedItem]="itemTemplate" [item]="item"
                             *ngIf="hasEmbeddedTemplate() && itemExist(item)">

                </ng-template>
            </ng-template>


        </p-dropdown>
    </ng-template>
</div>


<!-- no formControl Name here. ngModel cannot have formGroup around -->
<ng-template [ngIf]="!isStandalone">
    <div class="w-dropdown">
        <p-dropdown [options]="internalList"
                    [(ngModel)]="selection"
                    [placeholder]="noSelectionString"
                    [autoWidth]="false"
                    [filter]="showFilter()"
                    (onChange)="onItemSelection($event)">

            <ng-template let-item pTemplate="item">

                <ng-template [ngIf]="!hasEmbeddedTemplate() && itemExist(item)">
                    {{item.label }}
                </ng-template>
                <ng-template [embeddedItem]="itemTemplate" [item]="item"
                             *ngIf="hasEmbeddedTemplate() && itemExist(item)">
                </ng-template>
            </ng-template>
        </p-dropdown>
    </div>
</ng-template>
`,
                styles: [`/deep/ .ui-dropdown-panel .ui-dropdown-items-wrapper{max-height:none!important}/deep/ .ui-dropdown-panel .ui-dropdown-item{padding:.65em 2em .65em .64em;margin:0}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container{width:100%}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container .fa{top:1.2em}/deep/ .ui-dropdown-panel .ui-dropdown-list{padding:1em 0}/deep/ .w-dropdown:not(.ng-dirty) label{color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger.ui-corner-right{border-left:none;color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger .pi{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-dropdown .ui-dropdown-trigger .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-dropdown .ui-dropdown-label{padding-right:2.4em}`],
                providers: [
                    DD_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => DropdownComponent) }
                ]
            },] },
];
/** @nocollapse */
DropdownComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
DropdownComponent.propDecorators = {
    list: [{ type: Input }],
    selection: [{ type: Input }],
    noSelectionString: [{ type: Input }],
    onSelection: [{ type: Output }],
    itemTemplate: [{ type: ContentChild, args: ['itemTemplate',] }]
};
function DropdownComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DropdownComponent.MaxNumShown;
    /**
     * Ordered list of items rendered as a popup menu
     * @type {?}
     */
    DropdownComponent.prototype.list;
    /**
     * Items which was selected as a default value or by used in the popup menu.
     * @type {?}
     */
    DropdownComponent.prototype.selection;
    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     * @type {?}
     */
    DropdownComponent.prototype.noSelectionString;
    /**
     * Event fired when user select a item
     * @type {?}
     */
    DropdownComponent.prototype.onSelection;
    /**
     * This is the internal list that hides PrimeNG specifics where we need to deal with special
     * type: SelectItem. Our expectation is that you need to be able to pass regular string values
     * or full object and not trying to wrap it into extra layer.
     *
     * @type {?}
     */
    DropdownComponent.prototype.internalList;
    /**
     * Embedded template defined by user. If user does not provide any template and while rendering
     * item we assume we are dealing with primitive types and call on each item toString(), if we
     * are dealing with object, then we expect user to provide a template and tell the dropdown of
     * each item should be handled
     *
     * @type {?}
     */
    DropdownComponent.prototype.itemTemplate;
    /**
     * Internal model used for embedded version.
     * @type {?}
     */
    DropdownComponent.prototype.model;
    /** @type {?} */
    DropdownComponent.prototype.env;
    /** @type {?} */
    DropdownComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNSLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlEakUsTUFBTSxDQUFDLHVCQUFNLHlCQUF5QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUE4REYsTUFBTSx3QkFBeUIsU0FBUSxpQkFBaUI7Ozs7O0lBeURwRCxZQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7OzJCQTlCdkIsSUFBSSxZQUFZLEVBQUU7S0FpQ2xEOzs7Ozs7O0lBT0QsUUFBUTtRQUdKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUss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UUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0tBRUo7O2dDQTNLNkIsRUFBRTs7WUE5RG5DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaURiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHN3QkFBc3dCLENBQUM7Z0JBQ2h4QixTQUFTLEVBQUU7b0JBQ1AseUJBQXlCO29CQUN6QixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUM7aUJBQ2pGO2FBRUo7Ozs7WUFuSE8sV0FBVztZQUNYLGlCQUFpQix1QkE2S1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDOzs7bUJBbEQ5RSxLQUFLO3dCQU1MLEtBQUs7Z0NBUUwsS0FBSzswQkFNTCxNQUFNOzJCQW1CTixZQUFZLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGYsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgZXF1YWxzLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcblxuXG4vKipcbiAqIEEgcG9wdXAgbGlrZSBjb21wb25lbnQgcmVuZGVyaW5nIGxpc3Qgb2YgdmFsdWVzIGFzLiBCYXNlZCBvbiBQcmltZU5HIGNvbXBvbmVudCBhbmQgb25lIG9mIHRoZVxuICogbWFpbiByZWFzb24gd2h5IHdlIG5lZWQgdG8gd3JhcCB0aGlzIGlzIHRvIGV4dGVuZCBpdHMgY2FwYWJpbGl0aWVzIHRvIGFjY2VwdCBhbG1vc3QgYW55XG4gKiBkYXRhIHR5cGUgd2l0aG91dCB1c2luZyBQcmltZW5zJ3Mgc3BlY2lmaWMgU2VsZWN0SXRlbSB0eXBlLlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3Nob3dEcm9wRG93bicgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1kcm9wZG93biBbbGlzdF09XCJ0ZXN0SXRlbVNtYWxsXCJcbiAqICAgICAob25TZWxlY3Rpb24pPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiPjwvYXctZHJvcGRvd24+J1xuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIE15RHJvcENvbXBvbmVudFxuICogIHtcbiAqICAgICAgdGVzdEl0ZW1TbWFsbDogc3RyaW5nW10gPSBbJ3ZpZXcnICwgJ2VkaXQnXTtcbiAqXG4gKiAgICAgIC8vIHdoZW4geW91IHN3aXRjaCBsaXN0IGJpbmRpbmcgdG8gcmVmZXJ0IHRvIGxhcmdlIGl0ZW0gZmlpbHRlciBhdXRvbWF0aWNhbGx5IGlzIHNob3duIGFuZFxuICogICAgIG1heCAxMCBpdGVtcyBhcmVcbiAqICAgICAgLy8gdmlzaWJsZVxuICogICAgICB0ZXN0SXRlbUxhcmdlOiBzdHJpbmdbXSA9IFsndmlldycgLCAnZWRpdCcgLCAnZnJhbmsnICwgJ2tvbGFyJyAsICdUaGUgU3VuJyAsICdEb2cnICxcbiAqICAgICAnQ29tcHV0ZXInICwgJ0EgRGVzaycgLFxuICogICAgICAnTXkgQ2FyJyAsICdQZW5jaWwnICwgJ1RoaXMgUGFnZScgLCAnWWVzdGVyZGF5JyAsICdNb25kYXknICwgJ1R1ZXNkYXknICwgJ0JNVyBSMTIwMCBHUycgLFxuICogICAgICdDemVjaCBSZXB1YmxpYycgLFxuICogICAgICAnTGFzdCBJdGVtJ107XG4gKlxuICpcbiAqICAgICAgaXRlbVNlbGVjdGVkOiBzdHJpbmcgPSAndmlldyc7XG4gKiAgICAgIGl0ZW1TZWxlY3RlZExnOiBzdHJpbmcgPSAnTW9uZGF5JztcbiAqXG4gKiAgICAgIG5vc2VsU3RyaW5nOiBzdHJpbmcgPSAnKG5vIHNlbGVjdGlvbiknO1xuICpcbiAqXG4gKiAgICAgIG9uU2VsZWN0aW9uIChldmVudCk6IHZvaWRcbiAqICAgICAge1xuICogICAgICAgICAgdGhpcy5pdGVtU2VsZWN0ZWQgPSBldmVudDtcbiAqXG4gKiAgICAgIH1cbiAqICB9XG4gKlxuICogIGBgYFxuICpcbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBERF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInctZHJvcGRvd25cIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzU3RhbmRhbG9uZVwiPlxuICAgICAgICA8cC1kcm9wZG93biBbb3B0aW9uc109XCJpbnRlcm5hbExpc3RcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibm9TZWxlY3Rpb25TdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICBbYXV0b1dpZHRoXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW2ZpbHRlcl09XCJzaG93RmlsdGVyKClcIlxuICAgICAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25JdGVtU2VsZWN0aW9uKCRldmVudClcIj5cblxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtIHBUZW1wbGF0ZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWhhc0VtYmVkZGVkVGVtcGxhdGUoKSAmJiBpdGVtRXhpc3QoaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAge3tpdGVtLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbZW1iZWRkZWRJdGVtXT1cIml0ZW1UZW1wbGF0ZVwiIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0VtYmVkZGVkVGVtcGxhdGUoKSAmJiBpdGVtRXhpc3QoaXRlbSlcIj5cblxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgPC9wLWRyb3Bkb3duPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L2Rpdj5cblxuXG48IS0tIG5vIGZvcm1Db250cm9sIE5hbWUgaGVyZS4gbmdNb2RlbCBjYW5ub3QgaGF2ZSBmb3JtR3JvdXAgYXJvdW5kIC0tPlxuPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc1N0YW5kYWxvbmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwidy1kcm9wZG93blwiPlxuICAgICAgICA8cC1kcm9wZG93biBbb3B0aW9uc109XCJpbnRlcm5hbExpc3RcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJub1NlbGVjdGlvblN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdXRvV2lkdGhdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBbZmlsdGVyXT1cInNob3dGaWx0ZXIoKVwiXG4gICAgICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJvbkl0ZW1TZWxlY3Rpb24oJGV2ZW50KVwiPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gcFRlbXBsYXRlPVwiaXRlbVwiPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNFbWJlZGRlZFRlbXBsYXRlKCkgJiYgaXRlbUV4aXN0KGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7aXRlbS5sYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtlbWJlZGRlZEl0ZW1dPVwiaXRlbVRlbXBsYXRlXCIgW2l0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaGFzRW1iZWRkZWRUZW1wbGF0ZSgpICYmIGl0ZW1FeGlzdChpdGVtKVwiPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3AtZHJvcGRvd24+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIC51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbXMtd3JhcHBlcnttYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50fS9kZWVwLyAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW17cGFkZGluZzouNjVlbSAyZW0gLjY1ZW0gLjY0ZW07bWFyZ2luOjB9L2RlZXAvIC51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tZmlsdGVyLWNvbnRhaW5lcnt3aWR0aDoxMDAlfS9kZWVwLyAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXIgLmZhe3RvcDoxLjJlbX0vZGVlcC8gLnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1saXN0e3BhZGRpbmc6MWVtIDB9L2RlZXAvIC53LWRyb3Bkb3duOm5vdCgubmctZGlydHkpIGxhYmVse2NvbG9yOiM5Njk2OTZ9L2RlZXAvIC53LWRyb3Bkb3duIC51aS1kcm9wZG93bi10cmlnZ2VyLnVpLWNvcm5lci1yaWdodHtib3JkZXItbGVmdDpub25lO2NvbG9yOiM5Njk2OTZ9L2RlZXAvIC53LWRyb3Bkb3duIC51aS1kcm9wZG93bi10cmlnZ2VyIC5waXtmb250LWZhbWlseTpcIlNBUCBpY29uIGZvbnRzXCI7Y29sb3I6Izc2NzY3NjtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MS40ZW07bWFyZ2luLWxlZnQ6LS44NWVtfS9kZWVwLyAudy1kcm9wZG93biAudWktZHJvcGRvd24tdHJpZ2dlciAucGktY2FyZXQtZG93bjpiZWZvcmV7Y29udGVudDonXFxcXGUxZWYnfS9kZWVwLyAudy1kcm9wZG93biAudWktZHJvcGRvd24tbGFiZWx7cGFkZGluZy1yaWdodDoyLjRlbX1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRERfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEcm9wZG93bkNvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIHN0YXRpYyByZWFkb25seSBNYXhOdW1TaG93biA9IDEwO1xuXG4gICAgLyoqXG4gICAgICogT3JkZXJlZCBsaXN0IG9mIGl0ZW1zIHJlbmRlcmVkIGFzIGEgcG9wdXAgbWVudVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBJdGVtcyB3aGljaCB3YXMgc2VsZWN0ZWQgYXMgYSBkZWZhdWx0IHZhbHVlIG9yIGJ5IHVzZWQgaW4gdGhlIHBvcHVwIG1lbnUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb246IGFueTtcblxuICAgIC8qKlxuICAgICAqIFN0cmluZyByZW5kZXJlZCBhcyBmaXJzdCB2YWx1ZSBpbiB0aGUgcG9wdXAgd2hpY2ggbGV0IHRoZSB1c2VyIHRvIG1ha2UgJ25vIHNlbGVjdGlvbicgZnJvbVxuICAgICAqIGF2YWlsYWJsZSBsaXN0IG9mIHZhbHVlcy4gV2hlbiB0aGlzIG9wdGlvbiBpcyBhY3RpdmUgYW5kIHVzZSBtYWtlIHRoaXMgc2VsZWN0aW9uIHdlIHNhdmUgYVxuICAgICAqIE5VTEwgdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vU2VsZWN0aW9uU3RyaW5nOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0IGEgaXRlbVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGludGVybmFsIGxpc3QgdGhhdCBoaWRlcyBQcmltZU5HIHNwZWNpZmljcyB3aGVyZSB3ZSBuZWVkIHRvIGRlYWwgd2l0aCBzcGVjaWFsXG4gICAgICogdHlwZTogU2VsZWN0SXRlbS4gT3VyIGV4cGVjdGF0aW9uIGlzIHRoYXQgeW91IG5lZWQgdG8gYmUgYWJsZSB0byBwYXNzIHJlZ3VsYXIgc3RyaW5nIHZhbHVlc1xuICAgICAqIG9yIGZ1bGwgb2JqZWN0IGFuZCBub3QgdHJ5aW5nIHRvIHdyYXAgaXQgaW50byBleHRyYSBsYXllci5cbiAgICAgKlxuICAgICAqL1xuICAgIGludGVybmFsTGlzdDogU2VsZWN0SXRlbVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBFbWJlZGRlZCB0ZW1wbGF0ZSBkZWZpbmVkIGJ5IHVzZXIuIElmIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgYW5kIHdoaWxlIHJlbmRlcmluZ1xuICAgICAqIGl0ZW0gd2UgYXNzdW1lIHdlIGFyZSBkZWFsaW5nIHdpdGggcHJpbWl0aXZlIHR5cGVzIGFuZCBjYWxsIG9uIGVhY2ggaXRlbSB0b1N0cmluZygpLCBpZiB3ZVxuICAgICAqIGFyZSBkZWFsaW5nIHdpdGggb2JqZWN0LCB0aGVuIHdlIGV4cGVjdCB1c2VyIHRvIHByb3ZpZGUgYSB0ZW1wbGF0ZSBhbmQgdGVsbCB0aGUgZHJvcGRvd24gb2ZcbiAgICAgKiBlYWNoIGl0ZW0gc2hvdWxkIGJlIGhhbmRsZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtb2RlbCB1c2VkIGZvciBlbWJlZGRlZCB2ZXJzaW9uLlxuICAgICAqL1xuICAgIG1vZGVsOiBTZWxlY3RJdGVtO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZG86IFB1dCBiYWNrIHRoZSBzY3JvbGxpbmcgb3B0aW9uIG9uY2Ugd2UgZGVjaWRlIHNvLiBDdXJyZW50bHkgdGhlIHJlcXVpcmVtZW50cyBhcmVcbiAgICAgKiBzaG93IG9ubHkgMTAgaXRlbXMgbWF4LCBubyBzY3JvbGxpbmcuIEZ1bmN0aW9uYWxpdHkgY29tbWVudGVkIG91dCBjYW4gc2hvdyBzY3JvbGxiYXIgd2l0aFxuICAgICAqIHNlYXJjaCBmaWx0ZXIuXG4gICAgICovXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuc2VsZWN0aW9uKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gdHJhbnNmb3JtIGEgdmFsdWUgdG8gUHJpbWVOZyBGb3JtYXQsIHdlIGFyZSBub3QgcmVhbGx5IGJlIHVzaW5nIGEgbGFiZWwgZmllbGQgb25seSBhXG4gICAgICAgIC8vIHZhbHVlLlxuICAgICAgICB0aGlzLmludGVybmFsTGlzdCA9IFtdO1xuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KHRoaXMubm9TZWxlY3Rpb25TdHJpbmcpKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmludGVybmFsTGlzdC5wdXNoKHtcbiAgICAgICAgLy8gICAgICAgICBsYWJlbDogdGhpcy5ub1NlbGVjdGlvblN0cmluZyxcbiAgICAgICAgLy8gICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMubm9TZWxlY3Rpb25TdHJpbmc7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgdGhpcy5saXN0Lmxlbmd0aCA+PSBEcm9wZG93bkNvbXBvbmVudC5NYXhOdW1TaG93bikge1xuXG4gICAgICAgICAgICB0aGlzLmludGVybmFsTGlzdCA9IHRoaXMubGlzdC5zbGljZSgwLCBEcm9wZG93bkNvbXBvbmVudC5NYXhOdW1TaG93bikubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbS50b1N0cmluZygpLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbExpc3QgPSB0aGlzLmxpc3Quc2xpY2UoMCkubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbS50b1N0cmluZygpLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaGFzRW1iZWRkZWRUZW1wbGF0ZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuaXRlbVRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0byBwcmV2ZW50IEVtcHR5IGl0ZW0gdG8gYmUgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqIHRvZG86IFJlcG9ydCB0aGlzIG9uIFByaW1lTmdcbiAgICAgKlxuICAgICAqL1xuICAgIGl0ZW1FeGlzdChpdGVtOiBhbnkpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGl0ZW0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkcm9wZG93biBsaXN0IGlzIG1vcmUgdGhlbiBkZWZpbmVkIGNvbnN0YW50IE1heE51bVNob3duICgxMCkgYXV0b21hdGljYWxseSBzaG93IGZpbHRlclxuICAgICAqIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgc2hvd0ZpbHRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIHJldHVybiBpc1ByZXNlbnQodGhpcy5saXN0KSAmJiB0aGlzLmxpc3QubGVuZ3RoID4gRHJvcGRvd25Db21wb25lbnQuTWF4TnVtU2hvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVcGRhdGVzIGludGVybmFsIG1vZGVscyBvZiBjdXJyZW50IHNlbGVjdGlvbnMgYW5kIHRyaWdnZXJzIG9uU2VsZWN0aW9uIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBvbkl0ZW1TZWxlY3Rpb24odmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdmFsdWUudmFsdWU7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh2YWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHZhbHVlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5SXRlbShpdGVtOiBhbnkpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGl0ZW0pID8gaXRlbS5sYWJlbCA6ICdObyBTZWxlY3Rpb24nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoIWVxdWFscyh2YWx1ZSwgdGhpcy5zZWxlY3Rpb24pKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cblxuXG4iXX0=