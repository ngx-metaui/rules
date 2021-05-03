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


let randomId = 0;

/**
 * Simple component rendering values in the read only mode.
 *
 *
 */
@Component({
  selector: 'm-object-marker',
  template: `

    <span role="" fd-object-marker [glyph]="glyph"
          [label]="value">
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectMarkerComponent {
  protected defaultId: string = `fdp-string-${randomId++}`;

  @Input()
  value: string = '';

  @Input()
  id: string = this.defaultId;

  @Input()
  glyph: string = 'request';


}


