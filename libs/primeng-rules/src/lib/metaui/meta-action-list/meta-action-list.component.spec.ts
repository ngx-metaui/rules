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
import {Entity, META_RULES, MetaRules, MetaUITestRulesModule} from '@ngx-metaui/rules';



export const PopupUserStackARule =
  'layout=Inspect4#Stack {\n' +
  '           @layout=MenuTop#ActionMenu {\n' +
  '             }\n' +
  '\n' +
  '           @layout=First#Form {\n' +
  '              }\n' +
  '           @layout=Second#Form { zonePath:Second; }\n' +
  '       }\n' +
  '\n' +
  '\n' +
  '    class=UserStackA {\n' +
  '           @action=update  {\n' +
  '                 actionResults:${ object.firstName = "Mr." +  object.firstName };\n' +
  '                 visible: ${ properties.get("editing") };\n' +
  '           }\n' +
  '\n' +
  '\n' +
  '           @action=Save  {\n' +
  '                  label: "My Save";\n' +
  '                 actionResults:${ object.firstName = "Ms." +  object.firstName };\n' +
  '                   visible: ${ properties.get("editing") };\n' +
  '                   buttonStyle:info;\n' +
  '            }\n' +
  '\n' +
  '           zNone => *;\n' +
  '           zLeft => firstName => lastName => age => department;\n' +
  '           Second.zLeft => email;\n' +
  '     }'

;

export const LinksUserStackARule =
  'layout=Inspect3#Stack {\n' +
  '           @layout=MenuTop#ActionLinks {\n' +
  '             }\n' +
  '\n' +
  '           @layout=First#Form {\n' +
  '              }\n' +
  '           @layout=Second#Form { zonePath:Second; }\n' +
  '       }\n' +
  '\n' +
  '\n' +
  '    class=UserStackA {\n' +
  '           @action=update  {\n' +
  '                 actionResults:${ object.firstName = "Mr." +  object.firstName };\n' +
  '                 visible: ${ properties.get("editing") };\n' +
  '           }\n' +
  '\n' +
  '\n' +
  '           @action=Save  {\n' +
  '                  label: "My Save";\n' +
  '                 actionResults:${ object.firstName = "Ms." +  object.firstName };\n' +
  '                   visible: ${ properties.get("editing") };\n' +
  '                   buttonStyle:info;\n' +
  '            }\n' +
  '\n' +
  '           zNone => *;\n' +
  '           zLeft => firstName => lastName => age => department;\n' +
  '           Second.zLeft => email;\n' +
  '     }'

;

export const UserStackARule =
  'layout=Inspect2#Stack {\n' +
  '           @layout=MenuTop#ActionButtons {\n' +
  '             }\n' +
  '\n' +
  '           @layout=First#Form {\n' +
  '              }\n' +
  '           @layout=Second#Form { zonePath:Second; }\n' +
  '       }\n' +
  '\n' +
  '\n' +
  '    class=UserStackA {\n' +
  '           @action=update  {\n' +
  '                 actionResults:${ object.firstName = "Mr." +  object.firstName };\n' +
  '                 visible: ${ properties.get("editing") };\n' +
  '           }\n' +
  '\n' +
  '\n' +
  '           @action=Save  {\n' +
  '                  label: "My Save";\n' +
  '                 actionResults:${ object.firstName = "Ms." +  object.firstName };\n' +
  '                   visible: ${ properties.get("editing") };\n' +
  '                   buttonStyle:info;\n' +
  '            }\n' +
  '\n' +
  '           zNone => *;\n' +
  '           zLeft => firstName => lastName => age => department;\n' +
  '           Second.zLeft => email;\n' +
  '     }'

;
// @formatter:on
/* tslint:enable */

describe('3 different layouts formed into Stack', () => {
  beforeEach((done) => {
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

    window.setTimeout(function () {
      done();
    }, 0);

  });


  it('should render two FormTables', () => {

    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    const formTables = fixtureWrapper.debugElement.queryAllNodes(By.css('.w-form-table'));

    fixtureWrapper.detectChanges();
    expect(formTables).toBeDefined();
    expect(formTables.length).toEqual(2);
  });

  it('should have two buttons in the top container when trait ActionButtons ', () => {
    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    const actionButtons = fixtureWrapper.debugElement.queryAllNodes(By.css('.l-action-buttons' +
      ' button'));

    fixtureWrapper.detectChanges();
    expect(actionButtons).toBeDefined();
    expect(actionButtons.length).toEqual(2);
  });

  it('should have two link at the top container when trait is ActionLinks', () => {
    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('UserStackARule', LinksUserStackARule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditLinksComponent);
    fixtureWrapper.detectChanges();

    const actionButtons = fixtureWrapper.debugElement.queryAllNodes(By.css('.l-action-buttons' +
      ' .ui-button-link'));

    fixtureWrapper.detectChanges();
    expect(actionButtons).toBeDefined();
    expect(actionButtons.length).toEqual(2);
  });


  it('should have popup menu with 2 items at the top container when trait is ActionMenu', () => {
    const metaUI: MetaRules = TestBed.inject(META_RULES);
    metaUI.addTestUserRule('UserStackARule', PopupUserStackARule);


    const fixtureWrapper = TestBed.createComponent(TestContainerEditPopupComponent);
    fixtureWrapper.detectChanges();

    const menu = fixtureWrapper.debugElement.queryAllNodes(By.css('p-menu'));

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
  template: '<m-context [object]="user" operation="edit" layout="Inspect2">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar',
    1000, 'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect3">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditLinksComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000, 'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect4">' +
    '<m-include-component >' +
    '</m-include-component></m-context>'
})
class TestContainerEditPopupComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000, 'aa.', 'fkolar@gmail.com');
}
