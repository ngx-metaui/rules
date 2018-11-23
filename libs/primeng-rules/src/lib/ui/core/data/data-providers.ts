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
import {DataProvider, DataTypeProviderRegistry} from './datatype-registry.service';
import {Injectable} from '@angular/core';
import {isArray, isString} from '../../core/utils/lang';
import {ArrayDataProvider} from './array-data-provider';


/**
 * Provides top level accessor class in order to make {@link DataProvider} retrieval process easier.
 * Using {@link DataTypeProviderRegistry} we either retrieve registered instance of concrete
 * provider or instantiate our implicit provider for native types such as Array.
 *
 *
 */
@Injectable()
export class DataProviders {


  constructor(private registry: DataTypeProviderRegistry) {
  }

  /**
   * Finds the best matching  DataProvider or create new one in case of Array
   * More room to register and instantiate some other implicit Providers
   */
  find(target: any): DataProvider<any> {
    if (isArray(target)) {
      return new ArrayDataProvider(target);
    } else if (isString(target)) {
      return this.registry.bestMatchForClass(target);
    }

    return this.registry.bestMatchForType(target);
  }


  /**
   * Registers new provider within DataTypeProviderRegistry
   *
   */
  register<T>(target: any, provider: DataProvider<T>): void {
    this.registry.registerProvider(target, provider);
  }

}
