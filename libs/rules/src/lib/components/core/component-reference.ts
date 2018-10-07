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
import {Component, ComponentFactory, Type} from '@angular/core';


/**
 * Used by IncludeComponent directive to represent a components and all required detailed needed to
 * dynamically instantiate and insert component into the view.
 */
export interface ComponentReference {
  /**
   * Metadata about the instantiated component.
   *
   * Note: before this one was called ComponentMetadate, but in Angular 2.0 final it was renamed
   * to Component
   */
  metadata: Component;

  /**
   * Component factory created by
   *
   * ```
   *  factoryResolver.resolveComponentFactory(<TYPE>)
   * ```
   *  We do not really need it now, but once we start caching created components it will more
   * more sense.
   *
   */
  resolvedCompFactory: ComponentFactory<any>;

  /**
   * Resolved Component TYPE
   */
  componentType: Type<any>;

  /**
   * String representation of componnent being rendered
   */
  componentName: string;
}

