/**
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
 *
 */
import {ErrorHandler, Injectable} from '@angular/core';
import {Notifications} from './messaging/notifications.service';
import {isPresent} from './utils/lang';


@Injectable()
export class GlobalErrorHandler extends ErrorHandler
{


    constructor(private notifications?: Notifications)
    {
        super();
    }

    handleError(error: any)
    {
        if (isPresent(this.notifications)) {
            this.notifications.publish('app:error', error);
        }

    }
}

