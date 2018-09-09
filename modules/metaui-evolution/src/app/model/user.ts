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
import {Entity} from '@aribaui/core';

export class User implements Entity
{


    constructor(public uniqueName?: string, public firstName?: string,
                public lastName?: string, public age?: number, public dob?: Date)
    {
    }

    identity(): string
    {
        return this.uniqueName;
    }


    getTypes(): any
    {
        return {
            uniqueName: String,
            age: Number,
            firstName: String,
            lastName: String,
            dob: Date
        };
    }

    /**
     * Used by MetaUI
     *
     */
    $proto(): User
    {
        let user = new User();
        user.uniqueName = '6';
        user.age = 1;
        user.firstName = 'a';
        user.lastName = 'a';
        user.dob = new Date();
        return user;
    }


    className(): string
    {
        return 'User';
    }


    displayKey(): string
    {
        return this.toString();
    }


    toString(): string
    {
        return this.firstName + ' ' + this.lastName;
    }

}
