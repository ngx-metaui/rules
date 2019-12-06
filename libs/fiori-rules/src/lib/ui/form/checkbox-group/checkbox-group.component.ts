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
  selector: 'fdp-checkbox-group',
  templateUrl: 'checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: FormFieldControl, useExisting: CheckboxGroupComponent, multi: true}
  ]
})
export class CheckboxGroupComponent extends BaseInput {

  @Input()
  get isInline(): boolean {
    return this._isInline;
  }

  set isInline(value: boolean) {
    this._isInline = this.boolProperty(value);
  }

  @Input()
  list: Array<SelectItem | string>;


  @Output()
  readonly change: EventEmitter<SelectItem | string> = new EventEmitter<SelectItem | string>();

  protected _isInline: boolean = false;

  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm) {


    super(_cd, ngControl, ngForm);
  }


}

