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
import {Component, DoCheck} from '@angular/core';
import {isPresent, Environment} from '@ngx-metaui/rules';

@Component({
    templateUrl: 'g-chooser-demo.component.html',
    styleUrls: ['g-chooser-demo.component.scss']
})
export class GenericChooserDemoComponent implements DoCheck
{

    list: string[] = ['Yesterday', 'Monday', 'Tuesday', 'BMW R1200 GS'];
    selection1: any;
    selection2: any;
    selection3: any;
    selection4: any = ['Yesterday'];
    selection5: any;
    selection5Res: any;


    constructor(public env: Environment)
    {
    }

    ngDoCheck(): void
    {
        if (isPresent(this.selection5)) {
            let selections: any[] = this.selection5;
            this.selection5Res = selections.join(',');
        }

    }
}
