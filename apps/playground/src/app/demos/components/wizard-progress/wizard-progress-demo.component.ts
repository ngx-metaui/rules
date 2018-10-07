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
import {Component} from '@angular/core';
import { Step } from '@ngx-meta/rules';

@Component({
    templateUrl: './wizard-progress-demo.component.html',
    styleUrls: ['./wizard-progress-demo.component.scss']
})
export class WizardProgressDemoComponent
{

    steps: Array<Step> = [
        {
            current: false,
            complete: false,
            title: 'Step 1'
        },
        {
            current: false,
            complete: false,
            title: 'Step 2'
        },
        {
            current: false,
            complete: false,
            title: 'Step 3'
        }
    ];

    currentStep: number = 0;

    constructor() {}

    goto(index: number) {
        if (index > this.currentStep) {
            this.steps[this.currentStep].complete = true;
        }
        this.steps[this.currentStep].current = false;
        this.currentStep = index;
        this.steps[index].current = true;
    }

    onStepChanged(evt: any) {
        this.currentStep = evt.current;
    }
}
