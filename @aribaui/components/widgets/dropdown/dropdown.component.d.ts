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
import { EventEmitter, TemplateRef } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * A popup like component rendering list of values as. Based on PrimeNG component and one of the
 * main reason why we need to wrap this is to extend its capabilities to accept almost any
 * data type without using Primens's specific SelectItem type.
 *
 *
 * ### Example
 *
 * ```
 *  @Component({
 *      selector: 'showDropDown' ,
 *      template: '<aw-dropdown [list]="testItemSmall"
 *     (onSelection)="onSelection($event)"></aw-dropdown>'
 *  })
 *  export class MyDropComponent
 *  {
 *      testItemSmall: string[] = ['view' , 'edit'];
 *
 *      // when you switch list binding to refert to large item fiilter automatically is shown and
 *     max 10 items are
 *      // visible
 *      testItemLarge: string[] = ['view' , 'edit' , 'frank' , 'kolar' , 'The Sun' , 'Dog' ,
 *     'Computer' , 'A Desk' ,
 *      'My Car' , 'Pencil' , 'This Page' , 'Yesterday' , 'Monday' , 'Tuesday' , 'BMW R1200 GS' ,
 *     'Czech Republic' ,
 *      'Last Item'];
 *
 *
 *      itemSelected: string = 'view';
 *      itemSelectedLg: string = 'Monday';
 *
 *      noselString: string = '(no selection)';
 *
 *
 *      onSelection (event): void
 *      {
 *          this.itemSelected = event;
 *
 *      }
 *  }
 *
 *  ```
 *
 */
export declare const DD_CONTROL_VALUE_ACCESSOR: any;
export declare class DropdownComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    static readonly MaxNumShown: number;
    /**
     * Ordered list of items rendered as a popup menu
     */
    list: any[];
    /**
     * Items which was selected as a default value or by used in the popup menu.
     */
    selection: any;
    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     */
    noSelectionString: string;
    /**
     * Event fired when user select a item
     */
    onSelection: EventEmitter<any>;
    /**
     * This is the internal list that hides PrimeNG specifics where we need to deal with special
     * type: SelectItem. Our expectation is that you need to be able to pass regular string values
     * or full object and not trying to wrap it into extra layer.
     *
     */
    internalList: SelectItem[];
    /**
     * Embedded template defined by user. If user does not provide any template and while rendering
     * item we assume we are dealing with primitive types and call on each item toString(), if we
     * are dealing with object, then we expect user to provide a template and tell the dropdown of
     * each item should be handled
     *
     */
    itemTemplate: TemplateRef<any>;
    /**
     * Internal model used for embedded version.
     */
    model: SelectItem;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     */
    ngOnInit(): void;
    hasEmbeddedTemplate(): boolean;
    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     */
    itemExist(item: any): boolean;
    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     */
    showFilter(): boolean;
    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     */
    onItemSelection(value: any): void;
    displayItem(item: any): any;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
