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
import {Entity, isPresent} from '@aribaui/core';
import {Money} from '@aribaui/components';
import {ApproverUser} from './approver-user';


export class FormRequest implements Entity
{


    uniqueName: string = '1';


    static create(copy: FormRequest): FormRequest
    {

        if (isPresent(copy.price)) {
            copy.price = new Money(copy.price.amount, copy.price.currency);
        }

        if (isPresent(copy.approver)) {
            let a = copy.approver;
            copy.approver = new ApproverUser(a.id, a.firstName, a.lastName, a.age);
        }

        return new FormRequest(copy.firstName, copy.lastName, copy.driverLicenseNumber,
            new Date(copy.pickupDate),
            new Date(copy.dropOffDate),
            copy.pickupLocation, copy.dropOffLocation, copy.carType, copy.extras,
            copy.approver, copy.note, copy.price
        );
    }


    constructor(public firstName: string,
                public lastName: string,
                public driverLicenseNumber: string,
                public pickupDate: Date,
                public dropOffDate: Date,
                public pickupLocation: string,
                public dropOffLocation: string,
                public carType: Array<string>,
                public extras: Array<string>,
                public approver: ApproverUser,
                public note: string,
                public price: Money)
    {
    }


    identity(): string
    {
        return this.lastName;
    }



    getTypes(): any
    {
        return {
            firstName: String,
            lastName: String,
            driverLicenseNumber: String,
            pickupDate: Date,
            dropOffDate: Date,
            pickupLocation: String,
            dropOffLocation: String,
            carType: String,
            extras: String,
            approver: ApproverUser,
            note: Money,
            price: Money
        };
    }

    $proto(): FormRequest
    {
        return new FormRequest('1', 's', 's', new Date(), new Date(), 's', 's', ['a'],
            ['a'], new ApproverUser('1', '', '', 1), 'a', new Money(100)
        );
    }


    className(): string
    {
        return 'FormRequest';
    }
}


