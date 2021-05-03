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
import {Subject} from 'rxjs';


let randomId = 0;

/**
 * Simple component rendering values in the read only mode.
 *
 *
 */
@Component({
  selector: 'fdp-string',
  template: `

    <ng-template [ngIf]="!useDefaultStyling" [ngIfElse]="WithStyles">
      <span [innerHTML]="value">
      </span>
    </ng-template>

    <ng-template #WithStyles>
      <span *ngIf="useDefaultStyling" [id]="id"
            class="fd-input fd-form-item fd-row__form-item"
            style="background-color: transparent; margin-bottom: 0; padding: 0 10px"

            [innerHTML]="value"

      >
    </span></ng-template>



  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent {
  protected defaultId: string = `fdp-string-${randomId++}`;
  private _value: string = '';

  @Input()
  id: string = this.defaultId;

  @Input()
  useDefaultStyling: boolean = false;

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

}


