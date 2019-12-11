/**
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
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormFieldControl} from '../form-control';
import {NgControl, NgForm} from '@angular/forms';
import {ComboboxComponent as FdComboBoxComponent} from '@fundamental-ngx/core';

import {BaseInput} from '../base.input';
import {ComboBoxDataSource, isDataSource} from '../../domain/data-source';
import {Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ArrayComboBoxDataSource} from '../../domain/array-data-source';
import {isJsObject} from '../../utils/lang';

type FdpComboBoxDataSource<T> = ComboBoxDataSource<T> | T[];


/**
 * Basic ComboBox implementation including datasource based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Data-Components-Standard-for-Enterprise-scale
 * documents.
 *
 *
 *
 */
@Component({
  selector: 'fdp-combo-box',
  templateUrl: 'combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: FormFieldControl, useExisting: ComboBoxComponent, multi: true}
  ]
})
export class ComboBoxComponent extends BaseInput {

  @Input()
  maxHeight: string = '250px';


  @Input()
  get dataSource(): FdpComboBoxDataSource<any> {
    return this._dataSource;
  }

  set dataSource(value: FdpComboBoxDataSource<any>) {
    this.initializeDS(value);
  }

  /**
   * Todo: Name of the entity for which DataProvider will be loaded. You can either pass list of
   * items or use this entityClass and internally we should be able to do lookup to some registry
   * and retrieve the best matching DataProvider that is set on application level
   *
   *
   */
  @Input()
  entityClass: string;

  @ViewChild(FdComboBoxComponent, {static: true, read: ElementRef})
  protected _elementRef: ElementRef;

  @ViewChild(FdComboBoxComponent, {static: true})
  protected _comboBox: FdComboBoxComponent;

  /**
   * Fill in popover values.
   */
  _suggestions: Array<any>;

  /**
   * Sets if we deal with primitive string or object
   */
  elementTypeIsObject = false;

  protected _dataSource: FdpComboBoxDataSource<any>;
  private _dsSubscription: Subscription | null;


  constructor(protected _cd: ChangeDetectorRef,
              private _renderer: Renderer2,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm) {


    super(_cd, ngControl, ngForm);
  }


  ngOnInit(): void {
    if (this.dataSource && this.entityClass) {
      throw new Error('You can either set dataSource or entityClass not both.');
    }
  }


  private initializeDS(ds: FdpComboBoxDataSource<any>): void {
    this._suggestions = [];

    if (isDataSource(this.dataSource)) {
      this.dataSource.close();

      if (this._dsSubscription) {
        this._dsSubscription.unsubscribe();
        this._dsSubscription = null;
      }
    }
    // Convert whatever comes in as DataSource so we can work with it identically
    this._dataSource = this.openDataStream(ds);
  }


  /**
   * FD combo is missing ID and name therefore we need to use render to set it manually
   */
  ngAfterViewInit(): void {
    if (this._elementRef && this.id) {
      this._renderer.setAttribute(this.input(), 'id', this.id);
      this._renderer.setAttribute(this.input(), 'name', this.name);
    }

    this.patchQueryMethod();
    super.ngAfterViewInit();
  }


  writeValue(value: any): void {
    super.writeValue(value);

    // Hack: force child to refresh to child since they dont use onPush, cna be removed in new
    // fd version as they call internally markForCheck
    setInterval(() => {
      this._cd.markForCheck();
    }, 200);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    if (isDataSource(this.dataSource)) {
      this.dataSource.close();
    }
    if (this._dsSubscription) {
      this._dsSubscription.unsubscribe();
    }
  }


  onContainerClick(event: MouseEvent): void {
    if (this._elementRef && !this.focused) {
      this.input().focus();
    }
  }

  private openDataStream(ds: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> {
    const initDataSource = this.toDataStream(ds);

    if (initDataSource === undefined) {
      throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
    }
    /**
     * This is single point of data entry to the component. We dont want to set data on different
     * places. If any new data comes in either you do a search and you want to pass initial data
     * its here.
     */
    this._dsSubscription = initDataSource.open().pipe(
      takeUntil(this._destroyed)
    ).subscribe(data => {
      this._suggestions = data || [];

      this.elementTypeIsObject = isJsObject(this._suggestions[0]);
      this.stateChanges.next();
      this._cd.markForCheck();
    });
    initDataSource.dataProvider.setLookupKey(this.lookupKey);

    // initial data fetch
    initDataSource.match('*');
    return initDataSource;
  }

  private toDataStream(ds: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> {
    if (isDataSource(ds)) {
      return ds;
    } else if (Array.isArray(ds)) {
      // default implementation to work on top of arrays
      return new ArrayComboBoxDataSource<any>(ds);
    }
    return undefined;
  }

  /**
   * Patching query with our custom lookup logic
   */
  private patchQueryMethod() {
    if (this._comboBox) {
      this._comboBox.handleSearchTermChange = () => {
        this.ds.match(this._comboBox.inputTextValue);
      };
    }
  }

  protected get ds(): ComboBoxDataSource<any> {
    return (<ComboBoxDataSource<any>>this.dataSource);
  }

  // bindings as functions
  // @formatter:off
  displayFn = (value: any) => {
    return this.displayValue(value);
  }
  // @formatter:off

}

