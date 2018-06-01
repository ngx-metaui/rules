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
import {Component, AfterViewChecked} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseComponent} from '@aribaui/components';
import {Environment} from '@aribaui/core';


@Component({
    templateUrl: './forms.page.component.html',
    styleUrls: ['./forms.page.component.scss']
})
export class FormsPageComponent extends BaseComponent implements AfterViewChecked
{
    formGroup: FormGroup = new FormGroup({});
    codeOneColumn: boolean = false;

    myFirstValue: string = 'Test';
    useFiveZone: boolean = true;

    autoResize: boolean = true;

    labelsOnTop = true;

    constructor(protected environment: Environment)
    {
        super(environment);
    }

    ngOnInit()
    {
        super.ngOnInit();
    }


    ngAfterViewChecked(): void
    {

        // this.environment.currentForm.valueChanges
        //     .distinctUntilChanged()
        //     .subscribe(val =>
        //     {
        //         console.log('--' + val.firstName);
        //     });

    }

    submitForm(): void
    {
        console.log(this.environment.currentForm.value);
    }
}
