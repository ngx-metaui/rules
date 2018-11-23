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
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RadioButtonComponent} from './/radio-button.component';
import {AWRadioButtonModule} from './radio-button.module';
import {FormControl, FormGroup} from '@angular/forms';
import {AribaComponentsTestProviderModule} from '../../ariba.component.provider.module';
import {MetaUIRulesModule, Environment} from '@ngx-metaui/rules';


describe('Component: Radiobutton', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        TestRBBasicWithFormGroupComponent,
        TestRBBasicWithNgModelComponent,
        TestRBDisabledWithNgModelComponent,
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        AribaComponentsTestProviderModule.forRoot(),
        AWRadioButtonModule
      ]
    });
    TestBed.compileComponents();

  });

  it('renders radio buttons using [(ngModel)] and correctly initialize model', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestRBBasicWithNgModelComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.rb.toArray().length).toEqual(2);
  }));


  it('renders radio buttons so that main element has css class .w-radiobutton', () => {
    TestBed.compileComponents();
    const fixtureWrapper = TestBed.createComponent(TestRBBasicWithNgModelComponent);
    fixtureWrapper.detectChanges();

    const rds = fixtureWrapper.nativeElement.querySelectorAll('span.w-radiobutton');
    expect(rds.length).toEqual(2);
  });


  it('renders two radio buttons using [(ngModel)] where first one with value "red" is checked',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestRBBasicWithNgModelComponent);
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      const rbs = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');
      expect(rbs.length).toEqual(2);

      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      expect(rbs[0].checked).toBeTruthy();
      expect(rbs[1].checked).toBeFalsy();
    }));


  it('renders 2 radio buttons and it should updates [(ngModel)] when second radio is clicked so' +
    ' it will changes the selection value from "red" to "blue" ', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestRBBasicWithNgModelComponent);
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    let rbs = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton label');
    expect(rbs.length).toEqual(2);

    tick();
    fixtureWrapper.detectChanges();

    rbs[1].click();
    tick();
    fixtureWrapper.detectChanges();

    rbs = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');

    expect(rbs[1].checked).toBeTruthy();
    expect(rbs[0].checked).toBeFalsy();

  }));


  it('renders 2 radio buttons using [formGroup] so that "blue" value is checked',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestRBBasicWithFormGroupComponent);
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      const rbs = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');
      expect(rbs.length).toEqual(2);

      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      expect(rbs[0].checked).toBeFalsy();
      expect(rbs[1].checked).toBeTruthy();
    }));


  it('renders 2 radio buttons using [formGroup] where "blue" value is checked and it' +
    ' should propagate change to FormGroup when radio value "red" is clicked',
    fakeAsync(() => {

      const fixtureWrapper = TestBed.createComponent(TestRBBasicWithFormGroupComponent);
      fixtureWrapper.detectChanges();
      tick();
      fixtureWrapper.detectChanges();

      const rbs = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton label');
      let rbsi = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');
      expect(rbs.length).toEqual(2);

      tick();
      fixtureWrapper.detectChanges();
      expect(rbsi[0].checked).toBeFalsy();
      expect(rbsi[1].checked).toBeTruthy();


      rbsi[0].click();
      tick();
      fixtureWrapper.detectChanges();

      rbsi = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');

      expect(rbsi[0].checked).toBeTruthy();
      expect(rbsi[1].checked).toBeFalsy();
    }));

  it('triggers event with current radio value when radio is clicked', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestRBBasicWithFormGroupComponent);
    fixtureWrapper.detectChanges();
    tick();
    fixtureWrapper.detectChanges();

    const rbsl = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton label');
    const rbsi = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');

    rbsl[0].click();
    tick();
    fixtureWrapper.detectChanges();
    expect(fixtureWrapper.componentInstance.modelSet).toBe('red');


  }));


  it('should not change mode when clicking on disabled option', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestRBDisabledWithNgModelComponent);
    fixtureWrapper.detectChanges();
    tick();

    fixtureWrapper.detectChanges();
    tick();
    const rbsl = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton label');
    let rbsi = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');

    // initial state
    expect(rbsi[0].checked).toBeTruthy();
    expect(rbsi[1].checked).toBeFalsy();

    // click on blue
    rbsl[1].click();
    tick();
    fixtureWrapper.detectChanges();

    tick();
    fixtureWrapper.detectChanges();
    rbsi = fixtureWrapper.nativeElement.querySelectorAll('.w-radiobutton input');

    // nothing should be changed
    expect(rbsi[0].checked).toBeTruthy();
    expect(rbsi[1].checked).toBeFalsy();


  }));


});


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-radiobutton [name]="'color'" [value]="'red'" [label]="'Red'"
                    (onChange)="onChange($event)"
                    [(ngModel)]="model">
    </aw-radiobutton>
    <aw-radiobutton [name]="'color'" [value]="'blue'" [label]="'Blue'"
                    (onChange)="onChange($event)"
                    [(ngModel)]="model">
    </aw-radiobutton>
  `
})
  /* jshint ignore:end */
class TestRBBasicWithNgModelComponent {
  @ViewChildren(RadioButtonComponent)
  rb: QueryList<RadioButtonComponent>;

  model: string = 'red';
  modelSet: string = '';

  constructor() {
  }

  onChange(event: any): void {
    this.modelSet = event;
  }
}

@Component({
  selector: 'wrapper-comp',
  template: `
    <div [formGroup]="env.currentForm">
      <aw-radiobutton [name]="'color2'" [value]="'red'" [label]="'Red'"
                      (onChange)="onChange($event)">
      </aw-radiobutton>
      <aw-radiobutton [name]="'color2'" [value]="'blue'" [label]="'Blue'"
                      (onChange)="onChange($event)">
      </aw-radiobutton>
    </div>
  `
})
  /* jshint ignore:end */
class TestRBBasicWithFormGroupComponent implements OnInit {

  model: string = 'blue';
  modelSet: string;

  constructor(public env: Environment) {
  }

  ngOnInit(): void {
    this.env.currentForm = new FormGroup({});
    this.env.currentForm.registerControl('color2', new FormControl(this.model));
  }


  onChange(event: any): void {
    this.modelSet = event;
  }

}

/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-radiobutton [name]="'color3'" [value]="'red'" [label]="'Red'"
                    [(ngModel)]="model">
    </aw-radiobutton>
    <aw-radiobutton [name]="'color3'" [value]="'blue'" [label]="'Blue'"
                    [disabled]="true"
                    [(ngModel)]="model">
    </aw-radiobutton>
  `
})
  /* jshint ignore:end */
class TestRBDisabledWithNgModelComponent {
  @ViewChildren(RadioButtonComponent)
  rb: QueryList<RadioButtonComponent>;

  model: string = 'red';

  constructor() {
  }


}
