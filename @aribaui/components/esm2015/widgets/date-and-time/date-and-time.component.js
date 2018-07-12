/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Environment, isBlank, isDate } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
 * Lightweight and configurable Date and Time component based on the primeng. This
 * component combines both date picker as well as time picker
 *
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'myTimer' ,
 *    template: `
 *    <aw-date-time [value]="date" [editable]="editable"  [name]="'dueDate'">
 *    </aw-date-time>
 *
 *    `
 *    })
 *    export class MyTimmerComponet
 *    {
 *
 *        date: Date = new Date();
 *
 *
 *        constructor ()
 *        {
 *            this.date.setFullYear(2016 , 10 , 3);
 *            this.date.setHours(10 , 10 , 10);
 *        }
 *    }
 *
 * ```
 *
 * By default you will see date field and time field is hidden to show both you just do following:
 *
 *  ```
 *
 * \@Component({
 *    selector: 'myTimer' ,
 *    template: `
 *
 *    <aw-date-time [value]="date"  [showTime]="showTime" [editable]="editable"  [name]="'bbdd'">
 *    </aw-date-time>
 *
 *    `
 *    })
 *    export class MyTimmerComponet
 *    {
 *        date: Date = new Date();
 *        showTime = true;
 *
 *        constructor ()
 *        {
 *            this.date.setFullYear(2016 , 10 , 3);
 *            this.date.setHours(10 , 10 , 10);
 *        }
 *    }
 *
 * ```
 *
 *
 *
 */
export const /** @type {?} */ DATETIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateAndTimeComponent),
    multi: true
};
export class DateAndTimeComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Default date format pattern used if none is passed
         *
         */
        this.formatPattern = 'mm/dd/yy';
        /**
         * Special workaround as formatters in the primeNG and angular are different so until its
         * fixed we need to keep this extra pattern.
         */
        this.formatPatternNG = 'MM/dd/yy';
        /**
         * Shows and hides navigation bar with year and months selections
         */
        this.showNavigation = false;
        /**
         * Shows and hides navigation bar with year and months selections
         */
        this.showIcon = true;
        /**
         * Whether to show timepicker
         */
        this.showTime = false;
        /**
         * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
         * true
         */
        this.showDate = true;
        /**
         *
         * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
         * it shows the AM, PM
         *
         */
        this.hourFormat = '24';
        /**
         * Triggers event when specific date is clicked inside DatePicker
         *
         */
        this.onChange = new EventEmitter();
        /**
         * Set the date to highlight on first opening if the field is blank.
         *
         */
        this.defaultDate = new Date();
        this.timePlaceHolder = 'hh:ss';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        // default to dateTime pattern which is defined in resource files
        if (this.hourFormat !== '12' && this.hourFormat !== '24') {
            this.hourFormat = '24';
        }
        this.timePlaceHolder = (this.hourFormat === '12') ?
            ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((val) => {
            this.value = val;
            this.onModelChanged(this.value);
        });
        this.initTranslations();
        this.env.onLocaleChange.subscribe((locale) => {
            this.initTranslations();
        });
    }
    /**
     * Need to refactor this as this really get complicated trying to cover usecase with time
     * and date and every format we have. We should probably have separate patterns for
     * dates only and date + time
     * @return {?}
     */
    initTranslations() {
        this.formatNameWithTime = this.formatPattern;
        if (!this.showDate) {
            this.formatPatternNG = this.formatPattern += (this.hourFormat === '12') ?
                ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        }
        if (this.showTime) {
            let /** @type {?} */ timeStarts = this.formatPattern.indexOf('h');
            if (timeStarts !== -1) {
                this.formatNameWithTime = this.formatPattern.substring(0, timeStarts);
            }
            this.formatPatternNG += (this.hourFormat === '12') ?
                ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        }
        this.i18n = {
            firstDayOfWeek: 0,
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                'Nov', 'Dec']
        };
    }
    /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     * @param {?} event
     * @return {?}
     */
    onDateChange(event) {
        if (isBlank(event)) {
            // throw some error ?
            return;
        }
        this.value = isDate(event) ? event : new Date(event);
        this.formControl.setValue(this.value, { onlySelf: false, emitEvent: true });
        this.onModelChanged(this.value);
        this.onChange.emit(this.value);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    }
}
DateAndTimeComponent.NgTime12 = 'hh:mm a';
DateAndTimeComponent.NgTime24 = 'HH.mm a';
DateAndTimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-date-time',
                template: `<ng-template [ngIf]="editable">

    <div class="w-datetime " [class.has-time]="showTime" [formGroup]="formGroup">

        <p-calendar formControlName="{{name}}"
                    [defaultDate]="defaultDate"
                    [showIcon]="showIcon"
                    dateFormat="{{showTime ? formatNameWithTime : formatPattern}}"
                    [yearNavigator]="showNavigation"
                    [monthNavigator]="showNavigation"
                    [yearRange]="yearRange"
                    placeholder="{{showTime ? formatNameWithTime.toUpperCase() : formatPattern.toUpperCase()}}"
                    (onSelect)="onDateChange($event)"
                    [timeOnly]="!showDate"
                    [readonlyInput]="true"
                    [locale]="i18n">
        </p-calendar>

        <p-calendar *ngIf="showTime"
                    icon="icon-history"
                    formControlName="{{name}}"
                    [hourFormat]="hourFormat"
                    [defaultDate]="defaultDate"
                    [showIcon]="showIcon"
                    [timeOnly]="showTime"
                    [showTime]="showTime"
                    [placeholder]="timePlaceHolder"
                    (onSelect)="onDateChange($event)"
                    [locale]="i18n">
        </p-calendar>

    </div>
</ng-template>

<ng-template [ngIf]="!editable">
    <aw-string value="{{value | date: formatPatternNG}}"></aw-string>
</ng-template>
`,
                styles: [`/deep/ .w-datetime .ui-calendar button{border:0;width:0}/deep/ .w-datetime .ui-calendar.ui-calendar-w-btn .ui-inputtext{width:100%}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left{font-family:"SAP icon fonts";color:#199de0;cursor:pointer;font-size:1.4em}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.pi-calendar:before{content:'\\e0e0'}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.icon-history:before{content:'\\e02d'}/deep/ .ui-datepicker{width:24.28em;line-height:25px;padding:0;border-color:#979797;box-shadow:none}/deep/ .ui-datepicker .ui-datepicker-header{padding:.92em 0;font-weight:400;color:#000;font-size:1em}/deep/ .ui-datepicker .ui-datepicker-next,/deep/ .ui-datepicker .ui-datepicker-prev{top:1em}/deep/ .ui-datepicker .ui-datepicker-prev{left:.2em}/deep/ .ui-datepicker .ui-datepicker-next{right:.2em}/deep/ .ui-datepicker table{font-size:1em;margin:0 0 1.5em}/deep/ .ui-datepicker th{font-weight:400;background-color:#ececec;color:#363636;padding:.786em 1.07em}/deep/ .ui-datepicker td{padding:.1em}/deep/ .ui-datepicker td a{text-align:center;width:2.7em;height:2.7em;line-height:2.7em;padding:0;border-radius:50%}/deep/ .ui-datepicker td a.ui-state-default{border-color:transparent}/deep/ .ui-datepicker td a.ui-state-active{background-color:#199de0;color:#fff}/deep/ .ui-datepicker .pi{font-size:1em}/deep/ .ui-datepicker .pi.pi-chevron-left:before{content:'\\e1ee'}/deep/ .ui-datepicker .pi.pi-chevron-right:before{content:'\\e1ed'}/deep/ .ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover{border-color:transparent;background-color:rgba(25,157,224,.7);opacity:.75;color:#363636}/deep/ .ui-datepicker-timeonly{width:100%}/deep/ .ui-timepicker{font-size:1.14em;color:#767676;font-weight:400}/deep/ .ui-timepicker .pi{font-size:1em}/deep/ .ui-timepicker .pi.pi-chevron-up:before{content:'\\e1f0'}/deep/ .ui-timepicker .pi.pi-chevron-down:before{content:'\\e1ef'}/deep/ .ui-timepicker>div{margin-left:0}/deep/ .ui-timepicker .ui-separator{width:.1em;min-width:.1em}/deep/ .ui-timepicker .ui-separator .pi{font-size:0}/deep/ .ui-datepicker-trigger{background-color:transparent}/deep/ .ui-datepicker-trigger.ui-button:enabled:hover,/deep/ .ui-datepicker-trigger.ui-button:focus{background-color:transparent}/deep/ .has-time{display:flex;flex-wrap:nowrap}/deep/ .has-time p-calendar:first-child{width:55%;margin-right:14px}/deep/ .has-time p-calendar:last-child{width:45%}/deep/ .has-time p-calendar:last-child .ui-datepicker{padding:0}/deep/ .has-time .ui-button-icon-left{line-height:18px}`],
                providers: [
                    DATETIME_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => DateAndTimeComponent) }
                ]
            },] },
];
/** @nocollapse */
DateAndTimeComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
DateAndTimeComponent.propDecorators = {
    value: [{ type: Input }],
    formatPattern: [{ type: Input }],
    formatPatternNG: [{ type: Input }],
    showNavigation: [{ type: Input }],
    yearRange: [{ type: Input }],
    showIcon: [{ type: Input }],
    showTime: [{ type: Input }],
    showDate: [{ type: Input }],
    hourFormat: [{ type: Input }],
    onChange: [{ type: Output }]
};
function DateAndTimeComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DateAndTimeComponent.NgTime12;
    /** @type {?} */
    DateAndTimeComponent.NgTime24;
    /**
     * Default value used to set the date and time picker
     * @type {?}
     */
    DateAndTimeComponent.prototype.value;
    /**
     * Default date format pattern used if none is passed
     *
     * @type {?}
     */
    DateAndTimeComponent.prototype.formatPattern;
    /**
     * Special workaround as formatters in the primeNG and angular are different so until its
     * fixed we need to keep this extra pattern.
     * @type {?}
     */
    DateAndTimeComponent.prototype.formatPatternNG;
    /**
     * Shows and hides navigation bar with year and months selections
     * @type {?}
     */
    DateAndTimeComponent.prototype.showNavigation;
    /**
     * Year range displayed for the drop down.
     * @type {?}
     */
    DateAndTimeComponent.prototype.yearRange;
    /**
     * Shows and hides navigation bar with year and months selections
     * @type {?}
     */
    DateAndTimeComponent.prototype.showIcon;
    /**
     * Whether to show timepicker
     * @type {?}
     */
    DateAndTimeComponent.prototype.showTime;
    /**
     * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
     * true
     * @type {?}
     */
    DateAndTimeComponent.prototype.showDate;
    /**
     *
     * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
     * it shows the AM, PM
     *
     * @type {?}
     */
    DateAndTimeComponent.prototype.hourFormat;
    /**
     * Triggers event when specific date is clicked inside DatePicker
     *
     * @type {?}
     */
    DateAndTimeComponent.prototype.onChange;
    /**
     * Set the date to highlight on first opening if the field is blank.
     *
     * @type {?}
     */
    DateAndTimeComponent.prototype.defaultDate;
    /**
     * In case of Datetime we need to make sure the DateAndTime formatName is not propagated
     * to Date field.
     * @type {?}
     */
    DateAndTimeComponent.prototype.formatNameWithTime;
    /** @type {?} */
    DateAndTimeComponent.prototype.i18n;
    /** @type {?} */
    DateAndTimeComponent.prototype.timePlaceHolder;
    /** @type {?} */
    DateAndTimeComponent.prototype.env;
    /** @type {?} */
    DateAndTimeComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hbmQtdGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGUtYW5kLXRpbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtFdEYsTUFBTSxDQUFDLHVCQUFNLCtCQUErQixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFpREYsTUFBTSwyQkFBNEIsU0FBUSxpQkFBaUI7Ozs7O0lBK0Z2RCxZQUFtQixHQUFnQixFQUViLGVBQWtDO1FBQ3BELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFIYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs2QkFo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LEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0tBRUo7O2dDQW5Na0MsU0FBUztnQ0FDVCxTQUFTOztZQWxEL0MsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQ2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsNGdGQUE0Z0YsQ0FBQztnQkFDdGhGLFNBQVMsRUFBRTtvQkFDUCwrQkFBK0I7b0JBQy9CLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBQztpQkFDcEY7YUFFSjs7OztZQXpITyxXQUFXO1lBRVgsaUJBQWlCLHVCQXdOUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7OztvQkF2RjdFLEtBQUs7NEJBT0wsS0FBSzs4QkFRTCxLQUFLOzZCQU9MLEtBQUs7d0JBT0wsS0FBSzt1QkFNTCxLQUFLO3VCQU1MLEtBQUs7dUJBUUwsS0FBSzt5QkFVTCxLQUFLO3VCQU9MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc0RhdGV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBMaWdodHdlaWdodCBhbmQgY29uZmlndXJhYmxlIERhdGUgYW5kIFRpbWUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBwcmltZW5nLiBUaGlzXG4gKiBjb21wb25lbnQgY29tYmluZXMgYm90aCBkYXRlIHBpY2tlciBhcyB3ZWxsIGFzIHRpbWUgcGlja2VyXG4gKlxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnbXlUaW1lcicgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqICAgIDxhdy1kYXRlLXRpbWUgW3ZhbHVlXT1cImRhdGVcIiBbZWRpdGFibGVdPVwiZWRpdGFibGVcIiAgW25hbWVdPVwiJ2R1ZURhdGUnXCI+XG4gKiAgICA8L2F3LWRhdGUtdGltZT5cbiAqXG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15VGltbWVyQ29tcG9uZXRcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gKlxuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICAgICAgdGhpcy5kYXRlLnNldEZ1bGxZZWFyKDIwMTYgLCAxMCAsIDMpO1xuICogICAgICAgICAgICB0aGlzLmRhdGUuc2V0SG91cnMoMTAgLCAxMCAsIDEwKTtcbiAqICAgICAgICB9XG4gKiAgICB9XG4gKlxuICogYGBgXG4gKlxuICogQnkgZGVmYXVsdCB5b3Ugd2lsbCBzZWUgZGF0ZSBmaWVsZCBhbmQgdGltZSBmaWVsZCBpcyBoaWRkZW4gdG8gc2hvdyBib3RoIHlvdSBqdXN0IGRvIGZvbGxvd2luZzpcbiAqXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdteVRpbWVyJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgIDxhdy1kYXRlLXRpbWUgW3ZhbHVlXT1cImRhdGVcIiAgW3Nob3dUaW1lXT1cInNob3dUaW1lXCIgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCIgIFtuYW1lXT1cIidiYmRkJ1wiPlxuICogICAgPC9hdy1kYXRlLXRpbWU+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVRpbW1lckNvbXBvbmV0XG4gKiAgICB7XG4gKiAgICAgICAgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gKiAgICAgICAgc2hvd1RpbWUgPSB0cnVlO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICAgICAgdGhpcy5kYXRlLnNldEZ1bGxZZWFyKDIwMTYgLCAxMCAsIDMpO1xuICogICAgICAgICAgICB0aGlzLmRhdGUuc2V0SG91cnMoMTAgLCAxMCAsIDEwKTtcbiAqICAgICAgICB9XG4gKiAgICB9XG4gKlxuICogYGBgXG4gKlxuICpcbiAqXG4gKi9cblxuXG5leHBvcnQgY29uc3QgREFURVRJTUVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVBbmRUaW1lQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kYXRlLXRpbWUnLFxuICAgIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImVkaXRhYmxlXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidy1kYXRldGltZSBcIiBbY2xhc3MuaGFzLXRpbWVdPVwic2hvd1RpbWVcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuXG4gICAgICAgIDxwLWNhbGVuZGFyIGZvcm1Db250cm9sTmFtZT1cInt7bmFtZX19XCJcbiAgICAgICAgICAgICAgICAgICAgW2RlZmF1bHREYXRlXT1cImRlZmF1bHREYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dJY29uXT1cInNob3dJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD1cInt7c2hvd1RpbWUgPyBmb3JtYXROYW1lV2l0aFRpbWUgOiBmb3JtYXRQYXR0ZXJufX1cIlxuICAgICAgICAgICAgICAgICAgICBbeWVhck5hdmlnYXRvcl09XCJzaG93TmF2aWdhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFttb250aE5hdmlnYXRvcl09XCJzaG93TmF2aWdhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFt5ZWFyUmFuZ2VdPVwieWVhclJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e3Nob3dUaW1lID8gZm9ybWF0TmFtZVdpdGhUaW1lLnRvVXBwZXJDYXNlKCkgOiBmb3JtYXRQYXR0ZXJuLnRvVXBwZXJDYXNlKCl9fVwiXG4gICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRhdGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFt0aW1lT25seV09XCIhc2hvd0RhdGVcIlxuICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHlJbnB1dF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2xvY2FsZV09XCJpMThuXCI+XG4gICAgICAgIDwvcC1jYWxlbmRhcj5cblxuICAgICAgICA8cC1jYWxlbmRhciAqbmdJZj1cInNob3dUaW1lXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cImljb24taGlzdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInt7bmFtZX19XCJcbiAgICAgICAgICAgICAgICAgICAgW2hvdXJGb3JtYXRdPVwiaG91ckZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgIFtkZWZhdWx0RGF0ZV09XCJkZWZhdWx0RGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93SWNvbl09XCJzaG93SWNvblwiXG4gICAgICAgICAgICAgICAgICAgIFt0aW1lT25seV09XCJzaG93VGltZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93VGltZV09XCJzaG93VGltZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJ0aW1lUGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25EYXRlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImkxOG5cIj5cbiAgICAgICAgPC9wLWNhbGVuZGFyPlxuXG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWVkaXRhYmxlXCI+XG4gICAgPGF3LXN0cmluZyB2YWx1ZT1cInt7dmFsdWUgfCBkYXRlOiBmb3JtYXRQYXR0ZXJuTkd9fVwiPjwvYXctc3RyaW5nPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAudy1kYXRldGltZSAudWktY2FsZW5kYXIgYnV0dG9ue2JvcmRlcjowO3dpZHRoOjB9L2RlZXAvIC53LWRhdGV0aW1lIC51aS1jYWxlbmRhci51aS1jYWxlbmRhci13LWJ0biAudWktaW5wdXR0ZXh0e3dpZHRoOjEwMCV9L2RlZXAvIC51aS1jYWxlbmRhciAudWktY2FsZW5kYXItYnV0dG9uIC51aS1idXR0b24taWNvbi1sZWZ0e2ZvbnQtZmFtaWx5OlwiU0FQIGljb24gZm9udHNcIjtjb2xvcjojMTk5ZGUwO2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxLjRlbX0vZGVlcC8gLnVpLWNhbGVuZGFyIC51aS1jYWxlbmRhci1idXR0b24gLnVpLWJ1dHRvbi1pY29uLWxlZnQucGktY2FsZW5kYXI6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMGUwJ30vZGVlcC8gLnVpLWNhbGVuZGFyIC51aS1jYWxlbmRhci1idXR0b24gLnVpLWJ1dHRvbi1pY29uLWxlZnQuaWNvbi1oaXN0b3J5OmJlZm9yZXtjb250ZW50OidcXFxcZTAyZCd9L2RlZXAvIC51aS1kYXRlcGlja2Vye3dpZHRoOjI0LjI4ZW07bGluZS1oZWlnaHQ6MjVweDtwYWRkaW5nOjA7Ym9yZGVyLWNvbG9yOiM5Nzk3OTc7Ym94LXNoYWRvdzpub25lfS9kZWVwLyAudWktZGF0ZXBpY2tlciAudWktZGF0ZXBpY2tlci1oZWFkZXJ7cGFkZGluZzouOTJlbSAwO2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjojMDAwO2ZvbnQtc2l6ZToxZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIC51aS1kYXRlcGlja2VyLW5leHQsL2RlZXAvIC51aS1kYXRlcGlja2VyIC51aS1kYXRlcGlja2VyLXByZXZ7dG9wOjFlbX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnVpLWRhdGVwaWNrZXItcHJldntsZWZ0Oi4yZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIC51aS1kYXRlcGlja2VyLW5leHR7cmlnaHQ6LjJlbX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgdGFibGV7Zm9udC1zaXplOjFlbTttYXJnaW46MCAwIDEuNWVtfS9kZWVwLyAudWktZGF0ZXBpY2tlciB0aHtmb250LXdlaWdodDo0MDA7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjO2NvbG9yOiMzNjM2MzY7cGFkZGluZzouNzg2ZW0gMS4wN2VtfS9kZWVwLyAudWktZGF0ZXBpY2tlciB0ZHtwYWRkaW5nOi4xZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIHRkIGF7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6Mi43ZW07aGVpZ2h0OjIuN2VtO2xpbmUtaGVpZ2h0OjIuN2VtO3BhZGRpbmc6MDtib3JkZXItcmFkaXVzOjUwJX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgdGQgYS51aS1zdGF0ZS1kZWZhdWx0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgdGQgYS51aS1zdGF0ZS1hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojMTk5ZGUwO2NvbG9yOiNmZmZ9L2RlZXAvIC51aS1kYXRlcGlja2VyIC5waXtmb250LXNpemU6MWVtfS9kZWVwLyAudWktZGF0ZXBpY2tlciAucGkucGktY2hldnJvbi1sZWZ0OmJlZm9yZXtjb250ZW50OidcXFxcZTFlZSd9L2RlZXAvIC51aS1kYXRlcGlja2VyIC5waS5waS1jaGV2cm9uLXJpZ2h0OmJlZm9yZXtjb250ZW50OidcXFxcZTFlZCd9L2RlZXAvIC51aS1kYXRlcGlja2VyIC51aS1kYXRlcGlja2VyLWNhbGVuZGFyIHRkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpIGE6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNSwxNTcsMjI0LC43KTtvcGFjaXR5Oi43NTtjb2xvcjojMzYzNjM2fS9kZWVwLyAudWktZGF0ZXBpY2tlci10aW1lb25seXt3aWR0aDoxMDAlfS9kZWVwLyAudWktdGltZXBpY2tlcntmb250LXNpemU6MS4xNGVtO2NvbG9yOiM3Njc2NzY7Zm9udC13ZWlnaHQ6NDAwfS9kZWVwLyAudWktdGltZXBpY2tlciAucGl7Zm9udC1zaXplOjFlbX0vZGVlcC8gLnVpLXRpbWVwaWNrZXIgLnBpLnBpLWNoZXZyb24tdXA6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMWYwJ30vZGVlcC8gLnVpLXRpbWVwaWNrZXIgLnBpLnBpLWNoZXZyb24tZG93bjpiZWZvcmV7Y29udGVudDonXFxcXGUxZWYnfS9kZWVwLyAudWktdGltZXBpY2tlcj5kaXZ7bWFyZ2luLWxlZnQ6MH0vZGVlcC8gLnVpLXRpbWVwaWNrZXIgLnVpLXNlcGFyYXRvcnt3aWR0aDouMWVtO21pbi13aWR0aDouMWVtfS9kZWVwLyAudWktdGltZXBpY2tlciAudWktc2VwYXJhdG9yIC5waXtmb250LXNpemU6MH0vZGVlcC8gLnVpLWRhdGVwaWNrZXItdHJpZ2dlcntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS9kZWVwLyAudWktZGF0ZXBpY2tlci10cmlnZ2VyLnVpLWJ1dHRvbjplbmFibGVkOmhvdmVyLC9kZWVwLyAudWktZGF0ZXBpY2tlci10cmlnZ2VyLnVpLWJ1dHRvbjpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS9kZWVwLyAuaGFzLXRpbWV7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDpub3dyYXB9L2RlZXAvIC5oYXMtdGltZSBwLWNhbGVuZGFyOmZpcnN0LWNoaWxke3dpZHRoOjU1JTttYXJnaW4tcmlnaHQ6MTRweH0vZGVlcC8gLmhhcy10aW1lIHAtY2FsZW5kYXI6bGFzdC1jaGlsZHt3aWR0aDo0NSV9L2RlZXAvIC5oYXMtdGltZSBwLWNhbGVuZGFyOmxhc3QtY2hpbGQgLnVpLWRhdGVwaWNrZXJ7cGFkZGluZzowfS9kZWVwLyAuaGFzLXRpbWUgLnVpLWJ1dHRvbi1pY29uLWxlZnR7bGluZS1oZWlnaHQ6MThweH1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgREFURVRJTUVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlQW5kVGltZUNvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIERhdGVBbmRUaW1lQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnQge1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IE5nVGltZTEyOiBzdHJpbmcgPSAnaGg6bW0gYSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5nVGltZTI0OiBzdHJpbmcgPSAnSEgubW0gYSc7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgdXNlZCB0byBzZXQgdGhlIGRhdGUgYW5kIHRpbWUgcGlja2VyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogRGF0ZTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgZGF0ZSBmb3JtYXQgcGF0dGVybiB1c2VkIGlmIG5vbmUgaXMgcGFzc2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvcm1hdFBhdHRlcm46IHN0cmluZyA9ICdtbS9kZC95eSc7XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpYWwgd29ya2Fyb3VuZCBhcyBmb3JtYXR0ZXJzIGluIHRoZSBwcmltZU5HIGFuZCBhbmd1bGFyIGFyZSBkaWZmZXJlbnQgc28gdW50aWwgaXRzXG4gICAgICogZml4ZWQgd2UgbmVlZCB0byBrZWVwIHRoaXMgZXh0cmEgcGF0dGVybi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvcm1hdFBhdHRlcm5ORzogc3RyaW5nID0gJ01NL2RkL3l5JztcblxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYW5kIGhpZGVzIG5hdmlnYXRpb24gYmFyIHdpdGggeWVhciBhbmQgbW9udGhzIHNlbGVjdGlvbnNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dOYXZpZ2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIFllYXIgcmFuZ2UgZGlzcGxheWVkIGZvciB0aGUgZHJvcCBkb3duLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgeWVhclJhbmdlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBhbmQgaGlkZXMgbmF2aWdhdGlvbiBiYXIgd2l0aCB5ZWFyIGFuZCBtb250aHMgc2VsZWN0aW9uc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0ljb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRpbWVwaWNrZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dUaW1lOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBEYXRlUGlja2VyLiBFdmVuIHdlIGNhbiBoaWRlIGl0LiBpdCBzaG91bGQgYmUgZm9yIG1vc3Qgb2YgdGhlIGNhc2UgYWx3YXlzXG4gICAgICogdHJ1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0RhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRlbGxzIHRoZSBkYXRlIHBpY2tlciB3aGF0IGZvcm1hdCBpdCBzaG91bGQgdXNlIHdoZW4gcHJlc2VudGluZyB0aW1lLiBXaGVuIGhvdXJGb3JtYXQgaXMgMTIsXG4gICAgICogaXQgc2hvd3MgdGhlIEFNLCBQTVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBob3VyRm9ybWF0OiBzdHJpbmcgPSAnMjQnO1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgZXZlbnQgd2hlbiBzcGVjaWZpYyBkYXRlIGlzIGNsaWNrZWQgaW5zaWRlIERhdGVQaWNrZXJcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRhdGUgdG8gaGlnaGxpZ2h0IG9uIGZpcnN0IG9wZW5pbmcgaWYgdGhlIGZpZWxkIGlzIGJsYW5rLlxuICAgICAqXG4gICAgICovXG4gICAgZGVmYXVsdERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBvZiBEYXRldGltZSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgRGF0ZUFuZFRpbWUgZm9ybWF0TmFtZSBpcyBub3QgcHJvcGFnYXRlZFxuICAgICAqIHRvIERhdGUgZmllbGQuXG4gICAgICovXG4gICAgZm9ybWF0TmFtZVdpdGhUaW1lOiBzdHJpbmc7XG5cblxuICAgIGkxOG46IGFueTtcbiAgICB0aW1lUGxhY2VIb2xkZXI6IHN0cmluZyA9ICdoaDpzcyc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHRvIGRhdGVUaW1lIHBhdHRlcm4gd2hpY2ggaXMgZGVmaW5lZCBpbiByZXNvdXJjZSBmaWxlc1xuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ICE9PSAnMTInICYmIHRoaXMuaG91ckZvcm1hdCAhPT0gJzI0Jykge1xuICAgICAgICAgICAgdGhpcy5ob3VyRm9ybWF0ID0gJzI0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZVBsYWNlSG9sZGVyID0gKHRoaXMuaG91ckZvcm1hdCA9PT0gJzEyJykgP1xuICAgICAgICAgICAgYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTEyfWAgOiBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMjR9YDtcblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSgodmFsOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0VHJhbnNsYXRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5lbnYub25Mb2NhbGVDaGFuZ2Uuc3Vic2NyaWJlKChsb2NhbGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0VHJhbnNsYXRpb25zKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE5lZWQgdG8gcmVmYWN0b3IgdGhpcyBhcyB0aGlzIHJlYWxseSBnZXQgY29tcGxpY2F0ZWQgdHJ5aW5nIHRvIGNvdmVyIHVzZWNhc2Ugd2l0aCB0aW1lXG4gICAgICogYW5kIGRhdGUgYW5kIGV2ZXJ5IGZvcm1hdCB3ZSBoYXZlLiBXZSBzaG91bGQgcHJvYmFibHkgaGF2ZSBzZXBhcmF0ZSBwYXR0ZXJucyBmb3JcbiAgICAgKiBkYXRlcyBvbmx5IGFuZCBkYXRlICsgdGltZVxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdFRyYW5zbGF0aW9ucygpIHtcblxuICAgICAgICB0aGlzLmZvcm1hdE5hbWVXaXRoVGltZSA9IHRoaXMuZm9ybWF0UGF0dGVybjtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdFBhdHRlcm5ORyA9IHRoaXMuZm9ybWF0UGF0dGVybiArPSAodGhpcy5ob3VyRm9ybWF0ID09PSAnMTInKSA/XG4gICAgICAgICAgICAgICAgYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTEyfWAgOiBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMjR9YDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIGxldCB0aW1lU3RhcnRzID0gdGhpcy5mb3JtYXRQYXR0ZXJuLmluZGV4T2YoJ2gnKTtcbiAgICAgICAgICAgIGlmICh0aW1lU3RhcnRzICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0TmFtZVdpdGhUaW1lID0gdGhpcy5mb3JtYXRQYXR0ZXJuLnN1YnN0cmluZygwLCB0aW1lU3RhcnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZm9ybWF0UGF0dGVybk5HICs9ICh0aGlzLmhvdXJGb3JtYXQgPT09ICcxMicpID9cbiAgICAgICAgICAgICAgICBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMTJ9YCA6IGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUyNH1gO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmkxOG4gPSB7XG4gICAgICAgICAgICBmaXJzdERheU9mV2VlazogMCxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JyxcbiAgICAgICAgICAgICAgICAnU2F0dXJkYXknXSxcbiAgICAgICAgICAgIGRheU5hbWVzU2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLFxuICAgICAgICAgICAgICAgICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsXG4gICAgICAgICAgICAgICAgJ05vdicsICdEZWMnXVxuICAgICAgICB9O1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIGRhdGVzIGNoYW5nZXMuIEhlcmUgd2UgdXBkYXRlICB0aGlzLnZhbHVlIC0gPiBkYXRlIGFuZCBhbHNvIHVwZGF0ZSB2YWx1ZSBpbnNpZGVcbiAgICAgKiBmb3JtQ29udHJvbGxlclxuICAgICAqXG4gICAgICovXG4gICAgb25EYXRlQ2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBpZiAoaXNCbGFuayhldmVudCkpIHtcbiAgICAgICAgICAgIC8vIHRocm93IHNvbWUgZXJyb3IgP1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGlzRGF0ZShldmVudCkgPyBldmVudCA6IG5ldyBEYXRlKGV2ZW50KTtcblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMudmFsdWUsIHtvbmx5U2VsZjogZmFsc2UsIGVtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=