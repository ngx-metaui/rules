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
    templateUrl: './checkbox-demo.component.html',
    styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent
{
    formModel: FormGroup;
    extFormModel: FormGroup;

    model1: string[] = ['blue'];
    model2: string[] = ['yellow', 'blue'];
    model3: boolean = false;

    externalModel: string[] = ['dev'];


    constructor()
    {
        this.formModel = new FormGroup({});
        this.extFormModel = new FormGroup({});
        this.formModel.registerControl('color2', new FormControl(this.model2));

        this.extFormModel.registerControl('workType', new FormControl(this.externalModel));
    }


    showAlert(): void
    {

        alert('Action executed ');
    }


    onChange(event: any): void
    {
        console.log(this.extFormModel.controls['workType'].value);
        console.log(event);

    }
}
