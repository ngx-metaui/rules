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
/* tslint:disable:no-unused-variable */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {isPresent, readGlobalParam} from '../../../core/utils/lang';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {ChooserComponent} from './chooser.component';
import {AWChooserModule} from './chooser.module';
import {ChooserDataSource} from './chooser-data-source';
import {DataFinders, QueryType} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';
import {ArrayDataProvider} from '../../core/data/array-data-provider';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('Component: Chooser ', () => {


  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule(
      {
        declarations: [
          TestChooserBasicComponent,
          TestChooserErrorComponent,
          TestChooserRenderComponent,
          TestChooserWCustomTemplComponent,
          TestChooserBasicSingleComponent,
          TestChooserWithDestinationClassComponent,
          TestChooserWithDetachedSelectionComponent
        ],
        imports: [
          AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
          AribaComponentsTestProviderModule.forRoot(),
          NoopAnimationsModule,
          AWChooserModule
        ]
      });

    TestBed.compileComponents();

  });


  it(' should render empty input box when chooser is rendered ',
    () => {

      const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
      fixtureWrapper.detectChanges();


      const chooser = fixtureWrapper.componentInstance.chooser;
      const initValue = chooser.internalChooserModel;

      const dd = fixtureWrapper.nativeElement.querySelector(
        '.ui-autocomplete-input-token > input');


      expect(initValue).toBeDefined();
      expect(dd.value).toEqual('');

    });

  it('should show chooser popup with two choices when I type /bl/', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
    fixtureWrapper.detectChanges();

    sendInput(fixtureWrapper.nativeElement, fixtureWrapper, 'bl');

    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();


    const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-autocomplete-list-item');

    flushMicrotasks();
    flushPendingTimers();

    expect(items.length).toEqual(2);
  }));


  it('should should format each value with custom formatter so it prefix each item with xx-',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
      fixtureWrapper.detectChanges();

      sendInput(fixtureWrapper.nativeElement, fixtureWrapper, 'bl');
      tick();
      fixtureWrapper.detectChanges();

      flushMicrotasks();
      flushPendingTimers();

      const items = fixtureWrapper.nativeElement.querySelectorAll(
        '.ui-autocomplete-list-item');
      expect(items.length).toEqual(2);
      expect(items[0].textContent.indexOf('xx-')).toBeGreaterThan(0);

    }));

  it(' should match /bl/  among values and return list of 2 matches', () => {
    const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
    fixtureWrapper.detectChanges();

    const chooser = fixtureWrapper.componentInstance.chooser;
    chooser.match('bl');

    expect(chooser.dataSource.state.matches.length).toEqual(2);
  });

  it('it should clear search input box when item is selected', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
    fixtureWrapper.detectChanges();


    sendInput(fixtureWrapper.nativeElement, fixtureWrapper, 'bl');

    tick();
    fixtureWrapper.detectChanges();


    flushMicrotasks();
    flushPendingTimers();

    const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-autocomplete-list-item');
    expect(items.length).toEqual(2);

    items[0].click();
    fixtureWrapper.detectChanges();
    tick();


    const input = chooserInput(fixtureWrapper.nativeElement);
    expect(input.value).toEqual('');

    flushMicrotasks();
    flushPendingTimers();

  }));

  it('should render all matches with show more when  SELECTION < MaxRecentSelected',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestChooserBasicComponent);
      fixtureWrapper.detectChanges();


      fixtureWrapper.componentInstance.initValue = ['blue', 'black'];
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      const hasShowMore = fixtureWrapper.nativeElement.querySelector('.more-selected');
      // is closed
      expect(hasShowMore).toBeNull();

    }));


  it('should fail to initialize when dataSource and destination class are missing', () => {
    const fixtureWrapper = TestBed.createComponent(TestChooserErrorComponent);

    expect(() => fixtureWrapper.detectChanges())
      .toThrowError(/You need to provide destinationClass or custom DataSource/);
  });


  it('should render selection with SHOWMORE link when the selection is > MaxRecentSelected',
    () => {
      const fixtureWrapper = TestBed.createComponent(TestChooserRenderComponent);
      fixtureWrapper.detectChanges();

      const hasShowMore = fixtureWrapper.nativeElement
        .querySelector('.ui-autocomplete-list-item');

      // is closed
      expect(hasShowMore).toBeDefined();
    });


  it('should render selection with custom css class tag-circle', () => {

    const fixtureWrapper = TestBed.createComponent(TestChooserWCustomTemplComponent);
    fixtureWrapper.detectChanges();


    const items = fixtureWrapper.nativeElement.querySelectorAll('.tag-circle');
    expect(items.length).toEqual(3);

  });


  it('should show selected value inside actual input box', () => {

    const fixtureWrapper = TestBed.createComponent(TestChooserBasicSingleComponent);
    fixtureWrapper.detectChanges();

    const chooserComponent = fixtureWrapper.componentInstance.chooser;
    chooserComponent.dataSource.state.selectionState.setSelectionState('blue', true);
    fixtureWrapper.detectChanges();

    const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-autocomplete-token-icon');

    expect(items.length).toEqual(0);
  });


  it('should should render data from DataProvider registered under MyInvoice class',
    fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestChooserWithDestinationClassComponent);
      fixtureWrapper.detectChanges();

      sendInput(fixtureWrapper.nativeElement, fixtureWrapper, '11');
      tick();
      fixtureWrapper.detectChanges();

      flushMicrotasks();
      flushPendingTimers();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-autocomplete-list-item');
      expect(items.length).toEqual(2);
    }));


  it('should render selection outside a Chooser. Inside the .selection-test" ',
    fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestChooserWithDetachedSelectionComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();


      const selections = fixtureWrapper.nativeElement
        .querySelectorAll('.selection-test .w-chooser-selections .ui-autocomplete-token');
      expect(selections).toBeDefined();
      expect(selections.length).toBe(1);
    }));


});


enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  ArrowUp = 38,
  ArrowDown = 40
}


function sendKeyDownEvent(debugElement: any, key: number) {
  const event = {
    which: key, preventDefault: () => {
    }
  };
  debugElement.triggerEventHandler('keydown', event);
}


function chooserInput(nativeElement: any) {
  const input = nativeElement.querySelector('.ui-autocomplete-input-token > input');

  return isPresent(input) ? input : nativeElement.querySelector('.ui-autocomplete-dd-input');
}


function sendInput(nativeElement: any, fixture: any, text: string) {
  const inputElement = chooserInput(nativeElement);
  inputElement.value = text;

  inputElement.dispatchEvent(new Event('keydown'));
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('focus'));
}


/**
 * This is workaround to get rid of XX timer(s) still in the queue, as Autocomplete from PrimeNg
 * is using Timers and they are not cleared before tests finishes I get this error
 */
function flushPendingTimers() {

  const zone: any = readGlobalParam('Zone');

  if (isPresent(zone) &&
    isPresent(zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec)) {

    zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec.pendingTimers = [];
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser [formGroup]="formGroup" name="commodity">
    </aw-chooser>
  `
})
class TestChooserErrorComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {

  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser
      [(ngModel)]="initValue"
      name="commodity" [multiselect]="multiselect"
      [delay]="delay"
      [dataSource]="ds"
      [valueTransformer]="formatValue"
    >
    </aw-chooser>
  `
})
class TestChooserBasicComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  initValue: any[] = [];
  list = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive',
    'Aqua', 'Purple', '2Purple', '3Purple', '4Purple', '5Purple', '6Purple'
  ];

  ds: ChooserDataSource;
  delay = 0;
  formGroup: FormGroup = new FormGroup({});

  multiselect = true;

  constructor(private data: DataProviders, private finders: DataFinders) {

  }


  ngOnInit() {

    this.ds = new ChooserDataSource(this.data, this.finders);

    this.ds.init({
      obj: this.list, queryType: QueryType.FullText, state: null,
      multiselect: this.multiselect
    });


  }

  formatValue(value: any): string {
    return 'xx-' + value;
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser [formGroup]="formGroup" name="commodity"
                [delay]="delay"
                [valueTransformer]="formatValue"
                [dataSource]="ds">
    </aw-chooser>
  `
})
class TestChooserBasicSingleComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  list = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive',
    'Aqua', 'Purple', '2Purple', '3Purple', '4Purple', '5Purple', '6Purple'
  ];


  delay = 0;
  formGroup: FormGroup = new FormGroup({});

  multiselect = false;
  ds: ChooserDataSource;


  constructor(private data: DataProviders, private finders: DataFinders) {
  }

  ngOnInit() {
    this.ds = new ChooserDataSource(this.data, this.finders);

    this.ds.init({
      obj: this.list, queryType: QueryType.FullText, state: null,
      multiselect: this.multiselect
    });
  }

  formatValue(value: any): string {
    return 'xx-' + value;
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser [formGroup]="formGroup" name="commodity" [multiselect]="multiselect"
                [delay]="delay"
                [valueTransformer]="formatValue"
                [dataSource]="ds">
    </aw-chooser>
  `
})
class TestChooserRenderComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;


  list = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive',
    'Aqua', 'Purple', '2Purple', '3Purple', '4Purple', '5Purple', '6Purple'
  ];
  ds: ChooserDataSource;
  delay = 0;
  formGroup: FormGroup = new FormGroup({});
  multiselect = true;

  constructor(private data: DataProviders, private finders: DataFinders) {
  }

  ngOnInit() {
    this.ds = new ChooserDataSource(this.data, this.finders);

    this.ds.init({
      obj: this.list, queryType: QueryType.FullText, state: null,
      multiselect: this.multiselect
    });

    this.ds.state.selectionState.selectedObjects().push('black');
    this.ds.state.selectionState.selectedObjects().push('blue');
    this.ds.state.selectionState.selectedObjects().push('yellow');
    this.ds.state.selectionState.selectedObjects().push('orange');
    this.ds.state.selectionState.selectedObjects().push('white');
    this.ds.state.selectionState.selectedObjects().push('Green');
    this.ds.state.selectionState.selectedObjects().push('Olive');
  }

  formatValue(value: any): string {
    return 'xx-' + value;
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser #chooser [formGroup]="formGroup" name="commodity"
                [delay]="delay"
                [valueTransformer]="formatValue"
                [dataSource]="ds">
      <ng-template #menuItem let-item>
                <span>
                    <i class="fa fa-envira "></i>
                    CUSTOM-{{item}}
                </span>
      </ng-template>
      <ng-template #selectionItem let-item>
                <span class="tag tag-circle">
                    item: {{item }}
                    <i class="fa fa-close" (click)="chooser.removeValue(item)"></i>
                </span>
      </ng-template>
    </aw-chooser>
  `
})
class TestChooserWCustomTemplComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  list = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive',
    'Aqua', 'Purple', '2Purple', '3Purple', '4Purple', '5Purple', '6Purple'
  ];


  delay = 0;
  formGroup: FormGroup = new FormGroup({});

  multiselect = true;
  ds: ChooserDataSource;

  constructor(private data: DataProviders, private finders: DataFinders) {
  }


  ngOnInit() {
    this.ds = new ChooserDataSource(this.data, this.finders);

    this.ds.init({
      obj: this.list, queryType: QueryType.FullText, state: null,
      multiselect: this.multiselect
    });

    this.ds.state.selectionState.selectedObjects().push('black');
    this.ds.state.selectionState.selectedObjects().push('blue');
    this.ds.state.selectionState.selectedObjects().push('yellow');
  }

  formatValue(value: any): string {
    return 'xx-' + value;
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser [formGroup]="formGroup" name="commodity"
                [delay]="delay"
                [field]="'name'"
                [valueTransformer]="formatValue"
                [destinationClass]="'MyInvoice'">
    </aw-chooser>
  `
})
class TestChooserWithDestinationClassComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  list = [
    new MyInvoice('111'), new MyInvoice('211'), new MyInvoice('3'), new MyInvoice('4'),
    new MyInvoice('5')
  ];


  delay = 0;
  formGroup: FormGroup = new FormGroup({});

  multiselect = false;
  ds: ChooserDataSource;


  constructor(private data: DataProviders, private finders: DataFinders) {
    data.register(MyInvoice, new ArrayDataProvider(this.list));
  }

  ngOnInit() {

  }

  formatValue(value: MyInvoice): string {
    return value.name;
  }
}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-chooser name="commodity"
                [delay]="delay"
                [field]="'name'"
                [(ngModel)]="selections"
                [selectionAppendTo]="mySelection"
                [valueTransformer]="formatValue"
                [destinationClass]="'MyInvoice'">
    </aw-chooser>

    <span class="selection-test" #mySelection>

    </span>
  `
})
class TestChooserWithDetachedSelectionComponent implements OnInit {
  @ViewChild(ChooserComponent)
  chooser: ChooserComponent;

  list = [
    new MyInvoice('111'), new MyInvoice('211'), new MyInvoice('3'), new MyInvoice('4'),
    new MyInvoice('5')
  ];

  selections: any[] = [];

  delay = 0;

  multiselect = false;
  ds: ChooserDataSource;


  constructor(private data: DataProviders, private finders: DataFinders) {
    data.register(MyInvoice, new ArrayDataProvider(this.list));

    this.selections.push(this.list[0]);
  }

  ngOnInit() {

  }

  formatValue(value: MyInvoice): string {
    return value.name;
  }
}

class MyInvoice {

  constructor(public name: string) {
    this.name = name;
  }
}

