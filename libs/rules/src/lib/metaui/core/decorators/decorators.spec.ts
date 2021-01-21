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
import {TestBed} from '@angular/core/testing';
import {Entity} from '../utils/domain-model';
import {MetaUIRulesModule} from '../../rules.module';
import {KeyLabel, UILibraryRulePriority} from '../constants';
import {Property} from './property';
import {UIMeta} from '../uimeta';


describe('Use of decorators to extend oss ', () => {


  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MetaUIRulesModule.forRoot({inTest: true})
      ]
    });

    TestBed.compileComponents();
    const metaUI: UIMeta = TestBed.inject(UIMeta);
    const ossFile: any = require(
      '!!raw-loader!../../../resources/compiler/decorator/uilib.oss');

    metaUI.loadRuleSource({
      content: ossFile.default,
      module: 'Test-Decorator', filePath: 'uilib'
    }, true, UILibraryRulePriority);

    window.setTimeout(function () {
      done();
    }, 0);
  });

  describe('With Properties decorators', () => {

// @formatter:off
    it('should set correct label for annotated field to equal to xName', () => {

        const metaUI: UIMeta = TestBed.inject(UIMeta);
        metaUI.config.registerRule('MyUserTestClass', MyUserTestClassRule);

        const myUserTestClass = new MyUserTestClass('Frank');

        const context = metaUI.newContext();
        context.push(); // 1

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object', myUserTestClass);

        context.push(); // 2
        context.setScopeKey('class');

        context.push(); // 3

        context.set('field', 'firstName');
        expect(context.propertyForKey(KeyLabel)).toEqual('xName');
        context.pop(); // 3


        context.pop(); // 2
        context.pop(); // 1
      }
    );

    it('should override firstName label to Name if we use label decorator', () => {

         const metaUI: UIMeta = TestBed.inject(UIMeta);
        metaUI.config.registerRule('MyUserTestClass', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push(); // 1

        context.set('object', new MyUserTestClass('F'));
        context.set('field', 'firstName');
        expect(context.propertyForKey(KeyLabel)).toEqual('xName');

        context.pop(); // 1
      }
    );
  });

// @formatter:on
});


class MyUserTestClass implements Entity {


  constructor(
    @Property.Label('xName')
    public firstName: string
  ) {
  }

  identity(): string {
    return this.firstName;
  }

  className(): string {
    return 'MyUserTestClass';
  }

  getTypes(): any {
    return {
      firstName: String
    };
  }
}

// @formatter:off
/* tslint:disable */
export const MyUserTestClassRule = '' +
  'class=MyUserTestClass {' +
  ' field=firstName {' +
  '  }' +
  '}';
