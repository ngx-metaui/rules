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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormFieldControl} from '../form-control';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';


const VALID_INPUT_TYPES = [
  'text',
  'number'
];

/**
 * Input field implementation to be compliant with our FormGroup/FormField design and also to
 * achieve certain this in Angular this component is re-using several ideas from MatDesign
 *
 */
@Component({
  selector: 'fdp-input',
  templateUrl: 'input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: FormFieldControl, useExisting: InputComponent, multi: true} ]
})
export class InputComponent implements FormFieldControl<any>, ControlValueAccessor, OnInit,
  OnChanges, DoCheck, AfterViewInit, OnDestroy {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Input()
  type: string = 'text';

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  @Input()
  readonly: boolean;

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

  }


  @Input()
  get value(): string  {
    return this._value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this.writeValue(value);
      this.stateChanges.next();
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
  readonly stateChanges: Subject<void> = new Subject<void>();

  protected _disabled: boolean;
  protected _value: string;
  protected _inErrorState: boolean;
  protected _prevNativeValue: any;


  // @formatter:off
  onChange = (_: any) => {};
  onTouched = () => {};
  // @formatter:on

  constructor(protected cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm,
              private _renderer: Renderer2) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

  }

  ngOnInit(): void {
    if (!this.type || VALID_INPUT_TYPES.indexOf(this.type) === -1) {
      throw new Error(`Input type ${this.type} is not supported`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next();
  }

  /**
   * Re-validate and emit event to parent container on every CD cycle as they are some errors
   * that we can't subscribe to.
   */
  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
    this._checkNativeValue();
  }

  ngAfterViewInit(): void {
    // if (this._elementRef) {
    //   this._elementRef.nativeElement.addEventListener('keydown', (evemt) => {
    //
    //   });
    // }
  }


  ngOnDestroy(): void {
    this.stateChanges.complete();
  }


  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    this.cd.markForCheck();
    this.stateChanges.next();
  }


  writeValue(value: any): void {
    this._value = value;
    this.cd.markForCheck();
    this.onChange(value);
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
      this.stateChanges.next();
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
      this.stateChanges.next();
    }
  }

  private _checkNativeValue() {
    if (this._elementRef) {
      const currentValue = this._elementRef.nativeElement.value;

      if (this._prevNativeValue !== currentValue) {
        this._prevNativeValue = currentValue;
        this.stateChanges.next();
      }
    }
  }
}

