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
import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {distinctUntilChanged} from 'rxjs/operators';
import {isBlank, isDate} from '../../core/utils/lang';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


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


export const DATETIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateAndTimeComponent),
  multi: true
};

@Component({
  selector: 'aw-date-time',
  templateUrl: 'date-and-time.component.html',
  styleUrls: ['date-and-time.component.scss'],
  providers: [
    DATETIME_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => DateAndTimeComponent)}
  ]

})
export class DateAndTimeComponent extends BaseFormComponent {

  static readonly NgTime12: string = 'hh:mm a';
  static readonly NgTime24: string = 'HH.mm a';


  /**
   * Default value used to set the date and time picker
   */
  @Input()
  value: Date;

  /**
   * Default date format pattern used if none is passed
   *
   */
  @Input()
  formatPattern: string = 'mm/dd/yy';


  /**
   * Special workaround as formatters in the primeNG and angular are different so until its
   * fixed we need to keep this extra pattern.
   */
  @Input()
  formatPatternNG: string = 'MM/dd/yy';


  /**
   * Shows and hides navigation bar with year and months selections
   */
  @Input()
  showNavigation: boolean = false;


  /**
   * Year range displayed for the drop down.
   */
  @Input()
  yearRange: string;

  /**
   * Shows and hides navigation bar with year and months selections
   */
  @Input()
  showIcon: boolean = true;

  /**
   * Whether to show timepicker
   */
  @Input()
  showTime: boolean = false;


  /**
   * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
   * true
   */
  @Input()
  showDate: boolean = true;


  /**
   *
   * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
   * it shows the AM, PM
   *
   */
  @Input()
  hourFormat: string = '24';

  /**
   * Triggers event when specific date is clicked inside DatePicker
   *
   */
  @Output()
  onChange: EventEmitter<Date> = new EventEmitter<Date>();

  /**
   * Set the date to highlight on first opening if the field is blank.
   *
   */
  defaultDate: Date = new Date();

  /**
   * In case of Datetime we need to make sure the DateAndTime formatName is not propagated
   * to Date field.
   */
  formatNameWithTime: string;


  i18n: any;
  timePlaceHolder: string = 'hh:ss';


  constructor(public env: Environment,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }

  ngOnInit() {

    super.ngOnInit();
    super.registerFormControl(this.value);

    // default to dateTime pattern which is defined in resource files
    if (this.hourFormat !== '12' && this.hourFormat !== '24') {
      this.hourFormat = '24';
    }

    this.timePlaceHolder = (this.hourFormat === '12') ?
      ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;

    this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((val: Date) => {
      this.value = val;
      this.onModelChanged(this.value);
    });

    this.initTranslations();

  }


  /**
   * Need to refactor this as this really get complicated trying to cover usecase with time
   * and date and every format we have. We should probably have separate patterns for
   * dates only and date + time
   */
  private initTranslations() {

    this.formatNameWithTime = this.formatPattern;
    if (!this.showDate) {
      this.formatPatternNG = this.formatPattern += (this.hourFormat === '12') ?
        ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;

    }

    if (this.showTime) {
      const timeStarts = this.formatPattern.indexOf('h');
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
   */
  onDateChange(event: any): void {

    if (isBlank(event)) {
      // throw some error ?
      return;
    }

    this.value = isDate(event) ? event : new Date(event);

    this.formControl.setValue(this.value, {onlySelf: false, emitEvent: true});
    this.onModelChanged(this.value);
    this.onChange.emit(this.value);
  }

  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
      this.formControl.setValue(value);
    }

  }
}
