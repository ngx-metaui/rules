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
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Environment} from '../../../core/config/environment';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {CheckBoxListComponent} from './check-box-list.component';
import {AWCheckBoxListModule} from './check-box-list.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';

describe('Checkbox List ', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCBListBasicBehaviorComponent
      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWCheckBoxListModule
      ]
    });

  });

  it('it should have defined formGroup and name, and after ngInit internal model needs to be ' +
    'initialized ', () => {
    let fixtureWrapper = TestBed.createComponent(TestCBListBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.checkboxList.name).toBeDefined();
    expect(fixtureWrapper.componentInstance.checkboxList.disabled).toBeFalsy();
  });

  it('it should correctly init model from selections bindings ', () => {

    let fixtureWrapper = TestBed.createComponent(TestCBListBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.checkboxList.selections.length)
      .toEqual(fixtureWrapper.componentInstance.selectedValues.length);

  });


  it(' it shoudl render N- checkboxes equals to checkBoxListValues ', () => {

    let fixtureWrapper = TestBed.createComponent(TestCBListBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-chkbox');

    expect(items.length).toEqual(fixtureWrapper.componentInstance.checkBoxListValues.length);


  });

  it('it should rendered checked checkboxes for those values that are in selections' +
    ' (selectedValues) ', fakeAsync(() => {

    let fixtureWrapper = TestBed.createComponent(TestCBListBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();

    let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-chkbox input');

    let checkedCount = 0;
    for (let item of items) {
      if (item.checked) {
        checkedCount++;
      }
    }

    expect(checkedCount).toEqual(fixtureWrapper.componentInstance.selectedValues.length);
  }));

  it('when a checkbox is clicked it should update a global FormGroup model to result 5' +
    ' selected', fakeAsync(() => {


    let fixtureWrapper = TestBed.createComponent(TestCBListBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.checkboxList.formGroup.value['myColors'].length)
      .toEqual(fixtureWrapper.componentInstance.selectedValues.length);

    let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-chkbox input');
    items[2].click();  // lets click on 3th item since we know this one is not selected

    tick();
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.checkboxList.formGroup.value['myColors'].length)
      .toEqual(5);

  }));


});

@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-checkbox-list [list]="checkBoxListValues" [selections]="selectedValues"
                      [name]="'myColors'" (onSelection)="onCBClick">
    </aw-checkbox-list>
  `

})
class TestCBListBasicBehaviorComponent {
  @ViewChild(CheckBoxListComponent)
  checkboxList: CheckBoxListComponent;


  checkBoxListValues: string[] = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive', 'Aqua', 'Purple'
  ];

  selectedValues: string[] = ['blue', 'Olive', 'Aqua', 'Purple'];


  formGroup: FormGroup = new FormGroup({});

  constructor(public env: Environment) {
  }


  onCBClick(event: any): void {

  }

}

/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table [formGroup]="formGroup">

      <aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
        <aw-checkbox-list [list]="checkBoxListValues"
                          [selections]="selectedValues" (onSelection)="onCBClick">
        </aw-checkbox-list>
      </aw-form-row>
    </aw-form-table>

  `
})
  /* jshint ignore:end */
class TestCBBListContainerBehaviorComponent {
  @ViewChild(CheckBoxListComponent)
  checkboxList: CheckBoxListComponent;

  checkBoxListValues: string[] = [
    'blue', 'red', 'yellow', 'orange', 'white', 'silver', 'black', 'Green', 'Gray', 'Navy',
    'Olive', 'Aqua', 'Purple'
  ];

  selectedValues: string[] = ['blue', 'Olive', 'Aqua', 'Purple'];


  formGroup: FormGroup = new FormGroup({});


  onCBClick(event: any): void {
  }
}

