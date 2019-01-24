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
import {evalExpression} from './utils/lang';
import {MapWrapper} from './utils/collection';
import {TestBed} from '@angular/core/testing';
import {Location, LocationStrategy} from '@angular/common';
import {MetaUIRulesModule} from '../rules.module';
import {JsonRule} from './json-rule';
import {Rule, Selector} from './rule';
import {RuleLoaderService} from './rule-loader.service';
import {ContextFieldPath, Expr, isDynamicSettable, StaticDynamicWrapper} from './property-value';
import {LocalizedString} from './i18n/localized-string';
import {ClassRulePriority, KeyClass, KeyField, META_RULES, MetaRules} from './meta-rules';
import {MatchResult} from './match';
import {Context} from './context';
import {OverrideValue} from './policies/merging-policy';
import {MockLocationStrategy, SpyLocation} from '@angular/common/testing';
import {MetaUITestRulesModule} from '../test.rules.module';


type DynamicValueType = 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';


describe('Loading rules functionality', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUITestRulesModule.forRoot({'env.test': true})
      ]
    });
  });

  it('should convert Meta rule that are prepared in JSON ', () => {

      const jsonRule: JsonRule = {
        _rank: 0,
        _properties: {'visible': false},
        _selectors: [{'_isDecl': false, '_value': '*', '_key': 'object'}]
      };

      const selectors: Array<Selector> = new Array<Selector>();
      for (const item of jsonRule._selectors) {
        const selector = new Selector(item._key, item._value, item._isDecl);
        selectors.push(selector);
      }

      const properties = MapWrapper.createFromStringMap<any>(jsonRule._properties);
      const rule: Rule = new Rule(selectors, properties, jsonRule._rank);

      expect(rule.selectors.length).toEqual(1);
      expect(rule.properties.get('visible')).toEqual(false);


    }
  );

  it('should convert array  of Meta rules that are prepared in JSON  into actual Rules[] Objects',
    () => {

      /* tslint:disable */
      // @formatter:off
      let jsonRules = [
        {
          '_properties': {'class': {'t': 'Expr', 'v': 'Meta.className(object)'}},
          '_rank': 0,
          '_selectors': [{'_isDecl': false, '_value': '*', '_key': 'object'}]
        }, {
          '_properties': {'class': {'t': 'Expr', 'v': 'Meta.className(object)'}},
          '_rank': 0, '_selectors': [
            {'_isDecl': false, '_value': '*', '_key': 'object'},
            {'_isDecl': false, '_value': '*', '_key': 'declare'}
          ]
        }, {
          '_properties': {'class': {'t': 'Expr', 'v': 'values.get(\'class\')'}},
          '_rank': 0,
          '_selectors': [{'_isDecl': false, '_value': 'search', '_key': 'operation'}]
        }, {
          '_rank': 0,
          '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            }
          ]
        }, {
          '_properties': {'editing': true}, '_rank': 0, '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            },
            {'_isDecl': false, '_value': '*', '_key': 'layout'}
          ]
        }, {
          '_rank': 0,
          '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            }
          ]
        }, {
          '_properties': {'editing': true}, '_rank': 0, '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            },
            {'_isDecl': false, '_value': '*', '_key': 'class'}
          ]
        }
      ];
      // @formatter:on
      /* tslint:enable */

      const rules: Array<Rule> = [];

      jsonRules.forEach((val, index) => {
        const jsonRule: JsonRule = <JsonRule>val;

        const selectors: Array<Selector> = new Array<Selector>();
        for (const item of jsonRule._selectors) {
          const selector = new Selector(item._key, item._value, item._isDecl);
          selectors.push(selector);
        }

        const properties = MapWrapper.createFromStringMap<any>(jsonRule._properties);
        const rule: Rule = new Rule(selectors, properties, jsonRule._rank);

        rules.push(rule);
      });

      expect(rules.length).toEqual(7);

      const class2 = rules[0].properties.get('class');
      expect(class2['t']).toEqual('Expr');

    }
  );


  it('should use loader to load rules with specific dynamic properties bindings for ' +
    'each type Expr | SDW | CFP | OV | i18n ', () => {
      /* tslint:disable */
      // @formatter:off
      /* Represent all different rules that can apear in the Meta*/
      let jsonRulesTypes = [
        {
          '_properties': {'class': {'t': 'Expr', 'v': 'Meta.className(object)'}},
          '_rank': 0,
          '_selectors': [{'_isDecl': false, '_value': '*', '_key': 'object'}]
        }, {
          /* key/value type*/ '_rank': 0,
          '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            }
          ]
        }, {
          /* no properties type*/ '_properties': {'editing': true}, '_rank': 0,
          '_selectors': [
            {
              '_isDecl': false, '_value': ['edit', 'create', 'search'],
              '_key': 'operation'
            },
            {'_isDecl': false, '_value': '*', '_key': 'layout'}
          ]
        }, {
          /* StaticDynamicWrapper*/
          '_properties': {'visible': {'t': 'SDW', 'v': '!properties.hidden'}},
          '_rank': 0, '_selectors': [{'_isDecl': false, '_value': '*', '_key': 'field'}]
        }, {
          '_properties': {
            'wrapperComponent': 'MetaContext', 'component': 'AWImageData',
            'wrapperBindings': {'scopeKey': 'field'}, 'bindings': {
              'bytes': {'t': 'CFP', 'v': 'value'}, 'style': 'width:100px',
              'contentType': {
                't': 'Expr',
                'v': 'ContentTypeUtils.contentTypeNamed(properties.contentType)'
              }
            }
          }, '_rank': 0, '_selectors': [
            {'_isDecl': false, '_value': '*', '_key': 'field'},
            {'_isDecl': false, '_value': '_imgUploadPreview', '_key': 'layout'}
          ]
        }, {
          /* Override Rule*/'_properties': {
            'visible': true, 'editable': {'t': 'OV', 'v': 'true'},
            'after': {'t': 'OV', 'v': 'null'}
          }, '_rank': 0,
          '_selectors': [{'_isDecl': false, '_value': '*', '_key': 'field'}]
        }, {
          /* i18n*/'_properties': {
            'visible': {
              't': 'i18n', 'v': {'key': '01234', 'defVal': 'Some Label'}
            }
          },
          '_rank': 0, '_selectors': [{'_isDecl': false, '_value': '*', '_key': 'field'}]
        }
      ];
      // @formatter:on
      /* tslint:enable */

      const ruleLoader: RuleLoaderService = new RuleLoaderService();
      const rules: Array<Rule> = ruleLoader.loadRulesWithReturn(jsonRulesTypes, 'system');


      // expect 7 rules loaded
      expect(rules.length).toEqual(7);

      // expect first rule will have expression
      const rule1: Rule = rules[0];
      const expr: Expr = rule1.properties.get('class');
      expect(expr instanceof Expr).toBeTruthy();
      expect(expr.toString()).toMatch('expr:');

      // expect first rule will have expression
      const rule2: Rule = rules[1];
      expect(rule2.properties).not.toBeDefined();


      const rule3: Rule = rules[2];
      const isEditing: boolean = rule3.properties.get('editing');
      expect(isEditing).toBeTruthy();

      const rule4: Rule = rules[3];
      const wrapper: StaticDynamicWrapper = rule4.properties.get('visible');
      expect(wrapper.toString()).toMatch('StaticDynamicWrapper');


      const rule5: Rule = rules[4];

      expect(rule5.properties.size).toEqual(4);

      const subMap: any = rule5.properties.get('bindings');
      expect(subMap instanceof Map).toBeTruthy();

      const contentType: Expr = subMap.get('contentType');
      expect(contentType instanceof Expr).toBeTruthy();
      expect(contentType.toString()).toMatch('expr:');


      const rule6: Rule = rules[5];

      expect(rule6.properties.size).toEqual(3);

      const editable: OverrideValue = rule6.properties.get('editable');

      expect(editable instanceof OverrideValue).toBeTruthy();
      expect(editable.toString()).toMatch('!');


      const rule7: Rule = rules[6];

      expect(rule7.properties.size).toEqual(1);

      const loc: LocalizedString = rule7.properties.get('visible');

      expect(loc instanceof LocalizedString).toBeTruthy();
      expect(loc.toString()).toMatch('LocaledString');

    }
  );


  it(' should load all the system rules in the rule engine based on WidgetsRules. ', () => {

      try {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        expect(metaUI).toBeDefined();
        expect(metaUI.rules.length).toEqual(204); // commented out toOneRelationShip

      } catch (e) {
        fail(e);

      }
    }
  );
});


describe('Rule matching functionality on preloaded ruleset', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true})
      ]
    });

    const metaUI: MetaRules = TestBed.get(META_RULES);
    metaUI.loadUILibSystemRuleFiles({}, UILibRules, {});
  });

  it(' it must pick the best selector to Index from list of selectors ', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      const classSel: Selector = new Selector('class', '*');
      const operSel: Selector = new Selector('operation', 'view');

      let bestMatch = metaUI.bestSelectorToIndex([classSel, operSel]);

      expect(bestMatch.key).toEqual('operation');

      const visibleSel: Selector = new Selector('visible', 'true');
      bestMatch = metaUI.bestSelectorToIndex([operSel, visibleSel]);
      expect(bestMatch.key).toEqual('visible');


      const visibleSel2: Selector = new Selector('visible', true);
      bestMatch = metaUI.bestSelectorToIndex([operSel, visibleSel2]);
      expect(bestMatch.key).toEqual('operation');

    }
  );


  it(' it should recognized as scope properties and scope property must be set to thru for ' +
    'field, action,' + ' action category, class, layout', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      let keyData = metaUI.keyData('field');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('action');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('class');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('layout');
      expect(keyData.isPropertyScope).toBeTruthy();

      keyData = metaUI.keyData('actionCategory');
      expect(keyData.isPropertyScope).toBeTruthy();

    }
  );


  it(' it should not recognized as scope properties for anything but  field, action,' +
    ' action category, class, layout', () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);

      let keyData = metaUI.keyData('operation');
      expect(keyData.isPropertyScope).toBeFalsy();

      keyData = metaUI.keyData('trait');
      expect(keyData.isPropertyScope).toBeFalsy();
      //
      keyData = metaUI.keyData('object');
      expect(keyData.isPropertyScope).toBeFalsy();

    }
  );

  it(' It can match properties layout=Inspect, operation=edit, field=*, type=int and ' +
    'return MatchResult ', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);


      let prevMatch: MatchResult = metaUI.match('layout', 'Inspect', null);
      prevMatch = metaUI.match('operation', 'edit', prevMatch);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Number', prevMatch);

      for (let i = 1; i < prevMatch.matches()[0]; i++) {
        const rule = metaUI.rules[prevMatch.matches()[i]].toString();

        // print(rule);
        expect(rule)
          .toMatch(
            /layout|Inspect|operation|edit|field|type|Number|InputFieldComponent/);
      }
    }
  );
  it(' It can match properties for string and Editing and expect InputFieldComponent in  the ' +
    'retrieved rule properties', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'edit', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('InputFieldComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it(' It can match properties for date and viewing and expect DateAndTimeComponent in of ' +
    'the retrieve rule properties ', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Date', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('DateAndTimeComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );


  it('It can match string with trait richtext expect RichTextArea in the retrieved rule ' +
    'properties', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);
      prevMatch = metaUI.match('trait', 'richtext', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('RichTextAreaComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it('It can match layout Inspect and retrieve StringComponent component if ~class', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('layout', 'Inspect', prevMatch);

      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('StringComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );

  it('It can match class with trait  form and retrieve MetaForm', () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);

      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Form', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('MetaFormComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }

    }
  );

  it('It can match class with trait Stack and retrieve MetaElementList', () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);


      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Stack', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;

        if (properties.has('component')) {
          expect(properties.get('component')).toEqual('MetaElementListComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }

    }
  );

  it('It can match trait with form  and field name and retrieve InputFieldComponent component ',
    () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);


      metaUI.keyData(KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(KeyClass, 'MyClass');
      const selectorField = new Selector(KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', '*', null);

      prevMatch = metaUI.match('trait', 'Form', prevMatch);
      prevMatch = metaUI.match('scopeKey', 'field', prevMatch);
      prevMatch = metaUI.match('field', 'name', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI.rules[prevMatch.matches()[i]].properties;
        const selectors = metaUI.rules[prevMatch.matches()[i]].selectors;

        if (selectors[0].key === 'field' && properties.has('component')) {
          expect(properties.get('component')).toEqual('InputFieldComponent');
          found = true;
          break;
        }
      }

      if (!found) {
        fail();
      }
    }
  );


  it('It checks if observers were registered and called when we do match on class or field ',
    () => {
      const metaUI: MetaRules = TestBed.get(META_RULES);


      const observers = metaUI.keyData(KeyClass).observers;
      const spy = spyOn(observers[0], 'notify');
      const spy2 = spyOn(observers[1], 'notify');


      metaUI.keyData(KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(KeyClass, 'MyClass');
      const selectorField = new Selector(KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', 'MyClass',
        null);

      prevMatch = metaUI.match('trait', 'Form', prevMatch);
      prevMatch = metaUI.match('scopeKey', 'field', prevMatch);
      prevMatch = metaUI.match('field', 'name', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      expect(observers.length).toEqual(2);


      expect(observers[0].notify).toHaveBeenCalled();
      expect(observers[1].notify).toHaveBeenCalled();
    }
  );


});


describe('Expression eval of Matched properties how they can be resolved on the fly', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true})
      ]
    });
  });


  it('It evaluates correct expression and return result of 1 + 2', () => {

      const result = evalExpression(' num1 + num2;', 'let  context1;', {num1: 1, num2: 2});
      expect(result).toEqual(3);
    }
  );


  it('It evaluates expression object.firstName.length > 4 on Context', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;


        constructor(firstName: string) {
          this.firstName = firstName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank');


      const ex = new Expr('object.firstName.length > 4', metaUI);
      const isTruthy = ex.evaluate(context);

      expect(isTruthy).toBeTruthy();
    }
  );


  it('It evaluates expression object.firstName === Frank on Context', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        constructor() {
          super(metaUI);
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;


        constructor(firstName: string) {
          this.firstName = firstName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank');


      let ex = new Expr('object.firstName === "Frank" ', metaUI);
      let isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeTruthy();

      ex = new Expr('object.firstName === "Peter" ', metaUI);
      isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeFalsy();
    }
  );


  it('It evaluates context field path  on Context to get value from a object', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        set someObject(value: any) {
          this._someObject = value;
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;
        lastName: string;


        constructor(firstName: string, lastName: string) {
          this.firstName = firstName;
          this.lastName = lastName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank', 'Kolar');


      const cnxFp = new ContextFieldPath('object.firstName');
      const any = cnxFp.evaluate(context);
      expect(any).toEqual('Frank');

    }
  );

  it('It evaluates context field path  on Context to set a value to a object',
    () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(metaUI);
        }

        set someObject(value: any) {
          this._someObject = value;
        }

        get values(): Map<string, any> {
          return new Map<string, any>();
        }


        get object(): any {
          return this._someObject;
        }
      }


      class User {
        firstName: string;
        lastName: string;


        constructor(firstName: string, lastName: string) {
          this.firstName = firstName;
          this.lastName = lastName;
        }
      }

      const context = new MyContext();
      context.someObject = new User('Frank', 'Kolar');


      const cnxFp = new ContextFieldPath('object.firstName');
      let someval = cnxFp.evaluate(context);
      expect(someval).toEqual('Frank');


      if (isDynamicSettable(cnxFp)) {
        cnxFp.evaluateSet(context, 'John');
      }

      someval = cnxFp.evaluate(context);
      expect(someval).toEqual('John');

    }
  );
});


// @formatter:off
/* tslint:disable */
// temp rules to push some default that are now separated from the rule engine
export const UILibRules = {
  oss: [
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {
          'value': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'CheckboxComponent',
        'bindings': {
          'type': 'form'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.integer'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'InputFieldComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.blankNull.integer'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'DateAndTimeComponent',
        'bindings': {
          'formatter': 'shortDate',
          'showTime': false
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        },
        {
          '_key': 'fiveZoneLayout',
          '_value': true,
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'dateTime',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': 'dateTime',
          'showTime': true
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'destinationClass': {
            't': 'Expr',
            'v': 'type'
          },
          'displayKey': 'name',
          'formatter': {
            't': 'CFP',
            'v': 'formatters.identifier'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Popup'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'enum',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'multiselect': true,
          'destinationClass': {
            't': 'Expr',
            'v': 'properties.get("enumClass")'
          },
          'displayKey': 'name',
          'formatter': {
            't': 'CFP',
            'v': 'formatters.identifier'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ownedToMany',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaDetailTable',
        'after': 'zDetail'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'FileUploadChooser',
        'bindings': {
          'file': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'value': {
            't': 'Expr',
            'v': 'value ? value.name : "(none)"'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'InputFieldComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_properties': {
        'after': 'zBottom'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'TextAreaComponent',
        'bindings': {
          'rows': 10,
          'cols': 60
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'escapeUnsafeHtml': true
        },
        'after': 'zBottom'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'RichTextAreaComponent',
        'bindings': {
          'rows': 10,
          'cols': 60
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'after': 'zNone'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'list',
          '_isDecl': false
        }
      ],
      '_properties': {
        'editable': false,
        'after': 'zDetail'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.hiddenPassword'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'AWPasswordField',
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'truncated',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'TruncateString',
        'bindings': {
          'size': 10
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Money',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'CurrencyComponent',
        'bindings': {
          'money': {
            't': 'CFP',
            'v': 'value'
          },
          'currencies': {
            't': 'Expr',
            'v': 'properties.get("currencies")'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        }
      ],
      '_properties': {
        'editable': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        },
        {
          '_key': 'editing',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'after': 'zNone'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true,
        'editable': {
          't': 'OV',
          'v': 'true'
        },
        'after': {
          't': 'OV',
          'v': 'null'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'required': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        },
        {
          '_key': 'object',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'valid': {
          't': 'Expr',
          'v': '((value != undefined) && (value != null)) ? true : "Answer required"'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'list': {
            't': 'Expr',
            'v': 'properties.get("choices")'
          },
          'type': {
            't': 'Expr',
            'v': 'properties.get("chooserStyle")'
          },
          'key': {
            't': 'Expr',
            'v': 'properties.get("field")'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'MetaObjectDetailComponent',
        'nestedLayout': true,
        'bindings': {
          'layout': 'Inspect',
          'useNoLabelLayout': true,
          'label': {
            't': 'Expr',
            'v': 'properties.get("label")'
          },
          'object': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'HoverCardComponent',
        'bindings': {
          'linkTitle': {
            't': 'CFP',
            'v': 'value'
          },
          'appendContentToBody': false,
          'ngcontentLayout': 'Content'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': 'Content',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaObjectDetailComponent',
        'bindings': {
          'layout': 'Inspect',
          'object': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'create',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Popup',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Dropdown'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'PopupControl',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'PopupControl'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Chooser',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Chooser'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'PostOnChange',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'bold',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'b'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'italic',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'i'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading1',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h1'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading2',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h2'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading3',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h3'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'defaultStyle': 'primary',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionLinks',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'links',
          'align': 'none'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionLinksAligned',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'links',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionMenu',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'menu',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'InstanceActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'filterActions': 'instance',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'StaticActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'filterActions': 'static',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Tabs',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaTabs',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Sections',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaSectionsComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Form',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaFormComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Stack',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaElementListComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'MetaFormComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'labelsOnTop',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': {},
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': [
            'Inspect',
            'SearchForm'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': 'ListItem',
          '_isDecl': false
        },
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {
          'value': {
            't': 'Expr',
            'v': 'properties.get("objectTitle")'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'pageBindings': {
          't': 'Expr',
          'v': '(properties.get("homePage") == "MetaHomePageComponent") ? new Map().set("module", values.get("module")) : null'
        },
        'component': 'MetaDashboardLayoutComponent',
        'visible': {
          't': 'SDW',
          'v': '!properties.get("hidden")'
        },
        'homePage': 'MetaHomePageComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        },
        {
          '_key': 'layout',
          '_value': 'Actions',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'label': 'Actions',
        'after': 'zToc'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    }
  ]
};

// @formatter:on
/* tslint:disable */
