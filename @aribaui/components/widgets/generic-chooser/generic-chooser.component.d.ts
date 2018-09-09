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
import { ViewContainerRef } from '@angular/core';
import { Environment, FieldPath } from '@aribaui/core';
import { ChooserSelectionState } from '../chooser/chooser-selection-state';
import { BaseFormComponent } from '../../core/base-form.component';
import { ChooserDataSource } from '../chooser/chooser-data-source';
/**
 * Convenient wrapper class around controls such as radiobuttons, dropdown, checkboxes,
 * Chooser. The type of the chooser may be determined dynamically based on the number of items in
 * the data source list, or can be specified explicitly via the "type" binding.
 *
 *
 *
 */
export declare class GenericChooserComponent extends BaseFormComponent {
    env: Environment;
    private _viewContainer;
    dataSource: ChooserDataSource;
    protected parentContainer: BaseFormComponent;
    /**
     * Ordered list of items assignable to the key of the object
     */
    list: any[];
    /**
     * The object this control is being assigned to.
     */
    object: any;
    /**
     * The key field path this control is being assigned to.
     */
    key: string;
    /**
     * Can be used in place of LIST binding to retrieve a list based on the ChoiceSource
     *
     */
    destinationClass: string;
    /**
     * Used when retrieving choiceSource by destination class and this are extra params that can be
     * used to narrow the matching or to pass parameters into ChoiceSource provider
     */
    choiceProviderParams: Map<string, any>;
    /**
     *  Is this a List property, or a to-one.
     */
    multiselect: boolean;
    /**
     *  The style of chooser to use (Radio, Checkbox, Dropdown, Chooser)
     *  Defaults based on cardinality of the list and whether it's multiSelect.
     */
    type: string;
    /**
     * Support custom key. in order to make this work we need to introduce custom <templates> for
     * all this chooser types
     */
    displayKey: string;
    /**
     * String rendered as first value in the dropdown which let the user to make 'no selection'
     * from available list of values. When this option is active and use make this selection we
     * save a NULL value
     */
    noSelectionString: string;
    /**
     * Generic Chooser works directly with object and its references and we need to create this
     * keypath to be able to set/get value from target or parent object
     */
    keyPath: FieldPath;
    constructor(env: Environment, _viewContainer: ViewContainerRef, dataSource: ChooserDataSource, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     *
     * When @Input type is not passed we try to guess and select the best type for current data
     *
     */
    private initType(projectedSize);
    /**
     * There are certain properties which are required by this component. As already mentioned
     * above GenericChooser works with references and thefore two key properties are object and key
     * so we can access an object
     *
     *
     */
    private validateRequired();
    /**
     *
     * Used when displaying value both from primitive type as well complex object. If you want to
     * control how item is displayed you can provide display key, which is can be a  method or
     * property of the object you are displaying.
     *
     * Todo: think about formatters as well
     *
     */
    displayValue(item: any): string;
    /**
     *  Retrieve a current value from the parent/target object
     *
     */
    /**
     *  set value back to the object
     *
     */
    selection: any;
    onSelection(value: any): void;
}
/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
export declare class GCChooserState extends ChooserSelectionState {
    private gChooser;
    constructor(gChooser: GenericChooserComponent);
    setSelectionState(selection: any, selected: boolean): void;
    selectedObject(): any;
    selectedObjects(): Array<any>;
    isSelected(selection: any): boolean;
}
