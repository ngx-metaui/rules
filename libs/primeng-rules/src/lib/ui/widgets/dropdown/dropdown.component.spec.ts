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
import {Component, ViewChild} from '@angular/core';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {DropdownComponent} from './dropdown.component';
import {isPresent, readGlobalParam} from '../../core/utils/lang';
import {AWDropdownModule} from './dropdown.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';
import {MetaUIRulesModule} from '@ngx-metaui/rules';


describe('Describe dropdown menu behavior', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDDInstantiationComponent,
        TestDDInstantiationWithSelItemComponent,
        TestDDWithNgModelComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWDropdownModule,
        NoopAnimationsModule
      ]
    });

    TestBed.compileComponents();

  });

  it('It should should have non null formControl', () => {

    const fixtureWrapper = TestBed.createComponent(TestDDInstantiationComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.dropDown.editable).toEqual(true);
    expect(fixtureWrapper.componentInstance.dropDown.disabled).toBeFalsy();
    expect(fixtureWrapper.componentInstance.dropDown.formControl).toBeDefined();
    expect(fixtureWrapper.componentInstance.dropDown.name).toBeDefined();
  });


  it('It should have selected Item set when using binding selection', () => {

    const largeLst = '<aw-dropdown name="asdf" [list]="testItemSmall"' +
      ' [selection]="itemSelected" ' +
      '   (onSelection)="onSelection($event)">' +
      '</aw-dropdown>';
    TestBed.overrideComponent(TestDDInstantiationComponent, {set: {template: largeLst}});


    const fixtureWrapper = TestBed.createComponent(TestDDInstantiationComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.dropDown.selection).toEqual('view');

  });


  it('it should propagate the selection back to TestDDInstantiationComponent using onSelection ',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestDDInstantiationComponent);
      fixtureWrapper.detectChanges();


      const dd = fixtureWrapper.nativeElement.querySelector('.w-dropdown .ui-dropdown');
      dd.click();

      tick();
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-dropdown-item ');
      expect(items.length).toEqual(2);

      items[1].click();
      tick();
      fixtureWrapper.detectChanges();

      flushMicrotasks();
      flushPendingTimers();
      expect(fixtureWrapper.componentInstance.dropDown.selection).toEqual('edit');
      expect(fixtureWrapper.componentInstance.itemSelected).toEqual('edit');

    }));


  it(' should render a list with preselected  item when using both bindings list and selection',
    fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestDDInstantiationWithSelItemComponent);

      fixtureWrapper.detectChanges();
      tick();

      const item = fixtureWrapper.nativeElement.querySelector('label.ui-dropdown-label');
      expect(item.textContent.trim()).toEqual('Monday');
    }));


  it(' must be able to initialize selection using ngModel', () => {
    const fixtureWrapper = TestBed.createComponent(TestDDWithNgModelComponent);
    fixtureWrapper.detectChanges();


    const item = fixtureWrapper.nativeElement.querySelector('label.ui-dropdown-label');
    expect(item.textContent.trim()).toEqual('view');
  });

});


@Component({
  selector: 'wrapper-comp',
  template: '<aw-dropdown name="sdsds" [list]="testItemSmall"' +
    ' (onSelection)="onSelection($event)"></aw-dropdown>'
})
class TestDDInstantiationComponent {
  @ViewChild(DropdownComponent)

  dropDown: DropdownComponent;

  testItemSmall: string[] = ['view', 'edit'];

  testItemLarge: string[] = [
    'view', 'edit', 'frank', 'kolar', 'The Sun', 'Dog', 'Computer', 'A Desk', 'My Car',
    'Pencil',
    'This Page', 'Yesterday', 'Monday', 'Tuesday', 'BMW R1200 GS', 'Czech Republic', 'Last Item'
  ];


  itemSelected: string = 'view';
  itemSelectedLg: string = 'Monday';

  noselString: string = '(no selection)';


  onSelection(event: any): void {
    this.itemSelected = event;

  }
}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-dropdown name="sdsds1" [list]="list" [selection]="selection" >' +
    '</aw-dropdown>'
})
class TestDDInstantiationWithSelItemComponent {
  @ViewChild(DropdownComponent)

  dropDown: DropdownComponent;

  list: string[] = [
    'view', 'edit', 'frank', 'kolar', 'Monday', 'Dog', 'Computer', 'A Desk', 'My Car',
    'Pencil'
  ];


  selection: string = 'Monday';

}


@Component({
  selector: 'wrapper-comp',
  template: '<aw-dropdown name="asf" [list]="testItemSmall"' +
    ' [(ngModel)]="itemSelected"></aw-dropdown>'
})
class TestDDWithNgModelComponent {
  @ViewChild(DropdownComponent)
  dropDown: DropdownComponent;

  testItemSmall: string[] = ['view', 'edit'];

  itemSelected: string = 'view';

  onSelection(event: any): void {
    this.itemSelected = event;

  }
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
