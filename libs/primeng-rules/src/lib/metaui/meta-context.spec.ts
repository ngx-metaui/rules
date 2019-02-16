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
import {By} from '@angular/platform-browser';
import {Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {
  Entity,
  META_RULES,
  MetaRules,
  MetaUIRulesModule,
  MetaUITestRulesModule
} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../primeng-rules.module';

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
        MetaUITestRulesModule.forRoot({'env.test': true}),
        PrimeNgRulesModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });


    TestBed.compileComponents();

    // console.log('Time :', (Date.now() - start));

  });


  it('It should render 4 input fields with pre-loaded values: Frank, Kolar, 1000,' +
    ' Some note' + ' about me.', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);

    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

    fixtureWrapper.detectChanges();
    tick();

    fixtureWrapper.detectChanges();
    tick();

    //
    formInputs = fixtureWrapper.nativeElement.querySelectorAll('.w-input-field');

    expect(formInputs[0].value).toEqual('Frank');
    expect(formInputs[1].value).toEqual('Kolar');
    expect(formInputs[2].value).toEqual('1000');
    expect(formInputs[3].value).toEqual('Some note about me.');
  }));


  it('It should render 4 String components - read only mode pre-loaded values: ' +
    'Frank, Kolar,' + ' 1000, Some note about me.',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.get(META_RULES);
      metaUI.addTestUserRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewComponent);
      fixtureWrapper.detectChanges();

      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.debugElement.queryAllNodes(By.css('.w-string-field'));

      expect(formInputs[0].nativeElement.textContent).toEqual('Frank');
      expect(formInputs[1].nativeElement.textContent).toEqual('Kolar');
      expect(formInputs[2].nativeElement.textContent).toEqual('1000');
      expect(formInputs[3].nativeElement.textContent).toEqual('Some note about me.');
    }));


  it('It should render 4 String components when object loaded is deffered using timer',
    fakeAsync(() => {
      const metaUI: MetaRules = TestBed.get(META_RULES);
      metaUI.addTestUserRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewDefferedComponent);
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      formInputs = fixtureWrapper.debugElement.queryAllNodes(By.css('.w-string-field'));

      expect(formInputs[0].nativeElement.textContent).toEqual('Frank');
      expect(formInputs[1].nativeElement.textContent).toEqual('Kolar');
      expect(formInputs[2].nativeElement.textContent).toEqual('1000');
      expect(formInputs[3].nativeElement.textContent).toEqual('Some note about me.');
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
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}

@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerViewComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerViewDefferedComponent implements OnInit {

  user: UserTestDynClass;

  constructor() {
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.user = new UserTestDynClass('Frank', 'Kolar', 1000,
        'Some note about me.');

    }, 0);

  }

}


// @formatter:off
/**
 *
 *
 *
 *       class=MyUserTestClass {
 *
 *            field=firstName#required {
 *                label:'My First Name';
 *            }
 *
 *            field=lastName#required {
 *                label:'My Last Name';
 *           }
 *
 *            field=age#required {
 *                label:'My Age';
 *               valid: ${value > 19};
 *          }
 *
 *            field=bio {
 *                label:'This is my biography';
 *                visible:${object.age > 18};
 *            }
 *
 *            zNone => *;
 *            zLeft => firstName => lastName => age => bio;
 *        }
 *
 *
 */
/* tslint:disable */
export const MyUserTestClassDynBindingRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'}, 'trait': 'required', 'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'}, 'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'firstName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserTestDynClass', '_key': 'class'}]
    }
  ]
};
// @formatter:on
/* tslint:disable */
