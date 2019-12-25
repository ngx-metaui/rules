/**
 * @license
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
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
import {ChangeDetectorRef, Component, Host, Inject, Input, LOCALE_ID} from '@angular/core';
import {Environment, MetaBaseComponent, MetaContextComponent} from '@ngx-metaui/rules';


@Component({
  selector: 'm-object-detail',
  templateUrl: 'object-detail.component.html',
  styleUrls: ['object-detail.component.scss']
})
export class MetaObjectDetailComponent extends MetaBaseComponent {

  /**
   * Object detail to be rendered
   */
  @Input()
  object: any;

  /**s
   * For the detail view we always use read only content
   */
  @Input()
  operation: string = 'view';

  /**
   * Default layout
   *
   */
  @Input()
  layout: string = 'Inspect';

  noLabelLayout: boolean = true;


  constructor(@Host() protected _metaContext: MetaContextComponent,
              private cd: ChangeDetectorRef,
              @Inject(LOCALE_ID) public locale: string,
              public env: Environment) {
    super(env, _metaContext);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // for the demo.

  }


}
