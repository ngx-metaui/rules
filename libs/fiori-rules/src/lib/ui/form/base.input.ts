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
  ChangeDetectorRef,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormFieldControl} from './form-control';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';


/**
 * All form components share the same information (value, name, placeholder,.. ) as well as
 * the same behavior given by ControlValueAccessor.
 *
 */
export abstract class BaseInput implements FormFieldControl<any>, ControlValueAccessor,
  OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    console.log('set placeholder');
  }

  private _placeholder: string;

  @Input()
  readonly: boolean;


  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next('disabled');
  }


  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this.writeValue(value);
    }
  }

  /**
   * Reference to internal Input element
   */
  @ViewChild('elemRef', {static: true})
  protected _elementRef: ElementRef;


  /**
   * See @FormFieldControl
   */
  focused: boolean = false;

  /**
   * See @FormFieldControl
   */
  readonly stateChanges: Subject<any> = new Subject<any>();

  protected _disabled: boolean;
  protected _value: string;
  protected _inErrorState: boolean;
  protected _destroyed = new Subject<void>();

  // @formatter:off
  onChange = (_: any) => {};
  onTouched = () => {};
  // @formatter:on

  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

  }

  abstract ngOnInit(): void;

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next(' ngOnChanges');
  }

  /**
   * Re-validate and emit event to parent container on every CD cycle as they are some errors
   * that we can't subscribe to.
   */
  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._cd.markForCheck();
    this.stateChanges.next('setDisabledState');
  }

  writeValue(value: any): void {
    this._value = value;
    this.onChange(value);
    this.stateChanges.next('writeValue');
  }

  get inErrorState(): boolean {
    return this._inErrorState;
  }


  /**
   *
   * Keeps track of element focus
   */
  _onFocusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this.stateChanges.next('_onFocusChanged');
    }
    this.onTouched();
  }

  /**
   * Handles even when we click on parent container which is the FormField Wrapping this
   * control
   */
  onContainerClick(event: MouseEvent): void {
    if (this._elementRef && !this.focused) {
      this._elementRef.nativeElement.focus(event);
    }
  }

  /**
   *  Need re-validates errors on every CD iteration to make sure we are also
   *  covering non-control errors, errors that happens outside of this control
   */
  private updateErrorState() {
    const oldState = this._inErrorState;
    const parent = this.ngForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = !!(control && control.invalid && (control.touched ||
      (parent && parent.submitted)));

    if (newState !== oldState) {
      this._inErrorState = newState;
      this.stateChanges.next('updateErrorState');
    }
  }
}

