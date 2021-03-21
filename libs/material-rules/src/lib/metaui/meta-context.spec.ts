/**
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
 */
import {Component, OnInit} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {Routes} from '@angular/router';
import {Entity, MetaUIRulesModule, UIMeta} from '@ngx-metaui/rules';
import {MaterialRulesModule} from '../material-rules.module';

/**
 * Need to have this test here as all the components for the metaui are defined here.
 */

const routes: Routes = [
  {
    path: '',
    redirectTo: '/test',
    pathMatch: 'full'
  }
];


describe('Meta Context Component', () => {
  let formInputs: any;

  beforeEach(() => {
    const start = Date.now();

    TestBed.configureTestingModule({
      declarations: [
        TestContainerEditComponent,
        TestContainerViewComponent,
        TestContainerViewDefferedComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot(),
        MaterialRulesModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });


    TestBed.compileComponents();

    // console.log('Time :', (Date.now() - start));

  });


  it('It should render 1 input fields with pre-loaded values: Frank',
    fakeAsync(() => {

      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClass',
        MyUserTestClassDynBindingOneFieldRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs.length).toBe(1);
      expect(formInputs[0].value).toEqual('Frank');

    }));

  it('It should render 4 input fields with pre-loaded values: Frank, Kolar, 1000,' +
    ' Some note' + ' about me.', fakeAsync(() => {

    const metaUI: UIMeta = TestBed.inject(UIMeta);
    metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();
    tick();

    formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');
    expect(formInputs[0].value).toEqual('Frank');
    expect(formInputs[1].value).toEqual('Kolar');
    expect(formInputs[2].value).toEqual('1000');
    expect(formInputs[3].value).toEqual('Some note about me.');
  }));


  it('It should render 4 String components - read only mode pre-loaded values: ' +
    'Frank, Kolar,' + ' 1000, Some note about me.',
    fakeAsync(() => {
      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewComponent);
      fixtureWrapper.detectChanges();

      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs[0].value).toEqual('Frank');
      expect(formInputs[1].value).toEqual('Kolar');
      expect(formInputs[2].value).toEqual('1000');
      expect(formInputs[3].value).toEqual('Some note about me.');
    }));


  it('It should render 4 String components when object loaded is deffered using timer',
    fakeAsync(() => {
      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewDefferedComponent);
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs[0].value).toEqual('Frank');
      expect(formInputs[1].value).toEqual('Kolar');
      expect(formInputs[2].value).toEqual('1000');
      expect(formInputs[3].value).toEqual('Some note about me.');
    }));
});


class UserTestDynClass implements Entity {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;


  constructor(firstName: string, lastName: string, age: number, bio: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.bio = bio;
  }

  className(): string {
    return 'UserTestDynClass';
  }

  getTypes(): any {
    return {
      firstName: String,
      lastName: String,
      age: Number,
      bio: String
    };
  }

  identity(): string {
    return 'UserTestDynClass';
  }
}


@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}

@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerViewComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}


@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerViewDefferedComponent implements OnInit {

  user: UserTestDynClass;

  constructor() {
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.user = new UserTestDynClass('Frank', 'Kolar', 1000,
        'Some note about me.');

    }, 100);

  }

}


// @formatter:off
/* tslint:disable */
export const MyUserTestClassDynBindingRule =
  'class=UserTestDynClass {' +
  '             field=firstName#required {' +
  '                 label:\'My First Name\';' +
  '             }' +
  ' ' +
  '             field=lastName#required {' +
  '                 label:\'My Last Name\';' +
  '            }' +
  ' ' +
  '             field=age#required {' +
  '                 label:\'My Age\';' +
  '                valid: ${value > 19;};' +
  '           }' +
  ' ' +
  '             field=bio {' +
  '                 label:\'This is my biography\';' +
  '                 visible:${object.age > 18;};' +
  '             }' +
  ' ' +
  '             zNone =>*;' +
  '             zLeft => firstName => lastName => age => bio;' +
  '         }';


export const MyUserTestClassDynBindingOneFieldRule =
  'class=UserTestDynClass {' +
  '             field=firstName {' +
  '                 label:\'My First Name\';' +
  '             }' +
  ' ' +
  '             zNone => *;' +
  '             zLeft => firstName;' +
  '         }';

// @formatter:on
/* tslint:disable */
