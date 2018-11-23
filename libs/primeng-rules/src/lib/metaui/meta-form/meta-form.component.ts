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
import {Component} from '@angular/core';
import {Environment} from '@ngx-metaui/rules';


/**
 * This is just a wrapper component around meta-form-table as we need every single context push to
 * happen before the child content start to render.
 *
 * In this case I would like to wrap wrap my content with m-context in the way:
 *
 *  <m-context scopeKey="class">
 *        <!-- lets process one zone now and four we can deal later-->
 *        <ng-template [ngIf]="isFiveZoneLayout">
 *              <aw-form-table [isEditable]="isEditable" [labelsOnTop]="labelsOnTop"
 * (onSubmit)="onSaveAction($event)">
 *                  <ng-template ngFor let-curentField [ngForOf]="zLeft()">
 *                      <m-context [field]="curentField">
 *                           <m-form-row [field]="curentField"></m-form-row>
 *                      </m-context>
 *                  </ng-template>
 *          </aw-form-table>
 *        </ng-template>
 *  </m-context>
 *
 *
 *
 */
@Component({
  selector: 'm-form',
  templateUrl: 'meta-form.component.html'

})
export class MetaFormComponent {


  constructor(private environment: Environment) {

  }

}
