/**
 * @license
 * F. Kolar
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
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Inject,
  Input,
  Optional,
  Renderer2,
  Self,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {NgControl, NgForm} from '@angular/forms';
import {
  CalendarType,
  DatePickerComponent as FdDatePicker,
  FdDate,
  FdRangeDate
} from '@fundamental-ngx/core';
import {FocusMonitor} from '@angular/cdk/a11y';
import {DOCUMENT} from '@angular/common';
import {FormField, BaseInput, FormFieldControl} from '@fundamental-ngx/platform';


/**
 * Basic implementation of the core DatePicker. Probably will have to re-implement it from the
 * scratch to give it proper format.
 *
 * It needs to different locale not ony translating some months names but also support different
 * formatting patterns.
 *
 *
 */
@Component({
  selector: 'fdp-date-picker',
  templateUrl: 'date-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
      `
    `
  ],
  providers: [
    {provide: FormFieldControl, useExisting: DatePickerComponent, multi: true}
  ]
})
export class DatePickerComponent extends BaseInput {

  @Input()
  type: CalendarType = 'single';

  @Input()
  get value(): any {
    return super.getValue();
  }

  set value(value: any) {
    super.setValue(value);
  }

  @ViewChild('dp', {static: true, read: FdDatePicker})
  protected _calendarRef: FdDatePicker;

  @ViewChild('dp', {static: true, read: ElementRef})
  protected _elementRef: ElementRef;


  private dateInput: any;

  private _fdDate: FdDate | FdRangeDate;

  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Inject(DOCUMENT) private _document: any,
              private _renderer: Renderer2,
              private _focusMonitor: FocusMonitor,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm,
              @Optional() @SkipSelf() @Host() formField: FormField,
              @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>) {

    super(_cd, ngControl, ngForm, formField, formControl);
  }


  get fdDate(): FdDate | FdRangeDate {
    return this._fdDate;
  }

  set fdDate(value: FdDate | FdRangeDate) {
    this._fdDate = value;
    if (value instanceof FdDate) {
      this.value = value.toDate();
    } else {
      this.value.start = (<FdRangeDate>value).start.toDate();
      this.value.end = (<FdRangeDate>value).end.toDate();
    }
  }

  ngOnInit(): void {
    if (!this.placeholder) {
      this.placeholder = 'mm/dd/yyyy';
    }
  }


  ngAfterViewInit(): void {
    if (!this._elementRef) {
      return;
    }
    if (this._elementRef && this.id) {
      this._renderer.setAttribute(this.input(), 'id', this.id);
      this._renderer.setAttribute(this.input(), 'name', this.name);
    }

    this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
      this._onFocusChanged(!this.focused);
    });
    this.focused = this._document && this.input() === document.activeElement;
    super.ngAfterViewInit();
  }




  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }


  writeValue(value: any): void {
    if (this.editable) {
      this.updateFdDate(value);
    }
    super.writeValue(value);
  }

  onContainerClick(event: MouseEvent): void {
    if (this._elementRef && !this.focused) {
      this.input().focus();
    }
  }

  private updateFdDate(value: any) {
    if (!this._calendarRef) {
      return;
    }
    if (value instanceof Date) {
      this._fdDate = this.date2FdDate(value);

      // hacky hack as 0.12.version of date picker does not really work that well
      // this._calendarRef.inputFieldDate = this._calendarRef.dateAdapter.format(
      //   <FdDate>this.fdDate);
      this._calendarRef.writeValue(this.fdDate);
    } else if (value && value.start instanceof Date && value.end instanceof Date) {
      this._fdDate = this.date2FdRangeDate(value);
      this._calendarRef.writeValue(this.fdDate);
    } else if (value) {
      throw new Error('fdp-date-picker accepts only valid Date object.');
    }

    // this should not be here but FD date picker is broken so need to trigger CD
    this._cd.detectChanges();
  }

  private date2FdDate(d: Date): FdDate {
    return new FdDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  private date2FdRangeDate(r: any): FdRangeDate {
    const range: FdRangeDate = {
      start: this.date2FdDate(<Date>r.start),
      end: this.date2FdDate(<Date>r.end)
    };
    return range;
  }

  private input(): HTMLInputElement {
    return this._elementRef.nativeElement.querySelector('.fd-input');
  }

  protected updateErrorState() {
    super.updateErrorState();
    if (this._calendarRef) {
      this._calendarRef.isInvalidDateInput = this._calendarRef && (this.status === 'error');
    }
  }
}

