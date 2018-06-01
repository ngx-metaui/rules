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
import {
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    SkipSelf,
    TemplateRef
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {Environment, equals, isPresent} from '@aribaui/core';
import {BaseFormComponent} from '../../core/base-form.component';


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


export const DD_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};


@Component({
    selector: 'aw-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.scss'],
    providers: [
        DD_CONTROL_VALUE_ACCESSOR,
        {provide: BaseFormComponent, useExisting: forwardRef(() => DropdownComponent)}
    ]

})
export class DropdownComponent extends BaseFormComponent
{

    static readonly MaxNumShown = 10;

    /**
     * Ordered list of items rendered as a popup menu
     */
    @Input()
    list: any[];

    /**
     * Items which was selected as a default value or by used in the popup menu.
     */
    @Input()
    selection: any;

    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     */
    @Input()
    noSelectionString: string;

    /**
     * Event fired when user select a item
     * @type {EventEmitter}
     */
    @Output()
    onSelection: EventEmitter<any> = new EventEmitter();

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
    @ContentChild('itemTemplate')
    itemTemplate: TemplateRef<any>;


    /**
     * Internal model used for embedded version.
     */
    model: SelectItem;


    constructor(public env: Environment,
                @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                protected parentContainer: BaseFormComponent)
    {
        super(env, parentContainer);
    }

    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     */
    ngOnInit()
    {

        if (this.isStandalone) {
            super.ngOnInit();
            super.registerFormControl(this.selection);

        } else {
            if (isPresent(this.name)) {
                this.formControl = <FormControl> this.formGroup.controls[this.name];
            }
        }


        // transform a value to PrimeNg Format, we are not really be using a label field only a
        // value.
        this.internalList = [];
        // if (isPresent(this.noSelectionString)) {
        //     this.internalList.push({
        //         label: this.noSelectionString,
        //         value: null
        //     });
        //
        //     if (isBlank(this.selection)) {
        //         this.selection = this.noSelectionString;
        //     }
        // }

        if (isPresent(this.list) && this.list.length >= DropdownComponent.MaxNumShown) {

            this.internalList = this.list.slice(0, DropdownComponent.MaxNumShown).map((item: any) =>
            {
                return {label: item.toString(), value: item};
            });
        } else if (isPresent(this.list)) {
            this.internalList = this.list.slice(0).map((item: any) =>
            {
                return {label: item.toString(), value: item};
            });
        }
    }


    hasEmbeddedTemplate(): boolean
    {
        return isPresent(this.itemTemplate);
    }

    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     */
    itemExist(item: any)
    {
        return isPresent(item);
    }


    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     */
    showFilter()
    {
        return false;
        // return isPresent(this.list) && this.list.length > DropdownComponent.MaxNumShown;
    }

    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     */
    onItemSelection(value: any)
    {
        this.selection = value.value;
        this.onSelection.emit(value.value);

        if (this.isStandalone) {
            this.formControl.setValue(this.selection);
            this.formControl.markAsDirty({onlySelf: true});
        }

        this.onModelChanged(value.value);
    }

    displayItem(item: any)
    {
        return isPresent(item) ? item.label : 'No Selection';
    }

    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any)
    {
        if (!equals(value, this.selection)) {

            this.selection = value;
            this.formControl.setValue(value);
        }

    }

}



