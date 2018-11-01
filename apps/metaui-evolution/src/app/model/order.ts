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

import {User} from './user';
import {Address} from './address';
import {Entity, Money} from '@ngx-metaui/rules';


export class Order implements Entity
{

    constructor(public uniqueName?: string,
                public name?: string,
                public orderDate?: Date,
                public state?: String,
                public requestor?: User,
                public totalAmount?: Money,
                public billingAddress?: Address,
                public shippingAddress?: Address,
                public description?: string)
    {
        this.uniqueName = 'PO20180001';
    }


    identity(): string
    {
        return this.uniqueName;
    }


    getTypes(): any
    {
        return {
            uniqueName: String,
            name: String,
            requestor: User,
            totalAmount: Money,
            billingAddress: Address,
            shippingAddress: Address,
            description: String

        };
    }
    


    className(): string
    {
        return 'Order';
    }
}
