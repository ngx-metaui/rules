/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    providers: [
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return FormTableComponent; }) }
                    ],
                    styles: [".page-container>form{margin-top:1em}.w-form-table button{float:right}"]
                }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsibGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ25CLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxSnpCLDhDQUFpQjtJQWtFckQsNEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUNuQjtRQUhrQixTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs7NEJBekRYLEtBQUs7Ozs7Ozs0QkFTTCxLQUFLOzs7O2lDQU1ELElBQUk7Ozs7Ozt5QkFRRixJQUFJLFlBQVksRUFBRTs7Ozs7NkJBNkJ4QixLQUFLOzZCQUNMLEtBQUs7K0JBQ0gsS0FBSzs7S0FNOUI7Ozs7O0lBR0Qsd0NBQVc7Ozs7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QUM7YUFDdEU7U0FFSjs7O2dCQXBOUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLDRVQUF3QztvQkFFeEMsU0FBUyxFQUFFO3dCQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLEVBQUM7cUJBQ2xGOztpQkFDSjs7OztnQkE3Sk8sV0FBVzs7OzhCQXNLZCxLQUFLOzhCQVNMLEtBQUs7bUNBTUwsS0FBSzsyQkFRTCxNQUFNOzJCQVFOLFlBQVksU0FBQyxpQkFBaUI7NkJBRTlCLFlBQVksU0FBQyxtQkFBbUI7NEJBRWhDLFlBQVksU0FBQyxrQkFBa0I7MEJBRS9CLFlBQVksU0FBQyxnQkFBZ0I7NkJBRTdCLFlBQVksU0FBQyxtQkFBbUI7NkJBR2hDLGVBQWUsU0FBQyxpQkFBaUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7dUJBR3RELGVBQWUsU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDOzs2QkFuUDVFO0VBOEx3QyxpQkFBaUI7U0FBNUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7XG4gICAgQm90dG9tWm9uZUNvbXBvbmVudCxcbiAgICBMZWZ0Wm9uZUNvbXBvbmVudCxcbiAgICBNaWRkbGVab25lQ29tcG9uZW50LFxuICAgIFJpZ2h0Wm9uZUNvbXBvbmVudCxcbiAgICBUb3Bab25lQ29tcG9uZW50XG59IGZyb20gJy4uL2ZpdmUtem9uZS1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcblxuXG4vKipcbiAqIEZvcm1UYWJsZSBpcyBhIHNwZWNpZmljIGxheW91dCBjb21wb25lbnQgZm9yIHJlbmRlcmluZyBMYWJlbHMgYW5kIGl0cyBjb250cm9scyBpbiB0d28gY29sdW1uc1xuICogYW5kIDUgZGlmZmVyZW50IHpvbmVzLlxuICpcbiAqIFdlIHN1cHBvcnQgTEVGVCwgTUlERExFLCBSSUdIVCwgVE9QLCBCT1RUT00gem9uZSB3aGVyZSB3ZSBjYW4gcGxhY2Ugb3VyIGNvbXBvbmVudCBvciB3aWRnZXRzLlxuICogVGhpc1xuICogY29tcG9uZW50IGlzIHVzZWQgYXMgcHJpbWFyeSBsYXlvdXQgdG8gd3JhcCBhbGwgdGhlIGNvbW1vbiB1c2UgY2FzZXMuIEUuZy4gV2hlbiB3ZSBsYXkgb3V0XG4gKiBmaWVsZHMgaW4gdGhlIGZvcm0gSSBkbyBub3Qgd2FudCBjb250cm9scyB0byBiZSBhd2FyZSBvZiBlcnJvciB2YWxpZGF0aW9uLCBzaXplLCBsYWJlbHMsIGFuZFxuICogc29tZSBvdGhlciB0aGluZ3MuIENvbnRyb2wgc3VjaCBJTlBVVCBpcyBqdXN0IHJlc3BvbnNpYmxlIGZvciByZXRyaWV2ZSB1c2VyIHZhbHVlIGJ1dCBub3QgaG93IGl0XG4gKiBhcHBlYXIgb24gdGhlIHBhZ2UuXG4gKlxuICogVGhpcyB3YXkgd2UgY2FuIGJlIGZsZXhpYmxlIGhvdyB3ZSB0cmVhdCB3aWRnZXRzIGZvciBkaWZmZXJlbnQga2luZHMgb2Ygc2l0dWF0aW9uIGRlcGVuZGluZ1xuICogd2hlcmUgdGhleSBhcHBlYXJcblxuICogRm9ybVRhYmxlIGp1c3QgbGlrZSB0aGUgcmVzdCBvZiB0aGUgY29tcG9uZW50cyBhcmUgdXNpbmcgTW9kZWwgZHJpdmVuIGFwcHJvYWNoIGhvdyB0byB3b3JrIHdpdGhcbiAqIGRhdGEsIG1lYW4gd2UgYXJlIHVzaW5nIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgZXRjLiBGb3JtR3JvdXAgY2FuIGJlIHBhc3NlZCBpbnRvIHRoZSBGb3JtVGFibGUsXG4gKiBvdGhlcndpc2UgaXRzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCB3aGVuIHRoZSBGb3JtVGFibGUgaXMgaW5zdGFudGlhdGVkLlxuICpcbiAqIEZvcm1Hcm91cCBpcyBzYXZlZCBpbnNvZGUgRW52aXJvbm1lbnQgd2hlcmUgd2UgYXJlIHVzaW5nIHRoaXMgdG8gcGFzcyB0aGlzIGFyb3VuZCB0aGUgcGFnZXMgYW5kXG4gKiBjb21wb25lbnRzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogU2ltcGxlIExheW91dCBmaWVsZHMgYW5kIGl0cyBjb250cm9sXG4gKlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6ICd3cmFwcGVyLWNvbXAnICxcbiAqICAgICAgdGVtcGxhdGU6IGBcbiAqICBcdFx0XHQ8YXctZm9ybS10YWJsZSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIChvblN1Ym1pdCk9PlxuICogIFx0XHRcdFx0PGF3LWZvcm0tcm93IFtsYWJlbF09XCInbmFtZSdcIiBbbmFtZV09XCInbmFtZSdcIj5cbiAqICBcdFx0XHRcdFx0PGF3LWlucHV0LWZpZWxkIFt0eXBlXT1cIidzdHJpbmcnXCI+PC9hdy1pbnB1dC1maWVsZD5cbiAqICBcdFx0XHRcdDwvYXctZm9ybS1yb3c+XG4gKlxuICogIFx0XHRcdFx0PGF3LWZvcm0tcm93IFtsYWJlbF09XCInUHJlZmVycmVkIENvbG9ycydcIiBbbmFtZV09XCInbXlDb2xvcnMnXCI+XG4gKiAgXHRcdFx0XHRcdDxhdy1jaGVja2JveC1saXN0IFtsaXN0XT1cImNoZWNrQm94TGlzdFZhbHVlc1wiXG4gKiAgXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgW3NlbGVjdGlvbnNdPVwic2VsZWN0ZWRWYWx1ZXNcIlxuICogIFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwiJ2lubGluZSdcIlxuICogIFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIChvblNlbGVjdGlvbik9XCJvbkNCQ2xpY2soJGV2ZW50KVwiPlxuICogIFx0XHRcdFx0XHQ8L2F3LWNoZWNrYm94LWxpc3Q+XG4gKiAgXHRcdFx0XHQ8L2F3LWZvcm0tcm93PlxuICogIFx0XHRcdFx0PGF3LWZvcm0tcm93IFtsYWJlbF09XCInR2VuZGVyJ1wiIFtuYW1lXT1cIidnZW5kZXInXCI+XG4gKlxuICogIFx0XHRcdFx0XHQ8YXctcmFkaW9idXR0b24tbGlzdCBbbGlzdF09XCJyYlZhbHVlc1wiIFtzZWxlY3Rpb25dPVwicmJTZWxlY3Rpb25cIj5cbiAqXG4gKiAgXHRcdFx0XHRcdDwvYXctcmFkaW9idXR0b24tbGlzdD5cbiAqXG4gKiAgXHRcdFx0XHQ8L2F3LWZvcm0tcm93PlxuICogIFx0XHRcdFx0PGF3LWZvcm0tcm93IFtsYWJlbF09XCInTXkgYmlydGhkYXRlJ1wiIFtuYW1lXT1cIidiaXJ0aERhdGUnXCIgW3NpemVdPVwiJ3NtYWxsJ1wiPlxuICpcbiAqICBcdFx0XHRcdFx0PGF3LWRhdGUtdGltZSBbdmFsdWVdPVwiZGF0ZVwiIFtlZGl0YWJsZV09XCJlZGl0YWJsZVwiIFtzaG93VGltZV09XCJzaG93VGltZVwiPlxuICogIFx0XHRcdFx0XHQ8L2F3LWRhdGUtdGltZT5cbiAqICBcdFx0XHRcdDwvYXctZm9ybS1yb3c+XG4gKiAgXHRcdFx0PC9hdy1mb3JtLXRhYmxlPlxuICogICAgYFxuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIFNob3dVc2VySW5mb0NvbXBvbmVudFxuICogIHtcbiAqICAgICAgIGNoZWNrQm94TGlzdFZhbHVlczogc3RyaW5nW10gPSBbJ2JsdWUnICwgJ3JlZCcgLCAneWVsbG93JyAsICdvcmFuZ2UnICwgJ3doaXRlJyAsICdzaWx2ZXInXG4gKiAgICAgLCAnYmxhY2snICwgJ0dyZWVuJ1xuICogICAgICwgJ0dyYXknICwgJ05hdnknICxcbiAqICAgICAgICAgICdPbGl2ZScgLCAnQXF1YScgLCAnUHVycGxlJ107XG4gKiAgICAgIHNlbGVjdGVkVmFsdWVzOiBzdHJpbmdbXSA9IFsnYmx1ZScgLCAnT2xpdmUnICwgJ0FxdWEnICwgJ1B1cnBsZSddO1xuICogICAgICByYlZhbHVlczogc3RyaW5nW10gPSBbJ21hbGUnICwgJ2ZlbWFsZScgLCAnb3RoZXInXTtcbiAqICAgICAgcmJTZWxlY3Rpb246IHN0cmluZyA9ICdtYWxlJztcbiAqICAgICAgZWRpdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICogICAgICBzaG93VGltZTogYm9vbGVhbiA9IHRydWU7XG4gKlxuICogICAgICBmb3JtR3JvdXA6IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICpcbiAqXG4gKiAgICAgIG9uQ0JDbGljayAoZXZlbnQpOiB2b2lkXG4gKiAgICAgIHtcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkNCQ2xpY2sgPSAnICsgZXZlbnQpO1xuICogICAgICB9XG4gKlxuICogICAgICBvblN1Ym1pdCAobW9kZWw6IGFueSk6IHZvaWRcbiAqICAgICAge1xuICogICAgICAgICBjb25zb2xlLmxvZyhtb2RlbClcbiAqXG4gKiAgICAgICAgIC8vIHdpbGwgcHJpbnQgeyBuYW1lOm51bGwsIG15Q29sb3JzOlsnYmx1ZScgLCAnT2xpdmUnICwgJ0FxdWEnICwgJ1B1cnBsZSddLCBnZW5kZXI6XG4gKiAgICAgbWFsZX1cbiAqICAgICAgfVxuICpcbiAqICB9XG4gKlxuICogIGBgYFxuICpcbiAqICBPciB5b3UgY2FuIHVzZSB6b25lIHRvIGxheW91dCB0aGVzZSBmaWVsZHMgaW50byB0d28gY29sdW1uczpcbiAqXG4gKiAgQ3VycmVudCB6b25lcyBhcmUgaW1wbGVtZW50IHdpdGggPG5nLWNvbnRlbnQgU0VMRUNUPiB3aGljaCBpcyBqdXN0IGEgc2VsZWN0b3IgdG8gc2VhcmNoZXMgZm9yXG4gKiAgICAgc3BlY2lmaWMgcGF0dGVybi4gSW4gb3VyIGNhc2UgaW5zdGVhZCBvZiBjcmVhdGluZyBleHRyYSB3cmFwcGVyIGN1c3RvbSBjb21wb25lbnQgdXNlIHNpbXBsZVxuICogICAgIENTUyBjbGFzc1xuICpcbiAqXG4gKiAgYGBgXG4gKiAgICAgICAgICAgIDxhdy1mb3JtLXRhYmxlICNtZXRhRm9ybVRhYmxlIFtlZGl0YWJsZV09XCJlZGl0aW5nXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlRml2ZVpvbmVdPVwiaXNGaXZlWm9uZUxheW91dFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uU3VibWl0KT1cIm9uU2F2ZUFjdGlvbigkZXZlbnQpXCI+XG4gKlxuICogICAgICAgICAgICAgICAgPGF3LWxlZnQgICpuZ0lmPVwiY2FuU2hvd1pvbmUoJ3pMZWZ0JylcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXJvdyBbbGFiZWxdPVwiJ25hbWUnXCIgW25hbWVdPVwiJ25hbWUnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctaW5wdXQtZmllbGQgW3R5cGVdPVwiJ3N0cmluZydcIj48L2F3LWlucHV0LWZpZWxkPlxuICogICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tcm93PlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWZvcm0tcm93IFtsYWJlbF09XCInUHJlZmVycmVkIENvbG9ycydcIiBbbmFtZV09XCInbXlDb2xvcnMnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctY2hlY2tib3gtbGlzdCBbbGlzdF09XCJjaGVja0JveExpc3RWYWx1ZXNcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0aW9uc109XCJzZWxlY3RlZFZhbHVlc1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwiJ2lubGluZSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3Rpb24pPVwib25DQkNsaWNrKCRldmVudClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctY2hlY2tib3gtbGlzdD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXJvdz5cbiAqICAgICAgICAgICAgICAgIDwvYXctbGVmdD5cbiAqXG4gKlxuICogICAgICAgICAgICAgICAgPGF3LXJpZ2h0ICAqbmdJZj1cImNhblNob3dab25lKCd6UmlnaHQnKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICA8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidHZW5kZXInXCIgW25hbWVdPVwiJ2dlbmRlcidcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctcmFkaW9idXR0b24tbGlzdCBbbGlzdF09XCJyYlZhbHVlc1wiIFtzZWxlY3Rpb25dPVwicmJTZWxlY3Rpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uLWxpc3Q+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS1yb3c+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICA8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidNeSBiaXJ0aGRhdGUnXCIgW25hbWVdPVwiJ2JpcnRoRGF0ZSdcIlxuICogICAgIFtzaXplXT1cIidzbWFsbCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1kYXRlLXRpbWUgW3ZhbHVlXT1cImRhdGVcIiBbZWRpdGFibGVdPVwiZWRpdGFibGVcIlxuICogICAgIFtzaG93VGltZV09XCJzaG93VGltZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1kYXRlLXRpbWU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS1yb3c+XG4gKiAgICAgICAgICAgICAgICA8Lzxhdy1yaWdodD5cbiAqICAgICAgICAgICAgPC9hdy1mb3JtLXRhYmxlPlxuICpcbiAqICBgYGBcbiAqXG4gKiAgdG9kbzogcmVtb3ZlIG15IGNzcyBzZWxlY3RvcnMgZm9yIHpvbmVzIGFuZCByZXBsYWNlIGl0IHdpdGggcmVhbCBjb21wb25lbnQgZXZlbiBqdXN0IGEgdGFnXG4gKiAgdG9kbzogd291bGQgd29yayBmaWxlXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWZvcm0tdGFibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnZm9ybS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2Zvcm0tdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGb3JtVGFibGVDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybVRhYmxlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciB0aGUgZm9ybSBsYXlvdXQgdG8gc2VlIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGxhYmVscyBzdGFja2VkICBvciBzaWRlIGJ5IHNpZGUgbmV4dCB0b1xuICAgICAqIHRoZSBjb250cm9sXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsc09uVG9wPzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElzIHRoaXMgYSA0IHpvbmUgbGF5b3V0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZUZpdmVab25lPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRm9yIGNlcnRhaW4gdXNlY2FzZSB3ZSBkb250IHdhbnQgdG8gc2V0IGF1dG9tYXRpY2FsbHkgdGhpcyB0byBhbGwgY2hpbGRyZW5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGVkaXRhYmlsaXR5Q2hlY2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogIFRyaWdnZXJzIHdoZW4gdGhlIDxmb3JtPiBpcyBzdWJtaXR0ZWQuIG9uU3VibWl0IHdlIGVtaXQgdGhlIHdob2xlIGZvcm1Db250cm9sbGVyIG9iamVjdHNcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHJlcHJlc2VudCBpbmRpdmlkdWFsIHpvbmVzIGFuZCB3ZSB1c2UgdGhlbSB0byBhZGp1c3Qgb3VyIGNvbHVtbiBncmlkXG4gICAgICogbGF5b3V0XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChMZWZ0Wm9uZUNvbXBvbmVudCkgbGVmdFpvbmU6IExlZnRab25lQ29tcG9uZW50O1xuXG4gICAgQENvbnRlbnRDaGlsZChNaWRkbGVab25lQ29tcG9uZW50KSBtaWRkbGVab25lOiBNaWRkbGVab25lQ29tcG9uZW50O1xuXG4gICAgQENvbnRlbnRDaGlsZChSaWdodFpvbmVDb21wb25lbnQpIHJpZ2h0Wm9uZTogUmlnaHRab25lQ29tcG9uZW50O1xuXG4gICAgQENvbnRlbnRDaGlsZChUb3Bab25lQ29tcG9uZW50KSB0b3Bab25lOiBUb3Bab25lQ29tcG9uZW50O1xuXG4gICAgQENvbnRlbnRDaGlsZChCb3R0b21ab25lQ29tcG9uZW50KSBib3R0b21ab25lOiBCb3R0b21ab25lQ29tcG9uZW50O1xuXG5cbiAgICBAQ29udGVudENoaWxkcmVuKEJhc2VGb3JtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgIGZvcm1GaWVsZHM6IFF1ZXJ5TGlzdDxCYXNlRm9ybUNvbXBvbmVudD47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgcm93czogUXVlcnlMaXN0PEZvcm1Sb3dDb21wb25lbnQ+O1xuXG5cbiAgICAvKipcbiAgICAgKiBDYWNoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXMgd2hlbiBpbml0IHRoaXMgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNPbmVDb2x1bW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoYXNUd29Db2x1bW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoYXNUaHJlZUNvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgbnVsbCk7XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzWydlZGl0YWJsZSddKSAmJlxuICAgICAgICAgICAgY2hhbmdlc1snZWRpdGFibGUnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydlZGl0YWJsZSddLmN1cnJlbnRWYWx1ZSkge1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm1GaWVsZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgb25TdWJtaXRGb3JtKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLm9uU3VibWl0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXJlIGxhYmVscyBvbiB0b3BcbiAgICAgKlxuICAgICAqL1xuICAgIGlzTGFiZWxzT25Ub3AoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxzT25Ub3A7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgYnkgY2hpbGQgY29tcG9uZW50IHRvIGluaGVyaXQgZWRpdGFiaWxpdHlcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRm9ybUVkaXRhYmxlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlO1xuICAgIH1cblxuXG4gICAgYXBwbHlDb2x1bW5zKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy51c2VGaXZlWm9uZSAmJiB0aGlzLmhhc0FueVpvbmVzKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWm9uZXMgZGV0ZWN0ZWQgaW4gdGhlIEZvcm1UYWJsZSBidXQgdXNlRml2ZVpvbmUgb3B0aW9uIGlzIGZhbHNlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhc09uZUNvbHVtbiA9ICFpc1ByZXNlbnQodGhpcy5yaWdodFpvbmUpICYmICFpc1ByZXNlbnQodGhpcy5taWRkbGVab25lKTtcbiAgICAgICAgdGhpcy5oYXNUd29Db2x1bW4gPSBpc1ByZXNlbnQodGhpcy5sZWZ0Wm9uZSkgJiYgaXNQcmVzZW50KHRoaXMucmlnaHRab25lKSAmJlxuICAgICAgICAgICAgIWlzUHJlc2VudCh0aGlzLm1pZGRsZVpvbmUpO1xuXG4gICAgICAgIHRoaXMuaGFzVGhyZWVDb2x1bW4gPSBpc1ByZXNlbnQodGhpcy5sZWZ0Wm9uZSkgJiYgaXNQcmVzZW50KHRoaXMucmlnaHRab25lKSAmJlxuICAgICAgICAgICAgaXNQcmVzZW50KHRoaXMubWlkZGxlWm9uZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVHdvQ29sdW1uICYmICF0aGlzLmlzVHdvWm9uZVJlYWR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFpvbmUuY2xhc3NMaXN0ICs9ICcgdWktbWQtNiB1aS1sZy02JztcbiAgICAgICAgICAgIHRoaXMucmlnaHRab25lLmNsYXNzTGlzdCArPSAnIHVpLW1kLTYgdWktbGctNic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNUaHJlZUNvbHVtbiAmJiAhdGhpcy5pc1RocmVlWm9uZVJlYWR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFpvbmUuY2xhc3NMaXN0ICs9ICcgdWktbWQtNiB1aS1sZy00JztcbiAgICAgICAgICAgIHRoaXMucmlnaHRab25lLmNsYXNzTGlzdCArPSAnIHVpLW1kLTYgdWktbGctNCc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgaGFzQW55Wm9uZXMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmxlZnRab25lKSB8fCBpc1ByZXNlbnQodGhpcy5yaWdodFpvbmUpIHx8IGlzUHJlc2VudCh0aGlzLm1pZGRsZVpvbmUpXG4gICAgICAgICAgICB8fCBpc1ByZXNlbnQodGhpcy50b3Bab25lKSB8fCBpc1ByZXNlbnQodGhpcy5ib3R0b21ab25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIHRvIGNoZWNrIGlmIHdlIGFscmVhZHkgaW5pdGlhbGl6ZWQgdGhlIGNsYXNzTGlzdC5cbiAgICAgKiB0aGVcbiAgICAgKlxuICAgICAqIFRPRE86IFByb2JhYmx5IHN0cmluZyBhcnJheSB3b3VsZCBiZSBlYXNpZXJcbiAgICAgKi9cbiAgICBpc1R3b1pvbmVSZWFkeSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QuaW5kZXhPZigndWktbGctNicpID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5sZWZ0Wm9uZS5jbGFzc0xpc3QuaW5kZXhPZigndWktbGctNicpID4gMDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBtZXRob2QgdG8gY2hlY2sgaWYgd2UgYWxyZWFkeSBpbml0aWFsaXplZCB0aGUgY2xhc3NMaXN0LlxuICAgICAqIHRoZVxuICAgICAqXG4gICAgICogVE9ETzogUHJvYmFibHkgc3RyaW5nIGFycmF5IHdvdWxkIGJlIGVhc2llclxuICAgICAqL1xuICAgIGlzVGhyZWVab25lUmVhZHkoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVmdFpvbmUuY2xhc3NMaXN0LmluZGV4T2YoJ3VpLWxnLTQnKSA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMubGVmdFpvbmUuY2xhc3NMaXN0LmluZGV4T2YoJ3VpLWxnLTQnKSA+IDA7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHByb2JsZW0gc2luY2UgQW5ndWxhciA0LjIsIG5nQWZ0ZXJDb250ZW50SW5pdFxuICAgICAgICAvLyB3aXRob3V0IHRoaXMgSSBnZXQgZXJyb3IgdGhhdCB2YWx1ZSB3YXMgY2hhbmdlZCBhZnRlciB2aWV3IHdhcyBjaGVja2VkXG4gICAgICAgIC8vIHRvZG86IHJlZmFjdG9yICAtIG1haW5seSBvdXIgem9uZXMgbGVmdCwgcmlnaHQgbWlkZGxlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbHVtbnMoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybUZpZWxkcygpO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RMYXlvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHVwZGF0ZUZvcm1GaWVsZHMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdGFiaWxpdHlDaGVjayAmJiBpc1ByZXNlbnQodGhpcy5mb3JtRmllbGRzKSAmJiB0aGlzLmZvcm1GaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtRmllbGRzLmZvckVhY2goKGl0ZW06IEJhc2VGb3JtQ29tcG9uZW50KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW0uZWRpdGFibGUgPSB0aGlzLmVkaXRhYmxlO1xuICAgICAgICAgICAgICAgIC8vIGl0ZW0uZm9ybUdyb3VwID0gdGhpcy5mb3JtR3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gaWYgd2UgYXJlIDIgb3IgMyBvciAxIGNvbHVtbiBsYXlvdXQgd2UgbmVlZCB0byBhZGp1c3Qgd2lkZ2V0cyB3aWR0aCB3aXRoaW4gdGhlXG4gICAgICogZm9ybSByb3cuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGp1c3RMYXlvdXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvd3MpICYmIHRoaXMucm93cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUaHJlZUNvbHVtbikge1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKChpdGVtOiBGb3JtUm93Q29tcG9uZW50KSA9PiBpdGVtLnNpemUgPSAnbGFyZ2UnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=