/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var DD_CONTROL_VALUE_ACCESSOR = {
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
                    providers: [
                        DD_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return DropdownComponent; }) }
                    ],
                    styles: ["/deep/ .ui-dropdown-panel{z-index:10010!important;top:35px!important}/deep/ .ui-dropdown-panel .ui-dropdown-items-wrapper{max-height:none!important}/deep/ .ui-dropdown-panel .ui-dropdown-item{padding:.65em 2em .65em .64em;margin:0}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container{width:100%}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container .fa{top:1.2em}/deep/ .ui-dropdown-panel .ui-dropdown-list{padding:1em 0}/deep/ .w-dropdown:not(.ng-dirty) label{color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger.ui-corner-right{border-left:none;color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger .pi{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-dropdown .ui-dropdown-trigger .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-dropdown .ui-dropdown-label{padding-right:2.4em}"]
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRGpFLFdBQWEseUJBQXlCLEdBQVE7SUFDMUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBYXFDLDZDQUFpQjtJQXlEcEQsMkJBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFJSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBTGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7NEJBOUJ2QixJQUFJLFlBQVksRUFBRTs7S0FpQ2xEO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG9DQUFROzs7Ozs7SUFBUjtRQUdJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BC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LENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0tBRUo7b0NBM0s2QixFQUFFOztnQkFibkMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QiwreURBQXNDO29CQUV0QyxTQUFTLEVBQUU7d0JBQ1AseUJBQXlCO3dCQUN6QixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQyxFQUFDO3FCQUNqRjs7aUJBRUo7Ozs7Z0JBbEVPLFdBQVc7Z0JBQ1gsaUJBQWlCLHVCQTRIUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDOzs7dUJBbEQ5RSxLQUFLOzRCQU1MLEtBQUs7b0NBUUwsS0FBSzs4QkFNTCxNQUFNOytCQW1CTixZQUFZLFNBQUMsY0FBYzs7NEJBcEpoQztFQXFHdUMsaUJBQWlCO1NBQTNDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGYsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgZXF1YWxzLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcblxuXG4vKipcbiAqIEEgcG9wdXAgbGlrZSBjb21wb25lbnQgcmVuZGVyaW5nIGxpc3Qgb2YgdmFsdWVzIGFzLiBCYXNlZCBvbiBQcmltZU5HIGNvbXBvbmVudCBhbmQgb25lIG9mIHRoZVxuICogbWFpbiByZWFzb24gd2h5IHdlIG5lZWQgdG8gd3JhcCB0aGlzIGlzIHRvIGV4dGVuZCBpdHMgY2FwYWJpbGl0aWVzIHRvIGFjY2VwdCBhbG1vc3QgYW55XG4gKiBkYXRhIHR5cGUgd2l0aG91dCB1c2luZyBQcmltZW5zJ3Mgc3BlY2lmaWMgU2VsZWN0SXRlbSB0eXBlLlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3Nob3dEcm9wRG93bicgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1kcm9wZG93biBbbGlzdF09XCJ0ZXN0SXRlbVNtYWxsXCJcbiAqICAgICAob25TZWxlY3Rpb24pPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiPjwvYXctZHJvcGRvd24+J1xuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIE15RHJvcENvbXBvbmVudFxuICogIHtcbiAqICAgICAgdGVzdEl0ZW1TbWFsbDogc3RyaW5nW10gPSBbJ3ZpZXcnICwgJ2VkaXQnXTtcbiAqXG4gKiAgICAgIC8vIHdoZW4geW91IHN3aXRjaCBsaXN0IGJpbmRpbmcgdG8gcmVmZXJ0IHRvIGxhcmdlIGl0ZW0gZmlpbHRlciBhdXRvbWF0aWNhbGx5IGlzIHNob3duIGFuZFxuICogICAgIG1heCAxMCBpdGVtcyBhcmVcbiAqICAgICAgLy8gdmlzaWJsZVxuICogICAgICB0ZXN0SXRlbUxhcmdlOiBzdHJpbmdbXSA9IFsndmlldycgLCAnZWRpdCcgLCAnZnJhbmsnICwgJ2tvbGFyJyAsICdUaGUgU3VuJyAsICdEb2cnICxcbiAqICAgICAnQ29tcHV0ZXInICwgJ0EgRGVzaycgLFxuICogICAgICAnTXkgQ2FyJyAsICdQZW5jaWwnICwgJ1RoaXMgUGFnZScgLCAnWWVzdGVyZGF5JyAsICdNb25kYXknICwgJ1R1ZXNkYXknICwgJ0JNVyBSMTIwMCBHUycgLFxuICogICAgICdDemVjaCBSZXB1YmxpYycgLFxuICogICAgICAnTGFzdCBJdGVtJ107XG4gKlxuICpcbiAqICAgICAgaXRlbVNlbGVjdGVkOiBzdHJpbmcgPSAndmlldyc7XG4gKiAgICAgIGl0ZW1TZWxlY3RlZExnOiBzdHJpbmcgPSAnTW9uZGF5JztcbiAqXG4gKiAgICAgIG5vc2VsU3RyaW5nOiBzdHJpbmcgPSAnKG5vIHNlbGVjdGlvbiknO1xuICpcbiAqXG4gKiAgICAgIG9uU2VsZWN0aW9uIChldmVudCk6IHZvaWRcbiAqICAgICAge1xuICogICAgICAgICAgdGhpcy5pdGVtU2VsZWN0ZWQgPSBldmVudDtcbiAqXG4gKiAgICAgIH1cbiAqICB9XG4gKlxuICogIGBgYFxuICpcbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBERF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlVXJsOiAnZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkcm9wZG93bi5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBERF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERyb3Bkb3duQ29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Db21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IE1heE51bVNob3duID0gMTA7XG5cbiAgICAvKipcbiAgICAgKiBPcmRlcmVkIGxpc3Qgb2YgaXRlbXMgcmVuZGVyZWQgYXMgYSBwb3B1cCBtZW51XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIEl0ZW1zIHdoaWNoIHdhcyBzZWxlY3RlZCBhcyBhIGRlZmF1bHQgdmFsdWUgb3IgYnkgdXNlZCBpbiB0aGUgcG9wdXAgbWVudS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGlvbjogYW55O1xuXG4gICAgLyoqXG4gICAgICogU3RyaW5nIHJlbmRlcmVkIGFzIGZpcnN0IHZhbHVlIGluIHRoZSBwb3B1cCB3aGljaCBsZXQgdGhlIHVzZXIgdG8gbWFrZSAnbm8gc2VsZWN0aW9uJyBmcm9tXG4gICAgICogYXZhaWxhYmxlIGxpc3Qgb2YgdmFsdWVzLiBXaGVuIHRoaXMgb3B0aW9uIGlzIGFjdGl2ZSBhbmQgdXNlIG1ha2UgdGhpcyBzZWxlY3Rpb24gd2Ugc2F2ZSBhXG4gICAgICogTlVMTCB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm9TZWxlY3Rpb25TdHJpbmc6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgaW50ZXJuYWwgbGlzdCB0aGF0IGhpZGVzIFByaW1lTkcgc3BlY2lmaWNzIHdoZXJlIHdlIG5lZWQgdG8gZGVhbCB3aXRoIHNwZWNpYWxcbiAgICAgKiB0eXBlOiBTZWxlY3RJdGVtLiBPdXIgZXhwZWN0YXRpb24gaXMgdGhhdCB5b3UgbmVlZCB0byBiZSBhYmxlIHRvIHBhc3MgcmVndWxhciBzdHJpbmcgdmFsdWVzXG4gICAgICogb3IgZnVsbCBvYmplY3QgYW5kIG5vdCB0cnlpbmcgdG8gd3JhcCBpdCBpbnRvIGV4dHJhIGxheWVyLlxuICAgICAqXG4gICAgICovXG4gICAgaW50ZXJuYWxMaXN0OiBTZWxlY3RJdGVtW107XG5cblxuICAgIC8qKlxuICAgICAqIEVtYmVkZGVkIHRlbXBsYXRlIGRlZmluZWQgYnkgdXNlci4gSWYgdXNlciBkb2VzIG5vdCBwcm92aWRlIGFueSB0ZW1wbGF0ZSBhbmQgd2hpbGUgcmVuZGVyaW5nXG4gICAgICogaXRlbSB3ZSBhc3N1bWUgd2UgYXJlIGRlYWxpbmcgd2l0aCBwcmltaXRpdmUgdHlwZXMgYW5kIGNhbGwgb24gZWFjaCBpdGVtIHRvU3RyaW5nKCksIGlmIHdlXG4gICAgICogYXJlIGRlYWxpbmcgd2l0aCBvYmplY3QsIHRoZW4gd2UgZXhwZWN0IHVzZXIgdG8gcHJvdmlkZSBhIHRlbXBsYXRlIGFuZCB0ZWxsIHRoZSBkcm9wZG93biBvZlxuICAgICAqIGVhY2ggaXRlbSBzaG91bGQgYmUgaGFuZGxlZFxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaXRlbVRlbXBsYXRlJylcbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1vZGVsIHVzZWQgZm9yIGVtYmVkZGVkIHZlcnNpb24uXG4gICAgICovXG4gICAgbW9kZWw6IFNlbGVjdEl0ZW07XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBCYXNlRm9ybUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9kbzogUHV0IGJhY2sgdGhlIHNjcm9sbGluZyBvcHRpb24gb25jZSB3ZSBkZWNpZGUgc28uIEN1cnJlbnRseSB0aGUgcmVxdWlyZW1lbnRzIGFyZVxuICAgICAqIHNob3cgb25seSAxMCBpdGVtcyBtYXgsIG5vIHNjcm9sbGluZy4gRnVuY3Rpb25hbGl0eSBjb21tZW50ZWQgb3V0IGNhbiBzaG93IHNjcm9sbGJhciB3aXRoXG4gICAgICogc2VhcmNoIGZpbHRlci5cbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5zZWxlY3Rpb24pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sID0gPEZvcm1Db250cm9sPiB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyB0cmFuc2Zvcm0gYSB2YWx1ZSB0byBQcmltZU5nIEZvcm1hdCwgd2UgYXJlIG5vdCByZWFsbHkgYmUgdXNpbmcgYSBsYWJlbCBmaWVsZCBvbmx5IGFcbiAgICAgICAgLy8gdmFsdWUuXG4gICAgICAgIHRoaXMuaW50ZXJuYWxMaXN0ID0gW107XG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQodGhpcy5ub1NlbGVjdGlvblN0cmluZykpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaW50ZXJuYWxMaXN0LnB1c2goe1xuICAgICAgICAvLyAgICAgICAgIGxhYmVsOiB0aGlzLm5vU2VsZWN0aW9uU3RyaW5nLFxuICAgICAgICAvLyAgICAgICAgIHZhbHVlOiBudWxsXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5ub1NlbGVjdGlvblN0cmluZztcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSAmJiB0aGlzLmxpc3QubGVuZ3RoID49IERyb3Bkb3duQ29tcG9uZW50Lk1heE51bVNob3duKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxMaXN0ID0gdGhpcy5saXN0LnNsaWNlKDAsIERyb3Bkb3duQ29tcG9uZW50Lk1heE51bVNob3duKS5tYXAoKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBpdGVtLnRvU3RyaW5nKCksIHZhbHVlOiBpdGVtfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsTGlzdCA9IHRoaXMubGlzdC5zbGljZSgwKS5tYXAoKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBpdGVtLnRvU3RyaW5nKCksIHZhbHVlOiBpdGVtfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBoYXNFbWJlZGRlZFRlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5pdGVtVGVtcGxhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRvIHByZXZlbnQgRW1wdHkgaXRlbSB0byBiZSByZW5kZXJlZFxuICAgICAqXG4gICAgICogdG9kbzogUmVwb3J0IHRoaXMgb24gUHJpbWVOZ1xuICAgICAqXG4gICAgICovXG4gICAgaXRlbUV4aXN0KGl0ZW06IGFueSlcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoaXRlbSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRyb3Bkb3duIGxpc3QgaXMgbW9yZSB0aGVuIGRlZmluZWQgY29uc3RhbnQgTWF4TnVtU2hvd24gKDEwKSBhdXRvbWF0aWNhbGx5IHNob3cgZmlsdGVyXG4gICAgICogaW5wdXQgZmllbGRcbiAgICAgKi9cbiAgICBzaG93RmlsdGVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gcmV0dXJuIGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIHRoaXMubGlzdC5sZW5ndGggPiBEcm9wZG93bkNvbXBvbmVudC5NYXhOdW1TaG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVwZGF0ZXMgaW50ZXJuYWwgbW9kZWxzIG9mIGN1cnJlbnQgc2VsZWN0aW9ucyBhbmQgdHJpZ2dlcnMgb25TZWxlY3Rpb24gZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSXRlbVNlbGVjdGlvbih2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZS52YWx1ZTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHZhbHVlLnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodmFsdWUudmFsdWUpO1xuICAgIH1cblxuICAgIGRpc3BsYXlJdGVtKGl0ZW06IGFueSlcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoaXRlbSkgPyBpdGVtLmxhYmVsIDogJ05vIFNlbGVjdGlvbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICghZXF1YWxzKHZhbHVlLCB0aGlzLnNlbGVjdGlvbikpIHtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuXG5cbiJdfQ==