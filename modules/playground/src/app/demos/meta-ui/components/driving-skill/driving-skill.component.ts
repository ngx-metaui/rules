/**
 *
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
 */
import {Component, OnInit, Input} from '@angular/core';
import {BaseComponent} from '@aribaui/components';
import {Environment, isBlank} from '@aribaui/core';


/**
 * Every single component that needs to be programatically rendered must be added to the
 * entryComponents[], as well as for time being untill we fix it needs to be visible to
 * IncludeComponent Logic see components.ts
 */
@Component({
    selector: 'app-driving-skill',
    template: `
    <span class="skill-ctrl">
        <i  [attr.class]="skillIcon"> </i>
    </span>
`,
    styles: [
        `
      .skill-ctrl {
          font-size: 22px;
          color: #3c763d;
      }
      .skill-ctrl .fa {
        font-family: FontAwesome;
      }
  `
    ]
})
export class DrivingSkillComponent extends BaseComponent implements OnInit
{
    @Input()
    value: any;

    skillIcon: string = 'fa fa-meh-o';


    constructor(protected environment: Environment)
    {
        super(environment);
    }

    ngOnInit()
    {
        super.ngOnInit();

        if (isBlank(this.value)) {
            return;
        }

        this.skillIcon = (this.value === 'Really Bad') ? 'fa  fa-frown-o' : (this.value === 'Good')
                ? 'fa  fa-meh-o' : 'fa fa-smile-o';
    }

}
