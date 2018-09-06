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
    TemplateRef,
    ViewChild
} from '@angular/core';
import {Environment, equals, isBlank, isPresent} from '@aribaui/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseFormComponent} from '../../core/base-form.component';
import {Listbox, SelectItem} from 'primeng/primeng';
import {CheckboxComponent} from '../checkbox/checkbox.component';


export const LB_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ListComponent),
    multi: true
};

/**
 *
 * The List component represent a structure which contains a list of selectable items. Items
 * selection can be configured in single-selection, multi-selection or multi-selection with visible
 * checkboxes mode.
 * In addition it can display data inside 3 zones LEFT, MIDDLE and RIGHT in order to provide
 * easy way for application developer to layout its own custom content or even change out of box
 * behavior.
 *
 *
 *  ### Examples
 *
 *  1. Render simple single selection list
 *
 *  ```html
 *
 *      <aw-list [list]="list"></aw-list>
 *
 *  ```
 *  2. Render list - multi selection with custom RIGHT content to show a CheckMark when item
 *  is selected
 *
 *  ```html
 *
 *   <aw-list #awlist [list]="list"
 *                       height="150px"
 *                       width="250px"
 *                       [selectionMode]="'multi'">
 *
 *                  <ng-template #right let-item>
 *
 *                      <span class="sap-icon"
 *                            [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
 *                            '': !awlist.pListBox.isSelected(item)}">
 *
 *                      </span>
 *                  </ng-template>
 *   </aw-list>
 *
 *  ```
 *
 * 3. Render list - multi selection with visible checkboxes and custom MIDDLE content to change
 *  the way item name is rendered
 *
 *
 *
 *  ```html
 *
 *   <aw-list [list]="list" height="180px"
 *                       width="200px"
 *                       [selection]="selection"
 *                       [selectionMode]="'multiWithCheckbox'">
 *
 *                  <ng-template #middle let-item>
 *                      XX-{{item.value}}
 *                  </ng-template>
 *    </aw-list>
 *
 *  ```
 *
 *
 *
 */
@Component({
    selector: 'aw-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        LB_CONTROL_VALUE_ACCESSOR,
        {provide: BaseFormComponent, useExisting: forwardRef(() => ListComponent)}
    ]
})
export class ListComponent extends BaseFormComponent
{

    /**
     * List of option that will show in the list. Please not that this list is current used to
     * show limited number of items. It does not have any scrolling feature and lazy loading
     *
     */
    @Input()
    list: any[];

    /**
     * Items which was selected as a default values
     */
    @Input()
    selection: any;

    /**
     * Component recognizes 3 modes: single, multi, multi with visible checkboxes
     */
    @Input()
    selectionMode: SelectionMode = 'single';


    /**
     * Formatter used to format each selection for display.
     *
     */
    @Input()
    valueTransformer: (value: any) => string;

    /**
     * Used when dealing with object to identify specific field on the object forcomparison
     */
    @Input()
    field: string;


    /**
     * Don't render Listbox border. Used for embedding this inside other components
     *
     */
    @Input()
    borderless: boolean = false;

    /**
     * Triggered when we double click on the list Item
     *
     */
    @Output()
    action: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when user select a item
     *
     */
    @Output()
    onSelection: EventEmitter<any> = new EventEmitter();


    /**
     * In case we want to override default behavior or Left zone. We expose this listBox in order to
     * have access primeNg implementation
     */
    @ViewChild('listbox')
    pListBox: Listbox;


    /**
     * Custom templates to override default behavior. The list item is divided into 3 zones
     *
     *
     *  ------------------------------------------------------
     *  |       |                                   |        |
     *  |   L   |             M                     |   R    |
     *  |       |                                   |        |
     *  |       |                                   |        |
     *  ------------------------------------------------------
     *
     *
     */
    @ContentChild('left')
    lZoneTempl: TemplateRef<any>;

    @ContentChild('middle')
    mZoneTempl: TemplateRef<any>;

    @ContentChild('right')
    rZoneTempl: TemplateRef<any>;

    /**
     * Internal
     */
    internalList: SelectItem[];

    listStyle: {[name: string]: any} = {};

    isMultiple: boolean = false;
    showCheckbox: boolean = false;


    constructor(public env: Environment,
                @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                protected parentContainer: BaseFormComponent)
    {
        super(env, parentContainer);
    }

    ngOnInit()
    {
        super.ngOnInit();

        this.isMultiple = this.selectionMode === 'multi' ||
            this.selectionMode === 'multiWithCheckbox';
        this.showCheckbox = this.selectionMode === 'multiWithCheckbox';

        // cannot have both either we use field to get display value or valueTransformer
        if (isPresent(this.field) && isPresent(this.valueTransformer)) {
            throw new Error('You can have either [field] or [valueTransformer].');
        }

        if (isPresent(this.list)) {
            this.initList();
        } else {
            throw new Error('Missing [list] binding.');
        }

        // Also add overflowY to make sure it can scroll and does not expand based on its content
        if (isPresent(this.height)) {
            this.listStyle['height'] = this.height;
            this.listStyle['overflow-y'] = 'auto';
        }

        if (isPresent(this.width)) {
            this.listStyle['width'] = this.width;
        }

        if (this.borderless) {
            this.listStyle['border-color'] = 'transparent';
        }

        if (this.isStandalone) {
            super.registerFormControl(this.selection);

            if (isBlank(this.selection)) {
                this.selection = this.formControl.value;
            }
        }
    }


    /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     */
    itemClicked(event: any, item: any, checkbox: CheckboxComponent): void
    {
        this.pListBox.onOptionClick(event, item);

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Internal
     *
     */
    hasRightTempl(): boolean
    {
        return isPresent(this.rZoneTempl);
    }

    hasLeftTempl(): boolean
    {
        return isPresent(this.lZoneTempl);
    }


    hasMiddleTempl(): boolean
    {
        return isPresent(this.mZoneTempl);
    }

    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     */
    onItemSelected(event: any): void
    {
        if (isBlank(event.value)) {
            return;
        }

        this.onSelection.emit(event.value);
        if (this.isStandalone) {
            this.formControl.setValue(event.value, {emitEvent: true});
        }
        this.onModelChanged(event.value);
    }


    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any)
    {
        if (!equals(value, this.selection)) {
            this.selection = value;
            if (this.isStandalone) {
                this.formControl.setValue(value);
            }
        }
    }

    /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     */
    private initList()
    {
        if (isPresent(this.list)) {
            this.internalList = this.list.map((item: any) =>
            {
                return {label: this.displayValue(item), value: item};
            });
        }
    }


    /**
     *  Generates label value for the list box.
     *
     */
    private displayValue(item: any): string
    {
        if (isBlank(item)) {
            return '';
        }

        let val = item.toString();
        if (isPresent(this.field)) {
            val = item[this.field];

        } else if (isPresent(this.valueTransformer)) {
            val = this.valueTransformer(item);
        }
        return val;
    }
}

/**
 * List support these three selection modes
 *
 */
export type SelectionMode = 'single' | 'multi' | 'multiWithCheckbox';
