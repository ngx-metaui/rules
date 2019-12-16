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


/**
 * Simple component rendering values in the read only mode.
 *
 *
 */
@Component({
  selector: 'fdp-string',
  templateUrl: './string.component.html',
  styleUrls: ['string.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent {
  private _value: string = '';

  @Input()
  set value(value: any) {
    this._value = value;
  }

  get value(): any {
    return this.sanitizer.bypassSecurityTrustHtml(this._value);
  }

  constructor(private sanitizer: DomSanitizer) {
  }

}


