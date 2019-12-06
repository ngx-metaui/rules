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
  EventEmitter,
  Input,
  Optional,
  Output,
  Self
} from '@angular/core';
import {FormFieldControl} from '../form-control';
import {NgControl, NgForm} from '@angular/forms';
import {BaseInput} from '../base.input';
import {SelectItem} from '../data-model';


@Component({
  selector: 'fdp-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: FormFieldControl, useExisting: CheckboxComponent, multi: true}
  ]
})
export class CheckboxComponent extends BaseInput {

  @Input()
  get isInline(): boolean {
    return this._isInline;
  }

  set isInline(value: boolean) {
    this._isInline = this.boolProperty(value);
  }

  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  @Input()
  label: string;

  @Input()
  get isBinary(): boolean {
    return this._isBinary;
  }

  set isBinary(value: boolean) {
    this._isBinary = value;
  }

  @Output()
  readonly change: EventEmitter<SelectItem | string> = new EventEmitter<SelectItem | string>();

  protected _isBinary: boolean = false;
  protected _isInline: boolean = false;
  checked: boolean;

  multiSelectModel: any;

  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm) {


    super(_cd, ngControl, ngForm);
  }


  onCheckClick(event: any) {
    event.stopPropagation();

    if (this.disabled || this.readonly) {
      return;
    }
    this.checked = event.target.checked;
    if (this._isBinary) {
      this.onChange(this.checked);
    } else {
      if (this.checked) {
        if (this.multiSelectModel) {
          this.multiSelectModel = [...this.multiSelectModel, this.value];
        } else {
          this.multiSelectModel = [this.value];
        }
      } else {
        this.multiSelectModel = this.multiSelectModel.filter(val => val !== this.value);
      }
      this.onChange(this.multiSelectModel);
    }
    this.stateChanges.next('onCheckClick');
    this.change.emit(this.value);
    this._cd.markForCheck();
  }

  onCheckChange(event: Event) {
    event.stopPropagation();
  }


  isChecked(): boolean {
    if (this.isBinary || typeof this.multiSelectModel === 'boolean') {
      this._isBinary = true;
      return this.multiSelectModel;
    } else {
      return this.multiSelectModel && this.multiSelectModel.indexOf(this.value) > -1;
    }
  }


  writeValue(val: any): void {
    console.log('write');
    this.multiSelectModel = val;
    this.checked = this.isChecked();
    if (this.isBinary) {
      this.onChange(this.checked);
    } else {
      this.onChange(this.multiSelectModel);
    }

    this.stateChanges.next('writeValue');
  }
}

