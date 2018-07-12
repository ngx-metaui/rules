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
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorManagerService } from '../../core/error-manager.service';
/**
 * ErrorMessagesComponent is used by form's component like FormRow to print its validation errors.
 * Its  based on ModelDriven (Reactive forms) and it reads errors from FormControl
 *
 *
 *
 */
export declare class ErrorMessagesComponent implements OnInit {
    private errManager;
    /**
     * Current form FormControll to check for Errors
     */
    control: FormControl;
    constructor(errManager: ErrorManagerService);
    ngOnInit(): void;
    hasMessage(): boolean;
    /**
     * Retrieve a messages if any registered by added validators
     *
     */
    readonly errorMsg: string;
    /**
     *
     * Show errors? We currently shows errors if the control is not valid, it was touched by user.
     * Most of the type on blur event  and at last its not pristine anymore (its dirty)
     *
     */
    showErrors(): boolean;
}
