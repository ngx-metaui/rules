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
import {Entity, MetaUITestRulesModule, UIMeta} from '@ngx-metaui/rules';
import {MaterialRulesModule} from '@ngx-metaui/material-rules';


describe('How  Stack layout can render two different content stacked',
  () => {

    beforeEach((done) => {
      TestBed.configureTestingModule({
        declarations: [
          TestContainerEditComponent
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
      metaUI.config.registerRule('UserStack', UserStackRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);

      fixtureWrapper.detectChanges();

      fixtureWrapper.detectChanges();

      const formTables = fixtureWrapper.nativeElement.querySelectorAll('.form-container');

      fixtureWrapper.detectChanges();
      expect(formTables).toBeDefined();
      expect(formTables.length).toEqual(2);
      expect(formTables[0].querySelectorAll(('.form-field input')).length).toEqual(4);
      expect(formTables[1].querySelectorAll(('.form-field input')).length).toEqual(1);
    });


  });


class UserStack implements Entity {
  constructor(public firstName: string, public lastName: string,
              public age: number, public department: string,
              public email: string) {
  }


  identity(): string {
    return this.lastName;
  }

  className(): string {
    return 'UserStack';
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
  template: '<m-context [object]="user" operation="edit" layout="InspectTest2">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditComponent {
  user: UserStack = new UserStack('Frank', 'Kolar', 1000, 'aa.',
    'fkolar@gmail.com');
}


// @formatter:off
/* tslint:disable */
export const UserStackRule =
  'layout=InspectTest2#Stack {' +
  '       @layout=First#Form {' +
  '           elementStyle:"padding-bottom:100px";' +
  '       }' +
  '       @layout=Second#Form { zonePath:Second; }' +
  '   }' +
  '' +
  '' +
  '' +
  '    class=UserStack {' +
  '       zNone => *;' +
  '       zLeft => firstName => lastName => age => department;' +
  '       Second.zLeft => email;' +

  '   }';
// @formatter:on
/* tslint:disable */
