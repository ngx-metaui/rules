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
import {Inject, Injectable, LOCALE_ID, Optional} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ListWrapper} from '../utils/collection';
import {assert} from '../utils/lang';


/**
 * Environment is sharable state between components and its injected at the root level and
 * the same instance accessible down the component tree.
 *
 */
@Injectable()
export class Environment {
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
  isProduction: boolean = false;
  /**
   * This is jsut for debugging purposes to save some temp message that I can then trace.
   *
   */
  debugString: string;
  /**
   * Used by component to save save additional properties for processing and its rendering
   */
  private envVariables: Map<string, any>;
  /**
   * Simple stack-like storage where we need to a keep history
   */
  private stacksVariables: Map<string, any[]>;

  constructor(@Inject(LOCALE_ID) @Optional() public locale: string) {
    this.envVariables = new Map<string, any>();
    this.stacksVariables = new Map<string, any[]>();
  }


  getValue(key: string): any {
    if (this.envVariables.has(key)) {
      return this.envVariables.get(key);
    }
    return null;
  }

  setValue(key: string, value: any): void {
    this.envVariables.set(key, value);
  }

  deleteValue(key: string): void {
    if (this.hasValue(key)) {
      this.envVariables.delete(key);
    }
  }

  hasValue(key: string): boolean {
    return this.envVariables.has(key);
  }

  allVariables(): Map<string, any> {
    return this.envVariables;
  }


  peak<T>(key: string): T {
    const stack: T[] = this.stacksVariables.get(key) || [];
    return ListWrapper.last<T>(stack);

  }


  pop<T>(key: string): T {
    const stack: T[] = this.stacksVariables.get(key) || [];
    assert(stack.length > 0, ' Attempt to get value from empty stack');

    return ListWrapper.removeAt<any>(stack, stack.length - 1);
  }


  push<T>(key: string, value: T): void {
    const stack: T[] = this.stacksVariables.get(key) || [];
    stack.push(value);
    this.stacksVariables.set(key, stack);
  }

}

