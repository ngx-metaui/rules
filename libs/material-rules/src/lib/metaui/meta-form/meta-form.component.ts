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
import {Component} from '@angular/core';
import {Environment} from '@ngx-metaui/rules';


/**
 *  Since MetaUI is using stack to PUSH/POP properties and it relies on certain order to get
 *  consistent behavior we need to create these views. For more info please see
 *  MetaContextComponent
 *
 *
 */
@Component({
  selector: 'm-md-form',
  template: `
    <m-context #cnx scopeKey="class">
      <div class="form-container">
        <mat-card *ngIf="cnx.hasObject" class="form-card">
          <mat-card-content>
            <m-form-group></m-form-group>
          </mat-card-content>
        </mat-card>
      </div>
    </m-context>
  `,
  styles: [
      `
      .form-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .form-card {
        padding: 15px;
        width: 100%;
        max-width: 1000px;
      }
    `]
})
export class MetaForm {


  constructor(public env: Environment) {
  }

}
