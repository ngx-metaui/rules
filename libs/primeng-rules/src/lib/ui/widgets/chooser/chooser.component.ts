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
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
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
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutoComplete} from 'primeng/primeng';
import {assert, isBlank, isPresent} from '../../core/utils/lang';
import {DATA_SOURCE} from '../../core/data/data-source';
import {ChooserDataSource} from './chooser-data-source';
import {DataProviders} from '../../core/data/data-providers';
import {DataFinders, QueryType} from '../../core/data/data-finders';
import {ChooserState, DefaultSelectionState} from './chooser-state';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


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

export const CHOOSER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChooserComponent),
  multi: true
};


@Component({
  selector: 'aw-chooser',
  templateUrl: 'chooser.component.html',
  styleUrls: ['chooser.component.scss'],
  providers: [
    CHOOSER_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => ChooserComponent)},
    {provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders]}
  ]


})
export class ChooserComponent extends BaseFormComponent implements AfterViewChecked,
  AfterViewInit {

  /**
   * Max number of items return at single Match so we do not return 1000 items at single time.
   *
   */
  @Input()
  maxLength: number = 10;


  /**
   * Max number of items return at single Match so we do not return 1000 items at single time.
   *
   */
  @Input()
  minLenForSearch: number = 1;


  /**
   * Formatter used to format each selection and selected object for display.
   *
   */
  @Input()
  valueTransformer: (value: any) => string;

  /**
   * Is this multiselect
   *
   */
  @Input()
  multiselect: boolean = true;


  /**
   * By default ChooserDataSource will be created but there is a option to set
   * custom one on application level
   */
  @Input()
  dataSource: ChooserDataSource;


  /**
   * In case we want to change the place where selection is rendered use this appendTo property
   * and it will use DOM operation appendChild() to move selectionView under different parent
   */
  @Input()
  selectionAppendTo: ElementRef;


  @Input()
  delay: number = 300;


  /**
   * Target type to render. Data will be read from the registered DataProvider
   */
  @Input()
  destinationClass: string;


  @Input()
  field: string;


  /**
   * Event fired when user select a item
   */
  @Output()
  onSelection: EventEmitter<any> = new EventEmitter();


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
  @ContentChild('menuItem')
  menuTemplate: TemplateRef<any>;


  @ContentChild('selectionItem')
  selectionTemplate: TemplateRef<any>;

  @ViewChild('autoCompplete')
  autoCompleteComponent: AutoComplete;

  @ViewChild('selectionView')
  selectionViewElem: ElementRef;


  /**
   * When the selection is > max selection, then show hide link.
   */
  private hideLink: string;

  constructor(public env: Environment, private elemementRef: ElementRef,
              @Inject(DATA_SOURCE) private _defaultDS: ChooserDataSource,
              @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);

    if (isBlank(this.placeHolder)) {
      // this.placeHolder = i18n.instant('Widgets.chooser.placeHolder');
      this.placeHolder = 'Search';
    }
    // this.hideLink = i18n.instant('Widgets.chooser.hideSelection');
    this.hideLink = 'Hide';
  }

  ngOnInit() {
    super.ngOnInit();

    if (isBlank(this.dataSource)) {

      this.dataSource = this._defaultDS;
      this.initDatasource();
    }

    if (isPresent(this.formControl) && isPresent(this.formControl.value)) {
      this.dataSource.updateValue(this.formControl.value);
    }

    this.initInternalModel();


    if (this.isStandalone) {
      super.registerFormControl(this.internalChooserModel);
    } else {
      if (isPresent(this.name)) {
        this.formControl = <FormControl> this.formGroup.controls[this.name];
      }
    }
  }

  /**
   * Add Search icon in case of multiselect.
   * todo: Once PrimeNG will provide a template to override default behavior remove it
   *
   */
  ngAfterViewInit() {
    if (!this.dataSource.state.multiselect) {
      return;
    }

    const searchInput = this.elemementRef.nativeElement.querySelector(
      '.ui-autocomplete-input-token');

    if (isPresent(searchInput)) {
      const iconElement = document.createElement('span');
      iconElement.className = 'search-icon-right fa fa-fw fa-search';
      searchInput.appendChild(iconElement);
    }

    if (isPresent(this.selectionAppendTo) && isPresent(this.selectionViewElem)) {
      const parentElem = this.selectionAppendTo instanceof ElementRef ?
        this.selectionAppendTo.nativeElement : this.selectionAppendTo;

      parentElem.appendChild(this.selectionViewElem.nativeElement);
    }
  }

  /**
   * Need to change current behavior since we want to show selection under the chooser. K
   *
   */
  ngAfterViewChecked(): void {
    if (!this.dataSource.state.multiselect) {
      return;
    }

    const tokens = this.elemementRef.nativeElement.querySelectorAll(
      '.ui-autocomplete .ui-autocomplete-token');
    if (isPresent(tokens) && tokens.length > 0) {
      tokens.forEach((item: any) => {
        item.remove();
      });
    }
  }

  /**
   *
   * When value is entered into search box, we ask our DataSource to match this pattern
   * against data repository. It will retrieve all possible matches limited by MaxLen and this
   * is again filtered so it does not include already selected items.
   *
   *  the matched resulted is saved in the: this.dataSource.state.matches
   */
  match(pattern: string): void {
    const maxLen = this.maxLength ? this.maxLength : ChooserDataSource.MaxLength;
    this.dataSource.find(pattern, maxLen);


    // fix: for tests: In version 4 we need to explicitly focus input otherwise autocomplete
    // doesn't give us any popup panel
    if (this.env.inTest && isPresent(this.autoCompleteComponent)) {
      this.autoCompleteComponent.focusInput();
    }
  }


  /**
   *
   * Invoked by Dropdown button in case of single select and here we want to invoke match
   * to retrieve all suggestions without any filter
   *
   */
  onDropdownClick(event: any): void {
    this.match('*');
    setTimeout(() => {
      this.match('*');
    }, 100);
  }

  /**
   *
   * Chooser state is updated  with user selection. Please see writeValue. When do not need
   * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
   * shares the same references so its important that we first save reference to
   * this.chooserState.selectedObjects() and then back to internalChooserModel
   *
   */
  selectItem(item: any): void {
    this.onSelection.emit(this.internalChooserModel);
    this.formControl.setValue(this.internalChooserModel, {emitEvent: true});
    this.formControl.markAsDirty({onlySelf: true});

    this.dataSource.state.addMode = true;

    this.onModelChanged(this.internalChooserModel);
    this.dataSource.state.updatedSelectedObjects(item);

    this.dataSource.state.addMode = true;

    if (!this.dataSource.state.multiselect) {
      this.autoCompleteComponent.inputEL.nativeElement.value =
        this.displayItem(this.internalChooserModel);
    }
  }


  /**
   *
   * Unselect item
   *
   */
  removeValue(item: any): void {
    this.dataSource.state.addMode = true;
    this.dataSource.state.updatedSelectedObjects(item);
    this.dataSource.state.addMode = false;

    this.internalChooserModel = this.dataSource.state.selectedObjects();

    this.onSelection.emit(this.internalChooserModel);
    this.formControl.setValue(this.internalChooserModel, {emitEvent: true});
    this.formControl.markAsDirty({onlySelf: true});

    this.onModelChanged(this.internalChooserModel);


    if (isPresent(this.autoCompleteComponent)) {
      this.autoCompleteComponent.focusInput();
    }

  }

  /**
   *
   * Convert a object if any into the string representation
   *
   * todo: implement better way how to work with objects
   *
   */
  displayItem(item: any) {
    if (isBlank(item)) {
      return null;
    }
    this.dataSource.state.currentItem = item;

    if (isPresent(this.valueTransformer)) {
      return this.valueTransformer(item);

    } else if (isPresent(this.dataSource.lookupKey)) {
      return item[this.dataSource.lookupKey];

    } else {
      return item.toString();
    }
  }

  /**
   *
   * Returns a label that is shown under the selected item when user selection is >
   * MaxRecentSelected
   *
   */
  moreSelectString(): string {
    const moreSelected = this.dataSource.state.selectedObjects().length -
      this.dataSource.state.recentSelectedDisplayed;
    if (moreSelected < 2 && !this.dataSource.state.showAllRecentlySelected) {
      return '';
    }

    if (this.dataSource.state.showAllRecentlySelected) {
      return this.hideLink;
    }
    return `${moreSelected} more selected...`;
  }


  /**
   * In case of multiselect = false check if we want to show a selected value inside the input
   * field
   *
   */
  singleValueSelected(): boolean {
    return !this.dataSource.state && isPresent(this.dataSource.state.currentItem)
      && !this.dataSource.state.addMode;
  }

  hasMenuTemplate(): boolean {
    return isPresent(this.menuTemplate);
  }


  hasSelectionTemplate(): boolean {
    return isPresent(this.selectionTemplate);
  }


  /**
   * Internal. Please see ControlValueAccessor
   * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
   * initialization once we have a value and we only accept []
   *
   *
   * ? Should we do some deeper comparision?
   */
  writeValue(value: any) {
    if (isBlank(value)) {
      return;
    }

    if (isPresent(this.dataSource)) {
      this.dataSource.updateValue(value);
    } else {
      const selState: DefaultSelectionState = new DefaultSelectionState(this.multiselect);
      const chState: ChooserState = new ChooserState(selState, this.multiselect);
      this.initDatasource(chState);

      this.dataSource.updateValue(value);
    }

    this.initInternalModel();
  }

  initDatasource(chooserState?: ChooserState): void {
    assert(isPresent(this.destinationClass),
      'You need to provide destinationClass or custom DataSource');

    this.dataSource.init({
      obj: this.destinationClass,
      queryType: QueryType.FullText,
      lookupKey: this.field,
      state: chooserState,
      multiselect: this.multiselect
    });
  }

  /**
   *
   * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
   * ngModel property
   *
   */
  private initInternalModel(): void {
    if (this.dataSource.state.multiselect) {
      this.internalChooserModel = this.dataSource.state.selectedObjects();
    } else {
      this.internalChooserModel = this.dataSource.state.selectedObject();
    }
    if (isPresent(this.formControl)) {
      this.formControl.setValue(this.internalChooserModel);
    }
  }
}
