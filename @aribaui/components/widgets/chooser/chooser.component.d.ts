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
import { AfterViewChecked, AfterViewInit, ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { AutoComplete } from 'primeng/primeng';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { ChooserDataSource } from './chooser-data-source';
import { ChooserState } from './chooser-state';
/**
 * Typeahead chooser that supports both single and multi-select. Not like Dropdown, this chooser
 * requires little bit different setup. It requires at minimum @Input dataSource or
 * destinationClass
 *
 *
 * By default chooser is multi-select. If you want single select then you must provide multi-select
 * with @Input.
 *
 * ### Example
 *
 * In simple scenario you can use Chooser like so:
 *
 *
 * ```
 *  @Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  [formGroup]="formGroup" name="color"'
 *                      [dataSource]="ds"></aw-chooser>`
 *  })
 *  export class MyChooserApp
 *  {
 *
 *      ds: ChooserDataSource;
 *
 *     constructor(private data: DataProviders, private finders: DataFinders){
 *          this.ds = new ChooserDataSource(this.data, this.finders);
 *
 *       this.ds.init({
 *           obj: ['blue', 'red', 'yellow'], queryType: QueryType.FullText, state: null,
 *            multiselect: true
 *       });
 *
 *     }
 *  }
 *
 * ````
 *  Above example will use provided dataSource and render multi-select chooser. With default
 *  implementation  selected values will appear as a tags under the input box
 *
 *
 *
 * * ### Example
 *
 *  In this example we provide custom template to change the way how chooser's MenuItem are
 *     rendered as well as template for the selection item looks like
 *
 * ```
 *  @Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  name="commodity"' [dataSource]="ds">
 *
 *          <ng-template #menuItem let-item>
 *             	<span>
 *             		<i class="fa fa-envira " ></i>
 *             		{{item}}
 *             	</span>
 *
 *          </ng-template>
 *
 *          <ng-template #selectionItem let-item>
 *             	<span class="tag tag-circle">
 *             		item: {{item }}
 *             		<i class="fa fa-close" (click)="chooser.removeValue(item)"></i>
 *             	</span>
 *
 *
 *          </ng-template>
 *
 *
 *          </aw-chooser>
 *      `
 *      style: [`
 *              .tag-circle {
 *              	border-radius: 6rem;
 *              	height: 7rem;
 *              	color: #e8eef1;
 *              	background-color: rgba(53, 56, 58, 0.67);
 *              	line-height: 6rem;
 *              }
 *      `]
 *  })
 *
 * ````
 *
 *  In above example we change how the chooser's menu item look like as well as we define custom
 *     template for selection item to turn all selection to circles with text in the middle.
 *
 *
 *
 */
export declare const CHOOSER_CONTROL_VALUE_ACCESSOR: any;
export declare class ChooserComponent extends BaseFormComponent implements AfterViewChecked, AfterViewInit {
    env: Environment;
    private elemementRef;
    private _defaultDS;
    protected parentContainer: BaseFormComponent;
    /**
     * Max number of items return at single Match so we do not return 1000 items at single time.
     *
     */
    maxLength: number;
    /**
     * Max number of items return at single Match so we do not return 1000 items at single time.
     *
     */
    minLenForSearch: number;
    /**
     * Formatter used to format each selection and selected object for display.
     *
     */
    valueTransformer: (value: any) => string;
    /**
     * Is this multiselect
     *
     */
    multiselect: boolean;
    /**
     * By default ChooserDataSource will be created but there is a option to set
     * custom one on application level
     */
    dataSource: ChooserDataSource;
    /**
     * In case we want to change the place where selection is rendered use this appendTo property
     * and it will use DOM operation appendChild() to move selectionView under different parent
     */
    selectionAppendTo: ElementRef;
    delay: number;
    /**
     * Target type to render. Data will be read from the registered DataProvider
     */
    destinationClass: string;
    field: string;
    /**
     * Event fired when user select a item
     */
    onSelection: EventEmitter<any>;
    /**
     * internal model to listen for Input value changes
     */
    internalChooserModel: any;
    /**
     * Embedded template defined by user. If user does not provide any template then when rendering
     * an item we assume we are dealing with primitive types and call on each item toString(), if
     * we are dealing with object, then we expect user to provide a template and tell the chooser
     * how items shoulds be handled or at least valueTransformer so we know how to convert this
     * value.
     *
     * Each object can provide its own toString implementation.
     *
     */
    menuTemplate: TemplateRef<any>;
    selectionTemplate: TemplateRef<any>;
    autoCompleteComponent: AutoComplete;
    selectionViewElem: ElementRef;
    /**
     * When the selection is > max selection, then show hide link.
     */
    private hideLink;
    constructor(env: Environment, elemementRef: ElementRef, _defaultDS: ChooserDataSource, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     */
    ngAfterViewInit(): void;
    /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     */
    ngAfterViewChecked(): void;
    /**
     *
     * When value is entered into search box, we ask our DataSource to match this pattern
     * against data repository. It will retrieve all possible matches limited by MaxLen and this
     * is again filtered so it does not include already selected items.
     *
     *  the matched resulted is saved in the: this.dataSource.state.matches
     */
    match(pattern: string): void;
    /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     */
    onDropdownClick(event: any): void;
    /**
     *
     * Chooser state is updated  with user selection. Please see writeValue. When do not need
     * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
     * shares the same references so its important that we first save reference to
     * this.chooserState.selectedObjects() and then back to internalChooserModel
     *
     */
    selectItem(item: any): void;
    /**
     *
     * Unselect item
     *
     */
    removeValue(item: any): void;
    /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     */
    displayItem(item: any): any;
    /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     */
    moreSelectString(): string;
    /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     */
    singleValueSelected(): boolean;
    hasMenuTemplate(): boolean;
    hasSelectionTemplate(): boolean;
    /**
     * Internal. Please see ControlValueAccessor
     * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
     * initialization once we have a value and we only accept []
     *
     *
     * ? Should we do some deeper comparision?
     */
    writeValue(value: any): void;
    initDatasource(chooserState?: ChooserState): void;
    /**
     *
     * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
     * ngModel property
     *
     */
    private initInternalModel();
}
