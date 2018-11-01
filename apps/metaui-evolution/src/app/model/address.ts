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
import {isPresent, Value} from '@ngx-metaui/rules';


export class Address implements Value
{


    constructor(public readonly fullName: string,
                public readonly street: string,
                public readonly city: string,
                public readonly zip: string,
                public readonly country: string)
    {
    }


    getTypes(): any
    {
        return {
            fullName: String,
            street: String,
            city: String,
            zip: String,
            country: String
        };
    }



    className(): string
    {
        return 'Address';
    }


    clone(data: { fullName?: string, street?: string, city?: string, zip?: string,
      country?: string } = {}): Address
    {
        return new Address(
            isPresent(data.fullName) ? data.fullName : this.fullName,
            isPresent(data.street) ? data.street : this.street,
            isPresent(data.city) ? data.city : this.city,
            isPresent(data.zip) ? data.zip : this.zip,
            isPresent(data.country) ? data.country : this.country,
        );
    }

}
