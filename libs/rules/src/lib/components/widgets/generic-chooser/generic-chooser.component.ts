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
  forwardRef,
  Inject,
  Input,
  Optional,
  SkipSelf,
  ViewContainerRef
} from '@angular/core';
import {equals, isArray, isBlank, isFunction, isPresent} from '../../../core/utils/lang';
import {ListWrapper} from '../../../core/utils/collection';
import {Environment} from '../../../core/config/environment';
import {ChooserSelectionState} from '../chooser/chooser-selection-state';
import {ChooserState} from '../chooser/chooser-state';
import {BaseFormComponent} from '../../core/base-form.component';
import {ChooserDataSource} from '../chooser/chooser-data-source';
import {DATA_SOURCE} from '../../core/data/data-source';
import {DataFinders, QueryType} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';
import {FieldPath} from '../../../core/utils/field-path';


/**
 * Convenient wrapper class around controls such as radiobuttons, dropdown, checkboxes,
 * Chooser. The type of the chooser may be determined dynamically based on the number of items in
 * the data source list, or can be specified explicitly via the "type" binding.
 *
 *
 *
 */
@Component({
  selector: 'aw-generic-chooser',
  templateUrl: 'generic-chooser.component.html',
  styleUrls: ['generic-chooser.component.scss'],
  providers: [
    {provide: BaseFormComponent, useExisting: forwardRef(() => GenericChooserComponent)},
    {provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders]}
  ]

})
export class GenericChooserComponent extends BaseFormComponent {

  /**
   * Ordered list of items assignable to the key of the object
   */
  @Input()
  list: any[];

  /**
   * The object this control is being assigned to.
   */
  @Input()
  object: any;


  /**
   * The key field path this control is being assigned to.
   */
  @Input()
  key: string;


  /**
   * Can be used in place of LIST binding to retrieve a list based on the ChoiceSource
   *
   */
  @Input()
  destinationClass: string;


  /**
   * Used when retrieving choiceSource by destination class and this are extra params that can be
   * used to narrow the matching or to pass parameters into ChoiceSource provider
   */
  @Input()
  choiceProviderParams: Map<string, any>;


  /**
   *  Is this a List property, or a to-one.
   */
  @Input()
  multiselect: boolean = false;

  /**
   *  The style of chooser to use (Radio, Checkbox, Dropdown, Chooser)
   *  Defaults based on cardinality of the list and whether it's multiSelect.
   */
  @Input()
  type: string;

  /**
   * Support custom key. in order to make this work we need to introduce custom <templates> for
   * all this chooser types
   */
  @Input()
  displayKey: string;

  // /**
  //  *  Should we attempt a match as they type (against the full list)
  //  */
  // @Input()
  // allowFullMatchOnInput: boolean;

  /**
   * String rendered as first value in the dropdown which let the user to make 'no selection'
   * from available list of values. When this option is active and use make this selection we
   * save a NULL value
   */
  @Input()
  noSelectionString: string;


  /**
   * Generic Chooser works directly with object and its references and we need to create this
   * keypath to be able to set/get value from target or parent object
   */
  keyPath: FieldPath;


  constructor(public env: Environment, private _viewContainer: ViewContainerRef,
              @Inject(DATA_SOURCE) public dataSource: ChooserDataSource,
              @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }


  ngOnInit() {
    super.ngOnInit();

    if (isBlank(this.object)) {
      this.object = (<any>this._viewContainer.injector).view.context;
    }
    this.keyPath = new FieldPath(this.key);
    let defaultDataProvider = null;

    if (isPresent(this.list)) {
      defaultDataProvider = this.dataSource.dataProviders.find(this.list);
    } else {
      defaultDataProvider = this.dataSource.dataProviders.find(this.destinationClass);
    }

    const projectedSize = defaultDataProvider.expectedCount(this.choiceProviderParams);
    this.initType(projectedSize);

    if (this.type === 'Chooser') {

      this.dataSource.init({
        dataProvider: defaultDataProvider,
        queryType: QueryType.FullText,
        lookupKey: this.displayKey,
        state: new ChooserState(new GCChooserState(this), this.multiselect),
        multiselect: this.multiselect
      });
    } else {

      // do we need to read this value in async?
      this.list = defaultDataProvider.data();
    }
    super.registerFormControl(this.selection);
    this.validateRequired();

    if (isBlank(this.selection)) {
      // this.noSelectionString = this.i18n.instant('Widgets.gchooser.noSelString');
      this.noSelectionString = 'Select a Item';
    }
  }

  /**
   *
   * When @Input type is not passed we try to guess and select the best type for current data
   *
   */
  private initType(projectedSize: number) {
    if (isBlank(this.type)) {
      if (this.multiselect) {
        this.type = (projectedSize <= 0 || projectedSize > 8) ? 'Chooser' : 'Checkbox';
      } else {
        this.type = (projectedSize <= 0 || projectedSize > 20) ? 'Chooser'
          : (projectedSize < 6) ? 'Radio' :
            'Dropdown';
      }
    }
  }

  /**
   * There are certain properties which are required by this component. As already mentioned
   * above GenericChooser works with references and thefore two key properties are object and key
   * so we can access an object
   *
   *
   */
  private validateRequired() {
    if (isBlank(this.object)) {
      throw Error('Cannot continue without a object');
    }

    if (isBlank(this.key)) {
      throw Error('Cannot continue without a key binding');
    }
    if (isBlank(this.list) && isBlank(this.destinationClass)) {
      throw Error('Cannot continue without having either list of values or destinationClass');
    }

    if (isPresent(
      this.type) &&
      (this.type !== 'Radio' && this.type !== 'Checkbox' && this.type !== 'Dropdown' &&
        this.type !== 'Chooser')) {
      throw Error('Cannot instantiate GenericChooser  - invalid type');
    }

    if (isBlank(this.displayKey)) {
      this.displayKey = 'toString';
    }
  }

  /**
   *
   * Used when displaying value both from primitive type as well complex object. If you want to
   * control how item is displayed you can provide display key, which is can be a  method or
   * property of the object you are displaying.
   *
   * Todo: think about formatters as well
   *
   */
  displayValue(item: any): string {
    if (isBlank(this.displayKey)) {
      return item;
    }
    const fieldValue = FieldPath.getFieldValue(item, this.displayKey);
    if (isFunction(fieldValue)) {
      return fieldValue.call(item);
    }
    return fieldValue;
  }


  /**
   *  Retrieve a current value from the parent/target object
   *
   */
  get selection(): any {
    return this.keyPath.getFieldValue(this.object);
  }

  /**
   *  set value back to the object
   *
   */
  set selection(value: any) {
    this.keyPath.setFieldValue(this.object, value);
  }


  onSelection(value: any): void {
    this.selection = value;

    this.formControl.setValue(this.selection);
    this.formControl.markAsDirty();

  }
}

/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
export class GCChooserState extends ChooserSelectionState {

  constructor(private gChooser: GenericChooserComponent) {
    super();
  }

  setSelectionState(selection: any, selected: boolean): void {
    if (selected === this.isSelected(selection)) {
      return;
    }

    if (this.gChooser.multiselect) {

      // Check if we can implement smarter and more generic way how we use it in java
      // RelationshipField.addTo(_object, _keyPath, selection);

      let multiRel: Array<any> = this.gChooser.keyPath.getFieldValue(this.gChooser.object);
      if (isBlank(multiRel)) {
        multiRel = [];

      } else if (isPresent(multiRel) && !isArray(multiRel)) {
        throw new Error('I can not store multiselect value into non-array object');
      }

      if (selected) {
        multiRel.push(selection);
        this.gChooser.selection = multiRel;

      } else {
        ListWrapper.removeIfExist(multiRel, selection);
      }

    } else {
      if (!selection) {
        selection = null;
      }
      this.gChooser.selection = selection;

    }
  }

  selectedObject(): any {
    if (this.gChooser.multiselect) {
      const objects = this.selectedObjects();
      return (isBlank(objects) || ListWrapper.isEmpty(objects)) ? null : ListWrapper.last(
        objects);
    }
    return this.gChooser.selection;
  }

  selectedObjects(): Array<any> {
    let selection = this.gChooser.selection;
    if (this.gChooser.multiselect && isBlank(selection)) {
      selection = [];
    }
    return (this.gChooser.multiselect && isArray(selection)) ? selection : [selection];
  }

  isSelected(selection: any): boolean {
    if (this.gChooser.multiselect) {
      return ListWrapper.containsComplex(this.selectedObjects(), selection);
    }
    const curValue = this.selectedObject();
    return equals(curValue, selection);
  }
}
