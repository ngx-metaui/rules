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
import {Component, OnInit} from '@angular/core';
import {BaseComponent, Money} from '@aribaui/components';
import {Environment} from '@aribaui/core';
import {Order} from '../../domain';
import {User} from '../../domain/user';
import {Address} from '../../domain/address';


@Component({
    templateUrl: './metaui-nested.page.component.html',
    styleUrls: ['./metaui-nested.page.component.scss']
})
export class MetaUINestedPageComponent extends BaseComponent implements OnInit
{
    op: string = 'view';
    myPO: Order;

    constructor(public env: Environment)
    {
        super(env);

    }


    ngOnInit()
    {
        super.ngOnInit();

        this.myPO = new Order('PO20180001', 'iPhone 11 5d touch',
            new Date(), 'Shipping',
            new User('zchapple', 'Zack', 'Chapple'),
            new Money(1000, 'USD'),
            new Address('Frank Kolar', 'Davey Glen 111', 'Foster City',
                '94404', 'US'),
            new Address('Frank Kolar', 'Zelena 400', 'Prague',
                '14000', 'Czech republic'),
            'The iPhone X is intended to showcase what Apple considers technology of ' +
            'the future, specifically adopting OLED screen technology for the first time in iPhone ' +
            'history, as well as using a glass and stainless-steel form factor, offering wireless ' +
            'charging, and removing the home button in favor of introducing a new bezel-less design, ' +
            'almost removing all the bezels in the smartphone and not having a "chin", unlike many ' +
            'Android phones'
        );

    }

}



