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
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject, Input,
  NgZone, OnChanges,
  Optional,
  Renderer2,
  Self, SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_INPUT_VALUE_ACCESSOR,
  MatFormFieldControl,
  MatInput
} from '@angular/material';
import {Platform} from '@angular/cdk/platform';
import {AutofillMonitor} from '@angular/cdk/text-field';


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
export class StringField extends MatInput implements ControlValueAccessor {
  /**
   * Reference to internal INPUT element having MatInput directive so we can set this reference
   * back to the MatInput
   */
  @ViewChild('inputField')
  protected inputControl: ElementRef;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    private _cd: ChangeDetectorRef,
    @Optional() @Self() public _ngControl: NgControl,
    @Optional() protected parentForm: NgForm,
    @Optional() protected parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) private inputValueAccessor: any,
    private autofillMonitor: AutofillMonitor,
    private _renderer: Renderer2,
    ngZone: NgZone) {

    super(_elementRef, _platform, _ngControl, parentForm, parentFormGroup,
      _defaultErrorStateMatcher, inputValueAccessor, autofillMonitor, ngZone);

    if (this._ngControl != null) {
      this._ngControl.valueAccessor = this;
    }
  }


  ngOnInit(): void {
    this._elementRef = this.inputControl;
    super.ngOnInit();
  }


  ngDoCheck(): void {
    super.ngDoCheck();
    this._cd.markForCheck();
  }


  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
  }
}

