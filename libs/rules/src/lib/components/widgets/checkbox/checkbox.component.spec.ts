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
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Environment} from '../../../core/config/environment';
import {AribaCoreModule} from '../../../core/ariba.core.module';
import {CheckboxComponent} from './checkbox.component';
import {AWCheckBoxModule} from './check-box.module';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';


describe('Component: Checkbox', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCBBasicWithNgModelComponent,
        TestCBCheckIsBinaryComponent,
        TestCBForActionComponent,
        TestCBBasicWithFormGroupComponent,
        TestCBWithBooleanComponent

      ],
      imports: [
        AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWCheckBoxModule
      ]
    });
  });

  it('renders checkbox group using [(ngModel)] and correctly initialize "model" and "isBinary"',
    () => {
      const fixtureWrapper = TestBed.createComponent(TestCBBasicWithNgModelComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.cb.toArray().length).toEqual(2);
      expect(fixtureWrapper.componentInstance.cb.toArray()[0].type).toEqual('form');
      expect(fixtureWrapper.componentInstance.cb.toArray()[0].isBinary).toEqual(false);


      expect(fixtureWrapper.componentInstance.cb.toArray()[1].type).toEqual('form');
      expect(fixtureWrapper.componentInstance.cb.toArray()[1].isBinary).toEqual(false);

    });


  it('renders checkbox group so thatmain element has class .w-checkbox', () => {
    const fixtureWrapper = TestBed.createComponent(TestCBBasicWithNgModelComponent);
    fixtureWrapper.detectChanges();

    const cbs = fixtureWrapper.nativeElement.querySelectorAll('span.w-checkbox');

    expect(fixtureWrapper.componentInstance.cb.toArray().length).toEqual(2);

  });


  it('should set "isBinary" property to TRUE when boolean value is passed as value', () => {
    const fixtureWrapper = TestBed.createComponent(TestCBCheckIsBinaryComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.cb.isBinary).toEqual(true);
  });


  it('should set "isBinary" property to FALSE when checkbox type is "action"', () => {
    const fixtureWrapper = TestBed.createComponent(TestCBForActionComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.cb.isBinary).toEqual(false);
  });


  it('should set automatically property "type" to "action" value when "action" binding is used',
    () => {

      const fixtureWrapper = TestBed.createComponent(TestCBForActionComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.cb.isFormType()).toEqual(false);
    });


  it('renders checkbox group using [(ngModel)] where first one with value "red" is checked',
    fakeAsync(() => {
      const fixtureWrapper = TestBed.createComponent(TestCBBasicWithNgModelComponent);
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      const cbs = fixtureWrapper.nativeElement.querySelectorAll('.w-checkbox input');
      expect(cbs.length).toEqual(2);

      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      expect(cbs[0].checked).toBeTruthy();
      expect(cbs[1].checked).toBeFalsy();
    }));


  it('renders checkbox group and updates [(ngModel)] when second checkbox is clicked so it will' +
    ' contain two values red and blue', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestCBBasicWithNgModelComponent);
    fixtureWrapper.detectChanges();

    const cbs = fixtureWrapper.nativeElement.querySelectorAll('.w-checkbox label');
    expect(cbs.length).toEqual(2);

    tick();
    fixtureWrapper.detectChanges();
    expect(fixtureWrapper.componentInstance.model.length).toBe(1);

    fixtureWrapper.whenStable().then(() => {
      cbs[1].click();
      tick();
      expect(fixtureWrapper.componentInstance.model.length).toBe(2);
    });

  }));


  it('renders checkbox group where "blue" value is checked using [formGroup]', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestCBBasicWithFormGroupComponent);
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    const cbs = fixtureWrapper.nativeElement.querySelectorAll('.w-checkbox input');
    expect(cbs.length).toEqual(2);

    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    expect(cbs[0].checked).toBeFalsy();
    expect(cbs[1].checked).toBeTruthy();
  }));


  it('triggers event when property "type" is set to "action" and its clicked', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestCBForActionComponent);
    fixtureWrapper.detectChanges();
    const cbs = fixtureWrapper.nativeElement.querySelectorAll('.w-checkbox input');

    fixtureWrapper.detectChanges();
    cbs[0].click();
    tick();

    fixtureWrapper.detectChanges();

    const clicked = fixtureWrapper.componentInstance.clicked;
    expect(clicked).toBeTruthy();
  }));


  it('works with boolean value so that when we set value as FALSE it can set back TRUE when' +
    ' clicked', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestCBWithBooleanComponent);

    tick();
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    const cb = fixtureWrapper.nativeElement.querySelector('.w-checkbox label');

    fixtureWrapper.detectChanges();
    cb.click();

    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();

    const model = fixtureWrapper.componentInstance.model;
    expect(model).toBeTruthy();
  }));
});


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-checkbox [name]="'color'" [value]="'red'" [label]="'Red'"
                 [(ngModel)]="model">
    </aw-checkbox>
    <aw-checkbox [name]="'color'" [value]="'blue'" [label]="'Blue'"
                 [(ngModel)]="model">
    </aw-checkbox>
  `
})
  /* jshint ignore:end */
class TestCBBasicWithNgModelComponent {
  @ViewChildren(CheckboxComponent)
  cb: QueryList<CheckboxComponent>;

  model: string[] = ['red'];

  constructor() {
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <div [formGroup]="env.currentForm">
      <aw-checkbox [name]="'colorx'" [value]="'red'" [label]="'Red'">
      </aw-checkbox>
      <aw-checkbox [name]="'colorx'" [value]="'blue'" [label]="'Blue'">
      </aw-checkbox>
    </div>
  `
})
  /* jshint ignore:end */
class TestCBBasicWithFormGroupComponent implements OnInit {
  @ViewChildren(CheckboxComponent)
  cb: QueryList<CheckboxComponent>;

  model: string[] = ['blue'];

  constructor(public env: Environment) {
  }

  ngOnInit(): void {
    this.env.currentForm = new FormGroup({});
    this.env.currentForm.registerControl('colorx', new FormControl(this.model));
  }
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-checkbox [name]="'ok'" [value]="true" [label]="'Are you ok?'">
    </aw-checkbox>
  `
})
  /* jshint ignore:end */
class TestCBCheckIsBinaryComponent {
  @ViewChild(CheckboxComponent)
  cb: CheckboxComponent;

  constructor() {
  }
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-checkbox [name]="'ok'" [label]="'Confirm'" (action)="actionClicked($event)">
    </aw-checkbox>
  `
})
  /* jshint ignore:end */
class TestCBForActionComponent {
  @ViewChild(CheckboxComponent)
  cb: CheckboxComponent;

  clicked: boolean = false;

  constructor() {
  }

  actionClicked(event: any) {
    this.clicked = true;
  }
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-checkbox [name]="'yesno'" [value]="false" [label]="'Confirm'"
                 [(ngModel)]="model"></aw-checkbox>
  `
})
  /* jshint ignore:end */
class TestCBWithBooleanComponent {
  @ViewChild(CheckboxComponent)
  cb: CheckboxComponent;

  model: boolean = false;

  constructor() {
  }

}
