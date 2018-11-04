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
import {isBlank, isPresent} from '../../../core/utils/lang';
import {ListWrapper} from '../../../core/utils/collection';
import {ChooserSelectionState} from './chooser-selection-state';
import {DataSource} from '../../core/data/data-source';

/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
export class ChooserState {

  /**
   *  Callback to the parent object to store current selection
   */
  selectionState: ChooserSelectionState;

  /**
   * todo: We do not needed this !!
   */
  currentItem: any;


  /**
   * Matching pattern. User latest input to the chooser input field
   */
  pattern: string;


  /**
   * Last successfull pattern that retrieved some data
   */
  lastFullMatchPattern: string;


  /**
   * Current matched items using ChooserSelectionState
   */
  matches: Array<any>;


  /**
   * Is this multiselect chooser
   */
  multiselect: boolean;


  /**
   *
   * Implementation can set lookup key to narrow the search. If we are dealing with object
   * you should set this.
   *
   */
  lookupKey: string;


  /**
   * previous display value is set when the display value is rendered on the chooser. we cache
   * the UI value to compare with the inbound value later instead of the value from underlying
   * object because business logic level code could have changed the underlying object's value
   *
   * todo: do I still need this?
   */
  prevDisplayValue: string;


  /**
   * Indicates if there are any validation like entered value does not much with the source list.
   *
   */
  isInvalid: boolean = false;

  /**
   *
   * indicates that we started to some editing e.g. starting to type in something into the
   * filter, or removing already selected items
   */
  addMode: boolean = false;


  recentSelectedDisplayed: number = 0;


  /**
   * When this option is active we do not show all selected items, but max number that is
   * defined. User is able to toggle to expand the view to see all selections and hide them as
   * well
   */
  showAllRecentlySelected: boolean = false;


  constructor(chooserSelectionState?: ChooserSelectionState, isMulti: boolean = true) {

    this.selectionState = chooserSelectionState;
    this.multiselect = isMulti;

    if (isBlank(this.selectionState)) {
      this.selectionState = new DefaultSelectionState(this.multiselect);
    }
  }


  /**
   *
   * It will select and persist an item using ChooserSelectionState provider.
   *
   */
  updatedSelectedObjects(item: any): void {
    if (isBlank(item)) {
      item = this.currentItem;
    }

    if (!this.multiselect) {
      this.setSelectionState(item, true);
    } else {
      const selectedObject = this.selectedObject();
      const selectedObjects = this.selectedObjects();


      if (this.addMode) {
        if (this.isInvalid) {
          if (isPresent(selectedObject)) {
            this.setSelectionState(selectedObject, false);
          }

        }
        this.setSelectionState(item, !ListWrapper.containsComplex(selectedObjects, item));
      } else {
        if (isPresent(selectedObject)) {
          this.setSelectionState(selectedObject, false);
        }
        this.setSelectionState(item, true);
      }
    }
  }


  /**
   * When user selection is large we use this method to check if we need to show all selected
   * items or only MaxRecentSelected
   */
  toggleAllSelected(): void {
    this.showAllRecentlySelected = !this.showAllRecentlySelected;
  }


  /**
   *
   * Renders user's selection under the input field
   *
   */
  get recentSelectedObjects(): Array<any> {

    if (!this.multiselect) {
      return [];
    }

    const recentSelectedObjects: any[] = [];
    this.recentSelectedDisplayed = 0;
    const selectedObjects = this.selectedObjects();
    const size = selectedObjects.length;
    let maxCount = DataSource.MaxRecentSelected;
    if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
      maxCount -= 1;
    }
    if (this.showAllRecentlySelected) {
      maxCount = size;
    }

    for (let i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
      const selection = selectedObjects[i];
      recentSelectedObjects.push(selection);
      this.recentSelectedDisplayed++;
    }

    return recentSelectedObjects;
  }

  selectedObject(): any {
    return this.selectionState.selectedObject();
  }


  selectedObjects(): Array<any> {
    return this.selectionState.selectedObjects();
  }

  setSelectionState(selection: any, selected: boolean): void {
    if (isPresent(selection)
    ) {
      this.selectionState.setSelectionState(selection, selected);
    }
  }

}


/**
 * Dummy implementation ChooserSelectionState
 */
export class DefaultSelectionState extends ChooserSelectionState {
  private _selectedObject: any;
  private _selectedObjects: any;


  constructor(private multiSelect: boolean) {
    super();
  }

  setSelectionState(selection: any, selected: boolean): void {
    if (selected) {
      this._selectedObject = selection;
      if (this.multiSelect && !ListWrapper.containsComplex(this.selectedObjects(),
        selection)) {
        this.selectedObjects().push(selection);
      }
    } else {
      if (this.multiSelect) {
        ListWrapper.removeIfExist(this.selectedObjects(), selection);
      }
    }
  }

  selectedObject(): any {
    return this._selectedObject;
  }

  selectedObjects(): Array<any> {
    if (isBlank(this._selectedObjects)) {
      this._selectedObjects = [];
    }
    return this._selectedObjects;
  }

  isSelected(selection: any): boolean {
    return super.isSelected(selection);
  }
}

