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
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    templateUrl: './radio-button-demo.component.html',
    styleUrls: ['./radio-button-demo.component.scss']
})
export class RadioButtonDemoComponent
{
    formModel: FormGroup;
    model1: string = 'blue';
    model2: string = 'red';
    model3: string;


    constructor()
    {
        this.formModel = new FormGroup({});
        this.formModel.registerControl('color2', new FormControl(this.model2));

    }


    onChange(event: any): void
    {
        this.model3 = event;
    }
}
