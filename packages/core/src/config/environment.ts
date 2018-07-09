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
import {EventEmitter, Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ListWrapper} from '../utils/collection';
import {assert} from '../utils/lang';


/**
 * Environment is sharable state between components and its injected at the root level and
 * the same instance accessible down the component tree.
 *
 */
@Injectable()
export class Environment
{

    /**
     * Keep Current Locale. Initialized from AppConfig along with i18n support
     */
    private _locale: string;


    /**
     * Used by component to save save additional properties for processing and its rendering
     */
    private envVariables: Map<string, any>;


    /**
     * Simple stack-like storage where we need to a keep history
     */
    private stacksVariables: Map<string, any[]>;

    /**
     * Helper properties for debugging and testing purposes
     *
     */
    isPseudoLocalized: boolean = false;
    inTest: boolean = false;


    /**
     * Store current Page FormGroup State that need to be shared down across components
     */
    currentForm: FormGroup;

    /**
     * An EventEmitter to listen to locale change events
     */
    onLocaleChange: EventEmitter<string> = new EventEmitter<string>();

    isProduction: boolean = false;

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


    constructor()
    {
        this._locale = 'en';
        this.envVariables = new Map<string, any>();
        this.stacksVariables = new Map<string, any[]>();
    }


    getValue(key: string): any
    {
        if (this.envVariables.has(key)) {
            return this.envVariables.get(key);
        }
        return null;
    }

    setValue(key: string, value: any): void
    {
        this.envVariables.set(key, value);
    }

    deleteValue(key: string): void
    {
        if (this.hasValue(key)) {
            this.envVariables.delete(key);
        }
    }

    hasValue(key: string): boolean
    {
        return this.envVariables.has(key);
    }

    allVariables(): Map<string, any>
    {
        return this.envVariables;
    }


    get locale(): string
    {
        return this._locale;
    }

    set locale(value: string)
    {
        this._locale = value;

        // Emit locale changed event
        this.onLocaleChange.emit(value);
    }

    peak<T>(key: string): T
    {
        let stack: T[] = this.stacksVariables.get(key) || [];
        return ListWrapper.last<T>(stack);

    }


    pop<T>(key: string): T
    {
        let stack: T[] = this.stacksVariables.get(key) || [];
        assert(stack.length > 0, ' Attempt to get value from empty stack');

        return ListWrapper.removeAt<any>(stack, stack.length - 1);
    }


    push<T>(key: string, value: T): void
    {
        let stack: T[] = this.stacksVariables.get(key) || [];
        stack.push(value);
        this.stacksVariables.set(key, stack);
    }

}

