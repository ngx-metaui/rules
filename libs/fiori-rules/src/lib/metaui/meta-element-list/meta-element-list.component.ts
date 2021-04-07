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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {Component} from '@angular/core';
import {Context, MetaContextComponent, MetaLayout} from '@ngx-metaui/rules';

/**
 * MetaElementList is implementation of Stack Layout where the content is rendered as list (stacked)
 * You do not use this layout directly as it is instantiated dynamically using MetaIncludeComponent.
 *
 * For more detail please checkout WidgetRules.oss the part bellow where create new trait
 * that can be applied to any layout.
 *
 * ```
 *
 * layout {
 *
 *   @trait=Stack { visible:true; component:MetaElementListComponent }
 *
 * }
 *
 * ```
 *
 * Actual usage could be :
 *
 *
 * ```
 *  layout=Inspect2#Stack {
 *       @layout=First#Form {
 *           elementClass:"my-form-wrapper";
 *       }
 *       @layout=Second#Form { zonePath:Second; }
 *   }
 *
 *
 *
 *    class=User {
 *       zNone => *;
 *       zLeft => firstName => lastName => age => department;
 *       Second.zLeft => email;
 *
 *   }
 *
 * ```
 *
 */
@Component({
  templateUrl: 'meta-element-list.component.html'
})
export class MetaElementListComponent extends MetaLayout {

  get metaContext(): MetaContextComponent {
    return this._mc;
  }

  constructor(protected _mc: MetaContextComponent) {
    super();
  }


  /**
   * todo: better turn this into Pure Pipe ?
   *
   */
  classString(name: string): string {
    const lContext: Context = this.contextMap.get(name);
    return (lContext) ? lContext.propertyForKey('elementClass') : null;
  }
}
