/**
 * @license
 * Frank Kolar
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
 *  Based on original work: MetaUI: Craig Federighi (2008)
 */


import {BooleanWrapper, isPresent} from './utils/lang';

/**
 * Used to transform values into the (static) version they should be indexed / searched under
 * For instance, 'object' may be indexed as true/false (present or not)
 */
export interface KeyValueTransformer {
  tranformForMatch(o: any): any;
}


export class KeyValueTransformer_KeyPresent implements KeyValueTransformer {


  tranformForMatch(o: any): any {
    return (isPresent(o) && !(BooleanWrapper.isFalse(o))) ? true : false;
  }

}

