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
  forwardRef,
  Inject,
  Input,
  NgZone,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {Platform} from '@angular/cdk/platform';
import {AutofillMonitor} from '@angular/cdk/text-field';
import {Subject} from 'rxjs';


/**
 *  Read only version of InputField used when rendering field in non editable mode so we can achieve
 *  the same  behavior like for the input.
 *  MatFormField requires NGControl
 *
 */
@Component({
  selector: 'md-string-field',
  templateUrl: 'string.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => StringField),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringField implements MatFormFieldControl<any>, ControlValueAccessor {
  @Input()
  id: string;

  @Input()
  type: string = 'text';

  @Input()
  placeholder: string;

  @Input()
  readonly: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  disabled: boolean = false;

  private _errorState: boolean;


  @Input()
  value: string;

  /**
   * Reference to internal INPUT element having MatInput directive so we can set this reference
   * back to the MatInput
   */
  @ViewChild('inputField', {static: true})
  protected inputControl: ElementRef;


  readonly stateChanges = new Subject<void>();
  focused = false;
  autofilled = false;

  onChange = (_: any) => {};

  onTouched = () => {};

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    private _cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() protected parentForm: NgForm,
    @Optional() protected parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) private inputValueAccessor: any,
    private autofillMonitor: AutofillMonitor,
    private _renderer: Renderer2,
    ngZone: NgZone) {

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }


  /** @internal */
  get nativeElement(): any {
    return this.inputControl.nativeElement;
  }

  get empty(): boolean {
    return !this._elementRef.nativeElement.value;
  }


  get errorState(): boolean {
    return this._errorState;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get controlType(): string {
    return 'mat-input';
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }


  ngOnInit(): void {
  }


  registerOnChange(fn: (_: any) => void): void {
    if (this.type === 'number') {
      this.onChange = (value) => {
        fn(value === '' ? null : parseFloat(value));
      };
    } else {
      this.onChange = fn;
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.stateChanges.next();
  }


  _focusChanged(isFocused: boolean): void {
    // Since we have custom ValueAccessor
    this.focused = isFocused;
    this.onTouched();
    this.stateChanges.next();

  }
}

