/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, equals, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/** *
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
  @type {?} */
export const DD_CONTROL_VALUE_ACCESSOR = {
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
                template: "<div class=\"w-dropdown\" [formGroup]=\"formGroup\">\n\n    <ng-template [ngIf]=\"isStandalone\">\n        <p-dropdown [options]=\"internalList\"\n                    [formControlName]=\"name\"\n                    [placeholder]=\"noSelectionString\"\n                    [autoWidth]=\"false\"\n                    [filter]=\"showFilter()\"\n                    (onChange)=\"onItemSelection($event)\">\n\n            <ng-template let-item pTemplate=\"item\">\n                <ng-template [ngIf]=\"!hasEmbeddedTemplate() && itemExist(item)\">\n                    {{item.label }}\n                </ng-template>\n\n                <ng-template [embeddedItem]=\"itemTemplate\" [item]=\"item\"\n                             *ngIf=\"hasEmbeddedTemplate() && itemExist(item)\">\n\n                </ng-template>\n            </ng-template>\n\n\n        </p-dropdown>\n    </ng-template>\n</div>\n\n\n<!-- no formControl Name here. ngModel cannot have formGroup around -->\n<ng-template [ngIf]=\"!isStandalone\">\n    <div class=\"w-dropdown\">\n        <p-dropdown [options]=\"internalList\"\n                    [(ngModel)]=\"selection\"\n                    [placeholder]=\"noSelectionString\"\n                    [autoWidth]=\"false\"\n                    [filter]=\"showFilter()\"\n                    (onChange)=\"onItemSelection($event)\">\n\n            <ng-template let-item pTemplate=\"item\">\n\n                <ng-template [ngIf]=\"!hasEmbeddedTemplate() && itemExist(item)\">\n                    {{item.label }}\n                </ng-template>\n                <ng-template [embeddedItem]=\"itemTemplate\" [item]=\"item\"\n                             *ngIf=\"hasEmbeddedTemplate() && itemExist(item)\">\n                </ng-template>\n            </ng-template>\n        </p-dropdown>\n    </div>\n</ng-template>\n",
                providers: [
                    DD_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => DropdownComponent) }
                ],
                styles: ["/deep/ .ui-dropdown-panel{z-index:10010!important;top:35px!important}/deep/ .ui-dropdown-panel .ui-dropdown-items-wrapper{max-height:none!important}/deep/ .ui-dropdown-panel .ui-dropdown-item{padding:.65em 2em .65em .64em;margin:0}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container{width:100%}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container .fa{top:1.2em}/deep/ .ui-dropdown-panel .ui-dropdown-list{padding:1em 0}/deep/ .w-dropdown:not(.ng-dirty) label{color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger.ui-corner-right{border-left:none;color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger .pi{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-dropdown .ui-dropdown-trigger .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-dropdown .ui-dropdown-label{padding-right:2.4em}"]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNSLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlEakUsYUFBYSx5QkFBeUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBYUYsTUFBTSx3QkFBeUIsU0FBUSxpQkFBaUI7Ozs7O0lBeURwRCxZQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7OzJCQTlCdkIsSUFBSSxZQUFZLEVBQUU7S0FpQ2xEOzs7Ozs7O0lBT0QsUUFBUTtRQUdKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxRQUFRLEVB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QUssQ0FBQyxDQUFDO1NBQ3BDO0tBRUo7O2dDQTNLNkIsRUFBRTs7WUFibkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QiwreURBQXNDO2dCQUV0QyxTQUFTLEVBQUU7b0JBQ1AseUJBQXlCO29CQUN6QixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUM7aUJBQ2pGOzthQUVKOzs7O1lBbEVPLFdBQVc7WUFDWCxpQkFBaUIsdUJBNEhSLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7O21CQWxEOUUsS0FBSzt3QkFNTCxLQUFLO2dDQVFMLEtBQUs7MEJBTUwsTUFBTTsyQkFtQk4sWUFBWSxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBBIHBvcHVwIGxpa2UgY29tcG9uZW50IHJlbmRlcmluZyBsaXN0IG9mIHZhbHVlcyBhcy4gQmFzZWQgb24gUHJpbWVORyBjb21wb25lbnQgYW5kIG9uZSBvZiB0aGVcbiAqIG1haW4gcmVhc29uIHdoeSB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpcyB0byBleHRlbmQgaXRzIGNhcGFiaWxpdGllcyB0byBhY2NlcHQgYWxtb3N0IGFueVxuICogZGF0YSB0eXBlIHdpdGhvdXQgdXNpbmcgUHJpbWVucydzIHNwZWNpZmljIFNlbGVjdEl0ZW0gdHlwZS5cbiAqXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6ICdzaG93RHJvcERvd24nICxcbiAqICAgICAgdGVtcGxhdGU6ICc8YXctZHJvcGRvd24gW2xpc3RdPVwidGVzdEl0ZW1TbWFsbFwiXG4gKiAgICAgKG9uU2VsZWN0aW9uKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIj48L2F3LWRyb3Bkb3duPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBNeURyb3BDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIHRlc3RJdGVtU21hbGw6IHN0cmluZ1tdID0gWyd2aWV3JyAsICdlZGl0J107XG4gKlxuICogICAgICAvLyB3aGVuIHlvdSBzd2l0Y2ggbGlzdCBiaW5kaW5nIHRvIHJlZmVydCB0byBsYXJnZSBpdGVtIGZpaWx0ZXIgYXV0b21hdGljYWxseSBpcyBzaG93biBhbmRcbiAqICAgICBtYXggMTAgaXRlbXMgYXJlXG4gKiAgICAgIC8vIHZpc2libGVcbiAqICAgICAgdGVzdEl0ZW1MYXJnZTogc3RyaW5nW10gPSBbJ3ZpZXcnICwgJ2VkaXQnICwgJ2ZyYW5rJyAsICdrb2xhcicgLCAnVGhlIFN1bicgLCAnRG9nJyAsXG4gKiAgICAgJ0NvbXB1dGVyJyAsICdBIERlc2snICxcbiAqICAgICAgJ015IENhcicgLCAnUGVuY2lsJyAsICdUaGlzIFBhZ2UnICwgJ1llc3RlcmRheScgLCAnTW9uZGF5JyAsICdUdWVzZGF5JyAsICdCTVcgUjEyMDAgR1MnICxcbiAqICAgICAnQ3plY2ggUmVwdWJsaWMnICxcbiAqICAgICAgJ0xhc3QgSXRlbSddO1xuICpcbiAqXG4gKiAgICAgIGl0ZW1TZWxlY3RlZDogc3RyaW5nID0gJ3ZpZXcnO1xuICogICAgICBpdGVtU2VsZWN0ZWRMZzogc3RyaW5nID0gJ01vbmRheSc7XG4gKlxuICogICAgICBub3NlbFN0cmluZzogc3RyaW5nID0gJyhubyBzZWxlY3Rpb24pJztcbiAqXG4gKlxuICogICAgICBvblNlbGVjdGlvbiAoZXZlbnQpOiB2b2lkXG4gKiAgICAgIHtcbiAqICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gZXZlbnQ7XG4gKlxuICogICAgICB9XG4gKiAgfVxuICpcbiAqICBgYGBcbiAqXG4gKi9cblxuXG5leHBvcnQgY29uc3QgRERfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERyb3Bkb3duQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRyb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24uY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRERfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEcm9wZG93bkNvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIHN0YXRpYyByZWFkb25seSBNYXhOdW1TaG93biA9IDEwO1xuXG4gICAgLyoqXG4gICAgICogT3JkZXJlZCBsaXN0IG9mIGl0ZW1zIHJlbmRlcmVkIGFzIGEgcG9wdXAgbWVudVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBJdGVtcyB3aGljaCB3YXMgc2VsZWN0ZWQgYXMgYSBkZWZhdWx0IHZhbHVlIG9yIGJ5IHVzZWQgaW4gdGhlIHBvcHVwIG1lbnUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb246IGFueTtcblxuICAgIC8qKlxuICAgICAqIFN0cmluZyByZW5kZXJlZCBhcyBmaXJzdCB2YWx1ZSBpbiB0aGUgcG9wdXAgd2hpY2ggbGV0IHRoZSB1c2VyIHRvIG1ha2UgJ25vIHNlbGVjdGlvbicgZnJvbVxuICAgICAqIGF2YWlsYWJsZSBsaXN0IG9mIHZhbHVlcy4gV2hlbiB0aGlzIG9wdGlvbiBpcyBhY3RpdmUgYW5kIHVzZSBtYWtlIHRoaXMgc2VsZWN0aW9uIHdlIHNhdmUgYVxuICAgICAqIE5VTEwgdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vU2VsZWN0aW9uU3RyaW5nOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0IGEgaXRlbVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIGludGVybmFsIGxpc3QgdGhhdCBoaWRlcyBQcmltZU5HIHNwZWNpZmljcyB3aGVyZSB3ZSBuZWVkIHRvIGRlYWwgd2l0aCBzcGVjaWFsXG4gICAgICogdHlwZTogU2VsZWN0SXRlbS4gT3VyIGV4cGVjdGF0aW9uIGlzIHRoYXQgeW91IG5lZWQgdG8gYmUgYWJsZSB0byBwYXNzIHJlZ3VsYXIgc3RyaW5nIHZhbHVlc1xuICAgICAqIG9yIGZ1bGwgb2JqZWN0IGFuZCBub3QgdHJ5aW5nIHRvIHdyYXAgaXQgaW50byBleHRyYSBsYXllci5cbiAgICAgKlxuICAgICAqL1xuICAgIGludGVybmFsTGlzdDogU2VsZWN0SXRlbVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBFbWJlZGRlZCB0ZW1wbGF0ZSBkZWZpbmVkIGJ5IHVzZXIuIElmIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgYW5kIHdoaWxlIHJlbmRlcmluZ1xuICAgICAqIGl0ZW0gd2UgYXNzdW1lIHdlIGFyZSBkZWFsaW5nIHdpdGggcHJpbWl0aXZlIHR5cGVzIGFuZCBjYWxsIG9uIGVhY2ggaXRlbSB0b1N0cmluZygpLCBpZiB3ZVxuICAgICAqIGFyZSBkZWFsaW5nIHdpdGggb2JqZWN0LCB0aGVuIHdlIGV4cGVjdCB1c2VyIHRvIHByb3ZpZGUgYSB0ZW1wbGF0ZSBhbmQgdGVsbCB0aGUgZHJvcGRvd24gb2ZcbiAgICAgKiBlYWNoIGl0ZW0gc2hvdWxkIGJlIGhhbmRsZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtb2RlbCB1c2VkIGZvciBlbWJlZGRlZCB2ZXJzaW9uLlxuICAgICAqL1xuICAgIG1vZGVsOiBTZWxlY3RJdGVtO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZG86IFB1dCBiYWNrIHRoZSBzY3JvbGxpbmcgb3B0aW9uIG9uY2Ugd2UgZGVjaWRlIHNvLiBDdXJyZW50bHkgdGhlIHJlcXVpcmVtZW50cyBhcmVcbiAgICAgKiBzaG93IG9ubHkgMTAgaXRlbXMgbWF4LCBubyBzY3JvbGxpbmcuIEZ1bmN0aW9uYWxpdHkgY29tbWVudGVkIG91dCBjYW4gc2hvdyBzY3JvbGxiYXIgd2l0aFxuICAgICAqIHNlYXJjaCBmaWx0ZXIuXG4gICAgICovXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuc2VsZWN0aW9uKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gdHJhbnNmb3JtIGEgdmFsdWUgdG8gUHJpbWVOZyBGb3JtYXQsIHdlIGFyZSBub3QgcmVhbGx5IGJlIHVzaW5nIGEgbGFiZWwgZmllbGQgb25seSBhXG4gICAgICAgIC8vIHZhbHVlLlxuICAgICAgICB0aGlzLmludGVybmFsTGlzdCA9IFtdO1xuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KHRoaXMubm9TZWxlY3Rpb25TdHJpbmcpKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmludGVybmFsTGlzdC5wdXNoKHtcbiAgICAgICAgLy8gICAgICAgICBsYWJlbDogdGhpcy5ub1NlbGVjdGlvblN0cmluZyxcbiAgICAgICAgLy8gICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMubm9TZWxlY3Rpb25TdHJpbmc7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgdGhpcy5saXN0Lmxlbmd0aCA+PSBEcm9wZG93bkNvbXBvbmVudC5NYXhOdW1TaG93bikge1xuXG4gICAgICAgICAgICB0aGlzLmludGVybmFsTGlzdCA9IHRoaXMubGlzdC5zbGljZSgwLCBEcm9wZG93bkNvbXBvbmVudC5NYXhOdW1TaG93bikubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbS50b1N0cmluZygpLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbExpc3QgPSB0aGlzLmxpc3Quc2xpY2UoMCkubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbS50b1N0cmluZygpLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaGFzRW1iZWRkZWRUZW1wbGF0ZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuaXRlbVRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0byBwcmV2ZW50IEVtcHR5IGl0ZW0gdG8gYmUgcmVuZGVyZWRcbiAgICAgKlxuICAgICAqIHRvZG86IFJlcG9ydCB0aGlzIG9uIFByaW1lTmdcbiAgICAgKlxuICAgICAqL1xuICAgIGl0ZW1FeGlzdChpdGVtOiBhbnkpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGl0ZW0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkcm9wZG93biBsaXN0IGlzIG1vcmUgdGhlbiBkZWZpbmVkIGNvbnN0YW50IE1heE51bVNob3duICgxMCkgYXV0b21hdGljYWxseSBzaG93IGZpbHRlclxuICAgICAqIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgc2hvd0ZpbHRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIHJldHVybiBpc1ByZXNlbnQodGhpcy5saXN0KSAmJiB0aGlzLmxpc3QubGVuZ3RoID4gRHJvcGRvd25Db21wb25lbnQuTWF4TnVtU2hvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVcGRhdGVzIGludGVybmFsIG1vZGVscyBvZiBjdXJyZW50IHNlbGVjdGlvbnMgYW5kIHRyaWdnZXJzIG9uU2VsZWN0aW9uIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBvbkl0ZW1TZWxlY3Rpb24odmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdmFsdWUudmFsdWU7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh2YWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHZhbHVlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5SXRlbShpdGVtOiBhbnkpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGl0ZW0pID8gaXRlbS5sYWJlbCA6ICdObyBTZWxlY3Rpb24nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoIWVxdWFscyh2YWx1ZSwgdGhpcy5zZWxlY3Rpb24pKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cblxuXG4iXX0=