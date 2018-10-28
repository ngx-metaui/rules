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
import {Entity, Value} from '@ngx-meta/rules';


export class Invoice implements Entity
{

    constructor(public uniqueName?: string, public itemName?: string, public itemPrice?: string,
                public itemDescription?: string, public supplier?: string,
                public requestor?: string, public header?: InvHeader)
    {
        this.uniqueName = 'Inv123';

        this.header = new InvHeader();
    }


    identity(): string
    {
        return this.uniqueName;
    }


    getTypes(): any
    {
        return {
            uniqueName: String,
            itemName: String,
            itemPrice: String,
            itemDescription: String,
            supplier: String,
            requestor: String,
            header: InvHeader

        };
    }

    className(): string
    {
        return 'Invoice';
    }
}


export class InvHeader implements Value
{

    constructor(public uniqueName?: string, public value?: string, public value2?: string)
    {
        this.uniqueName = uniqueName;
        this.value = value;
        this.value2 = value2;
    }

    getTypes(): any
    {
        return {
            uniqueName: String,
            value: String,
            value2: String
        };
    }

    className(): string
    {
        return 'InvHeader';
    }

    clone(): InvHeader
    {
        return new InvHeader(this.uniqueName, this.value, this.value2);
    }
}
