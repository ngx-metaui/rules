/**
 * @license
 * Copyright Frank Kolar and others
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
 */
import {Path} from '@angular-devkit/core';

export interface Schema {

  /** Name of the project to target. */
  project: string;

  /** Root path to the selected project  - a place where template files will be copied */
  path: string;

  /**
   * Works with specific module within the project
   */
  module: Path | undefined;

  /**
   * Works with specific module within the project
   */
  uiLib: 'none' | 'material';
  name: string;
  flat?: boolean;
  skipImport?: boolean;
  moduleExt?: string;
  routingModuleExt?: string;

}
