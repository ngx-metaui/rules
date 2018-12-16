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
  Component,
  ElementRef,
  forwardRef,
  Inject,
  NgZone,
  Optional,
  Renderer2,
  Self,
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
 *  As of now there is no api to programmatically work with directives therefore we need to wrap
 *  MatInput and expose it as a component with a minimum effort.
 *
 *  This is only used for types such as text, number and other types that are listed on material 2
 *  website.
 *
 *  Its not for date, its not for select, as we need to create another set of components for this.
 *  e.g.: In enterprise where productivity is a key element you cant really use 3 different
 *  components to create a date picker all this should be low level and hidden. You can
 *  still design a component to have all the customization power without forcing complexity of
 *  component internals.
 *
 *  The reason for this is to support programatic UI assembly and you can do it currently with
 *  components.
 *
 *  Todo:  add unit tests just to check any regression. This should not  have any logic in it.
 *
 */


@Component({
  selector: 'md-text-area',
  templateUrl: 'text-area.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => TextArea),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextArea extends MatInput implements ControlValueAccessor {


  /**
   * Reference to internal INPUT element having MatInput directive so we can set this reference
   * back to the MatInput
   */
  @ViewChild('inputField')
  protected inputControl: ElementRef;

  /** @internal */
  private _composing = false;
  private _compositionMode = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  /** Whether the user is creating a composition string (IME events). */

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
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
    this.reInit();

    super.ngOnInit();
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
  }


  onInput(value: any): void {
    if (!this._compositionMode || (this._compositionMode && !this._composing)) {
      this.onChange(value);
    }
  }

  private reInit(): void {
    this._elementRef = this.inputControl;
    this._isNativeSelect = this.nativeElement.nodeName.toLowerCase() === 'select';

    if (this._isNativeSelect) {
      this.controlType = (this.nativeElement as HTMLSelectElement).multiple
        ? 'mat-native-select-multiple' : 'mat-native-select';
    }
    this._compositionMode = !this._platform.ANDROID;
  }


  _focusChanged(isFocused: boolean): void {
    super._focusChanged(isFocused);

    // Since we have custom ValueAccessor
    this.onTouched();

  }

  /** @internal */
  _compositionStart(): void {
    this._composing = true;
  }

  /** @internal */
  _compositionEnd(value: any): void {
    this._composing = false;
    this.onChange(value);
  }

  /** @internal */
  get nativeElement(): any {
    return this.inputControl.nativeElement;
  }

}

