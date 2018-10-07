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
 *
 *
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {Environment} from '../../../../../core/config/environment';
import {DomHandler} from 'primeng/primeng';
import {DTColumn2Component} from '../dt-column.component';


/**
 *
 * Column implementation for the SingleSelect where we show checkbox control
 *
 *
 */
@Component({
    selector: 'aw-dt-single-select-column',
    templateUrl: 'dt-single-select-column.component.html',
    styleUrls: ['dt-single-select-column.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DomHandler]

})
export class DTSingleSelectColumnComponent extends DTColumn2Component
{

    constructor(public env: Environment, public domHandler: DomHandler)
    {
        super(env, domHandler);

        // default width of the selection control
        this.width = '45px';
    }


}

