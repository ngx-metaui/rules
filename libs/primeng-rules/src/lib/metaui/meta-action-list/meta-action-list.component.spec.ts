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
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {By} from '@angular/platform-browser';
import {PrimeNgRulesModule} from '../../primeng-rules.module';
import {
  Entity,
  META_RULES,
  MetaRules,
  MetaUIRulesModule,
  MetaUITestRulesModule
} from '@ngx-metaui/rules';

/**
 *
 *
 *     layout=Inspect2#Stack {
 *            @layout=MenuTop#ActionButtons {
 *           }
 *
 *           @layout=First#Form {
 *            }
 *           @layout=Second#Form { zonePath:Second; }
 *       }
 *
 *
 *    class=UserStackA {
 *           @action=update  {
 *                actionResults:${ object.firstName = "Mr." +  object.firstName };
 *               visible: ${ properties.editing };
 *            }
 *
 *
 *           @action=Save  {
 *                label: "My Save";
 *               actionResults:${ object.firstName = "Ms." +  object.firstName };
 *                 visible: ${ properties.editing };
 *                 buttonStyle:info;
 *            }
 *
 *
 *           zNone => *;
 *            zLeft => firstName => lastName => age => department;
 *            Second.zLeft => email;
 *     }
 */
// @formatter:off
/* tslint:disable */
export const UserStackARule = {
  oss: [
    {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false}],
      '_properties': {'trait': 'Stack'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false},
        {'_key': 'layout', '_value': 'MenuTop', '_isDecl': true}
      ], '_properties': {'trait': 'ActionButtons'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false},
        {'_key': 'layout', '_value': 'First', '_isDecl': true}
      ], '_properties': {'trait': 'Form'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false},
        {'_key': 'layout', '_value': 'Second', '_isDecl': true}
      ], '_properties': {'trait': 'Form', 'zonePath': 'Second'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest2', '_isDecl': false}],
      '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'update', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'},
        'actionResults': {'t': 'Expr', 'v': 'object.firstName = ("Mr." + object.firstName)'}
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'Save', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'}, 'buttonStyle': 'info',
        'actionResults': {
          't': 'Expr', 'v': 'object.firstName = ("Ms." + object.firstName)'
        }, 'label': 'My Save'
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': '*', '_isDecl': false}
      ], '_properties': {'after': 'zNone'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'firstName', '_isDecl': false}
      ], '_properties': {'after': 'zLeft'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'lastName', '_isDecl': false}
      ], '_properties': {'after': 'firstName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'age', '_isDecl': false}
      ], '_properties': {'after': 'lastName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'department', '_isDecl': false}
      ], '_properties': {'after': 'age'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'email', '_isDecl': false}
      ], '_properties': {'after': 'Second.zLeft'}, '_rank': 0
    }, {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}
  ]
};

export const LinksUserStackARule = {
  oss: [
    {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false}],
      '_properties': {'trait': 'Stack'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false},
        {'_key': 'layout', '_value': 'MenuTop', '_isDecl': true}
      ], '_properties': {'trait': 'ActionLinks'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false},
        {'_key': 'layout', '_value': 'First', '_isDecl': true}
      ], '_properties': {'trait': 'Form'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false},
        {'_key': 'layout', '_value': 'Second', '_isDecl': true}
      ], '_properties': {'trait': 'Form', 'zonePath': 'Second'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest3', '_isDecl': false}],
      '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'update', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'},
        'actionResults': {'t': 'Expr', 'v': 'object.firstName = ("Mr." + object.firstName)'}
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'Save', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'}, 'buttonStyle': 'info',
        'actionResults': {
          't': 'Expr', 'v': 'object.firstName = ("Ms." + object.firstName)'
        }, 'label': 'My Save'
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': '*', '_isDecl': false}
      ], '_properties': {'after': 'zNone'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'firstName', '_isDecl': false}
      ], '_properties': {'after': 'zLeft'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'lastName', '_isDecl': false}
      ], '_properties': {'after': 'firstName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'age', '_isDecl': false}
      ], '_properties': {'after': 'lastName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'department', '_isDecl': false}
      ], '_properties': {'after': 'age'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'email', '_isDecl': false}
      ], '_properties': {'after': 'Second.zLeft'}, '_rank': 0
    }, {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}
  ]
};

export const PopupUserStackARule = {
  oss: [
    {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false}],
      '_properties': {'trait': 'Stack'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false},
        {'_key': 'layout', '_value': 'MenuTop', '_isDecl': true}
      ], '_properties': {'trait': 'ActionMenu'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false},
        {'_key': 'layout', '_value': 'First', '_isDecl': true}
      ], '_properties': {'trait': 'Form'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false}],
      '_rank': 0
    },
    {
      '_selectors': [
        {'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false},
        {'_key': 'layout', '_value': 'Second', '_isDecl': true}
      ], '_properties': {'trait': 'Form', 'zonePath': 'Second'}, '_rank': 0
    }, {
      '_selectors': [{'_key': 'layout', '_value': 'InspectAcctionsTest4', '_isDecl': false}],
      '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'update', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'},
        'actionResults': {'t': 'Expr', 'v': 'object.firstName = ("Mr." + object.firstName)'}
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'action', '_value': 'Save', '_isDecl': true}
      ], '_properties': {
        'visible': {'t': 'Expr', 'v': 'properties.editing'}, 'buttonStyle': 'info',
        'actionResults': {
          't': 'Expr', 'v': 'object.firstName = ("Ms." + object.firstName)'
        }, 'label': 'My Save'
      }, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': '*', '_isDecl': false}
      ], '_properties': {'after': 'zNone'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'firstName', '_isDecl': false}
      ], '_properties': {'after': 'zLeft'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'lastName', '_isDecl': false}
      ], '_properties': {'after': 'firstName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'age', '_isDecl': false}
      ], '_properties': {'after': 'lastName'}, '_rank': 0
    }, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'department', '_isDecl': false}
      ], '_properties': {'after': 'age'}, '_rank': 0
    },
    {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}, {
      '_selectors': [
        {'_key': 'class', '_value': 'UserStackA', '_isDecl': false},
        {'_key': 'field', '_value': 'email', '_isDecl': false}
      ], '_properties': {'after': 'Second.zLeft'}, '_rank': 0
    }, {'_selectors': [{'_key': 'class', '_value': 'UserStackA', '_isDecl': false}], '_rank': 0}
  ]
};
// @formatter:on
/* tslint:disable */

describe('3 different layouts formed into Stack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestContainerEditComponent,
        TestContainerEditLinksComponent,
        TestContainerEditPopupComponent
      ],
      imports: [
        MetaUITestRulesModule.forRoot({'env.test': true}),
        PrimeNgRulesModule.forRoot()

      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]

    });
    TestBed.compileComponents();

  });


  it('should render two FormTables', () => {

    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    let fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    let formTables = fixtureWrapper.debugElement.queryAllNodes(By.css('.w-form-table'));

    fixtureWrapper.detectChanges();
    expect(formTables).toBeDefined();
    expect(formTables.length).toEqual(2);
  });

  it('should have two buttons in the top container when trait ActionButtons ', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    let fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    let actionButtons = fixtureWrapper.debugElement.queryAllNodes(By.css('.l-action-buttons' +
      ' button'));

    fixtureWrapper.detectChanges();
    expect(actionButtons).toBeDefined();
    expect(actionButtons.length).toEqual(2);
  });

  it('should have two link at the top container when trait is ActionLinks', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('UserStackARule', LinksUserStackARule);

    let fixtureWrapper = TestBed.createComponent(TestContainerEditLinksComponent);
    fixtureWrapper.detectChanges();

    let actionButtons = fixtureWrapper.debugElement.queryAllNodes(By.css('.l-action-buttons' +
      ' .ui-button-link'));

    fixtureWrapper.detectChanges();
    expect(actionButtons).toBeDefined();
    expect(actionButtons.length).toEqual(2);
  });


  it('should have popup menu with 2 items at the top container when trait is ActionMenu', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('UserStackARule', PopupUserStackARule);


    let fixtureWrapper = TestBed.createComponent(TestContainerEditPopupComponent);
    fixtureWrapper.detectChanges();

    let menu = fixtureWrapper.debugElement.queryAllNodes(By.css('p-menu'));

    fixtureWrapper.detectChanges();
    expect(menu).toBeDefined();
    expect(menu.length).toEqual(1);
  });


});


class UserStackA implements Entity {
  constructor(public firstName: string, public lastName: string,
              public age: number, public department: string,
              public email: string) {
  }

  identity(): string {
    return this.lastName;
  }


  className(): string {
    return 'UserStackA';
  }

  getTypes(): any {
    return {
      firstName: String,
      lastName: String,
      age: Number,
      department: String,
      email: String

    };
  }
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="InspectAcctionsTest2">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000, 'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="InspectAcctionsTest3">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditLinksComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000, 'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="InspectAcctionsTest4">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditPopupComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000, 'aa.', 'fkolar@gmail.com');
}
