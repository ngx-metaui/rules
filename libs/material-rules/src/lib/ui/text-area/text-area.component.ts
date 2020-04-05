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
  DoCheck,
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
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {Platform} from '@angular/cdk/platform';
import {AutofillMonitor} from '@angular/cdk/text-field';
import {Subject} from 'rxjs';


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
export class TextArea implements MatFormFieldControl<any>, ControlValueAccessor, DoCheck {

  @Input()
  id: string;

  @Input()
  autoSizeEnabled = true;

  @Input()
  minRows = 1;

  @Input()
  maxRows = -1;


  @Input()
  placeholder: string;

  @Input()
  readonly: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;

    this._cd.markForCheck();
    this.stateChanges.next();
  }

  private _errorState: boolean;

  /**
   * Reference to internal INPUT element having MatInput directive so we can set this reference
   * back to the MatInput
   */
  @ViewChild('inputField', {static: true})
  protected inputControl: ElementRef;

  @Input()
  get value(): any {
    return this._value;
  }

  set value(newValue: any) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.onChange(newValue);
      this._cd.markForCheck();
      this.stateChanges.next();
    }
  }

  private _disabled = false;
  private _value: string;


  /** @internal */
  private _composing = false;
  private _compositionMode = false;


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

  get errorState(): boolean {
    return this._errorState;
  }

  get empty(): boolean {
    return !!this._elementRef.nativeElement.value;
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
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.nativeElement, 'disabled', isDisabled);
  }


  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
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

  _focusChanged(isFocused: boolean): void {
    this.focused = isFocused;
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

  private updateErrorState() {
    const oldState = this.errorState;
    const parent = this.parentForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = !!(control && control.invalid && (control.touched ||
      (parent && parent.submitted)));

    if (newState !== oldState) {
      this._errorState = newState;
      this.stateChanges.next();
    }
  }

}

