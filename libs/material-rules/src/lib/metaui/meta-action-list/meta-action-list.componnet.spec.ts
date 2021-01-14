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
import {MaterialRulesModule} from '../../material-rules.module';
import {Entity, MetaUITestRulesModule, UIMeta} from '@ngx-metaui/rules';


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
  '                 visible: ${ true };\n' +
  '           }\n' +
  '\n' +
  '\n' +
  '           @action=Save  {\n' +
  '                  label: "My Save";\n' +
    '                 actionResults:${ object.firstName = "Ms." +  object.firstName };\n' +
  '                   visible: ${ true };\n' +
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
        MaterialRulesModule.forRoot()

      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]

    });
    TestBed.compileComponents();

    window.setTimeout(function () {
      done();
    }, 0);

  });


  it('should render two FormTables', () => {

    const metaUI: UIMeta = TestBed.inject(UIMeta);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    const formTables = fixtureWrapper.nativeElement.querySelectorAll('.form-container');

    fixtureWrapper.detectChanges();
    expect(formTables).toBeDefined();
    expect(formTables.length).toEqual(2);
  });

  it('should have two buttons in the top container when trait ActionButtons ', () => {
    const metaUI: UIMeta = TestBed.inject(UIMeta);
    metaUI.addTestUserRule('UserStackARule', UserStackARule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();

    const actionButtons = fixtureWrapper.nativeElement.querySelectorAll('.action-pad' +
      ' button');

    fixtureWrapper.detectChanges();
    expect(actionButtons).toBeDefined();
    expect(actionButtons.length).toEqual(2);
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
  selector: 'md-wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect2">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar',
    1000, 'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'md-wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect3">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditLinksComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000,
    'aa.', 'fkolar@gmail.com');
}


@Component({
  selector: 'md-wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect4">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditPopupComponent {
  user: UserStackA = new UserStackA('Frank', 'Kolar', 1000,
    'aa.', 'fkolar@gmail.com');
}

