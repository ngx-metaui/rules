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
import {
    DataProviders, DataFinders, QueryType, ArrayDataProvider, ChooserDataSource
} from '@ngx-meta/rules';

@Component({
    templateUrl: './chooser-demo.component.html',
    styleUrls: ['./chooser-demo.component.scss']
})
export class ChooserDemoComponent
{

    list = [
        'Blue', 'Ted', 'Yellow', 'Orange', 'White', 'Silver', 'Black', 'Green',
        'Gray', 'Navy', 'Olive',
        'Aqua', 'Purple', 'P1urple', 'P2urple', 'P3urple', 'P4urple', 'P5urple'
    ];


    ds1: ChooserDataSource;
    ds2: ChooserDataSource;
    ds3: ChooserDataSource;
    ds4: ChooserDataSource;
    ds5: ChooserDataSource;
    ds7: ChooserDataSource;

    selection1: any;
    selection2: any = [new Plane('Airbus')];
    selection3: any;
    selection4: any;
    selection5: any;
    selection6: any;
    selection7: any;

    constructor(private data: DataProviders, private finders: DataFinders)
    {


        data.register(Plane, new ArrayDataProvider([
            new Plane('Airbus'),
            new Plane('Boing 1'),
            new Plane('Boing 2'),
            new Plane('Boing 3'),
            new Plane('Airbus 2'),
            new Plane('Airbus 3'),
            new Plane('Airbus 4'),
        ]));

        this.ds1 = new ChooserDataSource(data, finders);
        this.ds1.init({
            obj: this.list, queryType: QueryType.FullText, state: null,
            multiselect: true
        });


        this.ds2 = new ChooserDataSource(data, finders);
        this.ds2.init({
            obj: this.list, queryType: QueryType.FullText, state: null,
            multiselect: true
        });


        this.ds3 = new ChooserDataSource(data, finders);
        this.ds3.init({
            obj: this.list, queryType: QueryType.FullText, state: null,
            multiselect: true
        });

        this.ds4 = new ChooserDataSource(data, finders);
        this.ds4.init({
            obj: this.list, queryType: QueryType.FullText, state: null,
            multiselect: true
        });

        this.ds5 = new ChooserDataSource(data, finders);
        this.ds5.init({
            obj: this.list,
            queryType: QueryType.FullText,
            state: null,
            multiselect: false
        });


        this.ds7 = new ChooserDataSource(data, finders);
        this.ds7.init({
            obj: this.list,
            queryType: QueryType.FullText,
            state: null,
            multiselect: true
        });

    }


    formatItem(item: any): string
    {
        return `"${item}"`;
    }

    formatItemObj(item: any): string
    {
        return `My Plane is ${item.name}`;
    }

}


class Plane
{

    constructor(public name: string)
    {
    }


    toString(): string
    {
        return `xxx${this.name}`;
    }
}
