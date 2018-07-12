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
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../base.component';
/**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
export declare class ModalContainer extends BaseComponent {
    env: Environment;
    /**
     * Override function.
     */
    destroy: () => void;
    constructor(env: Environment);
    /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     */
    closeModal(): void;
}
