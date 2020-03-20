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
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatRadioChange, MatRadioGroup} from '@angular/material/radio';
import {Subject} from 'rxjs';
import {DomUtilsService} from '@ngx-metaui/rules';


/**
 *
 *  Pretty simple implementation of the Radiobutton group. The same as checkbox component that does
 *  not implement MatFormFieldControl therefore cannot be part of the form.
 *  Hopefully this is a temporary solution
 *
 *
 */
@Component({
  selector: 'md-radio-group',
  templateUrl: 'radio-group.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RadioGroup),
      multi: true
    }
  ],
  styles: [
      `
      .no-underline .mat-form-field-underline {
        display: none;
      }

      .md-radio-group-stack {
        display: inline-flex;
        flex-direction: column;
      }

      .md-radio-group-inline {
        display: inline-flex;
        flex-direction: row;
      }

      .md-radio-button {
        margin: 5px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})

export class RadioGroup implements ControlValueAccessor, MatFormFieldControl<any>, AfterViewInit,
  OnInit, DoCheck {

  /**
   * Reference to internal Material select component so communicate with it.
   */
  @ViewChild(MatRadioGroup, {static: true})
  radioGroup: MatRadioGroup;

  @Input()
  list: any;

  /**
   * In case class as model item this specifies the key for the display value.
   * Otherwise toString is used
   */
  @Input()
  displayKey: string;

  @Input()
  mode: 'stack' | 'inline' = 'stack';

  /**
   * Please see MatCheckbox
   */
  @Input()
  labelPosition: 'before' | 'after' = 'after';


  @Input()
  disabled: boolean = false;

  @Input()
  id: string;

  @Input()
  label: string;

  /**
   * Please see MatFormFieldControl
   */
  @Input()
  value: any;

  @Input()
  name: string;


  @Input()
  required: boolean;

  /**
   * When the radio is required show None value to let user know to select something
   */
  @Input()
  hasNoValue: boolean = false;

  @Input()
  noValueLabel: string = 'None';


  /**
   * Just broadcast MatRadioChange item selection event outside of this component as this could be
   * useful
   */
  @Output()
  readonly change: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>();

  constructor(@Optional() @Self() public ngControl: NgControl,
              private elementRef: ElementRef,
              private cd: ChangeDetectorRef,
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
    return this._stateChanges;
  }

  get shouldLabelFloat(): boolean {
    return true;
  }

  get controlType(): string {
    return 'mat-input';
  }

  get empty(): boolean {
    return false;
  }

  get errorState(): boolean {
    if (this.ngControl.control.invalid) {
      return true;
    }
    return false;
  }

  get focused(): boolean {
    return false;
  }

  get autofilled(): boolean {
    return false;
  }

  get placeholder(): string {
    return this.label;
  }

  /**
   *
   * Methods used by ControlValueAccessor
   */
  onChange = (_: any) => {};

  onTouched = () => {};

  ngOnInit(): void {
    if (!!this.required) {
      this.hasNoValue = true;
    }
  }

  ngAfterViewInit(): void {
    // if (this.radioGroup) {
    //   const ff = this.domUtils.closest(this.elementRef.nativeElement,
    //     '.mat-form-field-wrapper');
    //   if (ff && !this.errorState) {
    //     ff.classList.add('no-underline');
    //   }
    // }

    this.cd.markForCheck();
  }

  ngDoCheck(): void {
    this.updateFieldUnderline();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.radioGroup) {
      this.radioGroup.setDisabledState(isDisabled);
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onContainerClick(event: MouseEvent): void {
    // if (this.radioGroup) {
    //   this.radioGroup._onInputClick(event);
    // }
  }

  setDescribedByIds(ids: string[]): void {

  }


  _onChange(event: MatRadioChange): void {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();
    this.change.emit(event);

    this.cd.markForCheck();
    this.radioGroup._markRadiosForCheck();
  }

  private updateFieldUnderline(): void {
    if (this.radioGroup) {
      const ff = this.domUtils.closest(this.elementRef.nativeElement,
        '.mat-form-field-wrapper');


      if (this.errorState && ff) {
        ff.classList.remove('no-underline');
      } else if (ff) {
        ff.classList.add('no-underline');
      }
    }
  }

}

