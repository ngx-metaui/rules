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
  Component,
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
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {DomUtilsService} from '@ngx-metaui/rules';


/**
 *
 * This extra wrapper on top of existing component would not be necessary if existing checkbox
 * would implement MatFormFieldControl. There are allot of ticket for this. Not sure whey
 * this one was skipped.
 *
 * Hopefully we will be able to get rid of it soon.
 *
 *
 */


@Component({
  selector: 'md-checkbox',
  templateUrl: 'checkbox.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => Checkbox),
      multi: true
    }
  ],
  styles: [
      `
      .no-underline .mat-form-field-underline {
        display: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})

export class Checkbox implements ControlValueAccessor, MatFormFieldControl<any>, AfterViewInit,
  OnInit {

  /**
   * Please see MatCheckbox
   */
  @Input()
  labelPosition: 'before' | 'after' = 'after';
  @Input()
  disabled: boolean = false;
  @Input()
  id: string;
  /**
   * Please see MatCheckbox
   */
  @Input()
  value: string;
  @Input()
  required: boolean;
  /**
   * Please see MatCheckbox
   */
  @Input()
  checked: boolean = false;
  @Input()
  label: string;
  @Input()
  valueLabel: string;
  /**
   * Just broadcast MatSelect item selection event outside of this component as this could be
   * useful
   */
  @Output()
  readonly change: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();
  /**
   * Reference to internal Material select component so comunicate with it.
   */
  @ViewChild('matCheck', {static: true})
  protected checkbox: MatCheckbox;

  constructor(@Optional() @Self() public ngControl: NgControl,
              private elementRef: ElementRef,
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
  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkbox) {
      const ff = this.domUtils.closest(this.elementRef.nativeElement,
        '.mat-form-field-wrapper');
      if (ff) {
        ff.classList.add('no-underline');
      }
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
    if (this.checkbox) {
      this.checkbox.setDisabledState(isDisabled);
    }
  }

  writeValue(value: any): void {
    this.checked = !!value;
    this.onChange(value);
  }

  onContainerClick(event: MouseEvent): void {
    // if (this.checkbox) {
    //   this.checkbox._onInputClick(event);
    // }
  }

  setDescribedByIds(ids: string[]): void {

  }


  _onChange(event: MatCheckboxChange): void {
    this.onChange(event.checked);
    this.change.emit(event);
  }

}

