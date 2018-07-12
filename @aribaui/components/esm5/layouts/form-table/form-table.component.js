/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ContentChildren, EventEmitter, forwardRef, Input, Output, QueryList } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BottomZoneComponent, LeftZoneComponent, MiddleZoneComponent, RightZoneComponent, TopZoneComponent } from '../five-zone-layout.component';
import { FormRowComponent } from './form-row/form-row.component';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * FormTable is a specific layout component for rendering Labels and its controls in two columns
 * and 5 different zones.
 *
 * We support LEFT, MIDDLE, RIGHT, TOP, BOTTOM zone where we can place our component or widgets.
 * This
 * component is used as primary layout to wrap all the common use cases. E.g. When we lay out
 * fields in the form I do not want controls to be aware of error validation, size, labels, and
 * some other things. Control such INPUT is just responsible for retrieve user value but not how it
 * appear on the page.
 *
 * This way we can be flexible how we treat widgets for different kinds of situation depending
 * where they appear
 * FormTable just like the rest of the components are using Model driven approach how to work with
 * data, mean we are using FormGroup, FormControl etc. FormGroup can be passed into the FormTable,
 * otherwise its automatically created when the FormTable is instantiated.
 *
 * FormGroup is saved insode Environment where we are using this to pass this around the pages and
 * components.
 *
 * ### Example
 *
 * Simple Layout fields and its control
 *
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: `
 *  			<aw-form-table [formGroup]="formGroup" (onSubmit)=>
 *  				<aw-form-row [label]="'name'" [name]="'name'">
 *  					<aw-input-field [type]="'string'"></aw-input-field>
 *  				</aw-form-row>
 *
 *  				<aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *  					<aw-checkbox-list [list]="checkBoxListValues"
 *  					                 [selections]="selectedValues"
 *  					                 [layout]="'inline'"
 *  					                 (onSelection)="onCBClick($event)">
 *  					</aw-checkbox-list>
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'Gender'" [name]="'gender'">
 *
 *  					<aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *
 *  					</aw-radiobutton-list>
 *
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'My birthdate'" [name]="'birthDate'" [size]="'small'">
 *
 *  					<aw-date-time [value]="date" [editable]="editable" [showTime]="showTime">
 *  					</aw-date-time>
 *  				</aw-form-row>
 *  			</aw-form-table>
 *    `
 *  })
 *  export class ShowUserInfoComponent
 *  {
 *       checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' , 'silver'
 *     , 'black' , 'Green'
 *     , 'Gray' , 'Navy' ,
 *          'Olive' , 'Aqua' , 'Purple'];
 *      selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *      rbValues: string[] = ['male' , 'female' , 'other'];
 *      rbSelection: string = 'male';
 *      editable: boolean = true;
 *      showTime: boolean = true;
 *
 *      formGroup: FormGroup = new FormGroup({});
 *
 *
 *      onCBClick (event): void
 *      {
 *          console.log('onCBClick = ' + event);
 *      }
 *
 *      onSubmit (model: any): void
 *      {
 *         console.log(model)
 *
 *         // will print { name:null, myColors:['blue' , 'Olive' , 'Aqua' , 'Purple'], gender:
 *     male}
 *      }
 *
 *  }
 *
 *  ```
 *
 *  Or you can use zone to layout these fields into two columns:
 *
 *  Current zones are implement with <ng-content SELECT> which is just a selector to searches for
 *     specific pattern. In our case instead of creating extra wrapper custom component use simple
 *     CSS class
 *
 *
 *  ```
 *            <aw-form-table #metaFormTable [editable]="editing"
 *                          [useFiveZone]="isFiveZoneLayout"
 *                          (onSubmit)="onSaveAction($event)">
 *
 *                <aw-left  *ngIf="canShowZone('zLeft')">
 *
 *                        <aw-form-row [label]="'name'" [name]="'name'">
 *                            <aw-input-field [type]="'string'"></aw-input-field>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *                            <aw-checkbox-list [list]="checkBoxListValues"
 *                                             [selections]="selectedValues"
 *                                             [layout]="'inline'"
 *                                             (onSelection)="onCBClick($event)">
 *                            </aw-checkbox-list>
 *                        </aw-form-row>
 *                </aw-left>
 *
 *
 *                <aw-right  *ngIf="canShowZone('zRight')">
 *                        <aw-form-row [label]="'Gender'" [name]="'gender'">
 *                                <aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *                                </aw-radiobutton-list>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'My birthdate'" [name]="'birthDate'"
 *     [size]="'small'">
 *                            <aw-date-time [value]="date" [editable]="editable"
 *     [showTime]="showTime">
 *                            </aw-date-time>
 *                        </aw-form-row>
 *                </<aw-right>
 *            </aw-form-table>
 *
 *  ```
 *
 *  todo: remove my css selectors for zones and replace it with real component even just a tag
 *  todo: would work file
 *
 */
var FormTableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormTableComponent, _super);
    function FormTableComponent(env) {
        var _this = _super.call(this, env, null) || this;
        _this.env = env;
        /**
         * Used for the form layout to see if we need to render labels stacked  or side by side next to
         * the control
         *
         */
        _this.labelsOnTop = false;
        /**
         *
         * Is this a 4 zone layout
         *
         */
        _this.useFiveZone = false;
        /**
         * For certain usecase we dont want to set automatically this to all children
         */
        _this.editabilityCheck = true;
        /**
         *  Triggers when the <form> is submitted. onSubmit we emit the whole formController objects
         *
         *
         */
        _this.onSubmit = new EventEmitter();
        /**
         * Cache calculated properties when init this component
         *
         */
        _this.hasOneColumn = false;
        _this.hasTwoColumn = false;
        _this.hasThreeColumn = false;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FormTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (isPresent(changes['editable']) &&
            changes['editable'].previousValue !== changes['editable'].currentValue) {
            this.updateFormFields();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FormTableComponent.prototype.onSubmitForm = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onSubmit.emit(event);
    };
    /**
     *
     * Are labels on top
     *
     */
    /**
     *
     * Are labels on top
     *
     * @return {?}
     */
    FormTableComponent.prototype.isLabelsOnTop = /**
     *
     * Are labels on top
     *
     * @return {?}
     */
    function () {
        return this.labelsOnTop;
    };
    /**
     *
     * Used by child component to inherit editability
     *
     */
    /**
     *
     * Used by child component to inherit editability
     *
     * @return {?}
     */
    FormTableComponent.prototype.isFormEditable = /**
     *
     * Used by child component to inherit editability
     *
     * @return {?}
     */
    function () {
        return this.editable;
    };
    /**
     * @return {?}
     */
    FormTableComponent.prototype.applyColumns = /**
     * @return {?}
     */
    function () {
        if (!this.useFiveZone && this.hasAnyZones()) {
            throw new Error('Zones detected in the FormTable but useFiveZone option is false');
        }
        this.hasOneColumn = !isPresent(this.rightZone) && !isPresent(this.middleZone);
        this.hasTwoColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
            !isPresent(this.middleZone);
        this.hasThreeColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
            isPresent(this.middleZone);
        if (this.hasTwoColumn && !this.isTwoZoneReady()) {
            this.leftZone.classList += ' ui-md-6 ui-lg-6';
            this.rightZone.classList += ' ui-md-6 ui-lg-6';
        }
        if (this.hasThreeColumn && !this.isThreeZoneReady()) {
            this.leftZone.classList += ' ui-md-6 ui-lg-4';
            this.rightZone.classList += ' ui-md-6 ui-lg-4';
        }
    };
    /**
     * @return {?}
     */
    FormTableComponent.prototype.hasAnyZones = /**
     * @return {?}
     */
    function () {
        return isPresent(this.leftZone) || isPresent(this.rightZone) || isPresent(this.middleZone)
            || isPresent(this.topZone) || isPresent(this.bottomZone);
    };
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     */
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    FormTableComponent.prototype.isTwoZoneReady = /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    function () {
        return this.leftZone.classList.indexOf('ui-lg-6') > 0 &&
            this.leftZone.classList.indexOf('ui-lg-6') > 0;
    };
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     */
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    FormTableComponent.prototype.isThreeZoneReady = /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    function () {
        return this.leftZone.classList.indexOf('ui-lg-4') > 0 &&
            this.leftZone.classList.indexOf('ui-lg-4') > 0;
    };
    /**
     * @return {?}
     */
    FormTableComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // problem since Angular 4.2, ngAfterContentInit
        // without this I get error that value was changed after view was checked
        // todo: refactor  - mainly our zones left, right middle
        setTimeout(function () {
            _this.applyColumns();
            _this.updateFormFields();
            _this.adjustLayout();
        });
    };
    /**
     * @return {?}
     */
    FormTableComponent.prototype.updateFormFields = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.editabilityCheck && isPresent(this.formFields) && this.formFields.length > 0) {
            this.formFields.forEach(function (item) {
                item.editable = _this.editable;
                // item.formGroup = this.formGroup;
            });
        }
    };
    /**
     * Based on if we are 2 or 3 or 1 column layout we need to adjust widgets width within the
     * form row.
     * @return {?}
     */
    FormTableComponent.prototype.adjustLayout = /**
     * Based on if we are 2 or 3 or 1 column layout we need to adjust widgets width within the
     * form row.
     * @return {?}
     */
    function () {
        if (isPresent(this.rows) && this.rows.length > 0) {
            if (this.hasThreeColumn) {
                this.rows.forEach(function (item) { return item.size = 'large'; });
            }
        }
    };
    FormTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-form-table',
                    template: "<form class=\"w-form-table ui-g ui-fluid\" [formGroup]=\"formGroup\"\n      [ngClass]=\"styleClass\"\n      (ngSubmit)=\"onSubmitForm(formGroup.value)\" novalidate>\n\n    <div class=\"ui-g-12 ui-g-nopad\">\n\n        <div class=\"ui-g\">\n            <ng-content></ng-content>\n        </div>\n\n    </div>\n</form>\n\n",
                    styles: [".page-container>form{margin-top:1em}.w-form-table button{float:right}"],
                    providers: [
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return FormTableComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    FormTableComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    FormTableComponent.propDecorators = {
        labelsOnTop: [{ type: Input }],
        useFiveZone: [{ type: Input }],
        editabilityCheck: [{ type: Input }],
        onSubmit: [{ type: Output }],
        leftZone: [{ type: ContentChild, args: [LeftZoneComponent,] }],
        middleZone: [{ type: ContentChild, args: [MiddleZoneComponent,] }],
        rightZone: [{ type: ContentChild, args: [RightZoneComponent,] }],
        topZone: [{ type: ContentChild, args: [TopZoneComponent,] }],
        bottomZone: [{ type: ContentChild, args: [BottomZoneComponent,] }],
        formFields: [{ type: ContentChildren, args: [BaseFormComponent, { descendants: true },] }],
        rows: [{ type: ContentChildren, args: [forwardRef(function () { return FormRowComponent; }), { descendants: true },] }]
    };
    return FormTableComponent;
}(BaseFormComponent));
export { FormTableComponent };
function FormTableComponent_tsickle_Closure_declarations() {
    /**
     * Used for the form layout to see if we need to render labels stacked  or side by side next to
     * the control
     *
     * @type {?}
     */
    FormTableComponent.prototype.labelsOnTop;
    /**
     *
     * Is this a 4 zone layout
     *
     * @type {?}
     */
    FormTableComponent.prototype.useFiveZone;
    /**
     * For certain usecase we dont want to set automatically this to all children
     * @type {?}
     */
    FormTableComponent.prototype.editabilityCheck;
    /**
     *  Triggers when the <form> is submitted. onSubmit we emit the whole formController objects
     *
     *
     * @type {?}
     */
    FormTableComponent.prototype.onSubmit;
    /**
     * These properties represent individual zones and we use them to adjust our column grid
     * layout
     * @type {?}
     */
    FormTableComponent.prototype.leftZone;
    /** @type {?} */
    FormTableComponent.prototype.middleZone;
    /** @type {?} */
    FormTableComponent.prototype.rightZone;
    /** @type {?} */
    FormTableComponent.prototype.topZone;
    /** @type {?} */
    FormTableComponent.prototype.bottomZone;
    /** @type {?} */
    FormTableComponent.prototype.formFields;
    /** @type {?} */
    FormTableComponent.prototype.rows;
    /**
     * Cache calculated properties when init this component
     *
     * @type {?}
     */
    FormTableComponent.prototype.hasOneColumn;
    /** @type {?} */
    FormTableComponent.prototype.hasTwoColumn;
    /** @type {?} */
    FormTableComponent.prototype.hasThreeColumn;
    /** @type {?} */
    FormTableComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ25CLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrS3pCLDhDQUFpQjtJQWtFckQsNEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUNuQjtRQUhrQixTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs7NEJBekRYLEtBQUs7Ozs7Ozs0QkFTTCxLQUFLOzs7O2lDQU1ELElBQUk7Ozs7Ozt5QkFRRixJQUFJLFlBQVksRUFBRTs7Ozs7NkJBNkJ4QixLQUFLOzZCQUNMLEtBQUs7K0JBQ0gsS0FBSzs7S0FNOUI7Ozs7O0lBR0Qsd0NBQVc7Ozs7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QUM7YUFDdEU7U0FFSjs7O2dCQWpPUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxrVUFhYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyx1RUFBdUUsQ0FBQztvQkFDakYsU0FBUyxFQUFFO3dCQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLEVBQUM7cUJBQ2xGO2lCQUNKOzs7O2dCQTFLTyxXQUFXOzs7OEJBbUxkLEtBQUs7OEJBU0wsS0FBSzttQ0FNTCxLQUFLOzJCQVFMLE1BQU07MkJBUU4sWUFBWSxTQUFDLGlCQUFpQjs2QkFFOUIsWUFBWSxTQUFDLG1CQUFtQjs0QkFFaEMsWUFBWSxTQUFDLGtCQUFrQjswQkFFL0IsWUFBWSxTQUFDLGdCQUFnQjs2QkFFN0IsWUFBWSxTQUFDLG1CQUFtQjs2QkFHaEMsZUFBZSxTQUFDLGlCQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzt1QkFHdEQsZUFBZSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7OzZCQWhRNUU7RUEyTXdDLGlCQUFpQjtTQUE1QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCb3R0b21ab25lQ29tcG9uZW50LFxuICAgIExlZnRab25lQ29tcG9uZW50LFxuICAgIE1pZGRsZVpvbmVDb21wb25lbnQsXG4gICAgUmlnaHRab25lQ29tcG9uZW50LFxuICAgIFRvcFpvbmVDb21wb25lbnRcbn0gZnJvbSAnLi4vZml2ZS16b25lLWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogRm9ybVRhYmxlIGlzIGEgc3BlY2lmaWMgbGF5b3V0IGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIExhYmVscyBhbmQgaXRzIGNvbnRyb2xzIGluIHR3byBjb2x1bW5zXG4gKiBhbmQgNSBkaWZmZXJlbnQgem9uZXMuXG4gKlxuICogV2Ugc3VwcG9ydCBMRUZULCBNSURETEUsIFJJR0hULCBUT1AsIEJPVFRPTSB6b25lIHdoZXJlIHdlIGNhbiBwbGFjZSBvdXIgY29tcG9uZW50IG9yIHdpZGdldHMuXG4gKiBUaGlzXG4gKiBjb21wb25lbnQgaXMgdXNlZCBhcyBwcmltYXJ5IGxheW91dCB0byB3cmFwIGFsbCB0aGUgY29tbW9uIHVzZSBjYXNlcy4gRS5nLiBXaGVuIHdlIGxheSBvdXRcbiAqIGZpZWxkcyBpbiB0aGUgZm9ybSBJIGRvIG5vdCB3YW50IGNvbnRyb2xzIHRvIGJlIGF3YXJlIG9mIGVycm9yIHZhbGlkYXRpb24sIHNpemUsIGxhYmVscywgYW5kXG4gKiBzb21lIG90aGVyIHRoaW5ncy4gQ29udHJvbCBzdWNoIElOUFVUIGlzIGp1c3QgcmVzcG9uc2libGUgZm9yIHJldHJpZXZlIHVzZXIgdmFsdWUgYnV0IG5vdCBob3cgaXRcbiAqIGFwcGVhciBvbiB0aGUgcGFnZS5cbiAqXG4gKiBUaGlzIHdheSB3ZSBjYW4gYmUgZmxleGlibGUgaG93IHdlIHRyZWF0IHdpZGdldHMgZm9yIGRpZmZlcmVudCBraW5kcyBvZiBzaXR1YXRpb24gZGVwZW5kaW5nXG4gKiB3aGVyZSB0aGV5IGFwcGVhclxuXG4gKiBGb3JtVGFibGUganVzdCBsaWtlIHRoZSByZXN0IG9mIHRoZSBjb21wb25lbnRzIGFyZSB1c2luZyBNb2RlbCBkcml2ZW4gYXBwcm9hY2ggaG93IHRvIHdvcmsgd2l0aFxuICogZGF0YSwgbWVhbiB3ZSBhcmUgdXNpbmcgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCBldGMuIEZvcm1Hcm91cCBjYW4gYmUgcGFzc2VkIGludG8gdGhlIEZvcm1UYWJsZSxcbiAqIG90aGVyd2lzZSBpdHMgYXV0b21hdGljYWxseSBjcmVhdGVkIHdoZW4gdGhlIEZvcm1UYWJsZSBpcyBpbnN0YW50aWF0ZWQuXG4gKlxuICogRm9ybUdyb3VwIGlzIHNhdmVkIGluc29kZSBFbnZpcm9ubWVudCB3aGVyZSB3ZSBhcmUgdXNpbmcgdGhpcyB0byBwYXNzIHRoaXMgYXJvdW5kIHRoZSBwYWdlcyBhbmRcbiAqIGNvbXBvbmVudHMuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBTaW1wbGUgTGF5b3V0IGZpZWxkcyBhbmQgaXRzIGNvbnRyb2xcbiAqXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogYFxuICogIFx0XHRcdDxhdy1mb3JtLXRhYmxlIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgKG9uU3VibWl0KT0+XG4gKiAgXHRcdFx0XHQ8YXctZm9ybS1yb3cgW2xhYmVsXT1cIiduYW1lJ1wiIFtuYW1lXT1cIiduYW1lJ1wiPlxuICogIFx0XHRcdFx0XHQ8YXctaW5wdXQtZmllbGQgW3R5cGVdPVwiJ3N0cmluZydcIj48L2F3LWlucHV0LWZpZWxkPlxuICogIFx0XHRcdFx0PC9hdy1mb3JtLXJvdz5cbiAqXG4gKiAgXHRcdFx0XHQ8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidQcmVmZXJyZWQgQ29sb3JzJ1wiIFtuYW1lXT1cIidteUNvbG9ycydcIj5cbiAqICBcdFx0XHRcdFx0PGF3LWNoZWNrYm94LWxpc3QgW2xpc3RdPVwiY2hlY2tCb3hMaXN0VmFsdWVzXCJcbiAqICBcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICBbc2VsZWN0aW9uc109XCJzZWxlY3RlZFZhbHVlc1wiXG4gKiAgXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgW2xheW91dF09XCInaW5saW5lJ1wiXG4gKiAgXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgKG9uU2VsZWN0aW9uKT1cIm9uQ0JDbGljaygkZXZlbnQpXCI+XG4gKiAgXHRcdFx0XHRcdDwvYXctY2hlY2tib3gtbGlzdD5cbiAqICBcdFx0XHRcdDwvYXctZm9ybS1yb3c+XG4gKiAgXHRcdFx0XHQ8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidHZW5kZXInXCIgW25hbWVdPVwiJ2dlbmRlcidcIj5cbiAqXG4gKiAgXHRcdFx0XHRcdDxhdy1yYWRpb2J1dHRvbi1saXN0IFtsaXN0XT1cInJiVmFsdWVzXCIgW3NlbGVjdGlvbl09XCJyYlNlbGVjdGlvblwiPlxuICpcbiAqICBcdFx0XHRcdFx0PC9hdy1yYWRpb2J1dHRvbi1saXN0PlxuICpcbiAqICBcdFx0XHRcdDwvYXctZm9ybS1yb3c+XG4gKiAgXHRcdFx0XHQ8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidNeSBiaXJ0aGRhdGUnXCIgW25hbWVdPVwiJ2JpcnRoRGF0ZSdcIiBbc2l6ZV09XCInc21hbGwnXCI+XG4gKlxuICogIFx0XHRcdFx0XHQ8YXctZGF0ZS10aW1lIFt2YWx1ZV09XCJkYXRlXCIgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCIgW3Nob3dUaW1lXT1cInNob3dUaW1lXCI+XG4gKiAgXHRcdFx0XHRcdDwvYXctZGF0ZS10aW1lPlxuICogIFx0XHRcdFx0PC9hdy1mb3JtLXJvdz5cbiAqICBcdFx0XHQ8L2F3LWZvcm0tdGFibGU+XG4gKiAgICBgXG4gKiAgfSlcbiAqICBleHBvcnQgY2xhc3MgU2hvd1VzZXJJbmZvQ29tcG9uZW50XG4gKiAge1xuICogICAgICAgY2hlY2tCb3hMaXN0VmFsdWVzOiBzdHJpbmdbXSA9IFsnYmx1ZScgLCAncmVkJyAsICd5ZWxsb3cnICwgJ29yYW5nZScgLCAnd2hpdGUnICwgJ3NpbHZlcidcbiAqICAgICAsICdibGFjaycgLCAnR3JlZW4nXG4gKiAgICAgLCAnR3JheScgLCAnTmF2eScgLFxuICogICAgICAgICAgJ09saXZlJyAsICdBcXVhJyAsICdQdXJwbGUnXTtcbiAqICAgICAgc2VsZWN0ZWRWYWx1ZXM6IHN0cmluZ1tdID0gWydibHVlJyAsICdPbGl2ZScgLCAnQXF1YScgLCAnUHVycGxlJ107XG4gKiAgICAgIHJiVmFsdWVzOiBzdHJpbmdbXSA9IFsnbWFsZScgLCAnZmVtYWxlJyAsICdvdGhlciddO1xuICogICAgICByYlNlbGVjdGlvbjogc3RyaW5nID0gJ21hbGUnO1xuICogICAgICBlZGl0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gKiAgICAgIHNob3dUaW1lOiBib29sZWFuID0gdHJ1ZTtcbiAqXG4gKiAgICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKlxuICpcbiAqICAgICAgb25DQkNsaWNrIChldmVudCk6IHZvaWRcbiAqICAgICAge1xuICogICAgICAgICAgY29uc29sZS5sb2coJ29uQ0JDbGljayA9ICcgKyBldmVudCk7XG4gKiAgICAgIH1cbiAqXG4gKiAgICAgIG9uU3VibWl0IChtb2RlbDogYW55KTogdm9pZFxuICogICAgICB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsKVxuICpcbiAqICAgICAgICAgLy8gd2lsbCBwcmludCB7IG5hbWU6bnVsbCwgbXlDb2xvcnM6WydibHVlJyAsICdPbGl2ZScgLCAnQXF1YScgLCAnUHVycGxlJ10sIGdlbmRlcjpcbiAqICAgICBtYWxlfVxuICogICAgICB9XG4gKlxuICogIH1cbiAqXG4gKiAgYGBgXG4gKlxuICogIE9yIHlvdSBjYW4gdXNlIHpvbmUgdG8gbGF5b3V0IHRoZXNlIGZpZWxkcyBpbnRvIHR3byBjb2x1bW5zOlxuICpcbiAqICBDdXJyZW50IHpvbmVzIGFyZSBpbXBsZW1lbnQgd2l0aCA8bmctY29udGVudCBTRUxFQ1Q+IHdoaWNoIGlzIGp1c3QgYSBzZWxlY3RvciB0byBzZWFyY2hlcyBmb3JcbiAqICAgICBzcGVjaWZpYyBwYXR0ZXJuLiBJbiBvdXIgY2FzZSBpbnN0ZWFkIG9mIGNyZWF0aW5nIGV4dHJhIHdyYXBwZXIgY3VzdG9tIGNvbXBvbmVudCB1c2Ugc2ltcGxlXG4gKiAgICAgQ1NTIGNsYXNzXG4gKlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgICAgPGF3LWZvcm0tdGFibGUgI21ldGFGb3JtVGFibGUgW2VkaXRhYmxlXT1cImVkaXRpbmdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIFt1c2VGaXZlWm9uZV09XCJpc0ZpdmVab25lTGF5b3V0XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAob25TdWJtaXQpPVwib25TYXZlQWN0aW9uKCRldmVudClcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICA8YXctbGVmdCAgKm5nSWY9XCJjYW5TaG93Wm9uZSgnekxlZnQnKVwiPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWZvcm0tcm93IFtsYWJlbF09XCInbmFtZSdcIiBbbmFtZV09XCInbmFtZSdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1pbnB1dC1maWVsZCBbdHlwZV09XCInc3RyaW5nJ1wiPjwvYXctaW5wdXQtZmllbGQ+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS1yb3c+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICA8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidQcmVmZXJyZWQgQ29sb3JzJ1wiIFtuYW1lXT1cIidteUNvbG9ycydcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1jaGVja2JveC1saXN0IFtsaXN0XT1cImNoZWNrQm94TGlzdFZhbHVlc1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25zXT1cInNlbGVjdGVkVmFsdWVzXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCInaW5saW5lJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdGlvbik9XCJvbkNCQ2xpY2soJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1jaGVja2JveC1saXN0PlxuICogICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tcm93PlxuICogICAgICAgICAgICAgICAgPC9hdy1sZWZ0PlxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICA8YXctcmlnaHQgICpuZ0lmPVwiY2FuU2hvd1pvbmUoJ3pSaWdodCcpXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXJvdyBbbGFiZWxdPVwiJ0dlbmRlcidcIiBbbmFtZV09XCInZ2VuZGVyJ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbi1saXN0IFtsaXN0XT1cInJiVmFsdWVzXCIgW3NlbGVjdGlvbl09XCJyYlNlbGVjdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctcmFkaW9idXR0b24tbGlzdD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXJvdz5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXJvdyBbbGFiZWxdPVwiJ015IGJpcnRoZGF0ZSdcIiBbbmFtZV09XCInYmlydGhEYXRlJ1wiXG4gKiAgICAgW3NpemVdPVwiJ3NtYWxsJ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWRhdGUtdGltZSBbdmFsdWVdPVwiZGF0ZVwiIFtlZGl0YWJsZV09XCJlZGl0YWJsZVwiXG4gKiAgICAgW3Nob3dUaW1lXT1cInNob3dUaW1lXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWRhdGUtdGltZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXJvdz5cbiAqICAgICAgICAgICAgICAgIDwvPGF3LXJpZ2h0PlxuICogICAgICAgICAgICA8L2F3LWZvcm0tdGFibGU+XG4gKlxuICogIGBgYFxuICpcbiAqICB0b2RvOiByZW1vdmUgbXkgY3NzIHNlbGVjdG9ycyBmb3Igem9uZXMgYW5kIHJlcGxhY2UgaXQgd2l0aCByZWFsIGNvbXBvbmVudCBldmVuIGp1c3QgYSB0YWdcbiAqICB0b2RvOiB3b3VsZCB3b3JrIGZpbGVcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZm9ybS10YWJsZScsXG4gICAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cInctZm9ybS10YWJsZSB1aS1nIHVpLWZsdWlkXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxuICAgICAgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAobmdTdWJtaXQpPVwib25TdWJtaXRGb3JtKGZvcm1Hcm91cC52YWx1ZSlcIiBub3ZhbGlkYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cInVpLWctMTIgdWktZy1ub3BhZFwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG48L2Zvcm0+XG5cbmAsXG4gICAgc3R5bGVzOiBbYC5wYWdlLWNvbnRhaW5lcj5mb3Jte21hcmdpbi10b3A6MWVtfS53LWZvcm0tdGFibGUgYnV0dG9ue2Zsb2F0OnJpZ2h0fWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZvcm1UYWJsZUNvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtVGFibGVDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHRoZSBmb3JtIGxheW91dCB0byBzZWUgaWYgd2UgbmVlZCB0byByZW5kZXIgbGFiZWxzIHN0YWNrZWQgIG9yIHNpZGUgYnkgc2lkZSBuZXh0IHRvXG4gICAgICogdGhlIGNvbnRyb2xcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWxzT25Ub3A/OiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSXMgdGhpcyBhIDQgem9uZSBsYXlvdXRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlRml2ZVpvbmU/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGb3IgY2VydGFpbiB1c2VjYXNlIHdlIGRvbnQgd2FudCB0byBzZXQgYXV0b21hdGljYWxseSB0aGlzIHRvIGFsbCBjaGlsZHJlblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZWRpdGFiaWxpdHlDaGVjazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiAgVHJpZ2dlcnMgd2hlbiB0aGUgPGZvcm0+IGlzIHN1Ym1pdHRlZC4gb25TdWJtaXQgd2UgZW1pdCB0aGUgd2hvbGUgZm9ybUNvbnRyb2xsZXIgb2JqZWN0c1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFRoZXNlIHByb3BlcnRpZXMgcmVwcmVzZW50IGluZGl2aWR1YWwgem9uZXMgYW5kIHdlIHVzZSB0aGVtIHRvIGFkanVzdCBvdXIgY29sdW1uIGdyaWRcbiAgICAgKiBsYXlvdXRcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKExlZnRab25lQ29tcG9uZW50KSBsZWZ0Wm9uZTogTGVmdFpvbmVDb21wb25lbnQ7XG5cbiAgICBAQ29udGVudENoaWxkKE1pZGRsZVpvbmVDb21wb25lbnQpIG1pZGRsZVpvbmU6IE1pZGRsZVpvbmVDb21wb25lbnQ7XG5cbiAgICBAQ29udGVudENoaWxkKFJpZ2h0Wm9uZUNvbXBvbmVudCkgcmlnaHRab25lOiBSaWdodFpvbmVDb21wb25lbnQ7XG5cbiAgICBAQ29udGVudENoaWxkKFRvcFpvbmVDb21wb25lbnQpIHRvcFpvbmU6IFRvcFpvbmVDb21wb25lbnQ7XG5cbiAgICBAQ29udGVudENoaWxkKEJvdHRvbVpvbmVDb21wb25lbnQpIGJvdHRvbVpvbmU6IEJvdHRvbVpvbmVDb21wb25lbnQ7XG5cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oQmFzZUZvcm1Db21wb25lbnQsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgZm9ybUZpZWxkczogUXVlcnlMaXN0PEJhc2VGb3JtQ29tcG9uZW50PjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICByb3dzOiBRdWVyeUxpc3Q8Rm9ybVJvd0NvbXBvbmVudD47XG5cblxuICAgIC8qKlxuICAgICAqIENhY2hlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aGVuIGluaXQgdGhpcyBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc09uZUNvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc1R3b0NvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc1RocmVlQ29sdW1uOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBudWxsKTtcbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGNoYW5nZXNbJ2VkaXRhYmxlJ10pICYmXG4gICAgICAgICAgICBjaGFuZ2VzWydlZGl0YWJsZSddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2VkaXRhYmxlJ10uY3VycmVudFZhbHVlKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybUZpZWxkcygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBvblN1Ym1pdEZvcm0oZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMub25TdWJtaXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBcmUgbGFiZWxzIG9uIHRvcFxuICAgICAqXG4gICAgICovXG4gICAgaXNMYWJlbHNPblRvcCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHNPblRvcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCBieSBjaGlsZCBjb21wb25lbnQgdG8gaW5oZXJpdCBlZGl0YWJpbGl0eVxuICAgICAqXG4gICAgICovXG4gICAgaXNGb3JtRWRpdGFibGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGFibGU7XG4gICAgfVxuXG5cbiAgICBhcHBseUNvbHVtbnMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZUZpdmVab25lICYmIHRoaXMuaGFzQW55Wm9uZXMoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdab25lcyBkZXRlY3RlZCBpbiB0aGUgRm9ybVRhYmxlIGJ1dCB1c2VGaXZlWm9uZSBvcHRpb24gaXMgZmFsc2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFzT25lQ29sdW1uID0gIWlzUHJlc2VudCh0aGlzLnJpZ2h0Wm9uZSkgJiYgIWlzUHJlc2VudCh0aGlzLm1pZGRsZVpvbmUpO1xuICAgICAgICB0aGlzLmhhc1R3b0NvbHVtbiA9IGlzUHJlc2VudCh0aGlzLmxlZnRab25lKSAmJiBpc1ByZXNlbnQodGhpcy5yaWdodFpvbmUpICYmXG4gICAgICAgICAgICAhaXNQcmVzZW50KHRoaXMubWlkZGxlWm9uZSk7XG5cbiAgICAgICAgdGhpcy5oYXNUaHJlZUNvbHVtbiA9IGlzUHJlc2VudCh0aGlzLmxlZnRab25lKSAmJiBpc1ByZXNlbnQodGhpcy5yaWdodFpvbmUpICYmXG4gICAgICAgICAgICBpc1ByZXNlbnQodGhpcy5taWRkbGVab25lKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNUd29Db2x1bW4gJiYgIXRoaXMuaXNUd29ab25lUmVhZHkoKSkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QgKz0gJyB1aS1tZC02IHVpLWxnLTYnO1xuICAgICAgICAgICAgdGhpcy5yaWdodFpvbmUuY2xhc3NMaXN0ICs9ICcgdWktbWQtNiB1aS1sZy02JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc1RocmVlQ29sdW1uICYmICF0aGlzLmlzVGhyZWVab25lUmVhZHkoKSkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QgKz0gJyB1aS1tZC02IHVpLWxnLTQnO1xuICAgICAgICAgICAgdGhpcy5yaWdodFpvbmUuY2xhc3NMaXN0ICs9ICcgdWktbWQtNiB1aS1sZy00JztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBoYXNBbnlab25lcygpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMubGVmdFpvbmUpIHx8IGlzUHJlc2VudCh0aGlzLnJpZ2h0Wm9uZSkgfHwgaXNQcmVzZW50KHRoaXMubWlkZGxlWm9uZSlcbiAgICAgICAgICAgIHx8IGlzUHJlc2VudCh0aGlzLnRvcFpvbmUpIHx8IGlzUHJlc2VudCh0aGlzLmJvdHRvbVpvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBtZXRob2QgdG8gY2hlY2sgaWYgd2UgYWxyZWFkeSBpbml0aWFsaXplZCB0aGUgY2xhc3NMaXN0LlxuICAgICAqIHRoZVxuICAgICAqXG4gICAgICogVE9ETzogUHJvYmFibHkgc3RyaW5nIGFycmF5IHdvdWxkIGJlIGVhc2llclxuICAgICAqL1xuICAgIGlzVHdvWm9uZVJlYWR5KCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlZnRab25lLmNsYXNzTGlzdC5pbmRleE9mKCd1aS1sZy02JykgPiAwICYmXG4gICAgICAgICAgICB0aGlzLmxlZnRab25lLmNsYXNzTGlzdC5pbmRleE9mKCd1aS1sZy02JykgPiAwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCB0byBjaGVjayBpZiB3ZSBhbHJlYWR5IGluaXRpYWxpemVkIHRoZSBjbGFzc0xpc3QuXG4gICAgICogdGhlXG4gICAgICpcbiAgICAgKiBUT0RPOiBQcm9iYWJseSBzdHJpbmcgYXJyYXkgd291bGQgYmUgZWFzaWVyXG4gICAgICovXG4gICAgaXNUaHJlZVpvbmVSZWFkeSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QuaW5kZXhPZigndWktbGctNCcpID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QuaW5kZXhPZigndWktbGctNCcpID4gMDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gcHJvYmxlbSBzaW5jZSBBbmd1bGFyIDQuMiwgbmdBZnRlckNvbnRlbnRJbml0XG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcyBJIGdldCBlcnJvciB0aGF0IHZhbHVlIHdhcyBjaGFuZ2VkIGFmdGVyIHZpZXcgd2FzIGNoZWNrZWRcbiAgICAgICAgLy8gdG9kbzogcmVmYWN0b3IgIC0gbWFpbmx5IG91ciB6b25lcyBsZWZ0LCByaWdodCBtaWRkbGVcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1ucygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtRmllbGRzKCk7XG4gICAgICAgICAgICB0aGlzLmFkanVzdExheW91dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgdXBkYXRlRm9ybUZpZWxkcygpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5lZGl0YWJpbGl0eUNoZWNrICYmIGlzUHJlc2VudCh0aGlzLmZvcm1GaWVsZHMpICYmIHRoaXMuZm9ybUZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1GaWVsZHMuZm9yRWFjaCgoaXRlbTogQmFzZUZvcm1Db21wb25lbnQpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS5lZGl0YWJsZSA9IHRoaXMuZWRpdGFibGU7XG4gICAgICAgICAgICAgICAgLy8gaXRlbS5mb3JtR3JvdXAgPSB0aGlzLmZvcm1Hcm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiBpZiB3ZSBhcmUgMiBvciAzIG9yIDEgY29sdW1uIGxheW91dCB3ZSBuZWVkIHRvIGFkanVzdCB3aWRnZXRzIHdpZHRoIHdpdGhpbiB0aGVcbiAgICAgKiBmb3JtIHJvdy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkanVzdExheW91dCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucm93cykgJiYgdGhpcy5yb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RocmVlQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goKGl0ZW06IEZvcm1Sb3dDb21wb25lbnQpID0+IGl0ZW0uc2l6ZSA9ICdsYXJnZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==