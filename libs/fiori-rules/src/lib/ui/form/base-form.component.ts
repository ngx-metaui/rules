/**
 * @license
 * F. Kolar
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
import {ChangeDetectorRef, OnInit} from '@angular/core';


export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';

/**
 * All form components share the same information (value, name, placeholder,.. ) as well as
 * the same behavior given by ControlValueAccessor.
 *
 *
 *
 */
export class BaseFormComponent implements OnInit {


  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }


}

