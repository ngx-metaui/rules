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
import {ApproverUser} from './approver-user';
import {Entity, Money} from '@ngx-meta/rules';


export class CarRentalRequest implements Entity {
  myDate: Date;

  constructor(public firstName: string,
              public lastName: string,
              public driverLicenseNumber: string,
              public pickupDate: Date,
              public dropOffDate: Date,
              public pickupLocation: string,
              public dropOffLocation: string,
              public carType: Array<string>,
              public extras: Array<string>,
              public approvers: Array<ApproverUser>,
              public note: string,
              public drivingSkills: string,
              public requester: ApproverUser,
              public price: Money) {
  }


  $proto(): CarRentalRequest {
    return new CarRentalRequest('1', 's', 's', new Date(), new Date(), 's', 's',
      ['a'], ['a'], [new ApproverUser('1', '', '', 1)], 'a', 'OK',
      new ApproverUser('1', '', '', 1),
      new Money(100)
    );
  }

  identity(): string {
    return this.lastName;
  }

  className(): string {
    return 'CarRentalRequest';
  }


  getTypes(): any {
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
      approvers: ApproverUser,
      note: String,
      drivingSkills: String,
      requester: ApproverUser,
      price: Money
    };
  }
}


