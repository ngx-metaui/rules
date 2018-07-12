/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var /** @type {?} */ DATETIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DateAndTimeComponent; }),
    multi: true
};
var DateAndTimeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateAndTimeComponent, _super);
    function DateAndTimeComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * Default date format pattern used if none is passed
         *
         */
        _this.formatPattern = 'mm/dd/yy';
        /**
         * Special workaround as formatters in the primeNG and angular are different so until its
         * fixed we need to keep this extra pattern.
         */
        _this.formatPatternNG = 'MM/dd/yy';
        /**
         * Shows and hides navigation bar with year and months selections
         */
        _this.showNavigation = false;
        /**
         * Shows and hides navigation bar with year and months selections
         */
        _this.showIcon = true;
        /**
         * Whether to show timepicker
         */
        _this.showTime = false;
        /**
         * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
         * true
         */
        _this.showDate = true;
        /**
         *
         * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
         * it shows the AM, PM
         *
         */
        _this.hourFormat = '24';
        /**
         * Triggers event when specific date is clicked inside DatePicker
         *
         */
        _this.onChange = new EventEmitter();
        /**
         * Set the date to highlight on first opening if the field is blank.
         *
         */
        _this.defaultDate = new Date();
        _this.timePlaceHolder = 'hh:ss';
        return _this;
    }
    /**
     * @return {?}
     */
    DateAndTimeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.value);
        // default to dateTime pattern which is defined in resource files
        if (this.hourFormat !== '12' && this.hourFormat !== '24') {
            this.hourFormat = '24';
        }
        this.timePlaceHolder = (this.hourFormat === '12') ?
            " " + DateAndTimeComponent.NgTime12 : " " + DateAndTimeComponent.NgTime24;
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(function (val) {
            _this.value = val;
            _this.onModelChanged(_this.value);
        });
        this.initTranslations();
        this.env.onLocaleChange.subscribe(function (locale) {
            _this.initTranslations();
        });
    };
    /**
     * Need to refactor this as this really get complicated trying to cover usecase with time
     * and date and every format we have. We should probably have separate patterns for
     * dates only and date + time
     * @return {?}
     */
    DateAndTimeComponent.prototype.initTranslations = /**
     * Need to refactor this as this really get complicated trying to cover usecase with time
     * and date and every format we have. We should probably have separate patterns for
     * dates only and date + time
     * @return {?}
     */
    function () {
        this.formatNameWithTime = this.formatPattern;
        if (!this.showDate) {
            this.formatPatternNG = this.formatPattern += (this.hourFormat === '12') ?
                " " + DateAndTimeComponent.NgTime12 : " " + DateAndTimeComponent.NgTime24;
        }
        if (this.showTime) {
            var /** @type {?} */ timeStarts = this.formatPattern.indexOf('h');
            if (timeStarts !== -1) {
                this.formatNameWithTime = this.formatPattern.substring(0, timeStarts);
            }
            this.formatPatternNG += (this.hourFormat === '12') ?
                " " + DateAndTimeComponent.NgTime12 : " " + DateAndTimeComponent.NgTime24;
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
    };
    /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     */
    /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     * @param {?} event
     * @return {?}
     */
    DateAndTimeComponent.prototype.onDateChange = /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (isBlank(event)) {
            // throw some error ?
            return;
        }
        this.value = isDate(event) ? event : new Date(event);
        this.formControl.setValue(this.value, { onlySelf: false, emitEvent: true });
        this.onModelChanged(this.value);
        this.onChange.emit(this.value);
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
    DateAndTimeComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    };
    DateAndTimeComponent.NgTime12 = 'hh:mm a';
    DateAndTimeComponent.NgTime24 = 'HH.mm a';
    DateAndTimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-date-time',
                    template: "<ng-template [ngIf]=\"editable\">\n\n    <div class=\"w-datetime \" [class.has-time]=\"showTime\" [formGroup]=\"formGroup\">\n\n        <p-calendar formControlName=\"{{name}}\"\n                    [defaultDate]=\"defaultDate\"\n                    [showIcon]=\"showIcon\"\n                    dateFormat=\"{{showTime ? formatNameWithTime : formatPattern}}\"\n                    [yearNavigator]=\"showNavigation\"\n                    [monthNavigator]=\"showNavigation\"\n                    [yearRange]=\"yearRange\"\n                    placeholder=\"{{showTime ? formatNameWithTime.toUpperCase() : formatPattern.toUpperCase()}}\"\n                    (onSelect)=\"onDateChange($event)\"\n                    [timeOnly]=\"!showDate\"\n                    [readonlyInput]=\"true\"\n                    [locale]=\"i18n\">\n        </p-calendar>\n\n        <p-calendar *ngIf=\"showTime\"\n                    icon=\"icon-history\"\n                    formControlName=\"{{name}}\"\n                    [hourFormat]=\"hourFormat\"\n                    [defaultDate]=\"defaultDate\"\n                    [showIcon]=\"showIcon\"\n                    [timeOnly]=\"showTime\"\n                    [showTime]=\"showTime\"\n                    [placeholder]=\"timePlaceHolder\"\n                    (onSelect)=\"onDateChange($event)\"\n                    [locale]=\"i18n\">\n        </p-calendar>\n\n    </div>\n</ng-template>\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string value=\"{{value | date: formatPatternNG}}\"></aw-string>\n</ng-template>\n",
                    styles: ["/deep/ .w-datetime .ui-calendar button{border:0;width:0}/deep/ .w-datetime .ui-calendar.ui-calendar-w-btn .ui-inputtext{width:100%}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left{font-family:\"SAP icon fonts\";color:#199de0;cursor:pointer;font-size:1.4em}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.pi-calendar:before{content:'\\e0e0'}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.icon-history:before{content:'\\e02d'}/deep/ .ui-datepicker{width:24.28em;line-height:25px;padding:0;border-color:#979797;box-shadow:none}/deep/ .ui-datepicker .ui-datepicker-header{padding:.92em 0;font-weight:400;color:#000;font-size:1em}/deep/ .ui-datepicker .ui-datepicker-next,/deep/ .ui-datepicker .ui-datepicker-prev{top:1em}/deep/ .ui-datepicker .ui-datepicker-prev{left:.2em}/deep/ .ui-datepicker .ui-datepicker-next{right:.2em}/deep/ .ui-datepicker table{font-size:1em;margin:0 0 1.5em}/deep/ .ui-datepicker th{font-weight:400;background-color:#ececec;color:#363636;padding:.786em 1.07em}/deep/ .ui-datepicker td{padding:.1em}/deep/ .ui-datepicker td a{text-align:center;width:2.7em;height:2.7em;line-height:2.7em;padding:0;border-radius:50%}/deep/ .ui-datepicker td a.ui-state-default{border-color:transparent}/deep/ .ui-datepicker td a.ui-state-active{background-color:#199de0;color:#fff}/deep/ .ui-datepicker .pi{font-size:1em}/deep/ .ui-datepicker .pi.pi-chevron-left:before{content:'\\e1ee'}/deep/ .ui-datepicker .pi.pi-chevron-right:before{content:'\\e1ed'}/deep/ .ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover{border-color:transparent;background-color:rgba(25,157,224,.7);opacity:.75;color:#363636}/deep/ .ui-datepicker-timeonly{width:100%}/deep/ .ui-timepicker{font-size:1.14em;color:#767676;font-weight:400}/deep/ .ui-timepicker .pi{font-size:1em}/deep/ .ui-timepicker .pi.pi-chevron-up:before{content:'\\e1f0'}/deep/ .ui-timepicker .pi.pi-chevron-down:before{content:'\\e1ef'}/deep/ .ui-timepicker>div{margin-left:0}/deep/ .ui-timepicker .ui-separator{width:.1em;min-width:.1em}/deep/ .ui-timepicker .ui-separator .pi{font-size:0}/deep/ .ui-datepicker-trigger{background-color:transparent}/deep/ .ui-datepicker-trigger.ui-button:enabled:hover,/deep/ .ui-datepicker-trigger.ui-button:focus{background-color:transparent}/deep/ .has-time{display:flex;flex-wrap:nowrap}/deep/ .has-time p-calendar:first-child{width:55%;margin-right:14px}/deep/ .has-time p-calendar:last-child{width:45%}/deep/ .has-time p-calendar:last-child .ui-datepicker{padding:0}/deep/ .has-time .ui-button-icon-left{line-height:18px}"],
                    providers: [
                        DATETIME_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return DateAndTimeComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    DateAndTimeComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
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
    return DateAndTimeComponent;
}(BaseFormComponent));
export { DateAndTimeComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hbmQtdGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGUtYW5kLXRpbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRXRGLE1BQU0sQ0FBQyxxQkFBTSwrQkFBK0IsR0FBUTtJQUNoRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFpRHdDLGdEQUFpQjtJQStGdkQsOEJBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFHSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBSmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OzhCQWhGaEMsVUFB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OztJQUFWLFVBQVcsS0FBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtvQ0FuTWtDLFNBQVM7b0NBQ1QsU0FBUzs7Z0JBbEQvQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSwrZ0RBcUNiO29CQUNHLE1BQU0sRUFBRSxDQUFDLDhnRkFBNGdGLENBQUM7b0JBQ3RoRixTQUFTLEVBQUU7d0JBQ1AsK0JBQStCO3dCQUMvQixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQyxFQUFDO3FCQUNwRjtpQkFFSjs7OztnQkF6SE8sV0FBVztnQkFFWCxpQkFBaUIsdUJBd05SLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7Ozt3QkF2RjdFLEtBQUs7Z0NBT0wsS0FBSztrQ0FRTCxLQUFLO2lDQU9MLEtBQUs7NEJBT0wsS0FBSzsyQkFNTCxLQUFLOzJCQU1MLEtBQUs7MkJBUUwsS0FBSzs2QkFVTCxLQUFLOzJCQU9MLE1BQU07OytCQXBPWDtFQXlKMEMsaUJBQWlCO1NBQTlDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzRGF0ZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuXG4vKipcbiAqIExpZ2h0d2VpZ2h0IGFuZCBjb25maWd1cmFibGUgRGF0ZSBhbmQgVGltZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIHByaW1lbmcuIFRoaXNcbiAqIGNvbXBvbmVudCBjb21iaW5lcyBib3RoIGRhdGUgcGlja2VyIGFzIHdlbGwgYXMgdGltZSBwaWNrZXJcbiAqXG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdteVRpbWVyJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgPGF3LWRhdGUtdGltZSBbdmFsdWVdPVwiZGF0ZVwiIFtlZGl0YWJsZV09XCJlZGl0YWJsZVwiICBbbmFtZV09XCInZHVlRGF0ZSdcIj5cbiAqICAgIDwvYXctZGF0ZS10aW1lPlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlUaW1tZXJDb21wb25ldFxuICogICAge1xuICpcbiAqICAgICAgICBkYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAqXG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgICAgICB0aGlzLmRhdGUuc2V0RnVsbFllYXIoMjAxNiAsIDEwICwgMyk7XG4gKiAgICAgICAgICAgIHRoaXMuZGF0ZS5zZXRIb3VycygxMCAsIDEwICwgMTApO1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0IHlvdSB3aWxsIHNlZSBkYXRlIGZpZWxkIGFuZCB0aW1lIGZpZWxkIGlzIGhpZGRlbiB0byBzaG93IGJvdGggeW91IGp1c3QgZG8gZm9sbG93aW5nOlxuICpcbiAqICBgYGBcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ215VGltZXInICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgPGF3LWRhdGUtdGltZSBbdmFsdWVdPVwiZGF0ZVwiICBbc2hvd1RpbWVdPVwic2hvd1RpbWVcIiBbZWRpdGFibGVdPVwiZWRpdGFibGVcIiAgW25hbWVdPVwiJ2JiZGQnXCI+XG4gKiAgICA8L2F3LWRhdGUtdGltZT5cbiAqXG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15VGltbWVyQ29tcG9uZXRcbiAqICAgIHtcbiAqICAgICAgICBkYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAqICAgICAgICBzaG93VGltZSA9IHRydWU7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgICAgICB0aGlzLmRhdGUuc2V0RnVsbFllYXIoMjAxNiAsIDEwICwgMyk7XG4gKiAgICAgICAgICAgIHRoaXMuZGF0ZS5zZXRIb3VycygxMCAsIDEwICwgMTApO1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZUFuZFRpbWVDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRhdGUtdGltZScsXG4gICAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgW25nSWZdPVwiZWRpdGFibGVcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ3LWRhdGV0aW1lIFwiIFtjbGFzcy5oYXMtdGltZV09XCJzaG93VGltZVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG5cbiAgICAgICAgPHAtY2FsZW5kYXIgZm9ybUNvbnRyb2xOYW1lPVwie3tuYW1lfX1cIlxuICAgICAgICAgICAgICAgICAgICBbZGVmYXVsdERhdGVdPVwiZGVmYXVsdERhdGVcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd0ljb25dPVwic2hvd0ljb25cIlxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PVwie3tzaG93VGltZSA/IGZvcm1hdE5hbWVXaXRoVGltZSA6IGZvcm1hdFBhdHRlcm59fVwiXG4gICAgICAgICAgICAgICAgICAgIFt5ZWFyTmF2aWdhdG9yXT1cInNob3dOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW21vbnRoTmF2aWdhdG9yXT1cInNob3dOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW3llYXJSYW5nZV09XCJ5ZWFyUmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7c2hvd1RpbWUgPyBmb3JtYXROYW1lV2l0aFRpbWUudG9VcHBlckNhc2UoKSA6IGZvcm1hdFBhdHRlcm4udG9VcHBlckNhc2UoKX19XCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uRGF0ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW3RpbWVPbmx5XT1cIiFzaG93RGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seUlucHV0XT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImkxOG5cIj5cbiAgICAgICAgPC9wLWNhbGVuZGFyPlxuXG4gICAgICAgIDxwLWNhbGVuZGFyICpuZ0lmPVwic2hvd1RpbWVcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPVwiaWNvbi1oaXN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwie3tuYW1lfX1cIlxuICAgICAgICAgICAgICAgICAgICBbaG91ckZvcm1hdF09XCJob3VyRm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgW2RlZmF1bHREYXRlXT1cImRlZmF1bHREYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dJY29uXT1cInNob3dJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgW3RpbWVPbmx5XT1cInNob3dUaW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dUaW1lXT1cInNob3dUaW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInRpbWVQbGFjZUhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRhdGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwiaTE4blwiPlxuICAgICAgICA8L3AtY2FsZW5kYXI+XG5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZWRpdGFibGVcIj5cbiAgICA8YXctc3RyaW5nIHZhbHVlPVwie3t2YWx1ZSB8IGRhdGU6IGZvcm1hdFBhdHRlcm5OR319XCI+PC9hdy1zdHJpbmc+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIC53LWRhdGV0aW1lIC51aS1jYWxlbmRhciBidXR0b257Ym9yZGVyOjA7d2lkdGg6MH0vZGVlcC8gLnctZGF0ZXRpbWUgLnVpLWNhbGVuZGFyLnVpLWNhbGVuZGFyLXctYnRuIC51aS1pbnB1dHRleHR7d2lkdGg6MTAwJX0vZGVlcC8gLnVpLWNhbGVuZGFyIC51aS1jYWxlbmRhci1idXR0b24gLnVpLWJ1dHRvbi1pY29uLWxlZnR7Zm9udC1mYW1pbHk6XCJTQVAgaWNvbiBmb250c1wiO2NvbG9yOiMxOTlkZTA7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjEuNGVtfS9kZWVwLyAudWktY2FsZW5kYXIgLnVpLWNhbGVuZGFyLWJ1dHRvbiAudWktYnV0dG9uLWljb24tbGVmdC5waS1jYWxlbmRhcjpiZWZvcmV7Y29udGVudDonXFxcXGUwZTAnfS9kZWVwLyAudWktY2FsZW5kYXIgLnVpLWNhbGVuZGFyLWJ1dHRvbiAudWktYnV0dG9uLWljb24tbGVmdC5pY29uLWhpc3Rvcnk6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMDJkJ30vZGVlcC8gLnVpLWRhdGVwaWNrZXJ7d2lkdGg6MjQuMjhlbTtsaW5lLWhlaWdodDoyNXB4O3BhZGRpbmc6MDtib3JkZXItY29sb3I6Izk3OTc5Nztib3gtc2hhZG93Om5vbmV9L2RlZXAvIC51aS1kYXRlcGlja2VyIC51aS1kYXRlcGlja2VyLWhlYWRlcntwYWRkaW5nOi45MmVtIDA7Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOiMwMDA7Zm9udC1zaXplOjFlbX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnVpLWRhdGVwaWNrZXItbmV4dCwvZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnVpLWRhdGVwaWNrZXItcHJldnt0b3A6MWVtfS9kZWVwLyAudWktZGF0ZXBpY2tlciAudWktZGF0ZXBpY2tlci1wcmV2e2xlZnQ6LjJlbX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnVpLWRhdGVwaWNrZXItbmV4dHtyaWdodDouMmVtfS9kZWVwLyAudWktZGF0ZXBpY2tlciB0YWJsZXtmb250LXNpemU6MWVtO21hcmdpbjowIDAgMS41ZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIHRoe2ZvbnQtd2VpZ2h0OjQwMDtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWM7Y29sb3I6IzM2MzYzNjtwYWRkaW5nOi43ODZlbSAxLjA3ZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIHRke3BhZGRpbmc6LjFlbX0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgdGQgYXt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoyLjdlbTtoZWlnaHQ6Mi43ZW07bGluZS1oZWlnaHQ6Mi43ZW07cGFkZGluZzowO2JvcmRlci1yYWRpdXM6NTAlfS9kZWVwLyAudWktZGF0ZXBpY2tlciB0ZCBhLnVpLXN0YXRlLWRlZmF1bHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50fS9kZWVwLyAudWktZGF0ZXBpY2tlciB0ZCBhLnVpLXN0YXRlLWFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiMxOTlkZTA7Y29sb3I6I2ZmZn0vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnBpe2ZvbnQtc2l6ZToxZW19L2RlZXAvIC51aS1kYXRlcGlja2VyIC5waS5waS1jaGV2cm9uLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMWVlJ30vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnBpLnBpLWNoZXZyb24tcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMWVkJ30vZGVlcC8gLnVpLWRhdGVwaWNrZXIgLnVpLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQ6bm90KC51aS1zdGF0ZS1kaXNhYmxlZCkgYTpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1LDE1NywyMjQsLjcpO29wYWNpdHk6Ljc1O2NvbG9yOiMzNjM2MzZ9L2RlZXAvIC51aS1kYXRlcGlja2VyLXRpbWVvbmx5e3dpZHRoOjEwMCV9L2RlZXAvIC51aS10aW1lcGlja2Vye2ZvbnQtc2l6ZToxLjE0ZW07Y29sb3I6Izc2NzY3Njtmb250LXdlaWdodDo0MDB9L2RlZXAvIC51aS10aW1lcGlja2VyIC5waXtmb250LXNpemU6MWVtfS9kZWVwLyAudWktdGltZXBpY2tlciAucGkucGktY2hldnJvbi11cDpiZWZvcmV7Y29udGVudDonXFxcXGUxZjAnfS9kZWVwLyAudWktdGltZXBpY2tlciAucGkucGktY2hldnJvbi1kb3duOmJlZm9yZXtjb250ZW50OidcXFxcZTFlZid9L2RlZXAvIC51aS10aW1lcGlja2VyPmRpdnttYXJnaW4tbGVmdDowfS9kZWVwLyAudWktdGltZXBpY2tlciAudWktc2VwYXJhdG9ye3dpZHRoOi4xZW07bWluLXdpZHRoOi4xZW19L2RlZXAvIC51aS10aW1lcGlja2VyIC51aS1zZXBhcmF0b3IgLnBpe2ZvbnQtc2l6ZTowfS9kZWVwLyAudWktZGF0ZXBpY2tlci10cmlnZ2Vye2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9L2RlZXAvIC51aS1kYXRlcGlja2VyLXRyaWdnZXIudWktYnV0dG9uOmVuYWJsZWQ6aG92ZXIsL2RlZXAvIC51aS1kYXRlcGlja2VyLXRyaWdnZXIudWktYnV0dG9uOmZvY3Vze2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9L2RlZXAvIC5oYXMtdGltZXtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOm5vd3JhcH0vZGVlcC8gLmhhcy10aW1lIHAtY2FsZW5kYXI6Zmlyc3QtY2hpbGR7d2lkdGg6NTUlO21hcmdpbi1yaWdodDoxNHB4fS9kZWVwLyAuaGFzLXRpbWUgcC1jYWxlbmRhcjpsYXN0LWNoaWxke3dpZHRoOjQ1JX0vZGVlcC8gLmhhcy10aW1lIHAtY2FsZW5kYXI6bGFzdC1jaGlsZCAudWktZGF0ZXBpY2tlcntwYWRkaW5nOjB9L2RlZXAvIC5oYXMtdGltZSAudWktYnV0dG9uLWljb24tbGVmdHtsaW5lLWhlaWdodDoxOHB4fWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEQVRFVElNRV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVBbmRUaW1lQ29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUFuZFRpbWVDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgTmdUaW1lMTI6IHN0cmluZyA9ICdoaDptbSBhJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTmdUaW1lMjQ6IHN0cmluZyA9ICdISC5tbSBhJztcblxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSB1c2VkIHRvIHNldCB0aGUgZGF0ZSBhbmQgdGltZSBwaWNrZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBEYXRlO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBkYXRlIGZvcm1hdCBwYXR0ZXJuIHVzZWQgaWYgbm9uZSBpcyBwYXNzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9ybWF0UGF0dGVybjogc3RyaW5nID0gJ21tL2RkL3l5JztcblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lhbCB3b3JrYXJvdW5kIGFzIGZvcm1hdHRlcnMgaW4gdGhlIHByaW1lTkcgYW5kIGFuZ3VsYXIgYXJlIGRpZmZlcmVudCBzbyB1bnRpbCBpdHNcbiAgICAgKiBmaXhlZCB3ZSBuZWVkIHRvIGtlZXAgdGhpcyBleHRyYSBwYXR0ZXJuLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9ybWF0UGF0dGVybk5HOiBzdHJpbmcgPSAnTU0vZGQveXknO1xuXG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBhbmQgaGlkZXMgbmF2aWdhdGlvbiBiYXIgd2l0aCB5ZWFyIGFuZCBtb250aHMgc2VsZWN0aW9uc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd05hdmlnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogWWVhciByYW5nZSBkaXNwbGF5ZWQgZm9yIHRoZSBkcm9wIGRvd24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB5ZWFyUmFuZ2U6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNob3dzIGFuZCBoaWRlcyBuYXZpZ2F0aW9uIGJhciB3aXRoIHllYXIgYW5kIG1vbnRocyBzZWxlY3Rpb25zXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93SWNvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGltZXBpY2tlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1RpbWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IERhdGVQaWNrZXIuIEV2ZW4gd2UgY2FuIGhpZGUgaXQuIGl0IHNob3VsZCBiZSBmb3IgbW9zdCBvZiB0aGUgY2FzZSBhbHdheXNcbiAgICAgKiB0cnVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93RGF0ZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGVsbHMgdGhlIGRhdGUgcGlja2VyIHdoYXQgZm9ybWF0IGl0IHNob3VsZCB1c2Ugd2hlbiBwcmVzZW50aW5nIHRpbWUuIFdoZW4gaG91ckZvcm1hdCBpcyAxMixcbiAgICAgKiBpdCBzaG93cyB0aGUgQU0sIFBNXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhvdXJGb3JtYXQ6IHN0cmluZyA9ICcyNCc7XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBldmVudCB3aGVuIHNwZWNpZmljIGRhdGUgaXMgY2xpY2tlZCBpbnNpZGUgRGF0ZVBpY2tlclxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0ZSB0byBoaWdobGlnaHQgb24gZmlyc3Qgb3BlbmluZyBpZiB0aGUgZmllbGQgaXMgYmxhbmsuXG4gICAgICpcbiAgICAgKi9cbiAgICBkZWZhdWx0RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIG9mIERhdGV0aW1lIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZSBEYXRlQW5kVGltZSBmb3JtYXROYW1lIGlzIG5vdCBwcm9wYWdhdGVkXG4gICAgICogdG8gRGF0ZSBmaWVsZC5cbiAgICAgKi9cbiAgICBmb3JtYXROYW1lV2l0aFRpbWU6IHN0cmluZztcblxuXG4gICAgaTE4bjogYW55O1xuICAgIHRpbWVQbGFjZUhvbGRlcjogc3RyaW5nID0gJ2hoOnNzJztcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdG8gZGF0ZVRpbWUgcGF0dGVybiB3aGljaCBpcyBkZWZpbmVkIGluIHJlc291cmNlIGZpbGVzXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgIT09ICcxMicgJiYgdGhpcy5ob3VyRm9ybWF0ICE9PSAnMjQnKSB7XG4gICAgICAgICAgICB0aGlzLmhvdXJGb3JtYXQgPSAnMjQnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lUGxhY2VIb2xkZXIgPSAodGhpcy5ob3VyRm9ybWF0ID09PSAnMTInKSA/XG4gICAgICAgICAgICBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMTJ9YCA6IGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUyNH1gO1xuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2YWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRUcmFuc2xhdGlvbnMoKTtcblxuICAgICAgICB0aGlzLmVudi5vbkxvY2FsZUNoYW5nZS5zdWJzY3JpYmUoKGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUcmFuc2xhdGlvbnMoKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byByZWZhY3RvciB0aGlzIGFzIHRoaXMgcmVhbGx5IGdldCBjb21wbGljYXRlZCB0cnlpbmcgdG8gY292ZXIgdXNlY2FzZSB3aXRoIHRpbWVcbiAgICAgKiBhbmQgZGF0ZSBhbmQgZXZlcnkgZm9ybWF0IHdlIGhhdmUuIFdlIHNob3VsZCBwcm9iYWJseSBoYXZlIHNlcGFyYXRlIHBhdHRlcm5zIGZvclxuICAgICAqIGRhdGVzIG9ubHkgYW5kIGRhdGUgKyB0aW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0VHJhbnNsYXRpb25zKCkge1xuXG4gICAgICAgIHRoaXMuZm9ybWF0TmFtZVdpdGhUaW1lID0gdGhpcy5mb3JtYXRQYXR0ZXJuO1xuICAgICAgICBpZiAoIXRoaXMuc2hvd0RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0UGF0dGVybk5HID0gdGhpcy5mb3JtYXRQYXR0ZXJuICs9ICh0aGlzLmhvdXJGb3JtYXQgPT09ICcxMicpID9cbiAgICAgICAgICAgICAgICBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMTJ9YCA6IGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUyNH1gO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgbGV0IHRpbWVTdGFydHMgPSB0aGlzLmZvcm1hdFBhdHRlcm4uaW5kZXhPZignaCcpO1xuICAgICAgICAgICAgaWYgKHRpbWVTdGFydHMgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXROYW1lV2l0aFRpbWUgPSB0aGlzLmZvcm1hdFBhdHRlcm4uc3Vic3RyaW5nKDAsIHRpbWVTdGFydHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mb3JtYXRQYXR0ZXJuTkcgKz0gKHRoaXMuaG91ckZvcm1hdCA9PT0gJzEyJykgP1xuICAgICAgICAgICAgICAgIGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUxMn1gIDogYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTI0fWA7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuaTE4biA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiAwLFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLFxuICAgICAgICAgICAgICAgICdTYXR1cmRheSddLFxuICAgICAgICAgICAgZGF5TmFtZXNTaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgICAgICAgICAgIGRheU5hbWVzTWluOiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsXG4gICAgICAgICAgICAgICAgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JyxcbiAgICAgICAgICAgICAgICAnTm92JywgJ0RlYyddXG4gICAgICAgIH07XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gZGF0ZXMgY2hhbmdlcy4gSGVyZSB3ZSB1cGRhdGUgIHRoaXMudmFsdWUgLSA+IGRhdGUgYW5kIGFsc28gdXBkYXRlIHZhbHVlIGluc2lkZVxuICAgICAqIGZvcm1Db250cm9sbGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRhdGVDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGV2ZW50KSkge1xuICAgICAgICAgICAgLy8gdGhyb3cgc29tZSBlcnJvciA/XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gaXNEYXRlKGV2ZW50KSA/IGV2ZW50IDogbmV3IERhdGUoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy52YWx1ZSwge29ubHlTZWxmOiBmYWxzZSwgZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==