/**
 * @license
 * Copyright F. Kolar
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
import {Component} from '@angular/core';


/**
 *  Since MetaUI is using stack to PUSH/POP properties and it relies on certain order to get
 *  consistent behavior we need to create these views otherwise having all under content
 *  does not work. For more info please see MetaContextComponent
 *
 *
 */
@Component({
  selector: 'm-fdp-form',
  template: `
      <m-context #cnx scopeKey="class">
          <m-form-group></m-form-group>
      </m-context>
  `
})
export class MetaForm {


  constructor() {
  }

}
