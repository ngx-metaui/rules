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
import {unimplemented} from '../../core/utils/lang';


/**
 * Selection State for the chooser in order to be able to comunicate with the parent object using a
 * chooser. If I would have to manage only single values with no addional methods i would user
 * emitters to do the job, but in this case we need this interface (abstract class) between a
 * chooser and actual object.
 *
 *
 */
export abstract class ChooserSelectionState {
  /**
   *
   * Set selection state is usually triggered by selecting and unselecting a item (in case of
   * multiselect) and it should update its list of objects with either settings/adding item or
   * removing it.
   *
   *
   */
  setSelectionState(selection: any, selected: boolean): void {
  }

  /**
   * The most recent selection . Null if last action was a deselection. Usually used by Chooser
   * or ChooserState to get cuurent value.
   *
   */
  selectedObject(): any {
    return unimplemented();
  }


  /**
   * The most recent selections.
   *
   */
  selectedObjects(): Array<any> {
    return unimplemented();
  }


  /**
   *
   * Check if the item selection items is in the selectedObjects
   */
  isSelected(selection: any): boolean {
    return unimplemented();
  }
}

