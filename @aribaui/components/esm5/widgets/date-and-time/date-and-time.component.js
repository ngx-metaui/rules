/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Environment, isBlank, isDate } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
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
  @type {?} */
export var DATETIME_CONTROL_VALUE_ACCESSOR = {
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
            /** @type {?} */
            var timeStarts = this.formatPattern.indexOf('h');
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
                    providers: [
                        DATETIME_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return DateAndTimeComponent; }) }
                    ],
                    styles: ["/deep/ .w-datetime .ui-calendar button{border:0;width:0}/deep/ .w-datetime .ui-calendar.ui-calendar-w-btn .ui-inputtext{width:100%}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left{font-family:\"SAP icon fonts\";color:#199de0;cursor:pointer;font-size:1.4em}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.pi-calendar:before{content:'\\e0e0'}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.icon-history:before{content:'\\e02d'}/deep/ .ui-datepicker{width:24.28em;line-height:25px;padding:0;border-color:#979797;box-shadow:none}/deep/ .ui-datepicker .ui-datepicker-header{padding:.92em 0;font-weight:400;color:#000;font-size:1em}/deep/ .ui-datepicker .ui-datepicker-next,/deep/ .ui-datepicker .ui-datepicker-prev{top:1em}/deep/ .ui-datepicker .ui-datepicker-prev{left:.2em}/deep/ .ui-datepicker .ui-datepicker-next{right:.2em}/deep/ .ui-datepicker table{font-size:1em;margin:0 0 1.5em}/deep/ .ui-datepicker th{font-weight:400;background-color:#ececec;color:#363636;padding:.786em 1.07em}/deep/ .ui-datepicker td{padding:.1em}/deep/ .ui-datepicker td a{text-align:center;width:2.7em;height:2.7em;line-height:2.7em;padding:0;border-radius:50%}/deep/ .ui-datepicker td a.ui-state-default{border-color:transparent}/deep/ .ui-datepicker td a.ui-state-active{background-color:#199de0;color:#fff}/deep/ .ui-datepicker .pi{font-size:1em}/deep/ .ui-datepicker .pi.pi-chevron-left:before{content:'\\e1ee'}/deep/ .ui-datepicker .pi.pi-chevron-right:before{content:'\\e1ed'}/deep/ .ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover{border-color:transparent;background-color:rgba(25,157,224,.7);opacity:.75;color:#363636}/deep/ .ui-datepicker-timeonly{width:100%}/deep/ .ui-timepicker{font-size:1.14em;color:#767676;font-weight:400}/deep/ .ui-timepicker .pi{font-size:1em}/deep/ .ui-timepicker .pi.pi-chevron-up:before{content:'\\e1f0'}/deep/ .ui-timepicker .pi.pi-chevron-down:before{content:'\\e1ef'}/deep/ .ui-timepicker>div{margin-left:0}/deep/ .ui-timepicker .ui-separator{width:.1em;min-width:.1em}/deep/ .ui-timepicker .ui-separator .pi{font-size:0}/deep/ .ui-datepicker-trigger{background-color:transparent}/deep/ .ui-datepicker-trigger.ui-button:enabled:hover,/deep/ .ui-datepicker-trigger.ui-button:focus{background-color:transparent}/deep/ .has-time{display:flex;flex-wrap:nowrap}/deep/ .has-time p-calendar:first-child{width:55%;margin-right:14px}/deep/ .has-time p-calendar:last-child{width:45%}/deep/ .has-time p-calendar:last-child .ui-datepicker{padding:0}/deep/ .has-time .ui-button-icon-left{line-height:18px}"]
                }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hbmQtdGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRlLWFuZC10aW1lL2RhdGUtYW5kLXRpbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRXRGLFdBQWEsK0JBQStCLEdBQVE7SUFDaEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBWXdDLGdEQUFpQjtJQStGdkQsOEJBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFHSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBSmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OzhCQWhGaEMsVUFBVTs7Ozs7Z0NBUVIs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S0FBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtvQ0FuTWtDLFNBQVM7b0NBQ1QsU0FBUzs7Z0JBYi9DLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIseWhEQUEyQztvQkFFM0MsU0FBUyxFQUFFO3dCQUNQLCtCQUErQjt3QkFDL0IsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUMsRUFBQztxQkFDcEY7O2lCQUVKOzs7O2dCQXBGTyxXQUFXO2dCQUVYLGlCQUFpQix1QkFtTFIsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQzs7O3dCQXZGN0UsS0FBSztnQ0FPTCxLQUFLO2tDQVFMLEtBQUs7aUNBT0wsS0FBSzs0QkFPTCxLQUFLOzJCQU1MLEtBQUs7MkJBTUwsS0FBSzsyQkFRTCxLQUFLOzZCQVVMLEtBQUs7MkJBT0wsTUFBTTs7K0JBL0xYO0VBb0gwQyxpQkFBaUI7U0FBOUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNEYXRlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogTGlnaHR3ZWlnaHQgYW5kIGNvbmZpZ3VyYWJsZSBEYXRlIGFuZCBUaW1lIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgcHJpbWVuZy4gVGhpc1xuICogY29tcG9uZW50IGNvbWJpbmVzIGJvdGggZGF0ZSBwaWNrZXIgYXMgd2VsbCBhcyB0aW1lIHBpY2tlclxuICpcbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ215VGltZXInICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICA8YXctZGF0ZS10aW1lIFt2YWx1ZV09XCJkYXRlXCIgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCIgIFtuYW1lXT1cIidkdWVEYXRlJ1wiPlxuICogICAgPC9hdy1kYXRlLXRpbWU+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVRpbW1lckNvbXBvbmV0XG4gKiAgICB7XG4gKlxuICogICAgICAgIGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICpcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgICAgIHRoaXMuZGF0ZS5zZXRGdWxsWWVhcigyMDE2ICwgMTAgLCAzKTtcbiAqICAgICAgICAgICAgdGhpcy5kYXRlLnNldEhvdXJzKDEwICwgMTAgLCAxMCk7XG4gKiAgICAgICAgfVxuICogICAgfVxuICpcbiAqIGBgYFxuICpcbiAqIEJ5IGRlZmF1bHQgeW91IHdpbGwgc2VlIGRhdGUgZmllbGQgYW5kIHRpbWUgZmllbGQgaXMgaGlkZGVuIHRvIHNob3cgYm90aCB5b3UganVzdCBkbyBmb2xsb3dpbmc6XG4gKlxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnbXlUaW1lcicgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqXG4gKiAgICA8YXctZGF0ZS10aW1lIFt2YWx1ZV09XCJkYXRlXCIgIFtzaG93VGltZV09XCJzaG93VGltZVwiIFtlZGl0YWJsZV09XCJlZGl0YWJsZVwiICBbbmFtZV09XCInYmJkZCdcIj5cbiAqICAgIDwvYXctZGF0ZS10aW1lPlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlUaW1tZXJDb21wb25ldFxuICogICAge1xuICogICAgICAgIGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICogICAgICAgIHNob3dUaW1lID0gdHJ1ZTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgICAgIHRoaXMuZGF0ZS5zZXRGdWxsWWVhcigyMDE2ICwgMTAgLCAzKTtcbiAqICAgICAgICAgICAgdGhpcy5kYXRlLnNldEhvdXJzKDEwICwgMTAgLCAxMCk7XG4gKiAgICAgICAgfVxuICogICAgfVxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICovXG5cblxuZXhwb3J0IGNvbnN0IERBVEVUSU1FX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlQW5kVGltZUNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZGF0ZS10aW1lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2RhdGUtYW5kLXRpbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkYXRlLWFuZC10aW1lLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERBVEVUSU1FX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZUFuZFRpbWVDb21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBEYXRlQW5kVGltZUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyByZWFkb25seSBOZ1RpbWUxMjogc3RyaW5nID0gJ2hoOm1tIGEnO1xuICAgIHN0YXRpYyByZWFkb25seSBOZ1RpbWUyNDogc3RyaW5nID0gJ0hILm1tIGEnO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHZhbHVlIHVzZWQgdG8gc2V0IHRoZSBkYXRlIGFuZCB0aW1lIHBpY2tlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IERhdGU7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGRhdGUgZm9ybWF0IHBhdHRlcm4gdXNlZCBpZiBub25lIGlzIHBhc3NlZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb3JtYXRQYXR0ZXJuOiBzdHJpbmcgPSAnbW0vZGQveXknO1xuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWFsIHdvcmthcm91bmQgYXMgZm9ybWF0dGVycyBpbiB0aGUgcHJpbWVORyBhbmQgYW5ndWxhciBhcmUgZGlmZmVyZW50IHNvIHVudGlsIGl0c1xuICAgICAqIGZpeGVkIHdlIG5lZWQgdG8ga2VlcCB0aGlzIGV4dHJhIHBhdHRlcm4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb3JtYXRQYXR0ZXJuTkc6IHN0cmluZyA9ICdNTS9kZC95eSc7XG5cblxuICAgIC8qKlxuICAgICAqIFNob3dzIGFuZCBoaWRlcyBuYXZpZ2F0aW9uIGJhciB3aXRoIHllYXIgYW5kIG1vbnRocyBzZWxlY3Rpb25zXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBZZWFyIHJhbmdlIGRpc3BsYXllZCBmb3IgdGhlIGRyb3AgZG93bi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHllYXJSYW5nZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYW5kIGhpZGVzIG5hdmlnYXRpb24gYmFyIHdpdGggeWVhciBhbmQgbW9udGhzIHNlbGVjdGlvbnNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dJY29uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aW1lcGlja2VyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93VGltZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgRGF0ZVBpY2tlci4gRXZlbiB3ZSBjYW4gaGlkZSBpdC4gaXQgc2hvdWxkIGJlIGZvciBtb3N0IG9mIHRoZSBjYXNlIGFsd2F5c1xuICAgICAqIHRydWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dEYXRlOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxscyB0aGUgZGF0ZSBwaWNrZXIgd2hhdCBmb3JtYXQgaXQgc2hvdWxkIHVzZSB3aGVuIHByZXNlbnRpbmcgdGltZS4gV2hlbiBob3VyRm9ybWF0IGlzIDEyLFxuICAgICAqIGl0IHNob3dzIHRoZSBBTSwgUE1cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaG91ckZvcm1hdDogc3RyaW5nID0gJzI0JztcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGV2ZW50IHdoZW4gc3BlY2lmaWMgZGF0ZSBpcyBjbGlja2VkIGluc2lkZSBEYXRlUGlja2VyXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRlIHRvIGhpZ2hsaWdodCBvbiBmaXJzdCBvcGVuaW5nIGlmIHRoZSBmaWVsZCBpcyBibGFuay5cbiAgICAgKlxuICAgICAqL1xuICAgIGRlZmF1bHREYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcblxuICAgIC8qKlxuICAgICAqIEluIGNhc2Ugb2YgRGF0ZXRpbWUgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlIERhdGVBbmRUaW1lIGZvcm1hdE5hbWUgaXMgbm90IHByb3BhZ2F0ZWRcbiAgICAgKiB0byBEYXRlIGZpZWxkLlxuICAgICAqL1xuICAgIGZvcm1hdE5hbWVXaXRoVGltZTogc3RyaW5nO1xuXG5cbiAgICBpMThuOiBhbnk7XG4gICAgdGltZVBsYWNlSG9sZGVyOiBzdHJpbmcgPSAnaGg6c3MnO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0byBkYXRlVGltZSBwYXR0ZXJuIHdoaWNoIGlzIGRlZmluZWQgaW4gcmVzb3VyY2UgZmlsZXNcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCAhPT0gJzEyJyAmJiB0aGlzLmhvdXJGb3JtYXQgIT09ICcyNCcpIHtcbiAgICAgICAgICAgIHRoaXMuaG91ckZvcm1hdCA9ICcyNCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVQbGFjZUhvbGRlciA9ICh0aGlzLmhvdXJGb3JtYXQgPT09ICcxMicpID9cbiAgICAgICAgICAgIGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUxMn1gIDogYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTI0fWA7XG5cbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdFRyYW5zbGF0aW9ucygpO1xuXG4gICAgICAgIHRoaXMuZW52Lm9uTG9jYWxlQ2hhbmdlLnN1YnNjcmliZSgobG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRyYW5zbGF0aW9ucygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIHJlZmFjdG9yIHRoaXMgYXMgdGhpcyByZWFsbHkgZ2V0IGNvbXBsaWNhdGVkIHRyeWluZyB0byBjb3ZlciB1c2VjYXNlIHdpdGggdGltZVxuICAgICAqIGFuZCBkYXRlIGFuZCBldmVyeSBmb3JtYXQgd2UgaGF2ZS4gV2Ugc2hvdWxkIHByb2JhYmx5IGhhdmUgc2VwYXJhdGUgcGF0dGVybnMgZm9yXG4gICAgICogZGF0ZXMgb25seSBhbmQgZGF0ZSArIHRpbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUcmFuc2xhdGlvbnMoKSB7XG5cbiAgICAgICAgdGhpcy5mb3JtYXROYW1lV2l0aFRpbWUgPSB0aGlzLmZvcm1hdFBhdHRlcm47XG4gICAgICAgIGlmICghdGhpcy5zaG93RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRQYXR0ZXJuTkcgPSB0aGlzLmZvcm1hdFBhdHRlcm4gKz0gKHRoaXMuaG91ckZvcm1hdCA9PT0gJzEyJykgP1xuICAgICAgICAgICAgICAgIGAgJHtEYXRlQW5kVGltZUNvbXBvbmVudC5OZ1RpbWUxMn1gIDogYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTI0fWA7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICBsZXQgdGltZVN0YXJ0cyA9IHRoaXMuZm9ybWF0UGF0dGVybi5pbmRleE9mKCdoJyk7XG4gICAgICAgICAgICBpZiAodGltZVN0YXJ0cyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdE5hbWVXaXRoVGltZSA9IHRoaXMuZm9ybWF0UGF0dGVybi5zdWJzdHJpbmcoMCwgdGltZVN0YXJ0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZvcm1hdFBhdHRlcm5ORyArPSAodGhpcy5ob3VyRm9ybWF0ID09PSAnMTInKSA/XG4gICAgICAgICAgICAgICAgYCAke0RhdGVBbmRUaW1lQ29tcG9uZW50Lk5nVGltZTEyfWAgOiBgICR7RGF0ZUFuZFRpbWVDb21wb25lbnQuTmdUaW1lMjR9YDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5pMThuID0ge1xuICAgICAgICAgICAgZmlyc3REYXlPZldlZWs6IDAsXG4gICAgICAgICAgICBkYXlOYW1lczogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsXG4gICAgICAgICAgICAgICAgJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICAgICAgICAgICAgbW9udGhOYW1lczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JyxcbiAgICAgICAgICAgICAgICAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLFxuICAgICAgICAgICAgICAgICdOb3YnLCAnRGVjJ11cbiAgICAgICAgfTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiBkYXRlcyBjaGFuZ2VzLiBIZXJlIHdlIHVwZGF0ZSAgdGhpcy52YWx1ZSAtID4gZGF0ZSBhbmQgYWxzbyB1cGRhdGUgdmFsdWUgaW5zaWRlXG4gICAgICogZm9ybUNvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRGF0ZUNoYW5nZShldmVudDogYW55KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZXZlbnQpKSB7XG4gICAgICAgICAgICAvLyB0aHJvdyBzb21lIGVycm9yID9cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBpc0RhdGUoZXZlbnQpID8gZXZlbnQgOiBuZXcgRGF0ZShldmVudCk7XG5cbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnZhbHVlLCB7b25seVNlbGY6IGZhbHNlLCBlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19