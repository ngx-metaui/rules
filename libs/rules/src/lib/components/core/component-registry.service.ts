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
import {isStringMap} from '../../core/utils/lang';
import {Environment} from '../../core/config/environment';


/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
@Injectable()
export class ComponentRegistry {
  private _nameToType: Map<string, any> = new Map<string, any>();

  constructor(private env: Environment) {
  }


  initialize(references: any): Promise<any> {
    this.registerTypes(references);
    let promise: Promise<any> = new Promise((resolve: any) => {
      resolve(true);
    });
    return promise;

  }


  registerType(name: string, type: any): void {
    if (!this.nameToType.has(name)) {
      this._nameToType.set(name, type);
    }
  }


  registerTypes(references: any): void {
    if (!isStringMap(references)) {
      return;
    }

    Object.keys(references).forEach((name: string) => {
      this.registerType(name, references[name]);
    });
  }


  get nameToType(): Map<string, any> {
    return this._nameToType;
  }
}

