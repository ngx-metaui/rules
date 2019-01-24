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
import {
  Context,
  KeyAny,
  KeyComponentName,
  KeyHomePage,
  KeyModule,
  META_RULES,
  MetaRules,
  MetaUIRulesModule, MetaUITestRulesModule
} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../primeng-rules.module';


describe('How we can retrieve homepage from module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUITestRulesModule.forRoot({'env.test': true}),
        PrimeNgRulesModule.forRoot()
      ]
    });
  });


  it('should retrieve generic module homepage called MetaHomePageComponent', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);

    const context: Context = metaUI.newContext();
    context.push();
    context.set(KeyModule, KeyAny);

    const homePage = context.propertyForKey(KeyHomePage);
    // meta.naviateToPage(context, '', false)

    context.pop();

    expect(homePage).toEqual('MetaHomePageComponent');

  });


  it('should retrieve generic module component representing layout called' +
    ' MetaDashboardLayoutComponent', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);

    const context: Context = metaUI.newContext();
    context.push();
    context.set(KeyModule, KeyAny);

    const homePage = context.propertyForKey(KeyComponentName);
    // meta.naviateToPage(context, '', false)

    context.pop();

    expect(homePage).toEqual('MetaDashboardLayoutComponent');

  });


  // @formatter:off
  /* tslint:disable */
  const ApplicationRule: { oss: any } = {
    oss: [
      {
        '_selectors': [
          {
            '_key': 'module',
            '_value': 'Home',
            '_isDecl': true
          }
        ],
        '_properties': {
          'pageTitle': 'My Home Title',
          'homePage': 'TestMetaHomePage'
        },
        '_rank': 0
      },
      {
        '_selectors': [
          {
            '_key': 'module',
            '_value': 'Product',
            '_isDecl': true
          }
        ],
        '_properties': {
          'pageTitle': 'My Product Title',
          'homePage': 'Test2MetaHomePage'
        },
        '_rank': 0
      }
    ]
  };
  // @formatter:on
  /* tslint:disable */
  it('should retrieve application based module and its homePage TestMetaHomePage', () => {
    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.addTestUserRule('ApplicationRule', ApplicationRule);

    metaUI.loadApplicationRule();

    let context: Context = metaUI.newContext();
    context.push();
    context.set(KeyModule, 'Home');

    let homePage = context.propertyForKey(KeyHomePage);
    context.pop();

    expect(homePage).toEqual('TestMetaHomePage');


    context = metaUI.newContext();
    context.push();
    context.set(KeyModule, 'Product');

    homePage = context.propertyForKey(KeyHomePage);
    context.pop();
    expect(homePage).toEqual('Test2MetaHomePage');

  });

});

