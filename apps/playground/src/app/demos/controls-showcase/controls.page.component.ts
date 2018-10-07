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
 */
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {
  BaseComponent,
  ChooserDataSource,
  DataFinders,
  DataProviders,
  Environment,
  Money,
  QueryType
} from '@ngx-meta/rules';
import {FormGroup} from '@angular/forms';
import {ApproverUser} from '../../model/approver-user';


@Component({
  templateUrl: './controls.page.component.html',
  styleUrls: ['./controls.page.component.scss']
})
export class ControlsPageComponent extends BaseComponent implements OnInit, AfterViewChecked {
  formGroup: FormGroup = new FormGroup({});
  codeOneColumn: boolean = false;

  val1: string;

  val2: string = 'Option 2';


  myFirstValue: string = 'Test';
  useFiveZone: boolean = true;

  initChooserValues: any[] = [];
  initChooserValuesSingle: string[] = [];
  list = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green',
    'Gray', 'Navy', 'Olive',
    'Aqua', 'Purple', '2Purple', '3Purple', '4Purple', '5Purple', '6Purple'
  ];

  multiselect: boolean = true;
  autoResize: boolean = true;

  initMoney: Money;

  currencies: any[] = ['USD', 'CZK', 'EUR'];

  colors: any[] = ['Blue', 'Red', 'Yello'];
  selectedColor = 'Blue';


  categories: string[] = ['Technology', 'Finance', 'Procurement', 'Marketing'];
  selectedCategories: string[] = ['Marketing'];

  gcSelectionMulti: any;
  gcSelectionSingle: any;

  radioList: string[] = ['Technology', 'Finance', 'Procurement', 'Marketing'];
  rbSelectedValue: string = 'Marketing';


  categoriesObj: Cat[] = [
    new Cat('Technology'), new Cat('Finance'), new Cat('Procurement'),
    new Cat('Marketing')
  ];
  selectedCategoriesObj: Cat[] = [new Cat('Marketing')];


  ds1: ChooserDataSource;
  ds2: ChooserDataSource;

  dateValue: Date = new Date();
  showTime: boolean = true;
  private documentClickListener: any;

  constructor(public env: Environment, private data: DataProviders,
              private finders: DataFinders) {
    super(env);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initMoney = new Money(123);
    this.dateValue.setDate(22);
    this.dateValue.setMonth(5);


    this.ds1 = new ChooserDataSource(this.data, this.finders);
    this.ds1.init({
      obj: ApproverUser, queryType: QueryType.FullText, state: null,
      multiselect: true
    });

    this.ds2 = new ChooserDataSource(this.data, this.finders);
    this.ds2.init({
      obj: this.list, queryType: QueryType.FullText, state: null,
      multiselect: false
    });

  }


  ngAfterViewChecked(): void {
    // console.log(this.env.currentForm.value);
  }

  submitForm(): void {
    console.log(this.env.currentForm.value);
  }
}


export class Cat {


  constructor(public name: string) {

  }

  toString(): string {
    return this.name;
  }
}
