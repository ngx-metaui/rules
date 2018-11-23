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
import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {isPresent} from '../../core/utils/lang';
import {ErrorManagerService} from '../../core/error-manager.service';

/**
 * ErrorMessagesComponent is used by form's component like FormRow to print its validation errors.
 * Its  based on ModelDriven (Reactive forms) and it reads errors from FormControl
 *
 *
 *
 */
@Component({
  selector: 'a-error-messages',
  template: `
            <div class="ui-g">
                    <small *ngIf="hasMessage()"
                        class="ui-g-12 ui-message ui-messages-error ui-corner-all">
                        {{ errorMsg }}
                    </small>
            </div>
    `,
  styleUrls: ['error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit {

  /**
   * Current form FormControll to check for Errors
   */
  @Input()
  control: FormControl;


  constructor(private errManager: ErrorManagerService) {
  }

  ngOnInit() {

  }


  hasMessage(): boolean {
    const msg = this.errorMsg;
    return isPresent(msg);
  }

  /**
   * Retrieve a messages if any registered by added validators
   *
   */
  get errorMsg(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.errManager.errorMessage(propertyName,
          this.control.errors[propertyName]);
      }
    }
  }

  /**
   *
   * Show errors? We currently shows errors if the control is not valid, it was touched by user.
   * Most of the type on blur event  and at last its not pristine anymore (its dirty)
   *
   */
  showErrors(): boolean {
    return !this.control.valid && !this.control.pristine && this.control.touched;
  }

}
