/**
 *
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
 *
 */
/**
 * Interface SelectItem is used to deal with complex object in order to be able to format
 * custom label that is shown in the options.
 */
export interface SelectItem {
  /**
   * Item text shown in the popup
   */
  label: string;

  /**
   * References to the object instance
   */
  value: any;
  disabled?: boolean;

  /**
   * Trigger values is a text for selected item
   */
  triggerValue?: string;
}

export function isSelectItem(item: SelectItem): item is SelectItem {
  return item && item.label !== undefined && item.value !== undefined;
}
