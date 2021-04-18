/**
 *
 * @license
 * F. KOlar
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
 *
 */
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {ContentDensity, FormField, FormFieldControl, Status} from '@fundamental-ngx/platform';


let randomId = 0;

/**
 * Simple component rendering values in the read only mode.
 *
 *
 */
@Component({
  selector: 'fdp-string',
  template: `
    <span [id]="id" class="fd-input fd-form-item fd-row__form-item"
          style="margin-bottom: 0; padding: 0 10px"
        >
      {{value}}
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent implements FormFieldControl<any> {
  protected defaultId: string = `fdp-string-${randomId++}`;

  private _value: string = '';

  @Input()
  id: string = this.defaultId;

  @Input()
  set value(value: any) {
    this._value = value;
  }

  get value(): any {
    return this.sanitizer.bypassSecurityTrustHtml(this._value);
  }

  readonly _stateChanges: Subject<any> = new Subject<any>();

  constructor(private sanitizer: DomSanitizer) {
  }

  contentDensity: ContentDensity;
  readonly disabled: boolean;
  editable: boolean;
  readonly focused: boolean;

  readonly ngControl: NgControl | null;
  placeholder: string;
  required: boolean;
  readonly status: Status;
  readonly stateChanges: Subject<any> = new Subject<any>();
  readonly formField: FormField | null = null;


  focus(event?: MouseEvent): void {
  }

  onContainerClick(event: MouseEvent): void {
  }

}


