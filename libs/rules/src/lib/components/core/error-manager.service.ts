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
 *
 *
 */
import {Injectable} from '@angular/core';
import {StringWrapper} from '../../core/utils/lang';

/**
 * Error Manager is a service used by Forms components to map error codes into meaningful messages.
 * Currently it does not have much but once we plug in localization it will make more sense
 *
 *
 * todo: Once ng-translate is implemented replace this with ng-translate functionality so we can
 * externalize these messages into locale files.
 *
 */
@Injectable()
export class ErrorManagerService {
  messages: { [key: string]: any };

  constructor() {
    this.messages = {
      'required': 'Required field',
      'minlength': 'Field does not meet minimum length',
      'maxlength': 'Field does not meet maximum length',
      'customMsg': '%s',
      'metavalid': '%s'
    };
  }


  errorMessage(validatorName: string, validatorValue?: any) {
    let message = this.messages[validatorName];
    if (StringWrapper.contains(message, '%s')) {
      // todo: use ng-translate with proper message formatting

      return StringWrapper.replace(message, '%s', validatorValue.msg);
    }
    return message;
  }

}
