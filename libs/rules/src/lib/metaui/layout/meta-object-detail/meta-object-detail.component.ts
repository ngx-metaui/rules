/**
 * @license
 * Copyright 2017 SAP Ariba
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
import {Component, Input} from '@angular/core';
import {isBlank, isStringMap} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {BaseComponent} from '../../../components/core/base.component';


/**
 * Just like MetaContentPage this components renders meta context details but embedded as some
 * inline component. Not a page with page level buttons
 *
 *
 * Todo: We dont really need this component we we in the future extends MetaIncludeComponent to
 * support awcontentElement:
 *
 * ```
 *  {
 *      component:MetaContextComponent;
 *      bindings: {
 *          object:$value;
 *          layout:Inspect;
 *          operation:view;
 *          awcontentElement:MetaIncludeComponnetDirective;
 *      }
 *
 *  }
 *
 *  ```
 *
 *  This would instantiate right meta context just like this class.
 */
@Component({
  selector: 'm-content-detail',
  templateUrl: 'meta-object-detail.component.html',
  styleUrls: ['meta-object-detail.component.scss']
})
export class MetaObjectDetailComponent extends BaseComponent {

  /**
   * Object detail to be rendered
   */
  @Input()
  object: any;

  /**
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

  /**
   * Rendered object detail can have a section label
   */
  @Input()
  label: string;

  constructor(public env: Environment) {
    super(env);
  }

  ngOnInit() {
    if (isBlank(this.object) || !isStringMap(this.object)) {
      throw new Error('Cannot render primitive values as object details!');
    }

  }


}
