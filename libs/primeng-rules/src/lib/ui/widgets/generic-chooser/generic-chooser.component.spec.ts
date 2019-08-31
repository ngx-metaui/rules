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
import {Component, ViewChild} from '@angular/core';
import {GenericChooserComponent} from './generic-chooser.component';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormGroup} from '@angular/forms';
import {isPresent, readGlobalParam} from '../../core/utils/lang';
import {AWGenericChooserModule} from './generic-chooser.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Environment, MetaUIRulesModule, MetaUITestRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';


describe('Component: GenericChooser', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestGCCheckBoxComponent,
        TestGCRadioComponent,
        TestGCDDComponent
      ],
      imports: [
        MetaUITestRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        AWGenericChooserModule,
        NoopAnimationsModule
      ]
    });

    TestBed.compileComponents();

  });

  describe('Component: GenericChooser that renders checkbox list', () => {

    it('should default with correct values ', () => {


      const fixtureWrapper = TestBed.createComponent(TestGCCheckBoxComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Checkbox');
      expect(fixtureWrapper.componentInstance.genericChooser.multiselect).toBeTruthy();
      expect(fixtureWrapper.componentInstance.env.currentForm).toBeDefined();
    });


    it('should render CheckboxList', () => {
      const fixtureWrapper = TestBed.createComponent(TestGCCheckBoxComponent);
      fixtureWrapper.detectChanges();

      const dd = fixtureWrapper.nativeElement.querySelector('aw-checkbox-list');

      expect(dd).toBeDefined();
    });


    it('should derive a type if none is passed in', () => {

      const largeLst = `
             <aw-generic-chooser
                    [list]="list" [key]="'selection'" [multiselect]="multiselect"
                    [name]="'ssssss'" >
            </aw-generic-chooser>
`;
      TestBed.overrideComponent(TestGCCheckBoxComponent, {set: {template: largeLst}});


      const fixtureWrapper = TestBed.createComponent(TestGCCheckBoxComponent);
      fixtureWrapper.detectChanges();


      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Checkbox');
    });


    it('should set value /Yesterday/ when clicking on the first checkbox', fakeAsync(() => {


      const fixtureWrapper = TestBed.createComponent(TestGCCheckBoxComponent);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      const list = fixtureWrapper.nativeElement.querySelectorAll('.ui-chkbox input');

      list[0].click();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.selection[0]).toEqual('Yesterday');

    }));

  });

  describe('Component: GenericChooser that renders Radio button list', () => {


    beforeEach(() => {

    });

    it('should default with correct values ', () => {

      const fixtureWrapper = TestBed.createComponent(TestGCRadioComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Radio');
      expect(fixtureWrapper.componentInstance.genericChooser.multiselect).toBeFalsy();
      expect(fixtureWrapper.componentInstance.env.currentForm).toBeDefined();
    });


    it('should render Radio button LIST', () => {

      const fixtureWrapper = TestBed.createComponent(TestGCRadioComponent);
      fixtureWrapper.detectChanges();

      const dd = fixtureWrapper.nativeElement.querySelector('aw-radiobutton-list');

      expect(dd).toBeDefined();
    });


    it('should derive a type if none is passed in', () => {


      const largeLst = `
     <aw-generic-chooser [list]="list" [key]="'selection'" [name]="'ssssss'" >
    </aw-generic-chooser>
`;
      TestBed.overrideComponent(TestGCCheckBoxComponent, {set: {template: largeLst}});


      const fixtureWrapper = TestBed.createComponent(TestGCRadioComponent);
      fixtureWrapper.detectChanges();


      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Radio');
    });


    it('should set value /Yesterday/ when clicking on the first checkbox', fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestGCRadioComponent);
      fixtureWrapper.detectChanges();

      const list = fixtureWrapper.nativeElement.querySelectorAll('.ui-radiobutton-box');
      list[0].click();
      fixtureWrapper.detectChanges();
      tick();


      expect(fixtureWrapper.componentInstance.selection).toEqual('Yesterday');

    }));

  });


  describe('Component: GenericChooser that renders DropDown button list', () => {

    beforeEach(() => {

    });

    it('should default with correct values ', () => {

      const fixtureWrapper = TestBed.createComponent(TestGCDDComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Dropdown');
      expect(fixtureWrapper.componentInstance.genericChooser.multiselect).toBeFalsy();
      expect(fixtureWrapper.componentInstance.env.currentForm).toBeDefined();
    });


    it('should render Radio button LIST', () => {

      const fixtureWrapper = TestBed.createComponent(TestGCDDComponent);
      fixtureWrapper.detectChanges();

      const dd = fixtureWrapper.nativeElement.querySelector('aw-dropdown');

      expect(dd).toBeDefined();
    });


    it('should derive a type if none is passed in', () => {


      const largeLst = `
     <aw-generic-chooser [list]="list" [key]="'selection'" [noSelectionString]="'no value'"
            [name]="'ssssss'" >
    </aw-generic-chooser>
`;
      TestBed.overrideComponent(TestGCCheckBoxComponent, {set: {template: largeLst}});


      const fixtureWrapper = TestBed.createComponent(TestGCDDComponent);
      fixtureWrapper.detectChanges();


      expect(fixtureWrapper.componentInstance.genericChooser.type).toEqual('Dropdown');
    });


    it('should set value /Monday/ when clicking on the first Dropdown item', fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestGCDDComponent);
      fixtureWrapper.detectChanges();

      const dd = fixtureWrapper.nativeElement.querySelector('.ui-dropdown');
      dd.click();

      tick();
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-dropdown-item ');
      items[1].click();
      tick();
      fixtureWrapper.detectChanges();


      flushPendingTimers();
      expect(fixtureWrapper.componentInstance.selection).toEqual('Monday');

    }));


  });
});


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-generic-chooser
      [list]="list" [key]="'selection'" [type]="'Checkbox'" [multiselect]="multiselect"
      [name]="'ssssss'">
    </aw-generic-chooser>
  `
})
class TestGCCheckBoxComponent {
  @ViewChild(GenericChooserComponent, {static: false})
  genericChooser: GenericChooserComponent;

  list: string[] = ['Yesterday', 'Monday', 'Tuesday', 'BMW R1200 GS'];

  selection: any;

  multiselect = true;


  constructor(public env: Environment) {

  }


}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-generic-chooser [list]="list" [key]="'selection'" [type]="'Radio'" [name]="'ssssss'">
    </aw-generic-chooser>
  `
})
class TestGCRadioComponent {
  @ViewChild(GenericChooserComponent, {static: false})
  genericChooser: GenericChooserComponent;

  list: string[] = ['Yesterday', 'Monday', 'Tuesday', 'BMW R1200 GS'];

  selection: any;


  formGroup: FormGroup = new FormGroup({});

  constructor(public env: Environment) {

  }


}


@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-generic-chooser
      [list]="list" [key]="'selection'" [type]="'Dropdown'" [name]="'ssssss'">
    </aw-generic-chooser>
  `
})
class TestGCDDComponent {
  @ViewChild(GenericChooserComponent, {static: false})
  genericChooser: GenericChooserComponent;
  list: string[] = ['Yesterday', 'Monday', 'Tuesday', 'BMW R1200 GS'];
  selection: any;
  formGroup: FormGroup = new FormGroup({});


  constructor(public env: Environment) {

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
