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
import {Money} from '@aribaui/components';

@Component({
    templateUrl: './currency-demo.component.html',
    styleUrls: ['./currency-demo.component.scss']
})
export class CurrencyDemoComponent
{

    currencies: any[] = ['USD', 'CZK', 'EUR'];
    price1: Money = new Money(22.12345);
    price2: Money = new Money(100.113456);


}
