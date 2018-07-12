/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var /** @type {?} */ DD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DropdownComponent; }),
    multi: true
};
var DropdownComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownComponent, _super);
    function DropdownComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * Event fired when user select a item
         */
        _this.onSelection = new EventEmitter();
        return _this;
    }
    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     */
    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     * @return {?}
     */
    DropdownComponent.prototype.ngOnInit = /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     * @return {?}
     */
    function () {
        if (this.isStandalone) {
            _super.prototype.ngOnInit.call(this);
            _super.prototype.registerFormControl.call(this, this.selection);
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
            this.internalList = this.list.slice(0, DropdownComponent.MaxNumShown).map(function (item) {
                return { label: item.toString(), value: item };
            });
        }
        else if (isPresent(this.list)) {
            this.internalList = this.list.slice(0).map(function (item) {
                return { label: item.toString(), value: item };
            });
        }
    };
    /**
     * @return {?}
     */
    DropdownComponent.prototype.hasEmbeddedTemplate = /**
     * @return {?}
     */
    function () {
        return isPresent(this.itemTemplate);
    };
    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     */
    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     * @param {?} item
     * @return {?}
     */
    DropdownComponent.prototype.itemExist = /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return isPresent(item);
    };
    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     */
    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     * @return {?}
     */
    DropdownComponent.prototype.showFilter = /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     * @return {?}
     */
    function () {
        return false;
        // return isPresent(this.list) && this.list.length > DropdownComponent.MaxNumShown;
    };
    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     */
    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     * @param {?} value
     * @return {?}
     */
    DropdownComponent.prototype.onItemSelection = /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.selection = value.value;
        this.onSelection.emit(value.value);
        if (this.isStandalone) {
            this.formControl.setValue(this.selection);
            this.formControl.markAsDirty({ onlySelf: true });
        }
        this.onModelChanged(value.value);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DropdownComponent.prototype.displayItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return isPresent(item) ? item.label : 'No Selection';
    };
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    DropdownComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            this.formControl.setValue(value);
        }
    };
    DropdownComponent.MaxNumShown = 10;
    DropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dropdown',
                    template: "<div class=\"w-dropdown\" [formGroup]=\"formGroup\">\n\n    <ng-template [ngIf]=\"isStandalone\">\n        <p-dropdown [options]=\"internalList\"\n                    [formControlName]=\"name\"\n                    [placeholder]=\"noSelectionString\"\n                    [autoWidth]=\"false\"\n                    [filter]=\"showFilter()\"\n                    (onChange)=\"onItemSelection($event)\">\n\n            <ng-template let-item pTemplate=\"item\">\n                <ng-template [ngIf]=\"!hasEmbeddedTemplate() && itemExist(item)\">\n                    {{item.label }}\n                </ng-template>\n\n                <ng-template [embeddedItem]=\"itemTemplate\" [item]=\"item\"\n                             *ngIf=\"hasEmbeddedTemplate() && itemExist(item)\">\n\n                </ng-template>\n            </ng-template>\n\n\n        </p-dropdown>\n    </ng-template>\n</div>\n\n\n<!-- no formControl Name here. ngModel cannot have formGroup around -->\n<ng-template [ngIf]=\"!isStandalone\">\n    <div class=\"w-dropdown\">\n        <p-dropdown [options]=\"internalList\"\n                    [(ngModel)]=\"selection\"\n                    [placeholder]=\"noSelectionString\"\n                    [autoWidth]=\"false\"\n                    [filter]=\"showFilter()\"\n                    (onChange)=\"onItemSelection($event)\">\n\n            <ng-template let-item pTemplate=\"item\">\n\n                <ng-template [ngIf]=\"!hasEmbeddedTemplate() && itemExist(item)\">\n                    {{item.label }}\n                </ng-template>\n                <ng-template [embeddedItem]=\"itemTemplate\" [item]=\"item\"\n                             *ngIf=\"hasEmbeddedTemplate() && itemExist(item)\">\n                </ng-template>\n            </ng-template>\n        </p-dropdown>\n    </div>\n</ng-template>\n",
                    styles: ["/deep/ .ui-dropdown-panel .ui-dropdown-items-wrapper{max-height:none!important}/deep/ .ui-dropdown-panel .ui-dropdown-item{padding:.65em 2em .65em .64em;margin:0}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container{width:100%}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container .fa{top:1.2em}/deep/ .ui-dropdown-panel .ui-dropdown-list{padding:1em 0}/deep/ .w-dropdown:not(.ng-dirty) label{color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger.ui-corner-right{border-left:none;color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger .pi{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-dropdown .ui-dropdown-trigger .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-dropdown .ui-dropdown-label{padding-right:2.4em}"],
                    providers: [
                        DD_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return DropdownComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    DropdownComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
    DropdownComponent.propDecorators = {
        list: [{ type: Input }],
        selection: [{ type: Input }],
        noSelectionString: [{ type: Input }],
        onSelection: [{ type: Output }],
        itemTemplate: [{ type: ContentChild, args: ['itemTemplate',] }]
    };
    return DropdownComponent;
}(BaseFormComponent));
export { DropdownComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRGpFLE1BQU0sQ0FBQyxxQkFBTSx5QkFBeUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUE4RHFDLDZDQUFpQjtJQXlEcEQsMkJBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFJSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBTGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7NEJBOUJ2QixJQUFJLFlBQVksRUFBRTs7S0FpQ2xEO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG9DQUFROzs7Ozs7SUFBUjtRQUdJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1lBQ2pCLGlCQUFNLG1CQUFtQixZQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUU3QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLHFCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQzthQUN2RTtTQUNKOzs7UUFLRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7UUFZdkIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRTVFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVM7Z0JBRWhGLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztTQUNOO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztnQkFFakQsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDaEQsQ0FBQyxDQUFDO1NBQ047S0FDSjs7OztJQUdELCtDQUFtQjs7O0lBQW5CO1FBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gscUNBQVM7Ozs7Ozs7O0lBQVQsVUFBVSxJQUFTO1FBRWYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtJQUdEOzs7T0FHRzs7Ozs7O0lBQ0gsc0NBQVU7Ozs7O0lBQVY7UUFFSSxNQUFNLENBQUMsS0FBSyxDQUFDOztLQUVoQjtJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsMkNBQWU7Ozs7Ozs7SUFBZixVQUFnQixLQUFVO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksSUFBUztRQUVqQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7S0FDeEQ7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCxzQ0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFVO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0tBRUo7b0NBM0s2QixFQUFFOztnQkE5RG5DLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHF5REFpRGI7b0JBQ0csTUFBTSxFQUFFLENBQUMsd3dCQUFzd0IsQ0FBQztvQkFDaHhCLFNBQVMsRUFBRTt3QkFDUCx5QkFBeUI7d0JBQ3pCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDLEVBQUM7cUJBQ2pGO2lCQUVKOzs7O2dCQW5ITyxXQUFXO2dCQUNYLGlCQUFpQix1QkE2S1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQzs7O3VCQWxEOUUsS0FBSzs0QkFNTCxLQUFLO29DQVFMLEtBQUs7OEJBTUwsTUFBTTsrQkFtQk4sWUFBWSxTQUFDLGNBQWM7OzRCQXJNaEM7RUFzSnVDLGlCQUFpQjtTQUEzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBBIHBvcHVwIGxpa2UgY29tcG9uZW50IHJlbmRlcmluZyBsaXN0IG9mIHZhbHVlcyBhcy4gQmFzZWQgb24gUHJpbWVORyBjb21wb25lbnQgYW5kIG9uZSBvZiB0aGVcbiAqIG1haW4gcmVhc29uIHdoeSB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpcyB0byBleHRlbmQgaXRzIGNhcGFiaWxpdGllcyB0byBhY2NlcHQgYWxtb3N0IGFueVxuICogZGF0YSB0eXBlIHdpdGhvdXQgdXNpbmcgUHJpbWVucydzIHNwZWNpZmljIFNlbGVjdEl0ZW0gdHlwZS5cbiAqXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6ICdzaG93RHJvcERvd24nICxcbiAqICAgICAgdGVtcGxhdGU6ICc8YXctZHJvcGRvd24gW2xpc3RdPVwidGVzdEl0ZW1TbWFsbFwiXG4gKiAgICAgKG9uU2VsZWN0aW9uKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIj48L2F3LWRyb3Bkb3duPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBNeURyb3BDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIHRlc3RJdGVtU21hbGw6IHN0cmluZ1tdID0gWyd2aWV3JyAsICdlZGl0J107XG4gKlxuICogICAgICAvLyB3aGVuIHlvdSBzd2l0Y2ggbGlzdCBiaW5kaW5nIHRvIHJlZmVydCB0byBsYXJnZSBpdGVtIGZpaWx0ZXIgYXV0b21hdGljYWxseSBpcyBzaG93biBhbmRcbiAqICAgICBtYXggMTAgaXRlbXMgYXJlXG4gKiAgICAgIC8vIHZpc2libGVcbiAqICAgICAgdGVzdEl0ZW1MYXJnZTogc3RyaW5nW10gPSBbJ3ZpZXcnICwgJ2VkaXQnICwgJ2ZyYW5rJyAsICdrb2xhcicgLCAnVGhlIFN1bicgLCAnRG9nJyAsXG4gKiAgICAgJ0NvbXB1dGVyJyAsICdBIERlc2snICxcbiAqICAgICAgJ015IENhcicgLCAnUGVuY2lsJyAsICdUaGlzIFBhZ2UnICwgJ1llc3RlcmRheScgLCAnTW9uZGF5JyAsICdUdWVzZGF5JyAsICdCTVcgUjEyMDAgR1MnICxcbiAqICAgICAnQ3plY2ggUmVwdWJsaWMnICxcbiAqICAgICAgJ0xhc3QgSXRlbSddO1xuICpcbiAqXG4gKiAgICAgIGl0ZW1TZWxlY3RlZDogc3RyaW5nID0gJ3ZpZXcnO1xuICogICAgICBpdGVtU2VsZWN0ZWRMZzogc3RyaW5nID0gJ01vbmRheSc7XG4gKlxuICogICAgICBub3NlbFN0cmluZzogc3RyaW5nID0gJyhubyBzZWxlY3Rpb24pJztcbiAqXG4gKlxuICogICAgICBvblNlbGVjdGlvbiAoZXZlbnQpOiB2b2lkXG4gKiAgICAgIHtcbiAqICAgICAgICAgIHRoaXMuaXRlbVNlbGVjdGVkID0gZXZlbnQ7XG4gKlxuICogICAgICB9XG4gKiAgfVxuICpcbiAqICBgYGBcbiAqXG4gKi9cblxuXG5leHBvcnQgY29uc3QgRERfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERyb3Bkb3duQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRyb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3LWRyb3Bkb3duXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc1N0YW5kYWxvbmVcIj5cbiAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwiaW50ZXJuYWxMaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm5vU2VsZWN0aW9uU3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgW2F1dG9XaWR0aF09XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJdPVwic2hvd0ZpbHRlcigpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uSXRlbVNlbGVjdGlvbigkZXZlbnQpXCI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbSBwVGVtcGxhdGU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNFbWJlZGRlZFRlbXBsYXRlKCkgJiYgaXRlbUV4aXN0KGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7aXRlbS5sYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW2VtYmVkZGVkSXRlbV09XCJpdGVtVGVtcGxhdGVcIiBbaXRlbV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNFbWJlZGRlZFRlbXBsYXRlKCkgJiYgaXRlbUV4aXN0KGl0ZW0pXCI+XG5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+XG5cblxuPCEtLSBubyBmb3JtQ29udHJvbCBOYW1lIGhlcmUuIG5nTW9kZWwgY2Fubm90IGhhdmUgZm9ybUdyb3VwIGFyb3VuZCAtLT5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaXNTdGFuZGFsb25lXCI+XG4gICAgPGRpdiBjbGFzcz1cInctZHJvcGRvd25cIj5cbiAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwiaW50ZXJuYWxMaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibm9TZWxlY3Rpb25TdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICBbYXV0b1dpZHRoXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW2ZpbHRlcl09XCJzaG93RmlsdGVyKClcIlxuICAgICAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25JdGVtU2VsZWN0aW9uKCRldmVudClcIj5cblxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtIHBUZW1wbGF0ZT1cIml0ZW1cIj5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGFzRW1iZWRkZWRUZW1wbGF0ZSgpICYmIGl0ZW1FeGlzdChpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICB7e2l0ZW0ubGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbZW1iZWRkZWRJdGVtXT1cIml0ZW1UZW1wbGF0ZVwiIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0VtYmVkZGVkVGVtcGxhdGUoKSAmJiBpdGVtRXhpc3QoaXRlbSlcIj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9wLWRyb3Bkb3duPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zLXdyYXBwZXJ7bWF4LWhlaWdodDpub25lIWltcG9ydGFudH0vZGVlcC8gLnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVte3BhZGRpbmc6LjY1ZW0gMmVtIC42NWVtIC42NGVtO21hcmdpbjowfS9kZWVwLyAudWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXJ7d2lkdGg6MTAwJX0vZGVlcC8gLnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1maWx0ZXItY29udGFpbmVyIC5mYXt0b3A6MS4yZW19L2RlZXAvIC51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tbGlzdHtwYWRkaW5nOjFlbSAwfS9kZWVwLyAudy1kcm9wZG93bjpub3QoLm5nLWRpcnR5KSBsYWJlbHtjb2xvcjojOTY5Njk2fS9kZWVwLyAudy1kcm9wZG93biAudWktZHJvcGRvd24tdHJpZ2dlci51aS1jb3JuZXItcmlnaHR7Ym9yZGVyLWxlZnQ6bm9uZTtjb2xvcjojOTY5Njk2fS9kZWVwLyAudy1kcm9wZG93biAudWktZHJvcGRvd24tdHJpZ2dlciAucGl7Zm9udC1mYW1pbHk6XCJTQVAgaWNvbiBmb250c1wiO2NvbG9yOiM3Njc2NzY7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjEuNGVtO21hcmdpbi1sZWZ0Oi0uODVlbX0vZGVlcC8gLnctZHJvcGRvd24gLnVpLWRyb3Bkb3duLXRyaWdnZXIgLnBpLWNhcmV0LWRvd246YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMWVmJ30vZGVlcC8gLnctZHJvcGRvd24gLnVpLWRyb3Bkb3duLWxhYmVse3BhZGRpbmctcmlnaHQ6Mi40ZW19YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEREX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd25Db21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgTWF4TnVtU2hvd24gPSAxMDtcblxuICAgIC8qKlxuICAgICAqIE9yZGVyZWQgbGlzdCBvZiBpdGVtcyByZW5kZXJlZCBhcyBhIHBvcHVwIG1lbnVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogSXRlbXMgd2hpY2ggd2FzIHNlbGVjdGVkIGFzIGEgZGVmYXVsdCB2YWx1ZSBvciBieSB1c2VkIGluIHRoZSBwb3B1cCBtZW51LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTdHJpbmcgcmVuZGVyZWQgYXMgZmlyc3QgdmFsdWUgaW4gdGhlIHBvcHVwIHdoaWNoIGxldCB0aGUgdXNlciB0byBtYWtlICdubyBzZWxlY3Rpb24nIGZyb21cbiAgICAgKiBhdmFpbGFibGUgbGlzdCBvZiB2YWx1ZXMuIFdoZW4gdGhpcyBvcHRpb24gaXMgYWN0aXZlIGFuZCB1c2UgbWFrZSB0aGlzIHNlbGVjdGlvbiB3ZSBzYXZlIGFcbiAgICAgKiBOVUxMIHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBub1NlbGVjdGlvblN0cmluZzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdCBhIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBpbnRlcm5hbCBsaXN0IHRoYXQgaGlkZXMgUHJpbWVORyBzcGVjaWZpY3Mgd2hlcmUgd2UgbmVlZCB0byBkZWFsIHdpdGggc3BlY2lhbFxuICAgICAqIHR5cGU6IFNlbGVjdEl0ZW0uIE91ciBleHBlY3RhdGlvbiBpcyB0aGF0IHlvdSBuZWVkIHRvIGJlIGFibGUgdG8gcGFzcyByZWd1bGFyIHN0cmluZyB2YWx1ZXNcbiAgICAgKiBvciBmdWxsIG9iamVjdCBhbmQgbm90IHRyeWluZyB0byB3cmFwIGl0IGludG8gZXh0cmEgbGF5ZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnRlcm5hbExpc3Q6IFNlbGVjdEl0ZW1bXTtcblxuXG4gICAgLyoqXG4gICAgICogRW1iZWRkZWQgdGVtcGxhdGUgZGVmaW5lZCBieSB1c2VyLiBJZiB1c2VyIGRvZXMgbm90IHByb3ZpZGUgYW55IHRlbXBsYXRlIGFuZCB3aGlsZSByZW5kZXJpbmdcbiAgICAgKiBpdGVtIHdlIGFzc3VtZSB3ZSBhcmUgZGVhbGluZyB3aXRoIHByaW1pdGl2ZSB0eXBlcyBhbmQgY2FsbCBvbiBlYWNoIGl0ZW0gdG9TdHJpbmcoKSwgaWYgd2VcbiAgICAgKiBhcmUgZGVhbGluZyB3aXRoIG9iamVjdCwgdGhlbiB3ZSBleHBlY3QgdXNlciB0byBwcm92aWRlIGEgdGVtcGxhdGUgYW5kIHRlbGwgdGhlIGRyb3Bkb3duIG9mXG4gICAgICogZWFjaCBpdGVtIHNob3VsZCBiZSBoYW5kbGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdpdGVtVGVtcGxhdGUnKVxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbW9kZWwgdXNlZCBmb3IgZW1iZWRkZWQgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBtb2RlbDogU2VsZWN0SXRlbTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2RvOiBQdXQgYmFjayB0aGUgc2Nyb2xsaW5nIG9wdGlvbiBvbmNlIHdlIGRlY2lkZSBzby4gQ3VycmVudGx5IHRoZSByZXF1aXJlbWVudHMgYXJlXG4gICAgICogc2hvdyBvbmx5IDEwIGl0ZW1zIG1heCwgbm8gc2Nyb2xsaW5nLiBGdW5jdGlvbmFsaXR5IGNvbW1lbnRlZCBvdXQgY2FuIHNob3cgc2Nyb2xsYmFyIHdpdGhcbiAgICAgKiBzZWFyY2ggZmlsdGVyLlxuICAgICAqL1xuICAgIG5nT25Jbml0KClcbiAgICB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW3RoaXMubmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHRyYW5zZm9ybSBhIHZhbHVlIHRvIFByaW1lTmcgRm9ybWF0LCB3ZSBhcmUgbm90IHJlYWxseSBiZSB1c2luZyBhIGxhYmVsIGZpZWxkIG9ubHkgYVxuICAgICAgICAvLyB2YWx1ZS5cbiAgICAgICAgdGhpcy5pbnRlcm5hbExpc3QgPSBbXTtcbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudCh0aGlzLm5vU2VsZWN0aW9uU3RyaW5nKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5pbnRlcm5hbExpc3QucHVzaCh7XG4gICAgICAgIC8vICAgICAgICAgbGFiZWw6IHRoaXMubm9TZWxlY3Rpb25TdHJpbmcsXG4gICAgICAgIC8vICAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLm5vU2VsZWN0aW9uU3RyaW5nO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIHRoaXMubGlzdC5sZW5ndGggPj0gRHJvcGRvd25Db21wb25lbnQuTWF4TnVtU2hvd24pIHtcblxuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbExpc3QgPSB0aGlzLmxpc3Quc2xpY2UoMCwgRHJvcGRvd25Db21wb25lbnQuTWF4TnVtU2hvd24pLm1hcCgoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGl0ZW0udG9TdHJpbmcoKSwgdmFsdWU6IGl0ZW19O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxMaXN0ID0gdGhpcy5saXN0LnNsaWNlKDApLm1hcCgoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGl0ZW0udG9TdHJpbmcoKSwgdmFsdWU6IGl0ZW19O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGhhc0VtYmVkZGVkVGVtcGxhdGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLml0ZW1UZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdG8gcHJldmVudCBFbXB0eSBpdGVtIHRvIGJlIHJlbmRlcmVkXG4gICAgICpcbiAgICAgKiB0b2RvOiBSZXBvcnQgdGhpcyBvbiBQcmltZU5nXG4gICAgICpcbiAgICAgKi9cbiAgICBpdGVtRXhpc3QoaXRlbTogYW55KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChpdGVtKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZHJvcGRvd24gbGlzdCBpcyBtb3JlIHRoZW4gZGVmaW5lZCBjb25zdGFudCBNYXhOdW1TaG93biAoMTApIGF1dG9tYXRpY2FsbHkgc2hvdyBmaWx0ZXJcbiAgICAgKiBpbnB1dCBmaWVsZFxuICAgICAqL1xuICAgIHNob3dGaWx0ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyByZXR1cm4gaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgdGhpcy5saXN0Lmxlbmd0aCA+IERyb3Bkb3duQ29tcG9uZW50Lk1heE51bVNob3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXBkYXRlcyBpbnRlcm5hbCBtb2RlbHMgb2YgY3VycmVudCBzZWxlY3Rpb25zIGFuZCB0cmlnZ2VycyBvblNlbGVjdGlvbiBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgb25JdGVtU2VsZWN0aW9uKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHZhbHVlLnZhbHVlO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodmFsdWUudmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh2YWx1ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgZGlzcGxheUl0ZW0oaXRlbTogYW55KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChpdGVtKSA/IGl0ZW0ubGFiZWwgOiAnTm8gU2VsZWN0aW9uJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCFlcXVhbHModmFsdWUsIHRoaXMuc2VsZWN0aW9uKSkge1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5cblxuIl19