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
import {Environment} from '@ngx-meta/rules';

@Component({
    templateUrl: './checkbox-list-demo.component.html',
    styleUrls: ['./checkbox-list-demo.component.scss']
})
export class CheckboxListDemoComponent
{


    categoriesObj: Cat[] = [
        new Cat('Technology'), new Cat('Finance'), new Cat('Procurement'),
        new Cat('Marketing')
    ];

    selectedCategoriesObj: Cat[] = [];
    selectedCategoriesObj2: Cat[] = [];

    constructor(public env: Environment)
    {
        this.selectedCategoriesObj.push(this.categoriesObj[3]);
        this.selectedCategoriesObj2.push(this.categoriesObj[2]);
    }


}


export class Cat
{


    constructor(public name: string)
    {

    }

    toString(): string
    {
        return this.name;
    }
}
