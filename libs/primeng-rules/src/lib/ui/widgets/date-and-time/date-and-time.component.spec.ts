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
import {DateAndTimeComponent} from './date-and-time.component';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {AWDateAndTimeModule} from './data-and-time.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {isPresent, readGlobalParam} from '../../core/utils/lang';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';

describe('Component: DateAndTime', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDateTimeBasicBehaviorComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        AWDateAndTimeModule,
        NoopAnimationsModule,
        AWFormTableModule
      ]
    });

    TestBed.compileComponents();

  });

  it('should instantiate and have default values for value, formatPattern, showTime,' +
    ' showDate, name, editing', () => {

    const fixtureWrapper = TestBed.createComponent(TestDateTimeBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.dateTime.formatPattern).toEqual('mm/dd/yy');
    expect(fixtureWrapper.componentInstance.dateTime.showDate).toBeTruthy();
    expect(fixtureWrapper.componentInstance.dateTime.showTime).toBeFalsy();
    expect(fixtureWrapper.componentInstance.dateTime.name).toEqual('bbdd');
    expect(fixtureWrapper.componentInstance.dateTime.editable).toBeTruthy();
    expect(fixtureWrapper.componentInstance.dateTime.disabled).toBeFalsy();

  });

  it('should show date popup when showDate is TRUE and input is clicked',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestDateTimeBasicBehaviorComponent);
      fixtureWrapper.detectChanges();

      const items = fixtureWrapper.nativeElement.querySelector('.pi-calendar');
      items.click();

      tick();
      fixtureWrapper.detectChanges();
      const item = fixtureWrapper.nativeElement.querySelector('.ui-datepicker-calendar');
      expect(item).toBeDefined();

    }));


  it('should change the date value when date is clicked', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestDateTimeBasicBehaviorComponent);
    fixtureWrapper.detectChanges();


    const currentDay = fixtureWrapper.componentInstance.dateTime.value.getDate();
    const item = fixtureWrapper.nativeElement.querySelector('.pi-calendar');
    item.click();

    tick();
    fixtureWrapper.detectChanges();

    const children = fixtureWrapper.nativeElement.querySelectorAll('a.ui-state-default')[7];
    children.click();

    tick();
    fixtureWrapper.detectChanges();

    const changedDay = fixtureWrapper.componentInstance.dateTime.value.getDate();
    expect(changedDay).not.toEqual(currentDay);

    flushMicrotasks();
    flushPendingTimers();
  }));


});


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-date-time [value]="date" [editable]="editable" [name]="'bbdd'">
    </aw-date-time>

  `
})
  /* jshint ignore:end */
class TestDateTimeBasicBehaviorComponent {
  @ViewChild(DateAndTimeComponent)
  dateTime: DateAndTimeComponent;

  editable = true;
  showTime = true;

  date: Date = new Date();


  constructor() {
    this.date.setFullYear(2016, 10, 3);
    this.date.setHours(10, 10, 10);
  }
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table>
      <aw-form-row [label]="'My birthdate'" [name]="'birthDate'" [size]="'small'">
        <aw-date-time [value]="date" [editable]="true" [showTime]="showTime">
        </aw-date-time>
      </aw-form-row>
    </aw-form-table>

  `
})
  /* jshint ignore:end */
class TestDTContainerBehaviorComponent {
  @ViewChild(DateAndTimeComponent)
  dateTime: DateAndTimeComponent;

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
