/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import { EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * Lightweight and configurable Date and Time component based on the primeng. This
 * component combines both date picker as well as time picker
 *
 *
 *  ### Example
 *  ```
 *
 *  @Component({
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
 *  @Component({
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
export declare const DATETIME_CONTROL_VALUE_ACCESSOR: any;
export declare class DateAndTimeComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    static readonly NgTime12: string;
    static readonly NgTime24: string;
    /**
     * Default value used to set the date and time picker
     */
    value: Date;
    /**
     * Default date format pattern used if none is passed
     *
     */
    formatPattern: string;
    /**
     * Special workaround as formatters in the primeNG and angular are different so until its
     * fixed we need to keep this extra pattern.
     */
    formatPatternNG: string;
    /**
     * Shows and hides navigation bar with year and months selections
     */
    showNavigation: boolean;
    /**
     * Year range displayed for the drop down.
     */
    yearRange: string;
    /**
     * Shows and hides navigation bar with year and months selections
     */
    showIcon: boolean;
    /**
     * Whether to show timepicker
     */
    showTime: boolean;
    /**
     * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
     * true
     */
    showDate: boolean;
    /**
     *
     * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
     * it shows the AM, PM
     *
     */
    hourFormat: string;
    /**
     * Triggers event when specific date is clicked inside DatePicker
     *
     */
    onChange: EventEmitter<Date>;
    /**
     * Set the date to highlight on first opening if the field is blank.
     *
     */
    defaultDate: Date;
    /**
     * In case of Datetime we need to make sure the DateAndTime formatName is not propagated
     * to Date field.
     */
    formatNameWithTime: string;
    i18n: any;
    timePlaceHolder: string;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Need to refactor this as this really get complicated trying to cover usecase with time
     * and date and every format we have. We should probably have separate patterns for
     * dates only and date + time
     */
    private initTranslations();
    /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     */
    onDateChange(event: any): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
