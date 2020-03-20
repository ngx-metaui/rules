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
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Subject} from 'rxjs';
import {DomUtilsService} from '@ngx-metaui/rules';


/**
 *
 * We need to have one single component with Inputs/Outputs. its hard to programmatically
 * instantiate a Date Picker when you need to use 3 different components to use.
 *
 * Hopefully we will be able to remove it soon.
 *
 */
@Component({
  selector: 'md-datepicker',
  templateUrl: 'date-picker.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => DatePicker),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DatePicker implements ControlValueAccessor, MatFormFieldControl<any>, AfterViewInit,
  DoCheck {

  @Input()
  disabled: boolean = false;
  @Input()
  inputDisabled: boolean = false;
  @Input()
  id: string;
  @Input()
  readonly: boolean = false;
  /**
   * We need to use this component for both to display readonly value as well as
   * editable value. For readonly we need to hide date picker toggle
   */
  @Input()
  editable: boolean = true;
  /**
   * Please see MatCheckbox
   */
  @Input()
  value: Date;
  @Input()
  required: boolean = false;
  @Input()
  placeholder: string;
  /** Emits when a `change` event is fired on this `<input>`. */
  @Output()
  readonly dateChange: EventEmitter<MatDatepickerInputEvent<Date>> =
    new EventEmitter<MatDatepickerInputEvent<Date>>();
  /** Emits when an `input` event is fired on this `<input>`. */
  @Output()
  readonly dateInput: EventEmitter<MatDatepickerInputEvent<Date>> =
    new EventEmitter<MatDatepickerInputEvent<Date>>();
  /**
   * Reference to internal Material Inputfield
   */
  @ViewChild(MatInput, {static: true})
  protected input: MatInput;
  /**
   * Reference to internal Material Inputfield
   */
  @ViewChild(MatDatepicker, {static: true})
  protected datePicker: MatDatepicker<Date>;
  private suffixElem: any;
  private flexFieldElem: any;
  private viewInit = false;

  constructor(@Optional() @Self() public ngControl: NgControl,
              private elementRef: ElementRef,
              private cd: ChangeDetectorRef,
              private renderer: Renderer2,
              @Optional() @Inject(forwardRef(() => MatFormField))
              private formField: MatFormField,
              private domUtils: DomUtilsService) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Required by MatFormFieldControl but not really used
   */
  _stateChanges = new Subject<void>();

  get stateChanges(): Subject<void> {
    if (this.input) {
      return this.input.stateChanges;
    }
    return this._stateChanges;
  }

  get shouldLabelFloat(): boolean {
    if (this.input) {
      return this.input.shouldLabelFloat;
    }

    return true;
  }

  get controlType(): string {
    if (this.input) {
      return this.input.controlType;
    }
    return 'mat-input';
  }

  get empty(): boolean {
    if (this.input) {
      return this.input.empty && !this.value;
    }
    return !this.value;
  }

  get errorState(): boolean {
    if (this.input) {
      return this.input.errorState;
    }
    return false;
  }

  get focused(): boolean {
    if (this.input) {
      return this.input.focused;
    }
    return false;
  }

  get autofilled(): boolean {
    if (this.input) {
      return this.input.autofilled;
    }
    return false;
  }

  /**
   *
   * Methods used by ControlValueAccessor
   */
  onChange = (_: any) => {};

  onTouched = () => {};

  ngDoCheck(): void {
    const isFirstTime = !this.suffixElem && this.viewInit && this.editable;

    if (isFirstTime || !this.hasToggleInSuffix()) {
      this.flexFieldElem = this.domUtils.closest(this.elementRef.nativeElement,
        '.mat-form-field-flex');
      const toggleElem = this.flexFieldElem.querySelector('mat-datepicker-toggle');
      if (!toggleElem) {
        return;
      }
      this.suffixElem = this.flexFieldElem.querySelector('.mat-form-field-suffix');
      const infixDiv = this.renderer.createElement('div');
      this.renderer.addClass(infixDiv, 'mat-form-field-suffix');
      this.renderer.appendChild(this.flexFieldElem, infixDiv);

      const suffix = this.flexFieldElem.querySelector('.mat-form-field-suffix');
      suffix.appendChild(toggleElem);
    }
  }

  /**
   * This is such hack as due to the FormField restriction where I cannot have really any MatSuffix
   * the way I need it to have it. It requires that MatSuffix is direct child of FormField and it
   * cannot be really part of any other component. User is required to assemble DatePicker from 3
   * different parts every time.
   */
  ngAfterViewInit(): void {
    if (this.formField) {
      this.viewInit = true;
    }

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.input) {
      this.input.disabled = isDisabled;

      this.cd.markForCheck();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);

    this.cd.markForCheck();
  }

  onContainerClick(event: MouseEvent): void {
    if (this.input) {
      this.input.onContainerClick();
    }
  }

  setDescribedByIds(ids: string[]): void {
    if (this.input) {
      return this.input.setDescribedByIds(ids);
    }
  }

  _onChange(event: MatDatepickerInputEvent<Date>): void {
    this.onChange(event.value);
    this.onTouched();

    this.dateChange.emit(event);
  }


  _onBlur(event: any): void {
    this.onTouched();

    this.cd.markForCheck();
  }


  /**
   * Need to use  ngModelChange as DatePicker emits all the other events after ngModelChange
   * and this already generate ExpressionChangedAfterItHasBeenCheckedError on isEmpty getter
   *
   * As you can see _cvaOnChange is run first and isEmpty is called and then all the other
   * Outputs are emitted
   *
   *    this._value = date;
   *    this._cvaOnChange(date);
   *    this._valueChange.emit(date);
   *    this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
   *
   */
  _ngModelChange(date: any): void {
    if (!date) {
      this.cd.detectChanges();
    }
  }

  _onInput(event: MatDatepickerInputEvent<Date>): void {
    this.onChange(event.value);
    this.dateInput.emit(event);
  }

  private hasToggleInSuffix(): boolean {
    return this.flexFieldElem &&
      this.flexFieldElem.querySelector('.mat-form-field-suffix .mat-datepicker-toggle');
  }

}

