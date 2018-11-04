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
import {evalExpression} from '../../core/utils/lang';
import {MapWrapper} from '../../core/utils/collection';
import {
  Context,
  ContextFieldPath,
  Expr,
  isDynamicSettable,
  JsonRule,
  LocalizedString,
  MatchResult,
  Meta,
  ObjectMeta,
  OverrideValue,
  Rule,
  RuleLoaderService,
  Selector,
  StaticDynamicWrapper,
  UIMeta
} from '../core/index';
import {ComponentRegistry} from '../../components/core/component-registry.service';
import {Environment} from '../../core/config/environment';


type DynamicValueType = 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';


describe('Loading rules functionality', () => {


  beforeEach(() => {
    const metaUI = UIMeta.getInstance();
    metaUI._rules.forEach((v) => {
      v.disable();
    });

    UIMeta['_instance'] = undefined;

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
        const jsonRule: JsonRule = <JsonRule> val;

        const selectors: Array<Selector> = new Array<Selector>();
        for (const item of jsonRule._selectors) {
          const selector = new Selector(item._key, item._value, item._isDecl);
          selectors.push(selector);
        }

        const properties = MapWrapper.createFromStringMap<any>(
          jsonRule._properties);
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

  it(' should retrieve singleton instance of UIMeta and defauls rules  and policies', () => {
      const instance = UIMeta.getInstance();

      // we are exlucding bindingDictionary
      expect(instance).toBeDefined();
      expect(instance._rules.length).toEqual(10);
    }
  );


  it(' should load all the system rules in the rule engine based on WidgetsRules. ', () => {

      try {

        const metaUI = UIMeta.getInstance();
        metaUI.registerLoader(new RuleLoaderService());
        metaUI.loadDefaultRuleFiles();

        expect(metaUI).toBeDefined();
        expect(metaUI._rules.length).toEqual(461); // commented out toOneRelationShip

      } catch (e) {
        fail(e);

      }
    }
  );
});


describe('Rule matching functionality on preloaded ruleset', () => {

  beforeEach(() => {
    const metaUI = UIMeta.getInstance();
    metaUI._rules.forEach((v) => {
      v.disable();
    });

    UIMeta['_instance'] = undefined;


  });

  it(' it must pick the best selector to Index from list of selectors ', () => {

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);

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

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('layout', 'Inspect', null);
      prevMatch = metaUI.match('operation', 'edit', prevMatch);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Number', prevMatch);

      for (let i = 1; i < prevMatch.matches()[0]; i++) {
        const rule = metaUI._rules[prevMatch.matches()[i]].toString();

        // print(rule);
        expect(rule)
          .toMatch(
            /layout|Inspect|operation|edit|field|type|Number|InputFieldComponent/);
      }
    }
  );
  it(' It can match properties for string and Editing and expect InputFieldComponent in  the ' +
    'retrieved rule properties', () => {

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('operation', 'edit', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'Date', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('operation', 'view', null);
      prevMatch = metaUI.match('field', '*', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);
      prevMatch = metaUI.match('trait', 'richtext', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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

      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();

      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('layout', 'Inspect', prevMatch);

      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Form', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      let prevMatch: MatchResult = metaUI.match('class', '*', null);
      prevMatch = metaUI.match('trait', 'Stack', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      metaUI.keyData(UIMeta.KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(UIMeta.KeyClass, 'MyClass');
      const selectorField = new Selector(UIMeta.KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ObjectMeta.ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', '*', null);

      prevMatch = metaUI.match('trait', 'Form', prevMatch);
      prevMatch = metaUI.match('scopeKey', 'field', prevMatch);
      prevMatch = metaUI.match('field', 'name', prevMatch);
      prevMatch = metaUI.match('type', 'String', prevMatch);


      let found = false;
      for (let i = prevMatch.matches()[0]; i > 0; i--) {
        const properties = metaUI._rules[prevMatch.matches()[i]].properties;
        const selectors = metaUI._rules[prevMatch.matches()[i]].selectors;

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
      const metaUI = UIMeta.getInstance();
      const env: Environment = new Environment();
      metaUI.componentRegistry = new ComponentRegistry(env);
      metaUI.registerLoader(new RuleLoaderService());
      metaUI.loadDefaultRuleFiles();


      const observers = metaUI.keyData(UIMeta.KeyClass).observers;
      const spy = spyOn(observers[0], 'notify');
      const spy2 = spyOn(observers[1], 'notify');


      metaUI.keyData(UIMeta.KeyClass).setParent('MyClass', 'Object');

      metaUI.beginRuleSet('MyIntrospection');

      const selectorClass = new Selector(UIMeta.KeyClass, 'MyClass');
      const selectorField = new Selector(UIMeta.KeyField, 'name', true);

      const mp = new Map<string, any>();
      mp.set('type', 'String');
      mp.set('visible', true);
      mp.set('field', 'name');
      metaUI.addRule(
        new Rule([selectorClass, selectorField], mp, ObjectMeta.ClassRulePriority));
      metaUI.endRuleSet();


      let prevMatch: MatchResult = metaUI.match('class', 'MyClass', null);

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

  it('It evaluates correct expression and return result of 1 + 2', () => {

      const result = evalExpression(' num1 + num2;', 'let  context1;', {num1: 1, num2: 2});
      expect(result).toEqual(3);
    }
  );


  it('It evaluates expression object.firstName.length > 4 on Context', () => {

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(UIMeta.getInstance());
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


      const ex = new Expr('object.firstName.length > 4');
      const isTruthy = ex.evaluate(context);

      expect(isTruthy).toBeTruthy();
    }
  );


  it('It evaluates expression object.firstName === Frank on Context', () => {

      class MyContext extends Context {
        private _someObject: any;


        get values(): Map<string, any> {
          return new Map<string, any>();
        }

        constructor() {
          super(UIMeta.getInstance());
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


      let ex = new Expr('object.firstName === "Frank" ');
      let isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeTruthy();

      ex = new Expr('object.firstName === "Peter" ');
      isTruthy = ex.evaluate(context);
      expect(isTruthy).toBeFalsy();
    }
  );


  it('It evaluates context field path  on Context to get value from a object', () => {


      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(UIMeta.getInstance());
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

  it('It evaluates context field path  on Context to set a value to a object', () => {

      class MyContext extends Context {
        private _someObject: any;


        constructor() {
          super(UIMeta.getInstance());
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





