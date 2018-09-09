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
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
/**
 * Environment is sharable state between components and its injected at the root level and
 * the same instance accessible down the component tree.
 *
 */
export declare class Environment {
    /**
     * Keep Current Locale. Initialized from AppConfig along with i18n support
     */
    private _locale;
    /**
     * Used by component to save save additional properties for processing and its rendering
     */
    private envVariables;
    /**
     * Simple stack-like storage where we need to a keep history
     */
    private stacksVariables;
    /**
     * Helper properties for debugging and testing purposes
     *
     */
    isPseudoLocalized: boolean;
    inTest: boolean;
    /**
     * Store current Page FormGroup State that need to be shared down across components
     */
    currentForm: FormGroup;
    /**
     * An EventEmitter to listen to locale change events
     */
    onLocaleChange: EventEmitter<string>;
    isProduction: boolean;
    /**
     *
     * Register and save reference to user defined rules if any. You might define its own metadata
     * when rendering UI.
     */
    userRules: any;
    /**
     * This is jsut for debugging purposes to save some temp message that I can then trace.
     *
     */
    debugString: string;
    constructor();
    getValue(key: string): any;
    setValue(key: string, value: any): void;
    deleteValue(key: string): void;
    hasValue(key: string): boolean;
    allVariables(): Map<string, any>;
    locale: string;
    peak<T>(key: string): T;
    pop<T>(key: string): T;
    push<T>(key: string, value: T): void;
}
